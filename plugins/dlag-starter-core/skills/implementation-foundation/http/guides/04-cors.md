# 04. CORS request and response review

Read [principles](00-principles.md). CORS governs browser response sharing and some cross-origin request permission checks. It does not authenticate a user, authorize a mutation, prove object ownership, or prevent a simple request/HTML form from reaching a server. SSR/server-to-server fetches do not gain security from browser CORS. Maintain CSRF defenses separately for cookie-authenticated mutations.

## Establish whether CORS applies

Record caller origin, target origin (scheme/host/port), browser/server caller, route, method, manually set headers, credentials mode and response headers. Same-origin calls do not need CORS opt-in. A failed DNS/TLS request, redirect, application 401 or network timeout can look like a CORS failure to JavaScript. Use supplied redacted evidence; do not infer success from curl alone.

## Safelisted and preflighted requests

GET, HEAD and POST with only safelisted headers/content types can often be sent without a preflight. The complete [Fetch safelist](https://fetch.spec.whatwg.org/#cors-safelisted-request-header) also has value/length constraints and a restricted Range header case; the familiar short list is not a parser implementation. Common safelisted Content-Type essences are application/x-www-form-urlencoded, multipart/form-data and text/plain. JSON Content-Type, Authorization, a custom header, or DELETE/PUT/PATCH normally triggers preflight. Script cannot manually forge arbitrary Origin values as it can in a non-browser client.

The browser sends OPTIONS with Origin, Access-Control-Request-Method and, when needed, Access-Control-Request-Headers. Successful preflight permits the actual request; actual responses still need appropriate CORS headers, including denial/error responses for accepted origins. Preflight is normally sent without the application's credentials. Route-specific policy validation comes before a token-required actual handler. Do not exempt all actual methods from auth because OPTIONS was accepted.

```http
OPTIONS /api/items HTTP/1.1
Origin: https://app.example.invalid
Access-Control-Request-Method: PATCH
Access-Control-Request-Headers: content-type, if-match

HTTP/1.1 204 No Content
Access-Control-Allow-Origin: https://app.example.invalid
Access-Control-Allow-Credentials: true
Access-Control-Allow-Methods: GET, HEAD, PATCH, OPTIONS
Access-Control-Allow-Headers: Content-Type, If-Match
Access-Control-Max-Age: 600
Vary: Origin, Access-Control-Request-Method, Access-Control-Request-Headers
Cache-Control: no-store
```

This is illustrative policy, not a selected deployment origin. Both 200 and 204 are valid successful preflight statuses. A 204 has no body. Max-Age is a policy/performance tradeoff; browser caps and caches differ and change. Its absence is not automatically a security failure or proof of one preflight per request. This example chooses 600 seconds rather than claiming a universal 24-hour requirement.

## Credentialed wildcards

For credentials mode include, Access-Control-Allow-Origin must be the exact serialized allowed origin and Access-Control-Allow-Credentials must be lowercase true. A wildcard ACAO fails the browser's sharing check; ACAC on an omit-mode request does not turn it into a credentialed one. Access-Control-Allow-Methods, Access-Control-Allow-Headers and Access-Control-Expose-Headers wildcards have no wildcard meaning for credentialed requests. Authorization must be explicitly listed even where another wildcard would otherwise apply.

Treat wildcard-plus-credentials as a mandatory correction and security handoff. Report the actual effect: conforming browser denial alone is not demonstrated data exfiltration. Arbitrary Origin reflection with credentials may instead allow hostile origins to read sensitive responses. Reject opaque null origins by default unless there is a narrowly accepted reason. Do not accept suffix checks such as endsWith("example.invalid") or attacker-controlled subdomains as an exact-origin allowlist. No Origin is a separate server/same-origin policy case, not evidence of a trusted identity.

## Vary and response consistency

When policy depends on Origin, merge Vary: Origin into existing tokens, including on disallowed-origin responses when relevant to caching. If a shared preflight cache can vary by requested method/header set, include those dimensions too or prevent shared storage. CORS does not partition a private representation safely on its own. Keep personal responses no-store or suitably private under a separately reviewed cache contract. Add CORS to safe actual error responses for allowed origins so the browser can distinguish auth/validation failures from sharing failures. Avoid emitting a different origin or multiple ACAO values.

## Exposed response headers

Fetch's CORS-safelisted response names include Cache-Control, Content-Language, Content-Length, Content-Type, Expires, Last-Modified and Pragma. List ETag, Location, X-Request-Id or other required non-safelisted names explicitly in Access-Control-Expose-Headers. Set-Cookie cannot be exposed to frontend JavaScript by adding it here. A frontend failing to read ETag can break optimistic concurrency even when the network request succeeded.

## Review checklist

- [ ] Identify exact origins and credential mode from the caller, not from the server header alone.
- [ ] Distinguish same-origin, browser cross-origin and server-side requests.
- [ ] Review exact origin matching, null origins, allowed method and lowercased header-name membership.
- [ ] Validate OPTIONS before actual authentication without skipping actual identity/object/CSRF checks.
- [ ] Check accepted-origin success/error/redirect responses as well as preflight.
- [ ] Merge Vary correctly and document any shared cache key/policy.
- [ ] Expose needed validator/request identifiers without exposing private header values.
- [ ] Record absent/invalid Max-Age as a measured performance/policy issue, not a default vulnerability.
- [ ] Compare proposed source logic, supplied captures and actual browser proof separately.

Use [the decision tree](../templates/cors-decision-tree.md) and [the Workers example](../examples/cors-correct-vs-incorrect.md). Primary authority: [Fetch §3.3 and credentials table](https://fetch.spec.whatwg.org/#http-cors-protocol), plus its preflight-fetch and CORS-check algorithms.
