# Findings, confidence, metrics and notes

## Finding versus candidate

A pattern hit without manual source tracing is a candidate. Evidence must identify exact path/line and the actual guard/query/serialization/config text, plus the unsafe input/authority path. Follow shared functions and applicable RLS/role before claiming missing protection. If evidence cannot establish the path, put the suspicion in Not confirmed with the exact evidence needed. Do not claim a local reproduction, command output or deployed behavior from a code read.

Use confirmed only for an end-to-end traced path or actual authorized reproduction; likely has a specifically unresolved link; possible is pattern-only and cannot justify High/Critical as an established finding. State both potential impact and confidence. Do not mechanistically promote severity for sequential ids, a regulatory label, an XSS somewhere else or a missing header. Read actual reachability, sensitivity, blast radius, compensating controls and actor privilege. Version-only findings retain the reviewed advisory severity/preconditions and do not become proof of exploitation.

## Required finding contract

Each row contains stable unique id, title in plain consequence language, security dimension, severity, confidence, exact repo-relative locations/lines, safe evidence excerpt (normally at most15 lines), why it matters for this app, concrete recommended change, effort estimate if requested, CWE/primary reference where justified, verification/false-positive reasoning and optional surface tags. Fully redact credentials and sensitive user values rather than showing token prefixes. A recommendation to rotate/change provider/history requires the owner's separately authorized action.

Group one shared root cause with its actual locations and affected-count evidence. Split different roots/fixes. Preserve duplicates only when the different boundary adds material evidence; do not inflate totals. Keep every rejected/reframed candidate with the reason. Reference local guides or direct primary documentation, never an unavailable specialist or old skill folder.

## Metrics

Count actual app/surface totals, reviewed/untouched rows, candidates and confirmed findings separately. State when lines/files were not measured rather than manufacturing0 as measured. Severity verdict: actual confirmed/likely Critical justifies critical; High justifies at-risk; Medium moderate; otherwise bounded healthy only for the reviewed scope. If the method or inputs were not run, use not-run/incomplete. Do not force a final grade or imply an external merger exists. Any selected reporting contract must be supplied and validated, not inferred from historical examples.

## Notes and output

Return chat by default: scope/version evidence; auth model paragraph; deployment/canonical origin; endpoint table with verdict for every reviewed row; origin/CSP/cookie decisions; Not confirmed; unresolved preconditions; gaps/coverage caps; evidence pointers; required follow-up owner. A separately authorized writer can save it at agreed fresh paths. No mandatory library/audit workspace write and no shared evidence-index mutation by read-only tools.

## Validation

When structured JSON/JSONL is actually requested, validate parseability, required fields, exact enums, unique ids, real locations, no pattern-only High/Critical assertion and complete redaction. A schema-only pass does not validate security reasoning. Plain language review must explain the consequence without jargon. Counts, examples, hashes and worksheets are not independent review or execution evidence.
