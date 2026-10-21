# 07. Verification checklist

> Starter boundary: this is detailed proposal/reference material. Use Read/Grep/Glob/Skill and Write/Edit only for expressly requested Markdown project documents. Do not run commands, copy configuration, install hooks/dependencies, change settings, contact GitHub, commit or publish. Commands and templates below are unexecuted examples requiring actual installed versions, authorized caller tools and a separate task. Source research is a dated snapshot; account eligibility and product defaults are not verified here.

The pass that runs after every copy-out: what exists, what this run created, and what still needs a human decision. Never declare an initialization "done" without producing this report.

## Report structure

Three sections, always in this order:

### 1. Already present

Every file this skill would have created, that already existed. For each: path, and whether it matched the template exactly ("unchanged") or differed ("differs: not touched, see note"). This section proves the idempotency rule (guide `01`) actually held.

### 2. Created this run

Every file actually written, with the placeholders that were filled and how they were resolved (e.g. `{default_branch}` resolved from `git symbolic-ref refs/remotes/origin/HEAD`, `{package_manager}` resolved from the presence of `pnpm-lock.yaml`). Flag any file where a placeholder could not be resolved and was left in place or filled with an explicit "TODO" marker instead of a guess.

### 3. Needs a human decision

Everything this skill cannot do itself, grouped by why:

**Requires GitHub Settings / admin access** (from guides `04` and `06`):
- Enable GitHub Secret Protection + Push Protection (Settings > Advanced Security).
- Enable branch protection or a ruleset on the default branch: require PR, require status checks, require Code Owner review, block force pushes.
- Choose CodeQL native default setup vs. the committed `codeql.yml` workflow (or confirm both aren't fighting each other: enabling default setup disables an existing advanced-setup workflow).
- Choose and set a repository License (GitHub's UI can generate the `LICENSE` file from a template if the user names one: this skill does not choose a license on the user's behalf, since that's a legal/business decision, not a technical default).

**Requires a decision this skill flagged but didn't make**:
- Dependabot (shipped) vs. Renovate (recommended only for monorepos / multi-platform / >30-ecosystem needs): see guide `02`.
- husky+lint-staged (optional proposal) vs. lefthook (recommended only for monorepos / polyglot / hook-speed-sensitive teams): see guide `05`.
- Whether to add `commitlint` enforcement on top of the Conventional Commits convention: see guide `05`.
- Any `{placeholder}` in a copied file that names a person, team, or email (`{default_owner}`, `{security_email}`, `{repo_admin_owner}`): these are organizational facts this skill cannot infer.

**Not shipped by this skill, named as a gap**:
- `CODE_OF_CONDUCT.md`: not in this skill's template set; GitHub's community-profile "Add" flow can generate one, or a dedicated community-health workflow can own it.

## Verifying against the GitHub community profile

If the user has `gh` CLI access, the mechanical check for everything guide `06` describes is:
```bash
gh api repos/{org}/{repo}/community/profile
```
which returns a `health_percentage` and per-file presence booleans: a concrete, external confirmation that the copy-out actually raised repo health, independent of this skill's own self-report. Suggest running it before and after for a before/after delta in the report if the tool is available; record the remote community-profile check as unperformed if the tool or authorization is absent; local file inspection does not establish remote settings or health.

## Closing the loop

Preserve the three-part inventory as evidence inside the six-field session closing report: Status, Delivered, Verified, Not done, Questions for the owner, and Out of scope, noticed only. The original three sections do not replace the session report. Security Review precedes Quality Review, followed by the orchestrator's repository-health review; any unavailable review remains pending. GitHub Workflow supplies local hygiene guidance only and is not proof that a formal repository-health audit ran.


End every verification report with a direct pointer to the review sequence: nothing this skill created should be committed and pushed without Security Review Playbook, Quality Review Playbook, and GitHub Workflow Playbook running in that order first, and the user reviewing the reports before approving the commit. This skill produces the files; it does not decide they're safe to ship.
