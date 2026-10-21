# Hand-offs and routing

This strategy method writes the strategy. It records when deeper research, pricing, acquisition or goals work needs an owner. Those dedicated specialists are unavailable in Starter. Mark the affected section `OPEN: needs [method/owner]` and continue independent strategy sections. Do not invent a dispatch or a research result. Actual external interviews, sends, provider changes and spend require their own task authorization.

## Calls out (this strategy method asks another owner for help)

| Need | Owner or method | When to call | What comes back into the strategy |
|---|---|---|---|
| Deeper ICP than an owner summary | an owner-designated customer research method (unavailable as a Starter specialist) | Owner is not the customer, B2B with an unclear buyer, or Q2.5 says yes | Link in section 2; best-fit segment and buying roles summarized in 3 to 5 lines |
| Competitor landscape | an owner-designated competitive research method (unavailable as a Starter specialist) | Q3.5 says yes, or the owner names more than 3 alternatives they cannot rank | Link in section 4; alternatives list and the gap we exploit |
| Interviews, assumption maps, experiments | the owner-designated discovery method (no separate Starter specialist) | The riskiest assumption needs a real test plan, or demand is untested | Link in section 8; test design and pass/fail thresholds |
| Real pricing work | an owner-designated pricing method (unavailable as a Starter specialist) | Owner wants more than a one-line hypothesis | Link under Pricing hypothesis |
| First acquisition channel | an owner-designated acquisition planning method (unavailable as a Starter specialist) | Owner asks "how do we reach them" | Not part of this doc; note the link in Open questions |

## Feeds (who reads this strategy next)

| Reader | Sections it needs | Contract |
|---|---|---|
| [local UX planning method](../../design/playbook.md) | 2 Who, 3 Job, 4 Positioning, 7 Version 1 | These sections must be filled or marked OPEN. Design must not add scope that section 7 lists as NOT in v1 without a new decision note |
| [Project Planning build-order method](../../SKILL.md) | 5 Bets, 6 Metrics, 7 Version 1, 8 Riskiest assumption | Planning sequences work so the riskiest assumption test comes first. Each planned item should name the bet or input it serves |

## Do not route here

| Request | Correct owner |
|---|---|
| A new feature idea while the product is mid-build | the owner's change review |
| Writing a PRD or IRD | `dlag-starter-core:project-notebook`, [local Playbook](../../../project-notebook/SKILL.md) |
| Writing or grading OKRs | an owner-designated goals method (unavailable as a Starter specialist) |
| Full competitor workbook or battlecards | an owner-designated competitive research method (unavailable as a Starter specialist) |
| Running customer interviews | the owner-designated discovery method (no separate Starter specialist) |

If a strategy session turns up a PRD-sized idea, record it under Open questions and hand it to `dlag-starter-core:project-notebook` after the strategy is saved. Do not write the PRD here.

## Output paths

| Artifact | Path |
|---|---|
| Strategy | `library/knowledge/private/product/product-strategy.md` |
| Decision notes | `library/knowledge/private/product/decisions/D-###-{slug}.md` |

These are proposed project-document homes. Honor accepted existing paths. When saving the strategy was expressly requested, create only the authorized Markdown and needed parent directories, check existing destinations, then read the result back. Do not ask again for the same permission. Use `dlag-starter-core:project-setup` or its [local Playbook](../../../project-setup/SKILL.md) when a full project-document scaffold is actually requested. Never overwrite another agent's in-progress file.
