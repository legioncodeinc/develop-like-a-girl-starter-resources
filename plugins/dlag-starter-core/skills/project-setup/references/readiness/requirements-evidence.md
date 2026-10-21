# Requirement evidence and account readiness

Public requirements, owner reports and authorized account observations support different conclusions. Use dated supplied official requirements for the exact environment and milestone. If the source is absent, stale or outside local read scope, record the research gap. A capture date is not a publication date, a price quote or an account audit.

| Requirement topic | Preparation implication |
| --- | --- |
| Supabase production concerns | Request scoped evidence for permission/security policy, capacity, availability, backup/recovery and auth-email readiness. Project existence alone proves none of these. |
| Workers and HTTPS | Record deployment/environment and HTTPS ownership; do not assume a domain, DNS record or a hosting plan proves the intended customer route works. Host-managed TLS and manual issuance are different responsibilities. |
| Cloudflare secrets | Record environment-specific secret-reference names and custodians only. A reference is not proof a value exists or is correctly scoped. Never collect its contents. |
| R2 and file ownership | Separate stored bytes, Supabase ownership records and Worker access checks. Public assets and private customer uploads need explicit distinct policies. |
| Supabase Auth and conditional social OAuth | Keep development/preview/production context distinct. Capture applicable project, callback, branding/contact, requested scopes and verification requirements only for selected sign-in flows. Working test login does not prove production approval. |
| Customer integration callbacks | Keep authorization callbacks, installation setup URLs and inbound webhooks separate. Check the chosen API's current match rules and permission scopes rather than applying a different provider's policy. |
| Optional hosted Stripe | Record business/environment, hosted Checkout, webhook-signature verification, entitlement updates and recovery owner. Payment account existence is not go-live or fulfillment proof. |
| Transactional Resend | Request sender/domain/environment and delivery evidence for required notifications only. No newsletter delivery platform is selected. |
| Search, vector data and source acquisition | Accepted requirements must justify additional assets. Begin with the approved database/application design; do not require another database, crawler or vector account because a vendor list mentioned it. |
| Reliability and private reachability | Assign monitoring, availability, alert-recipient, support and recovery outcomes first. Private connectivity and extra monitoring vendors are not implicit prerequisites. |
| Native distribution | Organization enrollment, signing, notarization, device/privacy/testing obligations and rate/renewal units require a separate release scope. TLS is not executable signing; a store account is not app approval; signing is not a guaranteed reputation bypass. |

## Dates, prices and lead times

Use numeric amounts only with currency, unit, source and date, and note material region, tax, plan, usage and waiver assumptions. Unknown cost is not zero. No universal approval duration is supported: use unknown unless an applicable source or dated measured owner record supplies a basis. Distinguish a provider estimate from a guarantee. Include recurring renewal ownership even when enrollment is reported complete.

## Missing or failed evidence

A failed URL or unavailable source is not supporting evidence. Record the exact safe failure and what remains unresolved; do not cite a guessed endpoint as proof. An official search result can identify a different source, but actual capture still needs its own evidence. Keep browser/source retrieval, structural validation, account observation, owner acceptance, deployment and release approval separate. None supplies authorization for another.

The [ledger contract](ledger-contract.md), [qualification guide](../../guides/readiness/qualify-assets.md) and [validation rules](validation.md) define the evidence method without requiring an original-source repository or historical fetch archive.
