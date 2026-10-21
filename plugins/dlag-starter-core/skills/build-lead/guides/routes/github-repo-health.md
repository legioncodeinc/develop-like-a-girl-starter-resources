# Github Repo Health routing

Use **GitHub Workflow** for the bounded decisions below. Check [scope and tool limits](../scope-and-tools.md) first. A route is a proposed handoff until actual availability, authorization and a dispatch receipt are established. Implementation, provider operations and tests remain unperformed unless the capable caller supplies their evidence.

The selected stack is React with React Router SSR, Cloudflare Workers, Supabase database and Auth, Cloudflare secrets and R2, transactional Resend and optional hosted Stripe Checkout. Framework/provider-specific recipes that require another stack are unavailable. Reuse the decision criteria, inputs, negative routing and output requirements only inside that selected scope; consult the current owner's Playbook before any concrete API or configuration recipe.



## Domain
This Specialist is a read-only repository hygiene auditor for GitHub repos. It scores eight dimensions: branch protection rulesets, PR culture, commit history quality (Conventional Commits adherence), CI workflow density, README/docs presence, `.gitignore` coverage, CODEOWNERS patterns, issue/PR templates, and repository settings (merge strategy, secret scanning, auto-delete). It never modifies branch protection, CI files, or settings; it produces a scored audit report ranked by impact divided by effort.


## Trigger phrases
- "audit this repo"
- "repo health check"
- "check branch protection"
- "CODEOWNERS audit"
- "are our CI checks configured correctly"
- "check PR templates"
- "GitHub repo hygiene"
- "is our git workflow healthy"

## Do NOT route when
- The ask is deep CI/CD architecture beyond checking whether workflows exist: that's GitHub Workflow for review of existing CI evidence; broader CI implementation needs a designated capable caller, this Specialist only scores workflow density and hands off architecture depth.
- The ask is code correctness or security vulnerabilities in the code itself: that's Security Review, this Specialist only checks whether secret scanning is enabled, not what a leak means.
- The ask is database schema: that's Data Foundation, entirely outside this Specialist's metadata-layer scope.
- The ask is README content quality or structural rewriting: that's GitHub Workflow, this Specialist only checks presence and basic quality signals.
- The user wants automated fixes applied (e.g. "enable branch protection for me"): this Specialist is read-only, it drafts the manual steps or names the GitHub Settings path instead.

## Inputs the Specialist needs
- The available data collection mode: local clone plus `gh` CLI, GitHub REST API with a `repo`-scoped token, or local clone only
- Whether the audit is full (all eight dimensions) or scoped to specific ones
- Repo visibility, since private repos without API access limit branch protection and CODEOWNERS coverage checks
- CODEOWNERS file content, to flag references to non-existent teams or users rather than silently skip them

## Outputs
- A scored audit report (0-10 per dimension, weighted to a 0-100 overall score) at `library/requirements/reports/github-repo-health/<date>-<repo-slug>-audit.md`
- A remediation plan ranked by impact divided by effort, with named responsible parties
- Explicit handoff names for CI architecture, secret scanning results, and README structure gaps

## Commonly sequenced with
- GitHub Workflow for review of existing CI evidence; broader CI implementation needs a designated capable caller: receives CI architecture depth findings this Specialist's density check surfaces but doesn't resolve
- Security Review: receives secret-scanning-enabled findings for the leak-implication audit
- GitHub Workflow: receives README structural improvement findings


## Automation permission hygiene

Route scoped automation/permission-risk review here using the current owner's local Playbook. Output observations with exact source paths/revisions, authority boundaries and missing candidate proof. Unknown live settings stay unknown. No workflow execution or repair. Security owns vulnerability implications; Broader release/workflow implementation requires a designated capable caller. This does not authorize repository or provider changes.
