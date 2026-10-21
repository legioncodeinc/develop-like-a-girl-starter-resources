# 10: React 19 Idioms

Use installed project versions. Code fences are focused examples with project imports identified, not complete applications or executed receipts. Additional packages, tools, provider setup and configuration require the applicable user authorization. Starter uses React Router framework SSR, Cloudflare Workers and Supabase; optional library comparisons do not select a service.


## Applicability

**Check `package.json` first.** These idioms apply to React 19.x. On React 18, use the React 18 equivalents (noted).

## The five new primitives

### 1. Browser form Actions

React19 accepts a function as form action. In this runtime it is a browser function, not an automatically secured server endpoint. It may call an explicit reviewed API transport. Router Form/action is the default for server mutations; do not import a *.server.ts module into a component.

```tsx
import { useActionState } from 'react';
type Result = { error: string | null; saved: boolean };
export function Rename({ save }: { save: (name: string) => Promise<void> }) {
  const [result, dispatch, pending] = useActionState(async (_prior: Result, form: FormData): Promise<Result> => {
    const value = form.get('name');
    if (typeof value !== 'string' || !value.trim()) return { error: 'Enter a name.', saved: false };
    try { await save(value.trim()); return { error: null, saved: true }; }
    catch { return { error: 'Could not save. Try again.', saved: false }; }
  }, { error: null, saved: false });
  return <form action={dispatch}><label>Name<input name="name" required /></label>
    <button disabled={pending}>Save</button><p role="status">{result.saved ? 'Saved.' : result.error}</p></form>;
}
```

save is an explicit application transport contract, not supplied authorization or persistence. React queues these Actions; request cancellation, server idempotency and access checks still need implementation.


### 2. `useActionState(action, initial)`

Centralizes pending + result state:

```tsx
const [state, formAction, isPending] = useActionState(loginAction, { ok: true });

<form action={formAction}>
  {/* ... */}
  <button disabled={isPending}>Submit</button>
</form>
```

**React 18 equivalent:** manual `useState` for `isLoading`, `error`, `data`. The hook can consolidate a browser Action lifecycle. It does not replace a valid router Form/fetcher by itself.

### 3. `useOptimistic(state, updateFn)`

Show the expected result immediately; revert on failure:

```tsx
const [todos, setTodos] = useState<Todo[]>(initial);
const [optimisticTodos, addOptimistic] = useOptimistic(todos, (cur, next: Todo) => [...cur, next]);

async function handleAdd(fd: FormData) {
  const draft: Todo = { id: crypto.randomUUID(), text: String(fd.get('text')), done: false };
  addOptimistic(draft); // handleAdd must be invoked as a form Action or inside startTransition
  const saved = await createTodo(fd); // if this throws, optimistic reverts
  setTodos((t) => [...t, saved]);
}
```

**React 18 equivalent:** TanStack Query's `onMutate` with manual rollback.

### 4. `useFormStatus()`

Reads the *enclosing React function-action form*'s state. Router Form pending state comes from router hooks. Useful for deeply nested submit buttons:

```tsx
function SubmitButton() {
  const { pending } = useFormStatus();
  return <button disabled={pending}>{pending ? 'Saving…' : 'Save'}</button>;
}
```

**React 18 equivalent:** Pass `isLoading` via prop or context.

### 5. The `use` hook

Reads a Promise or Context inline:

```tsx
function Post({ postPromise }: { postPromise: Promise<Post> }) {
  const post = use(postPromise); // suspends until resolved
  return <article>{post.title}</article>;
}
```

Requires a stable framework/cache-provided promise and a real Suspense boundary. Do not create a promise/fetch during render.

**React 18 equivalent:** `useEffect` + `useState` + loading flag, or TanStack Query.

## React Compiler

- Read the installed compiler and plugin versions; availability does not establish activation.
- Evaluate measured benefit and the actual build configuration. See [guides/07-performance.md §react-compiler](07-performance.md).
- Use the compatible installed React Hooks/Compiler lint integration; do not install or change config automatically.
- Preserve existing memoization until compatible Compiler behavior and before/after tests support a specific change.

## Ref as a prop

```tsx
// React 18
const Input = forwardRef<HTMLInputElement, Props>((props, ref) => <input ref={ref} {...props} />);

// React 19
function Input({ ref, ...props }: Props & { ref?: Ref<HTMLInputElement> }) {
  return <input ref={ref} {...props} />;
}
```

**In new React 19 code, do not use `forwardRef`.** Existing `forwardRef` usages are acceptable; flag as Should-refactor.

## Document metadata

React 19 renders `<title>`, `<meta>`, `<link>` in components directly and hoists them to `<head>`:

```tsx
function Post({ post }: { post: Post }) {
  return (
    <>
      <title>{post.title}</title>
      <meta name="description" content={post.excerpt} />
      <article>{post.body}</article>
    </>
  );
}
```

Use the pinned framework metadata convention consistently; avoid duplicate/conflicting tags. Website Builder owns website SEO review.

## Context as provider

```tsx
// React 19
<ThemeContext value={theme}>...</ThemeContext>
// (instead of <ThemeContext.Provider value={...}>)
```

Small API cleanup. Either form works in 19; prefer the new syntax in new code.

## Common findings

> **[Should-refactor]** `src/components/button.tsx:1`: uses `forwardRef` in a React 19 codebase. Migrate to ref-as-prop. See [guides/10-react-19-idioms.md §ref-as-prop](10-react-19-idioms.md).

> **[Should-refactor]** `src/features/todos/TodoList.tsx:12`: inspect duplicate pending state. Existing correct router or client form state is valid; useActionState is an option, not a React19 requirement. See [guides/10-react-19-idioms.md §useActionState](10-react-19-idioms.md).

> **[Should-refactor]** `src/App.tsx:3`: inspect the existing Compiler configuration and measured cost before proposing a targeted change to defensive memoization. Package availability alone proves no defect.

## Example in action

See [examples/refactor-proposal-example.md §phase-4](../examples/refactor-proposal-example.md) for a React 18 → 19 migration plan.
