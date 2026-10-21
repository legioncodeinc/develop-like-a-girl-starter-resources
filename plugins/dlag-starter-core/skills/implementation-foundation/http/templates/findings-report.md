# HTTP and REST findings report

Target API/routes: <bounded scope>
Reviewer: Implementation Foundation
Date: <observed date>
Candidate: <actual branch/commit or file hashes; unknown if not supplied>
Evidence: <source-only / supplied capture / authorized native result>
Accepted contract: <local document and relevant sections>
Unreviewed routes/dependencies: <exact boundaries>

## Summary

| Severity | Count | Evidence status |
|---|---|---|
| Critical | | |
| High | | |
| Medium | | |
| Informational | | |
| Unknown/unassessed | | |

State overall behavior, the most consequential demonstrated defect and any deliberately accepted API tradeoff. Do not count unassessed scope as passed. Separate a confirmed failure from a proposed check.

## Critical findings

### C1: <specific title>

- Location: <route/file/line; supplied capture identifier>
- Request/operation: <method, sanitized caller context, selected representation>
- Accepted outcome: <documented contract>
- Actual outcome: <observed/source-derived status/body/header/side effect>
- Authority: <RFC number and exact section, or Fetch section for CORS>
- Impact and preconditions: <what breaks; whether browser sharing is blocked or actually permitted>
- Remediation: <small concrete accepted change, dependencies and compatibility effects>
- Evidence/check: <success, failure and edge cases; RUN or NOT RUN>
- Follow-up owner: <actual local role and unresolved responsibility>

## High findings

Repeat the same fields as C1. Use High where the actual effect breaks a meaningful client/cache/security boundary; do not assign it solely from a status preference.

## Medium findings

Repeat the same fields as C1. Record bounded correctness/interoperability effects and the actual caller affected.

## Informational and accepted tradeoffs

Record deliberate RPC, missing optional hypermedia, optional Max-Age, unmeasured performance assumptions and compatible validation policy separately from defects.

## Handoffs

| Item | Owner | Evidence/decision needed | Current status |
|---|---|---|---|
| Identity/session/CSRF/object permission | Identity; Security Review | | |
| Security header risk/private cache isolation | Security Review | | |
| Edge settings/TLS/native h2 or h3 | Cloudflare Platform | | |
| Crawling/indexation response behavior | Website Builder | | |

This method does not itself call providers, execute curl, inspect secrets, change live settings or run migrations. Any proposed capable-caller check needs its own existing authorization. Save a requested report as YYYY-MM-DD-scope-http-review.md in the agreed local report location; do not overwrite earlier evidence. Record remaining proof and stop conditions.
