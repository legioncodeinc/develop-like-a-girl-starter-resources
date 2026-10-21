# Bounded action integration recipe

The app supplies these server-only contracts. This pseudocode is deliberately explicit about missing implementations; do not import imaginary helpers and call the site ready. Implement each contract in a small local slice and exercise it before a runtime claim.

```ts
export async function action({ request, context }: Route.ActionArgs) {
  // Obtain app services through the scaffold's existing typed Worker context.
  const services = getSiteServices(context);
  if (request.method !== "POST") return reply(405, { error: "Method not allowed" });
  if (request.headers.get("Origin") !== services.siteOrigin)
    return reply(403, { error: "Origin refused" });
  if (!isAllowedFormContentType(request.headers.get("Content-Type")))
    return reply(415, { error: "Unsupported form encoding" });
  // Count actual streamed bytes up to 16 KiB BEFORE parsing; never trust only Content-Length.
  const raw = await readBoundedForm(request, 16 * 1024);
  if (!raw.ok) return reply(raw.status, { error: raw.message });
  const parsed = leadSchema.safeParse(raw.fields); // strict schema, duplicate keys refused
  if (!parsed.success) return reply(422, { errors: publicFieldErrors(parsed.error) });
  const abuse = await services.enforceAbusePolicy(request, parsed.data);
  if (!abuse.ok) return reply(abuse.status, { error: "Submission refused" });
  // If selected: server verification of Turnstile, expected hostname/action and token expiry.
  const result = await services.saveLeadAndIntent(parsed.data);
  if (result.kind === "conflict") return reply(409, { error: "Submission key conflict" });
  if (result.kind === "failed") return reply(503, { error: "Unable to save. Please retry." });
  return reply(202, { receiptId: result.receiptId, notification: "pending",
    message: "Your request was saved. Email confirmation is pending." });
}
```

reply emits framework-compatible JSON/data and Cache-Control: no-store, preserving error statuses and only safe fields. readBoundedForm catches malformed encoding and gives 400, counts bytes with cancellation on limit and gives 413, accepts the chosen URL-encoded encoding only and rejects duplicates/unknown fields. Do not use an unlimited request.formData call before this bound.

leadSchema is a strict local boundary, using existing Zod when available: bounded name/email/message, consent only when genuinely needed, honeypot if selected, stable submission ID and purpose. Do not install Zod silently; reuse the project validator or record the dependency. Client fields never select recipient, sender or arbitrary template HTML. Validate and bind idempotency to a normalized immutable payload; an arbitrary ID string alone is not sufficient.

saveLeadAndIntent atomically inserts a unique receipt and privileged notification intent in Supabase. Concurrent retries return the original receipt and a changed payload using its key returns conflict. No direct anonymous public lead/outbox table access. The adapter must be implemented using the Core data boundaries and reviewed before hosted migrations. If no database has been configured, use an explicitly named in-memory fictional adapter for local checks and mark persistence unproven.

This initial action saves a pending delivery intent without calling Resend. For requested notification behavior, use the Core transactional-email Playbook to add a bounded synchronous attempt after the durable save, or use an explicitly selected processor when its delivery guarantees are needed. Atomically claim the saved intent before sending and persist its outcome. Keep the saved receipt even if notification fails; return only observed pending, accepted, failed or unknown state. Provider acceptance is not delivery. A duplicate lead submission must never reset a completed claim or create a second notification intent. No background processor is selected by this recipe.
