# Example ADR: Dashboard loader and browser interaction boundary

**Status:** Proposed, illustrative only
**Date:** Fill from the actual decision date
**Author:** Assigned project owner
**Supersedes:** None in this example

## Context

The dashboard combines a theme preference, filters, charts and private recent activity. Starter uses React Router framework SSR on Workers, Supabase identity/data and browser hydration. A component's server rendering does not remove its code or dependencies from the browser graph. The application needs private authorized reads and interactive filtering without duplicating server data in a global store.

Before accepting this decision, capture the actual package/lockfile versions, route config, authentication contract, request/cache lifetime, emitted manifest entry and measured browser trace. No bundle, LCP or accessibility results have been measured for this illustrative dashboard.

## Decision

1. Read data in the route loader with the verified current actor and server-owned ownership predicate.
2. Keep privileged services in *.server.ts modules with request-specific Workers bindings. Return a minimal safe DTO.
3. Render the route using framework loaderData. Keep filter state in the URL and ephemeral disclosure state in the closest component.
4. Keep theme/context providers scoped to the request/root; initial state must match hydration. Browser preference synchronization is a separate effect with cleanup where needed.
5. Keep charts interactive if the user needs interaction. Assess a route-specific lazy chunk only after measuring the real browser asset graph.
6. Route mutations through a validated authenticated action and preserve CSRF/idempotency controls. Security Review precedes Quality Review.

```tsx
// Focused route example; services and generated route types are application dependencies.
import type { Route } from './+types/dashboard';
import { useSearchParams } from 'react-router';
import { readOwnedActivity, requireActor } from '../services/dashboard.server';
export async function loader({ request, context }: Route.LoaderArgs) {
  const actor = await requireActor(request, context);
  const rows = await readOwnedActivity({ actor, signal: request.signal });
  return { items: rows.map(({ id, title }) => ({ id, title })) };
}
export default function Dashboard({ loaderData }: Route.ComponentProps) {
  const [params, setParams] = useSearchParams();
  const query = params.get('q') ?? '';
  const items = loaderData.items.filter(row => row.title.toLowerCase().includes(query.toLowerCase()));
  return <section><h1>Recent activity</h1><label>Filter
    <input value={query} onChange={event => setParams(previous => {
      const next = new URLSearchParams(previous); next.set('q', event.target.value); return next;
    }, { replace: true })} /></label>
    <ul>{items.map(item => <li key={item.id}>{item.title}</li>)}</ul>
    {!items.length && <p>No matching activity.</p>}
  </section>;
}
```

## Consequences

**Positive:** server ownership and safe serialization are explicit; shareable filters have one owner; interactive components do not import privileged services.

**Negative:** actual server/auth services and transport limits must be implemented and reviewed; SSR does not automatically eliminate chart JavaScript; URL keystroke updates may need a measured debounce depending on loader revalidation.

**Neutral:** no RSC, Next caching, next-themes or external state provider is introduced. A separate cache is justified only by a distinct lifecycle and has per-identity invalidation.

## Alternatives considered

- Browser effect for all initial data: duplicates router lifecycle and requires explicit race/cancellation/error handling. Retain only where justified by an actual client-only integration.
- Global store for request data: inappropriate unless lifetime, isolation and invalidation are deliberately solved; a process singleton containing actors/data is unsafe.
- RSC migration: outside the selected Starter runtime.
- New query library: unnecessary for the example's simple route read. Reassess only for an explicit polling/optimistic/offline requirement.

## Verification

Pending actual application type/build checks, server/browser import-graph inspection, two-actor denied access, private DTO redaction, session expiry, URL/back/forward/deep reload, hydration/theme consistency, loading/empty/error/retry, and matched-condition bundle/browser measurements. The bundle helper measures an explicit static JS entry, not a dashboard URL or guaranteed improvement.

See guides03,04,07,11 and the comparison worksheet. This example is not a historical execution receipt.
