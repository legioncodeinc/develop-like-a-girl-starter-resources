#!/usr/bin/env python3
"""Optional offline redacted source and supplied-history-patch candidate review.

Explicit assessed root, fixed private-file exclusions and byte/file limits.
No Git subprocess, network, project imports or provider verification. History
collection is separate owner work; this helper analyzes a sanitized .patch only.
Usage: secrets_fallback.py ROOT [--history-patch PATH.patch] [--no-tree]
                              [--include-generic] [--json FRESH_OUT.json]
First four characters of matches are retained, remaining bytes are redacted.
Designed and built by Legion Code Inc. Licensed under AGPL-3.0-or-later.
"""

from __future__ import annotations

import argparse
import json
import os
import re
import stat
import sys
from pathlib import Path
from safe_io import Budget, DENIED_DIRS, contained, sensitive, scope_root, fresh_output

SKIP_DIRS = {"node_modules", "vendor", ".git", "dist", "build", "target", ".venv", "venv",
             "__pycache__", ".next", ".svelte-kit", ".terraform", "coverage", ".gradle", "obj"}
SKIP_EXT = {".png", ".jpg", ".jpeg", ".gif", ".webp", ".ico", ".pdf", ".zip", ".gz", ".tgz",
            ".jar", ".war", ".class", ".so", ".dylib", ".dll", ".exe", ".woff", ".woff2", ".ttf",
            ".otf", ".mp4", ".mov", ".mp3", ".wasm", ".bin", ".lockb", ".pyc", ".sqlite", ".db"}
LOCKFILES = {"package-lock.json", "pnpm-lock.yaml", "yarn.lock", "poetry.lock", "uv.lock",
             "Cargo.lock", "Gemfile.lock", "composer.lock", "go.sum", "bun.lock"}

END = r"(?:[`'\"\s;,]|\\[nr]|$)"
# (rule id, compiled regex, capture group index for the secret)
RULES = [
    ("aws-access-token", r"\b((?:A3T[A-Z0-9]|AKIA|ASIA|ABIA|ACCA)[A-Z2-7]{16})\b", 1),
    ("github-pat", r"\b(ghp_[0-9a-zA-Z]{36})\b", 1),
    ("github-oauth", r"\b(gho_[0-9a-zA-Z]{36})\b", 1),
    ("github-app-token", r"\b((?:ghu|ghs)_[0-9a-zA-Z]{36})\b", 1),
    ("github-fine-grained-pat", r"\b(github_pat_\w{82})", 1),
    ("gitlab-pat", r"\b(glpat-[\w-]{20})", 1),
    ("slack-bot-token", r"\b(xoxb-[0-9]{10,13}-[0-9]{10,13}[a-zA-Z0-9-]*)", 1),
    ("slack-webhook-url", r"((?:https?://)?hooks\.slack\.com/(?:services|workflows|triggers)/[A-Za-z0-9+/]{43,56})", 1),
    ("stripe-access-token", r"\b((?:sk|rk)_(?:test|live|prod)_[a-zA-Z0-9]{10,99})" + END, 1),
    ("gcp-api-key", r"\b(AIza[\w-]{35})" + END, 1),
    ("openai-api-key", r"\b(sk-(?:proj|svcacct|admin)-[A-Za-z0-9_-]{20,}T3BlbkFJ[A-Za-z0-9_-]{20,}|sk-[a-zA-Z0-9]{20}T3BlbkFJ[a-zA-Z0-9]{20})", 1),
    ("anthropic-api-key", r"\b(sk-ant-(?:api03|admin01)-[a-zA-Z0-9_-]{80,100})", 1),
    ("npm-access-token", r"\b(npm_[A-Za-z0-9]{36})" + END, 1),
    ("sendgrid-api-token", r"\b(SG\.[A-Za-z0-9=_.-]{66})" + END, 1),
    ("shopify-access-token", r"\b(shpat_[a-fA-F0-9]{32})", 1),
    ("digitalocean-access-token", r"\b(doo_v1_[a-f0-9]{64})", 1),
    ("doppler-api-token", r"\b(dp\.pt\.[A-Za-z0-9]{43})", 1),
    ("huggingface-access-token", r"\b(hf_[A-Za-z]{34})" + END, 1),
    ("pypi-upload-token", r"(pypi-AgEIcHlwaS5vcmc[\w-]{50,1000})", 1),
    ("databricks-api-token", r"\b(dapi[a-f0-9]{32}(?:-\d)?)" + END, 1),
    ("private-key", r"(-----BEGIN[ A-Z0-9_-]{0,100}PRIVATE KEY(?: BLOCK)?-----)", 1),
    ("jwt", r"\b(ey[a-zA-Z0-9]{17,}\.ey[a-zA-Z0-9/\\_-]{17,}\.(?:[a-zA-Z0-9/\\_-]{10,}={0,2})?)" + END, 1),
    ("url-with-password", r"\b((?:postgres(?:ql)?|mysql|mariadb|mongodb(?:\+srv)?|redis|rediss|amqps?)://[^\s:/@'\"]+:[^\s@'\"]{3,}@[^\s'\"]+)", 1),
]
GENERIC = ("generic-assignment",
           r"(?i)\b[\w.-]{0,40}(?:api[_-]?key|secret|token|passw(?:or)?d|auth|credential|private[_-]?key)[\w.-]{0,20}\s*(?:=|:|:=|=>)\s*['\"]([^'\"\s]{12,150})['\"]",
           1)
PLACEHOLDER = re.compile(r"(?i)(x{5,}|\*{3,}|changeme|example|placeholder|your[_-]|<[^>]+>|\$\{|\{\{|dummy|sample|fake|test_?key|redacted|0{8,})")


def redact(value: str) -> str:
    return value[:4] + "****" if len(value) > 4 else "****"


def compile_rules(include_generic: bool):
    rules = [(rid, re.compile(rx), g) for rid, rx, g in RULES]
    if include_generic:
        rules.append((GENERIC[0], re.compile(GENERIC[1]), GENERIC[2]))
    return rules


def scan_text(text: str, rules, path: str, commit=None, line_offset=0):
    hits = []
    for i, line in enumerate(text.splitlines(), start=1):
        if len(line) > 5000:
            line = line[:5000]
        for rid, rx, g in rules:
            for m in rx.finditer(line):
                val = m.group(g)
                if rid == "generic-assignment" and PLACEHOLDER.search(val):
                    continue
                hit = {"rule": rid, "path": path, "line": i + line_offset, "match": redact(val),
                       "placeholder_like": bool(PLACEHOLDER.search(val))}
                if commit:
                    hit["commit"] = commit
                hits.append(hit)
                if len(hits) >= 5000:
                    return hits
    return hits


def scan_tree(root: Path, rules, max_bytes: int):
    """Bounded source/config scan; never read human/private/credential files."""
    hits, skipped, symlinks = [], [], 0
    budget = Budget(root, max_bytes)
    allowed = {".js", ".jsx", ".ts", ".tsx", ".mjs", ".cjs", ".mts", ".cts", ".py", ".go", ".rs", ".rb", ".php", ".java", ".kt", ".cs", ".sql", ".json", ".yaml", ".yml", ".toml", ".sh", ".tf"}
    visited = 0
    for dirpath, dirnames, filenames in os.walk(root, followlinks=False):
        dirnames[:] = [d for d in sorted(dirnames) if d not in SKIP_DIRS and d.casefold() not in DENIED_DIRS and not sensitive((Path(dirpath) / d).relative_to(root)) and not (Path(dirpath) / d).is_symlink()]
        for fn in sorted(filenames):
            visited += 1
            if visited > 20000:
                budget.caps.add("file-entry limit reached: 20000")
                break
            p = Path(dirpath) / fn
            if p.is_symlink():
                symlinks += 1
                continue
            if sensitive(p.relative_to(root)) or fn in LOCKFILES or p.suffix.lower() not in allowed:
                continue
            text = budget.read(p)
            if text is None:
                skipped.append(p.relative_to(root).as_posix())
                continue
            hits.extend(scan_text(text, rules, p.relative_to(root).as_posix()))
            if len(hits) >= 5000:
                hits = hits[:5000]
                budget.caps.add("candidate limit reached: 5000")
                return hits, budget.files, skipped, symlinks, sorted(budget.caps)
        if visited > 20000:
            break
    return hits, budget.files, skipped, symlinks, sorted(budget.caps)


def scan_history_patch(path: Path, root: Path, rules, max_bytes: int):
    """Analyze one caller-supplied sanitized patch; never invoke Git or read .git."""
    # The patch is a second assessed input. Never silently read arbitrary files.
    patch_root = scope_root(path.parent)
    if path.suffix != ".patch" or sensitive(path) or path.is_symlink():
        raise ValueError("history evidence must be a regular sanitized .patch file")
    budget = Budget(patch_root, max_bytes)
    text = budget.read(path)
    if text is None:
        raise ValueError("history evidence unreadable or beyond bound")
    hits, commit, relpath = [], None, None
    for line in text.splitlines():
        if line.startswith("COMMIT "):
            raw = line[7:].strip()
            commit = raw[:12] if re.fullmatch(r"[0-9a-f]{7,64}", raw) else None
        elif line.startswith("+++ b/"):
            raw = line[6:]
            candidate = Path(raw)
            relpath = raw if not candidate.is_absolute() and ".." not in candidate.parts and not sensitive(candidate) else None
        elif line.startswith("+") and not line.startswith("+++") and relpath:
            if Path(relpath).name not in LOCKFILES:
                for h in scan_text(line[1:], rules, relpath, commit=commit):
                    h.pop("line", None)
                    hits.append(h)
                    if len(hits) >= 5000:
                        budget.caps.add("history candidate limit reached: 5000")
                        return hits[:5000], patch_root, sorted(budget.caps)
    return hits, patch_root, sorted(budget.caps)


def main(argv=None):
    ap = argparse.ArgumentParser(description="Regex fallback secrets scan (redacted output).")
    ap.add_argument("root")
    ap.add_argument("--history-patch", help="explicit caller-sanitized patch evidence; does not collect Git history")
    ap.add_argument("--max-file-bytes", type=int, default=1_000_000)
    ap.add_argument("--no-tree", action="store_true", help="analyze only explicit sanitized history patch")
    ap.add_argument("--include-generic", action="store_true", help="add the noisy generic key=value rule")
    ap.add_argument("--json", metavar="OUT", help="write JSON here instead of stdout")
    args = ap.parse_args(argv)
    try:
        root = scope_root(args.root)
        if not 1 <= args.max_file_bytes <= 2_000_000 or (args.no_tree and not args.history_patch):
            raise ValueError("invalid bounds or missing history evidence")
        rules = compile_rules(args.include_generic)
        if args.no_tree:
            hits, scanned, skipped, symlinks, limits = [], 0, [], 0, []
        else:
            hits, scanned, skipped, symlinks, limits = scan_tree(root, rules, args.max_file_bytes)
        caps = limits + [f"regex candidates only; {len(rules)} rules; no entropy / live provider verification",
                        "human library/notes and root notes excluded; credential files, .env and .dev.vars excluded; technical library/knowledge, src/private and source libraries remain reviewable",
                        "lockfiles, binaries and non-code documentation excluded; lines limited to 5000 characters; candidate output capped at 5000 per source/patch",
                        "fresh external output required; no project code or Git executed"]
        if symlinks:
            caps.append(f"{symlinks} symlink files skipped")
        if skipped:
            caps.append(f"{len(skipped)} files unreadable or beyond file / total budget")
        history_hits, inputs = [], [root]
        if args.history_patch:
            history_hits, patch_root, patch_limits = scan_history_patch(Path(args.history_patch).absolute(), root, rules, args.max_file_bytes)
            inputs.append(patch_root)
            caps.extend(patch_limits)
            caps.append("history limited to supplied sanitized patch; collection, completeness and omitted commits unverified")
        else:
            caps.append("Git history not collected or analyzed")
        if args.no_tree:
            caps.append("working tree not scanned")
        out = {"tool": "secrets_fallback.py", "root": "assessed-input", "output_kind": "redacted-review-candidates", "hits": hits, "history_hits": history_hits,
               "coverage": {"files_scanned": scanned, "files_skipped_large": skipped, "caps": caps}}
        text = json.dumps(out, indent=2)
        if args.json:
            fresh_output(Path(args.json), inputs, text)
        else:
            print(text)
    except (OSError, ValueError):
        print("invalid/private input, exceeded bounds, or existing/unsafe output refused", file=sys.stderr)
        return 2
    return 0


if __name__ == "__main__":
    sys.exit(main())
