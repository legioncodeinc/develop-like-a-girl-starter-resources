# Security routing

Use **Security Review** for the bounded decisions below. Check [scope and tool limits](../scope-and-tools.md) first. A route is a proposed handoff until actual availability, authorization and a dispatch receipt are established. Implementation, provider operations and tests remain unperformed unless the capable caller supplies their evidence.

The selected stack is React with React Router SSR, Cloudflare Workers, Supabase database and Auth, Cloudflare secrets and R2, transactional Resend and optional hosted Stripe Checkout. Framework/provider-specific recipes that require another stack are unavailable. Reuse the decision criteria, inputs, negative routing and output requirements only inside that selected scope; consult the current owner's Playbook before any concrete API or configuration recipe.



## Domain
Security Review performs read-only security analysis of the selected React/Workers/Supabase stack: authorization, tenant isolation and RLS, server/client trust, webhook signatures, secrets hygiene, input/output handling and dependency risks. Cite actual code and supplied evidence, qualify unverified findings and route implementation fixes to an authorized implementer. It runs before independent Quality Review and never silently changes code or providers.

## Trigger phrases
- "security audit this branch before we ship"
- "scan for vulnerabilities in this PR"
- "check the webhook handler for signature verification"
- "audit the tenant isolation on this table"
- "run Security Review before we commit"
- "is there a secret leaking in this code"
- "review this for OWASP Top 10 issues"

## Do NOT route when
- The task is general code quality, testing coverage, or linting review with no security angle: that is `Quality Review`'s domain, verifying implementation matches plan, not scanning for vulnerabilities. The sharp line: security asks "can this be exploited," quality asks "does this match what was specified."
- `Quality Review` has already produced a report for this branch: flag the stale ordering, complete Security Review and fixes, then obtain fresh independent Quality Review for the final candidate.
- The task is owning full architecture from scratch: route to `Project Notebook`. This Specialist can prepare threat/control/verification packets using its actual local method while Project Notebook and selected implementation owners retain architecture and implementation.
- An unselected identity provider needs an unavailable provider-specific implementer; retain the general session and authorization findings within actual evidence.
- A tenant-scoped schema or migration needs design work, not just an RLS audit: route to `Data Foundation`.

## Inputs the Specialist needs
- Confirmation of ordering and candidate identity; an earlier Quality report must be refreshed after Security and fixes
- The diff or branch to scan, plus read-only access to inspect deterministic evidence for secrets, dangerous HTML/URL sinks, database query boundaries and webhook routes
- The severity rubric and actual impact/exploitability context, including financial and personal-data exposure
- Which findings require an authorized implementation owner, accepted remediation scope and fresh candidate review

## Outputs
- A severity-classified findings report with every finding cited to `path/to/file.ts:LINE`
- Specific remediation proposals for the implementation owner, with exact locations and required validation; this reviewer does not edit code
- A report returned in the supplied format; an authorized caller may save it in the project's approved review location
- A re-evaluation pass if any Medium-or-above finding required a fix

## Commonly sequenced with
- `Quality Review` always after, never before: security fixes can invalidate a QA snapshot taken too early
- GitHub Workflow after both: the final orchestrator-level gate before commit and push
- `Data Foundation` or `Identity for selected Supabase Auth behavior; other identity providers are outside scope` alongside: when a finding needs schema-design or auth-implementation depth beyond this Specialist's audit scope

## Security design entry points

Route pre-feature threat modeling, response/tenant boundary review, webhook forgery/replay/recovery, browser/log/context secret exposure scope and verification against actual risk and the current candidate. Load the current owner's local Playbook and the fresh constructed cases. No app/runtime verdict follows from a worksheet or synthetic example. Resolve Data Foundation, Identity, Stripe Payments and Build Lead through the generated availability roster before handoff; do not invent an absent engine.
