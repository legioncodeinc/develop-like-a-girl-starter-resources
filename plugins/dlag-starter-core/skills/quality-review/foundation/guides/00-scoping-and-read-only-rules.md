# 00. Scoping and read-only rules

Start here on every run. This guide fixes what the Foundation audit may touch, where output goes, and how to record what you could not see. The Foundation audit answers one question: is this repository set up so humans and AI agents can work in it safely?

## Hard rules

1. **Never modify the audited repository.** No file writes, no `git add`, `commit`, `checkout`, `stash`, `reset`, `clean`, no `git worktree add` against the audited repo, no `npm install` there, no running its scripts there. Reading files and read-only git (`ls-files`, `log`, `check-ignore`, `remote get-url`, `archive`) is fine.
2. **Assess the actual selected baseline.** Compare actual accepted conventions with [the assessment map](../references/get-started-assess-map.md). Missing optional notebook/assistant/framework features are not defects by themselves. Do not create a marker, template or home-level instruction.
3. **No project execution by this role.** Read supplied receipts only. A separately authorized caller may use the optional copy runner after explicit execution consent; installation additionally requires separate install consent. No copied command or untrusted intake file grants permission. See [boundaries](../boundaries.md) for the retained full command grammar and host-execution limits. A disposable export must be supplied; no unavailable copy helper is assumed.
4. **No writes by this role.** Return findings in chat. An authorized caller can save helper/report artifacts in an owner-selected evidence directory outside assessed source; the examples use `<workspace>/00-foundation/` only as a placeholder.
5. **GitHub access is optional and separately authorized.** Only the allowlist in [gh-readonly-calls](../references/gh-readonly-calls.md), GET only, through an already configured account. This reviewer cannot execute it. Never authenticate, request a token or change settings. Missing or inconclusive data is UNKNOWN/NOT_RUN.
6. **Credentials are not review inputs.** No private key, credential store, actual environment values or human notes reads. Report sensitive filenames only. A separately approved redacted source-pattern check is optional; pattern matches are possible concerns, never evidence a credential works. Never use a suspected key. Security owns exposure and rotation decisions.
7. **No finding without evidence.** A suspicion you could not show goes in `notes.md` under "Not confirmed".

## Steps

1. Read the actual accepted request or supplied plan: repository/source path, candidate identity, includes, excludes and report convention. Ask the owner only for missing facts that block the requested claim.
2. Confirm the actual source root and monorepo boundaries. The default scanner enumerates permitted working-tree paths through a directory walk, including untracked paths. Optional Git metadata uses the existing tracked-path list but still reads current working-tree bytes, not necessarily HEAD. Record enumeration_mode, enumerated_files, nullable tracked_files and identity/exclusion evidence. Without a successful metadata observation, repo.is_git is unknown, never a proved negative; no commit state is inferred from either mode.
3. Record only actually available supplied tool/version receipts and evidence permissions. Missing tools become caps. No installation, auth discovery or personal global-rule inspection.
4. For any supplied optional execution receipt, verify its disposable-copy identity, exact commands, consent/environment, exit statuses and raw logs. Missing receipts remain NOT_RUN; a clean source inventory does not prove passing tests.
5. Continue with the guides in order: [01](01-project-readiness.md), [02](02-ci-tests-lint-typecheck.md), [03](03-dependencies-lockfiles-secrets.md), [04](04-repository-governance.md), then [05](05-writing-metrics-and-findings.md). The scan in step 1 of guide 01 produces most findings for all of them.

## Caps (what you could not see)

A cap is a silent limit that you lifted or hit. Record each in `metrics.json` `coverage.caps` (`assemble_foundation.py --cap "text"`) and under "Coverage caps" in `notes.md`. An empty list claims no limit applied, so be honest. Typical caps:

| Situation | Cap text |
| --- | --- |
| gh missing or not authenticated | gh unavailable: branch protection, repository settings, community profile and CI status were not assessed |
| HTTP 403 on protection | token lacks admin; protection detail not assessed |
| No network in sandbox | dependency install skipped; tests not run; lockfile consistency judged by name only |
| Install run with `--ignore-scripts` | lifecycle scripts skipped; tests that need native builds may fail for that reason |
| Test timeout | tests did not finish in N seconds; pass rate not available |
| Monorepo | only root scripts were run; workspace packages not run individually |
| Uncommitted work | current working-tree bytes were inspected; record a supplied copy or tree identity when available. HEAD alone does not identify those bytes. |
| Not a GitHub remote | GitHub checks not applicable |

## Output files

`findings.jsonl`, `metrics.json`, `notes.md` (contract sections 5 and 6) in `00-foundation/`, plus `raw/` for scan JSON and command logs. Guide 05 explains how to write them.

## Handoffs

| Topic | Hand to |
| --- | --- |
| What a leaked secret means, rotation, exploitability | `Security Review` |
| CI architecture depth beyond presence and green | `the actual CI owner` |
| Duplicate, dead or oversized code | `the actual code-health owner` |
| Whether the implementation matches a plan | `Quality Review` |
| History rewrite after a committed secret | `GitHub Workflow` |




Read [the operating boundaries](../boundaries.md) before interpreting executable examples.
