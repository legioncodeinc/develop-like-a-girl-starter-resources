# 05 - CI Workflow Density Audit

> Evidence-only audit: this role uses supplied local files and dated owner-provided settings/API/run exports. It does not execute Git/gh/shell, authenticate, request tokens, contact GitHub, run workflows, inspect credentials, write reports/settings or apply fixes. Commands and API shapes below are proposals for a separate authorized collection owner. Missing evidence is unknown/N/A, never proof of an absent or perfect control. Examples are illustrative, not actual repository findings.


> **Scope boundary:** This guide audits workflow *presence and density* - are the right stages configured, and are they triggered correctly? It does NOT audit workflow architecture (reusable workflow design, release pipeline, OIDC, cache backends, cross-node matrix). Hand those to `the authorized CI implementation owner`.

## What to inspect

For each workflow file in `.github/workflows/`:

1. **Triggers:** `push`, `pull_request`, `schedule`, `workflow_dispatch` - are the right events covered?
2. **Stage coverage:** Does the workflow have at least lint, test, and build stages?
3. **Missing stages:** Security scan, dependency review, E2E tests, type check?
4. **Timeout settings:** Missing timeouts allow runaway jobs.
5. **Artifact retention:** Are build artifacts retained for debugging?
6. **Required status check alignment:** Are the workflows referenced in branch protection `required_status_checks`?

## Data collection

```bash
# List all workflow files
ls .github/workflows/

# List triggers for each workflow (inspect actual .yml/.yaml files)
for f in .github/workflows/*.y*ml; do
  echo "=== $f ==="; grep -A 10 '^on:' "$f"; done

# Check jobs in each workflow
for f in .github/workflows/*.y*ml; do
  echo "=== $f jobs ==="; grep '^  [a-z].*:$' "$f"; done
```

## Density scoring rubric

Apply this 0-10 rubric to the project's applicable verification pipeline, accounting for stages split across workflows. Utility/publication-only workflows are not automatically missing every PR gate. Declare the denominator and accepted required-stage policy. Unknown execution or remote enforcement is not a scored failure:

| Stage present | Points |
|---|---|
| Quality gate (project-declared format/lint/duplication where applicable) | +2 |
| Type check (`tsc --noEmit`) | +2 |
| Unit/integration tests (actual project unit/integration checks) | +2 |
| Build (actual React Router/Vite/Worker build path) | +2 |
| Security scan (CodeQL, dependency-review, Snyk) | +2 |

Deductions:
- No `timeout-minutes` on any job: -1
- Verification workflow demonstrably required by the agreed policy but not referenced in observed required_status_checks: -1 per workflow. Settings unavailable means unknown, not a deduction; publication/utility workflows need not be required PR checks.
- Workflow triggers only `push` to main (no PR trigger): -1

## Report section template

```markdown
### CI Workflow Density (Score: X/10)

**Workflows found:** 3 (ci.yaml, codeql.yaml, release.yaml)

| Workflow | Triggers | Quality | Type | Test | Build | Security | Timeout | In required checks |
|---|---|---|---|---|---|---|---|---|
| ci.yaml | pull_request | ✅ | ✅ | ✅ | ✅ | ❌ | ✅ | ✅ |
| release.yaml | push:tags | ❌ | ❌ | ✅ | ✅ | ❌ | ❌ | N/A |

**Findings:**
- RECOMMEND: Add `dependency-review` action to `ci.yaml` to block PRs that introduce vulnerable dependencies.
- RECOMMEND: Add `timeout-minutes: 20` to `release.yaml` jobs to prevent runaway publishes.
- HAND OFF: `the authorized CI implementation owner` - inspect `release.yaml` against the actual installed action and currently supported pinned revision; record version evidence and any publish-smoke-test gap.
```

## Handoff trigger

When findings include release-pipeline issues, workflow architecture improvements (reusable workflows, OIDC, cross-node matrix), or cache/runner optimization - explicitly name `the authorized CI implementation owner` in the finding and do not prescribe the solution. Example:
> "Workflow architecture issue: `ci.yaml` has a repeated-toolchain/runner architecture concern; record exact supplied evidence and route design work to the actual authorized CI owner."


For observable automation trust boundaries, job grants and exact candidate proof, use [guide 10](10-review-automation-permissions.md). That scoped hygiene pass hands vulnerability analysis to Security and architecture to the actual authorized CI implementation owner; it does not execute or repair workflows.

Clamp any assessed dimension to 0–10 after deductions. Declared jobs are not passing checks. Use the complete automation guide to preserve event, authority, provenance and exact candidate evidence.
