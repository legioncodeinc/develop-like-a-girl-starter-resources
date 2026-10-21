# Select format and encoding from the content

| Content | Initial candidate | Check before choosing |
|---|---|---|
| Photograph or raster hero | AVIF with WebP fallback | Actual bytes, encode cost, detail and target browser support |
| Transparent product image | Compare AVIF/WebP alpha; PNG when lossless is needed | Edges on light/dark backgrounds; no accidental flattening |
| Screenshot or small text-heavy graphic | Compare lossless WebP/PNG and suitable AVIF settings | Legible text and sharp edges at displayed sizes |
| Trusted logo, icon or diagram | Existing SVG asset | ViewBox, intended dimensions, accessibility and source trust |
| Animated content | Existing supported animation/video approach | Motion preference, controls, frame behavior and actual encoder support |

Do not re-encode an original destructively or assume a photo's alpha can be dropped. Preserve originals for future derivatives and any required metadata/legal handling. Strip sensitive metadata only from approved public derivatives, with a recorded decision. Keep color appearance and orientation in the visual comparison.

## Quality is a starting parameter

AVIF quality 55 and WebP quality 80 are useful initial Sharp parameters for a local comparison, not equivalent quality scales or promises of 50-70% savings. Inspect the output at the actual CSS width and relevant DPR, especially fine texture, gradients, text and transparent edges. Compare bytes at a comparable visual quality. Increase or lower quality based on the image and budget; do not require every file to reach one threshold.

## Format fallback in HTML

```html
<picture>
  <source type="image/avif" srcset="/images/hero-1200.avif 1200w, /images/hero-1920.avif 1920w" sizes="100vw">
  <source type="image/webp" srcset="/images/hero-1200.webp 1200w, /images/hero-1920.webp 1920w" sizes="100vw">
  <img src="/images/hero-1200.jpg" alt="Describe the actual content"
       width="1200" height="675" loading="eager" fetchpriority="high">
</picture>
```

All listed variants must exist with those dimensions and the same crop. The img source remains a valid fallback; a JPEG fallback can coexist with AVIF as the preferred source. `type` allows the browser to skip an unsupported format. It does not validate file bytes or response MIME, and picture is not a network-error retry chain if the chosen source returns 404.

## Browser evidence

Do not quote an undated global coverage percentage or assume desktop and iOS version numbers are interchangeable. Check the supported browser matrix against the [MDN format reference](https://developer.mozilla.org/en-US/docs/Web/Media/Guides/Formats/Image_types) and actual target browsers. The fallback should satisfy the product's real compatibility needs. For a new format such as JPEG XL, check current browser, encoder and delivery support before recommending it; a historical release prediction is not evidence.

## Existing transformer negotiation

An already selected optimizer may negotiate using Accept, but storage/CDN presence alone does not establish this. Verify its current documentation, generated URL format, response Content-Type and cache separation for negotiated variants. Count actual transformation variants and cost using current provider information only when that service is in scope. Do not copy a historical free-tier number or configure an optimizer from this guide. For plain static R2 objects, use the actual pre-generated URLs and picture markup.
