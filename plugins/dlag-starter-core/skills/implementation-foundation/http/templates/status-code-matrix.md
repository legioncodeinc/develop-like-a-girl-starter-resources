# Status code decision worksheet

Read [the full status guide](../guides/02-status-codes.md). Record the existing accepted endpoint behavior before deciding whether a change is required.

## Succeeded

| Outcome | Candidate | Reference and qualification |
|---|---|---|
| Successful read or processing result | 200 | RFC 9110 §15.3.1; useful result can include documented per-item RPC outcomes |
| Created resource | 201 | §15.3.2; primary identifier Location or target URI. POST creation SHOULD supply Location (§9.3.3); new PUT target MUST return 201 (§9.3.4) |
| Accepted, not completed | 202 | §15.3.3; actual accepted work/status monitor required; no job provider is selected |
| Successful, no content | 204 | §15.3.5; null response body |
| Satisfied range | 206 | §15.3.7/§14; correct single-range or multipart metadata |

## Redirected or unchanged

| Outcome | Candidate | Reference |
|---|---|---|
| Permanent move; POST may become GET | 301 | §15.4.2 |
| Temporary move; POST may become GET | 302 | §15.4.3 |
| Retrieve another resource after processing | 303 | §15.4.4; GET/HEAD retrieval |
| Conditional GET/HEAD unchanged | 304 | §15.4.5; no body, relevant cache/validator metadata |
| Temporary move preserving method | 307 | §15.4.8 |
| Permanent move preserving method | 308 | §15.4.9 |

## Client-side refusal

| Outcome | Candidate | Reference and qualification |
|---|---|---|
| Perceived client request error | 400 | §15.5.1; malformed JSON and some accepted validation contracts |
| Missing/invalid authentication credentials | 401 | §15.5.2; valid WWW-Authenticate for actual scheme |
| Understood but refused | 403 | §15.5.4; not exclusively authenticated callers |
| Unknown target or consistent existence concealment | 404 | §15.5.5 |
| Unsupported known method | 405 | §15.5.6; actual Allow list |
| No acceptable negotiated representation | 406 | §15.5.7; if server does not choose its default |
| Resource-state conflict | 409 | §15.5.10; not a substitute for failed If-Match |
| Known permanently absent | 410 | §15.5.11 |
| Supplied precondition false | 412 | §15.5.13 |
| Content too large | 413 | §15.5.14; enforce before full allocation |
| Unsupported request media type/encoding | 415 | §15.5.16 |
| Range unsatisfiable | 416 | §15.5.17/§14; Content-Range complete length where applicable |
| Understood syntax/media type, unprocessable instructions | 422 | §15.5.21; existing compatible 400 validation policy need not be rewritten |
| Required precondition absent | 428 | RFC 6585 §3; only when adopted |
| Rate limit exceeded | 429 | RFC 6585 §4; Retry-After if meaningful |

## Server-side failure

| Outcome | Candidate | Reference |
|---|---|---|
| Unexpected internal error | 500 | RFC 9110 §15.6.1 |
| Invalid response while acting as gateway | 502 | §15.6.3 |
| Temporarily unable to serve | 503 | §15.6.4; Retry-After may describe a real estimate |
| Upstream timeout while acting as gateway | 504 | §15.6.5 |

## Disambiguation record

| Pair | Decision |
|---|---|
| 400/422 | Syntax/media type/content meaning plus accepted contract; neither is a universal validation mandate |
| 401/403/404 | Authentication challenge, refusal and existence concealment are separate policies |
| 404/410 | Unknown/current absence versus known permanence |
| 409/412 | Resource-state conflict versus failed supplied precondition |
| 406/415 | Response representation Accept versus request Content-Type/encoding |
| 200/204 | Meaningful representation versus deliberately absent content |
| 201/202 | Actually created versus accepted unfinished processing |
| 301/308; 302/307 | Whether method preservation is required, plus permanence |

Per route: <method>; <contract>; <actual branches>; <required headers>; <cache policy>; <safe public error>; <identity/object/CSRF owner>; <success/failure/edge evidence>; <unrun proof>. Preserve private information when recording examples.
