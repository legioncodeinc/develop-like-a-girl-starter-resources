# Worked example: introduce a required preferred name

This is a hypothetical review case, not an applied migration or a zero-downtime result. The table is application-owned `public.member_profiles`, not Supabase's managed `auth.users`. Inspect the actual PostgreSQL version, current DDL, migration history and writer revisions before adapting it. See [live changes](../guides/11-live-schema-migration.md) and the [migration packet](../templates/live-schema-migration-packet.md).

## Declared scenario

- Existing application table: `public.member_profiles(id bigint PRIMARY KEY, name text NOT NULL)`.
- Supplied hypothetical workload: 100 million rows, 500 writes/s, 5,000 reads/s. These numbers are scenario inputs, not measurements or safety thresholds.
- Product rule: initialize `preferred_name` from `name` when no independently chosen preferred name exists. After explicit choice, preferred name can differ from name.
- Every existing `name` is a valid initial preferred value. If the actual data violates that rule, stop the NOT NULL transition and report the unknown population.
- Tooling: existing versioned SQL migration history and an explicitly approved operator-controlled batch mechanism. No job provider or new migration tool is selected.

The tempting `ADD COLUMN preferred_name text NOT NULL DEFAULT name` is invalid: a PostgreSQL default cannot reference another column. It establishes neither a measured lock duration nor a rewrite result. Add a nullable field, preserve product meaning, and stage the compatibility change.

## 1. Establish writer authority before expand

Inventory old/new request handlers, imports, scripts and other writers. Old clients know only `name`; they must never clear an already recorded `preferred_name`. New clients distinguish an explicit preferred-name change from a normal name change. During coexistence, the authoritative transaction rule is:

- Creating a row supplies `name` and initializes `preferred_name` to the explicit value if supplied, otherwise the same `name` value.
- A name-only update preserves a non-null preferred name. If it is still null, initialization can occur atomically from the new name.
- An explicit preferred-name update writes only that intended value and validates the same product rule as every other writer.
- The backfill writes only still-null targets. Row races, retries and concurrent name/preferred changes need native rehearsal.

If old direct writers cannot satisfy this rule, adapt them or design a reviewed database compatibility mechanism before adding a constraint. Do not claim source sketches prove coverage. Read fallback is `COALESCE(preferred_name, name)` while the compatibility window is open; clients must not mistake the fallback for an explicit user choice.

## 2. Expand

```sql
-- Draft only. ACCESS EXCLUSIVE acquisition remains required.
ALTER TABLE public.member_profiles ADD COLUMN preferred_name text;
```

| Operation | Lock/work | Evidence required |
|---|---|---|
| Nullable column without default | ACCESS EXCLUSIVE; no value backfill for this form | Actual acquisition/hold behavior, runner transaction boundaries and writer compatibility |

Verify the expected column in supplied schema/catalog evidence, old/new insert and update behavior, retry/rollback cases and query latency. Observe the compatibility period justified by the complete writer inventory. A universal number of hours cannot prove retirement.

## 3. Backfill with separately committed batches

The selected cursor advances over selected rows, not only changed rows. Each invocation commits a bounded batch and only then persists its cursor. Sparse IDs and zero updates do not prove migration completion. The operator supplies a reviewed positive batch size and a correct initial cursor; this sketch assumes positive bigint IDs and begins before the minimum ID.

```sql
-- One independently committed batch. :after_id and :batch_size are reviewed
-- numeric parameters supplied by the existing operator-controlled mechanism.
BEGIN;
WITH candidates AS (
  SELECT id FROM public.member_profiles
  WHERE id > :after_id ORDER BY id LIMIT :batch_size
), changed AS (
  UPDATE public.member_profiles AS p
  SET preferred_name = p.name
  FROM candidates AS c
  WHERE p.id = c.id AND p.preferred_name IS NULL AND p.name IS NOT NULL
  RETURNING p.id
)
SELECT (SELECT max(id) FROM candidates) AS selected_high_water,
       (SELECT count(*) FROM candidates) AS selected_rows,
       (SELECT count(*) FROM changed) AS changed_rows;
COMMIT;
```

Preserve a concurrently chosen preferred name by the target-null guard. Under the selected isolation level, rehearse races against both old and new writers. A one-way ID scan can miss later inserts or relevant changes, so complete an independent reconciliation after writer coverage is established. This is an operator workflow, not a DO loop that pretends to commit within one transaction.

For this scenario, equality with `name` is not the final invariant because users may intentionally choose a different preferred name. Reconciliation distinguishes valid explicit choices, initialized values, remaining nulls and invalid values. Count expected populations against the source of truth, not merely two equal columns.

Throttle or pause against declared budgets for statement duration, lock waits, replication lag, dead-tuple pressure and critical query impact. Inspect actual autovacuum settings and long transactions. Do not apply universal tuning values or label a dead-tuple percentage as physical bloat.

## 4. Validate and tighten only when truthful

Proceed only when every writer satisfies the required field and no legitimate unknown remains. CHECK NOT VALID still constrains subsequent writes and updates; it is not permission for old writers to keep violating the rule.

```sql
-- Separate reviewed invocations with their own lock/statement budgets.
ALTER TABLE public.member_profiles
  ADD CONSTRAINT member_profiles_preferred_name_nn
  CHECK (preferred_name IS NOT NULL) NOT VALID;

ALTER TABLE public.member_profiles
  VALIDATE CONSTRAINT member_profiles_preferred_name_nn;

-- A valid proving CHECK can avoid the scan; ACCESS EXCLUSIVE remains.
-- Keep the CHECK in place during this operation.
ALTER TABLE public.member_profiles
  ALTER COLUMN preferred_name SET NOT NULL;

ALTER TABLE public.member_profiles
  DROP CONSTRAINT member_profiles_preferred_name_nn;
```

| Operation | Lock/work | Gate |
|---|---|---|
| Add CHECK NOT VALID | ACCESS EXCLUSIVE; skips initial existing-row validation | All future writers comply |
| Validate CHECK | SHARE UPDATE EXCLUSIVE and existing-row scan | No violating population; measured budgets |
| SET NOT NULL with proof | ACCESS EXCLUSIVE; proving CHECK can avoid scan | Proof remains during command |
| Remove redundant CHECK | ACCESS EXCLUSIVE | NOT NULL verified on intended column |

The actual server release and runner behavior govern these details. Metadata-only work can still wait behind transactions and block others while holding its lock.

## 5. Contract

Retire old readers and fallback logic only after all request, import and dormant writer paths are accounted for. The separate `name` field remains part of this product model; it is not dropped just because preferred name now exists. If the actual task is a true rename, use an equivalent-representation design and prove every dependent view, trigger, job and rollback client before removing old shape.

## 6. Rollback and recovery

- Before new writes, preserve the expanded field and rehearse application rollback.
- After initialization or explicit preferred-name writes, retain those values. An old client does not necessarily represent an independently chosen preferred name, so rollback may mean compatibility handling or forward repair.
- A later transaction rollback cannot undo already committed batches. A database restore needs a tested recovery/reconciliation procedure and declared data-loss window.
- Do not implement generic DROP COLUMN rollback or reset preferred values to name.

## Verification preparation

```sql
-- Expected zero only after the scenario's complete derivation and writer gate.
SELECT count(*) AS remaining_nulls
FROM public.member_profiles WHERE preferred_name IS NULL;

SELECT conname, convalidated FROM pg_catalog.pg_constraint
WHERE conrelid = 'public.member_profiles'::regclass
  AND conname = 'member_profiles_preferred_name_nn';

SELECT attname, attnotnull FROM pg_catalog.pg_attribute
WHERE attrelid = 'public.member_profiles'::regclass
  AND attname = 'preferred_name' AND NOT attisdropped;

-- Estimated plan only. An actual ANALYZE capture needs separate execution approval.
EXPLAIN SELECT id, preferred_name
FROM public.member_profiles WHERE id = 12345;
```

Prepare old/new identity tests, user-chosen value preservation, sparse-key resume, crash-before/after-commit, concurrent name/preferred updates, invalid inputs and rollback cases. Security reviews ownership/RLS effects; Quality checks the authorized implementation afterwards. The [statistics specimen](../scripts/bloat-check.sql) supports maintenance triage when an operator supplies observations.

## Existing automation

An already-selected migration system may manage compatibility representations or scheduling. Review its actual SQL, transactions, throttling, writer semantics and recovery after new writes. Do not import a tool-specific configuration or assume a start/complete command proves those properties. The manual phases and gates above remain the required reasoning.
