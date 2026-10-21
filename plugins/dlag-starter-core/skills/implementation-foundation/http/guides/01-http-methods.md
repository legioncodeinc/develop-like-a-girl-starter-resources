# 01. Method contracts

Read [principles](00-principles.md) first. List the actual route, accepted methods, representation, intended side effects, retry behavior and unsupported-method outcome before proposing a change.

## Safety, idempotency and bodies

| Method | Safe | Idempotent | Request content and reference |
|---|---|---|---|
| GET | Yes | Yes | No generally defined semantics; avoid request content without explicit interoperable agreement. RFC 9110 §9.3.1 |
| HEAD | Yes | Yes | GET metadata without response content; request content has no generally defined semantics. §9.3.2 |
| POST | No | No by default | Resource-specific processing of submitted content. §9.3.3 |
| PUT | No | Yes | Create or replace state at the chosen URI. §9.3.4 |
| DELETE | No | Yes | Remove the URI association; request content has no generally defined semantics. §9.3.5 |
| CONNECT | No | No | Tunnel establishment; not a normal application CRUD route. §9.3.6 |
| OPTIONS | Yes | Yes | Communication options; request content needs a defined media type when present. §9.3.7 |
| TRACE | Yes | Yes | Diagnostic loopback, usually unsupported by the application; do not expose credentials. §9.3.8 |
| PATCH | No | Not inherently | A defined patch document. RFC 5789 §2; JSON Patch RFC 6902 or Merge Patch RFC 7396 |

Workers/Fetch Request construction and intermediaries can restrict methods/content beyond these general semantics. Do not construct GET/HEAD with a body in a Fetch recipe. Unsupported known methods use 405 with the actual Allow list (RFC 9110 §15.5.6); do not advertise TRACE/CONNECT merely because this table describes them.

## GET and HEAD

GET retrieves a representation. Filters belong in bounded validated query parameters. Never use GET to delete a user, send Resend mail, modify R2 objects, create Stripe sessions or execute a database mutation. Incidental logs do not license requested business side effects. HEAD selects the corresponding GET representation metadata and emits no body, including error paths. Review whether calculating metadata triggers unnecessary full binary loading or mutation. Cache eligibility depends on status, method, directives and request context, not simply on GET's presence.

## POST

POST performs resource-specific processing: create in a collection, submit a form, run a command or submit a query too large/private for a URL. POST for a query is a documented tradeoff, not automatically a semantic violation. A successful create usually returns 201 with the created identifier; other POST outcomes can be 200, 202 or 204 according to the accepted operation. Repeating a create can duplicate rows, mail or checkout sessions. Where required, design a bounded, identity-scoped deduplication contract with atomic persistence, payload equality, expiry and replay response behavior. A header named Idempotency-Key alone proves none of this. No new storage service is selected here.

## PUT

PUT targets the client's chosen URI and supplies the replacement representation allowed by the contract. Read-only/generated fields can remain server controlled. Do not assume every omitted database column becomes NULL; check the documented representation and storage mapping. If omitted editable fields mean retain-existing, a partial-update contract may fit PATCH better. New target creation requires 201; replacement success uses 200 or 204 (RFC 9110 §9.3.4). Compare repeated identical requests and concurrent writes, including duplicate external effects. Keep identity/object permissions and If-Match handling independent.

## PATCH

Declare the patch format and media type rather than calling any partial JSON object a standard patch. Merge Patch interprets null as removal; arrays are replaced. JSON Patch has ordered operations, path escaping and array-index behavior; append operations can be non-idempotent. Validate allowed fields, depth, size, operation count, protected properties and ownership. Advertise supported patch types through Accept-Patch when appropriate. Apply all changes atomically (RFC 5789 §2). If-Match with a strong validator can reject a stale base, but the comparison and write must happen in one storage operation. Do not implement check-then-write races or silently retry financial/external side effects.

## DELETE

DELETE removes the target association. A completed deletion can return 204, a representation of status can return 200, and pending work can return 202 (RFC 9110 §9.3.5). Repeat responses may differ. Soft deletion remains idempotent when the intended state stabilizes; logs and repeated unchanged tombstone reads do not invalidate it. Verify linked data/R2 erasure and retained audit rules separately. Never imply a status proves complete physical deletion across storage.

## OPTIONS and CORS

CORS preflight is handled before credentials are required, using route-specific origin/method/header policy. This exception does not bypass authentication for the subsequent request or make all ordinary OPTIONS public by universal rule. A successful preflight can use 200 or 204. Ordinary capability discovery can use Allow. [CORS](04-cors.md) distinguishes the two.

## Review worksheet

| Pattern | Establish | Response |
|---|---|---|
| GET mutation | Actual requested side effect and caller | Move the mutation to a suitable accepted write route; keep reads safe |
| POST /items/42/update | Deliberate RPC contract or accidental CRUD confusion | Preserve compatibility; consider PATCH only with an agreed migration |
| Partial PUT | Omission semantics and resource representation | Document replacement or adopt a defined PATCH contract |
| Duplicate POST | Retry scope, atomic deduplication and external effects | An idempotency header requires a real implementation |
| GET/DELETE body | Client/platform/intermediary support | Prefer supported URI/query or an explicitly defined processing endpoint |
| DELETE 200 | Is a useful status representation returned? | Valid when truthful; do not force 204 solely for style |

For every finding cite the method section and capture a success, repeat, invalid-method and unauthorized/object-denial case. Proposed tests remain unrun until a capable caller is authorized.
