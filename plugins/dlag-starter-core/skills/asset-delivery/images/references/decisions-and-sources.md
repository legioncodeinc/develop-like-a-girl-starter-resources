# Image decisions and official references

Reviewed 2026-10-21. Use these references to refresh changing APIs, browser support and optional tool behavior; the procedures themselves remain available locally.

- [MDN picture](https://developer.mozilla.org/en-US/docs/Web/HTML/Reference/Elements/picture): source/media/type selection and img fallback.
- [MDN responsive images](https://developer.mozilla.org/en-US/docs/Web/HTML/Guides/Responsive_images): resolution switching versus art direction.
- [MDN image formats](https://developer.mozilla.org/en-US/docs/Web/Media/Guides/Formats/Image_types): format capabilities and compatibility. No fixed global share percentage is treated as current.
- [React img](https://react.dev/reference/react-dom/components/img) and [React preload](https://react.dev/reference/react-dom/preload): current SSR behavior and responsive hint attributes; verify the installed renderer.
- [web.dev LCP](https://web.dev/articles/optimize-lcp): separate resource discovery, loading and render delay; avoid lazy loading a known LCP image.
- [Sharp output](https://sharp.pixelplumbing.com/api-output/) and [resize](https://sharp.pixelplumbing.com/api-resize/): current encoding and output metadata. The checked AVIF documentation does not support AVIF image sequences.
- [ThumbHash specification](https://evanw.github.io/thumbhash/): alpha and approximate aspect ratio are encoded, but a hash still needs decoding to render.
- [Unpic placeholder maintainer](https://github.com/ascorbic/unpic-placeholder), [Squoosh maintainer](https://github.com/GoogleChromeLabs/squoosh) and [ImageOptim documentation](https://imageoptim.com/mac): optional existing tools, not new required services or installations.

## Decisions requiring project evidence

Actual format quality and byte tradeoffs; supported browser/device audience; correct slot width and crop; LCP attribution per viewport; real private/public media classification; an existing transformer's availability/cost; and placeholder transfer/paint cost. Historical percentage savings, provider quotas and unsupported future browser predictions do not supply those answers.

Prefer existing precomputed metadata and simple native delivery. If a new format such as JPEG XL is requested, verify its current end-to-end support and keep a working fallback before recommending it. A new provider or client decoder is a separate decision.
