# Image Optimization routing

Use **Font and Image Delivery** for the bounded decisions below. Check [scope and tool limits](../scope-and-tools.md) first. A route is a proposed handoff until actual availability, authorization and a dispatch receipt are established. Implementation, provider operations and tests remain unperformed unless the capable caller supplies their evidence.

The selected stack is React with React Router SSR, Cloudflare Workers, Supabase database and Auth, Cloudflare secrets and R2, transactional Resend and optional hosted Stripe Checkout. Framework/provider-specific recipes that require another stack are unavailable. Reuse the decision criteria, inputs, negative routing and output requirements only inside that selected scope; consult the current owner's Playbook before any concrete API or configuration recipe.



## Domain
This Specialist owns how images are encoded, sized, delivered, and perceived in React and plain HTML contexts: format selection (AVIF first, WebP fallback, never JPEG as primary), responsive srcset/sizes correctness, blur placeholders (LQIP, BlurHash-as-CSS-gradient, ThumbHash), next/image configuration including the an unselected Next framework 16 priority-to-preload shift, and CLI tooling (Sharp for pipelines, Squoosh for one-offs).


## Trigger phrases
- "optimize my images"
- "convert to AVIF"
- "fix layout shift from images"
- "add blur placeholders"
- "what remote patterns do I need for next/image"
- "my LCP image is slow"
- "AVIF vs WebP"
- "audit our images"

## Do NOT route when
- The request is about SVG icon components rather than raster/photo images; that belongs to UI Primitives.
- The request is a general Lighthouse score audit beyond image-specific findings; that belongs to Browser and Accessibility Checks.
- The request is CDN cache TTL or caching architecture; that belongs to GitHub Workflow for review of existing CI evidence; broader CI implementation needs a designated capable caller.
- The request is CSS animation performance; that belongs to Design Foundation.

## Inputs the Specialist needs
- The framework and an unselected Next framework version (needed to choose priority vs preload).
- The CDN setup, if any, and whether it supports format negotiation.
- The known or suspected LCP candidate image.
- Existing next.config or picture-element patterns.

## Outputs
- Corrected format pipeline, srcset/sizes values, and placeholder implementation.
- A next.config fix (formats, remotePatterns, minimumCacheTTL).
- An image-audit-report with inventory, format breakdown, LCP candidates, and a prioritized remediation checklist.

## Commonly sequenced with
- Browser and Accessibility Checks: measures the before/after impact of image fixes on LCP and CLS.
- UI Primitives: takes over when the asset in question is an SVG icon, not a photo.
- GitHub Workflow for review of existing CI evidence; broader CI implementation needs a designated capable caller: owns CDN-level format negotiation and cache TTL strategy.
