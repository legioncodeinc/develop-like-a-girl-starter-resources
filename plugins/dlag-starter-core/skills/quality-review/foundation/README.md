# foundation

Read-only repository health audit: Build Studio setup and AI agent readiness, CI, tests, lint and typecheck, lockfiles, secrets hygiene, and governance. It never edits the repository.

## When to use

- A bounded owner-requested repository foundation assessment
- "Is this repo set up properly?", "is it ready for AI agents?"

## Evidence form

Chat report; an authorized caller may save outside assessed source: `findings.jsonl`, `metrics.json` and `notes.md`.

## Start here

- [Complete procedure](playbook.md) and [operating boundaries](boundaries.md)
- [Local typed finding/measure contract](references/foundation-output-contract.md)

## Guides

- [00-scoping-and-read-only-rules](guides/00-scoping-and-read-only-rules.md)
- [01-project-readiness](guides/01-project-readiness.md)
- [02-ci-tests-lint-typecheck](guides/02-ci-tests-lint-typecheck.md)
- [03-dependencies-lockfiles-secrets](guides/03-dependencies-lockfiles-secrets.md)
- [04-repository-governance](guides/04-repository-governance.md)
- [05-writing-metrics-and-findings](guides/05-writing-metrics-and-findings.md)

Designed and built by Legion Code Inc. Licensed under AGPL-3.0-or-later.

Read [the operating boundaries](boundaries.md) before interpreting executable examples.
