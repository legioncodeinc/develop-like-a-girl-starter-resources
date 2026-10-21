# Google sign-in through Supabase

Use the Supabase Google provider with the authorization-code/PKCE flow for SSR. Google authenticates the account; Supabase issues the application session. Do not bolt a second Google token exchange onto the same callback.

## Two callback boundaries

Google's registered redirect URI is the exact Supabase provider callback, commonly `https://<project>.supabase.co/auth/v1/callback`. The application's own callback, such as `https://app.example.com/auth/callback`, belongs in Supabase's redirect allowlist and in `signInWithOAuth`'s `redirectTo`. Copy the actual configured provider callback for custom domains. Confusing these two URLs causes `redirect_uri_mismatch` or a return to the wrong application.

Use a trusted configured APP_ORIGIN and explicit callback paths. Do not build callbacks from a caller-controlled forwarded Host. Production uses HTTPS and exact entries; preview wildcard convenience is not the production policy. See [Supabase Google setup](https://supabase.com/docs/guides/auth/social-login/auth-google).

## Flow and failure behavior

1. A same-origin sign-in action creates the request-scoped Supabase client.
2. Call `signInWithOAuth({ provider: 'google', options: { redirectTo, skipBrowserRedirect: true } })` on the server. Preserve the PKCE cookie when redirecting to the returned provider URL.
3. Supabase manages the upstream provider flow, including its OAuth validation. Pin the implementation and test state/PKCE failure rather than claiming those checks passed because an SDK exists.
4. The application's callback accepts one expected code, rejects missing/duplicate/oversized values and calls `exchangeCodeForSession` with the request's verifier cookies.
5. An error yields a generic sign-in failure. Success redirects only to an explicitly permitted internal destination. Finalize cookies on both paths and set no-store and no-referrer policies. Do not log the callback URL or provider tokens.
6. Every later protected request independently verifies identity and authorization. A successful callback does not grant tenant membership.

The [protocol handlers](../examples/auth-routes.server.ts) demonstrate these boundaries. They still require the real React Router response mount and authorized provider tests.

## Scopes and consent

Default to sign-in-only identity access, with `openid`, `email` and `profile` as needed by the actual provider flow. Email is a mutable contact field; use the stable subject for ownership. A Google sign-in does not authorize Gmail, Drive or Calendar access.

For additional API access, fill [scope justification](../templates/scope-justification-template.md), identify the narrowest accepted scope and verify its current classification in the API's official scope table. For example, Gmail `gmail.readonly` is restricted and `gmail.send` is sensitive. Do not guess categories from the words “read” or “send.” Additional scopes require explicit product scope and provider configuration decisions. See [Gmail scope classifications](https://developers.google.com/workspace/gmail/api/auth/scopes).

## Google Auth Platform setup record

Record Branding (name, support contacts, homepage, privacy and terms), Audience (internal or external, testing or production), Data Access (exact scope list), verified domains and authorized callbacks. Match visible app branding and monitor the owner email. Verification and any assessment depend on the actual scope/data use; use [the verification guide](07-google-oauth-verification.md).

Google Identity Services replaces legacy `gapi.auth2` for direct browser identity flows. This Supabase redirect flow does not need a second GIS widget. If a separately accepted One Tap feature is added, verify issuer, audience, expiry, signature, nonce and the provider's expected nonce hashing before using `signInWithIdToken`. Never decode and trust a Google JWT yourself. [Google GIS migration](https://developers.google.com/identity/oauth2/web/guides/migration-to-gis).

## Inactive clients and operations

Google can delete OAuth clients after six months without qualifying activity. Its documentation identifies credential/token requests and client-setting changes, sends advance notification, and describes a recovery window after deletion. Assign an owner, monitor notices and inspect actual last-used status. A `tokeninfo` request with only a client ID is not a documented keepalive. Do not create a synthetic credential job or change settings just to manufacture activity. Restore or retire a client only with an approved operational action. See [Google client management](https://support.google.com/cloud/answer/15549257?hl=en).

For `deleted_client`, confirm the correct environment and current console status, then use the documented recovery process if eligible. For `redirect_uri_mismatch`, compare scheme, host, path, port and trailing slash at both callback boundaries. For `invalid_grant`, inspect verifier persistence, expiry, duplicate redemption and wrong-browser flows with sanitized evidence.

Service-account keys, domain-wide delegation and machine-to-machine Google APIs are separate requirements. Do not use them to impersonate a signed-in user. A requested compromise-event integration also needs its own accepted signature validation, replay handling and session-revocation design.
