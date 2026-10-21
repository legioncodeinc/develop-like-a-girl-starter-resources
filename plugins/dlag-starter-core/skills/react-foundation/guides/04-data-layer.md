# 04: Data Layer

Use installed project versions. Code fences are focused examples with project imports identified, not complete applications or executed receipts. Additional packages, tools, provider setup and configuration require the applicable user authorization. Starter uses React Router framework SSR, Cloudflare Workers and Supabase; optional library comparisons do not select a service.


## Picking the data strategy

1. Starter uses React Router framework SSR. Fetch initial request data in the route loader; mutate through route actions. A route component receives validated, minimal browser-visible data. Keep private credentials and privileged operations in *.server.ts modules/Workers bindings.
2. Keep one owner for each server value. Add an already installed TanStack Query cache only for an actual separate lifecycle such as polling or interactive client reads. Coordinate hydration, keys, invalidation and logout/tenant reset; never reuse authenticated cache data across requests.
3. Preserve an existing API's HTTP method/path/status/schema/session transport. Do not add GraphQL, a cache package or another backend merely to follow an example. The schema/fetcher/hook example below is for an already approved client cache, not mandatory route structure.

## The 3-part request declaration

Separate the runtime schema/type, transport/service and consumption boundary. In a route, the consumption boundary is loader/action data; in an already justified client cache, the hook is that boundary. This preserves the three-part pattern without requiring a hook for every server read:

```ts
// src/features/discussions/api/get-discussions.ts
import { z } from 'zod';
import { useQuery } from '@tanstack/react-query';
import { api } from '@/lib/api-client';

export const DiscussionSchema = z.object({
  id: z.string(),
  title: z.string(),
  body: z.string(),
  createdAt: z.string().datetime(),
});
export type Discussion = z.infer<typeof DiscussionSchema>;

// 1 ;  fetcher
export async function getDiscussions(): Promise<Discussion[]> {
  const res = await api.get('/discussions');
  return z.array(DiscussionSchema).parse(res.data);
}

// 2 ;  hook
export function useDiscussions(actorCacheScope: string) {
  // Cache scope comes from the verified session lifecycle; it is not server authorization.
  return useQuery({ queryKey: ['discussions', actorCacheScope], queryFn: getDiscussions });
}
```

Three parts:

1. **Types + Zod schema**: the contract.
2. **Fetcher**: uses the single shared `api` client. Can be called from route loaders, prefetch and tests only when its dependency graph is appropriate to that runtime.
3. **Hook**: the component-facing API. Wraps the fetcher in `useQuery` / `useMutation`.


## The API client

A shared transport factory in `src/lib/api-client.ts`:

- Pre-configured base URL and safe defaults; attach request-specific auth per request, never mutate a process-global client with user credentials.
- Normalize failures and preserve status. Auth refresh is bounded under the selected session model. Server code must not toast or leak request details; the UI owns user feedback.
- Returns a normalized error object.

Centralize repeated transport policy without forbidding an appropriate focused loader fetch. Server fetch must receive the actual request context and cancellation signal.

## Mutations with optimistic updates

TanStack Query, only for the installed justified cache. actorCacheScope is the current verified session cache identity, and postDiscussion/optimistic are explicit project functions. Dispose/invalidate on logout or tenant change; the backend still authorizes every mutation. Concurrent optimistic updates need per-mutation/version reconciliation rather than blindly restoring an obsolete snapshot:

```ts
const createDiscussion = useMutation({
  mutationFn: postDiscussion,
  onMutate: async (newDiscussion) => {
    await queryClient.cancelQueries({ queryKey: ['discussions', actorCacheScope] });
    const previous = queryClient.getQueryData<Discussion[]>(['discussions', actorCacheScope]);
    queryClient.setQueryData<Discussion[]>(['discussions', actorCacheScope], (old) => [...(old ?? []), optimistic(newDiscussion)]);
    return { previous };
  },
  onError: (_err, _vars, ctx) => {
    queryClient.setQueryData<Discussion[]>(['discussions', actorCacheScope], ctx?.previous);
  },
  onSettled: () => queryClient.invalidateQueries({ queryKey: ['discussions', actorCacheScope] }),
});
```

React19 browser form Actions may use useOptimistic; router fetcher forms expose their own submission state. Choose one owner and preserve rollback and request identity. See [guides/10-react-19-idioms.md §useOptimistic](10-react-19-idioms.md).

## Route loader reads and cache hydration

```tsx
// app/routes/discussions.tsx, focused example. requireUser/listDiscussions
// are application server contracts which must be implemented and reviewed.
import type { Route } from './+types/discussions';
import { requireUser, listDiscussions } from '../services/discussions.server';
export async function loader({ request, context }: Route.LoaderArgs) {
  const actor = await requireUser(request, context);
  const discussions = await listDiscussions({ actor, requestSignal: request.signal });
  return { discussions: discussions.map(({ id, title }) => ({ id, title })) };
}
export default function Discussions({ loaderData }: Route.ComponentProps) {
  return <ul>{loaderData.discussions.map(d => <li key={d.id}>{d.title}</li>)}</ul>;
}
```

The service must enforce identity/ownership before returning data. The component cannot enforce access by hiding a row. Query hydration, if separately needed, uses a fresh request QueryClient and only authorized safe values; do not serialize secrets or reuse a process-global authenticated cache. A route action returning validation data differs from a React browser form Action.

## Common findings

> **[Must-fix]** `src/features/posts/PostCard.tsx:12`: `fetch('/api/author/' + authorId)` inside a leaf component. Creates N+1 waterfall and un-cached requests. Lift to parent hook or route loader. See [guides/04-data-layer.md §the-3-part-request-declaration](04-data-layer.md).

> **[Must-fix]** `src/hooks/usePosts.ts:1`: fetches with raw `fetch`; response typed as `Post[]` without parsing. Parse with Zod at the boundary. See [guides/09-typescript-patterns.md §zod-at-boundary](09-typescript-patterns.md).

> **[Should-refactor]** `src/stores/posts-store.ts:5`: inspect whether the manually maintained posts cache duplicates route data or has a confirmed stale/identity issue. Prefer one route owner or the existing justified cache. See [guides/03-state-management.md §layer-3](03-state-management.md).

## Example in action

See [examples/adr-example-server-components-boundary.md](../examples/adr-example-server-components-boundary.md) for a complete loader/service/browser-boundary decision.
