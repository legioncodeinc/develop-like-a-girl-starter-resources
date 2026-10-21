# Record a font audit

Use the consuming project's existing report location and a name such as `font-loading-audit-YYYY-MM-DD-project.md`. Save one when a full font audit or measured correction was requested. A brief display-policy answer belongs inline.

## Report template

```markdown
# Font delivery review
Date / reviewer / project / source revision:
Scope and accepted typeface/token decisions:
Browser/version, viewport, content, network/CPU and cache conditions:

## Scorecard
| Concern | Pass / fail / pending / N/A | Evidence |
| --- | --- | --- |
| Visibility and display policy | | |
| Preload and duplicate requests | | |
| Payload and script coverage | | |
| Fallback and layout | | |
| SSR head and token wiring | | |

## Font inventory
| File / CSS rule | License | Bytes | Weight/style/axes | Scripts | Display | Fallback |
| --- | --- | --- | --- | --- | --- | --- |

## Preload inventory
| Exact URL | Critical text | MIME / CORS mode | Duplicate requests | Evidence |
| --- | --- | --- | --- | --- |

## Layout findings
Observed before:
Observed after:
Attribution method and limits:
Unrun cases:

## Prioritized corrections
| Priority | File/line and finding | User effect | Concrete correction | Verification |
| --- | --- | --- | --- | --- |

## Delivered and outstanding
Saved paths and checks:
Missing license/input/tool/brand decision or measurement:
Next required action and owner:
```

Use actual evidence rather than invented scores. Page CLS alone does not isolate font contribution. Keep source review, local processing, browser observations and field data distinct. See [the checklist](../guides/06-performance-checklist.md).
