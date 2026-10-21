# Product planning research distillation

Historical research snapshot: October 12, 2026. This repair does not claim a new research sweep. The sweep targeted the six months before that date (2026-04-12 to 2026-10-12). Few primary sources on these methods were published inside the window, because the core ideas (Definition of Done, Shape Up, story mapping, topological ordering) are settled. Where that is true, the current official page was re-read and its age is stated, rather than treating age as proof it is stale. Thin or secondary sourcing is marked as such.

## Findings

| Finding | Consequence for this Playbook | Evidence |
|---|---|---|
| The Definition of Done describes the state work must reach to count. Work below it is not part of the increment and cannot be released. | The project DoD is a hard floor. A PRD that misses any item is not done and its wave cannot exit. | Scrum Guide (2020), Definition of Done |
| An organizational DoD is the minimum for every team; teams on one product share one DoD. | Write one project-level DoD that every PRD inherits. PRDs may add checks, never remove them. | Scrum Guide (2020), Definition of Done |
| A DoD works when written, visible and minimal; single items may need extra criteria. | Keep the project DoD short. Put item-specific checks in a PRD-level checklist. Save it in project documentation, not only in chat. | Agile Alliance, Definition of Done |
| Appetite is a time budget set before design; vague grab-bags cannot be bounded. | Every PRD row gets a one-line scope and a size budget. Grab-bag PRDs are split or narrowed. | Shape Up, Setting Boundaries |
| Good scopes are slices that can be finished alone, named by what they deliver, with an obvious home for new tasks. | Each PRD is a vertical slice with its own verifiable outcome. Icebergs are split. Nice-to-haves are flagged. | Shape Up, Map the Scopes |
| Push the riskiest unknowns first; leave polish and nice-to-haves for the end. | Inside the order dependencies allow, riskier PRDs go to earlier waves and nice-to-haves to the last wave. | Shape Up, Show Progress |
| Planning boards show delivery order and cross-team dependencies before work starts. | The Wave Plan is a small saved planning board: PRDs by wave plus a dependency graph. | SAFe, PI Planning (public excerpt) |
| Tools model dependencies as blocked-by, end-to-start, and flag violated edges. | "Depends on" means end-to-start: the dependent PRD waits until its dependency is verified. A PRD placed no later than its dependency is a violation. | GitHub issue dependencies Linear project dependencies |
| Kahn's algorithm in rounds groups a DAG into levels; a cycle means no order exists. | Waves are computed as levels of the PRD graph. A cycle is a Feature Map error to fix, not a wave to schedule. The level count is a minimum, not a schedule. | Kahn topological sorting |
| Mermaid flowcharts use a direction, subgraphs closed by `end`, and arrows; lowercase `end` or ids starting with o or x after a link can break parsing. | Draw `flowchart LR`, one subgraph per wave, `F##` Feature Map keys as node ids. | Mermaid flowchart syntax |
| A walking skeleton is a tiny end-to-end slice that connects the main parts. | Default for a new product: the first wave carries the thinnest end-to-end path. (Secondary sourcing.) | Walking skeleton method (secondary account) |
| A first release slice lets a user finish the whole journey, plainly. | Check that every journey step in the UX package maps to a PRD, and that the main journey is complete by the end of wave 1 or 2. (Secondary sourcing.) | Story mapping release slices (secondary account) |
| A user-facing slice on a simple back end gives early feedback; the swap point is an interface. | Optional first-wave pattern when the strategy prizes early feedback. The swap interface becomes a contract boundary. | Skeleton on crutches, Gojko Adzic |
| Entry criteria say when a task may start; exit criteria say when it is finished. | Each wave lists pass/fail entry and exit criteria. | Entry/exit criteria (secondary account) |

## Build Studio conventions

These are local workflow decisions, not claims from external sources:

- Proposed artifact homes and status words are documented in [artifact paths](../artifact-paths.md). Honor existing accepted project paths; no other repository is required.
- Owner approval binds an exact artifact revision. Security review precedes quality review. An approved plan does not authorize a provider action, release or tool expansion.
- Planning flags shared boundaries. An owner-designated contract author or method drafts terms for owner acceptance; an document author using Project Notebook writes PRDs and pins accepted revisions. The dedicated contract specialist is unavailable; Project Notebook supplies the packaged PRD/IRD method when authorized.
- Acceptance criteria use the local [ID table with Given/When/Then](../templates/handoff-packet.md#acceptance-criteria-format). A checkbox-only list does not replace this behavior/evidence table.
- The Definition of Done is project-scoped. It can reuse startup-appropriate team checks without importing sprint ceremony.

## Limits and conflicts

- The historical sweep found no 2026 revision of the Scrum Guide and used the 2020 text. This is a dated research observation, not a fresh currentness claim. Scrum Guide (2020), Definition of Done
- The SAFe page is partly behind a login; only the public excerpt is cited. SAFe, PI Planning (public excerpt)
- Walking skeleton, story mapping and entry/exit criteria rest on secondary sources. Treat them as defaults that the owner can override. Walking skeleton method (secondary account) Story mapping release slices (secondary account) Entry/exit criteria (secondary account)
- Walking skeleton (build the thin back-end path first) and skeleton on crutches (ship the UI first on a fake back end) pull in different directions. Preferred default: walking skeleton; use crutches only when the strategy names early user feedback as the top goal. Walking skeleton method (secondary account) Skeleton on crutches, Gojko Adzic
- Topological levels give the fewest possible waves, not the best schedule; capacity and risk may justify more waves. Kahn topological sorting
- No source gives a time estimate method here; sizing belongs to an owner-approved forecasting process (no dedicated Starter specialist).
