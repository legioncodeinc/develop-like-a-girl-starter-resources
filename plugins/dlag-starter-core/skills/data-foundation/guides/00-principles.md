# Principles for data design and review

## Begin with evidence

Read the named DDL or existing ORM schema, recent migrations, relevant queries, client manifest/lockfile, supplied server version and non-secret connection architecture. Record unknowns. Do not run a version query, inspect credentials or connect merely to fill a worksheet. A server version, application revision and migration revision are different facts.

For a new feature, work through schema, indexes, migrations, client mapping and platform limits. For a performance incident, begin with the supplied failure, connection pressure, waits and query plan, then narrow to indexes and schema. Do not spend the incident redesigning an unrelated model.

## PostgreSQL types and constraints

Use typed columns for stable fields that are filtered, joined or sorted. Use `jsonb` for variable attributes, arrays for short whole-array values, enums for stable sets, lookup tables for changing sets and ranges plus exclusion constraints for non-overlap. Use a child table when values have relationships or independent lifecycle. A database constraint enforces an invariant across concurrent application writers.

Choose a primary key deliberately. Supabase Auth users use UUIDs; an app table may reference `auth.users(id)`. Existing identity bigint keys are valid and should not be changed for style. Use `timestamptz` for an instant and `date` for a calendar date. Exact money uses integer minor units with a declared currency/scale or `numeric`, not floating-point approximations. Record retention, deletion and sensitive fields with their purpose.

## Indexes follow workload

PostgreSQL creates supporting indexes for primary and unique constraints, but not automatically for the referencing side of every foreign key. Review every FK and record suitable index coverage or a workload-backed exception. For hot joins and parent deletion/update checks, missing usable coverage can be a must-fix. Avoid duplicate indexes when an existing valid B-tree prefix covers the need. Partial, expression, invalid, included-only and different-operator-class indexes need individual analysis.

A column appearing in a query is not an automatic instruction to create an index. Record predicate, selectivity, ordering, row distribution, read/write cost and evidence. A sequential scan or nested loop can be correct. A supplied actual plan supports measured claims; an estimated plan supports a hypothesis, not actual timing.

## Changes preserve data meaning

Use expand, separately committed backfill, validation and contract when compatibility or lock risk requires it. Row count alone does not establish safety. State each DDL lock, possible scan/rewrite, writer compatibility, lock-acquisition and statement budgets, and recovery behavior after new writes. Never invent historical values to satisfy NOT NULL. Keep applied migration files immutable; a correction is a new reviewed migration.

All SQL here is an inert review specimen. Source review does not prove lock duration, concurrency, data preservation, database syntax on a selected release, or successful recovery. An operator's later execution requires its own named authorization and environment. The [live-change guide](11-live-schema-migration.md) contains the complete procedure.

## Connections and client behavior

Starter application access uses the accepted Supabase API/client boundary or an already-selected server database client. HTTP Data API requests do not create one client-side TCP pool per Worker. For an accepted direct database client, check Workers support, pool mode, transaction lifetime, session features, prepared statements and server capacity. Supabase transaction pooling has documented limitations; do not treat it as interchangeable with every PgBouncer deployment. There is no universal connection count at which PostgreSQL fails.

Adding an ORM, a pooler, migration automation or another provider is a project decision. Review the existing choice against actual workloads; do not install or switch it through this Playbook.

## Findings and severity

For each finding provide the named file/line or supplied observation, the affected behavior, the relevant packaged guide or official source, one concrete repair and a check that would show the repair works. Distinguish a confirmed source defect from an unmeasured performance hypothesis.

| Severity | Evidence and impact | Treatment |
|---|---|---|
| Must-fix | A broken invariant, unsafe migration, missing ownership predicate, or observed critical query/connection failure | Resolve before accepting that change |
| Should-refactor | A justified maintainability or performance improvement without a demonstrated release blocker | Record a bounded follow-up |
| Style | Naming or formatting without a behavioral consequence | Optional; do not block the work |

Do not classify `varchar(n)` as a defect when its length limit expresses the product rule. Do not classify every missing index, every sequential scan or every nullable field as a blocker.

## Boundaries

Data Foundation designs the schema and verification queries. Security Review audits RLS, privileged roles, sensitive data and enforcement. Quality Review reviews actual supplied verification evidence after Security. A separately authorized operator with the required tools executes database and native checks. React Foundation handles loader/action/component data consumption. Search Foundation handles retrieval, ranking and evaluation. Report a missing selected owner rather than referring users to an uninstalled original tool.

Return the requested local document with exact saved paths, observed checks, unresolved decisions and remaining native proof. Use the project's existing notebook/document location; do not create a separate archive inside the installed Playbook. Use [schema](../templates/schema-spec.md), [migration](../templates/migration-plan.md), [boundary](../templates/tenant-boundary-proof.md) and [findings](../templates/audit-template.md) templates as needed.
