# Worker coordination cases

These are local constructed inputs for the [complete structural validator](../scripts/validate_handoff.py), not actual runtime observations, accepted contracts or launch instructions. Their all-zero base identifier qualifies syntax only; it does not identify a real repository. Fields that assert verification or acceptance are deliberately untrusted input under test.

| Case | Expected structural result | Operational meaning |
| --- | --- | --- |
| [Independent preparation](independent-preparation.json) | PASS with illustrative/unverified warnings | Declared slots fit, but no ready implementation, accepted contract or actual capacity is established. |
| [Overlapping paths](overlapping-paths.json) | FAIL, ownership overlap | Refuse conflicting writers and return the shared subtree to one owner. |
| [Unknown capacity](unknown-capacity.json) | FAIL, readiness needs verified capacity | Approval-looking strings are assertions; inspect actual capacity or stay in preparation. |
| [Draft contract](draft-contract.json) | FAIL, accepted contract required | Consumers cannot implement ready work against Draft terms. |

An authorized caller can run these inputs or [the original structural regression suite](../scripts/test_validate_handoff.py). Outputs become observed parser evidence only after an actual run; they never prove installed selection, dispatch, native supervision, model learning or application behavior.

## Stop and handoff case

A worker has one saved guide and an unfinished example at its deadline. Request stop through the actual available tool, inspect acknowledgment and final status plus any exposed child processes, preserve the saved artifact and its hash/checks/attempt history, then transfer only the unfinished lease. Missing stop acknowledgment keeps the lease occupied. The combined candidate still needs Security, Quality and parent repository review in order. This is an illustrative method, not a claim that a worker was stopped here.
