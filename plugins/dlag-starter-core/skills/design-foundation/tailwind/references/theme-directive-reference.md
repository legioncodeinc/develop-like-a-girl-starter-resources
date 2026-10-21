# @theme directive reference

Copy-paste-ready patterns for Tailwind v4's CSS-first token system. Use with [Theme variables](https://tailwindcss.com/docs/theme) and [Functions and directives](https://tailwindcss.com/docs/functions-and-directives).

## Namespace-to-utility map

Define a variable in one of these namespaces inside `@theme` and Tailwind generates the matching utility classes or variants automatically. [Theme variables](https://tailwindcss.com/docs/theme)

| Namespace | Generates | Example variable | Example utility |
| --- | --- | --- | --- |
| `--color-*` | Color utilities (bg, text, border, fill, ring, etc) | `--color-mint-500: oklch(0.72 0.11 178);` | `bg-mint-500`, `text-mint-500` |
| `--font-*` | Font family utilities | `--font-display: "Satoshi", sans-serif;` | `font-display` |
| `--text-*` | Font size utilities | `--text-huge: 4rem;` | `text-huge` |
| `--font-weight-*` | Font weight utilities | `--font-weight-extrabold: 850;` | `font-extrabold` |
| `--tracking-*` | Letter spacing utilities | `--tracking-wider: 0.08em;` | `tracking-wider` |
| `--leading-*` | Line height utilities | `--leading-tight: 1.1;` | `leading-tight` |
| `--breakpoint-*` | Responsive viewport variants | `--breakpoint-3xl: 120rem;` | `3xl:grid-cols-6` |
| `--container-*` | Container query variants + size utilities | `--container-8xl: 96rem;` | `@8xl:flex-row`, `max-w-8xl` |
| `--spacing-*` | Spacing/sizing utilities (padding, margin, gap, size, etc) | `--spacing: 4px;` (base multiplier) | `px-4`, `gap-6` |
| `--radius-*` | Border radius utilities | `--radius-xl: 1rem;` | `rounded-xl` |
| `--shadow-*` | Box shadow utilities | `--shadow-brand: 0 4px 14px oklch(0.5 0.2 250 / 0.4);` | `shadow-brand` |
| `--inset-shadow-*` | Inset shadows | `--inset-shadow-soft: inset 0 1px 2px #0002;` | `inset-shadow-soft` |
| `--drop-shadow-*` | Filter drop shadows | `--drop-shadow-soft: 0 1px 2px #0002;` | `drop-shadow-soft` |
| `--text-shadow-*` | Text shadows | `--text-shadow-soft: 0 1px 2px #0002;` | `text-shadow-soft` |
| `--blur-*` | Blur filters | `--blur-soft: 2px;` | `blur-soft` |
| `--perspective-*` | Perspective | `--perspective-near: 300px;` | `perspective-near` |
| `--aspect-*` | Aspect ratios | `--aspect-poster: 2 / 3;` | `aspect-poster` |
| `--ease-*` | Transition timing functions | `--ease-snappy: cubic-bezier(0.2, 0, 0, 1);` | `ease-snappy` |
| `--animate-*` | Animation utilities (pair with `@keyframes`) | `--animate-fade-in: fade-in 0.3s ease-out;` | `animate-fade-in` |

Full namespace list: [Theme variables](https://tailwindcss.com/docs/theme).

## Extend, override, reset

```css
@import "tailwindcss";

@theme {
  /* Extend: adds a new token alongside the defaults */
  --font-script: "Great Vibes", cursive;

  /* Override: redefines an existing default token */
  --breakpoint-sm: 30rem;
}
```

Reset one namespace and rebuild it from scratch:

```css
@theme {
  --color-*: initial;
  --color-white: #fff;
  --color-brand: oklch(0.6 0.2 250);
}
```

Reset everything and go fully custom:

```css
@theme {
  --*: initial;
  --spacing: 4px;
  --font-body: Inter, sans-serif;
  --color-brand: oklch(0.6 0.2 250);
}
```

Source: [Theme variables](https://tailwindcss.com/docs/theme).

## `@theme inline` for values that reference other variables

Use `inline` when an alias must read an underlying variable at the consuming element (for example a scoped font or semantic color). Without `inline`, the reference can resolve to the wrong fallback because of where in the DOM the variable gets read.

```css
@theme inline {
  --font-sans: var(--font-inter);
}
```

Source: [Theme variables](https://tailwindcss.com/docs/theme).

## Animation keyframes co-located with the token

```css
@theme {
  --animate-fade-in-scale: fade-in-scale 0.3s ease-out;

  @keyframes fade-in-scale {
    0% {
      opacity: 0;
      transform: scale(0.95);
    }
    100% {
      opacity: 1;
      transform: scale(1);
    }
  }
}
```

Source: [Theme variables](https://tailwindcss.com/docs/theme).

## Sharing a token set across projects

```css
/* packages/brand/theme.css */
@theme {
  --*: initial;
  --spacing: 4px;
  --color-lagoon: oklch(0.72 0.11 221.19);
  --color-coral: oklch(0.74 0.17 40.24);
}
```

```css
/* apps/admin/app.css */
@import "tailwindcss";
@import "../../packages/brand/theme.css";
```

Source: [Theme variables](https://tailwindcss.com/docs/theme).

## Using theme tokens outside utility classes

```css
/* Custom CSS reading a theme variable directly */
@layer components {
  .typography p {
    font-size: var(--text-base);
    color: var(--color-gray-700);
  }
}
```

```html
<!-- Arbitrary value combined with a theme token via calc() -->
<div class="relative rounded-xl">
  <div class="absolute inset-px rounded-[calc(var(--radius-xl)-1px)]"></div>
</div>
```

Source: [Theme variables](https://tailwindcss.com/docs/theme).

## Registering a custom utility off a theme namespace

```css
@theme {
  --tab-size-2: 2;
  --tab-size-4: 4;
  --tab-size-github: 8;
}

@utility tab-* {
  tab-size: --value(--tab-size-*);
}
```

This matches `tab-2`, `tab-4`, `tab-github`. Add bare and arbitrary support in the same rule:

```css
@utility tab-* {
  tab-size: --value([integer]);
  tab-size: --value(integer);
  tab-size: --value(--tab-size-*);
}
```

Source: [Functions and directives](https://tailwindcss.com/docs/functions-and-directives).

## Force shared variables to be emitted

```css
@theme static {
  --color-brand: oklch(0.55 0.16 250);
}
```

Use `static` when external CSS or runtime code needs a variable even without a matching scanned utility. It does not make every possible utility class part of the output. Inspect emitted CSS before publishing a shared theme.

## Directives and functions together

```css
@utility content-auto { content-visibility: auto; }
.card {
  padding: --spacing(4);
  background: --alpha(var(--color-brand) / 10%);
  @variant dark { background: --alpha(var(--color-brand) / 25%); }
}
```

`@utility` registers a candidate that can receive variants. `@variant` applies an existing variant inside custom CSS. `@apply` inlines recognized utilities; `@reference` supplies compilation context without another emitted stylesheet. `@source` controls candidate discovery. `@config` and `@plugin` can load approved legacy JavaScript configuration/plugin files when a project still needs them. Legacy `theme()` value access is deprecated in favor of CSS variables. Do not copy private `--tw-*` implementation state into product CSS. [Functions and directives](https://tailwindcss.com/docs/functions-and-directives).
