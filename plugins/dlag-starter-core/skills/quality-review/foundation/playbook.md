
# Code Foundation method

## Purpose

Assess whether the actual repository supports safe human and Claude Code work: documentation conventions, repository-local instructions, CI, test/lint/typecheck evidence, lockfile consistency, runtime support evidence, committed sensitive paths and repository governance. Read [boundaries](boundaries.md) first. The actual owner request defines scope. This is an evidence assessment; no optional framework, installation marker, service, audit suite or fixed output tree is mandatory. An authorized caller may produce the local [typed output](references/foundation-output-contract.md) outside assessed source, while this readonly role returns its findings in chat.

## When to use

- An owner requests a scoped source-grounded repository foundation assessment
- "Is this repo healthy?", "do we have CI and tests?", "will an AI agent be able to work in this repo?"
- Before a security or quality audit, to learn whether the build, tests and lockfile are sound enough to audit

## When not to use

- Setting the repository up or fixing what the audit finds: that is `project-setup` (writes files) or an explicitly authorized implementation owner
- Vulnerability analysis, exploitability, secret rotation: `Security Review`
- Duplicate, dead or bloated code: `the actual code-health owner`
- Implementation versus PRD checks: the full [accepted-scope Quality method](../quality/README.md)
- CI pipeline design depth: the actual CI owner; detailed GitHub settings scoring across eight dimensions: `github-workflow`
- README authorship: `github-workflow`

## Procedure

1. Read [guides/00-scoping-and-read-only-rules.md](guides/00-scoping-and-read-only-rules.md) first. It fixes the hard rules: never modify the audited repository, only a separately authorized caller may run project code in a disposable copy, GitHub access read-only, secrets redacted.
2. Establish the actual accepted source paths, candidate identity, exclusions and supplied evidence. Record available tool receipts and caps. No command is executable by this readonly role.
3. Read supplied scanner receipts, or inspect source directly. A separately authorized caller may use `scripts/foundation_scan.py --repo <repo> --out <evidence-dir>/raw/foundation_scan.json`; no Git subprocess, remote access, secret-pattern scan or project execution is on by default. Verify scope and caps before using any helper result.
4. Follow guides 01 to 04 in order, reading only what the scanner cannot judge and resolving every finding tagged `needs-review`: [01 Build Studio readiness](guides/01-project-readiness.md), [02 CI, tests, lint and typecheck](guides/02-ci-tests-lint-typecheck.md) (inspect receipts; an explicitly authorized caller may use `scripts/run_in_copy.py`), [03 dependencies, lockfiles and secrets](guides/03-dependencies-lockfiles-secrets.md), [04 repository governance](guides/04-repository-governance.md).
5. Follow [05 writing metrics and findings](guides/05-writing-metrics-and-findings.md): record judgment, measures and raw receipts. An authorized caller may use the optional assembler after resolving every review-required item; it validates and saves outside assessed source. Otherwise return the same structured information in chat.
6. Return a short report: verdict, counts by severity, measures in `at-risk` or `critical`, caps, output paths.

## References map

| Path | Load when |
| --- | --- |
| `guides/00-scoping-and-read-only-rules.md` | Every run, first |
| `guides/01-project-readiness.md` | Selected notebook and repository-local context checks |
| `guides/02-ci-tests-lint-typecheck.md` | Workflow review and running tests, lint, typecheck in the copy |
| `guides/03-dependencies-lockfiles-secrets.md` | Lockfiles, update automation, runtime pins, env files, secret-shaped strings |
| `guides/04-repository-governance.md` | README, license, CODEOWNERS, branch protection, Scorecard view |
| `guides/05-writing-metrics-and-findings.md` | Producing and validating the output files |
| `references/REFERENCE.md` | Map of every reference file |
| `references/foundation-checklist.md` | Every check id, default severity, owner, get-started step |
| `references/get-started-assess-map.md` | Naming the get-started step; what a healthy initialized repo has |
| `references/measures-and-bands.md` | Bands for every `metrics.json` measure |
| `references/scorecard-mapping.md` | Which Scorecard checks are approximated and how |
| `references/gh-readonly-calls.md` | Before any `gh` call |
| `references/detection-patterns.md` | Manual workflow, secrets, lockfile and agent-file checks |
| `references/runtime-eol-table.md` | End-of-life Node and Python pins |
| `references/finding-templates.md` | Writing judgment findings |
| `references/research/distilled-foundation.md` | Verifying a claim or resolving a conflict |
| `scripts/foundation_scan.py` | Step 3: deterministic scan, read-only |
| `scripts/run_in_copy.py` | Running project commands in the throwaway copy only |
| `scripts/assemble_foundation.py` | Step 5: validate and write the three output files |
| `scripts/test_foundation.py` | After any script edit: `python3 scripts/test_foundation.py` |

## Local handoffs and evidence

Use [Project Setup](../../project-setup/SKILL.md) for authorized initialization, [Project Notebook](../../project-notebook/SKILL.md) for documentation, [GitHub Workflow](../../github-workflow/SKILL.md) for repository/history work, [Security Review](../../security-review/SKILL.md) for actual exposure and the [full Quality method](../quality/README.md) for acceptance verification. Capability availability never grants execution or external effects. Read the [reference map](references/REFERENCE.md) for all full checklists, examples, thresholds and optional helper contracts.

Read [the operating boundaries](boundaries.md) before interpreting executable examples.
