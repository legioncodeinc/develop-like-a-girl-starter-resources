# Session storage, cookies and refresh

Keep four terms distinct: an identity token describes an upstream sign-in; an access token authorizes API calls; a refresh token obtains new access tokens; an application session represents the ongoing authenticated relationship. Never accept an arbitrary Google ID token as a Supabase API credential.

## Use the approved Supabase session model

Supabase issues access JWTs and rotating refresh tokens. Starter uses its documented request-scoped SSR client rather than adding an independent session database. An opaque server-side session makes revocation straightforward but adds storage and a second identity boundary. A JWT can be validated without a session lookup but remains usable until expiry unless the consumer checks revocation. Neither design removes authorization requirements.

Define idle limits, absolute limits, access-token lifetime, signout scope and the tolerated residual access window. Provider plan and configuration support must be checked before promising a timeout. Cookie lifetime is not an idle or absolute server timeout. Supabase documents rotation exceptions for SSR/concurrent use and recovery from a lost response; do not treat every repeated refresh as compromise or replace its algorithm. [Supabase sessions](https://supabase.com/docs/guides/auth/sessions).

## Cookie topology

| Topology | Policy |
|---|---|
| Supabase browser plus SSR | Browser client needs documented access to session cookies. Preserve its cookie/chunk format; do not force HttpOnly globally |
| Accepted server-only opaque session | HttpOnly, Secure, explicit SameSite and Path; host-only by default; explicit server revocation |
| Local development | An explicit loopback-only policy may relax Secure; never derive that choice from an arbitrary incoming Host |
| Cross-site embed | Separate accepted design; SameSite=None requires Secure and strong CSRF protection, and browser restrictions can still prevent operation |

`__Host-` requires Secure, Path=/ and no Domain. It does not itself make a cookie HttpOnly or prevent CSRF. `SameSite=Lax` usually permits a top-level OAuth return; cross-site OAuth alone is not a reason to switch every session to None. Strict cookies can disrupt email/login returns and need a tested design. Use the [cookie policy template](../templates/session-cookie-config.mjs) as an explicit policy input, not a replacement serializer for the SDK's chunked session format.

## Request and response consistency

The cookie adapter updates its in-request view as well as collecting outgoing Set-Cookie fields. Preserve SDK deletion cookies and all chunks. Apply the SDK cache headers and private/no-store on redirects, errors and ordinary responses. Integrate before streaming begins. Do not fold multiple Set-Cookie values into one comma-separated string.

A shared global client can attach one user's token to another request. A CDN-cached Set-Cookie response can sign another browser into the wrong account. Both are implementation defects independent of cryptographic token validity. Inspect the actual Workers/framework response boundary and cache rules, not only a helper unit test.

## CSRF

Use POST or another appropriate non-safe method for mutations, including logout. A GET navigation must not delete data, reset a password or disable a factor. For the same-origin browser form design, reject a missing, null or unexpected Origin against configured APP_ORIGIN; support additional clients only through an explicitly reviewed policy. Do not substitute the request URL's untrusted Host as the expected origin.

A synchronizer token or a signed/session-bound double-submit scheme can support other accepted browser flows. A naive equality between two attacker-set values is not a complete defense. CORS and SameSite are supplementary controls; neither replaces route authorization. OAuth callbacks use the provider's state/PKCE checks and must not be routed through an unrelated form-CSRF bypass.

## Logout and compromise

Specify whether signout affects the current, other or all sessions. Preserve the provider's outgoing cookie clearing. An error revoking provider state must not be reported as successful global logout. Already-issued JWTs may remain valid; define and test the sensitive-operation session check or accepted expiry window. Clearing a browser cookie alone is not server revocation.

On suspected compromise, review factors and recovery channels, revoke affected refresh sessions, invalidate outstanding proofs where supported, and notify through accepted channels. An upstream Google grant is distinct from a Supabase session; signing out of this app does not automatically revoke every upstream provider grant.

Session fixation protection means the pre-auth state cannot simply become a privileged identity. Verify new login/MFA state, old-session behavior and account switching with the pinned provider. Do not build custom token rotation or copy raw tokens into telemetry to investigate it.

## Check without collecting credentials

The [cookie checker](../scripts/README.md) inspects supplied headers whose values have already been replaced with `REDACTED`. It checks expected-cookie presence, syntax, attributes and prefixes. It performs no sign-in request. It cannot prove actual delivery, browser acceptance, revocation, CSRF or CDN behavior. Obtain separately authorized native evidence for those properties.
