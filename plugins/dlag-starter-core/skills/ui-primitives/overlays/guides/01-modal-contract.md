# The complete modal interaction contract

A modal must be named, contain focus and make background interaction unavailable. ARIA describes behavior; attributes do not implement it. Keep the installed primitive's focus, dismissal and scroll machinery.

1. **Semantics and name.** The content uses `dialog` or `alertdialog` as appropriate and true modal semantics. Title or explicit label gives a useful accessible name. A short description can use `aria-describedby`; omit the description relationship for complex structured content that should be navigated as paragraphs, lists or tables.
2. **Initial focus.** Move focus inside on open. For destructive confirmation prefer Cancel or another least destructive choice. For long content, focus an appropriate heading with `tabIndex={-1}` so the top is visible. Do not automatically focus the destructive action.
3. **Containment.** Tab/Shift+Tab stay in the active modal. Background keyboard, pointer and assistive-technology access must agree. Test dynamic fields, hidden/disabled controls, nested popups, iframes and empty-content states. `aria-hidden` alone does not block pointer or keyboard interaction.
4. **Dismissal.** Escape and a visible close/cancel path safely dismiss. Cancellation never invokes the destructive action. An irreversible operation is a reason to make confirmation clear, not a reason to trap the user before confirming. Closing an in-flight UI does not necessarily cancel its server request; communicate that state.
5. **Scroll.** Prevent background scroll while keeping long modal content usable. Reuse the primitive's mechanism. Test mobile Safari, viewport resizing, scrollbar compensation and keyboard appearance. Do not add blanket `body { position: fixed }` or a second scroll-lock package.
6. **Focus return.** Return focus to the trigger when it remains. When the trigger disappears after deletion or navigation, focus a logical successor supplied by the surrounding workflow. Restore focus once; do not make two layers fight over it.

For a Radix-backed local wrapper, Title and Description components generally connect IDs through context; inspect the actual wrapper. They need not be direct children merely to participate in context. Do not invent IDs or force `aria-describedby` when no description exists.

Check that focus remains visible and is not entirely obscured by sticky/footer content. The criterion numbering often gets confused: WCAG 2.2 2.4.11 is Focus Not Obscured (Minimum), 2.4.12 is Focus Not Obscured (Enhanced), and 2.4.13 is Focus Appearance. Do not report a complete WCAG assessment from this component checklist.

Use the [audit template](../templates/overlay-audit.md) to record source findings, observed keyboard/focus/scroll checks and unrun work distinctly. The [confirmation example](../examples/confirmation.md) is a usage pattern, not proof of passing runtime behavior.
