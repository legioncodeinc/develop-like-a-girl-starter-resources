# 12: Anti-Patterns Catalog

Use installed project versions. Code fences are focused examples with project imports identified, not complete applications or executed receipts. Additional packages, tools, provider setup and configuration require the applicable user authorization. Starter uses React Router framework SSR, Cloudflare Workers and Supabase; optional library comparisons do not select a service.


Twelve anti-patterns, their canonical fixes, and how [scripts/scan-anti-patterns.ts](../scripts/scan-anti-patterns.ts) detects them.

## 1. `useEffect` for derived state

**Bad**
```tsx
const [fullName, setFullName] = useState('');
useEffect(() => setFullName(`${first} ${last}`), [first, last]);
```

**Good**
```tsx
const fullName = `${first} ${last}`;
```

Derived state is computed during render. `useEffect` here introduces an extra render and a sync bug surface.

**Detector:** `useEffect` whose only body is `setState` of a value derived from variables already in scope.

## 2. `useEffect` for syncing props to state

**Bad**
```tsx
const [localValue, setLocalValue] = useState(props.value);
useEffect(() => setLocalValue(props.value), [props.value]);
```

**Good**
```tsx
// Use the prop directly
// Or, to reset state on prop change, use a key:
<Child key={props.value} />
```

## 3. Barrel files at aggregator levels

**Bad**: `src/components/index.ts` that re-exports every component.

**Good**: import directly: `import { Button } from '@/components/ui/button/button'`.

Aggregator barrels can obscure import boundaries and introduce unexpected graph costs; establish actual build/cycle evidence.

**Detector:** `index.ts` files with only `export ... from './X'` lines at non-leaf paths.

## 4. Deep prop drilling

**Bad**: passing `user` through 5 levels just for the deepest to read it.

**Good options:**
- Compose with `children` / slots (pass the leaf JSX from the top).
- Local React Context (with `use-context-selector` if velocity is high).
- Zustand store for cross-tree shared state.

## 5. Premature memoization

**Bad**
```tsx
const doubled = useMemo(() => x + 1, [x]);  // trivial compute, memoized
const onClick = useCallback(() => setState(true), []);  // used in one place
```

**Good**
- Under React Compiler: measure and verify Compiler activation before a targeted removal.
- Otherwise: memoize only after the Profiler confirms a re-render cost.

## 6. Storing server data in a client store

**Bad**: Zustand / Redux with `fetchUsers()` and a manual refresh interval.

**Good**: route loader/action revalidation, or an already justified installed query cache with its stale/invalidation lifecycle. See [guides/04-data-layer.md](04-data-layer.md).

## 7. Private server code reaches a browser module

Bad: a component imports a Supabase privileged client or Cloudflare secret through a shared helper. Good: keep private clients in *.server.ts modules called only by loaders/actions and return a minimal authorized DTO. SSR does not make component dependencies private. A use-client string supplies no Starter boundary control. See guide11.

## 8. Fetch in a deep leaf

**Bad**: `<Avatar userId={id} />` that `fetch('/users/' + id)` internally.

**Good**: lift data to a hook or loader. Parent fetches the list once; passes `user` prop down.

**Detector:** `fetch(` or `api.get(` inside a component file >3 levels deep, not inside a `use*` hook.

## 9. `forwardRef` in new React 19 code

**Bad**
```tsx
const Input = forwardRef<HTMLInputElement, Props>((p, ref) => <input ref={ref} {...p} />);
```

**Good**
```tsx
function Input({ ref, ...props }: Props & { ref?: Ref<HTMLInputElement> }) {
  return <input ref={ref} {...props} />;
}
```

## 10. `any` / unchecked `as` for API data

**Bad**
```tsx
const user = (await res.json()) as User;
```

**Good**
```tsx
const user = User.parse(await res.json());
```

See [guides/09-typescript-patterns.md §zod-at-boundary](09-typescript-patterns.md).

## 11. Missing keys / index-as-key

**Bad**
```tsx
{items.map((item, i) => <Row key={i} {...item} />)}
```

**Good**
```tsx
{items.map((item) => <Row key={item.id} {...item} />)}
```

Index keys lose state on reorder; stable IDs preserve it.

## 12. Direct state mutation

**Bad**
```tsx
state.push(x);
setState(state);
```

**Good**
```tsx
setState([...state, x]);
// or with immer / Zustand's immer middleware
```

Direct mutation breaks React re-render detection and React Compiler's analysis.

## Running the scanner

[scripts/scan-anti-patterns.ts](../scripts/scan-anti-patterns.ts) (stub) implements limited heuristic candidates for effects, keys and aggregator barrels; it does not cover all twelve rules or establish correctness. Run via:

```bash
node <skill>/scripts/scan-anti-patterns.ts src/
```

Output: a markdown report grouping findings by anti-pattern, with file:line and the canonical fix.

## Finding template

> **[Must-fix]** `src/features/search/SearchBar.tsx:15`: `useEffect(() => setResults(filter(items, q)), [items, q])` is derived-state anti-pattern. Compute during render. See [guides/12-anti-patterns.md §1](12-anti-patterns.md).

## Example in action

See [examples/code-review-example-before-after.md](../examples/code-review-example-before-after.md): multiple anti-patterns flagged on a real diff.
