# 13: Ecosystem Catalog

Use installed project versions. Code fences are focused examples with project imports identified, not complete applications or executed receipts. Additional packages, tools, provider setup and configuration require the applicable user authorization. Starter uses React Router framework SSR, Cloudflare Workers and Supabase; optional library comparisons do not select a service.

Evaluate these established category tradeoffs against the actual installed application and requested outcome. Fixed Starter platform choices stay fixed; optional library selection requires a concrete need and current package/API/license review.


## The catalog

| Category | Default pick | Alt (when) | Don't use |
|---|---|---|---|
| Framework (SSR) | **React Router framework SSR + Vite** | Preserve selected scaffold | Unselected framework migration |
| Rendering strategy | **Framework SSR** | Per-route prerender only when requested | Silent SPA fallback |
| Component library (headless) | **Radix UI** | react-aria for maximal a11y | N/A |
| Design-system starter | **shadcn/ui** | N/A | Material UI in new design-heavy apps |
| Styling | **Tailwind v4** | CSS Modules / vanilla-extract | styled-components, emotion in new code |
| Icons | **Lucide** | Tabler | react-icons (too heavy) |
| Global UI state | **Zustand** | Jotai (atomic), Redux Toolkit (large teams) | Raw Context for high-velocity |
| Server data | **Route loaders/actions** | Installed Query for distinct interactive lifecycle | Duplicate global store |
| URL state | **Router search parameters** | Installed typed nuqs adapter | Unshareable duplicated filters |
| Forms | **React Hook Form** | N/A | Formik (in new code) |
| Validation | **Zod** | Valibot (bundle-sensitive) | Yup (in new code) |
| HTTP | **ky** or **axios** | `fetch` wrapper | raw `fetch` scattered |
| Dates | **date-fns** | Temporal polyfill | Moment.js |
| Charts | **Recharts** | visx (custom) | Chart.js (not React-native) |
| Tables | **TanStack Table** | N/A | rolling your own |
| Animation | **Framer Motion** | react-spring | N/A |
| Test runner | **Vitest** | Jest (legacy) | N/A |
| Component tests | **React Testing Library** | N/A | Enzyme (abandoned) |
| E2E | **Playwright** | Cypress (legacy) | Selenium |
| API mocking | **MSW** | N/A | `nock`, manual fetch stubs |
| Auth | **Supabase Auth** | Selected request-scoped session model | Unselected auth provider |
| Error tracking | Existing approved redacted reporter | Record missing operational owner | Automatic vendor adoption |
| Bundle analysis | `rollup-plugin-visualizer` (Vite), the existing Vite analyzer | N/A | N/A |
| Internationalization | **react-i18next** | FormatJS for complex ICU | N/A |
| Markdown | **react-markdown** + rehype-sanitize | N/A | `dangerouslySetInnerHTML` |

## Why each default

- **React Router framework SSR**: route loaders/actions and SSR/hydration under the selected Workers scaffold; no RSC assumption.
- **Vite + React Router v7**: v7 is React Router's framework-mode release; loaders + actions ported from Remix.
- **Radix UI / shadcn/ui**: a11y first; shadcn gives you the component as code you own.
- **Tailwind v4**: zero runtime, SSR-compatible, Oxide engine makes builds fast.
- **Zustand**: smallest API that covers the 90% case.
- **TanStack Query**: full mutation lifecycle, DevTools, invalidation by key pattern.
- **URL state**: router-owned shareable filters; a typed adapter is optional.
- **React Hook Form + Zod**: performance (uncontrolled inputs) + shared schemas.
- **Vitest**: Vite-native, compatible with Vite; compare actual suite timings.
- **Playwright**: multi-browser, superior test UI mode.
- **MSW**: service-worker-level mocking; one handler set works in dev, Storybook, tests.
- **Error evidence**: redacted operational reporting and source maps require the actual selected implementation.

## Deliberately not recommended (explain why)

- **Moment.js**: 70KB+, mutable, maintenance-mode. `date-fns` is ~2KB per function, immutable.
- **Enzyme**: abandoned; tests implementation details. RTL tests user behavior.
- **Recoil**: Meta deprecated. Jotai is the successor in philosophy.
- **styled-components / emotion (new code)**: runtime CSS-in-JS generation is a perf tax and needs SSR/style evaluation.
- **Redux (without Toolkit)**: boilerplate. RTK is required on Redux.
- **react-scripts / CRA**: retired officially. Use Vite.
- **Material UI (in design-heavy products)**: hard to escape the MD aesthetic. Use Radix + Tailwind when custom branding matters.

## Open question

No dedicated TanStack owner is assumed. Use the existing React/data owners for requested Query/Table/Form work; React Router framework remains the selected router.

## Common findings

> **[Should-refactor]** `package.json:18`: `moment` listed; imported in 7 files. Migrate to date-fns. See [guides/13-ecosystem-catalog.md §deliberately-not-recommended](13-ecosystem-catalog.md). Batched migration PR recommended.

> **[Should-refactor]** `package.json:23`: uses `enzyme`. Migrate tests to React Testing Library.

## Example in action

See [examples/refactor-proposal-example.md §phase-5](../examples/refactor-proposal-example.md): legacy-library swap.
