# Tailwind dark selectors

Inspect the installed Tailwind integration and existing selector. For a class strategy, the v4 selector declaration is:

```css
@custom-variant dark (&:where(.dark, .dark *));
```

For an explicit attribute strategy:

```css
@custom-variant dark (&:where([data-theme=dark], [data-theme=dark] *));
```

Those simple selectors do not automatically resolve `data-theme="system"`. For the complete cookie example's single document-level theme, this variant handles both explicit and system appearance, including existing local shadcn `dark:*` utilities:

```css
@custom-variant dark {
  &:where(:root[data-theme="dark"], :root[data-theme="dark"] *) {
    @slot;
  }
  @media (prefers-color-scheme: dark) {
    &:where(:root[data-theme="system"], :root[data-theme="system"] *, :root:not([data-theme]), :root:not([data-theme]) *) {
      @slot;
    }
  }
}

```

The [token template](../templates/tokens.css.md) includes this same variant and resolves semantic roles in all three modes. Explicit light does not match the system branch even on a dark OS. This variant intentionally assumes one appearance on the root document. Mixed-theme islands need the product's existing scoped selector/portal design; do not treat an ancestor dark match as isolation for a nested light island. Test actual compiled Tailwind output in the target app.

Tailwind's default media-driven dark variant follows OS preference and ignores an explicit light choice unless the project supplies the appropriate selector strategy. Keep one source of truth. `@theme inline` maps role variables into utility names without copying raw colors into every component.

A v3 `darkMode: 'class'` setting and a v4 CSS `@custom-variant` are different configuration surfaces. This task does not authorize upgrading Tailwind, installing a PostCSS adapter or changing the project's Vite plugin. Check generated local component styles, variant selector scope and specificity before changing a working integration.

Use the approved reduced-motion tokens for transitions. If the existing provider temporarily suppresses transitions on preference changes, that is separate from persistent reduced-motion support. Avoid a global animation override that breaks essential loading or completion behavior. Verify focus, disabled and overlay colors in both explicit and system modes.
