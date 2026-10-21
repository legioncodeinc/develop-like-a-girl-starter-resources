# Branching Strategy routing

Use **GitHub Workflow** for the bounded decisions below. Check [scope and tool limits](../scope-and-tools.md) first. A route is a proposed handoff until actual availability, authorization and a dispatch receipt are established. Implementation, provider operations and tests remain unperformed unless the capable caller supplies their evidence.

The selected stack is React with React Router SSR, Cloudflare Workers, Supabase database and Auth, Cloudflare secrets and R2, transactional Resend and optional hosted Stripe Checkout. Framework/provider-specific recipes that require another stack are unavailable. Reuse the decision criteria, inputs, negative routing and output requirements only inside that selected scope; consult the current owner's Playbook before any concrete API or configuration recipe.



## Domain
Owns the strategic and tactical decisions behind how this repo structures its version-control workflow: branching model selection (trunk-based, GitHub Flow, GitLab Flow, GitFlow), migration between models, release and hotfix branch patterns, the merge-vs-rebase call, the long-lived-branch trap, and the feature-flag vs feature-branch decision. Defaults to GitHub Flow for this Starter project; another model requires an explicit team constraint and decision. Never introduce GitFlow without justification. Produces a branching policy document, not pipeline or ruleset configuration.


## Trigger phrases
- "which branching model should we use"
- "we have too many merge conflicts"
- "our release process is broken"
- "GitFlow or trunk-based, which fits us"
- "merge or rebase, what's our policy"
- "should this be a feature flag or a branch"
- "set up GitHub Merge Queue"
- "our branches sit open for weeks"

## Do NOT route when
- The request is Git mechanics: interactive rebase, conflict resolution, history rewriting; that is GitHub Workflow.
- The request is branch protection ruleset configuration in GitHub/GitLab; that is GitHub Workflow, not GitHub Workflow for review of existing CI evidence; broader CI implementation needs a designated capable caller.
- The request is CI/CD pipeline topology, including adding a `merge_group:` trigger for a merge queue; that is GitHub Workflow for review of existing CI evidence; broader CI implementation needs a designated capable caller.
- The request is choosing a feature-flag platform (LaunchDarkly vs Unleash vs Statsig) or writing flag implementation code; this Specialist scopes the flag-vs-branch decision only, then routes implementation to React Foundation or a separately qualified Python caller; Python implementation is not selected.
- The team just shipped a release under a new model and wants release notes; that is Project Notebook for an authorized release draft; publishing or a dedicated changelog engine is unavailable.

## Inputs the Specialist needs
- Release cadence, team size, product type, and whether multi-version support is required.
- Existing feature-flag infrastructure, or lack of it.
- A `git log --graph`, branch list, or `.github/` folder if available, inspected before asking further questions.

## Outputs
- A branching policy document (`docs/engineering/branching-policy.md`) covering model, naming, merge strategy, hotfix/release protocol, and feature-flag policy.
- A model recommendation with the GitFlow-bias explicitly stated and a merge-vs-rebase ruling.
- A routed list of protection-ruleset and CI-trigger deltas for the appropriate sibling Specialists.

## Commonly sequenced with
- GitHub Workflow: handles the rebase mechanics and conflict resolution once the model is chosen.
- GitHub Workflow: configures the branch protection rulesets this Specialist's policy calls for.
- GitHub Workflow for review of existing CI evidence; broader CI implementation needs a designated capable caller: wires CI pipeline triggers, including merge-queue support.
- Project Notebook for an authorized release draft; publishing or a dedicated changelog engine is unavailable: communicates releases once the new branching/release model produces one.
