# Code Review Pr routing

Use **GitHub Workflow** for the bounded decisions below. Check [scope and tool limits](../scope-and-tools.md) first. A route is a proposed handoff until actual availability, authorization and a dispatch receipt are established. Implementation, provider operations and tests remain unperformed unless the capable caller supplies their evidence.

The selected stack is React with React Router SSR, Cloudflare Workers, Supabase database and Auth, Cloudflare secrets and R2, transactional Resend and optional hosted Stripe Checkout. Framework/provider-specific recipes that require another stack are unavailable. Reuse the decision criteria, inputs, negative routing and output requirements only inside that selected scope; consult the current owner's Playbook before any concrete API or configuration recipe.



## Domain
Owns code review as a culture and practice: PR description quality against a canonical six-element structure (motivation, context, what changed, what did NOT change, testing proof, reviewer hints), context-specific review checklist generation, PR size evaluation against a 400-line threshold with split strategies, rubber-stamp culture diagnosis, and coaching review comments into a three-tier taxonomy (blocker/suggestion/nit). Never approves or blocks a merge; merge decisions stay with humans and CI.


## Trigger phrases
- "audit our PR culture"
- "write a PR description for this diff"
- "create a review checklist for this change"
- "coach this review comment, it sounds too harsh"
- "is this PR too large, should I split it"
- "how do we improve code review on our team"
- "why do our reviews feel like rubber stamps"
- "review this PR for description quality"

## Do NOT route when
- The request is security audit findings; that is Security Review.
- The request is implementation correctness at the logic level; that is a separately qualified Python caller; Python implementation is not selected or React Foundation.
- The request is CI/CD pipeline setup; that is GitHub Workflow for review of existing CI evidence; broader CI implementation needs a designated capable caller.
- The request is branch protection configuration or enforcing a PR template at the repository-settings level; that is GitHub Workflow.
- A review comment being coached contains an actual security finding; surface it separately to Security Review rather than just softening the tone.

## Inputs the Specialist needs
- The PR diff or description, and which request type applies (description audit, checklist, size evaluation, culture diagnosis, comment coaching).
- File types present in the diff, to scope a context-specific checklist.
- For culture audits, repo-level metrics access (zero-comment PR rate, review latency) or a GitHub API token.

## Outputs
- A scored PR description audit table (pass/fail/warn per element) plus a rewrite.
- A context-specific three-phase review checklist.
- A size-evaluation flag with a concrete split proposal, or a culture scorecard with a remediation plan.

## Commonly sequenced with
- Security Review: takes any security finding surfaced mid-comment-coaching.
- a separately qualified Python caller; Python implementation is not selected / React Foundation: own implementation correctness that this Specialist's checklists point at but do not judge themselves.
- GitHub Workflow: enforces PR templates and branch protection at the settings level that this Specialist only coaches content for.
- GitHub Workflow for review of existing CI evidence; broader CI implementation needs a designated capable caller: owns the CI checks that a review checklist references but does not configure.
