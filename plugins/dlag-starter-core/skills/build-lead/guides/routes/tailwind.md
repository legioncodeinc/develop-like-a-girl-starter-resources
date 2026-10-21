# Tailwind routing

Use **Design Foundation** for the bounded decisions below. Check [scope and tool limits](../scope-and-tools.md) first. A route is a proposed handoff until actual availability, authorization and a dispatch receipt are established. Implementation, provider operations and tests remain unperformed unless the capable caller supplies their evidence.

The selected stack is React with React Router SSR, Cloudflare Workers, Supabase database and Auth, Cloudflare secrets and R2, transactional Resend and optional hosted Stripe Checkout. Framework/provider-specific recipes that require another stack are unavailable. Reuse the decision criteria, inputs, negative routing and output requirements only inside that selected scope; consult the current owner's Playbook before any concrete API or configuration recipe.



## Domain
Owns Tailwind CSS v4 the framework itself, for any codebase: CSS-first configuration, `@theme` mechanics and namespace-to-utility generation, the full directive/function set (`@utility`, `@variant`, `@custom-variant`, `@apply`, `@reference`, `@source`), the `@tailwindcss/vite` plugin, v3-to-v4 migration, dark mode variants, container queries, arbitrary values, class ordering, and Oxide-engine performance. It explains how `@theme` works as a mechanism; it does not decide what any specific product's tokens should be.


## Trigger phrases
- "should this app use Tailwind and shadcn"
- "migrate to Tailwind v4"
- "set up @theme"
- "wire up the Tailwind Vite plugin"
- "why isn't dark mode working after the v4 upgrade"
- "container query this component"
- "sort my Tailwind classes"
- "should this repeated arbitrary value be a token"

## Do NOT route when
- Svelte runes/component implementation is outside Starter. React component behavior goes to React Foundation; Tailwind mechanics stay here.
- Bits UI and Melt UI are outside Starter. React shadcn handles the selected component-library mechanics.
- The ask is a project's specific token values, brand contract, or product-surface enforcement (the current project's approved token/brand sources define the requirement): route to Design Foundation immediately rather than answering from general Tailwind knowledge.
- The ask is cross-framework dark mode/theming strategy beyond Tailwind's own `@custom-variant` mechanics: route to UI Primitives for the pattern, keep this Specialist for the Tailwind-specific implementation.
- The ask is bootstrapping a design system from scratch rather than bridging an existing one into Tailwind: route to Design Foundation.

## Inputs the Specialist needs
- Whether the project is on Tailwind v3 or v4, and the framework/build tool (Vite and the selected React Router runtime).
- The specific surface: theme/tokens, migration, Vite setup, dark mode, container queries, class ordering, or anti-pattern review.
- Whether the question is about Tailwind mechanics or about a specific product's token values (the latter is out of scope).

## Outputs
- CSS-first `@theme` configuration or a token-extension/override/reset recommendation.
- A version-pinned migration proposal, with CSS/config/content-scan/theme breaking changes and required manual follow-ups. Running an upgrader or installing tooling requires a capable authorized caller.
- Vite/React wiring, `@custom-variant dark` configuration, or container-query patterns.
- File:line-cited findings for anti-pattern or performance review, citing official Catalyst benchmarks.

## Commonly sequenced with
- React Foundation for the selected React target; Svelte implementation is outside scope: when a styling task is entangled with component architecture.
- React shadcn: selected React component copy-in and theme compatibility; no Svelte adapter is implied.
- Design Foundation: whenever the question turns out to be about a project's actual token values or app-specific enforcement (the current project, for example).
- Quality Review: for post-migration or post-refactor verification.

## Component fit intake
For React/Vite compatibility, pin Tailwind v3/v4, content scanning, theme variables, component variants and dark-mode contracts. Design Foundation owns token values; React shadcn owns component copy-in mechanics. Other frameworks and Svelte runes are outside this target. A worksheet does not prove mounted browser behavior or accessibility.
