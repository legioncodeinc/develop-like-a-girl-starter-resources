# CSP strategy and actual strength

## Choose for the rendering model

React Router framework SSR can use a cryptographically random nonce generated for each HTML response. The response policy and the actual React Router script emitters must use the same nonce. Do not paste a static nonce, reuse one through a shared HTML cache, or generate the header independently from the rendered tags. The method is concrete, but a supplied public header alone cannot prove randomness, propagation or non-reuse.

Static/cached documents can use content hashes. Hashes must match exact script bytes; any edit or build transform changes the hash. Do not claim every external script is hash-authorized merely because a CSP hash is present: browser, script integrity and loading behavior matter. A trusted hashed/nonce bootstrap can load further scripts under strict-dynamic; validate the chosen implementation. A hash-based SSR page is not inherently a defect and a nonce is not always simpler for its caching constraints.

## Inspect actual directives

Record enforcement Content-Security-Policy separately from Content-Security-Policy-Report-Only. The latter reports without blocking. Split policies into directives, preserve all header instances and note that multiple enforcing policies constrain together. Look for script-src (or its applicable fallback), nonce/hash trust, strict-dynamic, object-src 'none', base-uri 'none', and explicit frame-ancestors. Mere presence is insufficient.

Inspect broad hosts, wildcards, unsafe-inline/unsafe-eval and the policy's browser fallback behavior. Do not reduce parsing to substring checks: frame-ancestors * differs from frame-ancestors 'none'. A nonce and strict-dynamic change how fallback source expressions behave in supporting browsers. Do not call any keyword alone proof of exploitable XSS.

## Follow script trust

strict-dynamic delegates loading trust from an authorized script to scripts it creates. That matters when a tag manager can change its container without an application deploy. It is not a guarantee that delegated scripts are safe. Compare the actual inventory, loader chain and policy. This relationship is reviewer inference from those observations, not proof of compromise.

## Bound implementation and verification

A policy skeleton is not a complete Workers/React Router integration. Check the application entry renderer, Scripts/ScrollRestoration usage, response headers, error responses, streaming behavior, cache behavior and browser console under an independently authorized implementation/test task. Start changes in reporting mode when appropriate to the project and promote only with observed legitimate flow coverage. Do not enable policies or run external evaluators during this read-only review.

The primary method references are [web.dev strict CSP](https://web.dev/articles/strict-csp) and [OWASP HTTP headers](https://cheatsheetseries.owasp.org/cheatsheets/HTTP_Headers_Cheat_Sheet.html). More granular bypass assessment remains pending unless actually performed.
