# v3 → v4 migration cheatsheet

Migration review table; check the installed versions and the current official guide for additional changes. Primary source [Upgrade guide](https://tailwindcss.com/docs/upgrade-guide) unless noted.

## Tooling and packages

| v3 | v4 |
| --- | --- |
| `tailwindcss` as PostCSS plugin | `@tailwindcss/postcss` |
| `tailwindcss` CLI | `@tailwindcss/cli` |
| PostCSS plugin under Vite | `@tailwindcss/vite` (recommended) |
| `postcss-import` + `autoprefixer` required | Not needed, bundled |
| Manual migration | `npx @tailwindcss/upgrade` (Node 20+, run on a clean branch) |

## Imports and config

| v3 | v4 |
| --- | --- |
| `@tailwind base; @tailwind components; @tailwind utilities;` | `@import "tailwindcss";` |
| `tailwind.config.js` auto-detected | Not auto-detected; load explicitly with `@config "../../tailwind.config.js";` |
| Config in JS | Config in CSS via `@theme` |
| `@layer utilities { .foo {...} }` auto-became a utility | `@utility foo { ... }` |
| `corePlugins` option to disable utilities | Removed, no replacement |
| `resolveConfig()` JS export | Removed; use CSS vars or `getComputedStyle` |

## Removed utilities → replacement

| Removed | Use instead |
| --- | --- |
| `bg-opacity-*` | `bg-black/50` |
| `text-opacity-*` | `text-black/50` |
| `border-opacity-*` | `border-black/50` |
| `divide-opacity-*` | `divide-black/50` |
| `ring-opacity-*` | `ring-black/50` |
| `placeholder-opacity-*` | `placeholder-black/50` |
| `flex-shrink-*` | `shrink-*` |
| `flex-grow-*` | `grow-*` |
| `overflow-ellipsis` | `text-ellipsis` |
| `decoration-slice` | `box-decoration-slice` |
| `decoration-clone` | `box-decoration-clone` |

## Renamed utilities

| v3 | v4 |
| --- | --- |
| `shadow-sm` | `shadow-xs` |
| `shadow` | `shadow-sm` |
| `drop-shadow-sm` | `drop-shadow-xs` |
| `drop-shadow` | `drop-shadow-sm` |
| `blur-sm` | `blur-xs` |
| `blur` | `blur-sm` |
| `backdrop-blur-sm` | `backdrop-blur-xs` |
| `backdrop-blur` | `backdrop-blur-sm` |
| `rounded-sm` | `rounded-xs` |
| `rounded` | `rounded-sm` |
| `outline-none` (invisible-but-forced-colors-visible outline) | `outline-hidden` |
| `outline-none` (new meaning) | actually sets `outline-style: none` |
| `ring` (3px, blue-500) | `ring-3` (must also add `ring-blue-500` explicitly for old color) |

**Focus regression risk**: leaving `outline-none` in place removes the invisible outline that remains useful in forced-colors mode. Use `outline-hidden` for the old behavior and verify a visible keyboard focus treatment. See [Upgrade guide](https://tailwindcss.com/docs/upgrade-guide).

## Defaults that changed silently

| Property | v3 default | v4 default | Fix if you need v3 behavior |
| --- | --- | --- | --- |
| `border-*`/`divide-*` color | `gray-200` | `currentColor` | Add `@layer base { *, ::after, ::before, ::backdrop, ::file-selector-button { border-color: var(--color-gray-200, currentColor); } }` |
| `ring` width/color | 3px / `blue-500` | 1px / `currentColor` | `@theme { --default-ring-width: 3px; --default-ring-color: var(--color-blue-500); }` (compat-only, not idiomatic v4) |
| Placeholder color | `gray-400` | current text color at 50% opacity | `@layer base { input::placeholder, textarea::placeholder { color: var(--color-gray-400); } }` |
| Button cursor | `pointer` | `default` | `@layer base { button:not(:disabled), [role="button"]:not(:disabled) { cursor: pointer; } }` |
| `<dialog>` margin | centered | reset to 0 | `@layer base { dialog { margin: auto; } }` |
| `hidden` attribute vs display utility | display utility could win | `hidden` always wins | Remove the `hidden` attribute if the element should show |

## Syntax changes

| v3 | v4 | Notes |
| --- | --- | --- |
| `bg-[--brand-color]` | `bg-(--brand-color)` | CSS var arbitrary value shorthand now uses parens |
| `grid-cols-[max-content,auto]` | `grid-cols-[max-content_auto]` | comma-to-space auto-conversion removed |
| `!flex` (leading bang) | `flex!` (trailing bang) | old form still works, deprecated |
| `first:*:pt-0 last:*:pb-0` | `*:first:pt-0 *:last:pb-0` | stacked variants now apply left-to-right, not right-to-left |
| `hover:` fires on tap | `hover:` wrapped in `@media (hover: hover)` | override with `@custom-variant hover (&:hover);` if tap-triggered hover is required |
| `transition-[opacity,transform]` still animates `scale`/`rotate` | must list individual props: `transition-[opacity,scale]` | because transform utilities are now individual CSS properties |
| `focus:transform-none` reset scale/rotate/translate | use `focus:scale-none` etc | `transform-none` no longer resets the individual properties |

## Other behavior to inspect

- `space-*` and `divide-*` selectors changed. Check hidden children and inline layouts; a gap-based flex/grid layout may express the intended relationship better when the task permits it.
- Gradient variants preserve values instead of resetting every stop. Use `via-none` when removing a middle stop is intended.
- A configured prefix acts like a leading variant, for example `tw:hover:bg-red-600`.
- Transitions now include outline color. Define the resting outline color explicitly when an unwanted color transition appears.
- Tailwind v4 is not intended to be combined with Sass, Less or Stylus as its preprocessing layer. Inspect an existing pipeline and plan any authorized migration instead of adding a second processor as a workaround.

## Container customization

```css
/* v3: tailwind.config.js center/padding options */
/* v4: */
@utility container {
  margin-inline: auto;
  padding-inline: 2rem;
}
```

## @apply in independently processed CSS modules

```css
/* app/components/Heading.module.css */
@reference "../app.css";
.title { @apply text-2xl font-bold text-red-500; }
```

For values alone, `.title { color: var(--color-red-500); }` reads the emitted token without importing the compilation context again. Prefer a React component when markup and behavior repeat with styling.

## Recommended migration order

1. Confirm the authorized starting branch and preserve current work using the repository workflow.
2. When the dependency changes and migration are authorized, run `npx @tailwindcss/upgrade` and review all generated changes.
3. Read the full diff before touching anything by hand.
4. Fix border-color and `outline-*` renames by hand, they're the two changes most likely to cause a silent visual bug.
5. Set up `@custom-variant dark` if the project uses class-based dark mode (see [04 dark mode and variants](../guides/04-dark-mode-and-variants.md)).
6. Confirm the project's actual browser support floor against Safari 16.4+/Chrome 111+/Firefox 128+.
7. Run a cleanup pass: replace lingering `@apply`-heavy custom CSS with components where it makes sense (see [07 anti patterns and performance](../guides/07-anti-patterns-and-performance.md)).

This order is a practitioner synthesis [Upgrade guide](https://tailwindcss.com/docs/upgrade-guide), not an official Tailwind Labs checklist, but every individual step traces to an official source above.
