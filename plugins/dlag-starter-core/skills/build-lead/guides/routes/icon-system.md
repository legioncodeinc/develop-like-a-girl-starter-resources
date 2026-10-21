# Icon System routing

Use **UI Primitives** for the bounded decisions below. Check [scope and tool limits](../scope-and-tools.md) first. A route is a proposed handoff until actual availability, authorization and a dispatch receipt are established. Implementation, provider operations and tests remain unperformed unless the capable caller supplies their evidence.

The selected stack is React with React Router SSR, Cloudflare Workers, Supabase database and Auth, Cloudflare secrets and R2, transactional Resend and optional hosted Stripe Checkout. Framework/provider-specific recipes that require another stack are unavailable. Reuse the decision criteria, inputs, negative routing and output requirements only inside that selected scope; consult the current owner's Playbook before any concrete API or configuration recipe.



## Domain
This Specialist owns the icon delivery layer in React applications: library selection (Lucide, Heroicons, Tabler, Phosphor, Iconify), the tree-shake-vs-SVG-sprite delivery trade-off, the dynamic-import-by-name pattern for loading icons from a runtime string key, custom SVG component authoring, and the accessibility contract that separates decorative icons (aria-hidden) from semantic icons (aria-label) and interactive icon buttons (accessible name on the button).


## Trigger phrases
- "which icon library should we use"
- "our bundle size jumped after adding icons"
- "wire a dynamic icon loader that takes a name string"
- "build a custom SVG icon wrapper"
- "audit our icons for accessibility"
- "icon button has no accessible name"

## Do NOT route when
- The question is about icon size or color design tokens rather than the component itself; that belongs to Design Foundation.
- The question is about SVG sprite build-pipeline tooling (SVGO, svg-sprite CLI, vite-plugin-svgr) at the bundler level; that belongs to GitHub Workflow for review of existing CI evidence; broader CI implementation needs a designated capable caller.
- The question is general React bundle optimization beyond icon imports; that belongs to GitHub Workflow for review of existing CI evidence; broader CI implementation needs a designated capable caller.
- The icon set needs a custom self-hosted Iconify API deployment; that is out of scope, point to Iconify's own docs.

## Inputs the Specialist needs
- The framework and rendering context (an unselected Next framework App Router vs Pages, RSC boundary).
- Existing icon library in use, if any, and the icon count/bundle budget.
- Whether the icon is decorative, semantic, or interactive (drives the a11y contract).

## Outputs
- An icon component (static named import, dynamic loader, or custom SVG wrapper).
- An accessibility-audit finding for any icon missing the correct aria treatment.
- A filled icon-audit-report covering library config, delivery strategy, and accessibility findings.

## Commonly sequenced with
- Design Foundation: supplies the size/color tokens the icon component consumes.
- GitHub Workflow for review of existing CI evidence; broader CI implementation needs a designated capable caller: owns the SVGO/sprite build pipeline and broader bundle optimization.
