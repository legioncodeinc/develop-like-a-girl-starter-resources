# Theme token template

Illustrative values, not an approved palette. Merge into the existing Tailwind v4 stylesheet after mapping product roles. Keep the project's existing import and reset exactly once. Both explicit modes and the system fallback use the same semantic roles. Components consume `bg-background`, `text-foreground`, `border-border` and other mapped roles.

```css
/* Existing stylesheet already imports Tailwind. */
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

:root {
  --palette-paper: #ffffff;
  --palette-snow: #f3f4f6;
  --palette-mist: #d1d5db;
  --palette-slate: #4b5563;
  --palette-coal: #1f2937;
  --palette-ink: #111827;
  --palette-action-light: #1d4ed8;
  --palette-action-light-hover: #1e40af;
  --palette-action-dark: #bfdbfe;
  --palette-action-dark-hover: #dbeafe;
  --palette-danger-light: #b91c1c;
  --palette-danger-dark: #fca5a5;
  --palette-success-light: #166534;
  --palette-success-dark: #86efac;
  --palette-warning-light: #854d0e;
  --palette-warning-dark: #fde047;
  --palette-info-light: #1e40af;
  --palette-info-dark: #93c5fd;
  --palette-overlay-light: rgb(0 0 0 / 40%);
  --palette-overlay-dark: rgb(0 0 0 / 60%);
}
:root, [data-theme="light"], [data-theme="system"] {
  color-scheme: light;
  --background: var(--palette-snow);
  --foreground: var(--palette-ink);
  --surface: var(--palette-paper);
  --surface-elevated: var(--palette-paper);
  --overlay: var(--palette-overlay-light);
  --border: var(--palette-mist);
  --border-strong: var(--palette-slate);
  --muted-foreground: var(--palette-slate);
  --disabled-foreground: var(--palette-slate);
  --inverse-foreground: var(--palette-paper);
  --primary: var(--palette-action-light);
  --primary-hover: var(--palette-action-light-hover);
  --primary-foreground: var(--palette-paper);
  --primary-subtle: var(--palette-action-dark-hover);
  --destructive: var(--palette-danger-light);
  --destructive-foreground: var(--palette-paper);
  --success: var(--palette-success-light);
  --warning: var(--palette-warning-light);
  --info: var(--palette-info-light);
  --ring: var(--palette-action-light);
}
[data-theme="dark"] {
  color-scheme: dark;
  --background: var(--palette-ink);
  --foreground: var(--palette-snow);
  --surface: var(--palette-coal);
  --surface-elevated: var(--palette-slate);
  --overlay: var(--palette-overlay-dark);
  --border: var(--palette-slate);
  --border-strong: var(--palette-mist);
  --muted-foreground: var(--palette-mist);
  --disabled-foreground: var(--palette-mist);
  --inverse-foreground: var(--palette-ink);
  --primary: var(--palette-action-dark);
  --primary-hover: var(--palette-action-dark-hover);
  --primary-foreground: var(--palette-ink);
  --primary-subtle: var(--palette-coal);
  --destructive: var(--palette-danger-dark);
  --destructive-foreground: var(--palette-ink);
  --success: var(--palette-success-dark);
  --warning: var(--palette-warning-dark);
  --info: var(--palette-info-dark);
  --ring: var(--palette-action-dark);
}
@media (prefers-color-scheme: dark) {
  :root:not([data-theme]), [data-theme="system"] {
    color-scheme: dark;
    --background: var(--palette-ink);
    --foreground: var(--palette-snow);
    --surface: var(--palette-coal);
    --surface-elevated: var(--palette-slate);
    --overlay: var(--palette-overlay-dark);
    --border: var(--palette-slate);
    --border-strong: var(--palette-mist);
    --muted-foreground: var(--palette-mist);
    --disabled-foreground: var(--palette-mist);
    --inverse-foreground: var(--palette-ink);
    --primary: var(--palette-action-dark);
    --primary-hover: var(--palette-action-dark-hover);
    --primary-foreground: var(--palette-ink);
    --primary-subtle: var(--palette-coal);
    --destructive: var(--palette-danger-dark);
    --destructive-foreground: var(--palette-ink);
    --success: var(--palette-success-dark);
    --warning: var(--palette-warning-dark);
    --info: var(--palette-info-dark);
    --ring: var(--palette-action-dark);
  }
}
@theme inline {
  --color-background: var(--background);
  --color-foreground: var(--foreground);
  --color-surface: var(--surface);
  --color-surface-elevated: var(--surface-elevated);
  --color-overlay: var(--overlay);
  --color-border: var(--border);
  --color-border-strong: var(--border-strong);
  --color-muted-foreground: var(--muted-foreground);
  --color-disabled-foreground: var(--disabled-foreground);
  --color-inverse-foreground: var(--inverse-foreground);
  --color-primary: var(--primary);
  --color-primary-hover: var(--primary-hover);
  --color-primary-foreground: var(--primary-foreground);
  --color-primary-subtle: var(--primary-subtle);
  --color-destructive: var(--destructive);
  --color-destructive-foreground: var(--destructive-foreground);
  --color-success: var(--success);
  --color-warning: var(--warning);
  --color-info: var(--info);
  --color-ring: var(--ring);
}
```

For existing class-based dark utilities, use the matching selector from [the Tailwind guide](../guides/05-tailwind-dark-mode.md). Do not combine this data-attribute template with a provider that mutates only `.dark` without adapting the selectors. Add approved brand overrides after the base roles using [brand composition](../guides/06-brand-composition.md). Keep fonts and logo paths in the product's approved asset layer. Reduced motion uses its existing named tokens, separately from these color values. Verify contrast of real text, controls and focus in each state; illustrative values do not certify accessibility.
