# Dark mode and custom variants

## Default behavior needs no setup

Out of the box, `dark:` follows `prefers-color-scheme`. If a project only needs to respect the OS preference, there is nothing to configure. [Dark mode](https://tailwindcss.com/docs/dark-mode)

```html
<div class="bg-white dark:bg-gray-800 text-gray-900 dark:text-white">
  <!-- follows OS preference automatically -->
</div>
```

## Class-based toggle

Most product UIs want a manual light/dark/system toggle, which means overriding the `dark` variant to key off a class instead:

```css
/* app.css */
@import "tailwindcss";
@custom-variant dark (&:where(.dark, .dark *));
```

```html
<html class="dark">
  <body>
    <div class="bg-white dark:bg-black"><!-- ... --></div>
  </body>
</html>
```

[Dark mode](https://tailwindcss.com/docs/dark-mode)

## Data-attribute toggle

Same idea, keyed off an attribute instead of a class (useful when a class is already reserved for something else, or the design system prefers `data-theme`):

```css
@custom-variant dark (&:where([data-theme=dark], [data-theme=dark] *));
```

[Dark mode](https://tailwindcss.com/docs/dark-mode)

## Three-way preference with SSR

For a document-level `data-theme` contract, explicit light, explicit dark and system preference need separate matching rules. The system branch must not match explicit light. The following variant also covers the first response before any client code:

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

Keep the server's rendered attribute and the client's first render consistent. Read the complete [UI theme flow](../../../ui-primitives/theme/examples/react-router-theme.md) for persistence, headers, hydration and no-JavaScript behavior. Do not read `window` or local storage during server rendering. This root selector is not isolation for nested mixed-theme islands; those require the existing product's scoped selector and portal design.

## Custom variants beyond dark mode

`@custom-variant` isn't dark-mode-specific. Any named condition can become a variant:

```css
@custom-variant theme-midnight (&:where([data-theme="midnight"] *));
```

```html
<button class="theme-midnight:bg-black">...</button>
```

For a variant that needs to nest multiple rules (not just a single selector), use the block form:

```css
@custom-variant any-hover {
  @media (any-hover: hover) {
    &:hover {
      @slot;
    }
  }
}
```

[Functions and directives](https://tailwindcss.com/docs/functions-and-directives)

## A common failure mode

Toggling a `.dark` class on `<html>` and seeing nothing change. This happens when `@custom-variant dark` was never declared, the project is still on the default `prefers-color-scheme` strategy, so a class toggle is inert. Check the CSS entry file for the `@custom-variant dark` line before debugging anything else. [Dark mode](https://tailwindcss.com/docs/dark-mode)
