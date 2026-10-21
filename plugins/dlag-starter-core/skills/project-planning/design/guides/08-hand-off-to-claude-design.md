# 08: Hand off to Claude Design (outbound)

Goal: give the owner one brief and a set of files that let Claude Design explore or refine the design without losing the decisions already made.

Role boundary: Project Planning writes only authorized local Markdown. HTML/React creation, browser activity, shell execution, JSON writes, file/archive copying or extraction and external uploads require an appropriately authorized caller. Use `dlag-starter-core:design-foundation` for actual UI implementation; if the needed caller or tool is unavailable, save the specification with that step unrun.

Grounding: Claude Design help article, launch announcement, design-sync coverage, owner-supplied measured capture conventions (local Build Studio direction, critique and ownership rules). Distilled: [section 1](../references/research/distilled-product-design.md).

## Historical product notes (verify the actual owner interface before promising anything)

- The historical research snapshot described support for prompts, images, screenshots, wireframes, documents and decks, and a linked code repository. A strong prompt states goal, layout, content and audience.
- The historical snapshot described a project inheriting the organization design system. Design systems import from a GitHub repo, design files, raw uploads, or a local codebase through `/design-sync` in Claude Code (reported to work best for React design systems).
- The historical snapshot listed exports: .zip, PDF, PPTX, standalone HTML, Google Slides, partner destinations, and "Hand off to Claude Code".
- Not documented: what the .zip or the handoff bundle contains. Do not tell the owner it will return tokens or specs in any particular format.

## Choose the path

| Situation | Path |
|---|---|
| No app yet, package exists | Brief from this package only |
| An app already runs | If an authorized measured capture already exists, attach it with this brief; otherwise record capture as pending. An owner-designated capture method is not a packaged requirement. Use that capture AND this brief: the capture carries measured components and candidate DTCG tokens, this brief carries product intent, flows and states the capture cannot measure |
| The repo has a React design system and the owner uses Claude Code | Only if the owner already uses that service and its actual interface supports it, describe the optional `/design-sync` and `/design-login` route from the historical notes. The owner performs account/login/sync actions separately; do not run them |

## Procedure

1. Copy [claude-design-brief.md](../references/templates/claude-design-brief.md) to `design/claude-design/brief.md`. Fill it from the package: product, actor, screens in scope, approved direction, constraints.
2. List the attachments. Prefer the package files themselves over summaries; Claude Design reads documents.
3. Keep the prompt short and literal. It tells Claude Design to read every attachment, follow the specs' reading order and states, use the vocabulary, mark invented copy as a proposal, meet the accessibility floor, and list every deviation.
4. Ask for the return formats in priority order: standalone HTML, the .zip, screenshots or PDF of every artboard in both themes, any token text Claude Design shows.
5. Give the owner the brief path and the attachment list. The owner uploads and sends it; this UX method never signs in to Claude Design or uses the owner's account.
6. Record in the README import review index: brief version, date, attachments sent.

## When the owner hands off straight to Claude Code

"Hand off to Claude Code" ("Send to local coding agent" or "Send to Claude Code Web") makes Claude Code implement code. Practitioners report it may point Claude Code at a `claude_design` MCP endpoint and may need `/mcp` OAuth to complete. That path does not update this package. Afterwards, run guide 09 on whatever HTML or screenshots the owner keeps, so the specs stay the source of truth, and hand implementation review to `Design Foundation`.
