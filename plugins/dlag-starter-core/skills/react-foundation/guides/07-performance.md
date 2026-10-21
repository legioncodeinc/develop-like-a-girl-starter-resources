# 07: Performance

Use installed project versions. Code fences are focused examples with project imports identified, not complete applications or executed receipts. Additional packages, tools, provider setup and configuration require the applicable user authorization. Starter uses React Router framework SSR, Cloudflare Workers and Supabase; optional library comparisons do not select a service.


## The principle

**Measure, then optimize.** "It feels fast" is not data. Every performance finding must cite:

- React Profiler flame graph (DevTools)
- Chrome DevTools Performance trace
- Lighthouse LCP / INP
- Bundle size from `rollup-plugin-visualizer` / the existing Vite analyzer

## Hierarchy of performance wins (apply in order)

### 1. Route-level code splitting

```tsx
const Dashboard = lazy(() => import('./routes/dashboard'));
```

Route boundary is the sweet spot. More granular splitting produces too many requests; less adds to initial bundle.

### 2. Colocate state

State near its consumer = fewer components re-render when it updates. See [guides/03-state-management.md](03-state-management.md).

### 3. Composition via `children`

Children passed as JSX are isolated from parent state updates:

```tsx
// Parent re-renders on count change. <PureComponent /> is NOT a child of state holder ;  doesn't re-render.
<Counter>
  <PureComponent />
</Counter>

function Counter({ children }) {
  const [count, setCount] = useState(0);
  return <div><button onClick={() => setCount(c => c + 1)}>{count}</button>{children}</div>;
}
```

Source: bulletproof-react. This is the first-reach performance pattern.

### 4. React Compiler (if eligible)

If the installed runtime/build combination supports it, evaluate React Compiler with existing compatibility linting and a measured baseline. No automatic dependency/config change. It automatically memoizes components and hooks. See [official references](../references/official-sources.md).

Adoption:

1. Inspect the installed compatible lint/compiler integration; confirm authorization for any proposed addition.
2. Fix all reported violations (mutations, impure functions, conditional hooks).
3. Review the pinned Vite/framework plugin configuration and actual compiler output. Plugin presence does not establish activation.
4. Change memoization only with actual behavior/performance evidence; preserve dependencies and object-identity contracts.

### 5. State initializer for expensive init

```tsx
// bad: runs every render
const [state, setState] = useState(expensiveFn());
// good: runs once
const [state, setState] = useState(() => expensiveFn());
```

### 6. Zero-runtime styling

Runtime CSS-in-JS (emotion, styled-components) generates styles per-render. Prefer Tailwind / vanilla-extract / CSS Modules (build-time).

### 7. Manual memoization: last resort

Reach for `useMemo` / `useCallback` / `memo` only after measuring. Cite the Profiler run in the PR. Compiler-enabled codebases rarely need them.

## Bundle budgets

Use [guide23](23-measure-bundle-weight.md) for current emitted-asset measurement. The helper measures an explicit Vite manifest entry, not URL routes or Next.js first-load totals. Filename-only invocation is unverified and exits2. Set product-specific entry budgets only after measuring the real build.

Illustrative budget proposals, not measured universal targets (adjust per product):

| Route type | First-load JS |
|---|---|
| Landing / marketing | ≤ 90 KB gz |
| Auth | ≤ 120 KB gz |
| App shell | ≤ 180 KB gz |
| Heavy feature page (editor, dashboard) | ≤ 300 KB gz |

Exceeding an actually approved measured budget requires the project's stated decision/waiver process; an illustrative number alone is not a merge blocker.

## Profiling workflow

1. Run React DevTools Profiler → record the interaction.
2. Find the commit with the longest total time.
3. Identify the components rendering. Is rendering necessary?
4. If unnecessary: check for prop identity issues (inline objects/functions, new references each render).
5. Apply: children-as-optimization, colocation, or (last resort) `useMemo` / `memo`.

## Web Vitals targets

- **LCP** < 2.5s
- **INP** < 200ms
- **CLS** < 0.1

Sized skeletons in Suspense boundaries prevent CLS. See [guides/05-error-handling.md §rule-2](05-error-handling.md).

## Common findings

> **[Must-fix]** `src/app/App.tsx:1`: `import { ChartLibrary } from 'huge-chart-lib'` at the app root; adds 220KB to every page including the login screen. Split to the specific route where it's used. See [scripts/bundle-budget-check.ts](../scripts/bundle-budget-check.ts) output.

> **[Should-refactor]** `src/features/feed/Feed.tsx:42`: 50+ `useMemo` / `useCallback` wrappers inserted defensively. Evaluate the installed Compiler setup and a measured targeted simplification. See [guides/07-performance.md §react-compiler](07-performance.md).

> **[Must-fix]** `src/components/Page.tsx:10`: `<Suspense fallback={null}>` produces CLS of 0.3. Size the fallback.

## Example in action

See [examples/refactor-proposal-example.md §phase-3](../examples/refactor-proposal-example.md) for a bundle-budget-driven split.
