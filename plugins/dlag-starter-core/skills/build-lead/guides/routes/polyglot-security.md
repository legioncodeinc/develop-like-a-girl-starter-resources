# Polyglot Security routing

Use **Security Review** for the bounded decisions below. Check [scope and tool limits](../scope-and-tools.md) first. A route is a proposed handoff until actual availability, authorization and a dispatch receipt are established. Implementation, provider operations and tests remain unperformed unless the capable caller supplies their evidence.

The selected stack is React with React Router SSR, Cloudflare Workers, Supabase database and Auth, Cloudflare secrets and R2, transactional Resend and optional hosted Stripe Checkout. Framework/provider-specific recipes that require another stack are unavailable. Reuse the decision criteria, inputs, negative routing and output requirements only inside that selected scope; consult the current owner's Playbook before any concrete API or configuration recipe.



## Domain

Multi-discipline security audit for ecosystems without a framework-specific pair: Node servers, Python, Go, Rust, Ruby, PHP, Java and Kotlin, .NET, plus secrets scanning, multi-ecosystem dependency advisories (osv-scanner), static analysis, and CI/CD and container hardening.


## Trigger phrases

- "Security audit this Django app"
- "Audit our Go service for vulnerabilities"
- "Multi-language security review"

## Do NOT route when

- React, an unselected Next framework, or SvelteKit code: use the framework security Specialist.
- Supply-chain policy and update automation: use `Dependency Review`.
- The user wants the audited repository changed during an audit: this Specialist is read-only.

## Inputs the Specialist needs

- The supplied audit scope, exact read-only repository/evidence paths, stack versions, candidate identity and approved output format. No throwaway copy, scanner or audit workspace is presumed to exist.

## Outputs

- Read-only findings in the supplied review format, with exact locators, method, severity, evidence and limits. Do not imply an external audit-contract engine or writable report folder.

## Commonly sequenced with

- `Security Review` and any framework security Specialist in the same wave.
