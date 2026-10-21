# Get-started assess map

How the Foundation assessment compares actual selected conventions with locally packaged Project Setup and Project Notebook. No external source package, installation marker or personal global setup is required.

## Assess-only rule

get-started copies files, fills `{placeholders}`, never overwrites, and ends with a three-part report (already present, created, needs a human decision). The audit runs the same inventory in read-only form:

| get-started report part | Audit equivalent |
| --- | --- |
| Already present, unchanged | check passes |
| Already present, differs, not touched | a pass if the file serves its purpose; mention in notes.md "differs from template" only when the difference weakens safety (for example a `.gitignore` without `.env.*`) |
| Missing (would be created) | finding, with the get-started step in `remediation` |
| Needs a human decision (Settings, license, owners) | finding with `tags: ["get-started:human-decision"]`, or a cap when the audit cannot see it |

Never write templates, install personal instructions or invent an initialization marker. Report observed present/different/missing against the actual selected convention.

## Step names used in remediation text

| Step tag | Meaning | Source guide |
| --- | --- | --- |
| `get-started:step-3.1` | `.gitignore`, `.editorconfig`, `.nvmrc`, `.env.example` | guides/01, 04 |
| `get-started:step-3.2` | `.github/`: `ci.yml`, `codeql.yml`, `dependabot.yml`, CODEOWNERS, issue and PR templates | guide 02 |
| `get-started:step-3.3` | `README.md` from template | guide 03 |
| `get-started:step-3.4` | `CONTRIBUTING.md`, `SECURITY.md`, `CHANGELOG.md` | guides 05, 06 |
| `get-started:step-3.5` | `library/` tree from templates | guides 01, 07 |
| `get-started:step-6` | project-notebook pass over existing code | guide 01 step 6, guide 08 |
| `get-started:guide-04` | Secret Protection and Push Protection (Settings) | guide 04 |
| `get-started:guide-05` | husky or lefthook, Conventional Commits, commitlint | guide 05 |
| `get-started:guide-06` | branch protection or ruleset, CodeQL setup choice | guide 06 |
| `get-started:human-decision` | license, owners, security email | guide 07 |

## What a healthy initialized repository contains

Selected Project Notebook convention: `library/README.md`, `library/knowledge/{public,private}`, `library/knowledge/private/{architecture,standards,contracts}`, `standards/documentation-framework.md`, `library/requirements/{backlog,in-work,completed,reports}`, `library/issues/{backlog,in-work,completed}`, each with a README. The human-only notes area is outside all agent read/write scope.


Settings-only (read through the API, or capped): branch protection or ruleset (PR, status checks, Code Owner review, no force push), Secret Protection and Push Protection, CodeQL default setup, license.

## Where the baseline is silent

- Repository-level `AGENTS.md` or `CLAUDE.md`: Assess actual repository-local Claude Code context. No home/global rule installation or discovery is part of review.
- Tests and test quality: ci.yml assumes a test command exists; get-started does not create tests.
- Lockfile consistency, runtime end-of-life, committed secrets: outside its templates. These come from the research extension (guide 03).

## Existing-code detection (copy of get-started's rule)

A manifest at the root among Cargo.toml, Gemfile, go.mod, mix.exs, package.json, pyproject.toml, pom.xml, or any tracked file with a source suffix outside .git, .next, .svelte-kit, .venv, build, coverage, dist, docs, library, node_modules, target, vendor, venv. `foundation_scan.py` uses the same rule so the audit use a consistent source-only inventory.

Read [the operating boundaries](../boundaries.md) before interpreting executable examples.
