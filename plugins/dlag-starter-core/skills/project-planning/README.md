# Project planning guide map

Plan one useful outcome with the [Playbook](SKILL.md), or use the complete product-to-build method below when approved strategy and user journeys are available.

Use [the advisory entry routes](guides/08-advisory-entry-routes.md) for the complete preparation workflows and their owner/evidence gates. The [advisory decision worksheet](references/templates/advisory-decision.md) records ranked risks, a prospective test, one recommendation, scoped acceptance and unresolved shared terms.

| Step | Local resource |
| --- | --- |
| Read strategy, journeys and existing decisions | [Read inputs](guides/01-read-inputs.md) |
| Define independent slices with stable keys and journey coverage | [Map features](guides/02-map-features.md) |
| Inventory shared API/data/permission/state boundaries | [Flag boundaries](guides/03-flag-boundaries.md) |
| Order dependencies and establish entry/exit gates | [Plan waves](guides/04-plan-waves.md) |
| Keep five project completion requirements | [Definition of Done](guides/05-set-definition-of-done.md) |
| Transfer accepted scope and unresolved agreement terms | [Write handoff](guides/06-write-handoff.md) |
| Approve exact revisions and handle later changes | [Approve and revise](guides/07-approve-and-revise.md) |

Look up [artifact paths and status meanings](references/artifact-paths.md). Use the [PRD Map](references/templates/prd-map.md), [Wave Plan](references/templates/wave-plan.md), [Definition of Done](references/templates/definition-of-done.md) and [Handoff Packet](references/templates/handoff-packet.md) templates. Compare the worked [PRD Map](references/examples/example-prd-map.md) and [Wave Plan](references/examples/example-wave-plan.md). These illustrate planning only; they are not an implemented application or evidence of owner approval in your project.

The [research distillation](references/research/distilled-product-planning.md) explains the methods and their limits. The [checker](scripts/check_wave_plan.py) validates dependency-table structure and graph agreement using Python 3.9+ standard library only. It does not validate customer demand, acceptance criteria, security, implementation or approval authority. The paired Specialist cannot execute shell commands; an authorized caller may run the documented command.

All required planning procedures, examples, templates and checker code are local. No counterpart repository is needed. The package license and required notices retain their legal terms.
