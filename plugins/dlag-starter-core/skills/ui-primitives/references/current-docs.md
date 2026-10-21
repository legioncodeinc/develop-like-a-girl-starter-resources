# Current references

Reviewed 2026-10-20.

- [WAI modal dialog pattern](https://www.w3.org/WAI/ARIA/apg/patterns/dialog-modal/): dialog semantics and keyboard/focus expectations ground the interaction contract.
- [shadcn Radix dialog](https://ui.shadcn.com/docs/components/radix/dialog): a family-specific example; inspect installed source before assuming a composition API.
- [Tailwind dark mode](https://tailwindcss.com/docs/dark-mode): system media queries and selector-driven dark variants are distinct strategies.

The interaction guide adapts the principles to React Router SSR. Browser and assistive-technology behavior still needs application evidence.

## Detailed-route references

Reference check date: 2026-10-21. Match APIs to the installed package; these links do not select a package version.

- [React Router root route](https://reactrouter.com/api/framework-conventions/root.tsx): root document and route exports.
- [React Router response headers](https://reactrouter.com/how-to/headers): explicit action/loader header propagation and parent merging.
- [React Router cookies](https://reactrouter.com/explanation/sessions-and-cookies): request-cookie and response-header boundaries.
- [Lucide React](https://lucide.dev/guide/react): named icon components and supported package API.
- [WAI alert dialog pattern](https://www.w3.org/WAI/ARIA/apg/patterns/alertdialog/): urgent/destructive confirmation semantics.
- [WCAG 2.2 focus criteria](https://www.w3.org/TR/WCAG22/#focus-not-obscured-minimum): criterion names and levels.

For an already installed optional primitive, check its official docs and matching source before applying the conditional example: [Radix Dialog](https://www.radix-ui.com/primitives/docs/components/dialog), [Vaul](https://github.com/emilkowalski/vaul), [Sonner](https://sonner.emilkowal.ski/), and [cmdk](https://github.com/pacocoursey/cmdk). Known integration questions are actual portal target, wrapper exports, snap-point types, toast live-region behavior, focus restoration and SSR compatibility. No remembered version claim closes those checks.

- [Workers response headers](https://developers.cloudflare.com/workers/runtime-apis/headers/): distinct Set-Cookie values and the Workers getAll accessor.
