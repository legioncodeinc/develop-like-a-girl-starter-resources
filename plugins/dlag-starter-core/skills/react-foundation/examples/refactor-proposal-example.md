# Refactor Proposal: "Legacy App → 2026 Standards"

Use installed project versions. Code fences are focused examples with project imports identified, not complete applications or executed receipts. Additional packages, tools, provider setup and configuration require the applicable user authorization. Starter uses React Router framework SSR, Cloudflare Workers and Supabase; optional library comparisons do not select a service.

A phased refactor plan. Output shape when the invocation is "propose a refactor". The final artifact is handed to `Project Notebook` for PRD authoring.

**Target:** `acme/dashboard-web` (React 17, CRA, Redux + redux-saga, Enzyme, moment.js, styled-components)
**Current pain:** 45s `start` boot, flaky tests (Enzyme + Redux), 22 must-fix anti-pattern findings from [scripts/scan-anti-patterns.ts](../scripts/scan-anti-patterns.ts).
**Goal:** the approved installed React target with React Router framework SSR, Workers, Supabase and Tailwind; coherent feature structure, native route data ownership and measured performance. Existing appropriate Query/Zustand clients may remain; Compiler adoption needs its own compatibility evidence.

## Guiding constraints

- **Ship-as-you-go.** No "big bang" cutover. Every phase must leave the app working and green in CI.
- **Phase gates are measurable.** Each phase exits when metrics hit targets.
- **ADRs per phase.** Architectural decisions recorded per [templates/ADR.md](../templates/ADR.md).

## Phases

### Phase 1: Structural refactor (no behavior change), 2 weeks

Move from layer-based (`src/components`, `src/services`, `src/reducers`) to feature-based per [guides/01-project-structure.md](../guides/01-project-structure.md).

**Steps:**
1. Create `src/features/` folder.
2. For each Redux slice, move slice + component + service into `src/features/<name>/`.
3. Add `eslint-plugin-import/no-restricted-paths` with cross-feature guards ([templates/eslint.config.js](../templates/eslint.config.js)).
4. Delete barrel `index.ts` files (anti-pattern #3).

**Exit criteria:** All imports comply with unidirectional rules. CI green. No behavior change.

**ADR:** ADR-101: Feature-based architecture adoption.

### Phase 2: Component API cleanup, 2 weeks

Apply [guides/02-components-and-composition.md](../guides/02-components-and-composition.md).

**Steps:**
1. Wrap 3rd-party components (`react-datepicker`, `react-select`, etc.) in `src/components/ui/`.
2. Identify top 10 components with >8 props. Refactor to compound / children pattern.
3. Convert `default export` → named exports.
4. Remove all `any` in prop types; use Zod inferred types where data is external.

**Exit criteria:** All components ≤7 props, named exports only, 0 `any` in prop types.

### Phase 3: Data layer migration, 3 weeks

**[guides/04-data-layer.md](../guides/04-data-layer.md).**

**Steps:**
1. Use route loader/action revalidation. Retain an already justified installed QueryClient only for a distinct client lifecycle, with request isolation.
2. For each redux-saga data flow, port to a feature-local `api/` file with the 3-part pattern.
3. Delete the Redux slice and its saga once all consumers moved.
4. Set bundle budget ([scripts/bundle-budget-check.ts](../scripts/bundle-budget-check.ts)); gate CI.

**Exit criteria:** Zero `createSlice` for server data. `redux-saga` removed. Initial dashboard bundle ≤ 300 KB gz.

**ADR:** ADR-102: From Redux + sagas to TanStack Query for server state.

### Phase 4: React 19 upgrade + Compiler, 2 weeks

**[guides/10-react-19-idioms.md](../guides/10-react-19-idioms.md), [guides/07-performance.md §react-compiler](../guides/07-performance.md).**

**Steps:**
1. Only under explicit upgrade scope, review installed React/ReactDOM compatibility and migrate to the approved target. Fix breaking changes (`UNSAFE_` lifecycles, PropTypes removals).
2. Inspect compatible installed React Hooks/Compiler linting before a separately authorized config change. Fix every violation. (This is the hardest step, expect real work.)
3. Enable Compiler in Vite config.
4. Migrate forms to React Hook Form + Zod ([guides/06-forms.md](../guides/06-forms.md)).
5. Remove defensive `useMemo` / `useCallback` now-handled-by-Compiler (except effect-dependency stability).
6. Convert existing `forwardRef` → ref-as-prop.

**Exit criteria:** Compiler reports all files optimizable; INP < 200ms on primary flows.

### Phase 5: Testing + library swaps, 2 weeks

**[guides/08-testing.md](../guides/08-testing.md), [guides/13-ecosystem-catalog.md](../guides/13-ecosystem-catalog.md).**

**Steps:**
1. Inspect existing Vitest/RTL/MSW/Playwright tools. Propose missing dependencies separately; keep existing tests during a scoped transition.
2. Migrate test files feature-by-feature; delete Enzyme tests after porting.
3. Replace `moment.js` → `date-fns`.
4. Replace `styled-components` → Tailwind + CSS Modules (incremental, component-by-component).
5. Preserve or migrate to the selected Supabase Auth request/session model only under explicit scope and Security Review.

**Exit criteria:** 0 Enzyme tests remaining. `moment` not in `package.json`. Coverage ≥ 70%.

### Phase 6: Framework SSR migration, scope estimate pending

1. Use the selected React Router/Vite/Workers scaffold and preserve current files until each route is characterized. Do not create a second SPA router or Next app directory.
2. Port one route and its data contract at a time. Loaders own initial reads and actions own mutations; keep private services and request actors in server modules.
3. Preserve URL behavior, cookies/session transport, denied ownership, pending/validation/error UI, cache lifetimes and browser hydration.
4. Security-review each authorization/mutation boundary before Quality verifies acceptance. Provider configuration or release needs separate authorization.
5. Retire an old entry/dependency only after explicit approval and rollback evidence. Do not delete working code merely because a replacement compiles.

**Exit criteria:** actual scoped type/build/tests, deep reload, SSR/hydration and denied-access evidence, reviewed route ownership and actual bundle measurements. The times/metrics elsewhere are illustrative forecasts, not delivery commitments or receipts.

**ADR per meaningful boundary.** See the local boundary ADR example.



## Success metrics

| Metric | Before | Target |
|---|---|---|
| First-load JS (main route) | 520 KB gz | ≤ 300 KB gz |
| LCP (4G throttled) | 4.2s | ≤ 2.5s |
| INP (p75) | 380ms | ≤ 200ms |
| Test runtime | 6m 40s | ≤ 2m |
| `package.json` deprecated libs | 8 | 0 |
| Anti-pattern findings | 22 must-fix | 0 must-fix |

## Handoff

- **This plan → `Project Notebook`** for PRD authoring. The PRD will expand Phase 3 and Phase 6 into user-visible milestones, acceptance criteria, risk register, rollback plan.
- **Per-phase ADRs → repo `library/knowledge/private/architecture/ADR-<n>-<topic>.md`.**
- **Post-phase QA → `Quality Review`.**

## References

- [guides/00-principles.md](../guides/00-principles.md) (severity rubric for "must-fix" gates)
- [guides/01-project-structure.md](../guides/01-project-structure.md) (Phase 1)
- [guides/04-data-layer.md](../guides/04-data-layer.md) (Phase 3)
- [guides/10-react-19-idioms.md](../guides/10-react-19-idioms.md) (Phase 4)
- [guides/11-server-components.md](../guides/11-server-components.md) (Phase 6)
- [official references](../references/official-sources.md)
