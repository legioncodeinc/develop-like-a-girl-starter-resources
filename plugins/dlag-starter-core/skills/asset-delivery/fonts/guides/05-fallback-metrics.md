# Reduce movement with a calibrated fallback

A fallback match concerns two specific font files or faces, not a generic family name. Glyph widths determine wrapping; vertical metrics determine line boxes. Four CSS descriptors can help:

| Descriptor | Effect |
|---|---|
| `size-adjust` | Scales glyph outlines and metrics |
| `ascent-override` | Controls ascent as a percentage of the adjusted em |
| `descent-override` | Controls descent |
| `line-gap-override` | Controls the line gap |

The resulting values depend on the web font, fallback, version, style and weight. Never copy example percentages and label them measured. Equal ascent/descent does not guarantee identical line wrapping. Test the longest actual labels, headings and translated paragraphs.

## Calculate from real input

1. Confirm the exact supplied web font and the fallback actually available on target platforms. `local('Arial')` is not guaranteed on every Linux or mobile environment. `system-ui` is a generic CSS family, not a portable local font filename with one set of metrics.
2. If an approved local metric tool already exists, check its installed CLI/API and give it only licensed local input. [fontpie](https://github.com/pixel-point/fontpie) and [Capsize](https://github.com/seek-oss/capsize) describe calculation approaches; neither is a required dependency. Do not install through `npx`, upload private font files or claim a generated rule without running an authorized tool.
3. Retain the calculator inputs and actual output in the project's normal work record. Use the generated family name for a separate fallback face. Review weight/style matching so the fallback applies to the text being assessed.
4. Apply the fallback between the web face and generic system stack. Verify availability separately on each target platform.
5. Compare wrapping and layout under delayed/failed font loading. Adjust using measured evidence; if calculation is unavailable, leave the numeric template unresolved and report the gap rather than fabricate values.

```css
/* Template only: replace every placeholder with measured values. */
@font-face {
  font-family: 'Product Heading Fallback';
  src: local('[actual fallback full name]');
  font-style: normal;
  font-weight: [actual fallback weight];
  font-display: swap;
  size-adjust: [measured percentage];
  ascent-override: [measured percentage];
  descent-override: [measured percentage];
  line-gap-override: [measured percentage];
}
.heading {
  font-family: 'Product Heading', 'Product Heading Fallback', Arial, sans-serif;
}
```

## Verify in the actual browser

Record a cold load with a known viewport, network/CPU profile and cache state. Inspect Layout Shift entries and the affected nodes; attribute the font only when timing and affected text support that conclusion. Not every browser explicitly labels a shift as a font swap. Disable cache to force the network case. Disabling local fonts is a separate test of local fallback availability, not a replacement for clearing the network cache.

Repeat for supported weights, narrow/wide widths, long content, translated scripts, a failed font request and a warm load. Compare line endings, container heights and movement. Record measured values; do not infer zero font CLS from source code, a single score or page-level field data that has no font attribution.

## Policy interaction

`optional` can avoid a late swap when the file misses its short opportunity; test the persistent fallback for readability. `swap` keeps the custom face eligible to arrive late, making the fallback match more valuable. Neither policy repairs image, embed or dynamic-content shifts. Keep the actual type scale and line-height tokens from the design; do not change spacing to conceal a loading defect.

References: [size-adjust](https://developer.mozilla.org/en-US/docs/Web/CSS/Reference/At-rules/@font-face/size-adjust), [ascent-override](https://developer.mozilla.org/en-US/docs/Web/CSS/Reference/At-rules/@font-face/ascent-override), [font best practices](https://web.dev/articles/font-best-practices).
