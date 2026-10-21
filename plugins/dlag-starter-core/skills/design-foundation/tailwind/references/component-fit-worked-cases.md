# Component and class-detection cases

These examples illustrate decisions. They are not application execution evidence.

## Finite React badge states

```tsx
const states = {
  ready: "bg-green-100 text-green-900",
  blocked: "bg-red-100 text-red-900",
} as const;
export function StatusBadge({ state }: { state: keyof typeof states }) {
  return <span className={`${states[state]} rounded px-2 py-1`}>{state}</span>;
}
```

The complete literal strings are discoverable; constructing `bg-${color}-600` is not. Keep visible text so state is not conveyed by color alone. Check generated rules and actual contrast. Unbounded user colors belong in a validated scoped CSS variable, not generated class names or a broad safelist.

## Ignored shared component package

```css
/* app/app.css; the path is illustrative and relative to this stylesheet */
@import "tailwindcss";
@source "../node_modules/@example/ui/dist";
```

Inspect where the installed package actually ships literal classes before choosing the path. Do not scan all dependencies. Confirm a representative class in production output. An application may need an explicit scan base in a monorepo:

```css
@import "tailwindcss" source("../app");
```

For a deliberately closed source set, use `source(none)` and register the allowed paths. A small required class family can use `@source inline("{hover:,focus:,}underline")`; prefer actual source detection when the classes already exist in application code. These are alternative configurations, not instructions to concatenate every example. [Source detection](https://tailwindcss.com/docs/detecting-classes-in-source-files).

## Existing React dashboard with dialogs

Retain its installed React primitives and Tailwind integration. Inspect the actual component API and tokens. Check the theme's first server response, hydration and dialog focus behavior. A compiler check does not prove keyboard behavior.

## Existing content site with ordinary CSS

Keep coherent CSS when the task only changes copy or a small layout. A migration needs a stated requirement. CSS popularity is not a migration requirement.

## A request for a different framework component

Record the mismatch and use the selected React component API for this Starter project. A request to migrate the application framework is a separate owner decision. Do not silently add a new framework package or component library.
