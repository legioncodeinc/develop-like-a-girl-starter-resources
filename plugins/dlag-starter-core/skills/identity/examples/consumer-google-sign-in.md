# Consumer sign-in with Google

A worked design for a React Router application on Workers, with Supabase Auth and Postgres. The accepted feature is public sign-in using Google, with private records owned by the signed-in account. These are implementation steps and expected tests, not a claim that an account or application has been configured.

## Configuration contract

The server receives SUPABASE_URL, SUPABASE_PUBLISHABLE_KEY and APP_ORIGIN from its Workers context. APP_ORIGIN is the exact canonical HTTPS origin. Privileged Supabase and Google client secrets never enter browser code or loader data. Provider configuration must already be authorized and set up by its owner.

Record the Google project's branding, audience and sign-in-only scopes. Google's redirect points to Supabase's actual callback. Supabase permits the app's exact callback. The Google client belongs to the correct environment, with a monitored owner and inactive-client notice procedure. Fill the [consent checklist](../templates/google-oauth-consent-screen-checklist.md).

## Route behavior

Use [googleSignInAction](auth-routes.server.ts) as the protocol starting point. A same-origin POST initiates login through the SDK and carries the verifier cookie on its 303 response. The destination comes from the configured provider response, not a form URL.

The callback exchanges one code using the verifier from the initiating browser. A failed or missing exchange shows a generic failure and never sends the user to the dashboard as authenticated. It preserves all SDK cookie changes. Only the fixed accepted internal destinations are allowed; edit that set to the actual product routes when integrating.

After return, a protected loader uses the request-local server client to verify claims and reads only records allowed by user-context RLS. Every separate loader/action/resource route performs its own authorization. A returned `{ signedIn: true }` display field is not reusable authority for an API or database query.

## Profile and UI

Supabase user UUID is the identity key. Email, display name and avatar are mutable profile data and do not grant account ownership or paid features. Data Foundation decides any application profile row, uniqueness and deletion behavior; there is no second provider webhook needed simply to mirror every Auth event. Any accepted sync mechanism must handle duplicates and failures without granting extra access.

React Foundation implements a provider button, pending/disabled state, generic cancellation/error message, sign-in help and logout form. Do not add a third-party script to token-bearing callback or recovery pages. Session refresh should finish before route prefetching relies on the new identity.

## Permission and factor behavior

The initial owner-only feature needs no organization role, but still requires ownership checks and RLS. Later billing or organization features add explicit permissions, not a trusted subscription or role flag from the browser. Apply the accepted MFA policy and a usable recovery path; do not enable experimental factors by default.

## Expected evidence

Test successful login, cancelled consent, wrong/missing verifier, expired/replayed/duplicate code, unsafe return paths, wrong origin, direct protected route access, another user's record, refresh followed by another request, and logout followed by access with an already issued token. Observe cookies on redirects/refusals and shared-cache exclusions in the real Workers deployment. Record local-only checks separately from provider, browser and RLS results.

Identity hands protocol and policy to Security Review. Data Foundation owns data/policy changes. React Foundation owns JSX. Quality Review checks the accepted journeys after security corrections.
