# How to sign in and verify the right account

> Category: How-to Guide | Version: 1.0 | Date: October 2026 | Status: Draft / NOT_RUN

Synthetic user-guide specimen for an application that uses Supabase Auth through React Router and Workers. It preserves prerequisites, ordered sign-in, identity verification, account-context checks, sign-out, pitfalls, related sources and revision history. The actual application's supported flow and UI labels must be inspected before publishing this guide.

## Prerequisites

An existing approved application URL, an account intended for that environment and the application's supported sign-in method. This example creates no account, asks for no password/token and performs no provider call. Documentation approval does not authorize credentials or live login testing.

## Sign in

1. Open the application's confirmed sign-in route and confirm the environment. Do not follow an arbitrary redirect or enter credentials on an unverified host.
2. Complete the sign-in method the existing application supports. Supabase Auth owns the authentication exchange; this guide does not introduce a separate CLI/device flow or custom token issuer.
3. Return only to an allowlisted application callback. The Worker verifies the session by the configured supported server method before protected loaders or actions return private data. Browser-visible login state alone is not proof of authorization.

## Verify identity and context

Use the application's own safe account summary and the actual protected route to confirm the expected account. A successful public-page render does not prove a protected session. Record only redacted test-account evidence if verification is part of an authorized test task. Never put cookies or callback tokens in a guide or report.

Starter does not assume organization/workspace switching. If the real application has that feature, inspect its membership and record-ownership policy before documenting it. A browser selection cannot grant tenant access. Do not invent switch commands or roles from an unrelated product's example.

## Sign out

Use the existing application sign-out action. Confirm its supported Supabase session revocation and local cookie clearing behavior, then check that protected navigation requires sign-in again. A cleared visual menu alone is insufficient. Cross-device/global revocation needs its own actual provider and application evidence.

## Common pitfalls

| Symptom | What to check | Safe response |
| --- | --- | --- |
| Callback rejected | Exact configured origin and allowed return path | Record mismatch; do not bypass callback validation |
| Sign-in page loops | Actual server session verification and cookie scope | Inspect scoped test evidence; no token logging |
| Wrong account displayed | Environment and current supported session | Use existing sign-out/sign-in UI; do not assume tenant authority |
| Link expired or consumed | Supabase recovery/login contract and callback behavior | Offer the supported restart path; never extend a token locally |
| Protected route works after apparent logout | Server revocation/cookie behavior and cache controls | Record a security gap; do not call logout verified |

## Related code and evidence

Illustrative source paths: `app/routes/login.tsx`, `app/routes/auth.callback.ts` and `app/services/supabase.server.ts`. Resolve actual paths, safe UI labels and version-specific behavior in the target repository. Keep source observations, authorized browser checks and live provider results separate. No sign-in, credential handling or provider configuration was performed for this specimen.

## Changelog

- Version 1.0: constructed Starter user-guide adaptation, NOT_RUN.
