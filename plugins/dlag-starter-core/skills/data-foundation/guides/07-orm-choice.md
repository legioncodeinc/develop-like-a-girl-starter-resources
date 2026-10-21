# Review the existing database client and ORM

Starter uses versioned SQL schema drafts with Supabase Postgres. No ORM is selected by this Playbook. Inspect the actual application client and lockfile before editing queries. Supabase API operations, a server SQL driver and an ORM have different transaction, policy and runtime boundaries.

## Workload decision procedure

1. State the actual runtime: React Router server code on Workers, browser code or an existing separate process. Inspect its client transport and supported platform rather than assuming every Node library runs unchanged.
2. Record team SQL fluency, schema size/relations, hot queries, transaction requirements, generated-type needs, deployment/build constraints and migration ownership.
3. List database features in use: `jsonb`, ranges, enums, exclusion constraints, partial/expression indexes, triggers, FTS/vector types and RLS. Inspect whether the chosen tool expresses each feature or requires explicit SQL.
4. Separate client convenience from database enforcement. A client relation model, TypeScript type or runtime validation does not replace a foreign key, unique constraint or ownership policy.
5. Preserve one authoritative migration history. Read generated SQL and the actual runner's transaction/connection behavior. Do not run schema push, create a shadow database or install a new migration system during review.
6. Recommend retaining the existing working choice unless a measured requirement justifies a separately accepted change. Use [the decision record](../templates/ADR.md) to state the concrete trade-off and validation gap.

## Abstraction trade-offs to inspect

A SQL-oriented builder can preserve SQL-shaped queries and type inference; a generated-client ORM can provide relation APIs and code generation; parameterized SQL gives direct database expressiveness but requires explicit mapping and query discipline. These are evaluation criteria, not a recommendation to add a dependency.

For an existing Drizzle installation, inspect its exact package version, adapter, inferred types, schema APIs, generated migrations and support for each required PostgreSQL feature. For an existing Prisma installation, inspect generated client/runtime, connection mode, relation/query strategy, migration history and feature representation. Do not repeat blanket claims about bundle size, supported features or a version's N+1 behavior without current evidence from that installation. The [official references](../references/official-sources.md) identify where to verify these conditional APIs.

The [SQL schema starter](../templates/sql-schema-starter.sql) retains concrete user/profile, post and order relationships, enum, timestamps, soft-delete uniqueness, index, exact-money and constraint examples without requiring either ORM. The database trigger maintains `updated_at` across writers; a client-only timestamp hook would have different coverage. Partial and global uniqueness have different product meanings; choose one deliberately.

## Concrete query and N+1 reasoning

A query should select the columns and authorized population needed by the action. Positional placeholders are examples of an accepted client's parameter mechanism, not string substitution:

```sql
-- Query shape; caller supplies typed parameters through its selected client.
SELECT id, title FROM public.posts
WHERE owner_id = $1 AND id = $2;
```

The familiar N+1 shape is an application operation that fetches a list and then performs another query inside a loop for each row:

```text
posts = fetch permitted posts for authenticated actor
for each post:
    comments = fetch comments for this post and the same permitted actor scope
```

Possible repairs preserve the authorization boundary:

```sql
-- Batched prefetch shape. The array and actor are bound parameters.
SELECT c.post_id, c.id, c.body
FROM public.comments AS c
JOIN public.posts AS p ON p.id = c.post_id
WHERE p.owner_id = $1 AND c.post_id = ANY($2::bigint[])
ORDER BY c.post_id, c.id;
```

A bounded join, a bounded ID-list prefetch or request-local coalescing can reduce round trips. Avoid unbounded joins that explode result counts or large arrays that overwhelm the query. Confirm actual generated SQL and query counts; a nested-loop node in a single SQL plan is not proof of network N+1. Likewise an ORM `include` is not automatically one query or efficient.

Data Foundation flags schema/query behavior with file and line evidence. React Foundation handles loader/action query placement, request boundaries, client cache and component consumption. Never change from ordinary-user access to a privileged credential to work around a relation query.

## Migration and pooling compatibility

Read the existing client's prepared-statement, transaction and connection-pooling settings against the exact provider mode. Disabling real foreign keys or changing the database's relation enforcement is not a prepared-statement fix. Server-side credentials remain in the selected secret boundary and must not enter browser modules, fixtures or reports.

An existing ORM may emit SQL migrations or maintain its own schema history. Database features not represented in its schema may need supported custom migration SQL. Record drift and introspection behavior, applied migrations and the effect of regeneration. No tool's generated diff establishes a safe live change; use [migration patterns](03-migrations.md) and [live changes](11-live-schema-migration.md).

## Decision record contents

Capture current exact versions, team/runtime/workload requirements, database features, accepted constraints, one recommendation, counterevidence, type/mapping and build implications, migration ownership, pool/transaction limitations and the native check that would support acceptance. Do not accept an ADR merely because a code sample parses.
