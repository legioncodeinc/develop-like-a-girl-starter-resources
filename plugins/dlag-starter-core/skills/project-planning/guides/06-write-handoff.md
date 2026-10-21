# Guide 06: Write the Handoff Packet

Goal: one file at `library/requirements/plans/handoff-packet.md` that tells the owner-designated contract author or method which boundaries to draft and the document author using Project Notebook exactly which PRDs to write. The packet is instructions for other owners. You do not write PRDs or CTRs yourself.

Template: [../references/templates/handoff-packet.md](../references/templates/handoff-packet.md).

## Before you start

The PRD Map, Wave Plan and Definition of Done must all be Approved (exact revisions). If any is Draft, stop and finish [Guide 07](07-approve-and-revise.md) first.

## Steps

1. **Fill the approved inputs table** with each artifact's path, revision and approval date.
2. **Step 1 for contract-writing.** Copy every boundary with status `missing` or `draft` from the PRD Map. Add "needed by wave": the earliest wave that has a PRD using it. Contracts come first because PRDs that use a missing or draft boundary cannot be finalized.
3. **Step 2 for Project document author.** One row per PRD in wave order: key, title, one-line scope, size, depends on, contract pins needed, wave. Copy these exactly from the approved map and plan. Do not add new scope here.
4. **Keep the five document-author instructions** from the template. Write acceptance criteria as an ID table with Given/When/Then using the local [handoff acceptance format](../references/templates/handoff-packet.md#acceptance-criteria-format). Checkboxes alone cannot identify separate behavior and verification evidence.
5. **Ask Project document author to report the key to `PRD-###` mapping.** When it arrives, update the PRD column in the map and plan as a new revision (no scope change, so the owner can approve it quickly).
6. **List open decisions** that still block any PRD.
7. Get the packet approved ([Guide 07](07-approve-and-revise.md)), then tell the orchestrator it is ready. If a real contract author or method is designated, the coordinator sends the boundary packet to that author first. Otherwise return the packet and blocked terms to the owner. Once accepted terms exist, use the packaged Project Notebook method for authorized PRD drafting; no contract specialist dispatch is implied.

## What happens next (not your job)

- the owner-designated contract author or method drafts CTRs and the owner accepts them.
- the document author using Project Notebook writes PRDs and pins accepted CTR revisions.
- the authorized implementation caller or the authorized build coordinator reads the approved Wave Plan and builds.


## Use the available documentation method

Load `dlag-starter-core:project-notebook` or read [Project Notebook](../../project-notebook/SKILL.md) for authorized PRD/IRD authoring. A direct caller may use that method within its actual Write/Edit scope; a specialist dispatch requires actual availability and task authorization. A missing contract author or missing accepted terms stays a blocker. Do not expand project scope, acceptance gates or tool permissions.
