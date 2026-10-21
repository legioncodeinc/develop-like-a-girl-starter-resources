# Dark Mode Theming routing

Use **UI Primitives** for the bounded decisions below. Check [scope and tool limits](../scope-and-tools.md) first. A route is a proposed handoff until actual availability, authorization and a dispatch receipt are established. Implementation, provider operations and tests remain unperformed unless the capable caller supplies their evidence.

The selected stack is React with React Router SSR, Cloudflare Workers, Supabase database and Auth, Cloudflare secrets and R2, transactional Resend and optional hosted Stripe Checkout. Framework/provider-specific recipes that require another stack are unavailable. Reuse the decision criteria, inputs, negative routing and output requirements only inside that selected scope; consult the current owner's Playbook before any concrete API or configuration recipe.



## Domain
This Specialist owns the runtime theming layer for React apps in this repo: the surface that turns design tokens into theme-aware CSS variables and wires them to user preference. That spans `prefers-color-scheme` detection, `a framework-appropriate theme provider` integration, flash-of-wrong-theme (FOWT) prevention scripting, SSR hydration safety, Tailwind v4 dark-mode configuration, and multi-brand or white-label runtime theme swapping via CSS variable overrides.


## Trigger phrases
- "set up dark mode"
- "a framework-appropriate theme provider keeps flashing"
- "dark mode on SSR"
- "multi-brand theming"
- "CSS variable token layer"
- "Tailwind v4 dark mode"
- "suppress hydration warning"
- "FOWT fix"

## Do NOT route when
- The ask is creating a color palette or picking brand colors from scratch: that's Design Foundation, which owns token source-of-truth.
- The ask is which token to apply to a specific component's visual state: that's Design Foundation.
- The ask is designing the `user_preferences.theme` database schema: that's Data Foundation.
- The ask is validating a `data-brand` value pulled from user input: that's Security Review.
- The ask is auth-gated per-user theme with RBAC: that's Authentication plus Data Foundation.

## Inputs the Specialist needs
- The existing token layer file (`globals.css` or `tokens.css`) if one exists
- `app/layout.tsx` / `pages/_document.tsx` and `pages/_app.tsx`
- Any existing `ThemeProvider` wrapper and Tailwind config version (v3 vs v4)
- Whether multi-brand or white-label theming is in scope

## Outputs
- Updated or new CSS token layer with semantic and primitive variables
- `ThemeProvider` wiring code and FOWT-prevention inline script
- An audit report scoring the setup against the six non-negotiables

## Commonly sequenced with
- Design Foundation: supplies the palette and token source of truth this Specialist wires into runtime theming
- Design Foundation: decides which token applies to which component state
- Security Review: reviews any brand or tenant value sourced from user input before it drives a CSS override
