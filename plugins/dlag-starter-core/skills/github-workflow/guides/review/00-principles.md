# 00 - Principles: Code Review as Culture

> Local review scope: inspect supplied diff/description/timeline exports and return draft descriptions, checklists, coached comments or findings in chat. Do not execute commands, call GitHub APIs, post comments, approve/merge, configure settings, install dependencies or save files through this read-only role. Example people, issues and checks are illustrative, not actual test or publication evidence. A separate authorized caller owns any external action.

The three axioms, the three-tier comment taxonomy, the six-element description structure, and the scope boundaries that make `GitHub Workflow` useful and safe.


---

## The three axioms

### Axiom 1: Small PRs are a forcing function for good design

Large mixed changes can make review harder. Use a configurable 400 changed-line threshold to prompt scope analysis, not as proof of a defect rate or an automatic merge blocker. Count generated/mechanical changes separately where evidence supports that distinction and inspect logical concerns, risk, ownership and dependencies. No precise DORA/AI-review-time or defect-detection percentage is established by this method. See the complete small-PR guide.

### Axiom 2: A PR description is a first-class communication artifact

A reviewer should never need to schedule a call to understand what a PR does and why. The PR description is the asynchronous brief. A description that explains motivation, context, what changed, what did NOT change, testing proof, and reviewer hints gives reviewers the context to do their job without interrupting the author. A complete description reduces missing-context exchanges; no fixed review-time improvement is established here.

### Axiom 3: Review comments have tiers; ambiguous comments erode trust

A comment that does not state its tier forces the author to guess whether it must be fixed before merge or can be addressed in a follow-up. Ambiguous comments are the primary driver of review friction and rework. The canonical three-tier taxonomy (blocker / suggestion / nit) with two optional intent labels (question / praise) creates shared vocabulary that makes every comment actionable. See `guides/06-comment-coaching.md`.

---

## The three-tier comment taxonomy (canonical)

| Tier | Prefix | Meaning | Author action |
|---|---|---|---|
| 1 | `blocker:` | Must fix before merge. Correctness, security, design invariant, or contract violated. | Mandatory |
| 2 | `suggestion:` | Worth doing, but not a merge gate. Better design, improved readability. | Author's call |
| 3 | `nit:` | Cosmetic. Style, naming, formatting. Low stakes. | Optional |
| + | `question:` | Seeks understanding. No change implied. | Answer only |
| + | `praise:` | Names something done well. Reinforces good patterns. | No action needed |

**Decision rule:** If you would block the merge over this, it is a `blocker:`. If you would let it merge but think it should be addressed, it is a `suggestion:`. Everything else is a `nit:` or `question:`.


---

## The six-element PR description structure

Every PR description the reviewer produces contains exactly these six elements. See `guides/01-pr-description.md` for the full authoring guide.

1. **Motivation** -- Why does this PR exist? What problem does it solve?
2. **Context** -- What background does the reviewer need?
3. **What changed** -- Human-readable summary of the diff.
4. **What did NOT change** -- Explicit scope boundary. Names what was intentionally excluded.
5. **Testing proof** -- How was this validated?
6. **Reviewer hints** -- Where to focus; what to probe.

---

## Scope boundaries

**This reviewer owns:** PR descriptions, review checklists, review comment quality, PR size evaluation, async review norms, rubber-stamp detection, review culture metrics.

**Handoff triggers:**

| Request | Route to |
|---|---|
| Security vulnerabilities found in the diff | `Security Review` |
| Logic correctness issues in TypeScript/Node code | `the authorized implementation owner` |
| Supabase/Postgres dataset schema or recall query issues | `the accepted database owner` |
| CI pipeline design or CI failure investigation | `the authorized CI owner` |
| Branch protection rules, CODEOWNERS, PR template enforcement | `the authorized repository-settings owner` |

---

## The review-as-mentorship lens

The highest-leverage code review is one where both the reviewer and the author learn something. Source: the supplied dated evidence.

**Reviewer heuristics:**
- Comment about code, not the developer. "This function has O(n²) complexity" not "You wrote an O(n²) function."
- Ask questions instead of making demands. "Have you considered caching here?" instead of "You need to cache this."
- Name good decisions explicitly (`praise:` tier). Positive reinforcement shapes culture faster than criticism alone.
- Teach the "why". A `suggestion:` comment with a link to an ADR or doc is worth 10x more than the same comment without context.

**Anti-patterns to flag:**
- One-word approvals ("LGTM", "looks good") on PRs with no other comments.
- Rapid approvals (< 5 minutes for a 300+ line PR).
- The same reviewer always approving the same author with no meaningful comments.
- Comments framed as personal attacks rather than code observations.

See `guides/05-rubber-stamp-detection.md` for detection methodology.
