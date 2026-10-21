# Quality routing

Use **Quality Review** for the bounded decisions below. Check [scope and tool limits](../scope-and-tools.md) first. A route is a proposed handoff until actual availability, authorization and a dispatch receipt are established. Implementation, provider operations and tests remain unperformed unless the capable caller supplies their evidence.

The selected stack is React with React Router SSR, Cloudflare Workers, Supabase database and Auth, Cloudflare secrets and R2, transactional Resend and optional hosted Stripe Checkout. Framework/provider-specific recipes that require another stack are unavailable. Reuse the decision criteria, inputs, negative routing and output requirements only inside that selected scope; consult the current owner's Playbook before any concrete API or configuration recipe.



## Domain
This Specialist is the final checkpoint in the plan-implement-security-QA loop. It audits implementation against the selected PRD in `library/requirements/` or IRD in `library/issues/`, checks requirements and acceptance criteria against code, and reports Critical / Warning / Suggestion findings. It does not implement fixes or replace the plan's decisions. Security always precedes Quality on the candidate.


## Trigger phrases
- "QA this implementation against the PRD"
- "audit the implementation"
- "check the plan against the code"
- "run Quality Review on this branch"
- "verify the PRD was actually built"
- "did we miss anything from the issue spec"

## Do NOT route when
- Security has not yet run for this cycle: this Specialist must not be invoked before `Security Review`; if invoked out of order, flag the violation and halt rather than proceeding.
- The task is general code quality, testing strategy, or linting review with no source plan to audit against: that broader "is this code good" question, disconnected from a specific PRD/IRD, sits closer to a code-review pass than this Specialist's plan-vs-implementation audit; this Specialist needs a plan document as ground truth, not a general quality opinion.
- The task is judging whether the plan itself is well-formed: that belongs to `Project Notebook`, the plan's author, not this Specialist.
- The task is fixing the gaps found: this Specialist reports with coordinates and recommended remediation, it never implements fixes itself.
- The task is a security-specific vulnerability or hardening question: that is `Security Review`'s domain and must close out before this Specialist's pass is valid.

## Inputs the Specialist needs
- The matching PRD or IRD path under `library/requirements/<lifecycle>/` or `library/issues/<lifecycle>/`
- A `git diff`/`git status` capturing every file added, modified, or deleted for the branch
- Confirmation that `Security Review` has already run for this cycle
- Access to the plan's User Stories and Acceptance Criteria to seed the traceability table

## Verification artifacts

Route exact-candidate evidence packets through the existing Quality pair after matching Security review. Its local Playbook binds plan/content manifests, actual check receipts, generated outputs and producer limits. Preserve NOT_RUN, skip, cancellation and stale results. Draft authorship does not create independent approval; source checks do not establish native/provider behavior.

## Outputs
- A report in the selected v2 PRD/IRD folder's `qa/<date>-qa-report.md`, or `library/requirements/reports/<domain>/` for a standalone audit. Preserve a receiving repository's documented legacy report destination when auditing its existing plans.
- A traceability table mapping every plan item to code (or marking it a gap)
- Findings classified Critical / Warning / Suggestion, each with file:line + snippet

## Commonly sequenced with
- `Security Review` always before: security fixes can invalidate a QA snapshot taken too early
- `Project Notebook` for ambiguity: any ambiguous requirement in the plan is deferred back to the plan's author, not reinterpreted here
- Any implementing Specialist (react/python/payments/etc.) before: this Specialist audits their completed work against the plan
