# Decorative, meaningful and interactive icons

Classify the icon by the information it conveys. The same glyph can have a different role in different contexts.

| Context | Contract |
|---|---|
| Visible adjacent text conveys the same meaning | SVG is decorative: `aria-hidden="true"`, `focusable="false"` |
| Standalone non-interactive meaning | Give the image a name with `role="img"` and `aria-label`, or provide visible/visually hidden text |
| Icon-only button/link | Name the actual button/link; hide the SVG from assistive technology |

```tsx
<>
<button type="button"><Icon name="arrowRight" />Continue</button>
<Icon name="check" label="Verified" />
<button type="button" aria-label="Close dialog" onClick={onClose}>
  <Icon name="close" />
</button>
</>
```

`Icon` here means the local product wrapper, such as the [complete example](../examples/typed-icon-wrapper.md), not an uninspected vendor export. A tooltip alone is not a reliable accessible name. Keep visible text where comprehension would otherwise depend on recognizing a symbol. The icon name `X` is not a useful label for the action `Close dialog`.

A semantic container can supply the name while its SVG remains decorative:

```tsx
<span role="img" aria-label="Verified">
  <Icon name="check" />
</span>
```

For an inline SVG title, use a unique stable ID, such as `useId()`, and connect `aria-labelledby`. Do not reuse `id="icon-title"` across many instances. Prefer one clear naming method; duplicated title, label and text can create repeated announcements.

The wrapper API should prevent callers from overriding its role, hidden state or keyboard focus after the contract has been set. Spread allowed visual props before enforced accessibility props and omit conflicting props from the type. A button owns pressed/expanded/disabled state, event behavior and focus. Do not make the SVG itself clickable or tabbable.

Check each category in the actual DOM, keyboard flow and accessibility tree. An automated `button-name` or SVG-name check can find omissions but does not prove the label is useful. Report checks as unrun when no browser or assistive-technology test occurred. No sample component has an implied zero-violation result.
