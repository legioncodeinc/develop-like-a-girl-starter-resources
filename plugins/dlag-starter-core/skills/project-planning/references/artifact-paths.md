# Artifact paths, owners and statuses

Load this when you need to know where a file goes, who may write it, or what a status means.

## Inputs (read only)

| Input | Path | Made by | If missing |
|---|---|---|---|
| Product Strategy | `library/knowledge/private/product/product-strategy.md` | Owner-approved strategy author | Stop. Ask the owner to run the strategy stage first. |
| UX package | `library/knowledge/private/product/design/` | Owner-approved UX author | Stop, or plan with the owner's written OK and mark every journey gap. |
| Existing PRDs | `library/requirements/{backlog,in-work,completed}/prd-*/` | the document author using Project Notebook | Fine for a new product. |
| Existing contracts | `library/knowledge/private/contracts/CTR-*.md` | the owner-designated contract author or method | Fine; every boundary is then `missing`. |
| Existing DoD | `library/knowledge/private/standards/definition-of-done.md` | this Playbook | Write a new one. |

## Complete-route output paths

| Artifact | Path | Template |
|---|---|---|
| PRD Map | `library/requirements/plans/prd-map.md` | [templates/prd-map.md](templates/prd-map.md) |
| Wave Plan | `library/requirements/plans/wave-plan.md` | [templates/wave-plan.md](templates/wave-plan.md) |
| Definition of Done | `library/knowledge/private/standards/definition-of-done.md` | [templates/definition-of-done.md](templates/definition-of-done.md) |
| Handoff Packet | `library/requirements/plans/handoff-packet.md` | [templates/handoff-packet.md](templates/handoff-packet.md) |

These are proposed project-document paths, not dependencies on another repository or required pre-existing scaffold. Honor an existing project's accepted homes. Create only the requested Markdown documents and needed parent directories when the user authorizes saving them. Report the actual homes in the handoff. The small-plan route may instead use the user's requested single Markdown path.

## Never write

| Path | Owner |
|---|---|
| PRD folders and files | the document author using Project Notebook |
| `CTR-*` contract records | the owner-designated contract author or method |
| `EXECUTION_LEDGER.md` and build code | the authorized implementation caller and the build reviewers |
| `library/notes/` | humans only; do not read it either |
| Product Strategy and UX package | their owner-approved authors; propose changes to the owner |

## Status words

| Status | Meaning | Who may act on it |
|---|---|---|
| Draft | Written, not approved | Nobody downstream |
| Approved | The owner said yes to this exact revision, with name and date | Owner-assigned document/contract authors and the authorized implementation caller |
| Superseded | A newer revision is Approved | Nobody; kept for history |

Approval belongs to one revision. Any change after approval makes a new Draft revision.

## Dependency words

| Word | Meaning |
|---|---|
| Depends on | End-to-start: the other PRD must be VERIFIED before this one may start its wave. |
| Shared boundary | An API, event, data shape, permission rule or state change that two or more PRDs rely on. Needs a CTR. |
| Wave | A group of PRDs that can be built at the same time because none depends on another in the group. |
| Entry criteria | Pass/fail checks that must be true before a wave starts. |
| Exit criteria | Pass/fail checks that must be true before a wave counts as finished. |
