# Qualify the selected data services

Starter has already selected Supabase Postgres and Auth, Cloudflare Workers for application/backend hosting, Cloudflare secrets, R2 for objects and transactional Resend. This Playbook checks that design against the current workload. It does not select Supabase Storage/Edge Functions, another database provider, a newsletter platform, a queue or a CMS.

## Map each responsibility

| Requirement | Selected responsibility | Evidence to collect |
|---|---|---|
| Relational data and constraints | Supabase Postgres | Actual server version, extensions, region, query/load and recovery requirements |
| Identity and sessions | Supabase Auth | Actual session/identity flow, actor authority and accepted integration |
| Data API access | Supabase API with actual grants/RLS | Ordinary-user access and denial outcomes on every exposed table |
| Custom backend and SSR | Workers / React Router framework | Runtime and client compatibility, request limits and failure handling |
| Server secret values | Cloudflare secrets | Binding names/purpose only, no values or credential file reads |
| Object bytes | R2 | Ownership, access path, retention, checksum/recovery and egress requirements |
| Transactional email | Resend | Accepted transactional purpose and separate authorized delivery evidence |
| Optional payments | Hosted Stripe Checkout, only when selected | Server-owned order/payment state and verified event processing scope |

Do not expand service selection because a provider advertises an integrated feature. Database backup, object recovery and authentication continuity are separate parts of the product's recovery story.

## Fit tests

Use [workload normalization](09-workload-platform-fit.md): data size/growth, read/write mix, transaction contention, query patterns, serverless concurrency, session features, regional latency, residency, extension needs and recovery objectives. Mark each input measured, forecast or unknown. A user count is not a throughput measurement.

A feature gap has a precise effect: identify the accepted requirement that cannot be met, the evidence, and the smallest decision required from the owner. If a project explicitly requests a different database, assess its actual engine and current services rather than assuming a product name means PostgreSQL compatibility. Distributed-SQL, embedded/replicated SQLite, MySQL/Vitess and time-series extension systems have different transaction, extension, consistency and operational behavior. Deep work on a different engine is outside this Playbook's PostgreSQL coverage.

## Connection and feature claims

Inspect actual connection mode, network reachability, driver transport, TLS, transaction/session state and prepared-statement support. Do not reuse a provider-port recipe as credential-bearing configuration. Supabase's transaction pool and an operator-managed PgBouncer can have different supported behavior. Use [performance and pooling](05-performance-pooling.md).

Do not assume a particular PostgreSQL major, plan-tier feature, branch capability, uptime figure, price or free idle allowance. These can change. Verify the exact product, plan, region and date from current official documentation or owner-supplied evidence when the decision needs them. Unknown cost inputs stay unknown.

## Cost and recovery

If a cost assessment is requested, record dated quantity/rate inputs for database compute/storage, backup/PITR, replicas/branches, auth, object storage/egress, email, networking and operator effort. This worksheet does not invent prices or approve spend. Use [recovery and exit](10-recovery-and-exit-fit.md) before describing a design as recoverable.

Return one recommendation for the selected stack, concrete counterevidence, missing facts and a bounded validation exercise in the [platform-fit worksheet](../templates/platform-fit-decision.md). A design document does not provision or configure any provider.
