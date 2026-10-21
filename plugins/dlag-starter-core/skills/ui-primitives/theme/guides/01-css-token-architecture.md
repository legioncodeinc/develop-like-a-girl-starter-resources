# Token architecture

Keep primitive values, semantic roles and Tailwind aliases distinct. For example, an approved neutral palette contains `--palette-ink`; the semantic `--foreground` changes with the scheme; `@theme inline { --color-foreground: var(--foreground); }` makes `text-foreground` available. A component uses the semantic utility, not the palette directly.

The [complete token template](../templates/tokens.css.md) includes surfaces, raised surfaces, overlay, borders, body/muted/disabled/inverse text, action/hover/subtle/foreground, destructive/success/warning/info and focus roles. It is illustrative. Merge the roles needed by the product into its existing stylesheet; do not overwrite its accepted palette, reset or Tailwind integration.

| Layer | Example | Owner |
|---|---|---|
| Primitive | `--palette-ink` | Approved design system |
| Semantic | `--foreground`, `--primary` | Theme-aware product roles |
| Utility alias | `--color-foreground` | Tailwind bridge |
| Component | `text-foreground` | Local UI component |

For a cookie `data-theme` strategy, explicit light and dark selectors are independent from the system media query. The system query applies only when no explicit choice exists or the choice is `system`. Test that a dark OS does not override explicit light. Set `color-scheme` alongside the semantic tokens so native form controls and scrollbars use the same scheme.

Every role used by a component must have an intentional appearance in every supported theme. A value may deliberately be identical in both; the rule does not demand pointless duplicates. Check hover, disabled, validation, focus and overlay roles, not just the background. Brand selectors override semantic roles rather than globally rewriting palette primitives.

Common findings: hardcoded component colors bypass a theme; partial dark roles leave invisible borders; a stale class selector misses a data attribute; a portal outside the brand container inherits the wrong variables; a `@theme` alias captures the wrong indirection. Record the exact governing token and component path before proposing the smallest fix.
