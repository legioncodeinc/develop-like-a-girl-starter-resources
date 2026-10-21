# Connect supplied fonts to the React document

Inspect package versions, the root route, linked/global CSS, asset base path and existing tokens before editing. React Router framework mode renders the document from the root route; Vite serves public assets or resolves imported assets through the project's build. Files under `public/fonts/` are conventionally referenced as `/fonts/...`, subject to the deployed base path. Verify the built output rather than assuming a URL from a filename.

## Keep one font definition

Define a face once in the existing global font stylesheet, using actual weights/styles and a deliberate display policy. A body face, heading face and italic are separate resource decisions. A variable weight file does not imply an italic face. [The font-face template](../templates/font-face-block.md) contains variable, calibrated fallback and static variants.

```css
@font-face {
  font-family: 'Product Body';
  src: url('/fonts/product-body.woff2') format('woff2');
  font-weight: 100 900;
  font-style: normal;
  font-display: optional;
}
:root { --product-font-body: 'Product Body', system-ui, sans-serif; }
body { font-family: var(--product-font-body); }
```

Use the accepted token name and existing value if they differ. Delivery work should not create a competing design system. For a heading using `swap`, add the measured fallback face and stack described in [fallback metrics](05-fallback-metrics.md).

## Expose existing tokens to the installed Tailwind version

For Tailwind v4, preserve the project's established bridge. A minimal pattern is:

```css
/* In the existing Tailwind entry, after its existing import. */
@theme inline {
  --font-sans: var(--product-font-body);
}
```

For a project that already uses a v3 configuration, the corresponding extension is `fontFamily: { sans: ['var(--product-font-body)'] }`. Do not introduce a v3 config into a v4 project or upgrade Tailwind for this change. Check shadcn components inherit the existing token and retain accepted typography.

## Critical font links

Append a justified font preload to the root or route's existing links export. [The configuration template](../templates/react-font-config.md) shows a typed partial that preserves other links. The root should continue to render its existing `Meta`, `Links`, outlet, scroll restoration and scripts. Do not replace that structure simply to add a font.

Document-level styles and hints must be in the server-rendered document. Avoid an effect that inserts them only after hydration. Compare the initial markup and hydrated DOM for duplicate links or different URLs. Keep immutable caching advice limited to content-versioned public assets; retain private authorization and do not change headers or provider configuration under this Playbook.

## Failures to diagnose

| Symptom | Inspect | Correction |
|---|---|---|
| CSS name exists but font never loads | Face name, weight, unicode-range, actual URL, CSP and network | Align the source and declaration; record blocked delivery configuration |
| Works in development, fails under deployment prefix | Built asset URL and base path | Use the project's established public/imported asset convention |
| Two font requests | Duplicate head hints, distinct versions, mode mismatch | Keep one exact source and matching anonymous preload |
| Tailwind font class uses wrong face | Token definition and bridge | Correct the existing token mapping, not the typeface identity |
| Layout moves on hydration | Server/client head or token disagreement | Render a consistent font stack and head from the initial document |
| R2 file fails CORS or authorization | Existing public/private contract and response headers | Report the exact unmet prerequisite; do not make the object public |

No font downloader, provider integration, automatic metric generator or transformer is provided by plain React/Vite. Optional tools must already exist and be explicitly approved for the action. See [the body-font example](../examples/react-body-font.md).
