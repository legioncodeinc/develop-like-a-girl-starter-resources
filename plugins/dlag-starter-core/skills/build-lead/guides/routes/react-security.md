# React Security routing

Use **Security Review** for the bounded decisions below. Check [scope and tool limits](../scope-and-tools.md) first. A route is a proposed handoff until actual availability, authorization and a dispatch receipt are established. Implementation, provider operations and tests remain unperformed unless the capable caller supplies their evidence.

The selected stack is React with React Router SSR, Cloudflare Workers, Supabase database and Auth, Cloudflare secrets and R2, transactional Resend and optional hosted Stripe Checkout. Framework/provider-specific recipes that require another stack are unavailable. Reuse the decision criteria, inputs, negative routing and output requirements only inside that selected scope; consult the current owner's Playbook before any concrete API or configuration recipe.



## Domain

Deep security audit of React 18 and 19 code: XSS sinks, unsafe URLs, markdown and sanitizer misuse, SSR serialization, React Server Components and Server Functions advisories (including CVE-2025-55182), client-side secrets, and client-only trust.


## Trigger phrases

- "Security audit our React app"
- "Are we affected by React2Shell?"
- "Check for XSS in our components"

## Do NOT route when

- an unselected Next framework server surfaces: use `a separately qualified framework security review; selected React/Workers evidence remains with Security Review` (both run on an unselected Next framework apps).
- Fixing the vulnerabilities: use `Security Review` or the implementation Specialist.
- The user wants the audited repository changed during an audit: this Specialist is read-only.

## Inputs the Specialist needs

- The supplied audit scope, exact read-only repository/evidence paths, stack versions, candidate identity and approved output format. No throwaway copy, scanner or audit workspace is presumed to exist.

## Outputs

- Read-only findings in the supplied review format, with exact locators, method, severity, evidence and limits. Do not imply an external audit-contract engine or writable report folder.

## Commonly sequenced with

- `a separately qualified framework security review; selected React/Workers evidence remains with Security Review` and `Security Review` in the same wave.
