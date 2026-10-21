# Example: eager hero and responsive product grid

Constructed example for React Router SSR. The file names and dimensions below describe prerequisites, not generated files or measured speed. Supply actual AVIF/WebP variants and JPEG fallback for an opaque square product image, a real full-width hero and an existing generated LQIP string. Keep the accepted product content and design tokens.

## Hero in the initial HTML

```tsx
export function HeroImage() {
  return (
    <picture>
      <source type="image/avif" srcSet="/images/hero-1200.avif 1200w, /images/hero-1920.avif 1920w" sizes="100vw" />
      <source type="image/webp" srcSet="/images/hero-1200.webp 1200w, /images/hero-1920.webp 1920w" sizes="100vw" />
      <img src="/images/hero-1200.jpg" alt="Describe the actual featured scene"
        width={1200} height={675} loading="eager" fetchPriority="high"
        style={{ display: 'block', width: '100%', height: 'auto' }} />
    </picture>
  );
}
```

This assumes a full-bleed slot. If the design caps or pads it, recalculate sizes. Keep the primary candidate eager; measure whether the page's actual LCP is this image or text. Do not assume high priority creates a preload for every picture context.

## Square product cards

```tsx
const cardSizes = '(min-width: 1232px) 384px, (min-width: 1024px) calc((100vw - 80px) / 3), (min-width: 640px) calc((100vw - 56px) / 2), calc(100vw - 32px)';
type ProductImage = { id: string; alt: string; avif: string; webp: string;
  fallback: string; lqip: string; width: number; height: number };

export function ProductImages({ images }: { images: ProductImage[] }) {
  // All values come from the approved asset manifest. srcsets contain real widths.
  return <div className="product-grid">
    {images.map(image => <div key={image.id}
      style={{ position: 'relative', overflow: 'hidden', aspectRatio: '1' }}>
      <span aria-hidden="true" style={{ position: 'absolute', inset: 0,
        backgroundImage: `url("${image.lqip}")`, backgroundSize: 'cover',
        filter: 'blur(12px)', transform: 'scale(1.1)' }} />
      <picture style={{ position: 'relative' }}>
        <source type="image/avif" srcSet={image.avif} sizes={cardSizes} />
        <source type="image/webp" srcSet={image.webp} sizes={cardSizes} />
        <img src={image.fallback} alt={image.alt} width={image.width} height={image.height}
          loading="lazy" decoding="async" />
      </picture>
    </div>)}
  </div>;
}
```

Use only real square opaque assets for this component. A sample manifest's `avif` value could be `/images/product-320.avif 320w, /images/product-640.avif 640w, /images/product-960.avif 960w`; the WebP field follows the same real variant pattern. `fallback` points to an actual square JPEG, and width/height are its intrinsic dimensions. The generated LQIP must belong to the same approved public image and fit the existing CSP. Do not insert private URLs or arbitrary external data into this manifest.

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

The opaque image covers its decorative blur when loaded. Transparent products need another treatment. Lazy loading is appropriate only if these cards are actually below the initial viewport; do not apply it to an above-fold product that is the LCP candidate.

## Verify the result

Confirm every manifest file, actual width and crop; inspect the rendered layout at 639, 640, 1023, 1024, 1231 and 1232px and representative wider viewports. Record DPR/currentSrc, requests, transferred bytes, CSP, failure rendering, alt text and layout movement. Compare the LCP resource's discovery and timing under the same conditions. No Lighthouse score, compression ratio or zero-shift result follows from this source example alone. The complete local conversion recipe is in [tooling](../guides/05-tooling.md).
