# Indexes Decision Tree

Printable cheat sheet. Keep within arm's reach during schema review.

---

## Step 1: What is the column type?

| Column type | First-pass index family |
|---|---|
| `int`, `bigint`, `text`, `timestamptz`, `uuid`, `boolean` | B-tree |
| `jsonb` | GIN (`jsonb_path_ops`) |
| Array (`int[]`, `text[]`) | GIN |
| `tsvector` (FTS) | GIN |
| Range types (`tstzrange`, `int4range`) | GiST |
| Geometry (`point`, `polygon`, PostGIS types) | GiST |
| `vector` (pgvector) | Exact search, HNSW or IVFFlat, selected from supported dimensions and measured workload |
| Append-only time-series scalar | BRIN |

## Step 2: What is the predicate shape?

| Predicate | Best |
|---|---|
| `=`, `<`, `>`, `BETWEEN`, `ORDER BY` | B-tree |
| `@>` containment on `jsonb` | GIN `jsonb_path_ops` |
| `?`, `?&`, `?|` on `jsonb` (key existence) | GIN `jsonb_ops` |
| `&&` overlap on ranges | GiST |
| `@@` FTS match | GIN on `tsvector` |
| `LIKE 'foo%'` (prefix) | B-tree on `text_pattern_ops` |
| `ILIKE '%foo%'` (substring) | GIN `pg_trgm` |
| `<->` distance (vector) | HNSW or IVFFlat |

## Step 3: Apply modifiers

| Modifier | When |
|---|---|
| **Partial** (`WHERE ...`) | Index the actual predicate subset; measure size and query effects |
| **Covering** (`INCLUDE (...)`) | Make index-only scans possible; visibility-map heap checks can remain |
| **Expression** (`lower(email)`, `(payload->>'k')`) | Match the form of the predicate exactly |
| **Unique** | Enforce uniqueness; partial uniqueness via `WHERE` |

## Required index review

- [ ] **Every primary key.** (Auto.)
- [ ] **Every foreign key reviewed.** PostgreSQL does not create the referencing index automatically; record usable existing coverage or a workload-backed exception.
- [ ] **Frequent query predicates reviewed.** Selectivity, composite order and existing coverage determine the decision.
- [ ] **Frequent sorting reviewed with filtering and LIMIT.** No automatic index per column.
- [ ] **FTS match workload reviewed.** GIN is a candidate, with ranking/language/query evidence.
- [ ] **JSON predicates reviewed.** Choose GIN class or a scalar expression index from the actual operators.

## Avoid

- [ ] Indexing a column that's never filtered.
- [ ] Multi-column index where the leading column rarely appears in the predicate.
- [ ] Potentially overlapping `(a)` and `(a, b)` indexes without checking uniqueness, predicate, operator class, collation, included columns and workload cost.
- [ ] `CREATE INDEX` (not `CONCURRENTLY`) on a hot table in production.
- [ ] An invalid index (`indisvalid = false`) left in place after a failed concurrent build.

## Maintenance

- [ ] Propose REINDEX only for an evidenced need, with actual object/version limits and separate authorization.
- [ ] Watch for unused indexes: `pg_stat_user_indexes` with `idx_scan = 0` over a known representative observation window.
- [ ] Review [dead-tuple and size statistics](../scripts/bloat-check.sql), keeping physical bloat claims separate.
- [ ] Watch for index size growth: `pg_indexes_size('table')`.

---

See [the complete index guide](../guides/02-indexing.md) and [official references](../references/official-sources.md).
