# 05. Conditional and range requests

Read [principles](00-principles.md). Caching validation, safe concurrent edits and partial downloads solve different problems. Review the selected representation and authorization before evaluating a condition or exposing metadata. The applicable mechanisms are RFC 9110 §8.8, §13, §14, §15.4.5, §15.5.13 and §15.5.17.

## Validators

A strong ETag identifies an exactly matching representation; a weak W/ tag identifies a semantic equivalence suitable for weak comparison. Neither is an access token. A row version can be a valid strong validator only if it changes with every byte-relevant representation change, including relevant serialization/encoding choices. Timestamps have resolution limitations. Hashing a very large body solely to produce a validator can defeat streaming; use trustworthy storage metadata with correct representation semantics. A bare R2 storage ETag is not automatically the public HTTP validator for a transformed response.

## Revalidate a read

```http
GET /api/items/42 HTTP/1.1
If-None-Match: "representation-7"
```

For a matching selected representation, GET/HEAD can return 304 without content; the client uses its cached representation. A changed representation returns its ordinary 200 and validator. If-None-Match uses weak comparison; a match on a state-changing method produces 412 rather than 304. A wildcard tests existence. Parse a validator list according to the field grammar rather than trimming one quote pair or splitting arbitrary commas. Do not copy entity tags supplied by the client into the response.

If-Modified-Since is the date-based GET/HEAD alternative. If-None-Match takes precedence when supplied. Ignore invalid or inapplicable date conditions as required by the RFC. A 304 sends the metadata required for that response, such as ETag, Vary and cache directives where applicable; it is not a JSON success/error body. A private cached response must remain tied to its actual principal/cache policy.

## Protect a write

```http
PATCH /api/items/42 HTTP/1.1
If-Match: "representation-7"
Content-Type: application/merge-patch+json

{"title":"Revised title"}
```

If-Match uses strong comparison. Reject stale/missing-base conditions as specified by the accepted API; a failed supplied If-Match is 412. If the representation is absent, an If-Match condition normally fails, including If-Match: *, rather than authorizing creation. If-None-Match: * can protect a create-if-absent operation. A required-but-absent precondition may use 428 under an adopted contract (RFC 6585 §3). Ordinary route errors and authentication have their specified ordering before conditional processing; do not replace all unknown-resource behavior with a simplistic rule.

Perform the version comparison and mutation atomically in Supabase/Postgres under the correct user/object policy. Read-version, compare in JavaScript, then unconditional UPDATE is a race. Do not claim a safe implementation without the actual SQL/transaction/row-count and authorization boundary. If-Unmodified-Since is weaker time-based protection and is ignored when If-Match exists. Evaluate combined conditions in RFC 9110 §13.2.2 order: If-Match, applicable If-Unmodified-Since, If-None-Match, applicable If-Modified-Since, then If-Range for ranges. If-Match does not supply identity or make every patch operation inherently idempotent. Returning 412 should tell a client to refetch/reconcile without disclosing another owner's representation.

## Ranges and download integrity

An endpoint may support ranges, ignore a Range request and return the full 200, or advertise no range support. Do not force range handling onto every JSON endpoint. Accept-Ranges: bytes advertises byte ranges, not application pagination. Review R2 object access and metadata independently of public delivery.

```http
GET /files/clip.mp4 HTTP/1.1
Range: bytes=0-1048575
If-Range: "representation-7"

HTTP/1.1 206 Partial Content
Content-Range: bytes 0-1048575/52428800
Content-Length: 1048576
Content-Type: video/mp4
Accept-Ranges: bytes
ETag: "representation-7"
```

A single satisfied range has correct inclusive bounds and length. Support open-ended and suffix ranges if the accepted contract claims them; suffix zero and starts beyond the current length require correct unsatisfiable handling. Unsupported range units and malformed grammar do not automatically mandate 416: inspect RFC handling, reject abusive sets where appropriate, and do not mislabel a full-body 200 as partial. For multipart/byteranges, each part carries Content-Range and the outer content type/boundary must agree. Bound number/size of ranges and avoid amplification or whole-object allocation. An explicitly single-range implementation must document its handling of multiple ranges rather than claim full support.

```http
HTTP/1.1 416 Range Not Satisfiable
Content-Range: bytes */52428800
```

If-Range determines whether to send the requested ranges or the full current representation; a mismatch normally yields full 200, not a partial response mixing versions. Entity-tag If-Range requires a strong validator. Apply ranges to the selected encoded representation consistently. HEAD never emits content, even when a range-like header is present. Avoid keeping a stale Content-Length after compression/transformation.

## Worksheet

| Case | Expected contract | Actual evidence | Gap |
|---|---|---|---|
| GET unchanged/changed | 304 without body / ordinary representation | | |
| HEAD success/error | Matching metadata and no body | | |
| If-None-Match on mutation | Match produces 412 where applicable | | |
| Stale If-Match | Atomic refusal and 412 | | |
| Concurrent same-base writes | At most one successful mutation | | |
| If-Match absent target | Precondition semantics preserved | | |
| If-None-Match wildcard create | No overwrite race | | |
| Prefix/suffix/open/multiple ranges | Declared support and bounded work | | |
| Unsatisfiable range | Correct 416 metadata where applicable | | |
| If-Range mismatch | Full current response, no mixed version | | |
| Edge/encoding transform | Validators/length/bytes remain coherent | | |

Source-only review cannot prove atomic database behavior, R2 streaming or edge validator survival. Do not execute database, provider or network checks from this local authoring role.
