# Schema Spec: [project-name]

**Date:** [YYYY-MM-DD]
**Author:** Data Foundation Specialist
**Postgres version observed or unknown:** [actual server version from supplied evidence]
**ORM:** [existing client or SQL boundary; no new ORM selected]
**Platform:** Supabase Postgres and Auth; Workers backend; R2 objects

---

## Context

[One paragraph: what is this schema for, who consumes it, what's the workload shape (read/write ratio, expected row counts at 12 / 24 / 36 months), what are the constraints (RPO/RTO, latency targets, geographic distribution).]

## Accepted requirement

[Link the user-approved project requirement or existing notebook entry, and identify unresolved product decisions.]

## Tables

### `[table-name]`

**Purpose:** [one sentence]
**Expected row count at 12mo:** [N]
**Read pattern:** [e.g., point lookups by ID; range scans by created_at; full-text search]
**Write pattern:** [e.g., append-only; high-update on status; bulk insert nightly]

| Column | Type | Constraints | Notes |
|---|---|---|---|
| `id` | `BIGINT GENERATED ALWAYS AS IDENTITY` | PRIMARY KEY | |
| `created_at` | `TIMESTAMPTZ` | NOT NULL DEFAULT now() | |
| `updated_at` | `TIMESTAMPTZ` | NOT NULL DEFAULT now() | maintained by trigger |
| ... | ... | ... | ... |

**Indexes:**

| Index | Columns | Type | Reason |
|---|---|---|---|
| `[table]_pkey` | `id` | B-tree (PK) | |
| `[table]_status_pending_idx` | `created_at` | B-tree, partial WHERE status='pending' | dashboard query |

**Constraints:**

- `CHECK ([...])`: [reason]
- `EXCLUDE USING gist ([...])`: [reason] (if applicable)

**FK targets:**

- `[column]` REFERENCES `[other-table]([column])` `ON DELETE [RESTRICT|CASCADE|SET NULL]` (FK index: ✓)

**PII columns:**

- `[column]`: [type of PII; flagged for `Security Review Specialist` audit]

---

(Repeat per table.)

## Relationships diagram

[ASCII or Mermaid. Show FKs and cardinality.]

## Migration tooling

- **Tool:** [existing versioned SQL runner and its actual transaction behavior]
- **Initial migration:** [description]

## Partitioning

[Either a workload-backed no-partition decision, or per-table key/type/lifecycle/retention and measured rationale.]

## Special-purpose

- **`pgvector`:** [tables that hold embeddings + dimension + index family: `hnsw` or `ivfflat`]
- **FTS:** [tables with `tsvector` columns + GIN indexes]
- **Time-series needs:** [partition/lifecycle/rollup requirements; no new extension or service selected]

## Open questions

- [ ] [any user-judgment calls]

## Handoffs

- **`Project Planning Specialist`**: PRD update if scope changed during design.
- **`React Foundation Specialist`**: N+1 risk callouts at the data-layer edge.
- **`Security Review Specialist`**: RLS design, PII columns, encryption-at-rest, audit-log compliance.
- **`Search Foundation Specialist`**: embedding storage decisions and dimensions for retrieval.
- **`Quality Review Specialist`**: verification queries after migration runs.

## References

- `guides/01-schema-design.md`
- `guides/02-indexing.md`
- [external URLs]

---

