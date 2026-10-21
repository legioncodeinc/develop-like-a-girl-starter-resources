> Synthetic documentation specimen, NOT_RUN. This is a requirements/reference example, not an executable recipe or an accepted project plan. Supabase owns identity/PostgreSQL, Workers own custom backend operations, R2 owns file bytes, Cloudflare stores secrets and Resend is transactional only. The referenced target-project files are illustrative.

# POST /api/users/me/export

> Example context: Project-relative links in this worked document describe the illustrated target repository. They are not bundled Core resources or proof that those project files exist in this packaging checkout.

> Category: API | Version: 1.0 | Date: May 2026 | Status: Active

Enqueues a background job that gathers all of the authenticated user's profile data and emails them an application download link that still requires current identity and ownership. One export per user per 24 hours.

**Related:**
- `prd-feature-007-user-profile-export.md` (illustrated project path: `../../requirements/completed/prd-007-user-profile-export/prd-007-user-profile-export-index.md`) - spec
- `app/routes/api.users.me.export.ts` - handler
- `app/services/user-export.server.ts` - worker

---

## Endpoint

```
POST /api/users/me/export
```

## Authentication

- Supabase identity verified on the Worker for every operation; cookie-authenticated requests require same-origin/CSRF protection. See the project's accepted identity policy.
- Current ownership and any project role restrictions must be checked. An authenticated account cannot read another owner's request or file.

## Request

### Headers

```
Authorization: Bearer <jwt>
Content-Type: application/json
```

### Body

```json
{
  "format": "json"
}
```

### Schema

```ts
z.object({
  format: z.enum(['json', 'csv']),
})
```

## Responses

### 202 Accepted

Successful enqueue. The job is not complete; the user will receive an email within ~2 minutes.

```json
{
  "exportRequestId": "a1b2c3d4-5e6f-7890-abcd-ef1234567890",
  "status": "queued"
}
```

### 400 Bad Request

Validation failed.

```json
{
  "code": "invalid_format",
  "message": "format must be 'json' or 'csv'"
}
```

### 401 Unauthorized

Missing or invalid bearer token. Standard response from the auth middleware.

### 429 Too Many Requests

The user has requested an export in the last 24 hours.

```json
{
  "code": "rate_limited",
  "retryAfterSeconds": 47321
}
```

Also sets `Retry-After: <seconds>` header.

### 500 Internal Server Error

Queue unavailable or other server error.

```json
{
  "code": "internal_error",
  "message": "Please try again later."
}
```

## Example

### cURL

```bash
curl -X POST https://api.example.com/api/users/me/export \
  -H "Authorization: Bearer $TOKEN" \
  -H "Content-Type: application/json" \
  -d '{"format":"json"}'
```

### TypeScript fetch

```ts
const res = await fetch('/api/users/me/export', {
  method: 'POST',
  headers: {
    Authorization: `Bearer ${token}`,
    'Content-Type': 'application/json',
  },
  body: JSON.stringify({ format: 'json' }),
});

if (res.status === 202) {
  const { exportRequestId } = await res.json();
  // poll GET /api/users/me/export/:id or wait for email
} else if (res.status === 429) {
  const { retryAfterSeconds } = await res.json();
  // show "Available again in Nh"
}
```

## Side effects

- A new row is inserted into `export_request` with `status = 'queued'`.
- A pending export intent is durable, but no runner is selected or activated. Do not accept work without an approved recovery/processing path.
- Nothing user-visible changes until the worker completes (~2 minutes) and sends the application download link; timing and processing remain unresolved.

## Rate limiting

One export per user per rolling 24-hour window. Counted by `COUNT(*)` on `export_request` where `user_id = $1 AND created_at > NOW() - INTERVAL '24 hours'`. See `feature-007` (illustrated project path: `../../requirements/completed/prd-007-user-profile-export/prd-007-user-profile-export-index.md`) for the full spec.

## Observability

- Requests may log `{ requestId, format, outcome }` with redacted identifiers; no tokens, email addresses, signed URLs or export contents.
- Failure monitoring is a project-specific decision. Do not add an unselected monitoring service or log private export contents.

## Related endpoints

- `GET /api/users/me/export/:id` (illustrated project path: `get-user-export-by-id.md`) - status poll for a specific request.

## Changelog

- v1.0 (2026-05) - Constructed documentation example; implementation and execution NOT_RUN.

## Starter adaptation decisions and unresolved execution

No queue or background runner is selected. Treat the asynchronous acceptance criteria and timing promises as Draft until an owner chooses a supported processing/recovery path and actual runtime measurements. Before that path exists, the endpoint must refuse new work with a controlled unavailable result rather than return 202 for an unprocessable request. A pending-intent row alone is not background execution.

Use a server-owned Supabase transaction for the request and rate-limit claim; a separate count-then-insert sequence is race-prone. Check identity and current ownership before every mutation/read, including any privileged database function. Do not grant access from browser-supplied owner IDs. An RLS policy governs database rows, not R2 objects. Store a private R2 object key and metadata, verify object state before ready, and authorize downloads through the Worker. A 24-hour application-link lifetime is illustrative project policy; any object access is short-lived and issued after current ownership checks. Expiry and 410 behavior belong to the application's controlled download route, not an assumed object-store error page.

The chosen runner must preserve stable request identifiers, retry classification and idempotency. Record notification intent separately from final Resend delivery; a provider acceptance response is not delivery. No source export example selects provider credentials, a queue, a scheduler or a live send.

Required meaningful tests include anonymous denial, owner A versus owner B on status/download, forged owner input, concurrent rate-limit requests, validation failure without persistence, object-finalization failure, expired/revoked access, retry without duplicate export/notification, and provider rejection. Original timing and happy-path criteria remain unverified. No example result is reused as execution evidence.

## File-link access and revocation

An emailed application route checks current Supabase identity and export ownership every time. If it returns an R2 presigned URL, anyone possessing that URL can use it until its expiry; later database/RLS permission changes do not revoke an already issued bearer URL. Use an explicitly approved short TTL and do not log or expose it elsewhere. If immediate revocation is required, serve the object through an authorized Worker proxy that rechecks access rather than issue a reusable bearer URL. The illustrative 24-hour application-link policy is not a 24-hour R2 presigned default. Object retention, application-link expiry, bearer-URL expiry and current ownership are separate controls requiring actual project tests.
