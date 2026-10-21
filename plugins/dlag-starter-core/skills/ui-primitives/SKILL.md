---
name: ui-primitives
description: "Build or review accessible React controls, dialogs, status feedback, icons and SSR-safe theme behavior using the project's existing primitives."
license: AGPL-3.0-or-later
compatibility: Claude Code
---

# UI Components Playbook

Use when a person needs a control to behave predictably with keyboard, touch or assistive technology. Read [interaction and theme rules](guides/interaction-contract.md), [the check record](templates/component-check.md), [current references](references/current-docs.md), and [edition boundaries](../../references/edition-boundaries.md).

Inspect the actual local primitive and installed library family before editing. shadcn supports multiple primitive families; their composition APIs are not interchangeable. Follow the local component exports and [React shadcn Playbook](../shadcn-react/SKILL.md). Prefer a real button, input, label or link over a clickable div.

For requested local changes, implement the scoped React/CSS files with Write/Edit and read them back. Use the [SSR-safe status example](examples/status-and-button.tsx) as an illustrative pattern, adjusting imports and behavior to actual files. Explain the end-user effect and check the contract in one batch. Source inspection cannot establish focus trapping, screen-reader announcements or hydration success.

Return actual changed paths, success/error/pending behavior, observed checks and checks still unrun. No package installation, provider change or deployment. The [paired Specialist](../../agents/ui-primitives.md) can follow the method directly when no delegation tool exists.

## Detailed component routes

- [Theme behavior](theme/README.md): full token architecture, preference wiring, first paint, SSR, brand composition, complete React Router example and audit template.
- [Icons](icons/README.md): existing library fit, delivery strategy, safe name maps, accessible naming, custom SVGs and full usage examples.
- [Overlays](overlays/README.md): selection, modal contract, feedback taxonomy, layering, drawers, command menus, pending/error examples and audit template.

Each route uses the existing local primitive family and approved tokens. Provider or library names in conditional examples do not select or install a dependency.
