# Font-face templates

Replace every `[...]` token from actual font metadata or measured fallback output. These templates are not valid CSS until filled. Retain the supplied font's license. The existing design determines family/token names.

## Variable face with accepted persistent fallback

```css
@font-face {
  font-family: '[approved family]';
  src: url('[existing WOFF2 URL]') format('woff2');
  font-weight: [minimum weight] [maximum weight];
  font-style: normal;
  font-display: optional;
  unicode-range: [actual subset ranges];
}
```

## Swapping face and calibrated fallback

```css
@font-face {
  font-family: '[approved family]';
  src: url('[existing WOFF2 URL]') format('woff2');
  font-weight: [minimum weight] [maximum weight];
  font-style: normal;
  font-display: swap;
  unicode-range: [actual subset ranges];
}
@font-face {
  font-family: '[approved family] Fallback';
  src: local('[measured fallback full name]');
  font-weight: [measured fallback weight];
  font-style: normal;
  font-display: swap;
  size-adjust: [measured percent];
  ascent-override: [measured percent];
  descent-override: [measured percent];
  line-gap-override: [measured percent];
}
```

Do not declare a static fallback as an entire variable weight range without verifying how the face supplies those weights. Add the actual needed fallback faces or document synthesis. A generic family cannot supply universal local-file metrics.

## Static regular and bold

```css
@font-face {
  font-family: '[approved family]';
  src: url('[regular WOFF2 URL]') format('woff2');
  font-weight: 400;
  font-style: normal;
  font-display: optional;
}
@font-face {
  font-family: '[approved family]';
  src: url('[bold WOFF2 URL]') format('woff2');
  font-weight: 700;
  font-style: normal;
  font-display: optional;
}
```

For italic use the actual italic file and `font-style: italic`. Family, source, weight and style must agree with the consumer rule. Use unicode-range for an actual subset split; do not restrict a complete file's declared support by accident. Apply a readable fallback stack in the existing token. See [display choice](../guides/01-font-display-decision-matrix.md) and [calibration](../guides/05-fallback-metrics.md).
