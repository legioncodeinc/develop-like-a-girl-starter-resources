# Worked example: status outcomes from a Workers API

## Input contract under review

An existing API creates items, deletes owned items and applies a defined patch representation. Its accepted contract distinguishes create, completed deletion, hidden/unknown object and semantic validation. The Response factory fragments below illustrate these outcomes at the existing Workers boundary.

The application's real identity/object permission, CSRF, validation, database transaction and safe DTO projection happen before these response fragments. The result passed here must come from that application boundary, not directly from request JSON or untrusted upstream strings. No Supabase/Stripe/Resend operation is implemented or authorized.

## Incorrect branches

```ts
// Illustrative defects under THIS accepted contract.
function failedDeleteWrong(): Response {
  return Response.json({ success: false, error: "Item not found" });
}
function createWrong(item: { id: string; title: string }): Response {
  return Response.json(item); // Implicit 200; contract says created + identifier.
}
```

The delete response represents an HTTP resource operation failure as an ordinary success, so its callers and monitoring misclassify it. A different aggregate/RPC contract might legitimately carry per-item errors in a successful result. The creation finding is a missing expected contract outcome, not a universal claim that every POST creation MUST have Location. RFC 9110 §9.3.3 says SHOULD for POST creation; a new-target PUT has a different MUST (§9.3.4).

## Explicit response outcomes

```ts
type PublicItem = { id: string; title: string };
type Outcome =
  | { kind: "created"; item: PublicItem }
  | { kind: "deleted" }
  | { kind: "not-found" }
  | { kind: "invalid-date-order" }
  | { kind: "malformed" }
  | { kind: "stale" }
  | { kind: "unexpected" };

function problem(status: number, title: string, type: string): Response {
  return new Response(JSON.stringify({ type, title, status }), {
    status,
    headers: {
      "Content-Type": "application/problem+json",
      "Cache-Control": "no-store"
    }
  });
}

function outcomeResponse(outcome: Outcome): Response {
  switch (outcome.kind) {
    case "created": {
      if (!/^[A-Za-z0-9_-]{1,80}$/.test(outcome.item.id)) {
        return problem(500, "Internal error", "about:blank");
      }
      // PublicItem must already be a validated public projection, never a raw row.
      return Response.json(outcome.item, {
        status: 201,
        headers: {
          "Location": `/api/items/${encodeURIComponent(outcome.item.id)}`,
          "Cache-Control": "no-store"
        }
      });
    }
    case "deleted":
      return new Response(null, {
        status: 204, headers: { "Cache-Control": "no-store" }
      });
    case "not-found":
      return problem(404, "Item not found", "about:blank");
    case "invalid-date-order":
      return problem(422, "Invalid date order",
        "https://example.invalid/problems/invalid-date-order");
    case "malformed":
      return problem(400, "Invalid request", "about:blank");
    case "stale":
      return problem(412, "Precondition failed", "about:blank");
    case "unexpected":
      return problem(500, "Internal error", "about:blank");
  }
}
```

These examples intentionally omit request routing, auth middleware, body parsing and persistence. Do not treat their absence as an authorization grant or claim a mounted secure API. If the accepted API uses a different error representation or a compatible 400 validation policy, preserve it unless an API change is accepted. Use generic messages for unexpected failures. Do not insert raw exception messages, submitted tokens, request URLs or private database fields into problems.

## Findings with evidence and RFC sections

| Finding | Actual issue in this sample | Candidate correction | Citation |
|---|---|---|---|
| Delete failed but returned 200 | Caller sees a successful resource operation instead of agreed absence outcome | 404 with safe problem body; ownership concealment consistent | RFC 9110 §15.5.5 |
| Create returned implicit 200 | Agreed created outcome and identifier absent | 201 and safe Location | §9.3.3; §15.3.2 |
| POST /items/42/update | Procedure name may be deliberate RPC | Classify honestly; PATCH only after format/compatibility acceptance | §9.3.3; RFC 5789 §2 |
| Date validation | Semantically invalid content under agreed 422 policy | 422 with safe fixed problem type | §15.5.21; RFC 9457 §3 |
| Stale version | If-Match failure must not silently overwrite | Atomic storage refusal then 412 | §13.1.1; §15.5.13 |

## Additional success and edge cases

A repeated DELETE may return 404 after 204 and remain idempotent; 200 with a useful deletion status representation is also valid (§9.3.5). HEAD must strip content even from error responses. A selected PATCH media type requires its exact format, protected-field validation and atomic application. A 405 supplies actual Allow methods; a 401 supplies the actual authentication challenge, not a fabricated Bearer stub. Unsupported request media type and oversized payload follow 415/413 according to the accepted boundary. Preserve CORS on safe accepted-origin errors and private cache policy on every personal response.

These are source examples only. TypeScript compilation, Workers Request/Response behavior, React Router SSR status propagation, browser behavior, identity/object access and database concurrency remain unrun. The [report template](../templates/findings-report.md) records those gaps instead of declaring a fixed severity count from preference alone.
