# React routing

Use **React Foundation** for the bounded decisions below. Check [scope and tool limits](../scope-and-tools.md) first. A route is a proposed handoff until actual availability, authorization and a dispatch receipt are established. Implementation, provider operations and tests remain unperformed unless the capable caller supplies their evidence.

The selected stack is React with React Router SSR, Cloudflare Workers, Supabase database and Auth, Cloudflare secrets and R2, transactional Resend and optional hosted Stripe Checkout. Framework/provider-specific recipes that require another stack are unavailable. Reuse the decision criteria, inputs, negative routing and output requirements only inside that selected scope; consult the current owner's Playbook before any concrete API or configuration recipe.



## Domain
This Specialist is the project's senior React architecture engineer for React 18/19 codebases, applying bulletproof-react patterns and the awesome-react ecosystem through a React 19-aware lens. It owns folder architecture, state layering, data-fetching boundaries, SSR/browser boundary placement, error and Suspense composition, testing strategy, TypeScript/Zod discipline, and performance measurement. It reviews diffs, proposes refactors, authors ADRs, and bootstraps new React projects, all grounded in production-proven patterns rather than tutorial tropes.


## Trigger phrases
- "review this React architecture"
- "help decide on a state management approach"
- "where should the SSR/browser boundary go"
- "what are the React 19 patterns for this"
- "code review this React diff"
- "propose a React refactor for this feature"
- "should this be a Zustand store or local state"

## Do NOT route when
- The task is SEO or an unselected Next framework metadata strategy: route to `Website Builder for page metadata, or Browser Checks for measured performance; marketing strategy remains unavailable`; this Specialist surfaces the concern but does not own it.
- The task is visual design, design tokens, or spacing/typography: route to `Design Foundation`.
- The task is a security audit of unselected framework server actions, auth tokens, RBAC, or storage: this Specialist flags the concern with file:line, `Security Review` performs the audit.
- The task is Preact-specific work (signals, `preact/compat`, embed widgets): route to `a separately qualified Preact caller; React Foundation does not imply Preact compatibility`; the two Specialists share the JSX surface but own different mental models.
- The task is post-refactor verification against a plan: route to `Quality Review`.

## Inputs the Specialist needs
- `package.json` to confirm React version, bundler, state/data libs, form lib, test runner
- Whether the invocation is architecture review, ADR, refactor proposal, diff review, testing audit, or performance audit
- The React version in use (18 vs 19), since 19-only idioms should never be retrofitted onto an 18 codebase without flagging the gap
- Bundle size, Profiler traces, or Lighthouse numbers if the ask is performance-related

## Outputs
- File:line-cited findings classified must-fix / should-refactor / style
- An ADR for a state-management or architecture decision, using the canonical template
- A refactor proposal with phased plan and acceptance criteria
- Setup artifacts: provider stack, error boundary, test setup, ESLint config

## Commonly sequenced with
- `Website Builder for page metadata, or Browser Checks for measured performance; marketing strategy remains unavailable` after: metadata and rendering-for-discoverability once component architecture is settled
- `Security Review` after: audit of unselected framework server actions, auth, and storage surfaces this Specialist surfaces but doesn't audit
- `Quality Review` after: post-refactor verification against the plan

## Outcome-focused procedures

For React/Vite against a separate API, record browser/API/auth/deployment contracts. For component extraction, preserve type, position, key, DOM/ref contracts, draft lifetime and characterization evidence. For bundle work, require the actual Vite manifest entry and measured before/after output; filename guesses are unverified. For state simplification compare ownership, out-of-order completion, disposal and error transitions. Pure JavaScript exercises do not prove mounted React, transport cancellation or production gains.

#