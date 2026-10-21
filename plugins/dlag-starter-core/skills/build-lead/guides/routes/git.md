# Git routing

Use **GitHub Workflow** for the bounded decisions below. Check [scope and tool limits](../scope-and-tools.md) first. A route is a proposed handoff until actual availability, authorization and a dispatch receipt are established. Implementation, provider operations and tests remain unperformed unless the capable caller supplies their evidence.

The selected stack is React with React Router SSR, Cloudflare Workers, Supabase database and Auth, Cloudflare secrets and R2, transactional Resend and optional hosted Stripe Checkout. Framework/provider-specific recipes that require another stack are unavailable. Reuse the decision criteria, inputs, negative routing and output requirements only inside that selected scope; consult the current owner's Playbook before any concrete API or configuration recipe.



## Domain
GitHub Workflow prepares read-only analysis and authorized-caller proposals for: branching strategy advisory, interactive rebase (squash, fixup, reword, autosquash), conflict resolution (rerere, mergetool, diff3), history rewriting via `git filter-repo` or BFG (never `filter-branch`), the reset/reflog recovery toolkit, worktrees for parallel branch work, client-side hooks (pre-commit, commit-msg, pre-push via Husky or lefthook), the submodules-vs-subtrees decision, Git LFS, partial clone, and sparse checkout. Show the recovery/backup evidence before proposing any destructive operation. GitHub Workflow does not execute these operations.


## Trigger phrases
- "squash my commits"
- "I accidentally pushed a secret"
- "my repo is huge"
- "undo that rebase"
- "recover my deleted branch"
- "work on two branches simultaneously"
- "set up Git hooks"
- "submodules vs subtrees"

## Do NOT route when
- The ask is CI/CD pipeline configuration triggered by Git events: that's GitHub Workflow for review of existing CI evidence; broader CI implementation needs a designated capable caller, this Specialist owns the client-side Git operation, not what runs after a push.
- The ask is credential rotation after a secrets-in-history incident: that's Security Review, this method prepares a history-cleanup proposal and immediately escalates exposure; it never reads or rotates credentials.
- The ask is server-side hooks (`pre-receive`, `update`, `post-receive`) in CI infrastructure: that's GitHub Workflow for review of existing CI evidence; broader CI implementation needs a designated capable caller, this Specialist owns only client-side hooks.
- The ask is GitHub/GitLab REST API usage or branch protection rule configuration beyond the Git protocol itself: that's GitHub Workflow for review of existing CI evidence; broader CI implementation needs a designated capable caller.

## Inputs the Specialist needs
- The actual supplied Git version and feature support; do not assume a version threshold establishes all needed behavior
- Whether the branch in question is shared (open PRs, other checkouts) before recommending any history rewrite or force-push
- The exact failure state for recovery scenarios: what was reset, rebased, or deleted, and when
- Whether a secret is involved, which changes the urgency and triggers a parallel Security Review escalation

## Outputs
- Illustrative proposed shell commands, explicit approval gates and an escape hatch shown first
- A before-state, the operation, and the expected after-state for any recovery
- A `.gitattributes`, hooks collection, or rebase cheatsheet from the template set

## Commonly sequenced with
- Security Review: assesses exposure immediately; actual credential rotation requires a specifically authorized capable operator
- GitHub Workflow for review of existing CI evidence; broader CI implementation needs a designated capable caller: owns CI/CD Git-triggered workflows and server-side hooks that sit downstream of this Specialist's client-side operations
