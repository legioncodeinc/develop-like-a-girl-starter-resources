# 03: State Management

Use installed project versions. Code fences are focused examples with project imports identified, not complete applications or executed receipts. Additional packages, tools, provider setup and configuration require the applicable user authorization. Starter uses React Router framework SSR, Cloudflare Workers and Supabase; optional library comparisons do not select a service.

The 5-layer model. Pick the right tool per layer. Mixing layers (e.g., storing server data in Zustand) requires evidence of ownership or synchronization defects.


## The decision tree

Ask *in this order*:

1. **Is it server-owned data?** (list of users, a post, search results) → **route loader/action revalidation** first. An installed TanStack Query cache can handle a demonstrated interactive lifecycle. Not a second global store.
2. **Is it in the URL?** (filters, page, sort, tab) → **React Router search parameters**. An installed nuqs adapter can add typed parsing if needed.
3. **Is it form state?** (fields, validation) → native router Form/fetcher state first; installed React Hook Form + schema validation for a complex field lifecycle.
4. **Is it transient to one component or subtree?** → `useState` / `useReducer`.
5. **Is it shared across unrelated parts of the tree?** → evaluate the existing appropriate owner; optional installed **Zustand** / **Jotai** (fine-grained atomic) / **Redux Toolkit** (large teams).

Never skip to step 5 without running 1-4 first. Most "global state" is actually server data, URL state, form state, or lift-able component state. Pushing everything to a store is the #1 state mistake.

## Layer-by-layer

### Layer 1: Component state

```tsx
const [isOpen, setIsOpen] = useState(false);
const [state, dispatch] = useReducer(reducer, initial);
```

Use `useReducer` when a single event updates multiple pieces or the transitions are non-trivial. Otherwise `useState`.

### Layer 2: Optional installed global UI state

```ts
// src/stores/theme-store.ts
import { create } from 'zustand';

export function createThemeStore(initialTheme: 'light' | 'dark') {
  return create<{
    theme: 'light' | 'dark';
    setTheme: (t: 'light' | 'dark') => void;
  }>((set) => ({
    theme: initialTheme,
    setTheme: (theme) => set({ theme }),
  }));
}
```

For all SSR, create request-specific state and never seed a module singleton with user data. The factory above is a UI illustration, not a session store. Create its instance once within the appropriate request/provider lifetime, expose it via an explicit existing provider and never call the factory afresh on every render. No module-level store instance holds request data. Theme initial state must match server/client rendering.

**Zustand vs. the alternatives:**

| | Zustand | Jotai | Redux Toolkit | Context |
|---|---|---|---|---|
| Default choice | ✓ | | | |
| Bundle contribution | Measure installed build | Measure installed build | Measure installed build | React built-in |
| Selectors built-in | ✓ | ✓ (atom is a selector) | ✓ | ✗ |
| Provider-free | ✓ | ✗ | ✗ | ✗ |
| Devtools | ✓ | ✓ | ✓ (best) | ✗ |
| Fine-grained re-renders | good | best | good | poor |
| Team size | any | small-medium | large | tiny |

**When to reach past Zustand:**

- **Jotai**: form builders, spreadsheets, dependency-graph UIs where hundreds of small atoms drive partial re-renders.
- **Redux Toolkit**: 15+ eng team that demands enforced patterns, time-travel debugging, or a Redux-ecosystem dependency (e.g., redux-saga for complex orchestration).

**Measure high-frequency Context updates.** Context consumers update when the provider value changes. Fine for theme/locale/auth-user; measure high-frequency update effects and split state by actual consumers.

### Layer 3: Server cache state → router, with optional Query

See [guides/04-data-layer.md](04-data-layer.md). Keep route loader data under the router. Where a separate installed cache is warranted, let it own its lifecycle and invalidate on identity/tenant switch.

### Layer 4: URL state → router search parameters

```tsx
import { useSearchParams } from 'react-router';
const [params, setParams] = useSearchParams();
const rawPage = params.get('page');
const page = rawPage && /^\d+$/.test(rawPage) && Number.isSafeInteger(Number(rawPage)) ? Math.max(1, Number(rawPage)) : 1;
const query = params.get('q') ?? '';
// Preserve unrelated keys when updating one filter.
function changeQuery(value: string) {
  setParams(previous => { const next = new URLSearchParams(previous); next.set('q', value); next.delete('page'); return next; }, { replace: true });
}
```

Use this inside the route/component, not module scope. The optional nuqs example below requires its already installed compatible router adapter. URL parsing on the server must also validate limits; the browser cannot impose access controls.


```tsx
import { useQueryState, parseAsInteger, parseAsString } from 'nuqs';

const [page, setPage] = useQueryState('page', parseAsInteger.withDefault(1));
const [q, setQ] = useQueryState('q', parseAsString.withDefault(''));
```

See [official references](../references/official-sources.md). Use for filters, pagination, sort, tabs, search inputs: anything a user might bookmark.

### Layer 5: Form state → native router Form or an existing field library

See [guides/06-forms.md](06-forms.md). Do not put form state in Zustand.

## Common findings

> **[Must-fix if confirmed]** `src/features/users/store.ts:8`: an observed stale/wrong-owner user list is manually refreshed in a global store. Restore a single route loader owner or justified installed query lifecycle per [guides/04-data-layer.md](04-data-layer.md). Verify invalidation, request ordering, owner switch and denial behavior after the change.

> **[Should-refactor]** `src/features/search/SearchPage.tsx:23`: filter state in `useState` lost on navigation. Use router search parameters; a configured installed nuqs adapter is optional. See [guides/03-state-management.md §layer-4](03-state-management.md).

> **[Should-refactor if measured]** `src/contexts/AppContext.tsx:45`: measure the provider value and affected consumers before choosing a narrower context or selector store. A Context itself does not prove a correctness/performance defect. See [guides/03-state-management.md §layer-2](03-state-management.md).

## ADR-worthy decisions

- Adopting a store lib for the first time: write an ADR per [templates/ADR.md](../templates/ADR.md).
- Switching from Redux to Zustand: write a phased refactor per [examples/refactor-proposal-example.md](../examples/refactor-proposal-example.md).

## Example in action

See [examples/adr-example-server-components-boundary.md](../examples/adr-example-server-components-boundary.md) for a request-scoped state and loader/browser boundary decision in context.

## Preserving behavior during simplification

Use [guide24](24-simplify-state-without-races.md) before changing owners or libraries. The defaults above guide architecture selection; they do not prove a correctness defect in a particular implementation. Classify an observed race, stale value or cross-lifetime leak by its actual evidence. Keep existing appropriate server caches, URL/form owners and external subscriptions while reducing redundant state.
