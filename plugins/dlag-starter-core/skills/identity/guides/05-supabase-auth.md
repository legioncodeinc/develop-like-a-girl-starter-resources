# Supabase Auth with React Router on Workers

Use the installed `@supabase/ssr` and `@supabase/supabase-js` APIs. The [request adapter](../examples/request-supabase.server.ts) creates a user-context client from the request cookies and public project bindings. Workers bindings enter through the application's server context. Do not place a user client, pending cookies or a user object at module scope.

The packaged adapter deliberately accepts only a clean hosted `https://<project>.supabase.co` origin and a modern `sb_publishable_` key. It rejects secret/service keys, legacy JWT keys, custom hosts, ports, credentials, query strings, fragments and extra path segments before creating the SDK client. A correctly shaped value still needs confirmation as the owner-approved project. A custom domain, legacy anonymous key or local Supabase setup needs a separately accepted adapter; the broader identity procedure is unchanged.

## Request lifecycle

1. Validate the configured Supabase URL, public key binding and trusted application origin without logging values.
2. Create the request-local cookie view. `getAll` reads that view; `setAll` updates it and appends every serialized cookie, including chunk removal and expiry.
3. Preserve the SDK's cache-header argument when supported by the pinned SSR version. Apply private/no-store at the final HTTP response boundary.
4. Verify identity with `getClaims()`. Obtain a fresh Auth user using `getUser()` when the accepted operation requires current user state. Treat missing data or SDK errors as refusal, never as an anonymous administrative client.
5. Validate the request and enforce current role, tenant and object ownership. Query via the authenticated user client so RLS remains active.
6. Finalize success, denial, validation error, redirect and thrown Response with pending cookie and cache changes before streaming.

[Supabase SSR guidance](https://supabase.com/docs/guides/auth/server-side/advanced-guide) documents request isolation, browser refresh and cache handling. The installed API contract controls the adapter signature.

## Route integration

React Router loaders and actions can run independently. Call the shared request authorization routine for every protected resource. Use one request-scoped context for a single HTTP dispatch; do not let parallel loaders create competing refresh clients. Integrate finalization around the actual framework handler, including its error paths. Resource routes that return their own Response must preserve the same headers. The [route examples](../examples/auth-routes.server.ts) show protocol handlers, not a complete framework mount. The cookie-only identity teaching endpoint uses a generic 403 refusal because it implements no HTTP authentication challenge. A real browser route may redirect to its accepted sign-in page; do not invent a Bearer challenge for a handler that does not accept Bearer credentials.

Multiple Set-Cookie headers are independent fields. Do not combine them with commas, convert them into a plain object that drops duplicates, or let a child route replace a parent's pending changes. A redirect that loses the PKCE verifier cookie breaks login; a redirect that loses refreshed auth cookies breaks the next request. Exercise nested-loader and error-boundary paths in the real framework.

## Database and non-database access

Use stable Supabase user UUIDs. A tenant ID from a URL selects a requested tenant, but membership and role come from current authorized data. RLS must cover SELECT, INSERT, UPDATE and DELETE with the necessary USING and WITH CHECK predicates. Data Foundation owns policy migrations and membership-table security. See [authorization](09-rbac.md).

R2 objects, custom APIs and external services do not inherit Postgres policies. First authorize their persisted metadata through user-context RLS, then use only the stored object key for the authorized row. Never accept an arbitrary R2 key or service-role query as a shortcut around a denied row.

## Sign-in methods and credentials

Password, OAuth and email-link flows use provider-issued proofs. Supabase Auth handles its verification and reset email flow through the approved SMTP integration. Do not mint replacement recovery tokens or use ordinary transactional email as authentication proof. Provider settings, email templates and redirect allowlists are a separate authorized configuration task.

The project URL and publishable key identify the public API. `service_role` and secret keys bypass RLS, belong only in separately scoped privileged operations and must never enter Vite/browser bundles, loader data, logs or this playbook's examples.

## Evidence to collect

Record missing/forged/expired cookies, successful refresh, simultaneous requests, callback failure, valid owner, other owner, removed tenant membership, invalid bindings and every response path. A mocked SDK result or a pure object comparison proves no Supabase authentication. Report the exact SDK/runtime versions and actual provider/RLS checks still pending.
