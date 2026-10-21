# Distilled research: product design packages and the Claude Design round trip

Historical research snapshot: October 12, 2026, covering April 12 through October 12, 2026. The original sweep used 24 source notes. Bibliographic labels below preserve the findings and their evidence limits without requiring a separate archive. Foundational UX methods predate that window. This migration does not claim a new research sweep.

Local Build Studio rules preserve existing design authority, explicit direction, critique and bounded rounds, measured capture evidence, durable system ownership and authorized React implementation. The full operational procedures and templates are linked from the local guide map; no original counterpart repository is needed.

## 1. Claude Design: historical findings and uncertainty

Read this section before writing any brief or import. Claude Design export details are thin. Anthropic documents the export menu, not the file contents.

### 1.1 Official-source findings recorded in the historical snapshot

| Fact | Source |
|---|---|
| Launched 2026-04-17 as an Anthropic Labs research preview for designs, prototypes, slides and one-pagers | (Anthropic, Claude Design launch announcement (2026)) |
| At the snapshot, described as an artifact template usable in any chat, in Claude Code and from the Artifacts tab; standalone claude.ai/design closes 2026-12-14 | (Anthropic, Claude Design getting started (historical October 2026 snapshot)) |
| Snapshot described Free/Pro/Max/Team defaults and a then-future Enterprise default scheduled for 2026-10-15 | (Anthropic, Claude Design getting started (historical October 2026 snapshot)) |
| Inputs: prompt, images, screenshots, wireframes, decks or documents (DOCX, PPTX, XLSX named at launch), a linked code repository, a web capture tool | (Anthropic, Claude Design launch announcement (2026)), (Anthropic, Claude Design getting started (historical October 2026 snapshot)) |
| A strong prompt states goal, layout, content and audience | (Anthropic, Claude Design getting started (historical October 2026 snapshot)) |
| Projects inherit the organization design system; Claude checks output against it before showing it | (Anthropic, Claude Design getting started (historical October 2026 snapshot)) |
| Design systems import from a GitHub repo, design files, raw uploads, or a local codebase via `/design-sync` in Claude Code | (Anthropic, Claude Design getting started (historical October 2026 snapshot)) |
| Editing: chat, inline canvas comments, direct canvas editing; launch also named adjustment knobs and custom sliders | (Anthropic, Claude Design getting started (historical October 2026 snapshot)), (Anthropic, Claude Design launch announcement (2026)) |
| Export menu: Download as .zip; PDF; PPTX; standalone HTML; Google Slides; send to a list of partner tools (Canva, Lovable, v0, Vercel, Netlify and others) | (Anthropic, Claude Design getting started (historical October 2026 snapshot)) |
| Handoff to Claude Code: "Send to local coding agent" or "Send to Claude Code Web"; Claude "packages everything into a handoff bundle" | (Anthropic, Claude Design getting started (historical October 2026 snapshot)), (Anthropic, Claude Design launch announcement (2026)) |
| From Claude Code, `/design` can import a design into a codebase, export code as a live prototype, or build the whole thing | (Anthropic, Claude Design getting started (historical October 2026 snapshot)) |
| No version history yet; usage counts toward shared Claude limits; inline comments sometimes do not appear | (Anthropic, Claude Design getting started (historical October 2026 snapshot)) |

### 1.2 Secondary or community findings recorded in the snapshot

| Claim | Source | Confidence |
|---|---|---|
| `/design-sync` targets React design systems; first sync can take hours on large repos; needs a claude.ai account and `/design-login` | (AI Catchup, design-sync coverage (secondary)), (Serverworks, design-sync walkthrough (single practitioner)) | medium (secondary cites Anthropic docs; practitioner reproduced it) |
| `/design` needs Claude Code v2.1.265 or later; artboards export as PNG or PDF | (AI Catchup, design-sync coverage (secondary)) | medium |
| The Share menu yields a prompt pointing Claude Code at a `claude_design` MCP endpoint plus the project URL; first attempt may fail on MCP OAuth until `/mcp` completes | (Serverworks, design-sync walkthrough (single practitioner)) | low to medium (one practitioner) |
| The handoff tells Claude Code to fetch the design and read a README; the zip is a fallback | (Hora de Codar, export experiment (single practitioner)) | low (one practitioner) |

### 1.3 Not documented anywhere in the sweep (treat as unknown)

- The file and folder layout of the .zip download. (Anthropic, Claude Design getting started (historical October 2026 snapshot)), (Hora de Codar, export experiment (single practitioner))
- The contents of the Claude Code handoff bundle. (Anthropic, Claude Design launch announcement (2026)), (AI Catchup, design-sync coverage (secondary))
- Whether exports carry design tokens in any machine format (DTCG JSON, CSS variables, DESIGN.md). No source says so.
- Whether standalone HTML keeps interactions when opened offline. (Hora de Codar, export experiment (single practitioner))
- Direct PNG, JPEG or SVG export from the web canvas (not in the official export list). (Anthropic, Claude Design getting started (historical October 2026 snapshot))

Consequence for this UX method: the import procedure inventories whatever arrives and derives tokens from evidence (CSS custom properties, computed values, screenshots). It never assumes a file exists because a guide said so.

## 2. Journeys, flows and information architecture

| Artifact | Use when | Must contain | Source |
|---|---|---|---|
| Journey map | Goal spans channels or time; emotions matter | One actor; scenario and expectations; phases; actions, mindsets, an emotion line; opportunities with owner and metric | (Nielsen Norman Group, Journey Mapping 101), (Nielsen Norman Group, Journeys versus Flows) |
| Task flow | Goal completes in minutes or hours inside one product | Key user steps and system responses; ideal path; no emotions | (Nielsen Norman Group, Journeys versus Flows) |
| IA and screen map | Before any wireframe or prototype | Content inventory, grouping, controlled vocabulary, tiered hierarchy; navigation chosen from the IA | (Nielsen Norman Group, Information Architecture versus Navigation) |

Rules distilled:

- One actor per journey map; separate maps for separate user types. (Nielsen Norman Group, Journey Mapping 101)
- A journey is not an interaction log; a flow is where steps and system responses go. (Nielsen Norman Group, Journey Mapping 101), (Nielsen Norman Group, Journeys versus Flows)
- IA first, navigation second; do not pick navigation patterns "based on looks alone". A first-pass IA is enough to start wireframes. (Nielsen Norman Group, Information Architecture versus Navigation)
- Decision points, error branches and entry points in flows are this UX method's own convention (Mermaid decision shapes), not an NN/g requirement. (Nielsen Norman Group, Journeys versus Flows) says flows follow the typical or ideal path; adding the failure branches is how this UX method feeds the screen-state specs.

## 3. States, content and errors

| State | Requirement | Source |
|---|---|---|
| Empty | Say whether loading, errored or truly empty; teach what the area is for; offer a direct pathway (Create, Learn more, demo data). Never show "no records" before data finishes loading | (Nielsen Norman Group, Empty States) |
| Loading | Visible system status with prompt feedback | (Nielsen Norman Group, Ten Usability Heuristics), (Nielsen Norman Group, Empty States) |
| Error | Message near its source; redundant cues beyond color; plain, precise, constructive, nonjudgmental; preserve input; suggest a fix; no humor | (Nielsen Norman Group, Error Messages) |
| Success | Visible status and a clear next step (heuristic 1 and 3) | (Nielsen Norman Group, Ten Usability Heuristics) |

The ten heuristics give the content review checklist: status, real-world language, control and undo, consistency, error prevention, recognition over recall, efficiency, minimalism, error recovery, help. (Nielsen Norman Group, Ten Usability Heuristics)

## 4. Critique and visual quality

- A critique judges a design against agreed objectives and user needs. Without them feedback is subjective. (Nielsen Norman Group, Design Critiques)
- Reframe directives into questions about the user's main task. (Nielsen Norman Group, Design Critiques)
- Hierarchy tools: contrast in value and saturation, scale (no more than three sizes, at most two large elements), grouping by proximity and white space; containers sparingly. "If everything is contrasted, then nothing stands out." (Nielsen Norman Group, Visual Hierarchy)
- Squint or blur test at roughly 5, 10 and 20 px reveals unintended dominance. (Nielsen Norman Group, Visual Hierarchy)
- The optional installed detector encodes anti-slop and quality rules (30 slop rules such as gradient text, hero eyebrow chip, cream palette, nested cards, em-dash overuse; 29 quality rules such as low contrast, line length, tight leading, tiny text). an already-installed local `impeccable detect <target>` exits 0 clean, 2 on findings, 1 on failure; it scans static HTML files. (local Build Studio direction, critique and ownership rules)
- This method requires bounded passes: one batched inspection, one fix batch, at most one confirmation, then hand to the user; never self-grade as final. (local Build Studio direction, critique and ownership rules)

The seven rubric dimensions (hierarchy, spacing rhythm, typography, color and contrast, motion restraint, states completeness, anti-slop) are explicit local method choices. Their anchors are synthesized from the sources above; the 0 to 4 scale uses the local audit scale (local Build Studio direction, critique and ownership rules). There is no external standard rubric with these exact dimensions; say so if asked.

## 5. Prototype fidelity

- Fidelity has three independent dimensions: interactivity, visuals, content. (Nielsen Norman Group, Prototype Fidelity)
- Low fidelity is cheap and signals unfinished work; high fidelity suits workflow and visual tests but invites attachment and premature launch decisions. (Nielsen Norman Group, Prototype Fidelity)
- Therefore this UX method locks direction (owner approval) before building high-fidelity prototypes, and labels every prototype "prototype, not production". (Nielsen Norman Group, Prototype Fidelity)
- Pilot every prototype before showing it. (Nielsen Norman Group, Prototype Fidelity)

## 6. Accessibility baseline (WCAG 2.2 AA)

| SC | Level | Design-time requirement | Source |
|---|---|---|---|
| 1.4.3 Contrast (Minimum) | AA | 4.5:1 body text, 3:1 large text | (W3C, WCAG 2.2 Recommendation) |
| 1.4.11 Non-text Contrast | AA | 3:1 for component boundaries, states, required graphics | (W3C, WCAG 2.2 Recommendation) |
| 1.4.10 Reflow | AA | Works at 320 CSS px wide without two-dimensional scroll | (W3C, WCAG 2.2 Recommendation) |
| 2.4.7 Focus Visible | AA | Visible keyboard focus | (W3C, WCAG 2.2 Recommendation) |
| 2.4.11 Focus Not Obscured (Minimum) | AA, new | Sticky headers and overlays never fully hide focus | (W3C WAI, New in WCAG 2.2) |
| 2.5.7 Dragging Movements | AA, new | Single-pointer alternative for every drag | (W3C WAI, New in WCAG 2.2) |
| 2.5.8 Target Size (Minimum) | AA, new | 24 by 24 CSS px targets or a listed exception | (W3C WAI, New in WCAG 2.2) |
| 3.2.6 Consistent Help | A, new | Help in the same relative order across screens | (W3C WAI, New in WCAG 2.2) |
| 3.3.7 Redundant Entry | A, new | Do not re-ask for data already entered in the flow | (W3C WAI, New in WCAG 2.2) |
| 3.3.8 Accessible Authentication (Minimum) | AA, new | No cognitive test at sign-in without an alternative (allow paste and password managers) | (W3C WAI, New in WCAG 2.2) |
| 1.3.1 Info and Relationships | A | Structure shown visually is also in markup or text | (W3C WAI, WCAG 2.2 Quick Reference) |
| 1.4.1 Use of Color | A | Color is never the only signal | (W3C WAI, WCAG 2.2 Quick Reference) |
| 2.4.6 Headings and Labels | AA | Headings and labels describe topic or purpose | (W3C WAI, WCAG 2.2 Quick Reference) |
| 4.1.2 Name, Role, Value | A | Controls expose name, role, state to assistive technology | (W3C WAI, WCAG 2.2 Quick Reference) |
| 4.1.3 Status Messages | AA | Status announced without moving focus (live regions) | (W3C WAI, WCAG 2.2 Quick Reference) |
| 2.3.3 Animation from Interactions | AAA | Interaction motion can be turned off; this UX method adopts it as a house rule via reduced motion | (W3C WAI, WCAG 2.2 Quick Reference) |
| 4.1.1 Parsing | removed | Not part of 2.2 | (W3C, WCAG 2.2 Recommendation) |

Reduced motion: honor `prefers-reduced-motion: reduce` by removing or replacing scale and pan motion, for example with opacity. (MDN, prefers-reduced-motion) A design-time baseline does not establish conformance; conformance needs testing of the built product (consistent with the local motion rule).

## 7. Tokens and DESIGN.md

| Format | Shape | Status | Source |
|---|---|---|---|
| DTCG Format Module 2025.10 | JSON, `.tokens.json`, `$value`, `$type`, groups, `{group.token}` aliases, composite types | Stable community group report, 2025-10-28 | (Design Tokens Community Group, Format Module 2025.10) |
| DESIGN.md (Google Labs) | YAML front matter tokens (colors, typography, rounded, spacing, components) plus ordered `##` prose sections | Draft, version alpha, Apache-2.0 | (Google Labs, DESIGN.md format (alpha snapshot)), (Google Labs, Stitch DESIGN.md article) |

- DESIGN.md prose sections, when present, must follow: Overview, Colors, Typography, Layout, Elevation & Depth, Shapes, Components, Do's and Don'ts. Duplicate headings reject the file. (Google Labs, DESIGN.md format (alpha snapshot))
- the historically documented `@google/design.md` lint operation validates (exit 1 on errors; warns under 4.5:1 contrast); `export --format dtcg` or `css-tailwind` converts. (Google Labs, DESIGN.md format (alpha snapshot))
- An existing accepted `DESIGN.md` and any generated design sidecar belong to the project's design-system owner; this planning method does not hand-edit or promote them. (local Build Studio direction, critique and ownership rules) So this UX method drafts DESIGN.md proposals and leaves promotion to the explicitly authorized Design Foundation caller and owner.
- A separately authorized live-app capture can supply candidate tokens in DTCG 2025.10 shape for live apps. (local Build Studio direction, critique and ownership rules)

## 8. Diagrams

- Mermaid flowcharts: `flowchart TD` or `LR`; decision nodes via `diam` shape or `{}`; `%%` comments on their own line; do not use lowercase `end` as a label. (Mermaid, Flowchart syntax)
- Every diagram gets `accTitle:` and `accDescr:` immediately after the declaration; they render as SVG title and desc with aria attributes. (Mermaid, Accessibility)

## 9. Light and dark in single-file prototypes

- Set `color-scheme: light dark` on `:root`; then `light-dark(a, b)` resolves per scheme without media blocks. Baseline 2024. (MDN, light-dark())
- `color-scheme` can be forced on a subtree, which is how a manual theme toggle overrides the OS preference. (MDN, light-dark())

## 10. Known gaps and conflicts

- Claude Design export internals are undocumented (section 1.3). Conflict: launch article lists "a saved folder" and "internal URL" exports, the current help article lists .zip and partner destinations; the historical method preferred the then-current help article; check the actual owner interface before relying on that choice. (Anthropic, Claude Design launch announcement (2026)), (Anthropic, Claude Design getting started (historical October 2026 snapshot))
- `/design-sync` scope conflict: help article lists four import sources (repo, design files, raw uploads, local codebase); secondary coverage says the command itself targets React design systems. Read as: the four sources are Claude Design import paths, and `/design-sync` is the local-codebase path that works best for React. (Anthropic, Claude Design getting started (historical October 2026 snapshot)), (AI Catchup, design-sync coverage (secondary))
- Several UX method sources predate the window. They were kept because they remain the primary references and several were reviewed by their publisher inside the window (journey mapping 2026-07-15, journeys vs flows 2026-08-27).
- No primary source defines a numeric "good enough" threshold for a design critique. The pass bar in this UX method is a stated house decision, not research.
