# Anti-patterns and performance

## Anti-pattern 1: premature `@apply`

The documented default hierarchy for handling repeated class combinations, in order of preference:

1. **Nothing.** A lot of apparent duplication is actually a single render inside a loop; there's no real duplication to solve.
2. **Multi-cursor editing**, for duplication localized to one file.
3. **A component or template partial**, for duplication across files. This is the primary recommended mechanism, not `@apply`. A component encapsulates both markup and styling; `@apply` only encapsulates styling and still leaves the HTML duplicated everywhere it's used.
4. **Use `@apply` when custom CSS needs existing utilities**, such as a third-party widget style hook that cannot be expressed as a React component. Keep that scope explicit; it is not the default way to hide long class lists.

[Adding custom styles](https://tailwindcss.com/docs/adding-custom-styles), [Utility styling](https://tailwindcss.com/docs/styling-with-utility-classes)

Explicit warning from the official docs: don't use `@apply` "just to make things look cleaner." Doing so throws away the actual advantages of utility-first CSS:

- You're back to inventing class names.
- You're back to jumping between files to change a style.
- Changes get scarier because the resulting CSS is global again.
- The CSS bundle grows instead of staying flat.

[Adding custom styles](https://tailwindcss.com/docs/adding-custom-styles)

In React, use a component such as `Button.tsx` for markup and behavior that repeat together. CSS modules using `@apply` need the correct `@reference`; direct semantic variable reads often avoid that extra compilation dependency.

## Anti-pattern 2: copying Tailwind's internal utility CSS into hand-written CSS

When someone needs to replicate what a utility class does inside custom CSS (e.g. re-implementing `divide-y` by hand), the maintainer guidance is explicit: don't copy Tailwind's internal `--tw-*` implementation variables. Convert the repeated pattern into a component instead. If hand-written CSS genuinely needs to reuse a value, reference the public design-token variables (`--spacing` with `calc(var(--spacing) * 5)`, `--color-gray-200`), not internal state variables that exist purely as utility-class plumbing. [Adding custom styles](https://tailwindcss.com/docs/adding-custom-styles)

## Anti-pattern 3: "utility soup" (unordered, unreadable class lists)

Not an official Tailwind Labs term, this is the community name for long, inconsistently-ordered class strings that are hard to scan or diff. [Utility styling](https://tailwindcss.com/docs/styling-with-utility-classes) The official mitigation is not "write fewer utility classes," it's two things done consistently:

1. Extract a component once a class combination repeats across files (see anti-pattern 1).
2. Use the existing `prettier-plugin-tailwindcss` integration for consistent automatic ordering, see [06 class ordering and tooling](06-class-ordering-and-tooling.md).

A long class list that's consistently sorted is a feature of utility-first CSS, not a smell; an unsorted one is the actual problem.

## Anti-pattern 4: reaching for an arbitrary value that should be a token

Arbitrary values (`bg-[#1c1f26]`, `top-[117px]`) are explicitly framed as a pixel-perfect escape hatch, not a parallel design system. If the same arbitrary value shows up repeatedly across a codebase, that's a signal it belongs in `@theme` as a real token instead. See [01 theme and tokens](01-theme-and-tokens.md). [Adding custom styles](https://tailwindcss.com/docs/adding-custom-styles), [Theme variables](https://tailwindcss.com/docs/theme)

## Performance: what's actually fast now, and what isn't automatically fast

The Oxide engine rewrite delivers real, benchmarked wins: official numbers are 3.78x faster full builds, 8.8x faster incremental builds with new CSS, and ~182x faster incremental builds with no new CSS (measured in microseconds), from the same Catalyst UI kit benchmark project. [Tailwind v4 release benchmark](https://tailwindcss.com/blog/tailwindcss-v4) These are results for that benchmark project, not a performance guarantee for the consuming application. [Tailwind v4 release benchmark](https://tailwindcss.com/blog/tailwindcss-v4)

What this buys you architecturally: a dedicated Vite integration and optimized compiler, and fine-grained incremental caching keyed to the specific file that changed, but measure this application before concluding its CSS work is negligible. [Tailwind v4 release benchmark](https://tailwindcss.com/blog/tailwindcss-v4)

What it does not automatically fix: bundle-level concerns are still yours to manage. Registered custom properties (`@property`) and `color-mix()`-based opacity utilities are new modern-CSS mechanisms the engine relies on, not something to hand-roll; don't reimplement opacity modifiers or gradient stops with manual CSS variables, use the utilities as shipped, they're already using the fast path. [Tailwind v4 release benchmark](https://tailwindcss.com/blog/tailwindcss-v4)
