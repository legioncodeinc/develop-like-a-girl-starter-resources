# Identity implementation principles

Read the project manifest, lockfile, placeholder binding names and named auth routes first. Record React Router, Workers, `@supabase/ssr` and `@supabase/supabase-js` versions, public callback origins, sign-in methods, tenant model and current recovery policy. Never inspect actual passwords, reset links, cookies or secret values. Classify the task as implementation, Google sign-in, authorization, MFA, recovery, migration assessment or review handoff.

## Identity and authorization

1. Authenticate with the installed Supabase SDK. `getClaims()` verifies the token; `getUser()` obtains the current user from Auth when that freshness is required. `getSession()` alone, a decoded JWT, a client role flag or a supplied user ID is not authentication evidence.
2. Protect every sensitive loader, action and resource route. A protected parent page does not automatically protect separately invoked child loaders or direct API endpoints. Derive the subject from verified identity and check current tenant membership and object ownership at the operation.
3. Use the user-context Supabase client for RLS queries. Database policies must reject another user's or tenant's data even if the route check is missed. A public API key does not replace policies. Service-role and secret keys bypass RLS and do not belong in ordinary user request paths.
4. A role grants named operations, not an unlimited tenant bypass. Deny missing roles, unknown actions, removed memberships and ambiguous ownership. Permission changes require a defined maximum delay across JWTs, caches and active requests.

## Sessions and browser boundaries

Create one server client per HTTP request. Preserve its complete cookie changes and cache headers on success, failure, redirects and thrown responses before streaming begins. Never cache private user responses or responses carrying auth cookies in a shared CDN cache. Never return access or refresh tokens in loader data or logs.

Use HTTPS, explicit SameSite and Path rules. Supabase browser plus SSR clients use browser-readable auth cookies for refresh; forcing HttpOnly onto that topology breaks it. Server-only opaque session designs should use HttpOnly, but require their own accepted storage and revocation design. Do not introduce an opaque-session store merely to change Supabase's documented behavior. See [session storage](10-session-storage.md).

Cookie-authenticated mutations need CSRF protection and server authorization. Use the configured application origin rather than an untrusted Host or forwarded header. OAuth has its own SDK-managed state and PKCE callback flow; an OAuth callback is not an exemption for unrelated mutating GET routes.

## Scope, factors and recovery

Request only OAuth scopes needed by accepted features. Record each scope, where it is used and which data is retained. Ask for new access when the feature exists, not speculatively to avoid a future review.

Prefer phishing-resistant factors where the installed provider and project policy support them. Supabase's current passkey and recovery-code features are experimental; record the compatibility and explicit opt-in decision before using them. TOTP enrollment is incomplete until a challenge succeeds. SMS is not this kit's default factor. Recovery must use pre-established evidence and the accepted assurance policy. Password reset, an email event or support familiarity cannot silently remove MFA or restore tenant privileges.

Treat refresh tokens as secrets. Supabase owns refresh rotation and documented reuse exceptions; do not implement a second rotation mechanism. Record logout scope and the residual validity of already issued JWTs. Sensitive actions that require immediate session revocation need a reviewed server/data-layer control.

## Severity and ownership

| Level | Examples | Required response |
|---|---|---|
| Must fix | Forged identity accepted, cross-tenant access, credential disclosure, unsafe callback, missing CSRF, session-cookie cache leak | Correct before release |
| Should improve | Unmeasured revocation latency, incomplete operational ownership, unclear recovery instructions | Record a concrete follow-up; raise severity if the accepted policy is violated |
| Style | Naming and prose with no behavior effect | Optional improvement |

Every finding needs a project location, concrete trigger and supporting local guide or official reference. Do not mark a provider behavior as passing because a library claims to handle it.

Identity owns protocol construction. Data Foundation owns schema and RLS migrations. React Foundation owns form presentation and interaction. Security Review independently checks abuse and isolation; Quality Review then checks accepted behavior. Store the decision and evidence with the project's existing notebook or feature record. Keep credentials and personal data out of that record.
