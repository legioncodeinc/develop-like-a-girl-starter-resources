# 01 - PR Description: Authoring and Auditing

> Local review scope: inspect supplied diff/description/timeline exports and return draft descriptions, checklists, coached comments or findings in chat. Do not execute commands, call GitHub APIs, post comments, approve/merge, configure settings, install dependencies or save files through this read-only role. Example people, issues and checks are illustrative, not actual test or publication evidence. A separate authorized caller owns any external action.

How to produce or audit a PR description using the six-element structure. Covers the anti-patterns to eliminate, the "What did NOT change" section design, and the scoring rubric.


Example: `examples/happy-path-pr-review.md`

---

## Authoring a new PR description

Use `templates/pr-description.md` as the fill-in stub. The six required elements:

### 1. Motivation (Required)
One to three sentences. Answers: "Why does this PR exist? What problem does it solve? What would happen if we did NOT merge it?"

Anti-patterns:
- "Refactoring" (no motivation given)
- "Fixes a bug" (which bug? what was the symptom?)
- Empty (no description at all)

### 2. Context (Required if non-obvious)
Background the reviewer needs before reading the diff. Examples: links to the GitHub issue, a related ADR, a prior PR this depends on, an architecture decision this implements.

When context is obvious and the PR is self-contained, this section can be omitted or reduced to one line.

### 3. What Changed (Required)
Human-readable summary of the diff. NOT the git commit log. One bullet per logical change. Keep each bullet to one sentence. If a bullet needs more than one sentence, it may be its own PR.

Template:
```text
- Added `X` to handle `Y`
- Removed `Z` (replaced by `X`)
- Updated `W` to align with `V` (see Context)
```

### 4. What Did NOT Change (Required -- novel section)
**This is the most commonly missing element.** It answers: "What might a reviewer look for that is intentionally NOT in this PR?"

Examples:
```text
- This PR does NOT change the database schema. That is tracked in #456.
- This PR does NOT update the admin panel. Admin is handled in a separate feature branch.
- Authentication is NOT modified; all existing session handling is preserved.
```

Why this matters: without it, reviewers spend time looking for something that is not there and cannot tell whether its absence is intentional or an oversight. This single section prevents most unnecessary review comments.

Source: this element is novel to this reviewer (not found in the research corpus). It fills a documented gap.

### 5. Testing Proof (Required)
How was this validated? Acceptable forms:
- CI/CD link (e.g., "All 342 tests pass: [CI link]")
- Screenshot (for UI changes)
- Manual test steps written out
- "No test added -- rationale: record the specific risk rationale and actual static/manual checks; config-only does not automatically mean low risk"

Explicitly stating "no test added" is acceptable; leaving testing blank is not.

### 6. Reviewer Hints (Required)
Where should the reviewer focus attention? Examples:
- "The core change is in `src/auth/middleware.py` lines 42-89. The other files are boilerplate imports."
- "Concerned about the lock timing in `queue.ts` -- please probe carefully."
- "Ignore the whitespace changes in `legacy.rb`; auto-formatted by Rubocop."

---

## Auditing an existing PR description

Run the audit table before proposing any rewrites. Emit pass/fail/warn per element:

| Element | Status | Notes |
|---|---|---|
| Motivation | PASS / FAIL / WARN | |
| Context | PASS / N/A / WARN | |
| What changed | PASS / FAIL / WARN | |
| What did NOT change | PASS / FAIL / MISSING | |
| Testing proof | PASS / FAIL / WARN | |
| Reviewer hints | PASS / WARN / MISSING | |

**Scoring:**
- 6 PASS / N/A = Excellent. No rewrite needed.
- 4-5 PASS = Good. Spot-fix the gaps.
- < 4 PASS = Rewrite recommended.

---

## Anti-patterns to eliminate

| Anti-pattern | Why it fails | Fix |
|---|---|---|
| Title = description | Provides no additional context | Add all six elements |
| "WIP" description | Signals incomplete thinking | Block merge until description is complete |
| Commit-log dump | Not readable; raw commits are noise | Rewrite in human terms per "What Changed" |
| No testing section | Reviewer cannot assess risk | Add "Testing Proof" even if no tests added |
| Scope creep signal ("also refactored X while I was there") | Mixed concerns = hard to review | Split PR; each concern in its own PR |

---

## The compounding returns of good descriptions

A complete description reduces missing-context exchanges; no fixed review-time improvement is established here.
