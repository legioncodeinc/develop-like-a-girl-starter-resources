# Use placeholders without hiding the real image

| Method | Browser work | Alpha/aspect considerations | Best fit |
|---|---|---|---|
| Tiny LQIP data image | Native image decode; no extra JS library | WebP can retain alpha; dimensions still required | Existing build-time thumbnail metadata |
| Precomputed BlurHash gradient | CSS paint; conversion happens before delivery | Gradient is an approximation, not a hash the browser understands | Existing approved hash/gradient pipeline |
| Predecoded ThumbHash image | Native image decode | Hash contains approximate ratio and supports alpha | Existing pipeline for transparent products |
| Client hash decode | Additional code and CPU | Depends on implementation | Only an existing measured requirement, not the default |
| Solid color | Simple CSS paint | Can show through transparent content | Low-cost design-approved background |
| None | No placeholder bytes | Stable dimensions still required | Small images or promptly discovered important content |

Hash length is not the size of the final CSS gradient or image representation. Measure the delivered HTML/CSS, decoder code and image bytes rather than repeating a fixed 10x transfer comparison. A placeholder does not replace alt text, loading priority or layout reservation.

## Precompute an LQIP using an existing local Sharp toolchain

Use only a trusted, approved local input buffer, with bounded source dimensions and bytes. This inert recipe performs no remote fetch and is not request-time Worker code.

```javascript
import sharp from 'sharp';

export async function makePlaceholder(approvedInputBuffer) {
  if (!Buffer.isBuffer(approvedInputBuffer) || approvedInputBuffer.length > 32 * 1024 * 1024) {
    throw new Error('Expected a bounded local image buffer');
  }
  const thumbnail = await sharp(approvedInputBuffer, { limitInputPixels: 40000000 })
    .rotate()
    .resize({ width: 16, height: 16, fit: 'inside', withoutEnlargement: true })
    .webp({ quality: 20 })
    .toBuffer();
  if (thumbnail.length > 8192) throw new Error('Placeholder exceeds budget');
  return `data:image/webp;base64,${thumbnail.toString('base64')}`;
}
```

Use the generated string only when the existing content security policy permits it. Do not weaken CSP just to display a blur. A tiny pre-generated file or solid background is another option.

## Opaque image over a decorative blur

```tsx
function OpaqueCardImage({ src, lqip, alt }: { src: string; lqip: string; alt: string }) {
  // src and lqip come from the approved static asset manifest, not arbitrary input.
  return (
    <span style={{ display: 'block', position: 'relative', overflow: 'hidden', aspectRatio: '1' }}>
      <span aria-hidden="true" style={{ position: 'absolute', inset: 0,
        backgroundImage: `url("${lqip}")`, backgroundSize: 'cover',
        filter: 'blur(12px)', transform: 'scale(1.1)' }} />
      <img src={src} alt={alt} width={600} height={600} loading="lazy" decoding="async"
        style={{ position: 'relative', display: 'block', width: '100%', height: 'auto' }} />
    </span>
  );
}
```

The opaque main image covers the decorative layer when loaded, including before hydration; no load-handler race is required. Restrict lqip to the application's own generated data image. For transparent images this underlying layer can remain visible through alpha, so use an appropriate solid/transparent treatment or an existing stateful component that removes it after successful loading. Keep a useful failure appearance and alt text.

## BlurHash, ThumbHash and dominant color

If the project already uses an approved BlurHash converter such as `@unpic/placeholder`, convert the hash at build/content preparation time to a validated gradient and assign it as a React style background. Check the installed API rather than assuming a package function name. Do not embed an unescaped SVG foreignObject data URL to carry arbitrary CSS. Do not add the package solely because the guide mentions it.

ThumbHash stores color, approximate ratio and alpha information, but needs decoding to become an image. For an existing local pipeline, its documented JavaScript API includes `rgbaToThumbHash` and `thumbHashToDataURL`; inspect the installed version and provide a small RGBA image meeting its input limits. Predecode when avoiding client work matters. Its approximate ratio does not replace exact intrinsic dimensions of the final asset. See [the maintainer's specification](https://evanw.github.io/thumbhash/).

A dominant-color alternative using already installed Sharp:

```javascript
const { dominant } = await sharp(approvedInputBuffer, { limitInputPixels: 40000000 }).stats();
const color = `#${[dominant.r, dominant.g, dominant.b]
  .map(value => value.toString(16).padStart(2, '0')).join('')}`;
```

Choose the least costly method meeting the accepted appearance. A primary hero may still show its placeholder on a slow connection; high priority does not make the image instantaneous. Keep the real image eager and measure the effect rather than adding decorative complexity first.
