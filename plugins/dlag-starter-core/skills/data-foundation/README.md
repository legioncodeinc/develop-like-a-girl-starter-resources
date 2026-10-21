# Data Foundation resources

Use [the Playbook](SKILL.md) for scope and routing. Every example is a local draft or hypothetical review case. No packaged statement is authorization to operate a database.

## Guides

- [Principles](guides/00-principles.md) and [design procedure](guides/design-data.md)
- [Schema](guides/01-schema-design.md), [indexes](guides/02-indexing.md), [migrations](guides/03-migrations.md), [partitioning](guides/04-partitioning.md)
- [Performance and pooling](guides/05-performance-pooling.md), [query-plan review](guides/review-query-plan.md), [special-purpose PostgreSQL](guides/06-special-purpose.md)
- [Client and ORM review](guides/07-orm-choice.md), [selected services](guides/08-serverless-platforms.md), [workload fit](guides/09-workload-platform-fit.md), [recovery and exit](guides/10-recovery-and-exit-fit.md)
- [Live schema changes](guides/11-live-schema-migration.md), [tenant boundaries](guides/12-tenant-data-boundaries.md)

## Examples and SQL specimens

- [Personal notes with ownership policies](examples/owned-notes.sql)
- [Complete relational schema case](examples/greenfield-schema.md)
- [Live migration decisions](examples/live-schema-cases.md), [single-batch SQL sketch](examples/migration-review.sql), [NOT NULL change walkthrough](examples/zero-downtime-not-null.md)
- [Platform-fit walkthrough](examples/serverless-platform-choice-walkthrough.md), [normalized workload cases](examples/normalized-platform-fit-cases.md), [tenant cases](examples/tenant-boundary-cases.md)
- [SQL specimen notes](scripts/README.md), [index review queries](scripts/audit-missing-indexes.sql), [dead-tuple and index-size queries](scripts/bloat-check.sql)

## Complete worksheets

- [Data design](templates/data-design.md), [schema specification](templates/schema-spec.md), [SQL schema starter](templates/sql-schema-starter.sql)
- [Index decision tree](templates/indexes-decision-tree.md), [migration plan](templates/migration-plan.md), [phase checklist](templates/expand-backfill-contract-checklist.md), [live migration packet](templates/live-schema-migration-packet.md)
- [Tenant-boundary proof](templates/tenant-boundary-proof.md), [platform fit](templates/platform-fit-decision.md), [pooling review](templates/pooling-review.md)
- [Decision record](templates/ADR.md), [findings report](templates/audit-template.md)

[Official references](references/official-sources.md) support the technical guidance. Save completed reports in the project's existing notebook or agreed document location, outside this installed resource folder.
