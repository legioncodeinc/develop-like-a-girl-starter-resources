# Typography Font routing

Use **Design Foundation** for the bounded decisions below. Check [scope and tool limits](../scope-and-tools.md) first. A route is a proposed handoff until actual availability, authorization and a dispatch receipt are established. Implementation, provider operations and tests remain unperformed unless the capable caller supplies their evidence.

The selected stack is React with React Router SSR, Cloudflare Workers, Supabase database and Auth, Cloudflare secrets and R2, transactional Resend and optional hosted Stripe Checkout. Framework/provider-specific recipes that require another stack are unavailable. Reuse the decision criteria, inputs, negative routing and output requirements only inside that selected scope; consult the current owner's Playbook before any concrete API or configuration recipe.



## Domain
Owns the technical typographic surface of web products: font-loading strategy (approved hosted fonts, Fontsource, self-hosted, system fallbacks), variable font subsetting and `font-display` rules, fluid type scales built with `clamp()`, vertical rhythm via `line-height` and spacing tokens, and the font-token layer consumed by the design system. It owns `font-display` and preload strategy where typography overlaps LCP performance, but hands the Core Web Vitals measurement loop off.


## Trigger phrases
- "set up fonts for this project"
- "audit our typography"
- "fix FOIT/FOUT"
- "build a type scale"
- "qualify a React/Vite font loading change"
- "self-host our fonts"
- "set up fluid type with clamp"
- "our variable font is 600kB, what do we do"

## Do NOT route when
- The ask is typeface selection or the brand's typographic identity itself: route to Design Foundation.
- The ask is applying already-defined type tokens to a specific component: route to Design Foundation.
- The ask is build-pipeline font optimization such as `glyphhanger` running in CI: route to GitHub Workflow for review of existing CI evidence; broader CI implementation needs a designated capable caller.
- The ask is the data schema for persisted user font preferences: route to Data Foundation.
- The ask is the broader Core Web Vitals/LCP audit beyond `font-display` and preload strategy: route to Website Builder for page metadata, or Browser Checks for measured performance; marketing strategy remains unavailable.

## Inputs the Specialist needs
- The current font setup: which fonts, how loaded (CDN, Fontsource, raw `@font-face`), and the framework.
- Whether the font is a paid/licensed typeface with confirmed subsetting permission.
- The target min/max viewport range for a fluid type scale.
- The actual React Router SSR/Vite loading boundary and applicable asset configuration.

## Outputs
- `@font-face` and selected-stack preload configuration with explicit `font-display`.
- A `clamp()`-based fluid type scale and vertical-rhythm token set.
- A `tokens/typography.css` file following the primitive/semantic/component tier architecture.
- A structured audit report covering FOIT/FOUT/FOFT findings and font payload budget.

## Commonly sequenced with
- Design Foundation: for the typeface/brand decision this Specialist's technical implementation serves.
- Design Foundation: for applying the resulting type tokens at the component level.
- Website Builder for page metadata, or Browser Checks for measured performance; marketing strategy remains unavailable: for the Core Web Vitals measurement loop once `font-display` and preload are set.
