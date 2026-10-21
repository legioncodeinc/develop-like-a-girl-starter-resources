# Check styling and component fit

Read actual package versions, framework entry files, CSS entry and browser requirements. Preserve the working stack and component library unless the task explicitly changes them. Complete [the fit worksheet](../references/component-fit-intake.md).

1. Separate utility styling, interaction primitives, copied component source and product design tokens. Choosing Tailwind does not select a dialog implementation or brand.
2. Starter uses React and the actual installed React component variants. Follow [UI Components](../../../ui-primitives/SKILL.md) for behavior and [React shadcn Components](../../../shadcn-react/SKILL.md) for the existing copied components. Do not translate a Svelte or Vue component by changing its extension.
3. Read class construction and source detection. Complete literal maps work; `bg-${color}-600` does not produce discoverable finite alternatives. Register only the actual ignored package source path, relative to the CSS entry.
4. Map approved reusable roles using `@theme`; use ordinary variables when no utility should be generated. Check alias scope before applying `inline`.
5. Keep one light/dark/system contract across server render, hydration and navigation. Use the UI theme procedure for persistence and the [variant guide](04-dark-mode-and-variants.md) for compilation.
6. Check actual production CSS for representative classes, then the consuming app's build and browser behavior when tools permit. Dialog tests cover opening, initial focus, keyboard containment, Escape, close and focus return. Also check labels, disabled/error states, contrast and zoom. Mark unavailable checks unrun.
7. Keep existing license notices for copied component code and identify who maintains local changes. This review does not authorize installs, component replacement or provider changes.

[Worked cases](../references/component-fit-worked-cases.md) give concrete decisions and expected checks.
