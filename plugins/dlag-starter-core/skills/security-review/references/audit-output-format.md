# Complete security review report

The Specialist returns the report in chat. An authorized caller can save it according to [destination rules](../guides/10-report-format.md). Keep every surface and use explicit source/evidence states instead of blank fields. Never include credentials, raw personal records or provider payloads.

```markdown
# Security review - <observed date> - <actual feature/candidate>

## Executive summary

- Task and authorized scope: <paths, operations, limits>
- Candidate: <commit plus dirty/untracked identity; available artifact hashes>
- Environment and stack: <actual supplied facts, not package defaults assumed deployed>
- Coverage: <SOURCE REVIEW / reduced coverage / target runtime evidence supplied>
- Confirmed findings: <Critical, High, Medium, Low counts>
- Hypotheses and unreviewed scope: <precise list or None>
- Progression status: <blocked or cleared for stated Quality Review scope>

## Surface coverage

### React Router/Vite/Workers request and browser surface
<inspected evidence/result, or NOT REVIEWED and why>
### Identity, Supabase policy and tenant/record ownership
<roles, policy/query/response boundary, evidence and limits>
### R2, uploads, downloads and private derived results
<key permission, finalization, cache/export scope, evidence and limits>
### Secrets, environment, SQL and source history
<redacted source/artifact/log scope and unavailable surfaces>
### Webhooks, hosted Checkout and external intake
<raw bytes, signature, durable acceptance, effect/recovery evidence>
### Dependencies and supply chain
<exact versions/origins/CI scope and current advisory limits>
### Headers, transport and abuse controls
<actual supplied capture/config scope or NOT RUN>
### Generated-code patterns and review independence
<inspected missing-control paths and candidate continuity>
### PII, logs, telemetry and agent context
<sinks/redaction/access/retention scope or NOT REVIEWED>

## Findings detail

### <ID> [<severity>] <concrete defect>

- Location: <path:line or exact supplied section>
- Evidence: <redacted excerpt, candidate and actual observed result>
- Actor, input and preconditions: <who can reach it and how>
- Missing control and harmful effect: <specific reachable consequence>
- Severity reasoning: <impact and likelihood; confidence separately>
- Confidence: <CONFIRMED / HYPOTHESIS / NEEDS HUMAN REVIEW>
- Smallest proposed correction: <paths, implementation owner, safety constraints>
- Proof required: <allowed control, denial/effect invariant, exact target>
- Actual status: <proposed / owner reports fixed / fix inspected / target result supplied>
- Remaining gap: <actual unproven part or None>

## Remediation summary

| Severity | Confirmed | Corrected with inspected evidence | Unresolved | Owner |
| --- | --- | --- | --- | --- |
| Critical | <count> | <count> | <count> | <owner/none> |
| High | <count> | <count> | <count> | <owner/none> |
| Medium | <count> | <count> | <count> | <owner/none> |
| Low | <count> | <count> | <count> | <owner/none> |

## Verification and re-evaluation

| Threat/path | Candidate | Technique | Exact supplied command/fixture | Actual result category | Independent effect evidence | Gap |
| --- | --- | --- | --- | --- | --- | --- |
| <risk> | <hash/revision> | <source/unit/integration/browser/provider> | <command or none> | <NOT RUN / SOURCE REVIEW / SYNTHETIC EXERCISE / TARGET RUNTIME PASS/FAIL> | <reference or absent> | <specific gap> |

Record changed inputs and the applicable full security re-evaluation after Medium-or-higher corrections. If no such correction was supplied, state that explicitly. An old passing result applies only to unchanged relevant inputs. A green synthetic test does not prove the target's database, file or payment policy.

## Next step and scope-specific gate decision

State the exact candidate and scope that may proceed to Quality Review, or list all blockers. Then orchestrator repository-health review and separately authorized commit/push/publication remain. No full-application guarantee or legal certification follows from this report.

Status: <DONE/PARTIAL/BLOCKED/STOPPED for the assigned review, limit/end time>
Delivered: <actual report/draft paths, or unsaved chat result>
Verified: <observed checks and direct quoted failures, with sensitive values redacted>
Not done: <precise remaining scope and reason, or None>
Questions for owner: <numbered concrete questions, recommended answer, or None>
Out of scope, noticed only: <one line per item, or None>
```

The report is not the last gate. All applicable unresolved Medium-or-higher issues remain blockers; fixes need updated candidate evidence before Quality Review. The author of a new source method or feature cannot independently clear that same work.
