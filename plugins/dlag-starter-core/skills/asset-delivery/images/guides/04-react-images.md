# Native images in React Router SSR

Plain img and picture do not generate derivatives, enforce remote source policy or optimize formats. The project supplies actual variants and metadata. React uses `srcSet`, `fetchPriority`, `crossOrigin` and `referrerPolicy`; native HTML attributes use lowercase spellings. Check the installed React types and renderer behavior before adding new props or head APIs.

## Fixed, responsive and fill-style layouts

```tsx
// Fixed icon-like photo: keep meaningful alt or empty alt if decorative.
<img src="/images/avatar-64.webp" alt="Account owner" width={64} height={64} />

// Proportional content image with real variants and a capped layout.
<img src="/images/article-800.webp"
  srcSet="/images/article-400.webp 400w, /images/article-800.webp 800w, /images/article-1600.webp 1600w"
  sizes="(min-width: 832px) 800px, calc(100vw - 32px)"
  alt="Describe the article image" width={800} height={450}
  style={{ display: 'block', width: 'min(100%, 800px)', height: 'auto' }} />

// Fill-style media still reserves a shape and declares intrinsic dimensions.
<div style={{ position: 'relative', aspectRatio: '16 / 9', overflow: 'hidden' }}>
  <img src="/images/hero-1920.webp" alt="Describe the hero"
    width={1920} height={1080} loading="eager" fetchPriority="high"
    style={{ position: 'absolute', inset: 0, width: '100%', height: '100%', objectFit: 'cover' }} />
</div>
```

The surrounding content CSS must really match the sizes expression. `cover` crops; `contain` preserves the entire image with possible empty space. Keep the accepted focal point and crop. Use picture for AVIF/WebP fallback and different mobile crops.

## Priority and discovery

Keep a measured or likely primary LCP image in the initial SSR HTML with eager loading. Lazy-load appropriate below-fold images and consider async decoding there. Current React renderers can emit image preloads automatically for some img elements; behavior varies with version, props and picture context. Inspect actual server output before adding a manual hint. [React img documentation](https://react.dev/reference/react-dom/components/img) and [preload documentation](https://react.dev/reference/react-dom/preload) describe current behavior, not proof of the installed app.

If a manual responsive preload is justified, its srcset/sizes, format and CORS mode must match the eventual request. In JSX those link props are `imageSrcSet` and `imageSizes`. Do not preload both AVIF and WebP for the same image or every art-directed crop: a supporting browser could fetch resources it never displays. A parser-discoverable picture with high-priority img is the first implementation to measure. Preserve the existing root/route head convention.

## Remote images and private objects

Use a static, repository-controlled asset manifest or the application's existing validated media model. An arbitrary user URL in an img can disclose the viewer's IP, request timing and referrer to another origin; a server-side fetch of that URL adds SSRF and resource-exhaustion risks. No generic URL-fetch proxy is part of this Playbook.

- Prefer existing same-origin public delivery routes for approved public media.
- Where a remote origin is already approved, validate exact HTTPS origin and allowed path through the existing URL policy; do not broaden wildcard hosts or trust a URL substring.
- Do not place signed private R2 URLs, credentials or private object keys in public HTML, cached manifests, placeholders or reports. Private media must use the existing authenticated delivery contract and appropriate caching.
- `referrerPolicy="no-referrer"` can reduce referrer disclosure when permitted by the existing design, but it does not hide the viewer's network identity or grant authorization.
- Keep existing CSP and CORS constraints. Do not configure a bucket or make objects public to fix a broken image.

## Reusing an existing transformer

If a transformation service is already selected and configured, use its documented URL/API contract and bounded widths/qualities. Verify actual generated dimensions and response type. An R2 object path with invented width/format query parameters is still just an object URL. Record transformation counts and current cost only when relevant and evidenced; no hardcoded quota or cache TTL belongs in this general guide.

## Common mistakes

| Mistake | Correction |
|---|---|
| Every image eager/high priority | Identify critical visible content and defer appropriate below-fold assets |
| 100vw on a padded/capped grid | Derive actual slots including gaps and cap |
| Intrinsic zero or wrong crop ratio | Use positive actual dimensions and per-crop layout reservation |
| Missing variants hidden behind claimed srcset | Supply real derivatives or report the gap |
| Placeholder contains private media | Apply the same authorization classification as the original |
| Converter imported into browser or Worker route | Keep existing Node preprocessing separate from request rendering |
| Unsupported chosen picture source 404 | Fix real asset mapping; source ordering is not network retry logic |

Check source edits, built output, browser selection and measured performance as separate evidence.
