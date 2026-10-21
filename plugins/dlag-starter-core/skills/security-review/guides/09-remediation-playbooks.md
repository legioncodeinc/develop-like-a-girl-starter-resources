# 09. Minimal remediation proposals and proof

> Read-only role: inspect supplied local evidence and return a report in chat. All commands, changes, scans and runtime exercises in this reference are proposals for a separately authorized caller. No dependency, provider, account, setting or credential is operated by this Playbook.

These before/after patterns guide an implementation owner. Security Review proposes corrections and reviews supplied results; it does not edit application/configuration files, rotate secrets, install packages or run tests. Each proposal names exact affected paths and the smallest change needed. Read [the code contracts](../references/secure-by-default-snippets.md) before adapting a sketch into real code.

## A layout or UI check is the only permission control

Before: the protected UI redirects on no session, but a resource loader/action or download path can be called directly, or a sensitive query starts before the check.

After: require verified identity and current object/action permission at each actual private request boundary, through a reviewed shared guard or the installed middleware path that really covers it. Remove a redundant old check only after proving the replacement covers every same path and method. Review SSR, client navigation, fetcher/action and direct resource requests. Tests need allowed, anonymous, expired/revoked and cross-owner controls with independent no-effect evidence. Do not migrate a framework merely to add a guard.

## A server secret reaches a client artifact

Before: a secret is in a VITE_ assignment, public config/loader result, URL, source map, browser import or error log.

After: remove the exposed value from the client/output path, keep the actual credential consumer in a supported server-only module with Workers secret binding, and make missing configuration fail closed. An authorized custodian contains and revokes/rotates an issued exposed credential and checks affected deployments/logs; source removal alone does not close that exposure. Review transitive import paths, actual production bundle/SSR output and sanitized failure logging. Never print the key to prove the finding.

## A private table or request lacks owner isolation

Before: a tenant field exists but a read/update/delete omits its predicate, a public policy permits every row, a write can change owner_id, or the request uses a privileged RLS-bypass credential.

After: enforce the actual authenticated owner/workspace membership and per-operation USING/WITH CHECK design, ordinary-role grants, explicit DTO fields and an application-level permission check before effects. Review all bypass clients, joins, functions, exports and direct SQL paths. If direct SQL uses transaction-local context, keep nonprivileged role, policies, verified context, transaction lifetime and indexes together. FORCE RLS does not constrain superusers/BYPASSRLS. Missing a required policy/migration remains a High-or-higher blocker, not an invisible future task. Only an authorized migration owner changes the schema.

Test own-record allowed access, foreign IDs, forged owner/tenant fields, anonymous/revoked actors and pool reuse where used. Record whether an invalid context returns a safe error or no rows; do not promise a UUID cast yields zero rows. Keep R2 key/download permission in the test because database RLS does not secure those bytes.

## Untrusted values enter SQL or selected identifiers

Before: a query string is concatenated from request input, or a user chooses a table/column/RPC identifier without restriction.

After: bind values with the installed query library's real parameter API; choose identifiers from a fixed reviewed map after permission checking. Example policy: map the external sort selector `recent` to one hardcoded column/order expression, rather than using a submitted SQL fragment. A driver escaping an identifier does not decide which data the actor may read. Test malicious values, unsupported selectors and cross-owner queries; a parser rejection alone is not proof the safe selected path works.

## A webhook accepts unverified or unrecoverable work

Before: JSON is parsed or an effect occurs before signature verification; a wrong environment secret is used; success is returned after only an in-memory callback or a unique event insert.

After: impose an actual body bound, verify original bytes with the supported provider SDK, validate event/object/account mapping, and durably accept recoverable verified work or commit the authorized projection before acknowledging success. Separate event dedupe from completed business effect; protect concurrency, pending/failed recovery and out-of-order updates. Use the same serialized writer for approved reconciliation and keep dedupe history. Never disable timestamp checks or clear completed effect rows to make a replay work. If this was live and exposed, authorized incident investigation is a separate required scope, not an invented evidence claim.

Test missing/bad/stale signature, altered bytes, wrong environment, malformed signed payload, two concurrent deliveries, distinct event IDs for one effect, crash points and database/acceptance failure. Independently observe entitlement, database, email and file effects. See [guide 13](13-webhook-forgery-replay-and-recovery.md).

## Untrusted HTML reaches an SSR/browser sink

Before: imported/user HTML enters dangerouslySetInnerHTML or another raw DOM sink without an actually reviewed sanitizer policy, or a URL uses an unsafe scheme.

After: use ordinary escaped text where raw HTML is unnecessary; otherwise use the selected, runtime-compatible sanitizer at the render boundary and restrict the allowed markup/URLs. Do not add a sanitizer package automatically. Test actual SSR output and browser behavior under the chosen policy, including URLs and attribute/event-handler paths. Do not assert that script code executes in browsers with JavaScript disabled. CSP supplies additional containment, not the sanitizer itself.

## Cookie/session or CSRF behavior is weak

Before: a custom server-only cookie lacks Secure/HttpOnly/appropriate SameSite, a mutation is available through GET, an unverified getSession user object authorizes data, or an arbitrary redirect is accepted.

After: follow the actual Supabase SSR token verification/storage contract; protect custom opaque session cookies, keep mutations in appropriate action methods with an explicit anti-CSRF design, restrict redirect origins and document expiry/refresh/logout/revocation behavior. Do not blindly impose HttpOnly on SDK cookies that need browser token access. Token validity does not establish current membership; test removed/revoked users against existing resources and saved links. Credential/session invalidation operations require the authorized custodian.

## A build path installs mutable dependencies or trusts a resolution substring

Before: npm CI runs an unconstrained install, the lockfile change is unexplained, or an allowlist accepts any string containing the npm hostname.

After: use the project's frozen-lockfile install path, inspect changed URLs/integrities and lifecycle scripts, and parse exact approved origins. Retain actual advisory/signature output and its limits. A registry-signed malicious package can still be malicious. Do not add a new scanner or dependency service without a selected implementation task.

## PII or tokens leave through telemetry/logging

Before: a custom error/breadcrumb/request body, serialized user, replay view or email parameter leaks personal or credential data to a sink.

After: minimize and allowlist event fields, scrub before transmission, mask sensitive page text/custom inputs and redact URLs/network records according to the actual selected telemetry SDK. Review sink access and retention. No telemetry provider is selected by this Security method; inspect only what is actually present. A server-side scrubber is a backstop after transmission, and one SDK privacy flag does not cover every custom property. A confirmed real PII exposure requires owner-scoped incident handling in addition to the code correction.

## After the change

The owner supplies the complete diff, changed candidate hash and relevant check output. Review for unrelated edits and repeat the applicable full pass and neighboring risk invariants for Medium-or-higher fixes before Quality Review. Document failures and unrun evidence. No proposed snippet, formatting check or report authoring action is a completed remediation.
