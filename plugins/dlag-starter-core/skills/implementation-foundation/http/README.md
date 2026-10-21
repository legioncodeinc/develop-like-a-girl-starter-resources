# HTTP foundation reference map

This private method is part of Implementation Foundation. It supports the selected React/Vite, React Router framework SSR and Cloudflare Workers application path. It grants requested local source/document edits only. Start with [the playbook](playbook.md) and [principles](guides/00-principles.md). The complete guide, worksheet and example map is below.

## Guides

| Resource | Use |
|---|---|
| [Principles](guides/00-principles.md) | Every review: authority, accepted contract, safety/idempotency and evidence |
| [Methods](guides/01-http-methods.md) | GET/HEAD/POST/PUT/PATCH/DELETE/OPTIONS and unsupported methods |
| [Status codes](guides/02-status-codes.md) | Success, redirects, client/server errors, Problem Details and compatibility |
| [Headers](guides/03-headers.md) | Cache directives, validators, negotiation, Vary and browser metadata |
| [CORS](guides/04-cors.md) | Browser sharing, credentials, preflight, CSRF distinction and error responses |
| [Conditions and ranges](guides/05-conditional-and-range.md) | Validator comparison, atomic preconditions, 304/412 and partial downloads |
| [HTTP/2 and HTTP/3](guides/06-http2-http3.md) | Transport evidence, legacy optimization, edge/upstream split and replay |
| [REST versus RPC](guides/07-rest-vs-rpc.md) | Architectural constraints, honest taxonomy, relationships and versioning |

## Complete worksheets

- [Findings report](templates/findings-report.md): severity, exact authority, request/outcome evidence and follow-up owner.
- [Status code matrix](templates/status-code-matrix.md): scenario-specific status/header and disambiguation worksheet.
- [CORS decision tree](templates/cors-decision-tree.md): request classification, credential policy, cache variation and outcome record.
- [REST checklist](templates/rest-checklist.md): required/optional constraints, URL/method/status behavior and practical verdict.

## Worked examples and reference notes

- [Workers CORS comparison](examples/cors-correct-vs-incorrect.md): wrong wildcard and bounded route-specific preflight policy; actual identity/CSRF controls remain prerequisites.
- [Workers status audit](examples/status-code-audit.md): incorrect and corrected response outcomes, compatibility and safe errors.
- [Workers protocol assessment](examples/http3-readiness-assessment.md): source versus advertisement versus negotiated transport evidence.
- [Official references and open decisions](research/research-summary.md): direct primary sources and context-specific decision rules.
- [Report handling](reports/README.md): requested local output naming, preservation and evidence limits.

TypeScript snippets are teaching fragments, not compiled applications. No native/browser/Workers/database/R2/provider/network verification is implied. Self-hosted server details are conditional review knowledge for an existing imported stack. Identity, Security Review and the authorized platform owner retain their own responsibilities.
