# React document and font token template

Adapt these snippets into existing files. They are not a replacement root route. The font is assumed supplied at the listed public path with a permitted web license and verified 100-900 weight range.

```css
/* Existing global font stylesheet. */
@font-face {
  font-family: 'Product Body';
  src: url('/fonts/product-body-latin.woff2') format('woff2');
  font-weight: 100 900;
  font-style: normal;
  font-display: optional;
}
:root { --product-font-body: 'Product Body', system-ui, sans-serif; }
body { font-family: var(--product-font-body); }
```

```tsx
// Example using the installed framework's LinksFunction type.
import type { LinksFunction } from 'react-router';

// Preserve the actual project's other link descriptors.
const existingLinks = [] as ReturnType<LinksFunction>;
export const links: LinksFunction = () => [
  ...existingLinks,
  { rel: 'preload', href: '/fonts/product-body-latin.woff2',
    as: 'font', type: 'font/woff2', crossOrigin: 'anonymous' },
];
```

Only include this descriptor if the page needs the preload. Keep the existing root `Links` component and all unrelated root exports/components. If generated route types or another installed convention already type `links`, preserve that convention instead. Keep the stylesheet's existing import or link so the declaration is present before hydration.

```css
/* Existing Tailwind v4 entry; reuse the accepted token. */
@theme inline { --font-sans: var(--product-font-body); }
```

For a supplied normal/italic pair, add a separate font-face for each actual style; preload only the critical one. For a swap policy, insert the measured fallback from [font-face blocks](font-face-block.md). Verify the built URL, CSS, initial head, token inheritance and actual font request. No font download or transformation is performed by this template.
