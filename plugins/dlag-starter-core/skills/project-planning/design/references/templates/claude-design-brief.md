# Claude Design brief: {Product name}

<!-- OUTBOUND. Paste the "Prompt to send" block into a Claude Design project and attach the files in "Attach". Claude Design asks for goal, layout, content and audience (Anthropic, Claude Design getting started (historical October 2026 snapshot)). When a running app exists, attach an existing authorized measured capture when available; otherwise mark capture pending; this brief then adds product intent that the capture cannot measure. -->

Prepared by Build Studio UX planning on {YYYY-MM-DD} from `library/knowledge/private/product/design/` at commit {short sha}.

## Attach

| File | Why |
|---|---|
| `information-architecture.md` | Screen map and vocabulary |
| `flows/F-*.md` | Task flows the screens must support |
| `screens/S-*.md` for the screens in scope | Layout, components, all four states, copy |
| `content-voice.md` | Voice and message patterns |
| `accessibility-baseline.md` | Floor every design must meet |
| `prototypes/*.html` (optional) | Current direction as clickable evidence |
| `{app}-claude-design-handoff-{date}.zip` (when an app exists) | Measured components and candidate DTCG tokens from webapp-capture |
| `DESIGN.md` (when one exists) | Current visual system; Claude Design should extend, not replace it |

The historical research snapshot described support for images, documents and linked repositories, plus inherited organization design systems. Verify the actual owner interface before requesting those operations. If a design system was synced with `/design-sync`, say so here: {yes, name / no}.

## Prompt to send

> Read every attached file before designing. You are designing {screens in scope} for {product}, used by {primary actor} to {core job}.
>
> Goal: {what this round must decide or produce}.
> Audience for this design: {owner review, engineering handoff, user test}.
> Layout: follow the screen specs' reading order and the screen map. Do not add screens that are not in `information-architecture.md`.
> Content: use the exact terms in the vocabulary table and the copy in each spec. Mark any copy you invent as a proposal.
> States: every screen shows empty, loading, error and success exactly as specified.
> Direction: {approved direction from direction.md, two sentences}.
> Constraints: WCAG 2.2 AA (4.5:1 text, 3:1 UI, 24 by 24 CSS px targets, visible focus never covered, reduced motion honored). Light and dark themes. No gradient text, no decorative glow, no stock marketing phrases.
> Deliver: one artboard per screen and state, then a summary of every decision that differs from the specs and why.

## Export request (what we need back)

Ask the owner to export with the Export button and give us, in priority order:

1. Standalone HTML of the final screens.
2. The .zip download of the project.
3. Screenshots or PDF of each artboard, light and dark.
4. Any token or style list Claude Design shows, copied as text.

The historical research did not establish the exact .zip or Claude Code handoff-bundle contents (research/distilled-product-design.md section 1.3). The import guide inventories whatever arrives.

## Alternative: hand off directly to Claude Code

If the owner prefers "Hand off to Claude Code" ("Send to local coding agent" or "Send to Claude Code Web"), that path implements code. It does not update this design package. Run the import guide afterwards on the resulting HTML or screenshots so the specs stay the source of truth.
