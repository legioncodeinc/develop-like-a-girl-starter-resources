# Theme principles and SSR contract

The runtime theme layer translates approved design tokens and a preference into styles. Read the project's design brief before changing colors, typography or motion. Inspect both the root document and nested portals; a correct page with an incorrectly themed dialog is still a broken theme.

1. Components consume semantic roles such as background, foreground, action, error and ring. Palette primitives remain in the token stylesheet. Keep the existing token names when integrating.
2. A stored explicit `light` or `dark` choice wins over the OS. `system` follows the OS without repeatedly overwriting that choice. A resolved dark appearance is not the same value as a stored system preference.
3. Server HTML and the first client render agree on attributes, labels and control state. Browser APIs are used in effects or events, not shared-module evaluation or rendering.
4. CSS can resolve system preference before paint. Cookie-based explicit preference can be rendered by the server. An existing localStorage class strategy may need an early script; adding a script is conditional on that actual strategy and the application's CSP.
5. Brand overrides change semantic variables at an intentional scope. Resolve approved brand keys from trusted application data. They do not authorize access to tenant data.
6. Motion preferences remain independent of color preference. Reuse named motion tokens; do not animate every color change globally.

A wrong-theme flash happens when the initial stylesheet chooses one appearance and later JavaScript changes it after a visible paint. Hydration warnings are a separate symptom: suppressing a warning does not fix a flash or make mismatched markup correct. The [React Router example](../examples/react-router-theme.md) uses cookie preference plus CSS system selection, avoiding a bootstrap script entirely.

Return the actual source paths, persistence and selector choices, missing prerequisites, checks observed and checks still unrun. Source review alone cannot establish flash-free paint, contrast, hydration or assistive-technology behavior.
