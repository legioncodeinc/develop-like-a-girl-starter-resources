# Worker route recipe and proof boundary

This is an implementation contract, not an installed Stripe integration. Use the real project's installed SDK types and database API to fill these steps; do not treat the names below as exported helpers.

| Route | Required behavior |
| --- | --- |
| `POST /billing/checkout` | Disabled flag check; verified Supabase identity; CSRF/method checks; owner permission; allowlisted plan; server attempt and idempotency; SDK create; save Session; validate hosted URL; redirect or return URL. |
| `GET /billing/status` | Verify identity and owner membership; return only that owner's limited local status with no-store caching. Never write access. |
| `POST /billing/webhook` | Bounded raw body; SDK signature/timestamp verification; trusted account/environment; stored Session/current-state verification; atomic event receipt plus semantic grant. No browser cookie is required for the provider webhook. |
| Premium application action | Verify current identity and owner permission, then committed entitlement on every request. |

Cloudflare environment bindings hold `STRIPE_SECRET_KEY` and `STRIPE_WEBHOOK_SECRET` on the server. Use placeholders in documentation and keep actual values outside source, browser bundles, loader data, logs and model prompts. Checkout `customer` and Price selection come from server-owned mappings. No Stripe client SDK is required merely to follow a hosted URL.

A dependency-free fictional fixture can exercise the disabled flag, owner isolation, server-owned plan selection, redirect-without-grant, a signed mock paid event and duplicate handling. Label its HMAC format and in-memory state as fictional. Passing those cases does not verify Stripe's signature SDK, production persistence, Supabase RLS or transaction concurrency. Real SDK compatibility and provider sandbox validation need separate evidence and explicit authorization for installation or provider operations.

## Official references checked October 20, 2026

- [Hosted Checkout quickstart](https://docs.stripe.com/checkout/quickstart): server creates a Session and redirects using its returned URL.
- [Hosted fulfillment](https://docs.stripe.com/checkout/fulfillment.md?payment-ui=stripe-hosted): retrieve Session state, handle delayed payments and make fulfillment safe under repeated concurrent delivery.
- [Event verification](https://docs.stripe.com/events/set-up-events): raw-body signature verification differs between thin notifications and snapshot events. Select deliberately with the installed SDK.
- [Signature debugging](https://docs.stripe.com/events/manage-webhook-endpoints): the correct raw body, signature header and endpoint secret are required.

The default-off choice, exact checkout host allowlist, webhook-only paid writer, ownership checks, atomic body-hash receipt and no-install/no-provider scope are Build Studio requirements. They are not claims that Stripe configures those application policies automatically. Stripe documents an optional server fulfillment path from a return page; this Starter recipe keeps return pages read-only to reduce the number of payment writers.
