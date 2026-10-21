# Critical font preload template

Use one exact supplied WOFF2 URL that the current route actually needs. Count all framework and hand-authored hints before adding another.

```html
<link rel="preload" href="[exact approved font URL]"
      as="font" type="font/woff2" crossorigin="anonymous">
```

```tsx
<link rel="preload" href="/fonts/product-body-latin.woff2"
      as="font" type="font/woff2" crossOrigin="anonymous" />
```

The JSX path is illustrative. Use the existing root/route head convention, including any required deployed base path. For a links export, use the object in [React font configuration](react-font-config.md).

Before using: confirm the license and actual file; match the CSS source and subset; justify above-fold critical use; keep only a small preload set; inspect for an existing emitted hint; confirm the established CORS policy for a remote font. After use, check final URL, initiator, response MIME and duplicate requests in the browser. Do not mark those observations complete from markup alone.
