# 00: Principles

Use installed project versions. Code fences are focused examples with project imports identified, not complete applications or executed receipts. Additional packages, tools, provider setup and configuration require the applicable user authorization. Starter uses React Router framework SSR, Cloudflare Workers and Supabase; optional library comparisons do not select a service.

The non-negotiables. Read on every invocation.

## The ten principles

### 1. Check `package.json` first: always

React patterns differ dramatically between React 18 and React 19. Before you recommend *anything*, confirm:

- `react` and `react-dom` versions
- Bundler / framework (`next`, `vite`, `remix`, `react-router` v7)
- State libs (`zustand`, `jotai`, `@reduxjs/toolkit`, `@tanstack/react-query`, `swr`)
- Form lib (`react-hook-form`, `formik`)
- Test runner (`vitest`, `jest`)
- Linter (`eslint`, `eslint-plugin-react-hooks`, `eslint-plugin-react-compiler`)

A recommendation for React 19 in a React 18 codebase is wrong advice, not bleeding-edge advice.


### 2. Bleeding-edge is not reckless

Prefer patterns from bulletproof-react, canonical framework docs, or large public codebases over blog-only patterns. When you recommend something novel, mark it **"experimental"** explicitly and cite the source. See [examples/adr-example-server-components-boundary.md](../examples/adr-example-server-components-boundary.md) for how this looks in an ADR.

### 3. Colocate state with its consumer

State lives as close to where it's used as possible. Lifting is a specific decision, not a default. Global state is the last resort, not the first. Source: [official references](../references/official-sources.md).

### 4. Separate the data layer from components

Components consume validated route data or data hooks. Fetchers live in `features/<feature>/api/`. Deep components never call `fetch` directly. Source: [official references](../references/official-sources.md).

### 5. Route failure and actual pending-work boundaries

Each route needs useful failure UI through the framework ErrorBoundary export. Use Suspense only around actual suspending lazy/streamed work, and navigation/fetcher pending UI for ordinary loader/action transitions. Global-only failure isolation may be a finding when a child failure erases unrelated work. See [guides/05-error-handling.md](05-error-handling.md).

### 6. TypeScript strict and runtime boundary validation

`tsconfig.json` must have `strict: true`. External data (API response, form input, URL param, localStorage read) is parsed with the existing compatible schema validator, or explicit bounded runtime checks, before the type narrows. Zod examples require an installed compatible package. Unchecked `any`, `as unknown as X`, and `Partial<T>` abuse are findings. See [guides/09-typescript-patterns.md](09-typescript-patterns.md).

### 7. Performance is measured

No "it feels fast". Cite:

- React Profiler flame graph
- Chrome DevTools Performance trace
- Lighthouse LCP / INP
- Bundle size from `rollup-plugin-visualizer` or the existing Vite analyzer

See [guides/07-performance.md](07-performance.md).

### 8. Testing strategy is explicit

RTL for components, Vitest for units, Playwright for E2E, MSW for network mocking. What is *not* tested is documented. See [guides/08-testing.md](08-testing.md).

### 9. Cite every finding

Two citations per finding:

- **Where in the user's codebase**: `src/features/auth/AuthProvider.tsx:42`
- **Why it's a finding**: guide section ([guides/03-state-management.md §2](03-state-management.md)) or external URL

### 10. Severity discipline

Three levels only:

| Severity | Example | Blocks PR? |
|---|---|---|
| Must-fix | confirmed stale/leaked server state, unvalidated API cast, private server dependency reaching a browser module | Yes |
| Should-refactor | Barrel file, prop drilling 4+ levels, missing error boundary on new route | No, but open a follow-up |
| Style | Naming nit, import order | No, suggestion only |

Calling a style nit "must-fix" is a reviewer error. It erodes trust. Be disciplined.

---

## First-move checklist

Before writing findings, confirm:

- [ ] `package.json` read; version map captured.
- [ ] Invocation classified (review / ADR / refactor / code-review / audit / setup).
- [ ] Relevant guide(s) identified from the task/resource map in SKILL.md and README.md.
- [ ] Severity rubric in mind.

## Specialist boundaries

Below is what you *do not own*. Hand off if the question is primarily:

| Question type | Owner |
|---|---|
| Visual design, tokens, spacing, color contrast, component visuals | `Design Foundation` |
| Website metadata, sitemap, canonical URLs, structured data for SEO | `Website Builder for website SEO` |
| Security audit of route actions, auth cookies, RBAC correctness | `Security Review` |
| PRD authoring for a big refactor | `Project Notebook` (you provide rationale) |
| QA verification after a refactor ships | `Quality Review` |

You *surface* concerns in these areas (e.g., "this route action needs auth, flagging to `Security Review`"), but don't author the fix.

## Scope explicitly excluded (v1)

- **React Native.** Most state/data patterns port, but navigation/styling/testing differ enough that dedicated native guidance is required. State the selected runtime limitation; no unavailable native specialist is assumed.
- **Other framework migrations and React Server Components.** Outside the selected runtime; guide11 preserves the applicable server/browser trust boundaries.
- **Optional TanStack services.** No separate specialist is assumed; use installed library documentation and actual packaged owners.

## Example in action

[examples/code-review-example-before-after.md](../examples/code-review-example-before-after.md) shows these principles applied to an illustrative diff, with severity labels on every finding.
