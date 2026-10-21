# Prepare discovery and evaluate supplied evidence

Use a single desired customer outcome to prepare interviews, map opportunities and assumptions, design the smallest test, and make one bounded recommendation from actual supplied evidence. Keep planned research, observed behavior and build approval separate.

## Load the complete method

Read [principles](guides/00-principles.md), [desired outcome](guides/01-desired-outcome.md) and [Opportunity Solution Trees](guides/02-opportunity-solution-tree.md) first. The [guide map](README.md) links the full cadence, five-act interview, DVFU assumption mapping, experiments, demand, decision and first-version methods, all templates and all three worked examples.

## Follow the discovery sequence

1. Define one customer-centric, measurable and product-influenceable desired outcome. Use the four-question protocol before mapping opportunities.
2. Create or update the [OST](templates/opportunity-solution-tree.md). Opportunities require actual interview evidence; do not invent quotes or derive an apparently validated tree from public market descriptions. Keep unknowns visibly untested.
3. Prepare the [five-act interview](templates/interview-script.md), including consent, recent-event story and the four switching forces. [Cadence guidance](guides/03-interview-cadence.md) describes a weekly rhythm and recruiting choices; drafting it authorizes no recruitment, message, recording or automation.
4. Map [DVFU assumptions](templates/assumption-map.md), score importance/uncertainty and select the highest-risk Kill Zone assumption.
5. Use [experiment design](guides/06-experiment-design.md) and the complete [experiment worksheet](templates/experiment-plan.md). Declare the behavioral criterion, conditions, denominator, proxy limit and stop rule before any authorized execution.
6. Follow [demand preparation](guides/07-test-demand-before-building.md), [evidence grades](references/evidence-grades.md) and the [demand record shape](templates/demand-test-record.json). Preserve nonresponses, contradictory observations, practical constraints and any criterion changes. JSON bookkeeping never establishes demand, consent, actual execution or statistical confidence.
7. Make one [CONTINUE/PIVOT/STOP recommendation](guides/08-continue-pivot-or-stop.md) in the [decision record](templates/discovery-decision.md). CONTINUE can mean only the next discovery step. Never recommend a build before the required tested assumption evidence and owner commitment exist.
8. Prepare the [first-version discovery brief](templates/first-version-discovery-brief.md) with [scope guidance](guides/09-scope-first-version.md). Preserve accepted requirements. Once the owner accepts scope and the required tested assumption evidence exists, the packaged `dlag-starter-core:project-notebook` method can draft requirements when authorized. Otherwise return unresolved discovery and the next test.
9. When requested, summarize the actual week with [the weekly worksheet](templates/weekly-summary.md). Missing interviews, evidence or tests stay missing; do not fill them with fictional work.

## Keep execution and ownership explicit

This is a private resource of [Project Planning](../SKILL.md). The paired Specialist may read supplied safe files and Write/Edit expressly requested local Markdown only. Save requested drafts without asking for the same permission again, check existing destinations, preserve differing material unless editing it was requested, and read saved files back. Proposed `library/discovery/` paths may follow the project's accepted document homes.

The [checker](scripts/check-demand-record.py) and [checker tests](scripts/test-demand-record.py) use Python standard library only and are for an appropriately authorized execution caller. JSON writes, shell, real participants, messages, recordings, incentives, ad spend, published tests, provider/account choices and application code are outside the planning role. When no caller or tool is available, prepare Markdown and record execution unrun. No automatic outreach, calendar, transcription, newsletter, background-job or extra provider is selected.

Use local [UX planning](../design/playbook.md) for planned screen/test needs, `dlag-starter-core:design-foundation` for authorized actual UI work, `dlag-starter-core:quality-review` for shipped-feature review, and Project Notebook for requirements. Formal pricing, causal/statistical analysis or legal questions need an actually designated qualified owner; do not invent a packaged specialist or a dispatch.
