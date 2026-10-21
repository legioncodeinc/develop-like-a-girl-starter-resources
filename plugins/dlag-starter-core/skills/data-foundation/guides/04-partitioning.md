# 04: Partitioning

Declarative partitioning splits a logical table into physical child tables routed by a partition key. Consider it when pruning or lifecycle operations solve a measured problem; there is no universal row-count threshold.

See [official references](../references/official-sources.md) for PostgreSQL and Supabase behavior.

## When to partition

- Table size, memory pressure and maintenance costs justify additional objects and lifecycle work.
- Most queries filter on the partition-key column.
- Data has a natural disposal cadence (drop old months, drop old tenants).
- Bulk load patterns target one partition at a time.

Avoid partitioning solely because a row count sounds large. Queries without useful partition predicates may scan many partitions, and numerous partitions add planning/maintenance cost.

## Strategy choice

| Strategy | When | Example |
|---|---|---|
| **Range** | Time-series, monotonic keys | One partition per month for events |
| **List** | Discrete, low-cardinality categorical key | One partition per region or per tenant tier |
| **Hash** | Even distribution; key is unordered | Partitioning application rows by hash of `tenant_id` within one database |

Sub-partitioning (range-then-hash) is sometimes worth it for very large multi-tenant time-series; reach for it only when the read pattern justifies the complexity.

## Range partitioning by time

All SQL below is inert review material for application-owned tables. Adapt names, grants and RLS before any separately authorized execution. Supabase Auth tables are not changed.

```sql
CREATE TABLE events (
  id BIGINT GENERATED ALWAYS AS IDENTITY,
  occurred_at TIMESTAMPTZ NOT NULL,
  payload JSONB NOT NULL,
  PRIMARY KEY (id, occurred_at)            -- partition key must be in PK
) PARTITION BY RANGE (occurred_at);

CREATE TABLE events_2026_04 PARTITION OF events
  FOR VALUES FROM ('2026-04-01') TO ('2026-05-01');
CREATE TABLE events_2026_05 PARTITION OF events
  FOR VALUES FROM ('2026-05-01') TO ('2026-06-01');
```

**Indexes are per partition.** Define them on the parent and they propagate; or define per partition for partition-specific tuning.

## Partition pruning

The planner or executor may prune partitions when the predicate and plan support it:

```sql
EXPLAIN SELECT * FROM events WHERE occurred_at >= '2026-04-15' AND occurred_at < '2026-04-20';
-- Expected pruning candidate: events_2026_04. Inspect the actual plan.
```

**Pitfalls:**
- Predicate must reference the partition key directly. `WHERE date_trunc('day', occurred_at) = ...` may not match the partition bounds. Prefer an equivalent bounded range and inspect the plan; wrapping a column is not a general fix.
- Joins prune both sides only when the planner can match partitions.
- `enable_partition_pruning = on` (default in PG 11+).

## Attach / detach lifecycle

### Attach a prepared partition with explicit locks

```sql
-- 1. Create as a regular table; populate or leave empty
CREATE TABLE events_2026_06 (LIKE events INCLUDING DEFAULTS INCLUDING CONSTRAINTS);
ALTER TABLE events_2026_06 ADD CONSTRAINT events_2026_06_check
  CHECK (occurred_at >= '2026-06-01' AND occurred_at < '2026-07-01');

-- 2. A matching valid CHECK can avoid the attached-table scan. Locks remain.
ALTER TABLE events ATTACH PARTITION events_2026_06
  FOR VALUES FROM ('2026-06-01') TO ('2026-07-01');
```

### Detach with `CONCURRENTLY` (PG 14+)

```sql
-- Assumes a previously created March partition; separate authorized operation.
ALTER TABLE events DETACH PARTITION events_2026_03 CONCURRENTLY;
-- Retain/archive according to accepted recovery and retention requirements.
-- A later approved deletion may use DROP TABLE; detachment does not authorize it.
```

ATTACH takes SHARE UPDATE EXCLUSIVE on the parent and ACCESS EXCLUSIVE on the attached partition. A default partition can also require locking/scanning unless a valid exclusion CHECK proves no overlap. DETACH CONCURRENTLY uses a different locking/transaction sequence, cannot run in a transaction block and has restrictions, including a default partition. Record actual version, prerequisites and interrupted-operation recovery.

## Automation

Per-partition `CREATE TABLE` is repetitive. Options:

- **Existing operator procedure:** schedule creation far enough ahead for the accepted workload and failure/retry window. This does not select a job provider.
- **Existing supported partition tooling:** review its exact version and failure/retry behavior if the project already uses it. This Playbook does not install or enable it.
- **Time-series requirements:** use the decision criteria in [special-purpose PostgreSQL](06-special-purpose.md); adding another provider or extension is a separate decision.

## Cross-references

- `01-schema-design.md`: partition key must be in the primary key.
- `03-migrations.md`: `ATTACH` / `DETACH` lock semantics.
- [Special-purpose PostgreSQL](06-special-purpose.md): time-series requirements and selected-stack limits.
