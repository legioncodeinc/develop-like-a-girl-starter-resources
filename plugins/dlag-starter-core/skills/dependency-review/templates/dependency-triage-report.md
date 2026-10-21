# Dependency triage report

Date/time, reviewer, owner, accepted scope:
Target revision/path and manifest/lock/config hashes:
Package manager/runtime declarations and actually observed versions:
Evidence source/time/commands/exit/output locations (NOT_RUN when absent):
Current vulnerability status: UNKNOWN until dated applicable evidence exists.

## Counts and policy

| Severity | Observed count or unknown | Blocking rule | Tracked owner/issue |
|---|---|---|---|
| Critical | unknown | high/critical baseline, owner policy applies | pending |
| High | unknown | high/critical baseline, owner policy applies | pending |
| Moderate | unknown | tracked even when nonblocking | pending |
| Low | unknown | tracked even when nonblocking | pending |

## Findings

Walk [five-question triage](../guides/01-vulnerability-triage.md) for each finding. Include lower findings in the backlog summary rather than silently dropping them.

| Advisory/source/date/range | Exact package/version and parent paths | Direct/transitive/dev/optional | Severity/CVSS context | Reachability and execution phase | Resolution/mitigation | Evidence and limits |
|---|---|---|---|---|---|---|
| pending | pending | pending | unknown | unknown | pending | pending |

Exception, if owner-approved: exact advisory/version/environment scope, rationale, evidence, approver/accountable owner, tracking issue, created date, expiry/review date and change/expiry trigger. A missing patch is not automatic acceptance. Expired/changed exceptions reopen.

## Native/install behavior

Actual lifecycle scripts and native/optional families:
Expected source/download host/ABI/platform versus observed behavior:
Override/declaration/lock alignment and justified pins:
New native release manual reviewer, release-age policy and behavioral output:
Unexpected source/network/shell behavior or incident escalation:

## Lock and release controls

Governing lock tracked/consistent, manager/version/config and frozen-install evidence:
Manifest/lock graph changes, peers/overrides/registry/integrity review:
Existing artifact inclusion/secret check implementation and exact output:
Source/SAST/types/build/runtime/browser/native checks, individually:
SBOM parse/schema/coverage/subject binding/identity/delivery evidence, individually:
Unknown or unscanned ecosystems/artifacts/platforms:

## Owner decisions and action items

| Action | Owner | Issue | Due/expiry | Proposed/performed | Exact evidence |
|---|---|---|---|---|---|
| pending | pending | pending | pending | proposed | none |

Decision: needs evidence / needs migration / ready for the explicitly scoped next owner gate.
Unperformed actions and effect on old receipts:
Independent Security Review, then Quality Review: pending.
