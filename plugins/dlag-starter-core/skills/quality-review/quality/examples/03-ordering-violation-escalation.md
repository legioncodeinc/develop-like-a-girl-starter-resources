# Example 03, Ordering Violation (Invoked Before `Security Review`)

> Constructed source-review teaching specimen, NOT_RUN for any real app/provider. These are expected report forms, not actual Security/Quality review receipts. Referenced project paths/lines are illustrative. A positive source assessment assumes the full stipulated source and matching Security evidence; it cannot establish runtime or release readiness.

Demonstrates the reviewer's behavior when it detects it was invoked before `Security Review` ran. The reviewer does NOT proceed with a full audit, it writes a short ordering-violation report and halts.

**Illustrates guides:** `00-principles.md` rule #6 (Run after `Security Review`, never before).

---

## Input, Invocation context

User's message:

> "Hey, can you QA the work on the new admin export feature? I'm in a hurry, let's skip security this time."

Plan file: `library/requirements/<lifecycle>/prd-021-admin-export/prd-021-admin-export-index.md` (exists, covers an admin data-export feature).

Diff: ~240 lines across 6 files, including a new Worker request handler and a PostgreSQL records write.

Signals detected:

- No security report exists in `library/requirements/<lifecycle>/prd-021-admin-export/qa/` (e.g., `<date>-security-report.md`).
- No matching candidate-bound Security evidence supplied; commit wording is not execution proof.
- The user's message explicitly says "skip security."

---

## Output, Ordering-Violation Report

Written to `library/requirements/<lifecycle>/prd-021-admin-export/qa/2026-04-24-qa-report.md`.

```markdown
# QA Report: feature-021 admin-export, ORDERING VIOLATION

**Plan document:** `library/requirements/<lifecycle>/prd-021-admin-export/prd-021-admin-export-index.md`
**Audit date:** 2026-04-24
**Base branch:** `main`
**Head:** `feat/admin-export`
**Auditor:** Quality Review
**Status:** HALTED, Security Review has not run

## Summary

This audit was halted because `Security Review` has not run against this implementation. `Quality Review` runs after `Security Review` in the plan -> implement -> security -> QA loop; inverting the order wastes the QA pass, because security fixes routinely invalidate the QA snapshot (e.g., a security fix tightens the required server authorization gate, which `Quality Review` already verified). The feature touches a new Worker request handler and a PostgreSQL records write, both of which are exactly the surface area a security review must cover first.

## Recommended next step

1. Invoke `Security Review` against this exact candidate, including relevant dirty inputs.
2. Address any Critical security findings.
3. Re-invoke `Quality Review`. The full QA audit will run at that point.

## Why the "skip security" request was not honored

The ordering constraint is absolute per the `Quality Review` principles (see the reviewer's guide `00-principles.md`). No incident-frequency claim is needed: the actual gate lacks matching candidate evidence. Running QA on an un-securitied implementation produces a false-confidence green scorecard that masks real risk. If a security review is genuinely blocked (e.g., `Security Review` itself is broken), escalate that, don't route around it.

## What was NOT audited

- Completeness against `library/requirements/<lifecycle>/prd-021-admin-export/prd-021-admin-export-index.md`: not evaluated.
- Correctness of the implementation: not evaluated.
- Traceability table: not produced.
- Files Changed summary: not produced.

A full QA report will be generated when `Security Review` has completed and this skill is re-invoked.

## Signals detected

- No security report present in `library/requirements/<lifecycle>/prd-021-admin-export/qa/`.
- No matching candidate-bound Security evidence supplied; commit wording alone is irrelevant to proof.
- Invoking user requested "skip security this time."
```

---

## Why the audit looks this way

- **Halt instead of audit.** `guides/00-principles.md` rule #6 says: "If the reviewer detects it was invoked first, it flags the ordering violation and recommends re-running after security fixes land." This is that behavior.
- **Short report, not skipped entirely.** A missing report is indistinguishable from a missing audit (`00-principles.md` rule #4). Writing the ordering-violation report gives the invoker a paper trail.
- **Reports the claim limitation.** The supplied request does not contain matching Security evidence. The reviewer reports that evidence gap before giving a final gate verdict. The report states the missing evidence for this final-review claim; it does not override the user's authority.
- **No traceability table.** Because the full audit did not run, the table would be misleading (either empty or half-filled). Explicitly stating "not produced" is more honest than producing a partial table.
- **Filename matches a normal QA report.** `library/requirements/<lifecycle>/prd-021-admin-export/qa/2026-04-24-qa-report.md`, a re-run on the same date appends a slug suffix (per `guides/06-report-writing.md`); a re-run on a later date produces a sibling file. The title line makes the halt obvious either way.
