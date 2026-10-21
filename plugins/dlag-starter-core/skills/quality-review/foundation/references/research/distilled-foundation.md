# Distilled research: foundation

Research window 2026-03-30 to 2026-09-30. This is a method reference, not current research proof. The full local guides define checks and limits; current official support, service availability and scoring criteria require actual dated evidence. No external archive is required.

## 1. What a correctly set up repository has (the Build Studio baseline)

| Item | Detail | Source |
| --- | --- | --- |
| Copy order | foundational files, then .github, README, CONTRIBUTING/SECURITY/CHANGELOG, then library/ |  |
| Project Notebook schema v2 | knowledge (public, private), requirements (backlog, in-work, completed, reports), issues (backlog, in-work, completed), notes; lifecycle is the folder |  |
| Settings-only items | branch protection or ruleset, secret protection and push protection, CodeQL default setup, license choice |  |
| Gap in the baseline | Only actual repository-local context is assessed; personal home/global rules are excluded |  |
| Read-only repo-health calls | protection, rules for branch, rulesets; declare API scope; local-only mode cannot see branch protection |  |

An audit built on get-started must never repair: get-started itself never overwrites a maintainer's file and reports "differs, not touched" .

## 2. OpenSSF Scorecard: what a local clone can and cannot assess

| Check | Risk | From a clone? | Notes | Source |
| --- | --- | --- | --- | --- |
| Binary-Artifacts | High | Yes | generated executables in source |  |
| License | Low | Yes | LICENSE, LICENCE, COPYING, COPYRIGHT or LICENSES/ |  |
| Security-Policy | Medium | Yes | SECURITY.md with contact or text |  |
| Token-Permissions | High | Approximate from workflow files | top-level read-only plus per-job write |  |
| Pinned-Dependencies | Medium | Approximate from workflow, Docker, scripts | |  |
| Dangerous-Workflow | Critical | Approximate from workflow files | pull_request_target or workflow_run with untrusted checkout; script injection |  |
| Dependency-Update-Tool | High | Config file only | detects Dependabot or Renovate; does not prove it runs |  |
| Branch-Protection | High | No, needs API | tiered 3 to 10 |  |
| Code-Review, Maintained, Vulnerabilities, Signed-Releases, Contributors, CII-Best-Practices, SAST, Fuzzing, Packaging, SBOM, CI-Tests, Webhooks | mixed | No (history, API or release data) | out of scope for local file checks; SAST and CI-Tests can be hinted from workflow files |  |

The Scorecard CLI has a `--local` mode that skips checks needing the host API but the README does not list which, so any official local run must be read check by check . A GitHub token is needed for `--repo` mode to avoid rate limits . The Build Studio "Scorecard aligned" measure is an approximation built from file checks and is never reported as an official score.

## 3. Read-only GitHub API facts the audit relies on

- Branch protection endpoint needs admin; 404 means no classic rule (or no branch), so pair it with the rules-for-branch endpoint before saying "unprotected"; 403 is a cap .
- Rules for a branch lists active rules from every source; evaluate or disabled rules are excluded .
- Workflow runs can be filtered by branch, status and excluding pull requests; conclusion is on each run .
- Repository response carries default_branch, archived, pushed_at; security_and_analysis only shows to admins, owners or security managers .
- Community profile gives health_percentage and per-file presence .
- Public repos get secret scanning free; private need Secret Protection; the alerts API was not confirmed in the fetched page so it is not called .
- `gh api` defaults to GET; pass `--method GET` explicitly; 4xx and 5xx exit non-zero (read the message, do not assume) .

## 4. CI, tests, lint

- Pin actions to a full commit SHA; set GITHUB_TOKEN read-only by default and raise per job; keep untrusted expressions out of `run:`; avoid untrusted checkout under pull_request_target or workflow_run .
- Token-Permissions rewards read-only top-level with job-level writes; one point lost when top-level is undefined .
- OpenSSF passing criteria: a working build; an automated test suite invoked in a standard way; tests run in CI; a policy that new functionality gets tests; compiler or linter warnings enabled and fixed .
- Thin spot: the exact npm init placeholder test script ("Error: no test specified") is not in the fetched npm page, so the check is labeled a Build Studio heuristic .

## 5. Dependencies, lockfiles, runtime pins

- `npm ci` errors when package.json and the lock disagree and never writes the lock; so it is a consistency test . pnpm `--frozen-lockfile` fails when the lock is missing or out of date and defaults on in CI . uv says uv.lock should be committed .
- Dependabot file lives at .github/dependabot.yml or .yaml and needs version 2, updates, package-ecosystem, directory and schedule.interval . Alerts and security updates are repository settings, so no file does not mean no alerts . Renovate config can be in 14 places; Renovate stops at the first match and package.json config is deprecated .
- Runtime support: historical support snapshots are not current evidence. Automatic historical EOL findings are disabled; inspect exact pins against dated official evidence.
- Python: `requires-python` is a floor rather than a pin; inspect `.python-version` separately. Current support needs actual official evidence.
- `.nvmrc` holds exactly one version; accepts versions and `lts/*` . package.json `engines` is advisory unless engine-strict .

## 6. Secrets hygiene

- `.gitignore` never untracks already-tracked files; `git rm --cached` does; `git check-ignore --no-index` tests paths that do not exist .
- Get-started's `.gitignore` template ends the `.env` block as `.env`, `.env.*`, `!.env.example`, in that order .
- Secret pattern formats in the scanner (AWS AKIA, GitHub ghp_, Stripe live keys, private-key blocks and so on) are widely documented vendor token shapes but were not archived from a primary page; they are Build Studio heuristics and every hit must be read before it is trusted.

## 7. Agent readiness

- AGENTS.md: plain Markdown, build and test commands, style, tests, security, nested files with closest-wins; supported by 25+ tools .
- Claude Code: inspect actual repository-local instruction loading and content. An AGENTS.md filename or missing import alone does not prove loading or conflicting rules. Keep always-needed rules concise and move applicable scoped detail into project-local resources.
- The 1,000-line oversized-file threshold is a Build Studio heuristic with no published source.

## 8. Governance

- CODEOWNERS: three locations in order; 3 MB limit; `!`, `\#` and `[ ]` do not work; only gates merges when review by owners is required; own `/.github/CODEOWNERS` .
- Branch protection floor per the Build Studio repo-health skill: PR with review, required status checks, block force push; nice to have stale-review dismissal, linear history, signatures . Scorecard tiers go from 3/10 for blocking force push to 10/10 with stale-review dismissal and admin review .

## Conflicts and thin spots

1. Node EOL dates (section 5), unresolved.
2. No primary source archived for token regexes, npm placeholder script text, or the 1,000-line threshold; all three are labeled heuristics.
3. Scorecard `--local` skipped-check list is not documented in the fetched README.
4. Official Scorecard versions and criteria can change; record the actual version and evidence rather than treating this bundled topic map as current proof.
5. Secret scanning alerts API was not confirmed from a fetched page; the audit does not call it.

Read [the operating boundaries](../../boundaries.md) before interpreting executable examples.
