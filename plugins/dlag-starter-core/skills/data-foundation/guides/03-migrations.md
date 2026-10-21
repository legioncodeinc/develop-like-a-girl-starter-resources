# 03: Migrations

Expand, backfill, validate and contract organize compatibility and locking risk. They do not by themselves guarantee uninterrupted production service.

See [official references](../references/official-sources.md) for PostgreSQL and Supabase behavior.

## The pattern

Split a single logical change into three deployments:

```
┌──────────┐      ┌──────────┐      ┌──────────┐
│ EXPAND   │  →   │ BACKFILL │  →   │ CONTRACT │
└──────────┘      └──────────┘      └──────────┘
   add new        populate new       remove old
   alongside        from old           shape
   old
```

Readers and writers follow a declared compatibility design during expand/backfill. Dual-write only where the two fields have equivalent meaning, and make same-database writes atomic. After compatible clients are proven and retired, contract can remove old shape.

### Phase 1: Expand
- Add new column / table / index: non-destructive.
- `CREATE INDEX CONCURRENTLY` takes `SHARE UPDATE EXCLUSIVE`, permits ordinary DML but can wait or fail. It cannot run inside a transaction block; inspect `pg_index.indisvalid` and `indisready`, and prepare failed-build recovery.
- Add as `NULL`able with no default (metadata-only).
- Use the declared atomic writer/authority rule; do not overwrite independently chosen values.

### Phase 2: Backfill
- Populate only values with a valid documented derivation; preserve unknown facts.
- **Use separately committed bounded driver batches:** choose size from measured workload budgets; persist the selected-row cursor after commit. Empty numeric ranges or zero changed rows do not prove completion.
- Observe dead tuples, replication lag, lock waits and critical-query impact; pause against measured budgets.
- For NOT NULL transitions: add `CHECK (col IS NOT NULL) NOT VALID`, then `VALIDATE CONSTRAINT` separately (SHARE UPDATE EXCLUSIVE plus a data scan), then `SET NOT NULL` (a valid proving CHECK can avoid the scan; its lock remains).

### Phase 3: Contract
- App code reads/writes only the new shape.
- Drop old column / index / constraint.
- Require evidence that every old writer/reader, including dormant jobs or offline clients, has retired before the separately approved destructive action.

## DDL lock review (check the actual PostgreSQL release)

| DDL | Lock class | Blocks reads? | Blocks writes? | Operational qualification |
|---|---|---|---|---|
| `CREATE INDEX` | `SHARE` | no | yes | no: use `CONCURRENTLY` |
| `CREATE INDEX CONCURRENTLY` | `SHARE UPDATE EXCLUSIVE` | no | no | permits ordinary writes; transaction/version/object restrictions and failed-build recovery remain |
| `ADD COLUMN` (nullable, no default) | `ACCESS EXCLUSIVE` | conflicts while held | conflicts while held | metadata-only for this form; acquisition can still wait |
| `ADD COLUMN ... DEFAULT <const>` (PG 11+) | `ACCESS EXCLUSIVE` | conflicts while held | conflicts while held | metadata-only for this form; acquisition can still wait |
| `ADD COLUMN ... DEFAULT <expr>` | `ACCESS EXCLUSIVE` | acquisition/hold depends on workload | acquisition/hold depends on workload | volatile defaults can rewrite; classify expression and server version |
| `ADD COLUMN ... NOT NULL` | `ACCESS EXCLUSIVE` | depends on operation | depends on operation | truth of existing values, default and writer compatibility must be proven |
| `ALTER COLUMN ... TYPE` (compatible) | `ACCESS EXCLUSIVE` | conflicts while held | conflicts while held | maybe |
| `ALTER COLUMN ... TYPE` (incompatible) | `ACCESS EXCLUSIVE` | yes | yes | **NO: table rewrite** |
| `ALTER COLUMN ... SET NOT NULL` | `ACCESS EXCLUSIVE` | conflicts while held | conflicts while held | maybe: full scan unless `CHECK NOT NULL` validated first |
| `DROP COLUMN` | `ACCESS EXCLUSIVE` | conflicts while held | conflicts while held | metadata-only for this form; acquisition can still wait |
| `ADD CONSTRAINT ... CHECK NOT VALID` | `ACCESS EXCLUSIVE` | conflicts while held | conflicts while held | metadata-only for this form; acquisition can still wait |
| `VALIDATE CONSTRAINT` | `SHARE UPDATE EXCLUSIVE` | no ordinary SELECT conflict | ordinary DML permitted | validation scans and other lock conflicts remain |
| `ADD FOREIGN KEY ... NOT VALID` | `SHARE ROW EXCLUSIVE` on referencing and referenced tables | ordinary SELECT permitted | ordinary writes conflict while held | skips initial validation scan; lock waits remain |

**Budget lock acquisition and hold time separately.** ACCESS EXCLUSIVE conflicts with reads and writes; metadata-only is not non-blocking. Use measured invocation-specific limits rather than a universal duration promise.

## Common patterns

### Add a NOT NULL column on a large table

```sql
-- Phase 1 :  Expand (one deploy)
ALTER TABLE public.member_profiles ADD COLUMN preferred_name text;  -- nullable, metadata-only

-- Application-owned table, not auth.users. Preserve a non-null preferred_name.
-- The complete writer-authority and null-initialization rule is in the worked case.

-- Phase 2: run separately committed driver batches.
-- See examples/migration-review.sql and guide 11 for selected-row cursors,
-- sparse keys, null-source handling and independent reconciliation.
-- This source sketch does not prove live migration behavior.

ALTER TABLE public.member_profiles ADD CONSTRAINT preferred_name_nn CHECK (preferred_name IS NOT NULL) NOT VALID;
ALTER TABLE public.member_profiles VALIDATE CONSTRAINT preferred_name_nn;
ALTER TABLE public.member_profiles ALTER COLUMN preferred_name SET NOT NULL;  -- scan may be skipped with valid proof; lock remains
ALTER TABLE public.member_profiles DROP CONSTRAINT preferred_name_nn;

-- Phase 3 :  Contract (later deploy)
-- App: retire the fallback only after writer coverage; retain independently
-- meaningful name and preferred_name fields and all newly recorded values.
```

See [the complete worked example](../examples/zero-downtime-not-null.md).

### Change a column type

When the type change would rewrite a hot table or break compatible clients, stage it:

1. Add a new column with the target type.
2. Backfill (with conversion).
3. Swap reads/writes incrementally.
4. Drop the old column.

### Rename a column

Single-step `ALTER TABLE ... RENAME COLUMN` is metadata-only and fast, but it requires every reader to pick up the new name simultaneously. In a multi-deploy world, instead:

1. Add a new column; trigger to keep it synced.
2. App code reads new, writes old.
3. App code reads new, writes both.
4. App code reads new, writes new.
5. Drop trigger and old column.

A project may already have migration automation using compatibility views. Inspect its exact generated SQL, writer behavior, transaction boundaries and recovery evidence; automation does not remove these requirements.

## Existing migration automation

Starter uses the project's accepted versioned SQL migration history. Do not add another migration tool or an ORM. Where existing tooling generates SQL, read that SQL and its transaction behavior, including whether a concurrent index would be incorrectly wrapped. Preserve one owner for the migration history.

Compatibility-view approaches can expose old and new representations to different clients. Their limits still include unsupported objects, dependencies, independently committed backfill, writer synchronization, lossy conversions and post-write rollback. A generated inverse expression is not proof that every future value is representable by the old client. Do not copy provider-specific configuration or commands into an unselected stack.

## Checklist

Use `templates/migration-plan.md` and `templates/expand-backfill-contract-checklist.md`. Every migration plan must:

- [ ] State the Postgres major version.
- [ ] State the lock class of every DDL.
- [ ] Identify ACCESS EXCLUSIVE operations, compatibility risks and scan/rewrite work. Choose staged changes from actual workload, not a universal row cutoff.
- [ ] Specify the rollback path.
- [ ] Specify verification queries (handed to `Quality Review Specialist`).

## Cross-references

- `04-partitioning.md`: partition `ATTACH` / `DETACH` lock behavior.
- `05-performance-pooling.md`: bloat after backfill; autovacuum tuning.
- `templates/migration-plan.md`, `templates/expand-backfill-contract-checklist.md`.
