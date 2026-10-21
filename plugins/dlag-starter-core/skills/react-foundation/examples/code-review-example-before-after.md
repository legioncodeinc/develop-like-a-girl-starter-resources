# Code Review Example: Before / After

Use installed project versions. Code fences are focused examples with project imports identified, not complete applications or executed receipts. Additional packages, tools, provider setup and configuration require the applicable user authorization. Starter uses React Router framework SSR, Cloudflare Workers and Supabase; optional library comparisons do not select a service.

A worked React code review. Illustrates severity labels ([guides/00-principles.md §severity](../guides/00-principles.md)), citations ([guides/00-principles.md §9](../guides/00-principles.md)), and anti-pattern detection ([guides/12-anti-patterns.md](../guides/12-anti-patterns.md)).

**Invocation:** "Review the changes in `feat/user-search` branch for quality before merging."

**Illustrative stack, not observed project metadata:** React 19.0.0, React Router framework.1, TanStack Query 5.x, Zustand 5.x, React Hook Form 7.x, Zod 4.x, Vitest 3.x.

---

## The diff under review

`src/features/users/components/user-search.tsx` (new file, 87 lines):

```tsx
import { useState, useEffect } from 'react';
import { useUsers } from '../store';

export default function UserSearch(props: any) {
  const { users, setUsers } = useUsers();
  const [query, setQuery] = useState('');
  const [filtered, setFiltered] = useState<any[]>([]);
  const [isLoading, setIsLoading] = useState(false);

  useEffect(() => {
    setFiltered(users.filter(u => u.name.includes(query)));
  }, [users, query]);

  useEffect(() => {
    setIsLoading(true);
    fetch('/api/users')
      .then(r => r.json())
      .then(data => { setUsers(data); setIsLoading(false); });
  }, []);

  return (
    <div>
      <input value={query} onChange={e => setQuery(e.target.value)} />
      {isLoading ? 'Loading…' : null}
      <ul>
        {filtered.map((u, i) => <li key={i}>{u.name}</li>)}
      </ul>
    </div>
  );
}
```

`src/features/users/store.ts` (new file):

```ts
import { create } from 'zustand';
export const useUsers = create<{ users: any[]; setUsers: (u: any[]) => void }>((set) => ({
  users: [],
  setUsers: (users) => set({ users }),
}));
```

## Findings

---

### 1. [Must-fix] Server data stored in Zustand

**`src/features/users/store.ts:3`**: User list is server-owned data. Zustand is the wrong layer per the 5-layer model in [guides/03-state-management.md §decision-tree](../guides/03-state-management.md).

**Fix:** keep initial reads in the route loader. The optional installed-query example below preserves schema/fetcher/cache behavior for a justified interactive lifecycle; it is not the default route replacement.

```ts
// src/features/users/api/get-users.ts
import { z } from 'zod';
import { useQuery } from '@tanstack/react-query';
import { api } from '@/lib/api-client';

const User = z.object({ id: z.string(), name: z.string(), email: z.string().email() });
export type User = z.infer<typeof User>;
const UserList = z.array(User);

export async function getUsers(): Promise<User[]> {
  return UserList.parse(await api.get('/users'));
}
export function useUsers() {
  return useQuery({ queryKey: ['users'], queryFn: getUsers });
}
```

Delete the Zustand store. (Citation: [guides/04-data-layer.md §the-3-part-request-declaration](../guides/04-data-layer.md).)

---

### 2. [Must-fix] `any` for API response

**`src/features/users/store.ts:3`**, **`user-search.tsx:4`**: `users: any[]` and `props: any`. Violates [guides/09-typescript-patterns.md §zod-at-boundary](../guides/09-typescript-patterns.md). Fixed by #1 via the Zod schema.

---

### 3. [Must-fix] `useEffect` for derived state

**`user-search.tsx:10-12`**: Anti-pattern #1 from [guides/12-anti-patterns.md](../guides/12-anti-patterns.md). `filtered` is derived from `users` + `query`. Compute during render.

**Fix:**

```tsx
const filtered = users.filter(u => u.name.toLowerCase().includes(query.toLowerCase()));
```

Remove the `useState<any[]>([])` and `useEffect`. (Citation: https://react.dev/learn/you-might-not-need-an-effect.)

---

### 4. [Must-fix] `fetch` + useEffect instead of TanStack Query

**`user-search.tsx:14-18`**: fetch in component, manual `isLoading`. Replaced by `useUsers()` from #1. Query already tracks `isLoading` / `isError` / `data`.

---

### 5. [Must-fix] Index-as-key

**`user-search.tsx:27`**: `{filtered.map((u, i) => <li key={i}>...)}`. Anti-pattern #11 from [guides/12-anti-patterns.md](../guides/12-anti-patterns.md). Use `u.id`.

---

### 6. [Must-fix only with actual exposure] Server/browser import graph

SSR does not imply RSC and use-client strings supply no selected runtime control. Inspect route loader/action export pruning and *.server.ts imports. A component importing privileged server data is a must-fix; an interactive component itself is expected. Guide11 supplies the actual boundary checklist.

### 7. [Style] Default export

**`user-search.tsx:4`**: `export default function UserSearch`. Codebase convention is named exports ([guides/02-components-and-composition.md §rule-5](../guides/02-components-and-composition.md)). Change to `export function UserSearch`.

---

### 8. [Should-refactor] No URL state for search query

**`user-search.tsx:7`**: `query` in `useState` means the search is lost on navigation and not shareable. Move to `nuqs`:

```tsx
import { useQueryState, parseAsString } from 'nuqs';
const [query, setQuery] = useQueryState('q', parseAsString.withDefault('')); // only if this adapter is already installed and configured
```

(Citation: [guides/03-state-management.md §layer-4](../guides/03-state-management.md).) Non-blocking: can be a follow-up PR.

---

### 9. [Should-refactor] Case-sensitive search

**`user-search.tsx:11`**: `u.name.includes(query)` is case-sensitive. Users expect case-insensitive. Addressed in the fix in #3.

---

### 10. [Must-fix] No accessibility attributes

**`user-search.tsx:23`**: `<input>` has no associated label. Add `<label>Search users <input ... /></label>` with proper role. (Citation: [guides/06-forms.md §accessibility](../guides/06-forms.md).) Hand off to `Design Foundation` if deeper a11y review is wanted.

---

### 11. [Style] Component responsibility

**`user-search.tsx`**: Line count alone is not a defect. Consider extracting the list row into `<UserRow user={u} />`. Optional; batch with future changes.

## After (target code)

```tsx
// src/features/users/components/user-search.tsx
import { useQueryState, parseAsString } from 'nuqs';
import { useUsers } from '../api/get-users';
import { UserRow } from './user-row';

export function UserSearch() {
  const { data: users = [], isLoading } = useUsers();
  const [query, setQuery] = useQueryState('q', parseAsString.withDefault('')); // only if this adapter is already installed and configured

  const filtered = users.filter(u =>
    u.name.toLowerCase().includes(query.toLowerCase())
  );

  return (
    <div>
      <label>
        Search users
        <input
          value={query}
          onChange={e => setQuery(e.target.value)}
          aria-label="Search users by name"
        />
      </label>
      {isLoading && <p role="status">Loading users…</p>}
      <ul>
        {filtered.map(u => <UserRow key={u.id} user={u} />)}
      </ul>
    </div>
  );
}
```

## Summary

| Severity | Count |
|---|---|
| Must-fix | Confirm from the actual observed defects; conditional item6 is uncounted until verified |
| Should-refactor | 2 illustrative items |
| Style | 2 illustrative items, default export excludes framework convention |

**Recommendation:** Decide merge blockers from confirmed current findings. Counts above describe the illustrative review, not the application being reviewed. Address must-fix items in this PR; should-refactor as follow-ups. Re-run [scripts/scan-anti-patterns.ts](../scripts/scan-anti-patterns.ts) after the fix to confirm.

**Specialist handoff:** `Design Foundation` for a11y deep-dive after the label fix lands.
