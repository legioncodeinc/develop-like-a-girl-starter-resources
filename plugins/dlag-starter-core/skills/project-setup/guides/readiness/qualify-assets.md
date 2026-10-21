# Qualify existing accounts and assets

1. Record what the owner reports, with environment, account/project scope and date. Use `reported` until an authorized observation is available. Do not open an account session or credentials without explicit authority for that action.
2. Compare the asset against the exact milestone: development-ready is not production-ready; membership is not app approval; TLS is not code signing. Supabase development/test identity and data do not establish production identity or data readiness. Some shared settings still require scoped review.
3. Record non-sensitive evidence references and reviewer identity. Preserve unknown ownership, missing approvals and inaccessible state. Do not assert `observed-ready` from official docs or a screenshot that omits the relevant environment/permissions.
4. Build dependency edges, check for missing prerequisites/cycles and identify which unknowns block the intended milestone. An unknown cost is not zero, and an unknown lead time is not same-day readiness.
5. Review the [validation rules](../../references/readiness/validation.md) against the ledger table. An optional source helper is available only to a separately authorized caller with shell tools; this Markdown-only role does not execute it or save CSV files. The helper validates structure and encoded fixtures, not provider state. Have the accountable owner review each evidence/status claim before treating the ledger as operational readiness.
6. Return exact blockers, deferred assets, next owner actions and dated source limits. Leave setup, billing, credentials and publication with their separately authorized owners.

Environment separation covers Supabase, optional social identity, Workers, Cloudflare secrets, R2, Resend and optional hosted Stripe. Requirement/observation distinctions follow the [ledger contract](../../references/readiness/ledger-contract.md). Supplied documentation or screenshots do not grant account access.
