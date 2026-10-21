# Optional payment decision and evidence

- Payments requested for this project: no / yes, with source requirement.
- Default flag: disabled. Local enablement requested:
- One-time purchase and exact paid feature:
- User/tenant owner and allowed purchase role:
- Supabase identity verification and membership checks:
- Server plan key, configured Price, quantity, amount and currency: placeholders only.
- Installed Stripe SDK, supported Worker transport and API version:
- Webhook format, endpoint version, account/environment: nonsecret identifiers only.
- Attempt key, retry fingerprint, customer mapping and Session persistence:
- Exact Checkout destination host and configured success/cancel origin:
- Durable event ID/body digest, semantic Session grant and transaction isolation:
- Pending, failed, expired and revoked behavior, with approved policy:
- Optional Resend notification and its explicit processing owner:

| Evidence case | Actual output or still unproven |
| --- | --- |
| Disabled checkout | |
| Signed-out or wrong-owner creation/status/action | |
| Browser amount/Price/customer/callback override refused | |
| Success URL alone leaves access unchanged | |
| Invalid, altered, stale or wrong-scope event denied | |
| Valid unpaid event remains pending | |
| Verified paid event grants once for the correct stored Session | |
| Same event replay and separate event for same fulfillment | |
| Concurrent duplicates and database rollback/retry | |
| Revoked access denied with an old browser session | |
| Real Stripe SDK verification on Worker runtime | |
| Provider sandbox checkout and actual durable database transaction | |

Report changed paths and checks actually run. Mark synthetic results as synthetic. Save missing provider/runtime evidence explicitly. Local code creation grants no permission for accounts, keys, dependencies, provider calls, charges or publishing.
