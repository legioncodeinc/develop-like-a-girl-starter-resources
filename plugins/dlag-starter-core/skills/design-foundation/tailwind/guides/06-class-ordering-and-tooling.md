# Class ordering and tooling

## Use the existing official formatter integration

If adding tooling is explicitly approved and it is absent, the npm example is:

```bash
npm install -D prettier prettier-plugin-tailwindcss
```

```json
{
  "plugins": ["prettier-plugin-tailwindcss"]
}
```

This is the single tool that solves "utility soup" readability complaints at the tooling level rather than the discipline level: a long class list is fine as long as it's consistently and automatically ordered. [Official formatting plugin](https://github.com/tailwindlabs/prettier-plugin-tailwindcss)

## How the sort order works

Classes sort in the same order Tailwind emits them internally: base layer first, then components, then utilities. Within utilities, the order loosely follows the box model, high-impact layout properties first, decorative properties later, related utilities kept together, The order of class tokens in HTML does not decide CSS precedence; generated rule order and specificity do. Modifiers (`hover:`, `focus:`) group together after plain utilities; responsive modifiers (`sm:`, `md:`) group together and sort smallest-to-largest. Non-Tailwind classes (from a third-party library) always sort to the front, making it obvious at a glance when an element depends on something outside Tailwind. [Official formatting plugin](https://github.com/tailwindlabs/prettier-plugin-tailwindcss)

```html
<!-- Before -->
<button class="text-white px-4 sm:px-8 py-2 sm:py-3 bg-sky-700 hover:bg-sky-800">Submit</button>
<!-- After (auto-sorted) -->
<button class="bg-sky-700 px-4 py-2 text-white hover:bg-sky-800 sm:px-8 sm:py-3">Submit</button>
```

[Official formatting plugin](https://github.com/tailwindlabs/prettier-plugin-tailwindcss)

## No customization, and that's deliberate

There is no config option to change the sort order. The stated rationale is that a non-negotiable order removes an entire class of team bikeshedding. Don't fight this by hand-ordering classes differently, in a project with the plugin installed, any manual ordering gets overwritten on save anyway. [Official formatting plugin](https://github.com/tailwindlabs/prettier-plugin-tailwindcss)

## v4 configuration

Set the public `tailwindStylesheet` option to the actual CSS entry, relative to the Prettier configuration. The formatter needs its custom theme and utilities. Do not rely on an internal sorter API or assumed automatic entry detection.

```json
{
  "plugins": ["prettier-plugin-tailwindcss"],
  "tailwindStylesheet": "./app/app.css"
}
```

[Official plugin configuration](https://github.com/tailwindlabs/prettier-plugin-tailwindcss).

## Load order matters with other Prettier plugins

`prettier-plugin-tailwindcss` must be listed last in the `plugins` array relative to other Prettier plugins (for example another parser plugin), or class sorting can silently not apply. [Official formatting plugin](https://github.com/tailwindlabs/prettier-plugin-tailwindcss)

## What it sorts beyond `class=`

By default: the `class` attribute, framework equivalents like `className`, `:class`, `[ngClass]`, and classes inside `@apply` directives in CSS. [Official formatting plugin](https://github.com/tailwindlabs/prettier-plugin-tailwindcss)

## React example

```tsx
export function Toggle({ active, onToggle }: { active: boolean; onToggle: () => void }) {
  return (
    <button
      type="button"
      aria-pressed={active}
      onClick={onToggle}
      className={active
        ? "bg-sky-700 px-4 py-2 text-white hover:bg-sky-800"
        : "bg-gray-200 px-4 py-2 text-gray-900 hover:bg-gray-300"}
    >
      Toggle
    </button>
  );
}
```

Both complete class strings remain statically detectable. Formatting changes class order, not the runtime choice.

## Editor integration

Because it's a standard Prettier plugin, it works in any Prettier-integrated editor, including Cursor, without anything Tailwind-specific beyond installing it. Pair it with the official Tailwind CSS IntelliSense VS Code extension for autocomplete and hover previews. [Official formatting plugin](https://github.com/tailwindlabs/prettier-plugin-tailwindcss)
