# Example: square mobile hero and wide desktop hero

A responsive layout calls for a square mobile crop and a 16:9 desktop crop of the same approved scene. This is constructed markup. Supply and visually approve all listed crop/format variants before using it. The complete optional [local crop recipe](../guides/05-tooling.md) shows the operation; no missing script or invented conversion result is assumed.

Required variants: square 480/960 in AVIF/WebP plus a square JPEG fallback; wide 1200/1920 in AVIF/WebP plus a 1200x675 JPEG. Keep focus on the accepted subject, and compare alpha, color and orientation. A derivative's width descriptor must reflect actual encoded pixels.

```html
<picture class="art-hero">
  <source media="(max-width: 639px)" type="image/avif"
    srcset="/images/hero-square-480.avif 480w, /images/hero-square-960.avif 960w"
    sizes="100vw" width="960" height="960">
  <source media="(max-width: 639px)" type="image/webp"
    srcset="/images/hero-square-480.webp 480w, /images/hero-square-960.webp 960w"
    sizes="100vw" width="960" height="960">
  <source media="(max-width: 639px)" type="image/jpeg"
    srcset="/images/hero-square-960.jpg" width="960" height="960">
  <source type="image/avif"
    srcset="/images/hero-wide-1200.avif 1200w, /images/hero-wide-1920.avif 1920w"
    sizes="100vw" width="1920" height="1080">
  <source type="image/webp"
    srcset="/images/hero-wide-1200.webp 1200w, /images/hero-wide-1920.webp 1920w"
    sizes="100vw" width="1920" height="1080">
  <img src="/images/hero-wide-1200.jpg" alt="Describe the approved scene"
    width="1200" height="675" loading="eager" fetchpriority="high">
</picture>
```

```css
.art-hero { display: block; aspect-ratio: 16 / 9; overflow: hidden; }
.art-hero img { display: block; width: 100%; height: 100%; object-fit: cover; }
@media (max-width: 639px) { .art-hero { aspect-ratio: 1; } }
```

Dimensions on each source and the media-aware container reserve the matching crop shape. The fallback img retains positive intrinsic dimensions; zero/zero is not a layout signal. The JPEG mobile source preserves art direction where AVIF/WebP are unsupported. `picture` format selection does not retry the next source after a failed network request, so test asset existence and MIME.

For React use self-closing source/img tags and `srcSet`/`fetchPriority`. The HTML/CSS breakpoints must stay aligned with the actual design; 639px here is a deliberate example boundary, not a global token override. For the same crop at all sizes, use the AVIF and WebP sources without media and one correct ratio; do not replace format fallback with an AVIF-only img srcset.

Verify mobile/desktop currentSrc, supported fallback formats, visible focal point, viewport/DPR, initial reserved height and layout shift. Compare discovery timing for the likely LCP resource. Keep these browser checks pending when only source was reviewed.
