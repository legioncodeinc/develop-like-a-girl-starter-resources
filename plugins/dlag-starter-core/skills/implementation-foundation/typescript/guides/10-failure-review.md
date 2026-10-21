# Failure review

Review these concrete cases before accepting a TypeScript patch:

| Trigger | Failure | Required evidence |
|---|---|---|
| Unknown request JSON is cast into a domain type | Runtime checks disappear | Invalid, oversized, unexpected-key, and malformed-body cases |
| A returned object spreads a full row or request context | Private fields reach the browser | Explicit DTO field list and serialized output inspection |
| Caught message is returned directly | Credentials or query content may leak | Stable public code and redacted internal diagnostics |
| Every ID causes a separate awaited read | Excess round trips or accidental serialization | Query count and required dependency ordering |
| User-sized Promise.all | Memory, connection, and rate-limit pressure | Input cap and measured in-flight limit |
| Write retried after uncertain failure | Duplicate mutation | Idempotency/transaction behavior and exact attempt cases |
| SQL is assembled from user text | Injection or wildcard widening | Parameters, identifier allowlist, intended pattern semantics |
| A handler ALTERs a table on demand | Unreviewed schema and policy drift | Reviewed migration, backfill, generated types, policy proof |
| A module caches current user/session | Cross-request data bleed | Concurrent users and request-specific construction |
| Node import reaches Worker/browser | Build success hides runtime failure | Transitive graph and matching target runtime |
| Stale generated route/binding declarations | Types describe an older config | Generation input identity plus appropriate type check |
| Tests call only their fake | Production unit remains untested | Real exported unit driven with an honest injected interface |
| CI fixes source and passes | The failure is concealed | Nonwriting gate and visible failed result |
| Old output satisfies file existence check | A stale artifact is released | Exact final manifest, hashes, required outputs, and legal files |

A heuristic finding requires source inspection before severity. A regex cannot prove a query is reachable or that a cast crosses an external boundary. Diagnose wrong-context compiler/import advice before rewriting source. Avoid tool or dependency migration disguised as cleanup. Preserve partial-test and unsupported-runtime limits in the report.
