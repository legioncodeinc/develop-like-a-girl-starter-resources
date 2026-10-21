# Endpoint and mutation check catalog

## E1. Direct server entrypoint

Inventory every loader/action, resource route, Worker request handler and exported public operation. Read the body and helpers for actor, role, owner, input and result. A page check does not automatically protect a separately callable action; a legitimate shared guard counts only when the path actually invokes it. Public contact/lead inputs are intentional public surfaces, not missing-auth bugs, but still need validation/abuse controls and no private output. Webhooks use signature-based sender verification rather than a user login. No background-job provider has been selected; do not introduce one as an exception.

## E2. Input shape and mass assignment

Trace route/form/JSON fields into query, file path, redirect, object merge and external call. any/unknown/passthrough/unchecked schemas require reading actual downstream validation. A hand-written complete validator can rule out a pattern-only concern. Reject unknown authority fields, validate lengths/formats/types and select explicit allowed columns. Vulnerable: update(body) or Object.fromEntries(formData) writes role/credits/owner. Fixed: pick bounded name/bio fields and derive actor/owner/server prices separately. A type assertion is not runtime validation. A parsed object shape never proves ownership.

## E3. Atomic identity-bound mutations

Authenticate first, authorize the operation and bind the affected row/object to verified ownership. Database changes should enforce the predicate at the write, not just in an earlier lookup that can race. Return a safe not-found/denied result for zero affected rows. R2 key prefixes supplied by the browser are not authorization; resolve the stored object metadata through owner-scoped records before signing/accessing it. Hosted Stripe product/price and entitlement choices must use server-controlled data.

## E4. Raw return values and captured private data

Trace complete ORM/Supabase records, spreads, returned update results and helper captures to responses. Pick only UI-needed fields and return minimal success/id DTOs. Re-read secrets server-side when needed rather than passing/capturing them through browser-owned objects. The selected stack has no implied Server Action closure encryption: do not reuse an encrypted-closure guarantee from a different runtime. Rule out safe explicit selects and DTOs after verifying the schema and every serializer path.

## E5. CSRF and browser-sent cookies

Identify whether the state-changing path accepts cookies automatically, a deliberate bearer header, or a verified webhook signature. For cookie auth, inspect actual Origin/Fetch Metadata/token defenses and trusted canonical origin, cookie SameSite and accepted content types. Reject origin null/wildcards and untrusted forwarded-host comparisons. A SameSite setting alone is not complete CSRF protection. Do not add checkout.stripe.com as a trusted browser mutation origin merely because hosted Checkout is used; browser return is not webhook verification. A JSON-only body and preflight change attack preconditions; they do not justify arbitrary CORS reflection. Record source claims versus observed requests separately.

## E6. CORS

Check explicit allowed origins, methods, headers, credentials and Vary behavior for actual cross-origin needs. Reflection with credentials can expose private responses. A wildcard with credential mode is rejected by browsers; do not claim it automatically sends all cookies. A deliberately public endpoint with no credentials is different. Do not enable broad CORS to fix a same-origin integration bug. Query-string bearer tokens create a separate leakage issue.

## E7. GET/render side effects

Inspect loaders, GET/HEAD, image URLs, link prefetch paths and render functions for writes, deletes, email sends, logout or payment actions. Browsers/crawlers/prefetch can request safe methods without a deliberate mutation step. Move state changes to a validated, authorized mutation handler and apply CSRF where applicable. A GET used solely to retrieve public data is ruled out. A logout GET may have limited impact but still needs an explicit decision, not hidden acceptance.

## E8. Request and work limits

Review bounded byte reading before request.json()/formData() buffers untrusted data. Enforce upload count/per-file/total bytes, filename/key rules, structured input depth and string lengths, batch count, refresh count and maximum concurrent work. Infinity/0 or a platform default is not evidence of a suitable application cap. Document actual platform/gateway caps before crediting them. Content-Length alone is attacker-controlled and chunked/streamed bodies need incremental limits. Reject rather than exhaust memory. No selected background-job provider is implied by a deferred-work suggestion.

## E9. Transactional email and cost abuse

Find Resend, hosted Stripe session creation and any future paid outbound operation. Check authentication where appropriate, per-actor/request limits, server-controlled recipients/content scope and replay/idempotency. A public contact form may be valid but must not become an arbitrary relay. No newsletter/SMS/AI provider is selected by Starter. Rate limiting is an architecture boundary needing actual implementation evidence, not a provider recommendation or a boolean from a regex.

## E10. Verified webhook intake

For Stripe or another explicitly selected sender, find raw-byte capture, signature verification before JSON trust, endpoint secret binding, timestamp/replay policy, durable event identity and retry/transaction behavior. A function called verifySignature is only a hint until its inputs and failure path are read. A user session is not the right substitute for webhook sender verification. A success URL, client payment state or unsigned event must not grant entitlement. Use the existing local Security webhook methods for full code-level review; do not make a provider call.

## E11. Outbound URLs, proxies and redirects

Trace user/stored values into fetch URL, rewrite host, remote image proxy, redirect and credential forwarding. Parse and allowlist actual scheme/host/port/path; consider DNS rebinding, private/link-local addresses, encoded separators, redirects and credentials. A regex restricting a subdomain is not proof that the resulting host is safe. Disable redirect following unless every hop is independently checked. Never forward caller Cookie/Authorization to an arbitrary destination. Keep login return targets same-origin and reject protocol-relative/backslash/control-character forms. Existing local snippets provide the complete relative-redirect guard. Fixed configured origin/path and validated resource identifier can rule out an arbitrary-host claim.

## E12. Validation failures echo sensitive fields

Inspect how forms/action errors return submitted values. Passwords, tokens, card data, signed URLs and private identifiers must not be echoed into HTML, hydration data, logs or validation-state JSON. An input library's reserved field-name convention in another runtime is not a control here. Pick safe redisplay fields explicitly. A generic error with public input is a ruled-out case; a hidden password field in the UI does not remove it from serialized action data.
