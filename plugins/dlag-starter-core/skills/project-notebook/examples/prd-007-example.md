> Synthetic documentation specimen, NOT_RUN. This is a requirements/reference example, not an executable recipe or an accepted project plan. Supabase owns identity/PostgreSQL, Workers own custom backend operations, R2 owns file bytes, Cloudflare stores secrets and Resend is transactional only. The referenced target-project files are illustrative.

<!--
Schema v2 paths on disk:

Index (this file):
  library/requirements/backlog/prd-007-user-data-export/prd-007-user-data-export-index.md

Sub-feature PRDs alongside the index:
  library/requirements/backlog/prd-007-user-data-export/prd-007a-user-data-export-backend.md
  library/requirements/backlog/prd-007-user-data-export/prd-007b-user-data-export-ui.md


QA report (authored by Quality Review):
  library/requirements/backlog/prd-007-user-data-export/qa/prd-007-user-data-export-qa.md

Lifecycle moves:
  backlog/ -> in-work/ -> completed/   (entire prd-007-user-data-export/ folder moves)
-->

> Example context: Project-relative links in this worked document describe the illustrated target repository. They are not bundled Core resources or proof that those project files exist in this packaging checkout.


# PRD-007: User data export

> **Status:** Backlog
> **Priority:** P2
> **Effort:** M (3-8h)
> **Schema changes:** Additive - one new table, one new column

---

## Overview

Let authenticated users export all of their personal data (profile fields, preferences, activity log, consent records) as a private application download link delivered by email. Primarily a GDPR / CCPA compliance feature; also useful for users migrating away. **This index covers the module scope.** Sub-feature PRDs cover the backend export service and the UI separately.

---

## Goals

- A user can request a complete export of their data from the account settings page.
- The export is generated asynchronously and delivered by email within 5 minutes for typical account sizes.
- The application download link has this illustrative project's 24-hour lifetime and requires current identity and ownership on every access.
- One export request per user per 24 hours is enforced.

## Non-Goals

- Selective export (specific data types only) - full export only in v1.
- Admin-initiated export on behalf of a user - separate compliance tooling.
- Real-time streaming delivery.

---

## Sub-features

| Sub-PRD | Scope | Status |
|---|---|---|
| ``prd-007a-user-data-export-backend`` (illustrated project path: `./prd-007a-user-data-export-backend.md`) | API endpoint, background worker, object store upload, email delivery | Draft |
| ``prd-007b-user-data-export-ui`` (illustrated project path: `./prd-007b-user-data-export-ui.md`) | Settings page trigger, status indicator, download confirmation page | Draft |

---

## Acceptance criteria (module-level)

| ID | Criterion |
|---|---|
| AC-1 | A logged-in user can trigger a data export from their account settings page. |
| AC-2 | The user receives an email with an identity-checked application download link within 5 minutes of requesting. |
| AC-3 | The download link expires after 24 hours and returns `410 Gone` when accessed after expiry. |
| AC-4 | A second export request within 24 hours is rejected with a clear message and the time until the next request is allowed. |
| AC-5 | The export contains all personal data fields specified in the data retention policy. |

---

## Data model changes

New table `export_requests`:

| Column | Type | Notes |
|---|---|---|
| `id` | `uuid` | PK |
| `user_id` | `uuid FK users.id` | One-to-many |
| `status` | `enum` | `pending`, `processing`, `ready`, `expired`, `failed` |
| `object_key` | `text nullable` | Private R2 key, set after object verification; never a public URL |
| `expires_at` | `timestamptz` | 24h from creation |
| `requested_at` | `timestamptz` | Request time |

---

## Related

- ``library/knowledge/private/data/data-retention-policy.md`` (illustrated project path: `../../knowledge/private/data/data-retention-policy.md`) - defines which fields are included.
- ``library/knowledge/private/architecture/ADR-019-audit-logging.md`` (illustrated project path: `../../knowledge/private/architecture/ADR-019-audit-logging.md`) - export events must be audit-logged.
- ``ird-038-gdpr-right-to-access`` (illustrated project path: `../../issues/completed/ird-038-gdpr-right-to-access/ird-038-gdpr-right-to-access-index.md`) - the issue that drove this feature.

## Starter adaptation decisions and unresolved execution

No queue or background runner is selected. Treat the asynchronous acceptance criteria and timing promises as Draft until an owner chooses a supported processing/recovery path and actual runtime measurements. Before that path exists, the endpoint must refuse new work with a controlled unavailable result rather than return 202 for an unprocessable request. A pending-intent row alone is not background execution.

Use a server-owned Supabase transaction for the request and rate-limit claim; a separate count-then-insert sequence is race-prone. Check identity and current ownership before every mutation/read, including any privileged database function. Do not grant access from browser-supplied owner IDs. An RLS policy governs database rows, not R2 objects. Store a private R2 object key and metadata, verify object state before ready, and authorize downloads through the Worker. A 24-hour application-link lifetime is illustrative project policy; any object access is short-lived and issued after current ownership checks. Expiry and 410 behavior belong to the application's controlled download route, not an assumed object-store error page.

The chosen runner must preserve stable request identifiers, retry classification and idempotency. Record notification intent separately from final Resend delivery; a provider acceptance response is not delivery. No source export example selects provider credentials, a queue, a scheduler or a live send.

Required meaningful tests include anonymous denial, owner A versus owner B on status/download, forged owner input, concurrent rate-limit requests, validation failure without persistence, object-finalization failure, expired/revoked access, retry without duplicate export/notification, and provider rejection. Original timing and happy-path criteria remain unverified. No example result is reused as execution evidence.

## File-link access and revocation

An emailed application route checks current Supabase identity and export ownership every time. If it returns an R2 presigned URL, anyone possessing that URL can use it until its expiry; later database/RLS permission changes do not revoke an already issued bearer URL. Use an explicitly approved short TTL and do not log or expose it elsewhere. If immediate revocation is required, serve the object through an authorized Worker proxy that rechecks access rather than issue a reusable bearer URL. The illustrative 24-hour application-link policy is not a 24-hour R2 presigned default. Object retention, application-link expiry, bearer-URL expiry and current ownership are separate controls requiring actual project tests.
