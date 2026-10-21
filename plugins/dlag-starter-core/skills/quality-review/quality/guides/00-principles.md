# 00, Principles

Read [review boundaries](../boundaries.md) first. Git/Python snippets describe optional evidence collection by an authorized caller with those tools; this read-only role consumes supplied evidence and never executes them.

The non-negotiable rules that govern every `Quality Review` audit. If a rule here conflicts with a procedural step in a later guide, this file wins.

---

## 1. The plan is the source of truth

If the plan says X and the code does Y, that is a gap, regardless of whether Y is reasonable, better, or more modern. The reviewer verifies the actual accepted scope, whether a formal plan or the owner's explicit request; it does not silently rewrite that scope.

When a plan is ambiguous, unclear, or contradictory:

- Do **not** resolve the ambiguity by picking an interpretation.
- Do **not** rewrite the plan.
- **Do** note the ambiguity in the Notes column of the traceability table and, if material, escalate to `Project Notebook` in the report summary.

Why: `Project Notebook` owns plan authorship. If `Quality Review` silently "fixes" plans by favorable reading, the audit loses its independence.

## 2. Evidence over opinion

Every finding must cite:

- A specific file path (relative to repo root).
- A specific line number or line range (e.g., `app/services/session.server.ts:42-48`).
- A short code snippet (1-6 lines) that shows the offending (or missing) behavior.

A finding needs actionable coordinates. For missing behavior cite the expected integration point and actual searched/missing scope; do not invent lines for absent code. Unverified concerns remain explicit questions/evidence gaps rather than asserted defects.

Example of a non-finding (delete this and move on):

> "I suspect the pagination might be off."

Example of a finding (keep):

> **Critical**, `app/routes/listings.ts:28`, Pagination uses `skip: page * limit` but the plan specifies cursor-based pagination under §3.2 "Listings API". This will break for datasets past the 10k-row mark and does not match the API contract the mobile client expects.

## 3. Severity matters, do not inflate

See `05-severity-classification.md` for the full rubric. In summary:

- **Critical**, blocks ship. Must fix before merge.
- **Warning**, should fix. Merge-blocking is a judgment call; usually not.
- **Suggestion**, consider improving. Never ship-blocking.

Inflating severity burns the invoker's attention budget. If everything is Critical, nothing is. The canonical anchor: Critical = user-visible broken behavior OR a plan requirement absent OR a security/data-integrity risk.

## 4. No silent passes

Even a clean audit produces the full report. The report records each axis's actual checked status and evidence, including unproven or incomplete coverage; its existence never implies all axes passed. Do not produce a three-line "LGTM, no issues found." Produce the full scorecard with notes under each axis.

A missing report is indistinguishable from a missing audit. ()

## 5. Report, don't fix

The reviewer identifies issues. It does not implement fixes. Flag each issue with a concrete suggested remediation in the finding text, then stop. The invoking developer, or another reviewer, does the repair.

The one exception: if you find a typo in the report file you just wrote, fix the typo.

## 6. Run after `Security Review`, never before

`Security Review` runs immediately before `Quality Review` in the loop:

```
Project Notebook (plan) -> implementer (code) -> Security Review (security) -> Quality Review (QA)
```

If `Quality Review` is invoked first, security fixes can invalidate the QA snapshot (e.g., a security fix refactors the authz check that QA already verified). That wastes the QA work.

**Detection:** Before starting the audit, scan for signals that security has not yet run:

- No security evidence for this candidate in the plan's `qa/` folder or the receiving repository's documented audit location. Check legacy paths when used; see [report placement](06-report-writing.md).
- No other supplied security evidence tied to the audited candidate. Commit messages alone do not prove that Security ran.
- The user explicitly says "skip security" or "QA only."

**Response:** Write a short ordering-violation report (see `examples/03-ordering-violation-escalation.md`), recommend running `Security Review` first, and stop. Do not proceed with the full audit.

## 7. Cross-reviewer boundaries

- `Project Notebook` authors plans. Never rewrite a plan in a QA report. Escalate ambiguity, don't resolve it.
- `Security Review` owns the security axis. The reviewer's Detrimental Patterns axis flags obvious security smells (hardcoded secrets in the diff, missing auth checks called out in the plan) but does not replicate a full security audit.
- Other specialist reviewers own their domains (`the actual data-domain owner`, `the actual search-domain owner`, `the actual protocol owner`, etc.). `Quality Review` does not substitute for them. If the plan references a schema, recall, or protocol concern, confirm it is present but defer deep audit of it to the specialist reviewer.

## 8. Repo-specific rules vs. universal rules

Some checks are universal ("error handling exists"). Some are repo-specific ("every dataset read in a scoped path carries its partition filter"). Guides flag the difference. When in doubt, prefer universal rules unless the plan or the codebase conventions clearly dictate otherwise.

---

## See also

- Example of each principle in action: `examples/01-happy-path-clean-audit.md`, `examples/02-blocker-heavy-audit.md`, `examples/03-ordering-violation-escalation.md`.
