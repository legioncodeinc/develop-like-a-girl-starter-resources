# Payments routing

Use **Stripe Payments** for the bounded decisions below. Check [scope and tool limits](../scope-and-tools.md) first. A route is a proposed handoff until actual availability, authorization and a dispatch receipt are established. Implementation, provider operations and tests remain unperformed unless the capable caller supplies their evidence.

The selected stack is React with React Router SSR, Cloudflare Workers, Supabase database and Auth, Cloudflare secrets and R2, transactional Resend and optional hosted Stripe Checkout. Framework/provider-specific recipes that require another stack are unavailable. Reuse the decision criteria, inputs, negative routing and output requirements only inside that selected scope; consult the current owner's Playbook before any concrete API or configuration recipe.



## Domain
Stripe Payments prepares optional hosted Checkout, server-owned checkout-session creation, verified webhooks, deduplication, provisioning and subscription/entitlement lifecycle boundaries for the selected Workers backend. Treat account/environment, API version and customer/tenant/product mapping as explicit inputs. Current-state reconciliation shares one serialized server projection writer. The browser never grants paid access. Custom Elements, saved-payment custom UI, native receipts and Connect are unavailable.

## Trigger phrases
- "integrate Stripe into this app"
- "prepare hosted Checkout"
- "our webhook isn't firing, or it's 400ing"
- "a subscription is stuck in incomplete"
- "explain an unsupported saved-payment requirement"
- "set up the Stripe Customer Portal"
- "qualify the permitted hosted Checkout presentation"
- "audit our payments implementation"
- "enforce paid features on the server even when the UI is bypassed"
- "separate trial, payment, grace and access states"
- "prepare a refund, dispute or cancellation action for approval"

## Do NOT route when
- The task is Stripe Connect, marketplaces, transfers, application fees, or on-behalf-of charges: explicitly out of scope for this Specialist.
- The task is database schema for `processed_webhook_events`, `subscriptions`, or `entitlements_cache` tables: this Specialist specifies the columns, `Data Foundation` owns schema/migration/indexing.
- The task is secret storage, secret rotation, PII handling, or leaked-key incident response: this Specialist flags with file:line, `Security Review` audits.
- The task is surrounding React UI or component design: route to React Foundation or Design Foundation.
- The task is PRD authoring for a payments feature: `Project Notebook` authors, this Specialist implements against it.

## Inputs the Specialist needs
- `package.json` versions for `stripe` and `@stripe/stripe-js`, plus the pinned `apiVersion`
- Whether this is new checkout work, saved payment methods, subscriptions, webhook debugging, theming, or an audit
- Existing webhook handler code and how `event.id` dedup and provisioning currently work
- Whether the approved hosted lifecycle needs the Billing Customer Portal; custom payment UI stays unavailable
- Exact event destination version/format and account/environment; verified tenant/customer/subscription/product mapping; approved feature/grace/restore policy
- Specific action authorization for any money change, dispute response, support access edit or outbound notification; preparation alone grants none

## Outputs
- Implementation code: hosted checkout-session creation, webhook handler and approved subscription/entitlement flow
- An audit report tracing the money flow end to end, citing file:line + guide section
- Idempotency and dedup guarantees on every retryable write and webhook handler
- Entitlement/lifecycle/support worksheets and direct server plus UI evidence through the current Stripe Payments method. Historical scaffolds and synthetic cases do not prove concurrency, actual Stripe behavior or trial-abuse defenses.

Hosted Checkout is the selected path. Reconciliation and webhook projection share the serialized server writer; money changes, refunds, disputes, cancellation and notifications remain specifically authorized actions for a capable caller.

## Commonly sequenced with
- `Data Foundation` before: schema for webhook-event and subscription tables this Specialist's flow depends on
- `Security Review` after: audit of secret handling and PII once the integration is wired
- `Quality Review` after: post-implementation verification against the audit's acceptance checklist
