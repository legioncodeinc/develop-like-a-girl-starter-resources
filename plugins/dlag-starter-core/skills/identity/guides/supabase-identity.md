# Keep identity attached to the request

Read [the principles](00-principles.md), then the full [Supabase implementation guide](05-supabase-auth.md). The existing request-scoped adapter is the integration starting point, with [protocol handlers](../examples/auth-routes.server.ts) for Google initiation, callback and current-session logout.

Inspect the exact framework/SDK versions, named routes and accepted policy. The packaged adapter requires a modern publishable key and clean hosted Supabase project origin; a misbound secret/service key is refused before SDK creation. Custom domains, legacy anonymous JWTs and local instances need a separately accepted adapter. Supabase browser+SSR cookie behavior differs from a server-only opaque session. Preserve all refreshed/deleted cookies and SDK cache headers across nested routing, redirects, refusals and thrown responses before streaming. Use matching server/browser cookie settings and private/no-store for authenticated responses. Never put user state at module scope.

Verify claims or obtain a current Auth user as the operation requires. Never authorize from `getSession()` alone, client state, decoded unsigned tokens or a body user ID. Check current tenant permissions and object ownership in each loader/action/resource route, then use user-context RLS and explicit authorization for R2 or other non-database resources.

Use exact configured origins, accepted internal return paths and CSRF protection on mutations. Supabase owns PKCE, credential verification and reset/verification messages through the accepted email configuration. A callback error must not become a successful dashboard redirect. Recovery events do not grant tenant authority.

Follow the relevant local guide for [Google](06-google-oauth.md), [authorization](09-rbac.md), [MFA](08-mfa-and-passkeys.md), [sessions](10-session-storage.md) or [recovery](12-account-recovery.md). Preserve applicable error and negative paths when adapting examples. Check the [failure catalogue](11-common-failure-modes.md) and complete [the worksheet](../templates/identity-plan.md).

The first meaningful tests include missing/forged/expired cookies, valid owner, other user, removed member, refresh, unsafe redirects, CSRF refusal, invalid bindings and cookie preservation on every response. Native SDK, Workers, React Router, browser, RLS and provider evidence remain separate from pure helper checks. Do not use a simulated authentication success as proof of those behaviors.
