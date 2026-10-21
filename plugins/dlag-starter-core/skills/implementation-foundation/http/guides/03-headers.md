# 03. Headers

Caching, content negotiation, and HTTP-layer security-adjacent headers.

---

Read [principles](00-principles.md) first. Inspect the final browser-facing response, the SSR/server response and any edge transformation separately. Source declarations prove intent only. Proposed public-target captures require separate authorization.

## Caching headers

### Cache-Control
The primary directive for controlling caching. Sent by both servers (response) and clients (request).

**Response directives (most important):**

| Directive | Meaning |
|---|---|
| `no-store` | Do not cache at all; fetch fresh every time |
| `no-cache` | Storage is permitted, but successful validation is required before each reuse; a conditional request is the usual mechanism |
| `private` | Only the end-user's browser may cache; no shared/CDN caching |
| `public` | Any cache (CDN, proxy) may cache |
| `max-age=N` | Cache is fresh for N seconds |
| `s-maxage=N` | Override `max-age` for shared caches (CDNs) only |
| `must-revalidate` | Once stale, reuse requires successful validation; a disconnected cache must return an error rather than reuse stale content (RFC 9111 §5.2.2.2) |
| `immutable` | The resource will never change during its freshness lifetime; skip revalidation |
| `stale-while-revalidate=N` | Serve stale for N seconds while fetching fresh in background |

**Common anti-patterns:**
- `Cache-Control: no-cache, no-store, must-revalidate` together: `no-store` already prevents caching; the others are redundant but harmless.
- Missing `Cache-Control` on API responses: browsers and CDNs apply heuristic caching, which may cache responses that should not be cached.
- `Cache-Control: max-age=0` without `must-revalidate`: the cache may serve stale content under some conditions.

### ETag
An opaque identifier for a specific version of a resource. Used for conditional requests (see [conditional and range requests](05-conditional-and-range.md)).

- **Strong ETag:** `ETag: "abc123"` -- byte-for-byte identical representation required for match.
- **Weak ETag:** `ETag: W/"abc123"` -- semantically equivalent (same content, maybe different encoding). Useful for weak If-None-Match comparison; If-Match uses strong comparison and If-Range entity tags must be strong. If-Match is a general precondition, not a range-only field.

**Edge note:** Representation transformations can affect validators. Compare supplied origin/edge captures for the same selected encoding and identity scope. Do not assert that Cloudflare universally strips ETags or that a source ETag proves edge behavior.

### Vary
Tells caches which request headers affect the response, so they can store multiple versions.

- `Vary: Accept-Encoding` -- store separate versions for gzip, br, identity.
- `Vary: Accept` -- store separate versions for JSON vs XML vs HTML representations.
- `Vary: Accept-Language` -- store separate versions per language.
- `Vary: Cookie` -- varies selection by Cookie; it does not force private storage or prevent shared cache reuse. Authenticated/personal responses need an explicit suitable Cache-Control policy and a reviewed cache key.

**Anti-pattern:** Omitting `Vary: Accept-Encoding` when the server compresses responses. The CDN may serve a gzip-encoded response to a client that sent `Accept-Encoding: identity`, causing a broken download.

### Last-Modified
A timestamp for the last modification of the resource. Less precise than ETag (1-second resolution). Used with `If-Modified-Since` / `If-Unmodified-Since`.

---

## Content negotiation headers

### Accept (client -> server)
The client declares acceptable media types in preference order:
```
Accept: application/json, text/html;q=0.9, */*;q=0.1
```
Account for media ranges, q-values and q=0 exclusions. If no acceptable representation exists, 406 is available; a documented server may disregard preferences and send its default. Do not accept a substring check as full Accept parsing (RFC 9110 §12.5.1).

### Accept-Encoding (client -> server)
Compression algorithms the client accepts:
```
Accept-Encoding: br, gzip, deflate, identity
```
- Select only supported encodings based on actual negotiation and measured content/size. Do not hardcode a universal Brotli improvement percentage or add a new compression dependency.
- Server MUST respond with `Content-Encoding` matching what it used.
- Server SHOULD add `Vary: Accept-Encoding` to the response.

### Accept-Language (client -> server)
Language preferences:
```
Accept-Language: en-US, en;q=0.9, fr;q=0.5
```
Used for server-side i18n. Server SHOULD add `Vary: Accept-Language` if the response varies by language.

### Content-Type (server -> client)
The media type of the response body. Must be accurate.
- `application/json` -- JSON
- `application/problem+json` -- RFC 9457 problem details
- `application/merge-patch+json` -- JSON Merge Patch body (RFC 7396)
- `application/json-patch+json` -- JSON Patch body (RFC 6902)
- `multipart/form-data` -- file uploads

**Anti-pattern:** Responding with `Content-Type: application/json` when the body is HTML, plain text, or an error string. Clients will fail to parse.

### Content-Encoding (server -> client)
The compression applied to the response body:
- `Content-Encoding: br` -- Brotli
- `Content-Encoding: gzip` -- Gzip
Not to be confused with `Transfer-Encoding`, which applies to the transfer layer.

---

## Security-adjacent headers (HTTP-layer scope)

These headers are HTTP-layer concerns for `Implementation Foundation`. The enforcement and prioritization of OWASP-level violations is `Security Review`'s domain.

### Strict-Transport-Security (HSTS)
Forces HTTPS for future requests:
```
Strict-Transport-Security: max-age=31536000; includeSubDomains; preload
```
- Only meaningful over HTTPS (ignored over HTTP).
- The preload token alone is not enrollment. includeSubDomains/preload require domain-owner review of every affected host; this method does not authorize settings changes or submission.

### X-Content-Type-Options
Prevents MIME sniffing:
```
X-Content-Type-Options: nosniff
```
Review browser-facing MIME behavior with Security Review, especially uploaded untrusted content. A header alone does not make attacker-controlled HTML safe.

### Referrer-Policy
Controls how much referrer information is sent with requests:
```
Referrer-Policy: strict-origin-when-cross-origin
```
A reasonable default for 2026.

### Permissions-Policy
Restricts browser feature access (camera, geolocation, etc.):
```
Permissions-Policy: camera=(), microphone=(), geolocation=()
```
Scope: only relevant for browser-facing responses.

---

## Starter response boundaries

React Router framework SSR can return personal HTML, loaders and action errors. Never place a response containing a principal's data, Set-Cookie or authorization result in an unpartitioned shared cache. Decide private/no-store policy with Identity and Security Review. Preserve all separate Set-Cookie fields when adapting a Response; joining them with commas corrupts cookie semantics. Append Vary tokens without erasing existing Accept, Accept-Encoding or language variation. Vary is selection metadata, not authorization.

Workers may receive/return a streamed body. Do not read an R2 download wholly merely to compute Content-Length, ETag or audit a header. Verify representation sizes and encodings rather than retaining a stale Content-Length after transformation. Restrict Content-Disposition filenames, remove CR/LF and path separators, use attachment for untrusted downloads when required, and encode international filenames with filename* according to RFC 6266 and RFC 8187. Review authorization and object access before emitting metadata or a redirect to storage.

Cite RFC 9111 §3/§4/§5.2 for cache storage, reuse and directives; RFC 9110 §8 for representation metadata, §12.5 for negotiation, §8.8 for validators and §12.5.5 for Vary. Record Content-Type/Accept mismatch as 415/406 only according to the actual direction and contract.
