# Theme behavior

Use this route for light/dark/system preference, a wrong-theme flash, hydration mismatches, token wiring, or a supplied brand override. Read the actual root route, stylesheet, persistence mechanism and installed provider before editing. Preserve the existing strategy when it works. Theme state is presentation data, never authorization.

| Task | Resource |
|---|---|
| Scope, decision rules and SSR contract | [Principles](guides/00-principles.md) |
| Palette-to-component aliases | [Token architecture](guides/01-css-token-architecture.md) |
| Preference persistence and provider choices | [Preference wiring](guides/02-preference-wiring.md) |
| First paint and CSP | [Flash prevention](guides/03-flash-prevention.md) |
| Initial render agreement | [Hydration](guides/04-ssr-hydration.md) |
| Selector and utility bridge | [Tailwind](guides/05-tailwind-dark-mode.md) |
| Existing brand overlays | [Brand composition](guides/06-brand-composition.md) |
| Complete document and preference control | [React Router example](examples/react-router-theme.md) |
| Invalid, missing and blocked persistence | [Cookie edge cases](examples/cookie-edge-cases.md) |
| Full editable CSS roles | [Token template](templates/tokens.css.md) |
| Findings and observed checks | [Audit template](templates/theme-audit.md) |

Implement only the requested local source changes. Palette choices belong to the approved design brief. Account-level preference storage, tenant authorization and new CSP configuration require their respective implementation owners. Keep findings in the requested project documentation location; do not write audit output into an installed Playbook. Name saved reports `YYYY-MM-DD-theme-review.md` when no project naming convention exists.
