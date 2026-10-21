# MFA, passkeys and usable recovery

Choose factors according to the accepted account policy and the installed Supabase capabilities. Phishing-resistant passkeys are preferable when supported and approved. TOTP is the ordinary portable second-factor path here. Email links establish access to a mailbox; they are not an independent second factor to that same mailbox. SMS carries SIM-swap and recovery risks and is not the default.

## Enforcement policy

Record optional, step-up or required MFA separately for normal users, organization administrators and sensitive actions. Required MFA must be enforced by the server and RLS, including direct API requests. Hiding a page or checking a client-provided `aal` value is insufficient. A newly enrolled factor does not raise assurance until verification succeeds.

Supabase exposes `enroll`, `challenge`, `verify`, `listFactors` and `getAuthenticatorAssuranceLevel`. An authenticated JWT's verified `aal` claim can inform the server policy; the database can enforce its own `auth.jwt()` claim check. Validate current membership as well as assurance. [Supabase MFA](https://supabase.com/docs/guides/auth/auth-mfa).

## TOTP lifecycle

1. Require an authenticated user and the accepted reauthentication/step-up policy before changing factors.
2. Call `supabase.auth.mfa.enroll({ factorType: 'totp', friendlyName: 'Authenticator' })`. Check the error. Show the returned QR/secret only in the protected enrollment flow; exclude it from logs, recordings, analytics and generic loader serialization.
3. Challenge the returned factor, then verify its challenge ID with the submitted code. The provider manages secret storage and code validation. Do not add a local TOTP-secret table or custom clock-window logic alongside it.
4. Persist refreshed session cookies through the response boundary and refresh the displayed assurance state. Do not mark an unfinished enrollment as enabled.
5. Use `listFactors()` to offer only the user's verified factors for sign-in. Challenge/verify the chosen factor, refuse errors, and preserve retry/rate-limit behavior without echoing submitted codes.
6. Factor removal and replacement need the accepted policy, safe notification and tested access after replacement. Prevent removal of the only required factor through a low-assurance session.

The [TOTP guide](https://supabase.com/docs/guides/auth/auth-mfa/totp) defines the current API. Test wrong codes, expired challenges, replay, another user's factor, concurrent challenges and cancellation in the actual authorized target.

## Passkeys

As checked on 2026-10-21, Supabase documents passkeys as experimental, requiring explicit client opt-in and a supported SDK version. Keep them off until that compatibility and product decision is accepted. Pin the relying-party domain, allowed HTTPS origins, confirmed-user requirement and browser support. Synced and device-bound passkeys have different properties; do not claim every passkey is hardware-bound. [Supabase passkeys](https://supabase.com/docs/guides/auth/passkeys).

Registration obtains a challenge, invokes the browser credential ceremony and verifies the response with the provider. Authentication follows the same challenge/verification boundary. Challenge freshness, expected origin, RP ID, account binding and replay refusal remain required even when handled by the SDK. Do not install a second WebAuthn stack or expose raw credential material in logs to fill a perceived gap. React Foundation owns accessible enrollment, cancel, unsupported-browser and fallback UI.

## Recovery codes and alternate factors

Current Supabase JavaScript reference documents experimental `auth.mfa.recoveryCodes.generate` and `verify` with `auth.experimental.recoveryCodes: true`. Verify the pinned SDK exposes them and the project permits their use before enabling them. The generation response contains plaintext once; show it in a private protected flow and never store it in analytics or a report. Verification is single-use and raises the current session to `aal2`; that must fit the accepted recovery policy. [Generate](https://supabase.com/docs/reference/javascript/auth-mfa-recovery-codes-generate), [verify](https://supabase.com/docs/reference/javascript/auth-mfa-recovery-codes-verify).

A supported API does not establish your recovery assurance. Test simultaneous code redemption, regeneration invalidating old codes, stolen-code handling, notifications and factor replacement. Where the installed version lacks the accepted method, use an accepted previously enrolled alternate factor or record the recovery requirement as unresolved. Do not invent codes or a support bypass. Use [account recovery](12-account-recovery.md).

## Magic links and email OTP

Use Supabase's issued proofs and the documented PKCE/OTP flow. Specify purpose, expiry, intended account, single use, callback and resend policy. A link preview must not mutate a password or consume privileged action authority. Keep token-bearing pages free from third-party scripts and referrer leakage; query strings can leak too. Distinguish initiating a login from checking a token, and verify that invalid/consumed proofs cannot authenticate a different account. Do not generate application-owned replacement tokens.

## Evidence and handoff

Record offered factors, exact SDK/configuration, enforcement points, approved recovery evidence, rate controls, audit events and native success/negative/concurrent tests. Enrollment alone, a screenshot or two UI screens cannot certify an assurance level. Security Review checks takeover and bypass risks; Quality Review follows after those fixes.
