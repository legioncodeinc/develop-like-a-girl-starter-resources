# Three normalized workload cases

These are hypothetical review cases. Numerical inputs are forecasts supplied by each scenario, not benchmarks or vendor limits. Each case preserves the chosen Starter service boundary.

## Small relational application

Inputs: 50 organizations, 500 active accounts, normalized relational rows, Workers SSR, Supabase Auth and R2 already selected, bursty traffic. Concurrent connections and restore behavior have not been measured. Recommend retaining Supabase Postgres with the existing accepted client boundary while validating actor policies, query shape and recovery. Counterevidence: a specific branch/extension/latency requirement may be unsupported in the actual configuration. One validation exercise checks representative requests, A/B denials and isolated database/object recovery. Cost and latency remain unknown until measured or supplied; there is no automatic provider switch.

## Collaboration-heavy proposed feature

Inputs: a proposal for 2,000 concurrent sockets, private rooms, presence/typing, durable records, uploads and offline replay. Keep durable data and identity in the selected stack while the separate realtime requirement is decided. Missing facts include message rate/size, fanout distribution, reconnect bursts, revocation and complete object recovery. A database read succeeding is not proof that a room is private; presence delivery is not proof of durable business-event storage. The smallest validation isolates room authorization and replay semantics under declared load. A failed denial blocks that boundary even if database tests pass.

## Existing system outside the selected stack

Inputs: an established managed PostgreSQL system with a supported operator team, network controls and accepted application contract. Do not migrate it into Starter defaults simply to match a template. Record that adapting this existing provider is outside the selected Starter implementation scope, preserve its supplied constraints and prepare the portable schema/query findings that remain relevant. Missing facts are complete operating cost, recovery and a user-approved reason to migrate. A future migration requires a separate accepted scope and recovery/exit design; no free-tier comparison establishes one.
