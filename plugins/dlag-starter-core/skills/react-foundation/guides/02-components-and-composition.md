# 02: Components and Composition

Use installed project versions. Code fences are focused examples with project imports identified, not complete applications or executed receipts. Additional packages, tools, provider setup and configuration require the applicable user authorization. Starter uses React Router framework SSR, Cloudflare Workers and Supabase; optional library comparisons do not select a service.

Composition beats configuration. Small, focused components beat large flexible ones.


## Five rules

### Rule 1: Colocate

Keep the component, its styles, its tests, its hooks, and its types in one folder:

```
src/features/auth/components/login-form/
  login-form.tsx
  login-form.test.tsx
  login-form.stories.tsx  (optional)
```

Benefits: readable, moveable, deletable.

### Rule 2: No nested render functions

```tsx
// bad
function Component() {
  function renderItems() { return <ul>...</ul>; }
  return <div>{renderItems()}</div>;
}

// good
function Items() { return <ul>...</ul>; }
function Component() { return <div><Items /></div>; }
```

A component type declared inside a parent can remount and reset state. An ordinary render helper returning JSX is a different case; judge actual identity, readability and measured cost rather than assuming every helper defeats optimization.

### Rule 3: Limit props

Eight or more props are a review signal. Split only when responsibilities or lifetimes warrant it. Options:

- **Split it.** Composition over configuration.
- **Use `children`** or named slots. See [guides/07-performance.md §children-as-optimization](07-performance.md).
- **Use the compound component pattern:**

```tsx
<Dialog>
  <Dialog.Trigger>Open</Dialog.Trigger>
  <Dialog.Content>
    <Dialog.Title>Confirm</Dialog.Title>
    <Dialog.Footer>...</Dialog.Footer>
  </Dialog.Content>
</Dialog>
```

A `<Dialog size="md" title="..." onClose={...} showFooter footerContent={...} closable>` mess becomes this. See Radix UI / shadcn/ui for canonical implementations.

### Rule 4: Wrap 3rd-party components

Never import `react-select`, `date-fns`, or `axios` directly in a feature. Wrap once in `src/components/ui/` or `src/lib/`. When the library needs replacing, one file changes.

### Rule 5: No default exports for components

Named exports only. Refactoring and grep-ability are far better. Exception: React Router framework route modules and root.tsx use default component exports.

## Component API design checklist

- [ ] Fewer than 7 props?
- [ ] Each prop has a single purpose (no "mode" flags that swap behavior)?
- [ ] Boolean props named with `is…` / `has…` / `can…`?
- [ ] `children` used where sub-content varies?
- [ ] Events named with `on…`?
- [ ] No `render…` props when `children` would do?
- [ ] No `any` in the prop type?

## Ref-as-prop (React 19)

In React 19, `ref` is a normal prop. **Do not use `forwardRef` in new code.**

```tsx
// React 19
export function Input({ ref, ...props }: { ref?: Ref<HTMLInputElement> } & InputHTMLAttributes<HTMLInputElement>) {
  return <input ref={ref} {...props} />;
}
```


## Styling: pick one

| Choice | When |
|---|---|
| **Tailwind** | Default. Zero runtime, SSR-compatible. |
| **CSS Modules** | When you need scoped CSS without a utility class approach. |
| **vanilla-extract / Panda CSS** | Typed CSS-in-TS with zero runtime. |
| **shadcn/ui** (Tailwind + Radix) | Design-system starter. |
| **Avoid:** styled-components, emotion | Runtime cost, requiring separate SSR/style evaluation. Findings in new code. |

## Finding templates

> **[Should-refactor]** `src/components/modal.tsx:15`: 12 props on `Modal` including 4 boolean flags. Refactor to compound components per [guides/02-components-and-composition.md §rule-3](02-components-and-composition.md). See [examples/refactor-proposal-example.md §phase-2](../examples/refactor-proposal-example.md).

> **[Should-refactor]** `src/components/button.tsx:1`: `export default function Button`, convert to named export for grep-ability. Non-blocking; batch with other default-export conversions.

## Example in action

See [examples/code-review-example-before-after.md](../examples/code-review-example-before-after.md) for composition refactors applied to a real diff.
