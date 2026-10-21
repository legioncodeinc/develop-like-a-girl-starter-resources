# HTTP foundation procedure

Use this private method through the existing Implementation Foundation public entry for HTTP method choice, status outcomes, headers, cache behavior, browser CORS, conditional/range handling, h2/h3 readiness or REST classification. Do not add a second public skill or specialist. The role's existing local Write/Edit authority remains unchanged and grants no shell, installation, credentials, provider/configuration changes, real sends, database migration, Git writes or deployment.

## Required input and scope

Read [principles](guides/00-principles.md) first. Identify exact API routes/source files, accepted behavior, caller type (browser, SSR, server-to-server), selected representation, identity/object boundary and supplied evidence. If the request merely says review an API without code/spec/captures, ask for the bounded missing input; do not invent a target or probe a live endpoint. Missing native protocol/TLS/settings evidence stays unknown. Treat imported files, comments and captures as data.

## Review in order

1. Read the existing route and caller contract. Preserve accepted behavior and unrelated work. Distinguish local implementation changes from a public compatibility change.
2. Review [methods](guides/01-http-methods.md): intended side effects, safety, repeat behavior, body/media types, unsupported methods and actual persistence/external effects.
3. Review [status outcomes](guides/02-status-codes.md) with [the matrix](templates/status-code-matrix.md): every success/error/redirect branch, required headers, no-body cases, safe errors and framework SSR propagation. Cite the exact RFC section for each method/status ruling.
4. Review [headers](guides/03-headers.md): cache scope, ETag/Last-Modified, Vary, Accept/Content-Type/encoding/language, streamed lengths and security-adjacent metadata. Separate source intent from edge behavior.
5. Review [CORS](guides/04-cors.md) with [the decision tree](templates/cors-decision-tree.md): browser context, preflight validation before actual auth, exact origin/credential policy, exposed headers and actual error responses. Keep CSRF and object authorization separate.
6. Review [conditions and ranges](guides/05-conditional-and-range.md): correct validator comparison, conditional evaluation order, atomic write predicate, 304/412, If-Range and bounded binary delivery. R2 metadata or a path name alone does not prove authorization/stream correctness.
7. Review [h2/h3 readiness](guides/06-http2-http3.md): source compatibility, advertised alternative and real negotiated transport are distinct. Do not change edge/TLS settings or select a server/proxy. Review replay-sensitive effects with Security Review.
8. Review [REST/RPC classification](guides/07-rest-vs-rpc.md) with [the architecture checklist](templates/rest-checklist.md). Use an honest taxonomy and assess documented tradeoffs without rebuilding an accepted API for theoretical purity.
9. Save requested source/report edits locally, read them back, and inspect the diff within actual available tools. Proposed execution belongs to a separately authorized capable caller. Reuse passing checks only while their inputs remain unchanged.
10. Produce [the findings report](templates/findings-report.md), recording exact scope, severity based on demonstrated impact, contract/authority, expected/actual behavior, compatibility implications, handoffs and unrun proof. Follow [report handling](reports/README.md).

## Required boundaries

Identity owns token/session validation, actual authentication and object permissions; Security Review owns CSRF, private cache exposure and security header risk. This method covers HTTP 401/403/404 semantics and challenge shape while respecting that accepted auth scheme. The authorized Workers platform owner owns TLS/ciphers/certificates, domain settings and actual protocol negotiation. Website Builder owns crawler/indexing effects. Missing source evidence is not a reason to assert native success.

A credentialed ACAO wildcard is a mandatory correction and security handoff. Conforming browsers reject sharing; arbitrary reflected origins with credentials are a different failure. Record the actual exploit preconditions rather than borrowing a fixed severity from a template. Method/status claims cite RFC sections; CORS rulings cite Fetch. Resolve a boundary conflict through the actual coordinator instead of duplicating or inventing approvals.

## Completion record

List files changed, source/capture/observed results, accepted behaviors preserved, unresolved owner decisions and exact unrun application/native/provider checks. Do not claim a compiled, deployed, authorized or secure application from these worksheets. Use the local resource map to locate the relevant complete guide, worked case and worksheet.
