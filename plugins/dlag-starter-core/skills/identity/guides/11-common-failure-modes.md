# Identity failure review

For every applicable row record pass, fail, not applicable with a reason, or pending. A library name is not a passing result. Findings cite the changed project location, trigger, expected behavior and actual evidence. Never put real cookies, passwords, callback codes or reset links in the record.

## OAuth and callback failures

| Signature | Correction and evidence |
|---|---|
| Callback accepts code with missing/wrong browser verifier | Use the SDK PKCE flow; test missing, stolen, expired and replayed code/verifier pairs |
| Upstream state or nonce not verified | Confirm the actual provider flow verifies its required claims and transaction state; do not decode/trust an ID token |
| Audience/issuer/signature/expiry unchecked | Use the supported provider verification path; test a token from another client/project |
| Return URL echoed from caller | Use fixed internal destinations or a strict allowlist; reject external, protocol-relative, encoded and backslash variants |
| Supabase callback confused with app callback | Register the exact Google-to-Supabase URL and separate Supabase-to-app allowlist |
| Implicit tokens in browser URL or tokens in logs | Use SSR PKCE; redact callback paths, referrers, analytics and provider responses |
| Future scopes requested “just in case” | Remove unused access; justify and verify each accepted active feature |
| Repeated callback creates a second usable session unexpectedly | Test one-time code consumption and account binding in the actual provider |

## Session failures

| Signature | Correction and evidence |
|---|---|
| `getSession()` or unsigned decode used as authority | Verify claims or use current Auth user; negative forged-token case |
| Global server client or global cookie collector | Create request-local state; test concurrent users |
| Refresh works but next request fails | Preserve updated cookies, deletions and all chunks on every response path |
| Cookies lost on redirect or thrown Response | Finalize at the real framework boundary before streaming |
| Shared cache returns private cookies/data | Exclude auth/private responses from shared caches; inspect actual CDN behavior |
| HttpOnly forced onto browser-refresh topology | Use documented Supabase cookie behavior or an accepted server-only design |
| Missing Secure, invalid prefix or unsafe Domain | Apply the explicit environment/topology policy; check native browser acceptance |
| SameSite=None used as the sole CSRF defense | Add the accepted CSRF control and reevaluate whether cross-site cookies are needed |
| Long-lived access accepted after logout | Measure JWT residual window and enforce immediate revocation where policy requires |
| Refresh reuse automatically called theft | Respect the provider's documented reuse exceptions and inspect actual events |
| Signout clears local cookie but claims global revocation | Handle provider errors and verify every relevant session consumer |

## Authorization failures

| Signature | Correction and evidence |
|---|---|
| Protected parent route but callable child/API | Authenticate and authorize each protected loader/action/resource |
| Tenant or owner supplied by client becomes grant | Resolve subject, current membership and owned metadata at operation time |
| Only route checks or only a happy-path RLS test | Add independent database policy and negative web/direct API cases |
| User-editable metadata grants admin | Use protected application membership/claims policy |
| Old admin JWT remains privileged after demotion | Current policy lookup or accepted bounded claim refresh; measure caches too |
| Email used as stable identity | Use immutable provider subject and internal UUID mapping |
| UPDATE can change tenant/owner | Review USING plus WITH CHECK and every permissive policy |
| Service key used to rescue a failed user query | Remove the bypass; fix the missing grant or refuse |
| R2 key taken from query string | Authorize stored metadata first; use its persisted object key |

## Factors and recovery failures

| Signature | Correction and evidence |
|---|---|
| Enrollment response treated as completed MFA | Challenge and verify; propagate elevated session state |
| Client `aal` flag unlocks admin function | Server verification plus matching RLS requirement |
| No usable previously established recovery evidence | Accept and exercise a supported recovery path before enforcing MFA |
| Password reset disables MFA or restores tenant grants | Keep those authority changes separate and require accepted evidence |
| New email, invoice or urgency accepted by support | Use established independent evidence and authorized operator policy |
| Same saved code succeeds twice concurrently | Verify provider atomic consumption and replacement invalidation |
| Magic-link GET performs password mutation | Keep mutation in an authenticated, protected action; test link scanners |
| Recovery event grants ordinary privileged access | Event is not authorization; restore factors and required normal authentication |
| Experimental API assumed present in all SDKs | Pin version/capability/opt-in; report unsupported methods explicitly |
| Factor QR, code or reset link enters telemetry | Exclude sensitive fields and bodies at every logging layer |

## Configuration and operational failures

Review exact HTTPS origins, development exceptions, provider/project separation, public versus privileged key bindings, email-template ownership, audit-event coverage, account linking reauthentication and Google inactive-client notifications. Account-link and factor-removal notifications must contain safe context, not reusable secrets. Keep a named owner for verification and compromise response.

Use [the audit handoff](../templates/audit-report-template.md). Security Review evaluates abuse and isolation first; Quality Review then evaluates the accepted behavior. Pending native checks remain pending.
