# 11: Server/browser boundaries in framework SSR

Use installed project versions. Code fences are focused examples with project imports identified, not complete applications or executed receipts. Additional packages, tools, provider setup and configuration require the applicable user authorization. Starter uses React Router framework SSR, Cloudflare Workers and Supabase; optional library comparisons do not select a service.

Starter uses React Router framework SSR. It does not enable RSC, Next page/layout conventions, use-client directives, use-server remote functions, Next caching tags or Next-specific server-only imports. SSR renders React on the server and hydrates browser-capable components. That does not remove their dependencies from browser bundles by itself.

## Module ownership

Route loaders/actions execute on the server under framework mode. Components render on server and browser; keep browser initial render deterministic. Put private services in *.server.ts or the scaffold's supported .server directory. Do not import those services through a shared utility used by components. Framework route export pruning does not justify mixing secrets into arbitrary shared modules. Use approved Workers bindings for credentials and a request-scoped Supabase client for the chosen session model.

Keep window/document/localStorage out of module initialization and server rendering. A browser integration initializes after hydration with effect cleanup, or behind an appropriate client-only boundary. Neither a string directive nor a TypeScript type protects a secret.

## Data crossing the boundary

Everything returned by a loader/action may be visible to the caller. Explicitly select DTO fields and omit tokens, privileged keys, secret bindings, internal errors and unauthorized fields. Check the pinned framework's serialization support; normalize date/ID representations intentionally. Do not spread a raw database row into loader data.

## Mutation security baseline

Every route action is an HTTP entry point, including one called only from a visible form:

1. Authenticate the current request using the selected verified Supabase session/token model. Do not trust a submitted user ID.
2. Authorize the actor for the requested record/tenant/action. Include ownership in the database predicate or trusted policy. A read-before-write check must not become a race or permit cross-owner writes.
3. Validate bounded FormData/JSON/URL parameters. Treat IDs as untrusted. Enforce allowed fields, lengths and content types on the server, with a typed safe validation result.
4. Preserve same-origin/CSRF checks appropriate to cookie session transport and any deliberate cross-origin design. CORS alone does not authenticate or prevent CSRF.
5. Handle errors with safe public codes, correlated redacted internal evidence and explicit status. Avoid raw SQL/service exception strings.
6. Preserve idempotency and replay handling for duplicate submissions, payments and webhooks. A disabled button or optimistic update supplies no server guarantee.
7. Return only allowed fields and revalidate the actual route/cache owner.

Use the concrete action pattern in guide06. Its authentication/persistence functions are explicit application dependencies, not provided security implementations. Security Review owns acceptance of auth, ownership, CSRF and storage controls; Quality follows Security.

## Cache and lifetime

Never store request actors, Supabase credentials, user-specific loader results or mutable authenticated QueryClients in module globals. Cache keys include the correct identity/tenant scope; logout and tenant switch invalidate old values. Select Cache-Control intentionally for private responses and protect against shared CDN cache leakage. A Vite dev proxy supplies no production routing or authorization guarantee.

## Hydration and component boundaries

Initial UI must agree across server/browser: random IDs, locale/timezone formatting, browser preferences and current timestamps need deliberate ownership. Keep theme preference initial state consistent, then synchronize after hydration if needed. suppressHydrationWarning is not a correctness repair. Composition through children/slots and leaf interactions still improves ownership without RSC.

## Verification

Check the actual server/client build graphs for private dependencies, loader/action outputs for secret fields, SSR/hydration for mismatches, and two actors for access isolation. Include unauthenticated, wrong owner, invalid input, duplicate mutation, error redaction and user-switch cases. These need the target application's native tests; a source snippet cannot clear them.

See [React Router SSR](../../react-router-ssr/SKILL.md), [Security Review](../../security-review/SKILL.md) and [official references](../references/official-sources.md).
