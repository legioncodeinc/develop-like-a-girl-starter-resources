# Font visibility, fallback and layout

## Diagnose the symptom

| Symptom | Mechanism | Initial investigation |
|---|---|---|
| Flash of invisible text, FOIT | A font's block period hides glyphs while the file is unavailable | Display policy, request discovery, failure behavior |
| Flash of unstyled text, FOUT | Visible fallback is replaced by the web font | Fallback glyph widths, line wrapping, vertical metrics and timing |
| Faux bold or italic, often called FOFT | Requested face/axis is missing and the browser synthesizes it | Font metadata, CSS weight/style declarations and supplied files |
| Missing or mixed-script glyphs | Subset omits required characters or fallback is unsuitable | Actual cmap coverage, unicode-range, language fixtures |

A variable font can reduce separate weight downloads but does not automatically provide italics. A font with only a weight axis still needs a real italic face or suitable slant/italic axes. Consider `font-synthesis` only after verifying that suppressing synthesis leaves all required content legible. Do not hide text to wait for a font.

## Display periods

A block period initially uses an invisible fallback. If the font loads during it, the font can render. During a swap period the fallback is visible and the font may replace it. Once failure is reached the browser treats the face as failed for the relevant use. These periods describe font loading, not page-wide rendering.

| Value | Block period | Swap period | Practical consequence |
|---|---|---|---|
| `auto` | User-agent policy | User-agent policy | Behavior is not an explicit product choice |
| `block` | Short | Infinite | Invisible content can delay useful text |
| `swap` | Extremely small | Infinite | Early fallback, potentially late replacement |
| `fallback` | Extremely small | Short | Replacement allowed for a limited window |
| `optional` | Extremely small | None | Fallback can remain for this visit |

The CSS terms are intentional: exact durations depend on the browser. Do not turn approximate historical 100 ms / 3 s examples into contractual timing or infer current behavior from a market-share table. The [font-display reference](https://developer.mozilla.org/en-US/docs/Web/CSS/Reference/At-rules/@font-face/font-display) defines these policies.

## What creates layout shift

Different glyph advances change line breaks. Ascent, descent and line gap affect line boxes. A late font swap can move text, controls and content below it. `size-adjust` and metric overrides help, but equal vertical metrics do not ensure equal glyph widths or identical wrapping. The actual font version, fallback, script, size, weight, browser and layout all matter.

`optional` prevents a late swap under its policy, but does not guarantee the page has zero CLS. Other content can shift, and font loading is only one part of the page. A carefully matched fallback can reduce movement with `swap`; measure the result. CLS <= 0.1 is the good Core Web Vitals threshold assessed at the 75th percentile, not a per-font allowance or proof from one trace.

Explicit font-display, a readable fallback stack, correct face metadata, script coverage and a small justified preload set form the baseline. The approved design chooses appearance; delivery work makes that choice usable while bytes arrive or fail.
