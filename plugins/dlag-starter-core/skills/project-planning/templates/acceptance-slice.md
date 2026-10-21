# Slice [ID]: [observable user outcome]

Status: Draft
User and value: [one actor/job]
Input: [data and validation]
Output: [observable result]
Proposed or observed files: [bounded paths]
Depends on: [real task/accepted boundary or none]
Acceptance owner: [actual owner or unassigned]

| Case | Given | When | Then | Meaningful check | Run state |
| --- | --- | --- | --- | --- | --- |
| Success | [authorized input/state] | [action] | [exact outcome] | [check] | unrun |
| Denied | [wrong owner/permission] | [same action] | [refuse before disclosure/effect] | [check or not applicable with reason] | unrun |
| Invalid | [bad or missing input] | [action] | [specific error, preserve useful input] | [check] | unrun |
| Empty | [no matching records] | [action] | [safe empty result] | [check or not applicable] | unrun |
| Failed | [request/storage failure] | [action] | [honest failure, no duplicate effect] | [check] | unrun |

Data ownership and server checks: [explicit rules or unresolved blocker]
Idempotency/retry: [if there is a write, how duplicate effects are prevented; otherwise not applicable]
Out of scope: [features excluded from this slice]
Unknowns: [question, blocked acceptance and recommended answer]
Completion evidence needed: [actual result paths/output; no claimed pass yet]
