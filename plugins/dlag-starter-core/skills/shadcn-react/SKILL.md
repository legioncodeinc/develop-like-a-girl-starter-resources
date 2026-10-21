---
name: shadcn-react
description: "Adapt project-owned shadcn/ui React components for React Router SSR, preserving local customizations, semantic tokens and accessible behavior."
license: AGPL-3.0-or-later
compatibility: Claude Code
---

# React shadcn Components Playbook

Read [the ownership procedure](guides/local-components.md), [the change record](templates/component-change.md), [current docs](references/current-docs.md), and [edition boundaries](../../references/edition-boundaries.md).

Start with `package.json`, the lockfile, `components.json` when present, aliases, the main stylesheet and requested local component files. Do not assume the alias or primitive family from a documentation snippet. Treat copied components as product-owned source. Preserve deliberate variants, labels and focus behavior.

For an expressly requested local component implementation, edit only relevant source using Write/Edit. Use the [example wrapper](examples/submit-button.tsx) only after confirming the local Button API. Missing components or dependencies are an explicit prerequisite, not permission to run a CLI. If installation is needed, return the exact small proposed dependency/file change and wait for installation authorization while completing independent edits.

Check class names, exports, interaction states and SSR safety; use [UI Components](../ui-primitives/SKILL.md) for keyboard/focus requirements. Return changed files, preserved customizations and evidence. Do not claim a CLI ran, component rendered or browser passed without execution. The [paired Specialist](../../agents/shadcn-react.md) may perform the same scoped edits directly.
