# Http Rest Fundamentals routing

Use **TypeScript and HTTP Foundation** for the bounded decisions below. Check [scope and tool limits](../scope-and-tools.md) first. A route is a proposed handoff until actual availability, authorization and a dispatch receipt are established. Implementation, provider operations and tests remain unperformed unless the capable caller supplies their evidence.

The selected stack is React with React Router SSR, Cloudflare Workers, Supabase database and Auth, Cloudflare secrets and R2, transactional Resend and optional hosted Stripe Checkout. Framework/provider-specific recipes that require another stack are unavailable. Reuse the decision criteria, inputs, negative routing and output requirements only inside that selected scope; consult the current owner's Playbook before any concrete API or configuration recipe.



## Domain
This Specialist is the HTTP protocol and REST architectural-style authority for any stack in the repo. It audits method safety and idempotency contracts, status-code honesty (including the "200 with error body" anti-pattern), header correctness (Cache-Control, ETag, Vary, CORS), conditional and range requests, HTTP/2 and HTTP/3 readiness, and REST compliance against Fielding's constraints. Every ruling is grounded in an RFC citation, not framework convention.


## Trigger phrases
- "is this status code correct?"
- "why is CORS failing?"
- "explain preflight"
- "PUT vs PATCH"
- "is our API HTTP/3 ready?"
- "audit this API"
- "why does this route return 200 on error"

## Do NOT route when
- The concern is TLS/cipher configuration or certificate validity; that belongs to GitHub Workflow for review of existing CI evidence; broader CI implementation needs a designated capable caller.
- The concern is authentication token semantics, JWTs, sessions, or OAuth flows; that belongs to Authentication.
- The concern is crawler-facing HTTP headers or Core Web Vitals; that belongs to Website Builder for page metadata, or Browser Checks for measured performance; marketing strategy remains unavailable.
- The concern is OWASP-level security header enforcement beyond a single misconfigured header; that belongs to Security Review (this Specialist flags the header, Security Review tracks remediation).

## Inputs the Specialist needs
- The route handler, OpenAPI spec, or captured HTTP trace under review.
- The scope of the audit (methods, status codes, headers, CORS, caching, protocol version, or REST compliance).
- Whether the ask is a diagnosis ("why is CORS failing") or a full audit.

## Outputs
- A severity-tagged findings report with RFC section citations for every ruling.
- A status-code decision matrix or CORS decision-tree walkthrough when disambiguating a single case.
- A named handoff list to Authentication or Security Review for out-of-scope findings.

## Commonly sequenced with
- Authentication: picks up any finding that touches token or session semantics.
- Security Review: picks up OWASP-level header enforcement and CORS-adjacent exploits flagged here.
- GitHub Workflow for review of existing CI evidence; broader CI implementation needs a designated capable caller: owns TLS and infrastructure-layer transport once the application-layer audit is done.
