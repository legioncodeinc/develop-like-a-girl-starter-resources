# Connection and pool review

Status: source review only. Selected service: Supabase. No pooler configuration is applied by this worksheet.

## Actual topology

- Application access: HTTP Data API or existing server SQL client; why:
- Workers runtime, client version and transport support:
- Database server version, region and environment:
- Direct/session/transaction connection mode and non-secret endpoint class:
- Session features needed, including LISTEN, temporary objects, cursors and transaction-local context:
- Prepared statements and query pipelining support from current client/provider docs:

## Capacity

- Database connection limit and reserved operator capacity:
- Number of database/user pools, processes, app instances and reserve pools:
- Per-pool server size and maximum client connections:
- Queue length, reserve activation/wait behavior and measured peak load:
- Illustrative arithmetic only: (200 - 20) / 4 = 45, valid only if four pools are the complete population:
- Client-side maximum, idle lifetime and contention evidence:

## Security and lifecycle

| Configuration concern | Required evidence and selected value |
|---|---|
| Database mapping / host / port | Non-secret environment identity, routing and reachability |
| Authentication method | Managed provider contract; no copied password-query or credential material |
| Authentication source / role | Least privilege, memberships and ownership; do not read or print secrets |
| Listener address / port | Applicable only to an existing operator-managed component; no broad listener added |
| Client and server TLS | Encryption and certificate/hostname verification for the actual client |
| Query timeout | Accepted execution budget and observed cancellation behavior |
| Query-wait / connection timeout | Bounded queue and connection establishment behavior |
| Client/server idle timeouts | Cleanup, reconnect and transaction implications |
| Server lifetime | Session recycling and tested application assumptions |
| Connection/disconnection/error logs | Redaction, retention, access and sensitive-value exposure |
| Verbosity | Minimum needed diagnostic data |
| Statistics interval and viewer role | Measurement window, least privilege and reset awareness |

## Transaction context and failure tests

- Establish authorized tenant context in the same transaction as every query:
- Successful commit, rollback, timeout and disconnect cleanup:
- A/B request reuse and absent/invalid context:
- Transaction retries and idempotent application behavior:
- No weakening of foreign-key enforcement to work around a pool/client error:
- Migration/restore connection requirements and runner transaction boundaries:

## Decision and evidence

One recommended change with its reason:
Alternative explanation checked:
Current observations versus expected results:
Separately authorized native check and rollback/recovery conditions:
Missing facts that block the dependent change:

See [performance and pooling](../guides/05-performance-pooling.md). This replaces a generic self-hosted INI with a complete review of the managed service and existing client; it does not select or install PgBouncer.
