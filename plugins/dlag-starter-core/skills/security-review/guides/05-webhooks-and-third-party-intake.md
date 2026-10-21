# 05. Verified intake, durable acceptance and payment effects

> Role boundary: review supplied local evidence with Read/Grep/Glob/Skill and return findings in chat. Execution, remediation, configuration, external requests and saves require a separate authorized caller. Examples below do not grant those tools or permissions.

## Optional hosted Stripe boundary

Stripe is optional. When selected, Starter uses hosted Checkout, with server-created Checkout parameters and server-enforced entitlements. The success URL, client state, client-supplied price/amount/customer ID or a UI flag never grants access. Verify the authenticated owner and map the provider customer/session/object to the application's actual account. Reconcile the authoritative server payment state and selected product/price/environment before provisioning. Checkout session creation and webhook fulfillment are separate authorized operations.

## Verify original body bytes first

Pin sender, endpoint, environment and installed SDK. A Dashboard endpoint secret is different from a CLI forwarding secret; test/live and staging/production association must be deliberate. Record names/custodians only. Read the request's original body under an actual byte bound before parsing JSON. Use the supported signature verifier on those exact bytes and the actual signature header; reject missing/invalid signatures, mutated bytes, wrong endpoint/environment key and an expired timestamp under the configured provider tolerance. Never set Stripe's tolerance to zero to make an old delivery pass: it disables that recency check. Do not hand-roll signature comparisons from a remembered algorithm or infer another provider's replay rules from Stripe.

Content-Length can help reject an obviously oversized request, but it is not the authoritative byte count. Inspect streaming/body-consumption limits supported by the installed Worker/SDK and ensure early rejection causes no durable acceptance or business effect. Shared middleware must not consume/re-encode the body first. Verification failure logs contain sanitized event class/status, not payloads or keys.

## Acceptance is different from completed processing

A valid signature authenticates delivery; it does not prove schema, business permission, durable work or entitlement completion. Validate the supported event type and schema, tenant/object mapping, expected environment and allowed state transition. Persist a durable verified inbox/work item with event identity, status and enough sanitized recovery data, or atomically commit the authorized projection before returning successful acceptance. A unique event row followed by an in-memory callback is insufficient: a process can terminate after 2xx and before the effect. Workers `waitUntil` extends work for a limited lifetime; it is not by itself a durable delivery/recovery store.

No background-job provider is selected by Starter. Design a durable inbox/projection with Data Foundation and the selected payment method, or record that implementation as missing. Do not choose a queue service or install one to satisfy the diagram. On unavailable durable persistence, return the actual retryable failure required by the provider contract rather than falsely acknowledging completed work. Do not claim a unique-constraint conflict means completed: the existing row may be pending, leased or failed.

## Duplicates, concurrency and order

Use a unique verified event identity to distinguish delivery duplicates. Then enforce an object/business-operation invariant so two different event IDs cannot repeat a credit, subscription grant or notification. Decide actual transaction/lease/locking semantics; constrain writes using expected prior state where appropriate. Concurrent deliveries and worker restarts must not both apply the same business effect. Provider delivery is not a promise of exactly-once application effects.

Events can arrive out of order. An older event must not overwrite a newer authoritative projection. Use an actual version/state transition or authorized current-resource reconciliation through the same serialized writer. Re-fetching a resource is itself a provider call requiring the existing task and tools. Do not use receipt time as proof of provider ordering. Keep observed delivery, accepted work and applied effect statuses separate.

## Recovery without bypass

Retain completed dedupe/effect history during recovery. Never clear dedupe rows as a generic replay step, turn off signature validation, or accept an expired recorded body as a fresh delivery. Recover from persisted verified work or a separate authorized administrative reconciliation path with the same customer/object mapping and effect writer. Paginate the complete requested reconciliation window; log operation IDs/status and retain audit evidence. A manual replay route needs operator permission, bounds, rate control and its own acceptance evidence. It cannot become an unauthenticated privileged endpoint.

Test a crash before durable insert, after acceptance, before the effect, after the effect and before completion status. Test duplicate/concurrent delivery, distinct event IDs for one business operation, out-of-order events, stale/wrong keys, malformed signed schema and persistence failure. Observe independent database/entitlement/email effects. A fast 2xx without those effects observed proves only a response.

## Key rotation, delivery health and other integrations

Plan approved rotation overlap, which key versions are accepted, retirement refusal, retained pending work and monitoring for signature/delivery failures. The reviewer never reads or changes the keys. Retry delays, delivery windows and dashboard replay behavior must come from the actual provider/version documentation. Do not use an old numeric table as the live contract.

No additional CRM/webhook service is a Starter default. For any explicitly selected third-party intake, record its current header/algorithm, key distribution, raw-body rules, timestamp/replay contract, retry/acknowledgment semantics and delivery pause/escalation behavior. A direction to return 2xx on an internal provider error cannot justify accepting forged requests or losing unpersisted work. If the vendor contract is unavailable, mark that sender unsupported/unverified; do not substitute Stripe's contract.

## SSRF, input validation and file intake

A signed webhook may carry attacker-influenced attachment/avatar URLs. Server fetching those fields is still an SSRF boundary. Prefer no arbitrary fetch. For an actual allowed source, validate parsed scheme, exact origin/port, credentials, each redirect and the runtime's address-resolution boundary; reject unexpected destinations and internal/private resources according to the actual design. A substring check such as `host.includes(allowed)` is not an allowlist. A managed WAF is not proof of this application policy.

For uploads, authorize actor/record/key before writing, enforce byte/type/count constraints, avoid trusting a MIME header or filename extension alone, separate unfinalized/quarantined bytes from usable records and public assets, and verify server-side ownership at finalization and download. Malware scanning, if required, needs an actual selected and authorized implementation; this method does not invent one. R2 access is independent of database RLS.

Use [the trust worksheet](../templates/security-design/webhook-trust.md), [detailed recovery procedure](13-webhook-forgery-replay-and-recovery.md), and [snippet contracts](../references/secure-by-default-snippets.md). Sources: [Stripe, Workers/R2 and OWASP](../references/official-sources.md).
