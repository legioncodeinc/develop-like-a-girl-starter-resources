# Query performance and connection pooling

Use supplied plans, sanitized statistics and non-secret architecture. Record actual PostgreSQL/client/pooler versions, capture time, workload and missing observations. The [plan-reading procedure](review-query-plan.md) and [operator specimen](../scripts/analyze-query-plan.md) retain the complete capture/review workflow, but this Playbook does not connect to a database.

## Estimated and actual plans

`EXPLAIN` describes a chosen plan and estimates; `EXPLAIN (ANALYZE, BUFFERS)` executes the statement and reports actual execution observations. An actual plan is useful for performance evidence but must come from a separately authorized environment. Mutating SQL, invoked functions, triggers, locks and external effects require explicit consideration. A transaction rollback does not reverse every possible effect or make an untrusted statement safe. See [PostgreSQL EXPLAIN](https://www.postgresql.org/docs/current/using-explain.html).

Read in this order:

1. Identify the top operation and the expensive leaf/inner nodes: sequential, index, index-only, bitmap, joins, aggregation and sorting.
2. Compare estimated rows with actual rows at each node. Large differences suggest statistics, correlation, skew, parameter sensitivity or predicate modeling problems. Statistics refresh is a possible separately authorized action, not an automatic fix.
3. Read loops with row/timing units. An inner node can execute once per outer row within one SQL statement; this is not proof of application-level N+1 network queries. Inspect query logs or call sites for N+1.
4. Compare shared buffer hits, reads, temporary I/O and rows removed. A buffer read can be satisfied by the operating system cache; it is not necessarily a physical disk read. Use timing and workload context before diagnosing RAM or storage.
5. Inspect sort method, memory and spill size, join batches and aggregation strategy. Reduce unnecessary work before raising memory. `work_mem` applies to operations and concurrent workers/queries, so a global increase can multiply memory use.
6. Confirm expected index usage, query predicates, type casts, collation, parameterization and partial-index implication. An index-only scan still may fetch heap pages for MVCC visibility.

## Diagnosis and proposed follow-up

| Observed signal | Candidate explanation | Next evidence or bounded repair |
|---|---|---|
| Selective query scans many rows | Missing index, mismatch, low selectivity estimate or cheaper scan | Read index definitions and filters; compare actual rows and costs |
| Large estimate error | Stale statistics, correlated columns, skew or parameter choice | Inspect statistics age and representative parameter sets |
| Many nested-loop inner executions | Expected join strategy or excessive intermediate rows | Check cardinality/total work; count application queries separately |
| Sort spills to disk | Too much input, sort shape or limited per-operation memory | Reduce/scope/order work; propose measured memory trial |
| Frequent buffer reads | Working set churn or access pattern; not proof of physical I/O | Compare warm/cold captures and available I/O measurements |
| Heap fetches in index-only plan | Visibility-map state or recently changed rows | Inspect vacuum/write activity before adding more INCLUDE columns |

Treat each repair as a hypothesis until a comparable capture establishes its effect. Keep data scale, parameters, cache conditions and revision visible.

## Autovacuum and dead tuples

Updates and deletes create obsolete row versions that vacuum can reclaim when no snapshot still needs them. Long transactions, replication-related retention, write rate, table size and worker capacity affect cleanup. Read the actual configuration and statistics, not assumed defaults.

The threshold model includes a base threshold and a table-size scale factor; releases also expose additional controls. For illustration only, `50 + 0.20 * 100000000` is roughly 20 million changed/dead tuples. That arithmetic is not a statement of the current server's complete trigger rules. A workload-specific tuning proposal could contain:

```sql
-- Unexecuted tuning proposal. Values require measured justification.
ALTER TABLE public.hot_table SET (
  autovacuum_vacuum_scale_factor = 0.01,
  autovacuum_vacuum_threshold = 1000,
  autovacuum_analyze_scale_factor = 0.005,
  autovacuum_vacuum_cost_limit = 2000
);
```

Insert-triggered vacuum controls concern insert workloads; they are not a general solution to updates of indexed columns. Inspect wraparound risk and long-running transactions as well as ordinary dead-row cleanup. See [routine vacuuming](https://www.postgresql.org/docs/current/routine-vacuuming.html).

The [statistics specimen](../scripts/bloat-check.sql) reports estimated live/dead tuples, recent vacuum/analyze timestamps and index size. Dead-tuple percentage is not physical table bloat, and index size is not index bloat. A high value is a triage signal, not an automatic emergency threshold. Physical inspection, if justified, needs a separately authorized supported tool and its load/permission assessment.

Normal vacuum can make space reusable without shrinking the file. VACUUM FULL rewrites and requires an exclusive lock. REINDEX and concurrent variants have object/version restrictions and resource cost. Online-rewrite tools can still take locks and need capacity. Do not install extensions or perform maintenance from this Playbook.

## Pool mode and request lifetime

Starter may use the Supabase HTTP Data API. That boundary does not use a TCP database pool in every Worker. When an existing approved server SQL client is present, inspect its Workers compatibility, TLS, transport and limits.

| Mode | Lifetime | Review concern |
|---|---|---|
| Direct/session | Server session held for a client | Capacity, long-lived state, network reachability and cleanup |
| Transaction pooling | Server session released after transaction | No request identity stored across transactions; actual client/protocol limitations |
| Statement pooling | Server session released per statement | Multi-statement transactions are unavailable; not a Starter default |

Supabase documents that transaction mode does not support prepared statements or query pipelining. Its current client-specific settings must be checked against the selected driver. Do not infer support from PostgreSQL major version alone. PgBouncer's protocol-level prepared-statement support depends on its own version/configuration; that does not change Supabase's documented mode contract. See [Supabase connections](https://supabase.com/docs/guides/database/connecting-to-postgres) and [PgBouncer features](https://www.pgbouncer.org/features.html).

Do not borrow session `SET`, temporary state or LISTEN subscriptions across pooled transactions. If a reviewed design uses transaction-local tenant context, derive it from authenticated authority, set it in the same transaction as every relevant query, and prove cleanup after both commit and rollback. A custom setting is an app assertion, not authentication.

## Capacity and time budgets

Count every database/user pool and replica/application instance; `default_pool_size` can apply per database/user pair. Include reserve pools, migration/admin connections and other services. An illustrative database budget of 200 connections minus 20 reserved, divided across four equivalent pools, gives 45 each only when those are the entire pool population. It is not a safe universal configuration.

Review application pool size and bounded wait time, connection establishment timeout, statement timeout, lock timeout and idle-in-transaction timeout independently. A smaller pool can reduce overload but can also queue work. Match limits to accepted latency/retry budgets and capture the failure behavior. The [pooling worksheet](../templates/pooling-review.md) includes the complete operational questions without shipping a self-hosted pooler configuration.

## Other settings and observability

`shared_buffers`, `effective_cache_size`, `work_mem`, `maintenance_work_mem`, `random_page_cost`, `effective_io_concurrency` and WAL limits influence different costs and resource budgets. Collect current values and evidence before changing any. Managed-provider controls may differ.

An existing approved `auto_explain` setup can capture slow-plan evidence; ANALYZE/buffer collection adds overhead and query logs may contain sensitive values. Review sampling, redaction, retention, access and provider support with Security. Do not enable logging or change provider settings through a schema-design request.

Return the diagnosis, its supplied evidence, a bounded proposed change, comparable follow-up checks and remaining unknowns in the [findings report](../templates/audit-template.md).
