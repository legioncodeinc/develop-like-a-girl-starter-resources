# Data, serialization, secrets and caches

## D1. Whole database row returned to a browser

Read query selection, schema, loader/action return and component consumption. HTML, hydration payloads, streamed promises, resource JSON and responses used by client loaders all publish returned fields. Selecting only id/name/avatar can be safe when those fields are authorized for this viewer; selecting all columns then hiding some in JSX is not. Show both sensitive schema fields and the returned path. Raw password hashes/tokens are higher impact than an unnecessary own-account flag. Do not infer leaks from broad TypeScript types without tracing actual values.

## D2. Root/shared response data

A root/layout loader or global response initializer may feed public and protected children. Trace which viewers receive every field, including deferred/streamed results and error paths. Vulnerable: return fullActor to every route. Fixed: explicit public actor DTO plus separately authorized sensitive loaders. Hiding fields in one component does not remove serialized values. Revalidation or client cache invalidation cannot repair missing server authorization; a caller can skip refresh.

## D3. Server/client module boundary

Find server database/admin SDKs, signing keys or private configuration imported into browser modules, including transitive barrel imports. Use React Router's actual .server/module boundary convention and deployment bindings; do not add another framework's server-only package or private-env API as if equivalent. Type-only imports are ruled out. A missing boundary marker alone is hardening evidence, not proof that a secret shipped. A browser reference evaluating undefined is a bug; renaming the variable VITE_ to fix it would expose it. Review actual bundling only when an already authorized artifact exists.

## D4. Public environment prefixes

VITE_ values are public client inputs; review the actual Vite envPrefix override as well. An empty/broad exposure prefix or define replacement can leak more than the default. Cloudflare server bindings are server data and must never be returned/spread wholesale. Supabase publishable key/URL and Stripe publishable key are public by design, subject to their separate access policies. Service role/database/Resend/R2/Stripe secret values remain server-only. List approved names/locations, never private values. Do not inspect private .env files or rotate/configure credentials under read-only review.

## D5. Source maps and built output

Read actual production source-map settings and whether maps are privately uploaded, served, deleted or left in an existing public artifact. Served maps can reveal source; their existence alone does not prove a secret. A secret already present in a bundle is a separate finding even without maps. Do not install an error tracker or run a build to close the gap. A false public prefix name with no client use is a candidate, not confirmed served output.

## D6. Cross-request state

Track module-level lets/stores/caches set during a request and read by later requests. Workers isolate reuse means global currentUser/currentTenant or mutable session context is unsafe. Use request-local actor/context. A global cache of truly public immutable configuration is a false-positive case. Show both write/read and concurrency assumptions. Separate ordinary browser state from server state and avoid treating any old syntax as a vulnerability.

## D7. Personalized cache keys

Inventory in-memory caches, Workers Cache API use, fetch caching, application memoization and CDN cache rules. Personalized results must not enter a shared public cache. A key must represent authorization identity/tenant/permission constraints whenever such caching is deliberately supported; adding a user id alone does not prove revocation/invalidation correctness. Recheck permission before access and define how role/revocation changes invalidate entries. Prefer no-store for sensitive output. An opaque function id/build id or URL-only key does not supply identity. Version-specific use-cache APIs are outside Starter.

## D8. Static/prerendered output

Follow build/prerender data and route lists. Static files are served without running request-time authorization, so only public approved fields belong there. A later layout redirect cannot protect a file already public at its asset URL. Private drafts, records, unpublished internal content and user-specific reports must stay behind verified request-time routes. Public repository-authored marketing content is valid. Do not create a Payload dashboard or draft provider as a fix.

## D9. Shared response caching and service workers

Review Cache-Control at all app/platform layers and actual cache.put/service-worker rules. public/s-maxage and shared caches need careful evidence; adding Vary:Cookie/Authorization alone is not a complete authorization or cache-safety solution. Sensitive responses should use no-store and be excluded from service-worker runtime caches. Cache API code can ignore HTTP directives, so inspect the explicit code. A cache may outlive logout and serve a previous account's data on a shared device. Public static-asset allowlists are the safe ruled-out case; excluding only /api is insufficient when page/loader responses carry private data.

## D10. Header serialization

SSR fetch wrappers, hydration helpers and response-copy utilities must not serialize arbitrary upstream headers into HTML or JSON. Find allow-all predicates/spreads and specifically Cookie, Set-Cookie, Authorization and upstream signing headers. Fixed: whitelist only the required safe response fields/header names, after checking purpose. A content-range-only allowlist can be valid. Retain repeated headers correctly at transport boundaries while keeping credentials out of browser-readable data and logs.

## D11. Binary/serializer boundaries

Do not infer another runtime's serializer vulnerability from typed-array use. Instead trace the exact byte range returned, ownership, buffer slicing, actual serializer and client representation. A view over shared backing memory can disclose bytes outside the intended range if serialized incorrectly. Use minimal intended content/encoding, bound size and audit the actual serializer dependency if present. Prototype pollution, sparse-array amplification, untrusted revivers and evaluating serialized code require their own input/merge/eval paths. Do not introduce devalue or evaluate untrusted serialized code to reproduce an unsupported framework advisory.

## D12. Error messages and logs

Read error boundary/handler return shapes and upstream errors. Return a generic user message plus request-local identifier; keep details only in approved redacted server logs. Never echo raw stack/SQL/provider errors, session values, request bodies or URLs with credentials. An error id is useful only when real logging exists; an example does not prove monitoring. Untrusted error text must not enter raw HTML, attributes, script or hydration markup.
