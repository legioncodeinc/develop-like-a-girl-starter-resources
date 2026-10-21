# CORS decision tree and policy worksheet

Use [the full CORS guide](../guides/04-cors.md) and [Workers policy example](../examples/cors-correct-vs-incorrect.md).

## 1. Is this browser cross-origin sharing?

- Browser and same origin: diagnose route/network/auth rather than adding unnecessary CORS.
- Server-side SSR/provider request or non-browser client: CORS headers do not grant or enforce that caller's access.
- Browser across scheme/host/port: collect the exact serialized origin, method, headers and credentials mode.
- Missing network response: distinguish DNS/TLS/redirect/timeout from a server CORS response before changing policy.

## 2. Is there a preflight?

Check the Fetch safelist including value restrictions. Common simple GET/HEAD/POST and restricted form content can be sent directly. JSON, Authorization, custom headers and PATCH/PUT/DELETE usually preflight. Simple requests can reach a mutation endpoint even if their responses are unreadable; keep CSRF protections.

For OPTIONS, validate Origin, requested method and lowercased requested header names against the exact route policy. A 200 or 204 may succeed; a 204 has no body. Unknown/disallowed requests do not receive permissive headers. Preflight does not require application credentials; actual requests still do.

## 3. Does the response match credential mode?

| Mode/policy | Required review |
|---|---|
| Public noncredentialed | ACAO * may be valid; omit ACAC unless there is an actual need |
| Credentials include | Exact allowed serialized ACAO, lowercase ACAC true; no wildcard semantics for allowed/exposed headers or methods |
| Unknown or null origin | Deny by default or document a narrow accepted reason; never treat absence as authentication |
| Dynamic allowlist | Exact match; never arbitrary reflection, suffix guessing or unchecked regex |

ACAO * with credentials include fails browser sharing. Correct it and hand off to Security Review, but do not claim this browser rejection proves private data was read. An arbitrary reflected allowed origin with credentials is a different, potentially exploitable failure.

## 4. Are the right headers available?

- List only actual route methods and requested allowed headers.
- Authorization must be explicitly allowed when used; it is not required for cookie-only requests.
- Expose needed ETag/Location/request identifiers explicitly; Set-Cookie remains inaccessible to script.
- Merge Vary: Origin without discarding existing Accept/encoding/language variation.
- Review requested-method/header cache variation for shared preflight caches or prevent their storage.
- Choose Max-Age according to change/revocation/performance policy; no universal 86400 requirement.
- Apply appropriate headers to accepted-origin actual errors as well as successful responses.

## Policy design record

| Field | Value/evidence |
|---|---|
| Route and accepted existing contract | |
| Browser origin(s), exact scheme/host/port | |
| Credentials mode and identity/CSRF owner | |
| Allowed actual methods | |
| Allowed request headers | |
| Exposed response headers | |
| Max-Age and revocation rationale | |
| Vary and shared/private cache policy | |
| No-Origin and null-Origin behavior | |
| Success, preflight denial, actual auth/error response | |
| Redirect and SSR/provider boundary | |
| Source/capture/browser evidence and unrun gaps | |

No tool execution, public target probe, auth bypass, live origin configuration or credential use is authorized by completing this worksheet.
