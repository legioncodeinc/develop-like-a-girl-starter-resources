# Five image delivery principles

## 1. Prefer efficient real formats with fallback

For new photographic raster delivery, prepare AVIF first and WebP fallback when the approved local toolchain and real assets support them. Retain a useful image fallback and original. Transparency, tiny graphics, screenshots, sharp text and lossless requirements need visual comparison; a modern format is not automatically smaller or better for every image. SVG suits trusted vector artwork; untrusted uploaded SVG needs separate security treatment before inline use.

## 2. Reserve the right shape

Use positive intrinsic width and height on img. With proportional CSS, the browser can reserve an aspect ratio before download. Art direction changes the crop, so reserve each crop's ratio with matching source dimensions and media-aware CSS. A zero width/height pair reserves no useful ratio. A fill-style layout requires an explicitly sized container and an appropriate object-fit rule.

## 3. Make the likely LCP resource discoverable

Render the important image URL in server HTML, keep it eager and use React `fetchPriority="high"` for the primary candidate when appropriate. Never lazy-load a known LCP image. Avoid making every image high priority. LCP can be text and can vary by viewport; a hero label does not prove attribution. A preload is an additional discovery hint only when needed and correctly matched, not a guarantee of paint timing.

## 4. Match sizes to CSS

With width-descriptor srcset, sizes describes the slot width. Include container padding, grid gaps, breakpoints and maximum widths. A three-column card rarely occupies 100vw. The browser combines source size, DPR and its own heuristics; arithmetic predicts a useful target but does not guarantee an exact selected URL. Inspect currentSrc in the browser.

## 5. Choose placeholder cost deliberately

Start with an existing small LQIP or a solid design-approved color when useful. A placeholder does not reserve layout by itself and does not replace the real image or alt text. Avoid expensive client decoding simply to display a blur. Transparent content can reveal an opaque placeholder underneath. No placeholder is a valid measured choice, including a quickly discovered hero. High priority does not ensure the hero arrives before first paint.

## Delivery is a separate contract

R2 stores objects. Existing image services may resize or negotiate formats, but their availability, configuration, billing and privacy rules must already be established. A hostname or generic CDN label proves none of those. Do not add transformer query parameters to ordinary object URLs or enable another product. A build-time derivative with a content-specific URL can be delivered through the established public route; private media keeps its authorization.

Use [format selection](01-format-selection.md), [sizes](02-srcset-sizes.md) and [React delivery](04-react-images.md) for implementation. Record actual measurements rather than a fixed speed-score promise.
