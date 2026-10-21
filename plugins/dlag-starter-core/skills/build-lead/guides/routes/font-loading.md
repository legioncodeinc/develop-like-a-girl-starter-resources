# Font Loading routing

Use **Font and Image Delivery** for the bounded decisions below. Check [scope and tool limits](../scope-and-tools.md) first. A route is a proposed handoff until actual availability, authorization and a dispatch receipt are established. Implementation, provider operations and tests remain unperformed unless the capable caller supplies their evidence.

The selected stack is React with React Router SSR, Cloudflare Workers, Supabase database and Auth, Cloudflare secrets and R2, transactional Resend and optional hosted Stripe Checkout. Framework/provider-specific recipes that require another stack are unavailable. Reuse the decision criteria, inputs, negative routing and output requirements only inside that selected scope; consult the current owner's Playbook before any concrete API or configuration recipe.



## Domain
This Specialist owns the mechanics of the browser's font loading pipeline: `font-display` descriptor selection (swap/optional/fallback/block) with CLS risk analysis, `<link rel="preload">` strategy with correct `crossorigin`, variable-font subsetting via pyftsubset/glyphhanger/subfont, framework-independent React/Vite font loading, and eliminating CLS from font swaps via `size-adjust` and `ascent-override` metric-matched fallbacks. It sits between the upstream aesthetic decisions of Design Foundation and the CI infrastructure of GitHub Workflow for review of existing CI evidence; broader CI implementation needs a designated capable caller, owning everything in between.


## Trigger phrases
- "audit font loading"
- "fix FOIT"
- "CLS from font swap"
- "configure font loading in React/Vite"
- "preload fonts"
- "subset variable font"
- "font-display strategy"
- "font performance checklist"

## Do NOT route when
- The ask is typeface aesthetic selection or fluid type scale construction: that's Design Foundation, this Specialist starts once a typeface is chosen.
- The ask is build-pipeline CI automation for font subsetting: that's GitHub Workflow for review of existing CI evidence; broader CI implementation needs a designated capable caller, this Specialist provides the exact CLI command, not the pipeline wiring.
- The ask is broader Core Web Vitals measurement beyond CLS: that's Website Builder for page metadata, or Browser Checks for measured performance; marketing strategy remains unavailable, this Specialist is scoped to the CLS consequence of font loading specifically.
- The font is a paid or licensed typeface and the user hasn't confirmed a web license permitting subsetting: stop and ask before recommending self-hosting.

## Inputs the Specialist needs
- The presenting symptom: FOIT, FOUT with CLS, FOFT, slow load, or a proactive audit request
- Existing `@font-face` rules, preload links and font-delivery code, or their absence
- Actual React Router SSR/Vite asset paths and server/browser rendering behavior; other framework font APIs are unavailable
- Whether the project self-hosts fonts (needs subsetting) or loads from Google Fonts

## Outputs
- Corrected `@font-face` rules with explicit `font-display` and metric-matched fallback overrides
- `<link rel="preload">` markup with `crossorigin="anonymous"` correctly set
- A selected-stack font configuration proposal, or a version-qualified subset command for a capable authorized caller

## Commonly sequenced with
- Design Foundation: supplies the typeface and scale decisions this Specialist implements the loading mechanics for
- GitHub Workflow for review of existing CI evidence; broader CI implementation needs a designated capable caller: automates the subsetting CLI command this Specialist specifies into a CI step
- Website Builder for page metadata, or Browser Checks for measured performance; marketing strategy remains unavailable: measures the broader Core Web Vitals picture this Specialist's CLS fix feeds into
