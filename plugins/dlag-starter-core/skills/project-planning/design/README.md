# Product UX planning guide map

Use the [UX planning method](playbook.md) to write an inspectable local design package. Project Planning authors Markdown; an authorized Design Foundation implementation caller handles actual HTML/React work and relevant execution.

| Task | Full local guide |
| --- | --- |
| Strategy, existing authority, direction and Gate A | [01](guides/01-read-strategy-and-set-direction.md) |
| Journeys, information architecture and stable screen IDs | [02](guides/02-map-journeys-and-ia.md) |
| Task flows and failure branches | [03](guides/03-write-task-flows.md) |
| Screens, hierarchy and four required states | [04](guides/04-spec-screens-and-states.md) |
| Content and accessibility baseline | [05](guides/05-write-content-and-accessibility.md) |
| Prototype implementation handoff | [06](guides/06-build-prototypes.md) |
| Evidence-backed critique, two-round limit and Gate B | [07](guides/07-critique-and-gate.md) |
| Optional owner-operated external design-tool brief | [08](guides/08-hand-off-to-claude-design.md) |
| Optional owner-supplied export review | [09](guides/09-import-claude-design-export.md) |
| Planning, documentation and UI handoffs | [10](guides/10-hand-off-to-owners.md) |

## Templates

Use the complete [journey](references/templates/journey-map.md), [IA/screen map](references/templates/ia-screen-map.md), [task flow](references/templates/task-flow.md), [screen spec](references/templates/screen-spec.md), [direction options](references/templates/direction-options.md), [content/voice](references/templates/content-voice.md), [accessibility baseline](references/templates/accessibility-baseline.md), [critique rubric](references/templates/critique-rubric.md), [optional external brief](references/templates/claude-design-brief.md), [optional import review](references/templates/claude-design-import-checklist.md), [HTML state/theme starter](references/templates/prototype-starter.html), [package index](references/templates/design-package-readme.md) and [planning handoff](references/templates/planning-handoff.md).

The HTML starter is a code template with placeholders and illustrative navigation targets; it is not a complete navigable application. Its full CSS, state/theme controls, semantic markup and local state simulation are retained for adaptation. Actual preview, responsive checks, contrast measurement and browser interactions remain unrun until an authorized caller performs them.

[Layout and IDs](references/package-layout.md) describe artifact homes and approval states. [Research explanation](references/research/distilled-product-design.md) retains historical source findings, conflicts and limits. Optional Claude Design capabilities are historical research notes; check the owner's actual available interface before promising a format or operation. Nothing depends on owning that service or on an old counterpart repository.

[The checker](scripts/check-design-package.py) uses Python 3.9+ standard library only: `package` checks structural markers; `inventory` lists file/archive sizes and hashes without extraction. Inventory's optional JSON output is a caller write, outside Project Planning's Markdown-only scope. A clean inventory does not make HTML scripts safe to execute; a clean package does not establish WCAG conformance or browser behavior.
