# Tanstack routing

Use **Application Data UI** for the bounded decisions below. Check [scope and tool limits](../scope-and-tools.md) first. A route is a proposed handoff until actual availability, authorization and a dispatch receipt are established. Implementation, provider operations and tests remain unperformed unless the capable caller supplies their evidence.

The selected stack is React with React Router SSR, Cloudflare Workers, Supabase database and Auth, Cloudflare secrets and R2, transactional Resend and optional hosted Stripe Checkout. Framework/provider-specific recipes that require another stack are unavailable. Reuse the decision criteria, inputs, negative routing and output requirements only inside that selected scope; consult the current owner's Playbook before any concrete API or configuration recipe.



## Domain
App Data UI owns client data/query caching, mutations, invalidation, accessible tables, forms and virtualization inside the selected React application. First ask whether React Router loaders/actions already meet the need. Confirm actual installed package versions and APIs before a concrete TanStack recipe. Framework-specific Svelte packages, runes, snippets and unofficial adapters are excluded; the compatibility rule remains: never invent support for an unsupported target. React Router remains the selected router.

## Trigger phrases
- "add TanStack Query"
- "qualify an installed React query library"
- "build a data table"
- "TanStack Form validation"
- "virtualize this list"
- "should I use TanStack Router"
- "do I actually need TanStack Query here or can the route loader handle it"

## Do NOT route when
- Route/component design belongs to React Foundation or Design Foundation, while this owner handles the data/table/form boundary.
- Hosting and cache configuration belong to Cloudflare Platform; preserve the query/SSR interaction as an explicit boundary.
- The ask is the underlying database schema behind a query function or table's row data: route to Data Foundation.
- Replacing React Router or using an unsupported framework adapter requires a scope decision; do not install a workaround.

## Inputs the Specialist needs
- Confirmation of the React project, installed versions and selected React Router SSR runtime.
- Whether React Router loaders/actions already solve the problem before reaching for TanStack Query.
- The specific library in play (Query, Table, Form, Virtual) and, for Query, whether the prefetch runs through a browser-safe or server-only loader.

## Outputs
- A recommendation on whether TanStack Query is warranted versus React Router loaders/actions.
- SSR-safe Query client setup, mutation/invalidation strategy, or a React-compatible Table configuration.
- A Form validation setup choosing between TanStack Form and the selected route action/form contract.
- An explicit compatibility and scope warning for requests to replace the selected router.

## Commonly sequenced with
- Design Foundation: for the surrounding route/component markup the table or form renders into.
- Cloudflare Platform for the selected Workers runtime: when a Query prefetch pattern interacts with Workers cache and SSR behavior.
- Data Foundation: for the data source behind a query function or table's row data.
