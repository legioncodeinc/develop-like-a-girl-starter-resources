# REST architectural worksheet

Read [REST versus RPC](../guides/07-rest-vs-rpc.md). Judge architecture separately from an endpoint's HTTP correctness, identity control and application usability.

## Fielding constraints

| Constraint | Check | Pass/Fail/Partial/Unknown and evidence |
|---|---|---|
| Client-server | Separation of UI and data-service concerns; SSR is permitted | |
| Stateless interaction | No retained client application context needed to interpret a later request; resource state/cookies alone do not settle this | |
| Cacheable | Responses communicate applicable reuse rules and identity/representation variation | |
| Uniform: resource identification | Stable URIs identify resources; chosen naming alone does not prove compliance | |
| Uniform: representations | Manipulate resources through defined representations | |
| Uniform: self-descriptive | Media types, method/status/header semantics support correct processing | |
| Uniform: hypermedia | Real supported next transitions with defined relation/representation meaning | |
| Layered | Intermediaries preserve routing, validators, cache scope and semantics | |
| Optional code on demand | If used, document executable delivery and trust boundary; absence is not failure | |

## URL and version compatibility

- [ ] Collection and item names are consistent with the accepted API.
- [ ] Nesting expresses relationships without pretending to enforce ownership.
- [ ] Commands that do not map cleanly to CRUD have an honest documented contract.
- [ ] URI, media type, query or host versioning has explicit compatibility/cache/deprecation behavior.
- [ ] No breaking change is proposed inside a supported version without acceptance.

## HTTP method behavior

- [ ] GET/HEAD do not request business mutations; HEAD returns no body.
- [ ] PUT/DELETE repeat effects stabilize as specified; response equality is not required.
- [ ] POST retries/deduplication are defined where needed.
- [ ] PATCH format, atomicity, limits and concurrency contract are explicit.
- [ ] Unsupported known methods return 405 and actual Allow methods.

## Status and header honesty

- [ ] Each operation's outcome agrees with its accepted HTTP contract, including documented RPC/aggregate results.
- [ ] Created/accepted/completed/partial outcomes are distinguished; 201 identifier and POST SHOULD/PUT MUST rules are respected.
- [ ] 204/304/HEAD omit content, while 200 may validly carry DELETE status.
- [ ] 401 carries a real scheme challenge and 405 carries Allow.
- [ ] 400/422 validation choice is consistent; failed preconditions remain distinct from generic conflicts.
- [ ] 429/503 retry metadata reflects actual behavior rather than a fabricated fixed window.
- [ ] Private cache and CORS policy protect actual representations without replacing identity/object checks.

## Verdict

| Taxonomy | Assessment/evidence |
|---|---|
| REST | Required constraints, including hypermedia, supported by evidence |
| Resource-oriented / REST-like | Useful resource interface with explicitly described omissions/tradeoffs |
| RPC-over-HTTP | Procedure-call contract over HTTP, evaluated honestly on its own requirements |
| Unknown | Insufficient bounded evidence; identify missing scope |

Record practical remediation, compatibility implications, Security/Identity follow-ups and unrun native/application checks. Missing optional hypermedia does not independently establish a vulnerability or justify rebuilding the API.
