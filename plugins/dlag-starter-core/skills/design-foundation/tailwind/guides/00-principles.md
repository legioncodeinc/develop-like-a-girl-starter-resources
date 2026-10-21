# Principles: the v4 mental model

## CSS-first, not JS-first

Tailwind v4's default posture is config-in-CSS. There is no `tailwind.config.js` by default. Design tokens live in a `@theme` block in the CSS file that imports Tailwind, and that block does double duty: it's a normal CSS custom property, and it's an instruction to Tailwind to generate matching utility classes. A JS config file still works, but it must be loaded explicitly with `@config "../../tailwind.config.js";` and is no longer auto-detected. [Upgrade guide](https://tailwindcss.com/docs/upgrade-guide), [Tailwind v4 release benchmark](https://tailwindcss.com/blog/tailwindcss-v4)

Practical consequence: when reviewing or writing Tailwind v4 code, look for `@theme` in the CSS entry file before assuming a JS config exists. If neither exists, the project is running on Tailwind's shipped default theme only.

## Import, don't `@tailwind`

```css
/* v3 (wrong for v4) */
@tailwind base;
@tailwind components;
@tailwind utilities;

/* v4 (correct) */
@import "tailwindcss";
```

If you see the three-directive form in a codebase, that's a v3 leftover and a migration flag. [Upgrade guide](https://tailwindcss.com/docs/upgrade-guide)

## Theme values and class detection work together

Static utilities such as `flex` have fixed definitions. Many named utilities and variants depend on a theme namespace. Dynamic spacing and arbitrary values have additional generation rules. Tailwind emits requested candidates found in scanned source; a defined token alone does not mean every related class is shipped. Adding `--color-brand: oklch(...)` to `@theme` is what makes `bg-brand`, `text-brand`, and `border-brand` exist; there is no separate "register a color" step. [Theme variables](https://tailwindcss.com/docs/theme)

## The engine is a different thing now (Oxide)

v4 is a ground-up rewrite: a Rust-backed engine, Lightning CSS for vendor prefixing/minification, a custom CSS parser; Vite can use the dedicated plugin without a separate PostCSS Tailwind pass. Official benchmarks: full builds ~3.78x faster, incremental builds with new CSS ~8.8x faster, incremental builds with no new CSS ~182x faster (measured in microseconds). [Tailwind v4 release benchmark](https://tailwindcss.com/blog/tailwindcss-v4) Measure CSS compilation separately from framework startup, module transforms and rendering before assigning a bottleneck.

## Zero-config content detection

There's no `content: [...]` array to maintain. Tailwind scans the project automatically, respecting `.gitignore` and skipping binary file types. Use `@source "path";` only for genuinely non-standard locations Tailwind's heuristics won't find (e.g. a vendored component library in `node_modules`). [Tailwind v4 release benchmark](https://tailwindcss.com/blog/tailwindcss-v4), [Functions and directives](https://tailwindcss.com/docs/functions-and-directives)

## Browser floor is real, not a suggestion

Safari 16.4+, Chrome 111+, Firefox 128+. Tailwind v4 depends on `@property` and `color-mix()` for core framework behavior (gradients, opacity, cascade layering); it does not gracefully degrade below that floor. If a project has to support older browsers, the answer is staying on v3.4, not trying to polyfill v4. [Upgrade guide](https://tailwindcss.com/docs/upgrade-guide)

The approved Design Foundation brief owns product token values. These mechanics explain how to compile them; they do not choose a new brand or component library.
