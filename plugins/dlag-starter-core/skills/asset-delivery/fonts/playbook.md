# Review and implement font delivery

Use this procedure for invisible text, text movement during font loading, faux weight/style, slow font discovery, preload errors, subset size or a font audit. Typeface selection, visual identity, type scale and design tokens come from the accepted design. Preserve them. Use the project's installed React, React Router, Vite and Tailwind versions and existing root/CSS conventions.

## Establish the inputs

Read the accepted font choice; exact local files and license; required languages, user-entered content and scripts; supported weights, styles and variable axes; existing CSS and document head; public/private delivery arrangement; and any recorded browser trace. A font name or example path does not prove a supplied file. Confirm that the license permits web redistribution and modification before preparing a subset. Do not upload licensed font bytes to an online calculator.

## Apply the method

1. Classify FOIT, FOUT with layout movement, faux bold/italic, delayed discovery, excessive bytes or duplicate requests using [principles](guides/00-principles.md).
2. Inventory every relevant font-face, its source, range, style and display policy. Check actual glyph coverage and fallbacks; include styles used by errors, forms, code and translated content.
3. Choose a display policy for each role with the [decision matrix](guides/01-font-display-decision-matrix.md). `optional` needs acceptance of a persistent fallback on a cold visit. `swap` needs fallback review and measurements. Do not promise zero CLS.
4. Review discovery and the small critical [preload set](guides/02-preload-strategy.md). Match the final font URL, anonymous CORS mode and MIME type. Do not create a duplicate hint already emitted by the framework.
5. If payload is excessive, prepare a [subsetting recipe](guides/03-variable-font-subsetting.md) using a tool already available and the licensed character requirements. Preserve required layout features, axes and original files. The Specialist can author a recipe but has no shell or installation tool.
6. Wire the existing [React document and font tokens](guides/04-react-fonts.md). Font files stay local or on the already approved delivery origin. A CSS rule does not configure R2 CORS or make a private font public.
7. Calibrate [fallback metrics](guides/05-fallback-metrics.md) from the real font pair; inspect long and translated strings at actual widths. Static syntax cannot establish a metric match.
8. Read saved edits back and use [the checklist](guides/06-performance-checklist.md). Report the exact source checks performed and the browser, network, licensing or execution checks still pending.

## Decision boundaries

Complete independent local work while a missing font, license, brand tradeoff or measurement blocks its dependent part. Ask for a missing decision once. Do not substitute a new typeface, install tooling, crawl a site, alter provider settings or automate a build pipeline. Keep optional tools as prerequisites. For a full audit use [the report structure](reports/README.md); answer a small font question inline.
