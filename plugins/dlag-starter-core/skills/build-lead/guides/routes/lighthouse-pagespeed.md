# Lighthouse Pagespeed routing

Use **Browser and Accessibility Checks** for the bounded decisions below. Check [scope and tool limits](../scope-and-tools.md) first. A route is a proposed handoff until actual availability, authorization and a dispatch receipt are established. Implementation, provider operations and tests remain unperformed unless the capable caller supplies their evidence.

The selected stack is React with React Router SSR, Cloudflare Workers, Supabase database and Auth, Cloudflare secrets and R2, transactional Resend and optional hosted Stripe Checkout. Framework/provider-specific recipes that require another stack are unavailable. Reuse the decision criteria, inputs, negative routing and output requirements only inside that selected scope; consult the current owner's Playbook before any concrete API or configuration recipe.



## Domain
This Specialist owns the full Lighthouse and PageSpeed Insights measurement surface: running audits locally versus in CI (LHCI on GitHub Actions), interpreting all four audit categories (Performance, Accessibility, Best Practices, SEO), setting score and performance budgets, authoring custom Lighthouse plugins, and reconciling the lab-vs-CrUX field-data gap, including the case where TBT looks fine but field INP does not.


## Trigger phrases
- "set up Lighthouse CI"
- "add a performance budget to CI"
- "our Lighthouse score is 90 but CrUX says we're failing LCP"
- "configure LHCI for GitHub Actions"
- "compare Treo vs SpeedCurve"
- "write a custom Lighthouse plugin"
- "audit this site with Lighthouse"

## Do NOT route when
- The ask is SEO content strategy or keyword research rather than Lighthouse's technical SEO signals; that belongs to Website Builder for page metadata, or Browser Checks for measured performance; marketing strategy remains unavailable.
- The ask is implementing the fix for a Core Web Vitals finding (the code change itself); that belongs to React Foundation or a future performance-optimizer, once this Specialist has diagnosed the issue.
- The ask is CI/CD pipeline topology beyond the Lighthouse-specific step; that belongs to GitHub Workflow for review of existing CI evidence; broader CI implementation needs a designated capable caller.
- The user references Lighthouse 13 or Node 22 requirements; flag that LHCI 0.15.x support is unconfirmed as of the last research pass rather than guessing.

## Inputs the Specialist needs
- Whether the scenario is local debug, CI gate setup, budget enforcement, PSI/CrUX reconciliation, historical tracking, or plugin authoring.
- The current lighthouserc config and CI provider, if any.
- A baseline measurement before any budget is set (never gate CI below an unestablished baseline).

## Outputs
- A lighthouserc config and GitHub Actions workflow.
- A findings report distinguishing lab scores from CrUX field data, with metric-impact estimates.
- A custom Lighthouse plugin when built-in audits do not cover the requirement.

## Commonly sequenced with
- Font and Image Delivery: implements the image-side fixes this Specialist's audit surfaces.
- React Foundation: implements INP and other Core Web Vitals fixes once diagnosis is complete.
- Website Builder for page metadata, or Browser Checks for measured performance; marketing strategy remains unavailable: picks up content-strategy findings out of scope for the SEO audit category here.
