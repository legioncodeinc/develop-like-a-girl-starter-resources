---
ai_description: |
  Holds whole-project build plans: the PRD map, the wave plan
  (wave-plan.md) and the handoff packet. Usually written by
  Project Planning Playbook and approved by the owner by revision.
  Build Lead and Build It read the Approved wave-plan.md as the build order.
  Do NOT put PRDs here: those live in backlog/, in-work/ or completed/.
human_description: |
  The build plan for the whole project: which PRDs to write, the order
  to build them in (waves), and the handoff notes. Approve each file
  before building starts.
---

<!-- Optional documentation template: preserve the receiving repository's existing schema. The default Starter Notebook location remains library/knowledge/private/product/. This role creates only expressly requested missing Markdown files; lifecycle moves, issue creation, publication and generated binary packets remain proposals for separately authorized work. Audience-document export is not supplied by this Playbook. -->

# Requirements: Plans

Whole-project build plans that are not one PRD.

## What belongs here

- `prd-map.md`: the list of PRDs to write, their dependencies and shared boundaries
- `wave-plan.md`: the dependency-ordered build waves, with entry and exit criteria
- `handoff-packet.md`: what Project Notebook and Contract Writing should write next

## What does NOT belong here

- PRDs themselves: `requirements/<lifecycle>/prd-<###>-<slug>/`
- The Definition of Done: `knowledge/private/standards/definition-of-done.md`
