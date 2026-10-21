# 02: Indexing

Pick the right index family per workload + column type. Tie each recommendation to supplied workload evidence.

See [official references](../references/official-sources.md) for PostgreSQL and Supabase behavior.

## The decision tree

Ask, in order:

1. **What is the column type?** Eliminates most options.
2. **What is the predicate shape?** Equality, range, containment, FTS, similarity.
3. **What is the data distribution?** Skewed, sparse, append-only, random.
4. **What is the read/write ratio?** GIN is slow to write; BRIN is tiny to write.

## Index families

| Index | Best for | Bad for |
|---|---|---|
| **B-tree** (default) | Equality + range on scalars; sorting; PK; FK; status filters | Containment, FTS, geometry |
| **GIN** | `jsonb`, arrays, FTS (`tsvector`), `pg_trgm` similarity | High write throughput |
| **GiST** | Range types, geometry, exclusion constraints, FTS | Plain scalar equality (B-tree wins) |
| **BRIN** | Very large tables where physical order ≈ logical order (time-series append) | Random access; small tables |
| **Hash** | Equality only; rarely better than B-tree | Range queries |
| **SP-GiST** | Specialized partition / quad-tree shapes | General use |
| **Bloom** | Many low-selectivity predicates AND-ed (warehousing) | Single-predicate filters |

## Index modifiers

### Partial
Index only the rows you actually query:
```sql
CREATE INDEX ON orders (created_at) WHERE status = 'pending';
```
Index size depends on row count, values and overhead; no fixed reduction is promised. Particularly powerful with skewed status fields.

### Covering (`INCLUDE`)
Append non-key columns for index-only scans:
```sql
CREATE INDEX ON orders (user_id) INCLUDE (status, total);
```
The query can become eligible for an index-only scan, but visibility-map state may still require heap fetches. INCLUDE adds storage and write cost. Measure the actual plan.

### Expression
Index a derived value:
```sql
CREATE INDEX ON users (lower(email));
CREATE INDEX ON events ((payload->>'tenant_id'));
```
Required for case-insensitive searches and `jsonb` shortcuts.

### Unique
```sql
CREATE UNIQUE INDEX users_email_active
  ON users (email)
  WHERE deleted_at IS NULL;
```
Partial uniqueness: soft-deleted users can have repeated emails; active users cannot.

## FK index coverage

Postgres does **not** auto-create indexes on FK columns. Review every FK for usable B-tree coverage or a workload-backed exception:

```sql
ALTER TABLE posts ADD COLUMN author_id BIGINT NOT NULL REFERENCES users(id);
CREATE INDEX ON posts (author_id);  -- if existing valid coverage is absent
```

The [index-review SQL](../scripts/audit-missing-indexes.sql) reports candidate gaps and index definitions. It is a review specimen, not a complete proof of every operator class or partitioned-index case.

## Index for status / hot filters

A status distribution such as 95% completed can make a partial index useful when the important queries select the remaining rows:

```sql
CREATE INDEX ON orders (created_at) WHERE status IN ('pending', 'failed');
```

Confirm that the actual dashboard predicate implies the partial-index predicate and inspect the plan.

## Index for `jsonb`

```sql
CREATE INDEX ON events USING gin (payload jsonb_path_ops);
```

`jsonb_path_ops` supports `@>`, `@?` and `@@`, but not key-existence operators. It is often smaller. `jsonb_ops` also supports `?`, `?&` and `?|`; compare the actual predicates and write cost.

For a single hot scalar key, consider a matching expression B-tree:
```sql
CREATE INDEX ON events ((payload->>'tenant_id'));
```

## Index for FTS

```sql
ALTER TABLE articles ADD COLUMN search_vector tsvector
  GENERATED ALWAYS AS (
    setweight(to_tsvector('english', coalesce(title, '')), 'A') ||
    setweight(to_tsvector('english', coalesce(body, '')), 'B')
  ) STORED;

CREATE INDEX ON articles USING gin (search_vector);
```

The stored generated column computes tokens on writes. The GIN index may speed matching; ranking, row filtering and result fetches still have costs.

## Index for ranges and exclusion

GiST powers range overlap queries and `EXCLUDE` constraints:
```sql
CREATE INDEX ON bookings USING gist (during);
```

## BRIN for time-series append-only

For tables that are append-only and queried by a time predicate:
```sql
CREATE INDEX ON events USING brin (created_at) WITH (pages_per_range = 32);
```

BRIN stores page-range summaries and is often much smaller than a per-row B-tree. It returns candidate page ranges for rechecking. Its usefulness depends on physical correlation, range size and selectivity; no fixed size or latency gain is promised.

## `pgvector` indexes

For embedding columns (`vector(1536)`):
```sql
CREATE INDEX ON documents USING hnsw (embedding vector_cosine_ops);
```

Choose HNSW, IVFFlat or exact search from the installed extension, vector shape, measured recall/latency and memory/build constraints. No model or extension is added automatically. Hand retrieval behavior to Search Foundation. See [special-purpose PostgreSQL](06-special-purpose.md).

## Anti-patterns

- **Indexing every column "just in case".** Each index slows writes and bloats. Index by query plan, not paranoia.
- **Multi-column indexes in the wrong column order.** Leading equalities generally narrow a B-tree scan most effectively. Actual version, distribution and skip-scan opportunities matter; inspect the plan rather than declaring every suffix predicate unusable.
- **Redundant indexes.** `(a)` and `(a, b)` may overlap, but uniqueness, predicate, operator class, collation, order, included columns and size can differ. The SQL reports candidates only; never drop an index from a prefix match alone.
- **Building `CREATE INDEX` (not `CONCURRENTLY`) on a hot table in production.** This takes a `SHARE` lock that blocks writes for the duration. Consider CONCURRENTLY for an accepted hot-table build, with its own transaction boundaries and failure recovery; new empty tables and partitioned parents have different requirements.
- **`CREATE INDEX CONCURRENTLY` left invalid.** A concurrent build may leave an invalid index. Inspect the named index and validity/readiness flags, then prepare a separately authorized recovery. Invalid indexes can still add write cost.

## Maintenance

- Reindex only for a demonstrated need and an approved operation; concurrency support and caveats depend on server version/object type.
- Use [dead-tuple and size statistics](../scripts/bloat-check.sql) as triage, not a physical bloat measurement.
- Inspect apparently unused indexes across a representative workload and known statistics-reset window, including rare jobs, replica use and constraint dependencies. Zero scans alone does not authorize removal.

## Cross-references

- [Schema](01-schema-design.md): every important query needs a reasoned index decision, including no-index decisions.
- `05-performance-pooling.md`: interpret `EXPLAIN (ANALYZE, BUFFERS)` to confirm the index is used.
- `templates/indexes-decision-tree.md`: printable cheat sheet.
