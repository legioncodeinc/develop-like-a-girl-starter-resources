# Migrating v3 to v4

Full breaking-change table: [v3 to v4 migration cheatsheet](../references/v3-to-v4-migration-cheatsheet.md). This guide is the procedure.

## Step 1: branch

Confirm the authorized migration, actual starting branch and clean or safely preserved working state. Use the repository's existing branch procedure; do not assume `main` is the correct base. [Upgrade guide](https://tailwindcss.com/docs/upgrade-guide)

## Step 2: run the upgrade tool, don't hand-migrate

The following command downloads and modifies dependencies and source. It is an example for an explicitly authorized migration, not permission to execute it during a review. Use the project package manager and required approval for installs.

```bash
npx @tailwindcss/upgrade
```

Requires Node 20+. It rewrites `@tailwind` directives to `@import "tailwindcss"`, converts as much of `tailwind.config.js` into `@theme` as it can, updates dependencies, and renames utility classes across templates. [Upgrade guide](https://tailwindcss.com/docs/upgrade-guide)

Inspect the actual v3 version and lockfile first. Any preparatory dependency update needs the same approval and diff review as the migration itself. [Upgrade guide](https://tailwindcss.com/docs/upgrade-guide)

## Step 3: read the diff before trusting it

The tool handles the bulk of the work but not everything. Anything in a complex JS config that doesn't map cleanly to CSS is left for manual porting. Review the generated `@theme` block against the original config by hand.

## Step 4: fix the two changes most likely to cause a silent visual bug

1. **Default border/divide color**: v3 defaulted to `gray-200`; v4 defaults to `currentColor`. A bare `border` class will now draw in whatever the text color is. Add an explicit color, or add the compatibility base-layer rule from the cheatsheet.
2. **`outline-none` rename**: v3's `outline-none` kept an invisible-but-forced-colors-visible outline; that behavior is now `outline-hidden`. The new `outline-none` really does set `outline-style: none`. A form input or popover search field relying on the old semantics will visibly regress (a real reported production bug). [Upgrade guide](https://tailwindcss.com/docs/upgrade-guide)

## Step 5: set up dark mode if the project uses the class strategy

v4's default dark mode is `prefers-color-scheme`, with zero setup. If the project toggles a `.dark` class or `data-theme` attribute, that now has to be declared explicitly via `@custom-variant`. See [04 dark mode and variants](04-dark-mode-and-variants.md). Missing this step is a common "dark mode stopped working after the v4 upgrade" report. [Dark mode](https://tailwindcss.com/docs/dark-mode)

## Step 6: confirm the browser support floor

Safari 16.4+, Chrome 111+, Firefox 128+. If the project has a documented requirement to support older browsers, v4 is not currently an option; stay on v3.4. [Upgrade guide](https://tailwindcss.com/docs/upgrade-guide)

## Step 7: cleanup pass

- Search for `!` at the start of class names and consider migrating to the trailing `!` syntax (old form still works but is deprecated).
- Search for `transform-none` used to reset `scale`/`rotate`/`translate` and replace with the individual reset (`scale-none`, etc).
- Search for `transition-[...,transform]` and split into the individual properties (`opacity,scale`) if the utilities being transitioned are the new individual transform utilities.
- Search for `@apply` inside CSS-module files and add `@reference` where missing (see [v3 to v4 migration cheatsheet](../references/v3-to-v4-migration-cheatsheet.md)).

Review table of major renames, removals and changed defaults: [v3 to v4 migration cheatsheet](../references/v3-to-v4-migration-cheatsheet.md), sourced from [Upgrade guide](https://tailwindcss.com/docs/upgrade-guide).

## What NOT to do

Don't hand-roll the migration by grepping for `@tailwind` and doing find-and-replace. The upgrade tool exists because the rename surface (shadow/blur/radius scale, gradients, transform utilities, arbitrary-value CSS-variable syntax) is large enough that manual migration reliably misses something. [Upgrade guide](https://tailwindcss.com/docs/upgrade-guide)
