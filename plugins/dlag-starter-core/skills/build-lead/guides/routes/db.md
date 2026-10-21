# Db routing

Use **Data Foundation** for the bounded decisions below. Check [scope and tool limits](../scope-and-tools.md) first. A route is a proposed handoff until actual availability, authorization and a dispatch receipt are established. Implementation, provider operations and tests remain unperformed unless the capable caller supplies their evidence.

The selected stack is React with React Router SSR, Cloudflare Workers, Supabase database and Auth, Cloudflare secrets and R2, transactional Resend and optional hosted Stripe Checkout. Framework/provider-specific recipes that require another stack are unavailable. Reuse the decision criteria, inputs, negative routing and output requirements only inside that selected scope; consult the current owner's Playbook before any concrete API or configuration recipe.



## Domain
Data Foundation owns PostgreSQL schema, keys, constraints, indexing, query plans, transactions, connection behavior and expand-backfill-contract migration reasoning for the selected Supabase database. Use Supabase Platform for provider-specific access/runtime constraints. Preserve generic relational design and recovery methods, but do not turn a comparison of other managed databases or ORMs into a platform change.

## Trigger phrases
- "design this schema"
- "review this migration"
- "should this be jsonb or columns?"
- "we need a NOT NULL on a 100M-row table"
- "Drizzle or Prisma?"
- Provider-specific drivers, database branches and ORM migration recipes outside Supabase are unavailable. Keep generic Postgres decisions separate from provider operations.
- "production query is slow, read this EXPLAIN"
- "is this index right?"

## Do NOT route when

## Inputs the Specialist needs
- Existing DDL or ORM schema file (`schema.prisma` / `schema.ts`) and recent migrations
- Query plans (`EXPLAIN (ANALYZE, BUFFERS)`) for performance work, not just "it's slow"
- Pooler config and `package.json` for ORM/platform versions
- Table size, since migration safety strategy depends on row count

## Outputs
- Schema spec, migration plan with lock classes, or indexing decision
- ORM or platform choice ADR
- Audit report classified must-fix / should-refactor / style

## Commonly sequenced with
- Security Review: audits RLS, PII, and encryption after this Specialist designs the hooks
- Quality Review: runs the post-migration verification queries this Specialist writes


## Workload and provider fit

For an actual Supabase/Postgres decision, inspect the selected local methods and current supplied project evidence. Normalize workload, ancillary identity/storage/realtime needs, connection modes, operations/recovery/exit and observed rate assumptions. Do not reuse categorical dated service-gap claims or guess a backfill.
