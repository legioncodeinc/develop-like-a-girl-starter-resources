# Subset supplied variable fonts safely

Subsetting removes unused glyphs and can reduce transfer size. It is a decision based on actual bytes, required scripts and license terms, not a mandatory reduction of every font to English. Preserve the source font. Some licenses restrict modification or redistribution; retain required notices beside distributed derivatives. Do not send a paid font to a third-party website.

## Establish the character requirements

Include product copy, translations, names and user-entered content, currency, punctuation, combining marks, digits, math or arrows actually used, and accessible/error text. A crawl of today's pages cannot establish tomorrow's user-entered characters. Complex scripts require shaping features and combining sequences, not just visible base characters. When coverage is open-ended, keep an appropriate complete face or known script subsets with a readable fallback.

Compare variable versus the actual set of static faces needed. One variable file is not always smaller than one static weight. Record current size, used axes/styles, expected language coverage and a product-specific byte budget. Historical 20-60 kB Latin examples are not a universal pass threshold.

## Tool prerequisites

| Tool | Relevant method | Constraints |
|---|---|---|
| fontTools `pyftsubset` | Explicit local glyph/Unicode selection and WOFF2 output | Existing Python/fontTools plus WOFF2 support; local licensed input |
| glyphhanger | Derives used characters from rendered pages | Browser/crawl and external access need explicit scope; incomplete for dynamic content |
| subfont | Analyzes HTML and prepares font subsets and CSS | Existing installation and reviewed output; do not silently overwrite pages |
| Existing local designer utility | A one-off conversion | Check license, output and whether bytes leave the machine |

These are conditional operator recipes. The Asset Delivery Specialist does not install or execute them. Do not use `npx` as an implicit installer or add a build hook.

## Explicit local subset recipe

For an already approved local toolchain, use the actual required ranges rather than copying this illustrative Latin list. Create a new output in an approved directory; do not overwrite an original or an existing derivative.

```bash
pyftsubset ./font-source/product-variable.ttf   --output-file=./font-output/product-variable-latin.woff2   --flavor=woff2   --layout-features='*'   --unicodes='U+0000-00FF,U+0131,U+0152-0153,U+02BB-02BC,U+02C6,U+02DA,U+02DC,U+2000-206F,U+2074,U+20AC,U+2122,U+2191,U+2193,U+2212,U+2215,U+FEFF,U+FFFD'
```

The layout-features wildcard preserves shaping feature selection; inspect the actual tool/version behavior and rendered result. `--retain-gids` preserves glyph indices by leaving removed glyph positions empty; it is not a general repair for a missing variable axis and can increase size. Do not restrict or instantiate axes unless that is part of the accepted design. fontTools defaults may ignore requested Unicode characters absent from the original. Check required characters against both fonts rather than assuming every requested codepoint exists.

## Compare original and result

This inspection recipe requires existing fontTools. It reads only the two named local font files and prints sizes, axes and missing required characters, not font bytes.

```python
from pathlib import Path
from fontTools.ttLib import TTFont
paths = [Path('font-source/product-variable.ttf'),
         Path('font-output/product-variable-latin.woff2')]
required_text = 'Approved language fixture: Café € 123'  # Replace with real coverage.
fonts = [TTFont(str(p)) for p in paths]
try:
    for path, font in zip(paths, fonts):
        cmap = font.getBestCmap() or {}
        missing = sorted({f'U+{ord(c):04X}' for c in required_text
                          if not c.isspace() and ord(c) not in cmap})
        axes = [(a.axisTag, a.minValue, a.defaultValue, a.maxValue)
                for a in font['fvar'].axes] if 'fvar' in font else []
        print(path.name, path.stat().st_size, 'axes', axes, 'missing', missing)
finally:
    for font in fonts:
        font.close()
```

Match original and derivative axis ranges, including optical size, width and italics where present. Inspect metadata, shaping, ligatures, diacritics and requested weights in browsers. If an axis disappears, investigate the source and chosen tool options; adding retain-gids blindly is not a fix.

## Split by script only when useful

```css
@font-face {
  font-family: 'Product Body';
  src: url('/fonts/product-body-latin.woff2') format('woff2');
  font-weight: 100 900;
  font-style: normal;
  font-display: optional;
  unicode-range: U+0000-00FF, U+0131, U+0152-0153;
}
@font-face {
  font-family: 'Product Body';
  src: url('/fonts/product-body-latin-ext.woff2') format('woff2');
  font-weight: 100 900;
  font-style: normal;
  font-display: optional;
  unicode-range: U+0100-024F, U+1E00-1EFF;
}
```

These reduced ranges illustrate dispatch, not complete production language sets. Generate each real subset from approved requirements and align its declaration. Test a page that requires both subsets; inspect overlaps and network requests. Preload only the subset needed by critical text on that route. Do not remove support for a language merely to hit a byte budget.

References: [fontTools subset](https://fonttools.readthedocs.io/en/latest/subset/index.html) and [variable font instancer](https://fonttools.readthedocs.io/en/latest/varLib/instancer.html).
