# Migration Plan: [slug]

**Date:** [YYYY-MM-DD]
**Author:** Data Foundation Specialist
**Postgres version:** [exact major/minor]
**Tooling:** [existing versioned SQL runner and its actual transaction behavior]
**Affected tables:** [table-1 (~N rows), table-2 (~N rows)]

---

## Goal

[One paragraph: what is changing, why, and what's the user-visible behavior change.]

## Risk classification

- **Largest affected table:** [N] rows
- **Expand-backfill-contract required?** [yes / no, and why]
- **Estimated worst-case lock duration:** [seconds]
- **Replication impact:** [e.g., slot lag, downstream consumers, logical replication]

## Phase 1: Expand

| DDL | Lock class | Duration estimate | Notes |
|---|---|---|---|
| `ALTER TABLE x ADD COLUMN y text;` | `ACCESS EXCLUSIVE` | [measured acquisition/hold budgets] | metadata-only still acquires lock |
| `CREATE INDEX CONCURRENTLY ...` | `SHARE UPDATE EXCLUSIVE` | [minutes] | permits ordinary writes; lock waits and other conflicts remain |

**App code change:**
- [Describe dual-write or read-from-both pattern.]

**Verification:**
- [ ] `\d [table]` shows new column / index.
- [ ] Exact schema/index catalog lookup below returns one intended index, `indisvalid = true` and `indisready = true`.

## Phase 2: Backfill

Use the [live-schema packet](live-schema-migration-packet.md) and [single-batch SQL sketch](../examples/migration-review.sql). Driver commits each bounded batch, persists selected cursor after commit, keeps target-null guards and independently reconciles sparse IDs, unknown source data and concurrent writers. No DO loop or zero-update termination proof.


**Throttle / pause criteria:**
- Autovacuum lag > [threshold].
- Replication slot lag > [threshold].

**For NOT NULL transitions:**
1. `ALTER TABLE x ADD CONSTRAINT y_nn CHECK (y IS NOT NULL) NOT VALID;`
2. `ALTER TABLE x VALIDATE CONSTRAINT y_nn;` (SHARE UPDATE EXCLUSIVE; data scan and conflicts remain)
3. `ALTER TABLE x ALTER COLUMN y SET NOT NULL;` (validated CHECK may avoid scan; ACCESS EXCLUSIVE still acquired)
4. `ALTER TABLE x DROP CONSTRAINT y_nn;`

**Verification:**
- [ ] Row count of `[new_col] IS NOT NULL` matches expected.
- [ ] Constraint validated.

## Phase 3: Contract

| DDL | Lock class | Notes |
|---|---|---|
| `ALTER TABLE x DROP COLUMN old_col;` | `ACCESS EXCLUSIVE` | metadata-only |
| `DROP INDEX ...` | `ACCESS EXCLUSIVE` | acquisition and hold must be measured |

**App code change:**
- [Stop dual-writing; new column / shape is source of truth.]

**Pre-conditions:**
- [ ] Complete deployed reader/writer inventory and retirement evidence meet the declared compatibility window.
- [ ] No traffic to the old shape (logs / metrics).

## Rollback

- **Before new writes:** preserve expanded fields; test app rollback and writer compatibility.
- **After committed backfill/new writes:** retain new values and prove inverse conversion, old-client representability and reconciliation. A later ROLLBACK cannot undo prior commits. Do not truncate or drop-and-readd.
- **After contract:** require tested recovery and declared data-loss window; choose forward repair when reverse conversion is lossy.

## Verification queries (handed to `Quality Review Specialist`)

```sql
-- 1. Row counts match
SELECT count(*) FROM [table] WHERE [new_col] IS NULL;  -- classify eligible, unknown, rejected and mismatched populations; zero only if justified

-- 2. Indexes valid
SELECT n.nspname, t.relname AS table_name, i.relname AS index_name,
       x.indisvalid, x.indisready
FROM pg_catalog.pg_index x
JOIN pg_catalog.pg_class i ON i.oid = x.indexrelid
JOIN pg_catalog.pg_class t ON t.oid = x.indrelid
JOIN pg_catalog.pg_namespace n ON n.oid = t.relnamespace
WHERE n.nspname = '[schema]' AND t.relname = '[table]'
  AND i.relname = '[index]';
-- Zero/multiple rows fail the named-index check; sketch requires native revision proof.

-- 3. Inert example only: ANALYZE executes SQL and requires separate approval.
-- Review the entire statement, functions, triggers and possible external effects.
EXPLAIN (ANALYZE, BUFFERS) [representative query];
```

## Handoffs

- **`Quality Review Specialist`**: reviews actual supplied verification evidence after Security and distinguishes source review from native/provider proof. A separately authorized operator with the required tools executes database and native checks.
- **`Security Review Specialist`**: review any new PII columns or RLS impact.
- **`React Foundation Specialist`**: flag any data-layer changes the UI must adopt.

## References

- `guides/03-migrations.md`
- `templates/expand-backfill-contract-checklist.md`
- [external URLs]

---

