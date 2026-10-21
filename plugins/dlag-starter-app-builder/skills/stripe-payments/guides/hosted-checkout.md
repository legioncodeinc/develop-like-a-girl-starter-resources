# Hosted Checkout implementation

## Define the purchase

Keep `PAYMENTS_ENABLED` false by default and deny checkout when disabled. Before implementing, record the one-time product, currency, server-owned Price mapping, owner type (user or authorized tenant), allowed role and what one payment buys. Require an approved access and revocation policy. Do not invent discounts, trials, subscriptions, taxes, refunds or renewal behavior.

A plan key from a browser selects an allowlisted server mapping; it never supplies an amount, currency, Price ID, customer ID or tenant authority. Verify the Supabase identity through the configured server verification method, then check current membership and purchase permission. Protect cookie-authenticated POST actions against cross-site requests. Rate-limit checkout initiation and keep billing reads private with `Cache-Control: no-store`.

## Create a checkout attempt

The Worker owns all custom backend routes. Resolve the server-owned customer mapping for the authorized billing owner. Save an attempt with owner, tenant when applicable, expected Price, currency, quantity, expected amount and immutable request fingerprint. Use a stable server-generated idempotency key for retries of that attempt; reuse with changed parameters is an error. Return the prior result on an identical completed retry. Persist the provider Session ID before returning its URL. Recover a create timeout using the same attempt and key, rather than creating another purchase.

Use the installed Stripe server SDK and supported Workers transport. Record its exact package version, configured API version and webhook format/version. Consult the current official SDK documentation before choosing constructor options or signature APIs; this Playbook pins no guessed version. Use the hosted Checkout Sessions API and server-created success/cancel URLs from the configured application origin. Do not accept callback URLs from browser input.

Return only a validated HTTPS Checkout Session URL from the server SDK response. For the default Stripe-hosted route require the exact hostname `checkout.stripe.com`, no credentials or unexpected port, and a nonempty path. Never use suffix matching or redirect a browser-provided URL. Custom Checkout domains need a separately approved exact allowlist and are outside this recipe. The React form redirects to that server-approved destination. Return pages read owned local state and can show pending confirmation. Visiting success, replaying a Session ID or pressing cancel does not grant or revoke access.

## Receive payment events

Read the exact raw body once, with a bounded request size. Verify the `Stripe-Signature` through the installed SDK and the correct endpoint secret before parsing/processing; enforce the SDK's documented timestamp tolerance. For Workers, use the SDK's async verification API and Web Crypto provider when required by the installed version. Never hand-roll Stripe verification or substitute the fixture's HMAC. Reject unsupported event format/version, wrong environment/account and unknown customer or session mappings. Do not log body, signatures, credentials, customer details or raw SDK exceptions.

Use verified event data to identify a stored Session, then retrieve current provider state with the approved SDK configuration before a paid transition. Compare account/environment, customer, owner mapping, mode, complete line-item Price/quantity, currency and amount against the stored attempt. Metadata is a hint to verify against this mapping. A signed event alone supplies no tenant permission. For this paid one-time recipe, require `payment_status === 'paid'`; zero-value offers need a separate approved policy.

A completed but unpaid Session remains pending. `checkout.session.async_payment_succeeded` may later enter the same paid transition; `checkout.session.async_payment_failed` records failure without granting access. One Session fulfillment is a semantic action, regardless of how many event IDs describe it. Late events must not reverse newer settled state. Subscription access and revocation need an explicit separate lifecycle design; a failed event is not an instruction to refund or cancel anything.

## Commit once

In Supabase, one server-owned database transaction must claim a unique event ID, bind its raw-body SHA-256 digest, lock the purchase, check the current state and atomically write its entitlement plus event completion. Also enforce a unique semantic grant per Session. A duplicate ID with identical digest is a no-op only after the prior transaction completed; a conflicting digest is an incident. Rollback must remove the claim and every local effect, allowing safe retry. A read-then-insert sequence across separate HTTP requests does not prove this. Draft a narrowly scoped SQL function/transaction and its grants with `dlag-starter-core:data-foundation`; keep service-role secrets server-only and enforce identity/owner mapping before privileged calls.

Record optional transactional notification intent in the same transaction only if requested. Resend delivery is separate from payment/access and cannot make the database and remote email atomic. No queue, scheduler or background runner is selected by this kit. Leave delivery pending until its explicitly chosen processing path exists. A durable inbox is acceptable only with a defined recovery processor; otherwise acknowledge the webhook after the synchronous durable transaction. Transient persistence failure returns a retryable failure; verified irrelevant event types can be acknowledged without changing access.

Every premium server operation checks current identity, membership, ownership and committed entitlement. Hiding a button or storing `paid` in a cookie is insufficient. Route revocation through the same server policy and enforce it even for an already-open browser session.
