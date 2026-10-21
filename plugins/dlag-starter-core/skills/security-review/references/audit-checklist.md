# Security surface checklist

For every row record INSPECTED, NOT REVIEWED or NOT APPLICABLE, the exact evidence location/candidate, result and gap. Empty rows are unproven. “None detected” applies only after actual inspection. Commands and execution evidence must come from a separately authorized caller; this role uses local Read/Grep/Glob/Skill only. A static code review cannot certify a deployed policy.

## Framework and request boundaries

- [ ] Installed React Router/Vite/Workers adapter versions, framework SSR mode, route config and actual request entry point identified.
- [ ] Each private loader/action/resource endpoint authorizes verified identity and current action/object permission before data/effects; no reliance on UI hiding or an assumed parent-loader barrier.
- [ ] Actual shared middleware/guard mount coverage and order established for SSR, data/navigation, direct URLs, fetchers and all methods.
- [ ] Mutation method, Origin/CSRF mechanism, exact trusted exceptions, CORS and logout/recovery paths inspected; no wildcard bypass or state-changing GET without reviewed reason.
- [ ] Input types, byte/page/count bounds, redirects, errors and refusal branches validated; denial occurs before effect.
- [ ] Actual `.server` boundary and transitive client imports reviewed; public environment/define/serialized config cannot carry server credentials.
- [ ] Loader/action/SSR/data responses allowlist fields; cookies, tokens and internal records do not escape through serialization or URLs.
- [ ] Every raw HTML/Markdown/DOM injection sink has controlled input or a real runtime-compatible sanitizer policy; unsafe URL/inline-script paths considered.
- [ ] Production CSP/renderer nonce or static-hash design, actual response headers and browser evidence recorded, or execution marked NOT RUN.
- [ ] Supabase SSR verification/storage flow distinguished from custom opaque session cookie design; Secure/HttpOnly/SameSite/__Host rules applied where compatible, expiry/refresh/fixation/logout/revocation limits documented.

[Framework guide](../guides/02-react-router-attack-surface.md).

## Identity, ownership, tenancy and files

- [ ] Verified token/project/environment and current role/membership source established; client user/tenant/owner fields never confer authority.
- [ ] Supabase API request role, token, schema/table grants and RLS inspected for every private exposed table.
- [ ] SELECT/DELETE USING and INSERT/UPDATE WITH CHECK cover actual owner/workspace rules; update/read policy interaction, permissive policies and anonymous grants reviewed.
- [ ] Privileged secret/service-role clients, table-owner/superuser/BYPASSRLS roles, views/RPC/SECURITY DEFINER functions and search_path/execute grants reviewed.
- [ ] Direct SQL connections explicitly establish the reviewed request context; transaction-local settings, pool mode/reuse, nonprivileged role, policies and wrapper bypasses tested when used.
- [ ] Missing, empty and malformed context deny safely without foreign data/effects; no claim that every UUID cast returns zero rows.
- [ ] Parameterized values, fixed allowed identifiers and raw SQL/filter/RPC paths checked.
- [ ] Relations, aggregates, counts, caches/search candidates, exports/downloads and error/existence fields retain actor and permission scope.
- [ ] R2 key selection and read/write/finalization are authorized separately from database RLS; public/private/unfinalized objects separated.
- [ ] Presigned capability expiry, URL/log/referrer exposure and revocation limits documented; arbitrary keys/buckets never accepted from browser.
- [ ] Positive allowed controls plus anonymous/A-to-B/revoked/privileged cases and independent database/file/effect evidence exist, or target testing stays NOT RUN.

[Authorization guide](../guides/03-authorization-and-tenancy.md), [response boundary guide](../guides/12-response-and-tenant-boundaries.md).

## Secrets, SQL and environments

- [ ] Cloudflare server binding names/consumers/environments/custodians recorded without values; previews cannot accidentally use live money/email resources.
- [ ] Missing/wrong/expired secret errors fail closed without privileged fallback or sensitive logs.
- [ ] No real keys/connection strings in committed config, `.env`/`.dev.vars`, templates, assets, workflow YAML or build arguments.
- [ ] VITE_/custom prefixes, define replacement, public config endpoints, SSR output, source maps and logs inspected for credential authority; intentionally public identifiers classified correctly.
- [ ] Raw SQL construction and dynamic identifier permissions reviewed; actual installed driver/query behavior known.
- [ ] Supplied historical scanning, GitHub push-protection/secret-scanning/bypass evidence and artifact scope inspected; ignore files do not erase history.
- [ ] For a confirmed exposure, source correction, artifact removal, authorized credential containment/rotation and misuse evidence have distinct owners/status.

[Secrets guide](../guides/04-secrets-and-env.md).

## Intake, payments, external URLs and uploads

- [ ] Optional Stripe selected explicitly; hosted Checkout creation verifies owner, allowed price/amount/environment and real customer mapping server-side.
- [ ] Success URL, UI flag and client state cannot grant entitlement.
- [ ] Endpoint key/environment/SDK/header association known; original bounded body reaches signature verifier before JSON parsing or any acceptance/effect.
- [ ] Missing/invalid/stale/wrong-key/altered-body cases reject; tolerance is not disabled to accept old recorded deliveries.
- [ ] Signed schema/event/object/account mapping verified; a valid signature is not enough for an authorized business effect.
- [ ] Durable recoverable verified work or authorized atomic projection exists before 2xx; in-memory callbacks and unique-row presence are not completion proof.
- [ ] Delivery dedupe and object-level effect invariants cover concurrent duplicates, different IDs, pending/failed work, crashes and out-of-order state.
- [ ] Recovery preserves effect/dedupe history, uses an authorized bounded path and the same serialized writer; reconciliation pagination complete.
- [ ] Actual sender's retry/acknowledgment/rotation/retirement/health-pause contract recorded; no unselected integration or job provider introduced.
- [ ] Payload-sourced fetches have actual origin/redirect/address controls; signed input is not SSRF authorization.
- [ ] Upload actor/record/key/type/size/count/finalization/quarantine/download rules checked; no implied scanner implementation.

[Intake guide](../guides/05-webhooks-and-third-party-intake.md), [webhook recovery guide](../guides/13-webhook-forgery-replay-and-recovery.md).

## Dependency and CI supply chain

- [ ] Actual package manager/runtime/lockfile and frozen installation path inspected; npm uses npm ci where applicable.
- [ ] All resolved origins parsed and compared exactly, with approved private/Git/local exceptions recorded; integrity and version diffs explained.
- [ ] New transitive dependencies traced to their parent; new lifecycle scripts/binaries/network/credential access reviewed.
- [ ] Current advisory/signature/attestation output tied to exact versions and its limited scope; no assertion that a valid signature proves benign code.
- [ ] Generated package names/APIs have expected publisher/current documentation evidence; unavailable external verification stays a gap.
- [ ] Privileged workflows, fork checkouts, caches/downloaded artifacts, action pins and token/OIDC rights reviewed; actual repository bot settings known.

[Dependency guide](../guides/06-dependencies-and-supply-chain.md).

## Headers, transport and abuse

- [ ] Actual hostname/environment/response evidence covers HTTPS/HSTS, CSP, framing and nosniff on relevant success/error/resource routes.
- [ ] Report-Only rollout has an owner and enforcement decision; actual CSP nonce/hash supports installed SSR and static responses.
- [ ] Private response/cache keys and edge overrides cannot share another actor's data; public assets exclude secrets/VCS/backups/private output.
- [ ] Login/recovery/upload/search/export/payment/email/intake paths have actual body/operation/time/frequency controls; selected plan/config evidence replaces assumed managed WAF protection.
- [ ] Rate-limit and dependency failure do not create data/effects or silently lose accepted verified work.

[Headers guide](../guides/07-headers-and-transport.md).

## Generated-code risks and independent review

- [ ] Missing ownership/RLS and credential defaults inspected rather than inferred from generated comments.
- [ ] Raw HTML/SQL/redirect/URL inputs considered alongside whole-system authorization and business effect paths.
- [ ] Existing passing evidence tied to unchanged inputs; relevant neighboring invariants reviewed after iterative changes.
- [ ] Security method author/implementation author does not independently clear their own new work; Quality follows the updated Security candidate.
- [ ] Numeric studies/CVEs/defaults are not repeated as current target facts without current primary versioned evidence.

[Generated-code guide](../guides/08-ai-generated-code-patterns.md).

## PII, logs, telemetry and agent context

- [ ] Actual request/error/log/breadcrumb/database-query/transaction/span/event/replay sinks identified and their access/retention recorded.
- [ ] Sensitive fields minimized/redacted before transmission, including URL queries, cookies, headers, custom properties and source maps.
- [ ] Any selected replay SDK masks static personal text as well as native/custom sensitive inputs and captured network URLs.
- [ ] Default privacy flags checked against real custom fields; server-side scrubbing is a backstop, not proof data never left.
- [ ] Findings/context use redacted path/class/artifact metadata, never credential values or unnecessary customer records.
- [ ] Every unavailable published/log/provider/context scope remains explicit; synthetic sentinels do not prove all-secrets absence.

[Exposure guide](../guides/14-browser-log-and-context-secrets.md).

## Threat-to-evidence closure

- [ ] Five design worksheets and actual supplied facts identify assets, actors, trust transitions, threats, controls/owners and assumptions.
- [ ] Each material threat has an allowed control, denial/effect invariant, exact target/fixture, independent effect oracle and result category.
- [ ] SOURCE REVIEW, SYNTHETIC EXERCISE, NOT RUN and TARGET RUNTIME results remain distinct; standard claims cite actual loaded version/requirement.
- [ ] Findings have evidence/severity/proposed correction/actual fix status; updated candidate re-evaluation covers all applicable surfaces before Quality.

[Audit procedure](../guides/01-audit-procedure.md), [risk verification](../guides/15-verify-actual-risk.md).
