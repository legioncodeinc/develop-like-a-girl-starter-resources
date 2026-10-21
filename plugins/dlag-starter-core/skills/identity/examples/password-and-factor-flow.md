# Password sign-in, confirmation and factor enrollment

A worked design for custom React forms backed by Supabase Auth. React Router actions on Workers own the protocol; Supabase owns credentials and issued proofs. Use the existing project packages. This is not a scaffold command or an executed provider flow.

## Enrollment and confirmation

Record whether the accepted project permits self-registration and requires verified email. Use `supabase.auth.signUp` through the installed SDK and its documented confirmation flow. Handle a user object without an active session when confirmation is pending; do not treat registration alone as authenticated access. Preserve PKCE and confirmation callback behavior for SSR.

The application profile or tenant membership is a separate data decision. An email address is not a stable account key, and registration does not automatically create an administrator. Data Foundation reviews the profile relation and the explicit first-tenant-owner rule.

## Sign-in action

Accept a same-origin POST, validate the requested form fields and enforce the accepted request-size and abuse controls before calling `supabase.auth.signInWithPassword({ email, password })`. Never log the submitted body or echo provider diagnostic details. On error return the generic accepted credential failure. On success preserve SDK cookies and redirect to a fixed permitted destination. Check required assurance before granting a protected operation.

This action has actual provider side effects when mounted and called. It is not run by the playbook or its pure checks. Production and test credentials must never be embedded in examples.

## React interaction contract

The form needs labeled email/password controls, appropriate autocomplete, a disabled pending action, focusable field/global error feedback and safe password-reset help. A social button uses its own provider initiation action. Show explicit confirmation-pending, expired-link, cancelled-factor, rate-limited and session-expired states. Do not expose raw tokens to React props. React Foundation chooses the actual component and styling implementation.

## TOTP enrollment and challenge

After accepted authentication/reauthentication, call the provider MFA enrollment API and show its QR/secret only in that protected flow. Enrollment is unfinished until a challenge and verification succeed. Use the returned factor ID and challenge ID only for the authenticated user's operation. Persist any updated cookies and verify the new assurance level before allowing a sensitive action. Failed codes must not produce a partially elevated session.

Define a usable recovery path before requiring the factor. A supported alternate authenticator or accepted provider recovery-code capability is preferred over custom cryptography. Current experimental passkey/recovery-code methods require a pinned compatible SDK and explicit opt-in decision; see [MFA](../guides/08-mfa-and-passkeys.md).

## Reset and account linking

A reset request uses `resetPasswordForEmail` with the exact allowed return URL and a generic public response. In the recovery flow, `updateUser({ password })` is a provider operation only after the intended proof and policy checks. Password reset must not disable MFA, assign a tenant or become a general privileged recovery session. Follow [the recovery procedure](../guides/12-account-recovery.md) for purpose binding, concurrent redemption and compromise handling.

Linking another social identity requires the supported authenticated linking path and accepted reauthentication policy. Matching email strings or a client callback alone cannot prove ownership of two identities.

## Required evidence

Test confirmed and unconfirmed accounts, wrong password, missing input, cross-origin form, duplicate submit, expired/replayed link, link preview, wrong factor/challenge, lost factor, required MFA bypass, account linking to another subject, logout scope and direct API/RLS access during recovery. Record UI, SDK, provider and database results independently. Security Review first, then Quality Review.
