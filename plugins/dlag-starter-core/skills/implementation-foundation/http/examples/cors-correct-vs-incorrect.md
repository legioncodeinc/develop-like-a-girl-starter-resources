# Worked example: browser CORS at a Workers boundary

## Scenario and limits

A React application at https://app.example.invalid calls an existing Workers API across origins with credentials include. The exact deployment origins must come from the accepted application contract. These are reserved illustrative hosts, not live endpoints or a new configuration. The policy below uses Fetch Request/Response at the existing Workers boundary.

This example handles preflight policy and actual response decoration only. It does not implement identity validation, Supabase access/RLS, role/object permission, CSRF or a mutation. Those real controls remain prerequisites in the actual route. It is a teaching fragment, uncompiled and unmounted.

## Incorrect response

```http
HTTP/1.1 200 OK
Access-Control-Allow-Origin: *
Access-Control-Allow-Credentials: true
Content-Type: application/json

{"items":[]}
```

For credentials include, the browser refuses to share this response. The presence of 200 or a body on OPTIONS would not alone be the error. Returning unchecked Origin with credentials would instead risk exposing private responses. Neither case is fixed by disabling actual authentication.

## Route-specific policy fragment

```ts
const allowedOrigins = new Set(["https://app.example.invalid"]);
const allowedMethods = new Set(["GET", "HEAD", "PATCH"]);
const allowedHeaders = new Set(["content-type", "if-match"]);

function mergeVary(headers: Headers, additions: string[]): void {
  const existing = (headers.get("Vary") ?? "")
    .split(",").map(value => value.trim()).filter(Boolean);
  if (existing.includes("*")) return;
  const lower = new Set(existing.map(value => value.toLowerCase()));
  for (const value of additions) {
    if (!lower.has(value.toLowerCase())) {
      existing.push(value);
      lower.add(value.toLowerCase());
    }
  }
  headers.set("Vary", existing.join(", "));
}

function policyHeaders(origin: string | null): Headers {
  const headers = new Headers({ "Cache-Control": "no-store" });
  mergeVary(headers, ["Origin"]);
  if (origin !== null && allowedOrigins.has(origin)) {
    headers.set("Access-Control-Allow-Origin", origin);
    headers.set("Access-Control-Allow-Credentials", "true");
    headers.set("Access-Control-Expose-Headers", "ETag, X-Request-Id");
  }
  return headers;
}

function preflight(request: Request): Response | null {
  const requestedMethod = request.headers.get("Access-Control-Request-Method");
  if (request.method !== "OPTIONS" || requestedMethod === null) return null;
  const origin = request.headers.get("Origin");
  const headers = policyHeaders(origin);
  mergeVary(headers, [
    "Access-Control-Request-Method", "Access-Control-Request-Headers"
  ]);
  const raw = request.headers.get("Access-Control-Request-Headers") ?? "";
  if (raw.length > 2048) return new Response(null, { status: 400, headers });
  const requestedHeaders = raw === "" ? [] : raw.split(",")
    .map(value => value.trim().toLowerCase());
  if (origin === null || !allowedOrigins.has(origin) ||
      !allowedMethods.has(requestedMethod) || requestedHeaders.length > 16 ||
      requestedHeaders.some(value => !allowedHeaders.has(value))) {
    return new Response(null, { status: 403, headers });
  }
  headers.set("Access-Control-Allow-Methods", "GET, HEAD, PATCH");
  headers.set("Access-Control-Allow-Headers", "Content-Type, If-Match");
  headers.set("Access-Control-Max-Age", "600");
  return new Response(null, { status: 204, headers });
}
```

In a real route, invoke this only after matching the intended API route. If it returns null, dispatch through the existing actual authentication, object permission, CSRF, validation and storage handling. This policy does not authorize a request. All actual response branches for accepted origins need matching CORS decoration. When merging policy into an existing response, preserve body/stream, status, cache contract, existing Vary and each Set-Cookie field; do not flatten multi-value cookies or copy an upstream credential/header set blindly. This fragment chooses no-store for its private API scenario; do not replace a reviewed public cache policy indiscriminately.

## Required outcome comparison

| Case | Expected behavior | Reason |
|---|---|---|
| Allowed origin PATCH/content-type/if-match preflight | 204, exact ACAO, ACAC true, allowed names and Vary | Browser can attempt actual request |
| Allowed origin actual request, invalid identity | Existing 401/403 contract and appropriate CORS headers | CORS acceptance is not identity acceptance |
| Allowed origin, another owner's object | Existing consistent denial; no private object representation | Object authorization remains mandatory |
| Disallowed or null origin | No permissive ACAO; preflight refused | No arbitrary reflection |
| Missing Origin | Separate actual route/server-client policy | No-Origin does not prove trusted caller |
| Header authorization added by client | Refused until the actual accepted header contract includes it | Cookie mode does not automatically require Authorization |
| Custom response ETag | Exposed explicitly for browser concurrency handling | Non-safelisted response header |
| Same-origin form mutation | CSRF controls still applied | Browser response sharing is a different mechanism |
| Invalid origin variation cached | no-store plus relevant Vary; actual personal responses reviewed too | No cross-principal shared cache claim |

No browser/native/network/provider check was run. A separately authorized capable caller would verify preflight, actual success, actual denial and cookie/CSRF behavior in the browser; a curl header capture alone does not prove browser enforcement. Authority: [Fetch CORS protocol and credentials table](https://fetch.spec.whatwg.org/#http-cors-protocol); [Vary](https://www.rfc-editor.org/rfc/rfc9110.html#section-12.5.5).
