# Icon Audit Report

**Branch / PR:** {{branch-or-pr}}  
**Date:** {{YYYY-MM-DD}}  
**Reviewer:** UI Components Specialist  
**Scope:** {{files or components audited}}

---

## 1. Library configuration

| Check | Status | Notes |
|---|---|---|
| Icon library chosen | {{Lucide / Heroicons / Tabler / Phosphor / Iconify / Custom}} | |
| Named ESM imports use the installed package supported entry point | {{PASS / FAIL / N/A}} | |
| Path imports used (if library requires them) | {{PASS / FAIL / N/A}} | |
| No `import * as` pattern for dynamic use | {{PASS / FAIL}} | |
| Bundle impact estimated | {{actual measurement or unrun}} | |

---

## 2. Delivery strategy

| Check | Status | Notes |
|---|---|---|
| Strategy selected | {{tree-shaking / SVG sprite / Iconify CDN}} | |
| Strategy matches project profile | {{PASS / FAIL}} | {{reason}} |
| Dynamic-by-name pattern used correctly | {{PASS / FAIL / N/A}} | |
| Above-the-fold icons use static imports | {{PASS / FAIL}} | |

---

## 3. Accessibility findings

| Icon | Category | Required attributes | Status | Fix required |
|---|---|---|---|---|
| `{{icon-1}}` | {{decorative / semantic / interactive}} | `{{aria-hidden}} / {{aria-label}}` | {{PASS / FAIL}} | {{fix description or N/A}} |
| `{{icon-2}}` | | | | |

**Summary:**  
- Total icons audited: {{n}}
- PASS: {{n}}
- FAIL: {{n}}
- axe-core rules violated: {{list or "none"}}

---

## 4. Custom SVG components (if applicable)

| Check | Status | Notes |
|---|---|---|
| `focusable="false"` on `<svg>` element | {{PASS / FAIL / N/A}} | |
| `currentColor` fill/stroke | {{PASS / FAIL / N/A}} | |
| Consistent `viewBox` | {{PASS / FAIL / N/A}} | |
| SVGO-optimized paths | {{PASS / FAIL / N/A}} | |

---

## 5. Findings summary

{{Severity-tagged list of findings. Format:}}

- **[CRITICAL]** {{finding}}; {{file:line}}; {{fix}}
- **[HIGH]** {{finding}}; {{file:line}}; {{fix}}
- **[MEDIUM]** {{finding}}; {{file:line}}; {{fix}}
- **[LOW]** {{finding}}; {{file:line}}; {{fix}}

---

## 6. Next steps

- [ ] {{Action item 1}}
- [ ] {{Action item 2}}
- [ ] Re-run axe-core after fixes
- [ ] Record an existing bundle-analysis result, or mark measurement unrun

---


Use observed / failed / unrun / not applicable consistently. Unchecked runtime behavior is not a pass. Save only when requested in the project documentation location, not the installed Playbook.
