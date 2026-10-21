# Worked example: qualify the selected Starter data stack

This is a hypothetical B2B project tracker. All workload numbers are declared scenario inputs, not observed performance, provider capacity or rates. The decision retains the already selected Starter services.

## Inputs

- Team: five engineers, TypeScript-fluent, comfortable with SQL, limited database operations capacity.
- App: React Router framework SSR on Workers; Supabase Postgres/Auth; R2 object bytes; Cloudflare secrets; transactional Resend.
- Workload: mixed relational reads/writes, assumed 70/30 read-heavy, point lookups by organization/user. A forecast of 100 requests/s at launch and 1,000 in a year still needs query count, concurrency and transaction measurements.
- Geography: US/EU users with a proposed p95 target below 200 ms. The actual region/network path and measurements are missing.
- Auth: already Supabase Auth. Organization membership and Data API grants/RLS require explicit design.
- Uploads: R2, with references in Postgres and independent object recovery.
- Search: ordinary document search initially. Semantic search is a possible future request, not approval to select a model or make provider calls.
- Developer workflow: isolated synthetic testing is required; hosted branch features, costs and availability remain unverified.
- Budget: known quantities and current rates have not yet been supplied.

## Walk the requirements

1. The accepted product is relational and already uses PostgreSQL. There is no requirement here to introduce distributed SQL, SQLite replication, MySQL or a time-series provider.
2. Supabase Auth is selected; inspect the actual session/identity boundary rather than replacing it for a marketing feature.
3. The backend and SSR run on Workers. Confirm the chosen Supabase client/API or existing SQL driver's transport and transaction behavior on that runtime.
4. R2 owns upload bytes. Database backups and metadata alone do not restore those bytes; use a coordinated fixture/recovery manifest.
5. A private collaboration feature, if requested, needs its own message, authorization and revocation design. Do not assume database changes prove realtime delivery.
6. Database extension, branch, version and connection capabilities must be checked for the actual plan/region. An online matrix or pricing headline is not project evidence.

## Decision table

| Requirement | Weight in this scenario | Selected design | Missing evidence/counterevidence |
|---|---|---|---|
| Identity and tenant access | High | Supabase Auth plus reviewed data policies | Membership authority, ordinary-user denials and revocation |
| Relational invariants | High | Supabase Postgres constraints and SQL migrations | Exact server/schema versions and representative plans |
| Runtime compatibility | High | Accepted client boundary from Workers | Driver/API, transaction and connection-mode behavior |
| Uploaded objects | High | R2 with DB references | Ownership, object-byte restore and orphan reconciliation |
| Query latency | High | Scoped queries and workload-based indexes | Region, p95 observations, data distribution and bursts |
| Isolated development | Medium | Synthetic fixtures and existing project workflow | Actual branch/restore capability and operating cost |
| Operational simplicity | High | Retain selected providers and one migration history | Team capacity, incident ownership and recovery rehearsal |
| Cost | Unknown until inputs | Complete selected-service model | Compute, storage, auth, object egress, mail, backup and operator quantities/rates |

## Recommendation

Retain Supabase Postgres/Auth with the accepted Workers/R2 architecture. It matches the selected product responsibilities and avoids a migration without a demonstrated need. The recommendation remains provisional on runtime compatibility, tenant-denial tests and recovery requirements.

Counterevidence would be an accepted workload or recovery requirement that this exact configuration fails under observation. Document that failure and ask for a bounded architecture decision; do not automatically install another provider or silently weaken the requirement.

## Concrete validation exercise

Prepare a synthetic organization A/B fixture with ordinary actors, relational records and two R2 object manifests. In a separately authorized disposable environment, verify ownership/read/write/relationship denials, representative queries and the actual Workers access boundary. Record query count and latency with data scale and parameter distributions. Rehearse database and object restoration independently, then reconcile references and checksums. No operation is performed by this walkthrough.

## Future storage change

If semantic search is accepted later, first establish model output shape, extension availability, authorized filtering, re-embedding/cost boundaries and evaluation targets. Draft the optional vector column/index using [special-purpose PostgreSQL](../guides/06-special-purpose.md); do not infer a working retrieval feature from DDL.

## Connection and recovery review

For HTTP Data API access, document that boundary and ordinary-user identity. For an existing approved SQL client, inspect pool mode and current Supabase prepared-statement/pipelining limits. Do not add a universal connection-string flag or a second pooler. Use [pooling](../guides/05-performance-pooling.md) and [recovery](../guides/10-recovery-and-exit-fit.md).

## Acceptance and revisit triggers

Record the decision in [the ADR template](../templates/ADR.md) only with its actual status. Revisit if observed latency/connection pressure exceeds the accepted budget, a required data/extension feature is unsupported, recovery fails, cost inputs materially change, or user-approved scope changes. No arbitrary monthly dollar amount or calendar date replaces those project-specific triggers.
