# Calculate responsive image slots and variants

For a width-descriptor srcset, sizes supplies the expected rendered width. Multiply that width by the device pixel ratio to estimate a useful raster width. The browser makes the final choice with its own heuristics, cached resources and conditions. Do not promise that it always selects the smallest candidate above the arithmetic result.

## Work from CSS

```css
.product-grid {
  width: min(100% - 32px, 1200px);
  margin-inline: auto;
  display: grid;
  grid-template-columns: 1fr;
  gap: 24px;
}
@media (min-width: 640px) {
  .product-grid { grid-template-columns: repeat(2, minmax(0, 1fr)); }
}
@media (min-width: 1024px) {
  .product-grid { grid-template-columns: repeat(3, minmax(0, 1fr)); }
}
.product-grid img { display: block; width: 100%; height: auto; }
```

The slots are viewport minus 32px below 640; `(viewport - 32px - 24px) / 2` between 640 and 1024; `(viewport - 32px - 48px) / 3` until the container caps at 1200px at viewport 1232; and `(1200px - 48px) / 3 = 384px` thereafter. The matching value is:

```html
sizes="(min-width: 1232px) 384px, (min-width: 1024px) calc((100vw - 80px) / 3), (min-width: 640px) calc((100vw - 56px) / 2), calc(100vw - 32px)"
```

Use the first matching media condition and a final default. React uses `srcSet`, but `sizes` retains its name. If the image has borders or another nested container, account for them instead of copying this formula. For an actual 300px fixed card use `sizes="300px"`; for a true full-bleed hero use `100vw`. A capped content image should state its cap.

## Choose a useful derivative set

Start from real display slots and supported DPR. Minimal candidates might be 320, 640, 1024 and 1920; a detailed product view may justify 320, 480, 640, 768, 1024, 1280, 1600, 1920, 2400 or 3840. These are candidate sets, not a mandate to create all files. Inspect byte differences and request usage; a meaningful 20-30 kB reduction can justify another variant for a large image, while tiny assets need a different budget.

Do not upscale beyond available source detail without a deliberate requirement. List the actual output width, not a requested resize width that the encoder declined because enlargement was disabled. Preserve one aspect ratio across resolution candidates. Use x descriptors only for a genuinely fixed CSS slot, and never mix x and w descriptors in one set.

```html
<img src="/images/avatar-64.webp"
     srcset="/images/avatar-64.webp 1x, /images/avatar-128.webp 2x"
     alt="Account owner" width="64" height="64">
```

## Crop changes need picture

Use source media queries for a square mobile crop and a wider desktop crop. Within each crop, list AVIF first, then WebP and any required fallback. Supply real dimensions for source and img and matching aspect-ratio CSS at the same breakpoint. [The art-direction example](../examples/html-picture-art-direction.md) contains the complete pattern. Resolution switching alone does not provide format fallback; an AVIF srcset on img does not automatically fall through to its JPEG src when decoding is unsupported.

## Inspect the actual selection

At narrow, breakpoint and wide viewports, record rendered width/height, DPR, currentSrc, natural dimensions and transferred bytes. Compare the chosen candidate to the intended slot. Browser cache may retain a larger image after resize; use fresh loads for useful comparisons. Check a high-DPR device, fallback format behavior, container padding and crop focus. A source-only pass confirms matching formulas and existing files, not network selection or visual fit.
