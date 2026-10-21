# 02. Status code honesty

Read [principles](00-principles.md). Use the accepted endpoint contract, the HTTP operation and its actual outcome together. The [matrix](../templates/status-code-matrix.md) supplies a worksheet, not a universal rewrite policy.

## Success outcomes

| Code | Review contract | Citation |
|---|---|---|
| 200 | Successful processing and a meaningful result; can describe POST/DELETE processing or aggregate RPC outcomes. Do not disguise an HTTP failure as success. | RFC 9110 §15.3.1 |
| 201 | One or more resources created. Primary resource is identified by Location or, absent it, the target URI. A POST create SHOULD supply Location and explanatory representation; PUT creating a target MUST use 201. | §15.3.2; §9.3.3; §9.3.4 |
| 202 | Accepted but incomplete. Describe present status and a monitor where available. Do not return 202 when work was never durably accepted. Starter selects no job provider and this guide creates none. | §15.3.3 |
| 204 | Completed successfully with no content. Construct a null body; do not JSON-encode null or attach a success object. | §15.3.5 |
| 206 | Satisfied byte-range response; a single range includes Content-Range; multipart responses put ranges in their parts. | §15.3.7; §14 |

An existing 200 with documented per-item application results is not automatically wrong. A missing route returned as ordinary successful data may mislead its callers, caches and monitoring. Record the actual consequence rather than declaring all error-shaped fields exploitable. Problem Details is optional unless accepted by the contract.

## Redirects

| Code | Meaning | Method rule and reference |
|---|---|---|
| 301 | Permanent move | POST may become GET; §15.4.2 |
| 302 | Temporary alternative | POST may become GET; §15.4.3 |
| 303 | See another resource | Retrieve through GET or HEAD; useful after form POST; §15.4.4 |
| 307 | Temporary redirect | Preserve method; §15.4.8 |
| 308 | Permanent redirect | Preserve method; §15.4.9 |

Control redirect caching through actual freshness/authorization rules. Permanent does not mean cache forever; temporary does not mean uncacheable in all contexts. Restrict application redirect destinations to accepted same-origin paths or explicit provider destinations; never reflect an arbitrary return URL. Server-side credentialed fetch recipes require their own redirect policy: Workers uses manual handling with explicit 3xx refusal when automatic following would cross the intended boundary. A browser SSR/form redirect and a backend provider redirect have different callers and threat models.

## Client failures

| Code | Appropriate meaning and required metadata | Citation |
|---|---|---|
| 400 | Cannot process because of a perceived client error. Malformed JSON commonly fits; a documented validation contract may also use 400. | §15.5.1 |
| 401 | Authentication credentials are absent or invalid; include a valid WWW-Authenticate challenge appropriate to the actual authentication scheme. Do not invent Bearer when the route does not use it. | §15.5.2; §11.6.1 |
| 403 | Request understood but refused. Can apply even when the server does not know the principal. Do not conflate it with token validation or ownership proof. | §15.5.4 |
| 404 | No current representation found, or conceal existence according to the access policy. Apply concealment consistently across status/body/timing where required. | §15.5.5 |
| 405 | Known method unsupported for this resource; include Allow with the actual methods. | §15.5.6 |
| 406 | No acceptable representation under server-driven negotiation and the server will not send a default. | §15.5.7 |
| 409 | Conflict with current resource state that the caller may resolve. | §15.5.10 |
| 410 | Known permanent absence. Unknown permanence remains 404. | §15.5.11 |
| 412 | A supplied precondition evaluated false. Do not collapse stale If-Match into a generic 409. | §15.5.13 |
| 413 | Content larger than the server accepts; enforce limits before whole-body allocation. | §15.5.14 |
| 415 | Unsupported content type/encoding. Distinguish request Content-Type from response Accept negotiation. | §15.5.16 |
| 416 | A valid requested range cannot be satisfied; review malformed/unsupported range handling separately. Include available complete length in Content-Range as applicable. | §15.5.17; §14 |
| 422 | Content type understood and syntax correct but contained instructions cannot be processed. Name is Unprocessable Content. It is not mandatory for every validation error. | §15.5.21 |
| 429 | Rate limit rejection. Retry-After is useful when truthful, not an unconditional MUST. Do not invent a rate-limit provider or guaranteed window. | RFC 6585 §4 |

## Server failures

500 is an unexpected server failure (§15.6.1). 502 describes an invalid upstream response while acting as gateway (§15.6.3); 503 temporary service inability (§15.6.4); 504 upstream timeout in gateway role (§15.6.5). A local exception is not automatically 502. Retry-After for 503 must reflect an actual estimate. Do not expose SQL text, tokens, raw exception messages, internal URLs, headers, object keys or provider bodies. Distinguish transient safe retries from duplicate side effects.

## Problem Details representation

RFC 9457 defines application/problem+json. When chosen, the HTTP status and body status agree; type identifies a stable problem class, title is stable, detail is safe and actionable, and instance is an opaque safe reference rather than an unfiltered request URL. Public examples should not include actual account balances, identifiers or credentials.

```json
{
  "type": "https://example.invalid/problems/invalid-date-order",
  "title": "Invalid date order",
  "status": 422,
  "detail": "The end date must be after the start date."
}
```

Do not change an existing API's body shape or status policy without compatibility acceptance. React Router loader/action responses and error boundaries must preserve the intended status through SSR and sanitization; a visually rendered error page with 200 still needs contract review.

## Endpoint checklist

- [ ] Document method, caller, operation outcome and the existing response contract.
- [ ] Check each actual 2xx/3xx/4xx/5xx branch, including HEAD and no-body responses.
- [ ] Confirm 401 challenge, 405 Allow, 201 identifier and single-range 206 metadata where applicable.
- [ ] Review caching of errors, redirects and authenticated responses explicitly.
- [ ] Separate request validation, identity, object permission and storage conflict.
- [ ] Check malformed/oversized inputs, semantic failures, upstream timeout and internal exception redaction.
- [ ] Record mocked/source review versus mounted SSR/Workers/browser/provider proof honestly.
