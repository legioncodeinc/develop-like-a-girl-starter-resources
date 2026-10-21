"""Synthetic privacy, bounds, output and report-contract tests; no application runs."""
from __future__ import annotations
import contextlib
import io
import json
import os
import sys
import tempfile
import unittest
from pathlib import Path
from unittest.mock import patch

sys.path.insert(0, str(Path(__file__).resolve().parent))
import detect_ecosystems as detector
import secrets_fallback as secrets
import validate_findings as validator
from safe_io import Budget, contained, fresh_output, scope_root

TOKEN = "ghp_" + "A1" * 18  # synthetic only

class Guards(unittest.TestCase):
    def setUp(self):
        self.tmp = tempfile.TemporaryDirectory()
        self.base = Path(self.tmp.name).resolve()
        self.root = self.base / "source"
        self.root.mkdir()
        self.output = self.base / "output"
        self.output.mkdir()

    def tearDown(self):
        self.tmp.cleanup()

    def write(self, path, content):
        p = self.root / path
        p.parent.mkdir(parents=True, exist_ok=True)
        p.write_text(content)
        return p

    def test_private_paths_never_opened(self):
        for name in ["library/notes/data.json", "notes/data.ts", "library/notes/data.js", ".env", ".dev.vars", "credentials.json", ".aws/config", "id_rsa", "cert.pem", "README.md"]:
            self.write(name, TOKEN)
        self.write("src/handler.ts", "const publicValue = 1")
        original = os.open
        opened = []
        def record(path, *args, **kwargs):
            opened.append(str(path))
            return original(path, *args, **kwargs)
        with patch("os.open", record):
            hits, scanned, skipped, symlinks, caps = secrets.scan_tree(self.root, secrets.compile_rules(True), 1000)
        self.assertEqual(hits, [])
        self.assertEqual(scanned, 1)
        self.assertFalse(any(x in opened for x in [".env", ".dev.vars", "credentials.json", "id_rsa", "cert.pem", "README.md", "data.json", "data.ts", "data.js"]))

    def test_private_auth_and_code_libraries_remain_reviewable(self):
        for name in ["src/private/auth.ts", "src/library/helpers.js", "src/notes/handler.ts", "src/secrets/parser.ts", "library/knowledge/private/schema.ts"]:
            self.write(name, "const publicValue = 1")
        hits, scanned, skipped, symlinks, caps = secrets.scan_tree(self.root, secrets.compile_rules(True), 1000)
        self.assertEqual(scanned, 5)
        self.assertEqual(hits, [])
        self.write("src/private/package.json", json.dumps({"dependencies": {"hono":"4.0.0"}}))
        result = detector.detect(self.root, [], 2000)
        self.assertIn("src/private", {e["path"] for e in result["details"]["node-server"]})

    def test_literal_in_source_redacted(self):
        self.write("src/config.ts", "const token = '" + TOKEN + "';")
        out = self.output / "candidates.json"
        self.assertEqual(secrets.main([str(self.root), "--json", str(out)]), 0)
        text = out.read_text()
        self.assertNotIn(TOKEN, text)
        self.assertIn("ghp_****", text)
        self.assertNotIn(str(self.base), text)

    def test_symlink_directory_and_hardlink_reads_refused(self):
        outside = self.base / "elsewhere"
        outside.mkdir()
        original = outside / "data.json"
        original.write_text(TOKEN)
        os.symlink(outside, self.root / "linked")
        os.link(original, self.root / "hard.json")
        budget = Budget(self.root)
        self.assertIsNone(budget.read(self.root / "linked/data.json"))
        self.assertIsNone(budget.read(self.root / "hard.json"))
        self.assertEqual(budget.files, 0)
        self.assertFalse(contained(self.root, self.root / "../elsewhere/data.json"))

    def test_output_refuses_existing_symlink_hardlink_and_assessed_input(self):
        existing = self.output / "existing.json"
        existing.write_text("unchanged")
        linked = self.output / "linked.json"
        os.symlink(existing, linked)
        hard = self.output / "hard.json"
        os.link(existing, hard)
        for out in [existing, linked, hard, self.root / "out.json"]:
            with self.assertRaises((ValueError, OSError)):
                fresh_output(out, [self.root], "changed")
        self.assertEqual(existing.read_text(), "unchanged")
        self.assertFalse((self.root / "out.json").exists())

    def test_output_refuses_symlink_parent_and_second_assessed_input(self):
        os.symlink(self.output, self.base / "alias")
        with self.assertRaises((ValueError, OSError)):
            fresh_output(self.base / "alias/out.json", [self.root], "changed")
        with self.assertRaises((ValueError, OSError)):
            fresh_output(self.output / "out.json", [self.root, self.output], "changed")

    def test_actual_read_and_file_count_bounds(self):
        p = self.write("large.json", "x" * 101)
        budget = Budget(self.root, 100)
        self.assertIsNone(budget.read(p))
        self.assertEqual(budget.bytes, 0)
        with self.assertRaises(ValueError):
            Budget(self.root, 2_000_001)
        q = self.write("small.json", "{}")
        budget.files = 2000
        self.assertIsNone(budget.read(q))
        self.assertTrue(any("budget reached" in x for x in budget.caps))

    def test_manifest_specs_cannot_expose_credentials_or_paths(self):
        self.write("package.json", json.dumps({"dependencies": {"react": "https://user:" + TOKEN + "@host.invalid/19.1.0.tgz"}}))
        self.write("library/notes/package.json", json.dumps({"dependencies": {"express": "99.0.0"}}))
        result = detector.detect(self.root, [], 2000)
        text = json.dumps(result)
        self.assertNotIn(TOKEN, text)
        self.assertNotIn("user:", text)
        self.assertNotIn(str(self.base), text)
        self.assertNotIn("node-server", {x["id"] for x in result["stacks"]})
        self.assertIsNone(result["stacks"][0]["version"])

    def test_malformed_manifest_is_cap_not_execution(self):
        self.write("package.json", json.dumps({"scripts": 17, "dependencies": {"express": "4.0.0"}}))
        result = detector.detect(self.root, [], 2000)
        self.assertTrue(any("malformed manifest" in w for w in result["warnings"]))

    def test_history_private_traversal_and_removed_lines_not_scanned(self):
        evidence = self.base / "evidence"
        evidence.mkdir()
        p = evidence / "safe.patch"
        p.write_text("COMMIT " + "a" * 40 + "\n+++ b/.env\n+" + TOKEN + "\n+++ b/../outside.ts\n+" + TOKEN + "\n+++ b/src/ok.ts\n-" + TOKEN + "\n+const safe = 1\n")
        hits, root, caps = secrets.scan_history_patch(p, self.root, secrets.compile_rules(True), 2000)
        self.assertEqual(hits, [])

    def test_root_traversal_private_and_implicit_scope_refused(self):
        private = self.root / ".credentials"
        private.mkdir()
        for raw in [private, self.root / "../source", Path.home(), Path("/")]:
            with self.assertRaises(ValueError):
                scope_root(raw)

    def test_report_confidence_cwe_lines_and_secret_guard(self):
        valid = {"id":"SEC-POLY-001", "dimension":"security", "source":"backend-security", "title":"Synthetic evidence", "severity":"medium", "confidence":"possible", "locations":[{"path":"src/handler.ts", "line_start":1, "line_end":1}], "evidence":"src/handler.ts:1\nconst example = true", "why_it_matters":"Synthetic only", "remediation":"Review the actual boundary", "effort":"S", "refs":["CWE-862"], "verified_by":"Synthetic format test"}
        _, errors, _ = validator.check_findings([json.dumps(valid)], "SEC-POLY", "backend-security", None)
        self.assertEqual(errors, [])
        for changed in [dict(valid, severity="high"), dict(valid, refs=[]), dict(valid, evidence=TOKEN), dict(valid, locations=[{"path":"../outside.ts", "line_start":0,"line_end":0}]), dict(valid, id={}), dict(valid, dimension={}), dict(valid, confidence=[]), dict(valid, effort={})]:
            _, errors, _ = validator.check_findings([json.dumps(changed)], "SEC-POLY", "backend-security", None)
            self.assertTrue(errors)

    def test_candidate_count_is_bounded(self):
        content = (TOKEN + "\n") * 6000
        self.assertEqual(len(secrets.scan_text(content, secrets.compile_rules(False), "src/fixture.ts")), 5000)

    def test_one_critical_band_cannot_be_healthy(self):
        self.assertEqual(validator.expected_verdict([], [{"band":"critical"}]), "at-risk")
        p = self.output / "metrics.json"
        p.write_text(json.dumps({"dimension":"security", "verdict":"healthy", "summary":"No checks", "measures":[], "coverage":{"caps":["synthetic"]}}))
        errors, _ = validator.check_metrics(p, [])
        self.assertIn("metrics: healthy requires at least one completed check", errors)

if __name__ == "__main__":
    unittest.main(verbosity=2)
