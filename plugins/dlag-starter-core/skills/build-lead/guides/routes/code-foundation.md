# Code Foundation routing

Use **Quality Review** for the bounded decisions below. Check [scope and tool limits](../scope-and-tools.md) first. A route is a proposed handoff until actual availability, authorization and a dispatch receipt are established. Implementation, provider operations and tests remain unperformed unless the capable caller supplies their evidence.

The selected stack is React with React Router SSR, Cloudflare Workers, Supabase database and Auth, Cloudflare secrets and R2, transactional Resend and optional hosted Stripe Checkout. Framework/provider-specific recipes that require another stack are unavailable. Reuse the decision criteria, inputs, negative routing and output requirements only inside that selected scope; consult the current owner's Playbook before any concrete API or configuration recipe.



## Domain

Assesses whether a repository is set up so people and AI agents can work in it safely: the actual project documentation conventions and readiness evidence (assessment only), agent instructions, CI, tests, lint, typecheck, lockfiles, secrets hygiene, and governance signals.


## Trigger phrases

- "Is this repo set up right for agents?"
- "Run a foundation audit"
- "Health check this repository"
- "/audit-my-code foundation"

## Do NOT route when

- The user wants the repository initialized, not assessed: use Project Setup with its own scope and actual tools.
- The request is a GitHub settings change: use `GitHub Workflow`.
- The user wants the audited repository changed during an audit: this Specialist is read-only.

## Inputs the Specialist needs

- The supplied audit scope, exact read-only repository/evidence paths, stack versions, candidate identity and approved output format. No throwaway copy, scanner or audit workspace is presumed to exist.

## Outputs

- Read-only findings in the supplied review format, with exact locators, method, severity, evidence and limits. Do not imply an external audit-contract engine or writable report folder.

## Commonly sequenced with

- `a separately qualified bloat audit; foundation observations do not prove dead-code analysis` and the security Specialists in the same wave.
