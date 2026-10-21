# 10: Hand off to planning, the design system and enforcement

Goal: close the package so sibling and downstream owners can act on it without re-reading the whole folder.

Role boundary: Project Planning writes only authorized local Markdown. HTML/React creation, browser activity, shell execution, JSON writes, file/archive copying or extraction and external uploads require an appropriately authorized caller. Use `dlag-starter-core:design-foundation` for actual UI implementation; if the needed caller or tool is unavailable, save the specification with that step unrun.

Grounding: the local [package layout](../references/package-layout.md), [planning handoff template](../references/templates/planning-handoff.md) and Build Studio ownership/tool boundaries.

Precondition: Gate B is recorded, or the owner explicitly asked for a handoff of a draft (record that).

## 1. Planning handoff (Project Planning)

Copy [planning-handoff.md](../references/templates/planning-handoff.md) to `design/planning-handoff.md`.

- One row per screen and per flow, by ID, with states specified, prototype yes or no, a rough size (S, M, L) and dependencies.
- Suggest PRD groupings by shared data and journey phase. Do not write PRDs; Project Planning builds the PRD map and wave plan, and `dlag-starter-core:project-notebook` writes PRDs.
- List the open questions that block planning.

## 2. Design system (Design Foundation)

Hand off when no design system exists and the product will be built:

- the approved direction (`direction.md`), the prototype `:root` token block, any accepted Claude Design token or DESIGN.md proposals, the screen specs, and the accessibility baseline.
- Design Foundation interviews and bootstraps the durable system. The prototype tokens are input evidence, not the system.

## 3. Enforce the existing React design system

Hand off when a design system exists: screen specs and any token change requests. Use `dlag-starter-core:design-foundation` for the approved React/Tailwind/shadcn/ui surface. Keep system-level changes explicit for owner acceptance.

## 4. Implementation (Design Foundation)

The packaged `dlag-starter-core:design-foundation` method is the handoff for authorized UI implementation. Give it the approved direction (as a direction contract when possible), the screen specs as surface briefs, and the prototypes as visual references. This UX method does not write production components.

## 5. Close the package

- README status table updated; status `owner-approved` only with a Gate B record.
- `python3 scripts/check-design-package.py package <design-dir>` exits 0.
- Report to the orchestrator: files written, Gate A and B records, critique scores, detector result, open questions, and the handoffs made. Future implementation must receive Security before Quality review; no commit or push is authorized by this packet.
