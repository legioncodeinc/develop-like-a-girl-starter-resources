# Contract output rules: templates, severity, confidence

> **Read-only method.** Security Review uses Read, Grep, Glob and Skill only. Commands below are inert reference for a separately authorized caller with the required tools. Do not execute, save files, install, browse, read credentials, contact providers, or alter Git from this role. Return findings in chat. Use the local [review contract](../review-contract.md) for scope, data and output restrictions.


Loaded by [guides/14-writing-findings.md](../../guides/14-writing-findings.md). This file restates the audit contract (sections 5 to 8) for this review and adds the class-to-severity table. The [local contract](../review-contract.md) wins if examples disagree. This role returns the report in chat; the following optional filenames are for a separately authorized caller using fresh external output.

## 1. Optional caller-owned output files

| File | Content |
| --- | --- |
| `findings-backend.jsonl` | Optional fresh caller-owned JSONL, outside every assessed input |
| `metrics-backend.json` | Actual measures and caps, not a historical receipt |
| `notes-backend.md` | Scope, tools, Not confirmed, dropped hits and Evidence |
| `raw/backend/` | Supplied sanitized outputs only; no global writer is required |

The Specialist does not create these files. File-format validity alone does not establish security or independence.

## 2. Finding fields (all required except `tags`)

`id` (`SEC-POLY-NNN`, three digits, unique, start at 001), `dimension` (`security`), `source` (`backend-security`), `title`, `severity`, `confidence`, `locations`, `evidence`, `why_it_matters`, `remediation`, `effort` (`S`, `M`, `L`), `refs`, `verified_by`, `tags` (optional; use the stack id and the class, for example `["python", "sqli"]`).

Rules:

1. No finding without evidence. Suspicions go to notes under "Not confirmed".
2. Redact secrets: first 4 characters then `****`.
3. `possible` confidence caps severity at `medium`.
4. Duplicates with other assigned reviewers are fine; a reviewer may consolidate matching path, overlapping lines and concrete CWE, while preserving independent advisory identities. Generic dependency CWEs alone do not merge different advisories. Always include the CWE in `refs` so merging works.
5. `evidence` is at most 15 lines of code, or a command and its real output, or a config value. Never paraphrase a tool result.
6. `locations[].path` is repo-relative (prefix the stack path: `services/api/src/routes.js`, not `src/routes.js`).

`scripts/validate_findings.py` checks rules 2 and 3, the id pattern, enums, required fields, evidence length, and paths.

## 3. Confidence

| Level | Use when |
| --- | --- |
| `confirmed` | You traced the value from the entry point (route, handler, CLI arg) to the sink and nothing in between neutralizes it; or a tool proved it (govulncheck "called", independently supplied owner-authorized validation evidence); or the fact is a config value read directly (`DEBUG = True` in the production settings module) |
| `likely` | Pattern or tool hit plus a manual read that shows user-controlled data probably reaches the sink, with one step you could not prove (for example, a helper in another package) |
| `possible` | Pattern or tool hit only, not read or not traceable. Severity at most `medium` |

## 4. Severity by class (starting point, then adjust)

| Class | Default severity | Raise when | Lower when |
| --- | --- | --- | --- |
| SQL / NoSQL injection reachable from an unauthenticated route | `critical` | | requires admin login: `high` |
| Command injection, code injection, SSTI, insecure deserialization of request data | `critical` | | requires admin login: `high` |
| Missing authentication on a route that reads or changes other users' data | `high` | data is sensitive at scale: `critical` | read-only public-ish data: `medium` |
| IDOR (id-only lookup) | `high` | | only with evidenced low impact and effective additional controls: `medium`; unguessability alone is insufficient |
| Mass assignment of role, owner, tenant, price, or status fields | `high` | role escalation proven: `critical` | only cosmetic fields: `low` |
| SSRF with user URL and no allowlist | `high` | cloud metadata reachable: `critical` | allowlist present but bypassable via redirects: `medium` |
| Path traversal read | `high` | reads secrets or source: `critical` | confined to a public folder: `low` |
| CSRF on cookie-authenticated state change with no token or origin check | `medium` | money or account takeover action and `SameSite=None`: `high` | bearer-token auth only: not a finding |
| Live secret in working tree | `critical` | | test-mode key: `low` |
| Live secret only in git history | `high` | | |
| Debug mode or stack traces in production config | `medium` | framework debug console reachable publicly: `high` | |
| Actuator `*` exposure on a public port | `high` | `heapdump` or `env` with `show-values=always`: `critical` | management port is internal only: `low` |
| Weak password hashing (md5, sha1, unsalted) | `high` | | |
| TLS verification disabled in production code | `medium` | used for auth or payment calls: `high` | test code only: not a finding |
| GitHub Actions script injection from untrusted triggers | `high` | with write token or deploy secrets: `critical` | trigger only from trusted maintainers: `low` |
| `pull_request_target` with head checkout and build | `critical` | | no secrets and read-only token: `high` |
| Unpinned third-party action | `medium` | in release or deploy jobs: `high` | first-party `actions/*` by major tag: `low` |
| Missing `permissions:` block | `medium` | | |
| Root container, unpinned base image, missing `.dockerignore` | `low` | real `.env` copied into the image: `high` | |
| Vulnerable dependency | advisory severity | | per [dependency-triage.md](dependency-triage.md) |
| Missing security headers, missing rate limit | `low` | rate limit on login with no lockout: `medium` | |

These defaults apply the contract's severity table (section 7) to each class; adjust with the facts of the codebase and say why in `verified_by`.

## 5. Plain-language titles

The reader may be a founder who built the app with AI. Titles say what can happen, in everyday words, without CWE names.

| Avoid | Write |
| --- | --- |
| "SQLi in /users endpoint (CWE-89)" | "Anyone can read or change the whole user database through the search box" |
| "IDOR in invoice controller" | "A signed-in user can open other customers' invoices by changing the number in the link" |
| "pull_request_target pwn request" | "A stranger's pull request can run code in your CI with access to your deploy keys" |
| "Mass assignment on User model" | "Users can make themselves admins by adding one extra field when they edit their profile" |

`why_it_matters` names the consequence for this codebase. `remediation` names the file and the exact change.

## 6. Synthetic example finding (illustrative, not a real run)

```json
{"id": "SEC-POLY-003", "dimension": "security", "source": "backend-security", "title": "Anyone can read or change the whole user database through the account search", "severity": "critical", "confidence": "confirmed", "locations": [{"path": "services/py/app/routes/users.py", "line_start": 41, "line_end": 44}], "evidence": "services/py/app/routes/users.py:41-44\n@router.get(\"/users/search\")\nasync def search(q: str, db=Depends(get_db)):\n    rows = db.execute(text(f\"SELECT * FROM users WHERE name LIKE '%{q}%'\"))\n    return rows.mappings().all()", "why_it_matters": "The route has no login check and puts the search text straight into SQL, so one crafted request can dump or alter every account.", "remediation": "In services/py/app/routes/users.py, bind the value: db.execute(text(\"SELECT id, name FROM users WHERE name LIKE :q\"), {\"q\": f\"%{q}%\"}), and add Depends(get_current_active_user) to the route.", "effort": "S", "refs": ["CWE-89", "OWASP A05:2025", "security-review/polyglot/guides/02-python.md"], "verified_by": "Read the route: q comes from the query string, no dependency checks auth, and the f-string reaches text() unchanged.", "tags": ["python", "sqli", "fastapi"]}
```

## 7. Synthetic metrics example (not an executed run or current proof)

```json
{
  "dimension": "security",
  "verdict": "at-risk",
  "summary": "This illustrative report shows two evidenced conditional-service findings. These counts are synthetic; actual dependency status and tool execution require separate evidence.",
  "measures": [
    {"key": "poly_findings_critical", "label": "Critical findings", "value": 0, "unit": "count", "band": "healthy", "threshold": "0 healthy, 1 or more critical", "source": "backend-security"},
    {"key": "poly_findings_high", "label": "High findings", "value": 2, "unit": "count", "band": "at-risk", "threshold": "0 healthy, 1 or more at-risk", "source": "backend-security"},
    {"key": "dep_vulns_reachable", "label": "Vulnerable production packages that the code uses", "value": 1, "unit": "packages", "band": "moderate", "threshold": "0 healthy, medium only moderate, high or critical at-risk", "source": "osv-scanner 2.6.0"},
    {"key": "secrets_live", "label": "Live-format secrets in code or history", "value": 0, "unit": "count", "band": "healthy", "threshold": "0 healthy, any critical", "source": "gitleaks 8.30.1"},
    {"key": "ci_unpinned_actions", "label": "Third-party GitHub Actions not pinned to a commit", "value": 6, "unit": "count", "band": "moderate", "threshold": "0 healthy, any moderate", "source": "zizmor 1.30.1"},
    {"key": "sast_engine", "label": "Static analysis engine run", "value": 1, "unit": "bool", "band": "healthy", "threshold": "1 ran, 0 not-run", "source": "semgrep 1.178.0"}
  ],
  "coverage": {"files_scanned": 812, "lines_scanned": 96410, "skipped": ["node_modules/", "vendor/", "apps/web (nextjs reviewer)"], "caps": ["Gradle build has no lockfile; transitive dependencies of services/spring not audited"]}
}
```

Verdict (contract section 8): `critical` if any `critical` finding at `confirmed` or `likely`; else `at-risk` if any `high` finding or any measure in the `critical` band; else `moderate` if any `medium` finding or any measure in the `at-risk` or `moderate` band; else `healthy`. Use `not-run` for a measure when its tool did not run, and never mark the whole dimension `healthy` when every check was `not-run`: set `not-run` and explain in `summary`.

`coverage.caps` must list every limit: tools that did not run, history not scanned, ecosystems without lockfiles, files over size limits, paths owned by other assigned reviewers. An empty list claims nothing was limited.

Sources: the audit contract; [primary reference](https://owasp.org/Top10/2025/); class defaults derive from the contract severity table and the per-class sources cited in the ecosystem references.
