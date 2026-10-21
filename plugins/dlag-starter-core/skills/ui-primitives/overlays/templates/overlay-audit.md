# Overlay Audit Report: Template

*Fill in every section. Do not leave `{{placeholder}}` strings.*

---

# Overlay Audit: {{component or PR name}}

**Date:** {{YYYY-MM-DD}}
**Reviewer:** UI Components Specialist
**Branch / PR:** {{branch or PR link}}
**Overlays audited:** {{list each overlay component reviewed}}

---

## 1. Primitive selection

| Overlay | Current primitive | Recommended | Change needed? |
|---|---|---|---|
| {{name}} | {{current}} | {{recommended}} | {{yes/no}} |

---

## 2. Accessible modal contract

For each audited overlay:

### {{Overlay name}}

- [ ] `aria-modal="true"` on dialog container
- [ ] Correct `role`: `dialog` or `alertdialog`
- [ ] Focus moves into dialog on open
- [ ] Tab/Shift+Tab cycle stays inside dialog
- [ ] Escape cancels safely; visible close/cancel remains available
- [ ] Background scroll locked on open
- [ ] Focus returns to trigger on close
- [ ] `aria-labelledby` wired (points to title element)
- [ ] `aria-describedby` wired (points to description element)
- [ ] Focus is visible and not entirely obscured; record actual observed evidence

**Issues found:** {{list issues or "none"}}

---

## 3. Toast vs notification taxonomy

| Toast / feedback | Tier | Current implementation | Anti-pattern? |
|---|---|---|---|
| {{toast name}} | {{1/2/3/4}} | {{Sonner/Dialog/etc}} | {{yes/no}} |

**Anti-patterns found:** {{describe or "none"}}

---

## 4. Stacking and layering

- [ ] Portal targets preserve layering and intended theme scope
- [ ] Z-index scale defined and applied consistently
- [ ] Nested overlays (if any) stack correctly
- [ ] Sonner `<Toaster>` z-index does not conflict with full-screen overlays
- [ ] Background keyboard, pointer and assistive-technology isolation actually observed

**Issues found:** {{list issues or "none"}}

---

## 5. Findings summary

| Severity | Finding | Recommended fix |
|---|---|---|
| Critical | {{finding}} | {{fix}} |
| High | {{finding}} | {{fix}} |
| Medium | {{finding}} | {{fix}} |
| Low | {{finding}} | {{fix}} |

---

## 6. Next steps

- [ ] {{action item 1, owner and deadline}}
- [ ] {{action item 2}}
- [ ] Recheck affected behavior after fixes

---


Use observed / failed / unrun / not applicable consistently. Unchecked runtime behavior is not a pass. Save only when requested in the project documentation location, not the installed Playbook.
