> Synthetic documentation specimen, NOT_RUN. This is a requirements/reference example, not an executable recipe or an accepted project plan. Supabase owns identity/PostgreSQL, Workers own custom backend operations, R2 owns file bytes, Cloudflare stores secrets and Resend is transactional only. The referenced target-project files are illustrative.

<!--
Path on disk:
  library/requirements/backlog/prd-007-user-profile-export/prd-007-user-profile-export-index.md

The folder also contains a sibling `qa/` subfolder
where the authorized independent report author records audit findings; Project Notebook does not author those findings.
-->

> Example context: Project-relative links in this worked document describe the illustrated target repository. They are not bundled Core resources or proof that those project files exist in this packaging checkout.


# Feature #7: User profile export (self-service)

> **ExampleApp** - Feature PRD #007 of N
>
> **Status:** Draft; execution architecture unresolved
> **Priority:** P2
> **Effort:** M (3-8h)
> **Schema changes:** Additive (one column, one table)

---

## Phase Overview

### Goals

Let authenticated users export all of their personal profile data (identity fields, preferences, activity log, consents) as a JSON or CSV file delivered by email. Primarily a GDPR / CCPA compliance feature but also useful for users migrating to other services. This PRD covers the backend export service only; the UI and admin audit log are separate PRDs.

### Scope

- API endpoint `POST /api/users/me/export` that enqueues an export job.
- Background worker that gathers user data, produces JSON + CSV, uploads to a signed-URL object store, and emails the user.
- A new `ExportRequest` table tracking one row per request.
- A one-export-per-24-hour rate limit per user (enforced server-side).

### Out of scope

- User-facing UI button and progress indicator - see `feature-008-export-ui/prd-feature-008-export-ui.md`.
- Admin audit log of export requests - see `feature-009-export-audit-log/prd-feature-009-export-audit-log.md`.
- Export of data not owned by the requesting user (support staff export on behalf of users).

### Dependencies

- **Blocks:** `feature-008-export-ui/prd-feature-008-export-ui.md`, `feature-009-export-audit-log/prd-feature-009-export-audit-log.md`
- **Blocked by:** none
- **External:** Cloudflare R2 (Worker binding `EXPORT_BUCKET`), Resend transactional email (Cloudflare secret `RESEND_API_KEY`), background execution path (execution runner NOT_SELECTED).

---

## User Stories

### US-7.1 - Request an export

**As a** signed-in user, **I want to** request a copy of my profile data, **so that** I have a portable record for my own records or to move to another service.

**Acceptance criteria:**
- AC-7.1.1 Given I am signed in, when I `POST /api/users/me/export` with `{format: "json"}`, then the API returns `202 Accepted` with `{exportRequestId: string, status: "queued"}`.
- AC-7.1.2 Given I have already requested an export in the last 24 hours, when I submit again, then the API returns `429 Too Many Requests` with `code: "rate_limited"`.
- AC-7.1.3 Given `format` is not `json` or `csv`, when I submit, then the API returns `400 Bad Request` with `code: "invalid_format"`.

### US-7.2 - Receive the export by email

**As a** user who requested an export, **I want to** receive a download link by email, **so that** I can fetch my data without needing to keep the browser tab open.

**Acceptance criteria:**
- AC-7.2.1 Given an export job completes, when the email is sent, then the email body contains an application download link with the project's approved lifetime, illustratively 24 hours; opening it still requires current identity and ownership.
- AC-7.2.2 Given the application link is used before expiry by its current authorized owner, when the Worker authorizes the download, then the file downloads with `Content-Type: application/json` or `text/csv` and `Content-Disposition: attachment; filename="profile-export-<requestId>.<ext>"`.
- AC-7.2.3 Given the application download link has expired, when the user opens it, then the Worker denies access with the application's controlled expiry response; no object-store response is assumed.

---

## Data Model Changes

| Model | Change | Type | Nullable | Default | Index |
|---|---|---|---|---|---|
| `ExportRequest` (new) | `id` | `UUID` (PK) | no | `gen_random_uuid()` | primary |
| | `userId` | `UUID` (FK -> `User.id`) | no | - | index |
| | `format` | `enum('json', 'csv')` | no | - | no |
| | `status` | `enum('queued', 'running', 'complete', 'failed')` | no | `'queued'` | index |
| | `createdAt` | `timestamptz` | no | `now()` | index (composite with userId) |
| | `completedAt` | `timestamptz` | yes | null | no |
| | `objectKey` | `text` | yes | null | no |
| | `errorMessage` | `text` | yes | null | no |

**Migration:** `add_export_request_table` - additive, no data backfill, no downtime.

---

## API / Endpoint Specs

### POST /api/users/me/export

**Auth:** server-verified Supabase identity plus current record ownership. Cookie-authenticated mutations also require same-origin/CSRF protection.

**Request:**

```json
{ "format": "json" }
```

Validation (Zod):

```ts
const RequestSchema = z.object({
  format: z.enum(['json', 'csv']),
});
```

**Response `202 Accepted`:**

```json
{
  "exportRequestId": "a1b2c3d4-...",
  "status": "queued"
}
```

**Errors:**
- `400` `{ code: "invalid_format" }` - Zod validation failed.
- `401` - missing or invalid token (handled by auth middleware).
- `429` `{ code: "rate_limited", retryAfterSeconds: <N> }` - another export in the last 24h.
- `500` `{ code: "internal_error" }` - queue unavailable.

### GET /api/users/me/export/:id

**Auth:** server-verified Supabase identity. User may only read their own export requests, including on status and file access routes.

Returns the `ExportRequest` row (excluding `objectKey`; that goes via email only).

---

## UI/UX Description

N/A for this PRD. See `feature-008-export-ui/prd-feature-008-export-ui.md`.

---

## Technical Considerations

- **Worker:** a proposed `user-export` job needs an owner-selected execution and recovery path (NOT_SELECTED). Any concurrency bound must fit the actual runtime and provider limits; no worker or queue is installed by this specimen.
- **Rate limit:** enforced by SQL query `SELECT COUNT(*) FROM export_request WHERE user_id = $1 AND created_at > NOW() - INTERVAL '24 hours'`. No Redis needed.
- **File generation:** the intended behavior is bounded-memory generation using Workers Web Streams and the R2 binding, or another explicitly approved compatible path. No Node Readable/upload-stream API is selected. Exact runtime recipe and limits are PENDING and must be exercised before implementation qualification.
- **Download lifetime:** the application link's illustrative 24 hours is a project-specific policy. Any issued R2 presigned URL is a separate short-lived bearer capability; its revocation limit is stated below.
- **Private data:** an export aggregates sensitive data. Verify ownership for request, status and download; keep R2 private; redact logs; apply retention and deletion rules; never assume the export adds no exposure.
- **Backwards compat:** none (new feature).

---

## Files Touched

### New files
- `app/routes/api.users.me.export.ts` - endpoint handler
- `app/services/user-export-processing.server.ts` - proposed processing adapter; execution/recovery path still unselected
- `app/services/user-export.server.ts` - data-gathering + file-building
- `tests/routes/user-export.spec.ts`
- `tests/services/user-export-worker.spec.ts`
- `supabase/migrations/<timestamp>_add_export_request_table.sql`

### Modified files
- `app/routes.ts` - register the new route + worker on boot
- `app/services/config.server.ts` - add `EXPORT_BUCKET`, `EXPORT_URL_TTL_HOURS` (default 24)

---

## Test Plan

- Unit: `user-export-service.spec.ts` - covers data-gathering correctness for JSON + CSV formats.
- Route: `user-export.spec.ts` - covers AC-7.1.1, 7.1.2, 7.1.3.
- Worker: `user-export-worker.spec.ts` - covers AC-7.2.1 (uses mocked S3 + email adapters).
- Manual: trigger one end-to-end export in staging, confirm email + file contents.

---

## Risks and Open Questions

- **Risk:** large accounts (thousands of activity log rows) could exceed the worker's memory budget. **Mitigation:** streaming everywhere, with a smoke test on a large fixture.
- **Risk:** email provider throttling. **Mitigation:** worker concurrency ≤ 4; backoff on 429 from provider.
- **Open question:** should we gzip the file? Deferred until we have size data from real users.

---

## Related

- ``feature-008-export-ui/prd-feature-008-export-ui.md`` (illustrated project path: `../feature-008-export-ui/prd-feature-008-export-ui.md`) - depends on this.
- ``feature-009-export-audit-log/prd-feature-009-export-audit-log.md`` (illustrated project path: `../feature-009-export-audit-log/prd-feature-009-export-audit-log.md`) - depends on this; adds admin visibility.
- ``knowledge/private/architecture/user-data-model.md`` (illustrated project path: `../../../knowledge/private/architecture/user-data-model.md`) - canonical list of fields that belong in the export.

## Starter adaptation decisions and unresolved execution

No queue or background runner is selected. Treat the asynchronous acceptance criteria and timing promises as Draft until an owner chooses a supported processing/recovery path and actual runtime measurements. Before that path exists, the endpoint must refuse new work with a controlled unavailable result rather than return 202 for an unprocessable request. A pending-intent row alone is not background execution.

Use a server-owned Supabase transaction for the request and rate-limit claim; a separate count-then-insert sequence is race-prone. Check identity and current ownership before every mutation/read, including any privileged database function. Do not grant access from browser-supplied owner IDs. An RLS policy governs database rows, not R2 objects. Store a private R2 object key and metadata, verify object state before ready, and authorize downloads through the Worker. A 24-hour application-link lifetime is illustrative project policy; any object access is short-lived and issued after current ownership checks. Expiry and 410 behavior belong to the application's controlled download route, not an assumed object-store error page.

The chosen runner must preserve stable request identifiers, retry classification and idempotency. Record notification intent separately from final Resend delivery; a provider acceptance response is not delivery. No source export example selects provider credentials, a queue, a scheduler or a live send.

Required meaningful tests include anonymous denial, owner A versus owner B on status/download, forged owner input, concurrent rate-limit requests, validation failure without persistence, object-finalization failure, expired/revoked access, retry without duplicate export/notification, and provider rejection. Original timing and happy-path criteria remain unverified. No example result is reused as execution evidence.

## File-link access and revocation

An emailed application route checks current Supabase identity and export ownership every time. If it returns an R2 presigned URL, anyone possessing that URL can use it until its expiry; later database/RLS permission changes do not revoke an already issued bearer URL. Use an explicitly approved short TTL and do not log or expose it elsewhere. If immediate revocation is required, serve the object through an authorized Worker proxy that rechecks access rather than issue a reusable bearer URL. The illustrative 24-hour application-link policy is not a 24-hour R2 presigned default. Object retention, application-link expiry, bearer-URL expiry and current ownership are separate controls requiring actual project tests.
