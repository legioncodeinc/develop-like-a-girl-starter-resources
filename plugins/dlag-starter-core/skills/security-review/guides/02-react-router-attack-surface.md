# 02. React Router SSR and browser attack surface

> Role boundary: review supplied local evidence with Read/Grep/Glob/Skill and return findings in chat. Execution, remediation, configuration, external requests and saves require a separate authorized caller. Examples below do not grant those tools or permissions.

## Pin the actual server request paths

Inspect the installed React Router/Vite versions and framework mode, route configuration, Workers entry point, loader/action/resource-route files and shared server helpers. A React component or layout that hides UI does not authorize its loader, action or resource URL. A parent loader must not be treated as a universal serial middleware barrier. Trace direct requests, fetcher submissions, initial SSR, client navigation and data revalidation separately. Every private read and mutation needs verified identity and object permission before sensitive work, whether enforced in an actually configured middleware chain or a shared guard called at that request boundary. Do not prescribe a version-specific middleware flag without checking its installed documentation and actual mount order.

## CSRF and state changes

Inventory every cookie-authenticated mutation, including login/logout, email change, file finalization, payment creation, and integration callbacks. Verify the actual framework/runtime version and request handling rather than assuming a generic framework default supplies origin protection. A `SameSite` cookie is useful defense, not proof every mutation path is safe. Review Origin/Referer or an appropriate anti-CSRF token for the accepted design, content types, CORS policy and trusted-origin allowlist. Do not use wildcard origins to repair a broken form. Browser CORS controls are not server-side authentication. Webhook requests follow their own raw-body signature contract, not a browser origin exemption that accepts anything.

For a same-origin-only custom mutation, [the snippets](../references/secure-by-default-snippets.md) show an explicit Origin check that denies missing/mismatched origins. That is one chosen policy, not a universal recommendation for legitimate cross-origin clients. Record the reason and separate mechanism for each necessary exception. Do not use GET for state-changing logout or account operations. Confirm actual production requests; a development form working is not protection evidence.

## Server module and public environment boundaries

Keep credential-consuming helpers in actual React Router `.server.ts` modules or supported `.server/` directories under the application root, and verify the installed framework's production build rejects client reachability. Inspect transitive imports and barrel files: a component importing a harmless utility from a secret-bearing module can pull the wrong boundary into scope. A test runner, a Vite dev page or a typecheck alone does not prove the production boundary.

Vite exposes `VITE_` variables to client code by design. Review custom `envPrefix`, `define`, serialized `window.ENV` objects, public config endpoints, generated assets and source maps as well. A Supabase publishable key is a public identifier with an intentional API role; a Supabase secret/service-role key, Stripe secret/webhook key or Resend key must never be exposed. Judge the credential's authority rather than matching the word KEY alone. Workers secret bindings stay server-side only if code does not return, log or bundle their values.

## Loader, action, redirect and error output

Server execution does not make returned data private. Inspect every returned property, nested relation, exception field, redirect target, download name and cache header. Return explicit DTO fields rather than entire user/session/database/provider objects. Do not put secret values into request URLs, query parameters, redirects or loader output. Check that SSR serialization, document HTML and data responses cannot expose those values through another path. On a denied request, verify no query, file read, mutation or external send happened first. A redirect after a sensitive query does not undo that query.

Allowlist redirect destinations or require a same-origin relative path after URL parsing; reject scheme-relative URLs and other schemes. Show a generic client error and keep only approved diagnostic fields server-side. An exception message containing a token cannot safely be logged merely because the response hides it.

## Raw HTML, SSR and imported content

React escapes ordinary text. `dangerouslySetInnerHTML`, DOM `innerHTML`, unsanitized HTML/Markdown rendering, unsafe URL schemes and custom inline script serialization create separate sinks. Trace each sink to its actual source and sanitizer policy at the render boundary. A repository-managed page can still contain untrusted imported HTML. A browser-only sanitizer is not automatically usable in Workers SSR; inspect the selected implementation's runtime support and configuration. Do not add an unselected sanitizer package to make the review look complete. Document a missing sanitizer/renderer test as unproven and prefer plain text where no raw HTML is needed.

Script execution requires a script-capable browser with JavaScript enabled. SSR can place injected markup in the initial response before hydration; it does not cause scripts to execute for a client with JavaScript disabled. HTML/URL/content injection can still have other consequences. Avoid overstating the demonstrated impact.

## Cookies, sessions and revocation

Inspect the selected Supabase SSR client's cookie flow and trust contract. Never authorize from the unverified user object returned by storage-backed `getSession`. Validate claims through a supported verifier, or obtain the fresh server-confirmed user as the design requires. Signature validation, expiry, issuer/audience, algorithm and project/environment association are separate from membership/role permission and immediate revocation. A valid unexpired JWT does not necessarily represent a still-authorized member.

Custom server-only session cookies should use Secure, HttpOnly, an explicit appropriate SameSite, narrow Path/Domain, expiry and a rotation/invalidation design. A `__Host-` name requires Secure, Path=/ and no Domain. Supabase browser/SSR token sharing may require client-readable cookies; do not blindly apply HttpOnly in a way that breaks that selected SDK flow or claim client-readable tokens are protected by it. Record the actual storage design, XSS defenses, refresh-token handling and logout/revocation limits. Never invent an encrypted session store from a signed-cookie example. Do not accept an arbitrary URL/body session identifier for login; rotate or replace the application session after authentication/privilege change as its real provider contract requires.

## CSP and production artifact proof

Generate the CSP nonce per response where the selected React Router SSR renderer needs inline scripts; pass the same nonce to the real server renderer and its script-producing components using the installed API. A reusable nonce in a static prerendered file is not a per-response nonce. Inspect actual script/style requirements, including UI/animation libraries, and use hashes for appropriate fixed inline content. Do not blanket-enable unsafe-inline/unsafe-eval to eliminate browser errors. See [headers](07-headers-and-transport.md) for rollout, failure observation and header evidence. Production build output and browser evidence must be collected separately by an authorized caller; this Specialist inspects the supplied evidence only.

Sources: [React Router, Vite, React, Supabase and OWASP reference links](../references/official-sources.md). Record the installed version beside every API/default claim.
