# React Security reference index

> Scope: read supplied local evidence with Read/Grep/Glob/Skill and return guidance in chat. The Python helpers, commands, writes, builds, probes and tests below are optional source for a separately authorized caller. If helper output is unavailable, trace the listed checks manually and mark the execution gap. No installation, credential access, provider operation or new assistant/stack is authorized.

> Version qualification: numeric advisory/version/maintenance data is a dated 2026-09-30 offline snapshot, not a current vulnerability database or a safe-version recommendation. Confirm actual installed features, deployment and current primary advisories before promoting a snapshot candidate. Framework SSR does not imply RSC; no RSC runtime, alternate router, MDX engine, sanitizer or telemetry dependency is selected here.

Load when: you need to find which reference holds a check, a table, or a script option.

## Files

| Path | Holds | Load when |
| --- | --- | --- |
| [checks-xss-and-ssr.md](checks-xss-and-ssr.md) | RX-01 to RX-11, RS-01 to RS-03 | guide 01 |
| [checks-rsc.md](checks-rsc.md) | RC-01 to RC-10 | guide 02 |
| [checks-secrets-and-data.md](checks-secrets-and-data.md) | SD-01 to SD-09 | guide 03 |
| [checks-auth-routing.md](checks-auth-routing.md) | AR-01 to AR-06 | guide 04 |
| [checks-supply-chain-and-ai.md](checks-supply-chain-and-ai.md) | SC-01 to SC-05, AI-01 to AI-10, React 19 behavior table | guide 06, and any AI-built app |
| [advisory-table.md](advisory-table.md) | every version range the script checks | explaining or hand-checking a version finding |
| [detection-patterns.md](detection-patterns.md) | ripgrep commands per check id | widening a search |
| [finding-rules.md](finding-rules.md) | output files, ids, confidence, severity, example finding and metrics | guide 05, and before writing any finding |
| [research/distilled-react-security.md](research/distilled-react-security.md) | cited distillation | verifying a claim |
| official-sources.md | primary reference locations | version and claim qualification |

## Scripts

| Script | Purpose | Key options |
| --- | --- | --- |
| `../scripts/react_version_check.py` | lockfile and package.json versions against the advisory table; contract-shaped findings | `--repo`, `--paths`, `--out`, `--summary`, `--start-id`, `--max-files` |
| `../scripts/sink_scan.py` | candidate lines for every check id; secrets redacted | `--repo`, `--paths`, `--out`, `--checks`, `--max-files`, `--max-per-check` |
| `../scripts/test/run_tests.py` | fixture tests for both scripts | none |

Both scripts: Python 3.9+ standard library, read-only on the audited repository, write only where `--out` and `--summary` point.

## Check id prefixes

| Prefix | Area |
| --- | --- |
| RX | XSS and injection sinks in the client |
| RS | Server rendering and hydration injection |
| RC | React Server Components and Server Functions |
| SD | Secrets and data exposure |
| AR | Auth, routing, client trust |
| SC | Supply chain and version behavior |
| AI | AI-generated code patterns (always filed under another id) |

Check ids are internal labels for tags. Finding ids are always `SEC-REACT-NNN`.

Primary technical reference locations: [source index](official-sources.md). Recheck the actual installed version and trust path.
