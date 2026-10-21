# 07: Critique, run the gates, then show the owner

Goal: score the work honestly against the approved direction before the owner sees it, fix in bounded rounds, then get Gate B.

Role boundary: Project Planning writes only authorized local Markdown. HTML/React creation, browser activity, shell execution, JSON writes, file/archive copying or extraction and external uploads require an appropriately authorized caller. Use `dlag-starter-core:design-foundation` for actual UI implementation; if the needed caller or tool is unavailable, save the specification with that step unrun.

Grounding: design critiques, visual hierarchy, empty states, error messages, WCAG 2.2, optional installed detector and bounded passes (local Build Studio direction, critique and ownership rules). Distilled: [section 4](../references/research/distilled-product-design.md).

## 1. Prepare evidence

- Screenshots of every key screen at 1440 and 390 wide, light and dark, plus each non-success state once.
- A blurred view (about 10 px) of each screen for the hierarchy check.
- Contrast ratios for every token pair in the accessibility baseline, both themes. Compute them; do not eyeball.

## 2. Run the detector

Only an authorized execution caller may use an already installed detector. The local-binary example below never fetches a package; if the binary is absent, report unavailable and apply the local rubric manually.

```bash
./node_modules/.bin/impeccable detect library/knowledge/private/product/design/prototypes/
```

- Exit 0: clean. Exit 2: findings; fix them or add the narrowest waiver with a written reason. Exit 1: the command failed; record the error.
- If Impeccable is not installed, say "detector not available" in the critique file and apply the local [critique rubric](../references/templates/critique-rubric.md) and [prototype taste guardrails](06-build-prototypes.md#taste-guardrails-they-feed-the-anti-slop-score) manually; this does not claim the detector's complete rule set ran. Do not install tools without the owner's go-ahead.
- If `DESIGN.md` exists at the repo root, the detector also flags fonts, colors, radii and sizes outside it. Treat those as real drift, not noise.

## 3. Score

Copy [critique-rubric.md](../references/templates/critique-rubric.md) to `design/critique/<YYYY-MM-DD>-round-<n>.md`. Score each of the seven dimensions 0 to 4 with evidence (file, element, observation) and a concrete fix. Fill the accessibility blocker table.

Scoring discipline:

- Score against the approved direction and each screen's job, never against personal taste.
- The author does not give the final score alone when a second reader exists: in a multi-agent session ask the orchestrator for a fresh reviewer (for example a separate agent with this rubric and no authoring context).
- Never round up to pass.

## 4. Fix in bounded rounds

1. Fix everything round 1 found, in one batch.
2. Re-run the checker, the detector and the affected scores (round 2).
3. Stop after round 2 even if the bar is not met. Show the owner with honest scores and the open fixes. Open-ended self-polishing wastes the owner's money and hides decisions they should make.

## 5. Gate B: owner approval

Show the owner:

- `prototypes/index.html` (how to open it: double-click)
- the latest critique file's owner-facing summary and scores
- the open questions that block planning

Record the decision in the README approvals log. "Approved with changes" means one more bounded round on the named changes only, then record approval again. Status moves to `owner-approved` only after this record exists.
