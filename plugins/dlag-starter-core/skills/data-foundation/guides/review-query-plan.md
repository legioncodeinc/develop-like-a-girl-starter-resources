# Review a supplied query plan

Accept a sanitized plan and the minimum query/schema context needed to explain it. Do not request passwords, connection URIs, raw customer records or unredacted query parameter values. If a plan contains sensitive literals, have the owner supply a sanitized copy that preserves relevant types and cardinality relationships.

## Intake

Record PostgreSQL version, client/schema revision, capture date, environment, estimated or actual plan, query shape, parameter classes, representative table size and row distribution. Record the source of timings and whether cache conditions or instrumentation changed. A plan without ANALYZE cannot establish actual latency. An actual plan from a tiny synthetic table cannot establish production performance.

## Walk the tree

1. Start with overall execution/planning time and the top operation, then find nodes that dominate work. Costs are planner units, not milliseconds.
2. Read scan conditions, filters, join conditions and rows removed. Compare actual outputs with estimates at the same node.
3. Respect loops and per-loop values. A nested-loop inner scan repeating many times can be appropriate; determine the aggregate work. Confirm application N+1 independently from call sites or a supplied query-count trace.
4. Compare shared hits, reads and temporary blocks. Shared reads are buffer-cache misses and may still hit the OS cache. Look for spill or unexpectedly broad fetches before recommending more RAM.
5. Check sorts, hash batches, aggregates, LIMIT behavior and row widths. Avoid interpreting an early-stopped subtree as if it ran to completion.
6. If an expected index is absent, inspect matching data types, predicate shape, collation/operator class, partial-index condition and parameter assumptions. A sequential scan may correctly win for a small table or a broad result.
7. If an index-only plan has heap fetches, inspect visibility and write/vacuum activity. INCLUDE alone cannot guarantee no heap access.

## Convert observation into a useful finding

Write: observed node/metric, expected workload, plausible cause, alternative explanation, one proposed repair and the next measurement. For example, a synthetic plan estimating 10 rows while returning 10,000 supports an estimate-error observation; it does not by itself prove stale statistics or a missing index.

Preserve the original workload's row/tenant filters in every proposed query. Do not remove authorization predicates to make a benchmark faster. Compare representative parameters, correctness, result counts and side effects along with timing.

## Missing capture

Ask for the missing plan or record the performance conclusion as unmeasured. The [complete operator capture specimen](../scripts/analyze-query-plan.md) explains how a separately authorized operator can obtain one. The Playbook does not execute it. Use the [performance guide](05-performance-pooling.md) for statistics, pooling and follow-up decisions.
