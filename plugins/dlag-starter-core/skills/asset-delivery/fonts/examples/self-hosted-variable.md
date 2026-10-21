# Example: licensed variable font with measured fallback

Constructed case: the accepted heading font is supplied locally, is larger than the product's intended budget, and must eventually appear. Its license allows web redistribution and subsetting. The project requires a known multilingual character set, and an operator already has an approved local fontTools and metric-calculation setup. None of these prerequisites is established by this document.

## Prepare and inspect the derivative

Copy the required character inventory into the approved project record, including translated text, diacritics, punctuation, currency and dynamic inputs. Use the complete [subsetting recipe and inspection program](../guides/03-variable-font-subsetting.md), replacing the illustrative Latin range with those requirements. Write a new derivative; retain the original and notice. Compare bytes and axes to the original, and render the language fixtures. If the license or missing-script requirement is unresolved, keep the original and report it.

## Calculate the real fallback

Choose the actual platform fallback and use the existing approved local calculator. Record the web font version, fallback full name, style, weight and resulting percentages. Do not use fictional demonstration numbers. No calculator availability means calibration remains pending; a system stack still supplies readable text.

```css
@font-face {
  font-family: 'Product Heading';
  src: url('/fonts/product-heading-subset.woff2') format('woff2');
  font-style: normal;
  font-weight: [verified minimum] [verified maximum];
  font-display: swap;
}
@font-face {
  font-family: 'Product Heading Fallback';
  src: local('[measured fallback full name]');
  font-style: normal;
  font-weight: [measured weight];
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

This is a fill-in template, not executable CSS. Reuse the accepted heading token instead of adding `.heading` if the project already owns that mapping. Add further actual fallback styles when necessary.

## Connect and measure

If this heading is on the critical path, use a matching anonymous WOFF2 preload through [the existing React head](../guides/04-react-fonts.md). Test cold cache, constrained connection, failed font, absent local fallback, supported weights and long translated headings. Compare line endings and container heights, then inspect shift events and timing. The fallback may reduce shift without eliminating it.

| Observation | Original | Proposed derivative | Evidence |
|---|---|---|---|
| Bytes | pending | pending | Actual files |
| Required characters/axes | pending | pending | Metadata and render fixtures |
| Font request count/CORS | pending | pending | Browser trace |
| Font-attributed movement | pending | pending | Trace and affected text |

Publish no compression percentage, performance score or zero-CLS claim until it has actually been measured. Keep any provider header or deployment change as a separate authorized action.
