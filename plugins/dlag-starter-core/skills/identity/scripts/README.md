# Optional local identity checks

These modules are pure functions. They do not read a project, contact a URL, sign in, accept passwords or collect cookies. The Identity Specialist has no execution tool; when the user authorizes an available local tool to run a check, pass only the named sanitized inputs. No package installation is needed by these modules.

## Cookie attributes

Import `reviewCookieHeaders` from [cookie-attribute-checker.mjs](cookie-attribute-checker.mjs). Supply separate Set-Cookie fields with every value replaced by `REDACTED`, or an empty value for a deletion. Never paste live values into a command, report or chat. Combined comma-delimited headers are not supported.

```js
const result = reviewCookieHeaders([
  '__Host-session=REDACTED; Path=/; Secure; HttpOnly; SameSite=Lax; Max-Age=86400',
], { expectName: '__Host-session', topology: 'server-only', environment: 'production' });
```

The default is a server-only cookie, so HttpOnly is required. For documented Supabase browser+SSR cookies choose `topology: 'browser-ssr'`; HttpOnly then fails because the browser SDK must read the cookie. Secure, SameSite and prefix checks still apply. Check each expected chunk name explicitly when reviewing chunked cookies. Missing expected cookies fail, including empty input. Results contain indexes and finding codes, never raw headers or values.

Limits: 64 headers, 8,192 characters each, 262,144 characters total, 32 attributes per header. Malformed input, non-redacted values and bounds violations throw a generic input error. `passed` concerns only the selected cookie's must-fix attribute findings. Inspect advisory findings too. This cannot prove CSRF, browser acceptance, CDN policy, provider behavior or real authentication.

## OAuth scope comparison

Import `reviewOAuthScopes` from [validate-oauth-scopes.mjs](validate-oauth-scopes.mjs). Supply reviewed source text and the exact accepted scope list:

```js
const result = reviewOAuthScopes([
  'const scopes = "openid email profile";',
], ['openid', 'email', 'profile']);
```

It finds literal Google scope URLs and short scopes in quoted strings, then reports declared-but-unseen and seen-but-undeclared candidates. No source text or file path is returned. Bounds: 64 texts, 65,536 characters each, 1,048,576 total, 128 declared/detected scopes. Inputs are validated before comparison. Empty source sets and overlong Google scope URL tokens are rejected, never silently reported as truncated scopes.

Literal matching is conservative: comments or unrelated email/profile strings can be false positives; dynamic construction, environment configuration and provider-managed defaults can be missed. The supplied text set is not a complete project scan. Reconcile candidates with actual `signInWithOAuth` configuration, consent-screen state and accepted features. A match proves neither consent approval nor runtime scope use.

## Cookie policy template

[session-cookie-config.mjs](../templates/session-cookie-config.mjs) expresses topology, environment, SameSite and lifetime decisions. Its serializer is only for an explicitly accepted opaque server-only session. Supabase-owned cookies continue to use the SDK serializer. The lifetime is a cookie setting, not proof of server session expiry.

Record exact sanitized inputs, module revision, observed output and remaining native checks in the existing project record. Do not run live sign-in requests as a shortcut for these checks.
