All findings below are constructed teaching specimens, NOT_RUN. Replace every observation with actual source/receipt evidence. A pattern cannot establish that a credential works; never use it.

# Finding templates for reviewer-written findings

The scanner writes most findings. The reviewer writes the rest as JSON lines in `judgment.jsonl` and resolves every `needs-review` tag. All text follows the contract and the pack writing rules: plain language, no em or en dashes, no secret values, repo-relative paths.

## Resolve a scanner finding after reading it

```json
{"id":"FND-ENV-009","_action":"update","confidence":"possible","severity":"medium","tags":["handoff:Security Review"],"verified_by":"Read a supplied redacted source excerpt: the suspected token is assigned to a credential variable. Its shape and use do not prove current validity, authorization or exposure impact; no credential was opened or tested."}
```

```json
{"id":"FND-ENV-009","_action":"drop","reason":"All four hits are regex literals inside scripts/validate.py and a report that quotes them; no credential."}
```

A dropped scanner finding goes in `notes.md` under "Not confirmed" with the reason, so the reader can see it was examined.

## New judgment findings (ids from 050)

Failing tests (after `run_in_copy.py`):

```json
{"id":"FND-TEST-050","dimension":"foundation","source":"quality-review-foundation","title":"11 of 240 automated tests fail on a clean copy of the repository","severity":"medium","confidence":"confirmed","locations":[{"path":"package.json"}],"evidence":"npm test in the scratch copy exited 1 after 3.2s. Log: raw/tests.log. Parsed: 229 passed, 11 failed.","why_it_matters":"A red test suite means nobody can tell a new break from an old one, and agents cannot use the tests to check their own edits.","remediation":"Fix or quarantine the 11 failing tests listed in raw/tests.log (first failure: src/cart.test.ts). Keep the quarantine list in the README until fixed.","effort":"M","refs":["foundation/guides/02-ci-tests-lint-typecheck.md","openssf--best-practices-criteria"],"verified_by":"Ran the command in the throwaway copy with a 600 second limit; read the first failure to confirm it is a real assertion and not a missing service.","tags":["openssf:test"]}
```

Swallowed CI failures:

```json
{"id":"FND-CI-050","dimension":"foundation","source":"quality-review-foundation","title":"The test step in CI can fail without turning the build red","severity":"medium","confidence":"confirmed","locations":[{"path":".github/workflows/ci.yml","line_start":31,"line_end":33}],"evidence":"31:      - run: npm test\n32:        continue-on-error: true","why_it_matters":"Broken tests will look like a passing build, so the green check means nothing.","remediation":"Remove continue-on-error from the test step in .github/workflows/ci.yml, or move known-flaky tests to a separate non-blocking job.","effort":"S","refs":["foundation/guides/02-ci-tests-lint-typecheck.md"],"verified_by":"Read the whole job; no later step re-checks the result."}
```

Instructions that contradict the repo:

```json
{"id":"FND-AGENT-050","dimension":"foundation","source":"quality-review-foundation","title":"The agent instructions say to use pnpm but the repo is locked with npm","severity":"low","confidence":"confirmed","locations":[{"path":"AGENTS.md","line_start":8,"line_end":9},{"path":"package-lock.json"}],"evidence":"AGENTS.md:8 'Install with pnpm install'; root has package-lock.json and no pnpm-lock.yaml.","why_it_matters":"An agent following the file will create a second lockfile and change every dependency version.","remediation":"Change AGENTS.md lines 8 and 9 to npm ci and npm test, or migrate to pnpm and delete package-lock.json.","effort":"S","refs":["foundation/guides/01-project-readiness.md"],"verified_by":"Compared the instruction to the root lockfile list."}
```

## Wording rules

- Title: one plain sentence a founder understands. No tool names unless the reader needs them.
- Evidence: the thing seen. Code excerpts at most 15 lines. Command output quoted, never paraphrased. Env values never shown; keys only.
- `why_it_matters`: the consequence for this codebase.
- `remediation`: name the file and the change. For anything get-started would create, add the step (for example "Build Studio project-setup step 3.2, templates/.github/dependabot.yml"). For Settings items say "a human with admin rights does this under Settings".
- `refs`: guide path or raw file stem inside this method, plus standard ids such as `scorecard:Token-Permissions`.

Read [the operating boundaries](../boundaries.md) before interpreting executable examples.
