# Discovery guide map

Prepare evidence-based discovery with [the full method](playbook.md). This workflow authors requested local Markdown and evaluates supplied observations; it does not contact people or execute a test by implication.

| Task | Complete local guide |
| --- | --- |
| Understand the discovery discipline | [00 Principles](guides/00-principles.md) |
| Define one desired outcome | [01 Outcome](guides/01-desired-outcome.md) |
| Build and maintain the evidence-backed OST | [02 Opportunity Solution Tree](guides/02-opportunity-solution-tree.md) |
| Prepare cadence, recruiting and synthesis | [03 Interview cadence](guides/03-interview-cadence.md) |
| Prepare a five-act switch interview | [04 JTBD interview](guides/04-jtbd-interview.md) |
| Prioritize DVFU assumptions | [05 Assumption mapping](guides/05-assumption-mapping.md) |
| Choose a smallest test and predeclare criteria | [06 Experiment design](guides/06-experiment-design.md) |
| Declare exposure, proxy, evidence and constraints | [07 Demand test](guides/07-test-demand-before-building.md) |
| Recommend one scoped next action | [08 Continue, pivot or stop](guides/08-continue-pivot-or-stop.md) |
| Prepare the evidence-linked first version | [09 Scope handoff](guides/09-scope-first-version.md) |

Use the complete [OST](templates/opportunity-solution-tree.md), [interview](templates/interview-script.md), [assumption map](templates/assumption-map.md), [experiment plan](templates/experiment-plan.md), [demand JSON record](templates/demand-test-record.json), [decision](templates/discovery-decision.md), [first-version brief](templates/first-version-discovery-brief.md) and [weekly summary](templates/weekly-summary.md) worksheets.

Worked illustrations: [SaaS onboarding](examples/happy-path-saas-onboarding.md), [multiple B2B stakeholders](examples/edge-case-b2b-stakeholders.md) and [five demand-decision cases](examples/demand-decision-cases.md). Their stories, quotes, participants, thresholds and outcomes are illustrative, not this project's evidence.

[Evidence grades](references/evidence-grades.md) distinguish context, reported statements, observed behavior, hypotheses and missing records. [Historical research context](research/research-summary.md) preserves source strengths, secondary-source limits and conceptual questions. No external archive is needed.

The [record checker](scripts/check-demand-record.py) validates a bounded UTF-8 JSON record, and [its tests](scripts/test-demand-record.py) exercise malformed/boundary inputs. The empty JSON template intentionally does not pass as a completed record. Python/shell/JSON writes need a suitably authorized caller; the planning Specialist cannot execute them. Valid bookkeeping, actual execution, demand evidence, statistical analysis, owner approval and implementation remain different claims.
