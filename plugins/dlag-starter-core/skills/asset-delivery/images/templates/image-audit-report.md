# Image delivery audit

Project / date / reviewer / source revision:
Scoped routes and accepted design:
Installed framework and actual delivery arrangement:
Browser/version, viewport/DPR, cache and network/CPU conditions:

## 1. Scorecard

| Category | Pass / fail / partial / pending / N/A | Evidence and reason |
| --- | --- | --- |
| Format and quality | | |
| Responsive variants and sizes | | |
| LCP discovery and priority | | |
| Dimensions and crop reservation | | |
| Placeholder and failure rendering | | |
| Public/private delivery boundary | | |

Use observed criteria, not an invented overall numeric score.

## 2. Image inventory

| File / component:line | Format / actual bytes | Intrinsic dimensions | Rendered slot / crop | Variants / sizes | Alt purpose | Public/private | Placeholder |
| --- | --- | --- | --- | --- | --- | --- | --- |

Missing files or derivatives:
Actual format/response MIME checks:

## 3. Format breakdown

| Format | Count in stated inventory | Percentage / denominator | Proposed action |
| --- | --- | --- | --- |
| AVIF | | | |
| WebP | | | |
| JPEG | | | |
| PNG | | | |
| SVG | | | |
| Animated media | | | |

Record alpha, orientation, text-edge or animation exceptions. Do not count a URL extension as MIME proof.

## 4. Responsive delivery

| Component:line | CSS layout including gutters/gaps/cap | Current sizes | Correct expression | Real variants and widths | Browser currentSrc/DPR |
| --- | --- | --- | --- | --- | --- |

Missing variants:
Art-direction ratios and focal point:
Correctly matched cases:

## 5. LCP candidates

| Route / viewport | Element | Measured or suspected | Eager/lazy | Fetch priority / existing hint | Discovery/timing evidence |
| --- | --- | --- | --- | --- | --- |

Do not treat every hero or every above-fold image as measured LCP.

## 6. Placeholder and dimensions

| Image | Method and actual overhead | Alpha/CSP/privacy concerns | Width/height and reserved ratio | Failure appearance | Evidence |
| --- | --- | --- | --- | --- | --- |

## 7. Prioritized remediation

| Priority | Finding and user effect | Exact local correction | Missing input/approval/tool | Verification |
| --- | --- | --- | --- | --- |

Consider lazy LCP discovery, missing layout reservation and grossly oversized variants before cosmetic placeholders. Keep provider changes separate.

## 8. Impact and limitations

| Metric | Observed before | Observed after | Hypothesis if unmeasured | Conditions |
| --- | --- | --- | --- | --- |
| LCP | | | | |
| CLS | | | | |
| Hero bytes | | | | |
| Grid bytes / stated sample | | | | |

Saved files and actual checks:
Unrun conversions, browser cases and provider operations:
Remaining question and one recommended correction:

Use [the guides](../README.md) for methods. A predicted byte saving is distinct from a measured request or page improvement.
