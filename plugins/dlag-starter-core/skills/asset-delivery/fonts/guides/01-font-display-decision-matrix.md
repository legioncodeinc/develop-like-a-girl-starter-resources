# Choose font-display for the content

## Decision matrix

| Policy | Visibility tradeoff | Swap/layout tradeoff | Suitable situation |
|---|---|---|---|
| `swap` | Fallback appears promptly | Font may replace it late; review metrics and wrapping | Brand face must appear when available, including important headings |
| `optional` | Very short initial block; fallback can remain | No late swap period | Product accepts system text on a cold or slow visit |
| `fallback` | Very short initial block | Bounded swap window can still shift layout | Secondary face with limited opportunity to replace fallback |
| `block` | Text may be invisible during the short block | Later swap still possible | Existing special glyph cases only after accessibility review |
| `auto` | Browser chooses | Browser chooses | Existing behavior to document, not an explicit recommendation |

For body text start with the product's brand requirement. If fallback for the entire visit is acceptable, `optional` is a sensible choice. If the supplied face should eventually appear, use `swap` with [fallback calibration](05-fallback-metrics.md). For a heading that may be LCP, make text available promptly and ensure discovery is early. Neither every heading nor every body font automatically deserves a preload.

Use a real monospace fallback for code, readable system fallbacks for UI, and consistent policies across related face declarations unless a measured reason supports a difference. A remaining icon font needs an accessible text alternative independent of its glyph. Preserve the chosen SVG icon family for new UI; do not introduce an icon font to solve loading.

## Example declarations

Assume these exact files and ranges have been supplied and checked. The names are illustrative, not new font selections.

```css
@font-face {
  font-family: 'Product Body';
  src: url('/fonts/product-body-latin.woff2') format('woff2');
  font-weight: 100 900;
  font-style: normal;
  font-display: optional;
  unicode-range: U+0000-00FF, U+0131, U+0152-0153, U+2000-206F;
}
@font-face {
  font-family: 'Product Heading';
  src: url('/fonts/product-heading.woff2') format('woff2');
  font-weight: 400 700;
  font-style: normal;
  font-display: swap;
}
```

The unicode range must match the actual subset, including punctuation and every required language. A CSS range cannot add glyphs to a file. Do not borrow the numeric weight range from another font. Apply the existing design's stacks, and add calibrated fallback rules for the heading through [the template](../templates/font-face-block.md). An unmeasured `size-adjust` percentage is not a correction.

## Troubleshooting

- Invisible body copy: inspect the font-face's display policy, CSS discovery and actual font request. Check legibility with the font blocked.
- Late movement with `swap`: compare before/after line breaks and fallback metrics at the affected viewport; do not switch to `optional` if that changes an unapproved brand requirement.
- Missing bold/italic: inspect real faces/axes rather than assuming a variable font supplies every style.
- Mixed appearance within a family: compare overlapping unicode ranges, differing display policies, missing subsets and per-weight URLs.
- No custom font after a slow load with `optional`: this can be the chosen behavior, not a broken loader. Verify repeat-visit and failure behavior separately.

Use [preload](02-preload-strategy.md) for critical discovery and [the checklist](06-performance-checklist.md) for evidence.
