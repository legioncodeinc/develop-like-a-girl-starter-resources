# Expand-Backfill-Contract Checklist

A phase checklist for an accepted migration whose compatibility, locking or data risks require staged changes. Mark observed evidence separately from expected checks; no row-count threshold proves safety.

---

## Pre-flight

- [ ] Postgres major version captured.
- [ ] Affected table sizes captured (`pg_relation_size`, `reltuples`).
- [ ] Lock-class table consulted for every DDL: `guides/03-migrations.md`.
- [ ] Worst-case lock duration estimated.
- [ ] Backup / PITR confirmed available for the affected window.
- [ ] Rollback plan documented.

## Phase 1: Expand

- [ ] Every Phase 1 DDL lock and acquisition/hold budget is stated and measured; metadata-only or CONCURRENTLY is not lock-free.
- [ ] Default expression classified by volatility, version and product meaning; no invented historical fact or unqualified rewrite.
- [ ] NOT NULL changes preserve field meaning and all writer compatibility; existing values/default semantics are proven.
- [ ] No `ALTER COLUMN ... TYPE` requiring rewrite.
- [ ] Each index build has a justified method: concurrent for an accepted hot-table operation when supported, ordinary builds for suitable new/empty tables, explicit partition strategy where needed.
- [ ] The declared atomic writer/authority and reader-fallback rule is verified in a separately authorized environment, including independently chosen values.
- [ ] Exact deployed writer/schema revisions and the justified compatibility observation window are evidenced; a source draft is not deployment proof.
- [ ] `\d <table>` confirms new shape.
- [ ] Exact schema/index query joining pg_index/pg_class/pg_namespace confirms intended index validity/readiness; see migration-plan.md.

## Phase 2: Backfill

- [ ] Driver commits each bounded batch and records selected cursor after commit; sparse IDs and zero changed rows do not end correctness checks.
- [ ] Throttled by autovacuum lag and replication slot lag.
- [ ] No single `UPDATE` covering the whole table.
- [ ] Backfill driver (script / job) is idempotent and resumable.
- [ ] For NOT NULL transitions: `CHECK ... NOT VALID`, `VALIDATE CONSTRAINT`, `SET NOT NULL`, `DROP CONSTRAINT` sequence followed.
- [ ] Backfill populations reconcile: eligible, already present, unknown, rejected and mismatched; NOT NULL only when meaning and every writer justify it.
- [ ] Dead-tuple/size triage after backfill uses [the statistics specimen](../scripts/bloat-check.sql); physical bloat is not inferred from its percentages.
- [ ] Autovacuum tuning revised on the affected table if necessary.

## Phase 3: Contract

- [ ] Phase 1 + 2 and the complete old/new writer retirement criteria are evidenced; dormant clients/jobs are included.
- [ ] Logs / metrics confirm zero traffic to the old shape.
- [ ] App code reads/writes only the new shape: verified in staging.
- [ ] Phase 3 lock acquisition/hold budgets and reader/writer compatibility are proven; metadata-only is not a no-blocking promise.
- [ ] Rollback plan revisited: Phase 3 is destructive; only proceed at high confidence.

## Post-deploy

- [ ] Have a separately authorized capable operator run the verification queries and supply actual results. After Security Review, have Quality Review assess the supplied evidence against the acceptance criteria; record failed, unresolved or unrun checks explicitly.
- [ ] Separately authorized actual plan captures on critical queries show acceptable work and correctness; estimated or synthetic evidence stays labeled.
- [ ] Review observed maintenance pressure; propose a separately authorized operation only when justified.
- [ ] Save the migration plan in the project's existing notebook/document location; do not write an archive into the installed Playbook.

## References

- `guides/03-migrations.md`