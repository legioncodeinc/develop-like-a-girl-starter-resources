# 02. GitHub CI setup

> Starter boundary: this is detailed proposal/reference material. Use Read/Grep/Glob/Skill and Write/Edit only for expressly requested Markdown project documents. Do not run commands, copy configuration, install hooks/dependencies, change settings, contact GitHub, commit or publish. Commands and templates below are unexecuted examples requiring actual installed versions, authorized caller tools and a separate task. Source research is a dated snapshot; account eligibility and product defaults are not verified here.

Copying and configuring `.github/` correctly: workflows, dependency automation, CODEOWNERS, and issue/PR templates.

## Workflows

`templates/repository/.github/workflows/ci.yml` runs lint, typecheck, and test as three separate jobs on push and pull request against the default branch, each scoped to `permissions: contents: read` at the job level, with a workflow-level `permissions: contents: read` default. This follows the least-privilege baseline: start every job at the minimum and add scopes only if a step actually needs them.

Fill these placeholders when copying `ci.yml`:
- `{default_branch}`: usually `main`.
- `{package_manager}`: `npm`, `pnpm`, or `yarn`, matches whichever lockfile is present.
- `{install_command}`, `{lint_command}`, `{typecheck_command}`, `{test_command}`: read from `package.json` scripts if present; do not invent commands that don't exist in the repo.
- `{actions_checkout_sha}`, `{actions_setup_node_sha}`: resolve the current SHA for the pinned major version before writing the file: `gh api repos/actions/checkout/git/ref/tags/v4.x.x --jq '.object.sha'` (adjust the org/repo and tag). Never leave a bare tag like `@v4` in the committed file: that reintroduces the exact tag-hijack risk pinning exists to close.

`templates/repository/.github/workflows/codeql.yml` is the advanced-setup equivalent of GitHub's Settings-driven "default setup." Prefer telling the user to enable native default setup (Settings > Advanced Security > CodeQL analysis > Set up > Default) if their plan/visibility supports it: it needs no workflow file and stays current automatically. Ship the committed-workflow version when the user wants CodeQL defined as code, wants a custom query suite or schedule, or is on a plan where default setup isn't available. Fill `{codeql_languages}` with the actual CodeQL-supported languages present in the repo (comma-separated matrix values, e.g. `javascript-typescript`), and `{codeql_action_sha}` the same way as the checkout/setup-node SHAs above.

## Dependabot

`templates/repository/.github/dependabot.yml` ships two ecosystems: the project's actual package ecosystem (fill `{package_ecosystem}`, e.g. `npm`) and `github-actions` (to keep pinned action SHAs current: Dependabot understands SHA pins and proposes the SHA + comment update together). This is the zero-setup default: no external app to install, enabled the moment the file exists. If the repo is a monorepo, spans multiple Git platforms, or needs >30 package-manager coverage, tell the user Renovate is the better fit and record the desired Renovate migration as pending current documentation and owner decision rather than requiring an unavailable raw archive or shipping both configs (running both causes duplicate PRs and lockfile conflicts).

## CODEOWNERS

`templates/repository/.github/CODEOWNERS` defaults everything to `{default_owner}` and locks `.github/` itself down to `{repo_admin_owner}`: owning the CODEOWNERS file and workflow directory is the one CODEOWNERS pattern GitHub's own docs call out as necessary to prevent someone quietly removing their own review requirement. Remember the three gitignore-lookalike syntax traps that silently fail in CODEOWNERS even though they look valid: `\#` escaping, `!` negation, `[ ]` character ranges. CODEOWNERS only takes effect on pull requests if "Require review from Code Owners" is turned on in branch protection or a ruleset: that's a Settings action, covered in guide `06`.

## Issue and PR templates

`templates/repository/.github/PULL_REQUEST_TEMPLATE.md` and the two files under `templates/repository/.github/ISSUE_TEMPLATE/` are what GitHub's community-profile checklist actually checks for: issue templates specifically must live in `.github/ISSUE_TEMPLATE/` with valid `name:`/`about:` frontmatter to count. Keep their structure in proposals; the only placeholders are in the PR template's body text, which the contributor fills at PR-open time, not at copy time.
