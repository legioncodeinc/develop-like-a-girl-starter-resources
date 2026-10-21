# Existing brand overlays

Read approved brand tokens and source assets. Keep brand and appearance independent: `data-brand="sample"` selects a brand; `data-theme="dark"` selects appearance. Resolve the brand from trusted application/tenant data and a fixed allowlist. A request header, URL segment or cookie by itself is not proof of tenant authorization.

```ts
const brands = ['default', 'sample'] as const;
type Brand = typeof brands[number];
export function normalizeBrand(value: unknown): Brand {
  return value === 'sample' ? 'sample' : 'default';
}
```

Apply the resolved key to the server document and identical first client render. Do not interpolate raw CSS, arbitrary URLs or stylesheet text from user input. React escaping an attribute protects attribute syntax, but it does not decide which tenant or approved brand a visitor may use.

```css
/* Illustrative approved variables; define them in the product token layer. */
[data-brand="sample"] {
  --primary: var(--sample-action-light);
  --primary-hover: var(--sample-action-hover-light);
}
[data-brand="sample"][data-theme="dark"] {
  --primary: var(--sample-action-dark);
  --primary-hover: var(--sample-action-hover-dark);
}
@media (prefers-color-scheme: dark) {
  [data-brand="sample"][data-theme="system"] {
    --primary: var(--sample-action-dark);
    --primary-hover: var(--sample-action-hover-dark);
  }
}
```

A root brand applies to the primary application. Multiple branded widgets need scopes at each widget's nearest common ancestor. Tokens inherit, so a nested widget needs explicit semantic reset values for its own brand. Avoid broad ancestor selectors that recolor every nested brand. Portal content outside a scoped widget must receive the intended variables/attributes through the installed portal-container or wrapper mechanism.

Changing an attribute updates CSS without rebuilding component markup, but it is still a DOM change and does not imply zero browser work. If logo text, accessible labels or content differ by brand, those changes need coherent application state as well. Never mutate a React-owned document attribute independently and assume React will keep it synchronized.

Record primary/hover/foreground colors, logo and font asset paths, surface/radius overrides if approved, and all dark/system combinations. Palette invention, tenant-data rules and account-preference schema are separate tasks. Verify the two-brand nested case and a dialog opened from each brand when those cases exist.
