---
name: design-foundation
description: "Turn an approved visual direction into a small React/Tailwind design foundation, or refine an existing interface without changing its identity."
license: AGPL-3.0-or-later
compatibility: Claude Code
---

# Design Foundation Playbook

Make the intended user task obvious, then carry the same visual rules through its screens. This is the Starter React Router SSR edition.

1. Read [the design procedure](guides/design-a-surface.md), [the brief](templates/design-brief.md), and [edition boundaries](../../references/edition-boundaries.md).
2. Read existing product context, design notes, components and stylesheet before proposing a direction. Existing coherent code is evidence. Ask one compact batch only for missing choices that change the work.
3. Preserve approved palette, type and layout intent. For new identity work without usable references, request concrete references and the desired departures. An explicit user delegation can select a direction; record the assumption. A small component repair does not need a new branding interview.
4. Use semantic tokens before utilities, components and screens. Start with the [token bridge example](examples/token-bridge.css), adapting its illustrative values to the approved brief. Keep one authoritative stylesheet and actual component paths.
5. When scoped local implementation is requested, create or edit those source files using available Write/Edit tools, then read them back. A missing dispatch facility does not block direct use. Follow [UI Components](../ui-primitives/SKILL.md) for interaction and [React shadcn Components](../shadcn-react/SKILL.md) for local primitives.
6. Inspect the requested work in one batched desktop/mobile round when a browser is available, fix material findings together, and confirm only changed behavior. Without runtime tools, return exact code findings and mark visual, keyboard and hydration checks unrun.

Return changed paths, the design rationale in plain language, actual checks and remaining gaps. Do not claim user approval, screenshots, browser testing or accessibility conformance from source review. No mandatory external design engine installation. Read [current references](references/current-docs.md) when framework syntax is involved. The paired [Specialist](../../agents/design-foundation.md) follows these same limits.

For Tailwind configuration, tokens, migration, variants, containers, class detection or formatter questions, use [the Tailwind framework guide](tailwind/README.md). Its React/Vite examples preserve the existing application configuration and selected component library.
