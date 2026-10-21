# Review and implement image delivery

Use this procedure for oversized images, missing responsive variants, incorrect sizes, image layout movement, delayed LCP candidates, format choices, transparency or placeholders. Keep the existing visual design and icon system. Broader performance diagnosis and delivery infrastructure stay with their current owners.

## Inputs

Identify the actual React/Vite/React Router versions and document convention; relevant components; supplied files and dimensions; CSS breakpoints, gutters, maximum widths and crop decisions; accepted alt text; public/private classification; and any existing R2 URL mapping or transformation service. R2 is storage and does not imply an image optimizer. Record observed LCP attribution or mark a likely candidate as unmeasured.

## Procedure

1. Inventory each image and consuming component. Record format, bytes, intrinsic dimensions, displayed width at each breakpoint, crop, alt purpose, loading policy, source candidates and placeholder. Distinguish missing derivatives from incorrect markup.
2. Apply [the five principles](guides/00-principles.md). Correct layout reservation and eager LCP discovery before adding cosmetic placeholders.
3. Choose [format and quality](guides/01-format-selection.md) from actual content and supported browsers. Compare alpha, text edges and visual quality; keep original files and a useful fallback. Do not promise a percentage reduction.
4. Compute [sizes from the real layout](guides/02-srcset-sizes.md), including padding, gaps and maximum container width. Width descriptors must be the actual pixel widths of real derivatives. Use picture sources for format and crop selection.
5. Choose [a deliberate placeholder](guides/03-placeholders.md), including a justified solid color or none. Reuse existing generated metadata; do not add a decoder or conversion dependency automatically.
6. Apply [native React image markup](guides/04-react-images.md), stable layout and the existing approved URL boundary. Avoid remote-input proxying or public exposure of private R2 objects.
7. When derivatives are missing, prepare [a complete local operator recipe](guides/05-tooling.md) with prerequisites. The Specialist does not execute conversions, install tools, upload or configure providers.
8. Read saved local edits back. For authorized browser checks record currentSrc, rendered size, DPR, requests, decoding, layout and LCP attribution. Fill [the audit template](templates/image-audit-report.md) with actual results and explicit unrun checks.

## Stop only the dependent work

A missing original, crop decision, license, privacy decision or unrecognized existing transformer blocks its specific action. Continue independent markup review. A missing LCP trace prevents a measured LCP claim; it does not require an invented Lighthouse run or unrelated site audit. Do not expand this role's tools or install a service to remove a prerequisite.
