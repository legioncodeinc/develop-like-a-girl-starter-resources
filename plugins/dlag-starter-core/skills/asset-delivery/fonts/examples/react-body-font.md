# Example: supplied body font in React Router SSR

This is a constructed implementation example, not a measured product result. Assume the accepted design uses an already supplied variable body font at `public/fonts/product-body-latin.woff2`, licensed for web use, with a verified 100-900 weight range. Assume the product accepts readable system text for a cold visit when the custom font is late.

1. Confirm the actual font bytes, license, scripts and weights. If the file does not exist, stop its URL wiring and retain the existing stack. Do not download a substitute.
2. Add the font-face to the existing global stylesheet and preserve the existing design token name.

```css
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

3. If a trace or known critical path justifies early discovery, append the single matching preload to the existing root/route links. Preserve all current exports and the root `Links` component. Do not add it again if the document already emits it.

```tsx
{ rel: 'preload', href: '/fonts/product-body-latin.woff2',
  as: 'font', type: 'font/woff2', crossOrigin: 'anonymous' }
```

4. Preserve the existing Tailwind bridge. A v4 entry may contain `@theme inline { --font-sans: var(--product-font-body); }`. Existing shadcn controls then inherit the same token; no new visual identity is introduced.
5. Inspect the built stylesheet and initial server head. Check that the same exact URL occurs in both and that the font CSS is discovered before hydration. A local source check can prove this wiring, not a successful network response.
6. In an authorized browser run, record one cold load and one warm load with the same viewport/content. Inspect the font request, initiator, MIME, bytes and CORS behavior; count duplicate requests. Delay or block the font and check readable body copy, controls and long labels. Test supported languages, including punctuation and accents.
7. Record actual size and layout observations. Do not substitute an expected 35 kB or zero-CLS result. If brand policy later requires the custom face to appear eventually, review `swap` and real fallback calibration rather than silently changing this tradeoff.

The final record lists the CSS/head edits, actual input font, accepted optional policy, observed source checks and pending browser measurements. Use [the checklist](../guides/06-performance-checklist.md).
