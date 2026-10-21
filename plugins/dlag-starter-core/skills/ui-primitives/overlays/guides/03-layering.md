# Portal placement, layers and scroll ownership

Inspect where the local primitives actually mount. Many dialog libraries portal near `document.body`; some wrappers provide a custom container. A toaster may render where it is mounted rather than always using a portal. There is no universal default z-index or built-in `--radix-dialog-content-z-index` variable to rely on.

A portal escapes a problematic ancestor's clipping or stacking context, but can also escape a scoped theme. Use the existing portal container and carry the correct semantic tokens/brand scope. Keep the portal outside a region that the active modal marks inaccessible. Do not read `document.body` during SSR; use the primitive's existing client lifecycle.

Use the product's named layering tokens. If absent, the design-system owner defines them before use. Illustrative ordering is backdrop < modal < nested backdrop < nested modal; tooltip and toast placement follows the active interaction. Numbers such as 9999 do not fix an incorrect stacking context.

For a dialog opened from a drawer, verify:

1. The second backdrop covers the drawer while the active dialog stays usable.
2. Tab and Escape affect the active layer only. One Escape does not dismiss both layers.
3. Closing the child returns focus into the parent drawer.
4. Body scroll remains locked while the parent stays open.
5. Closing the parent restores scroll position and focus to its original trigger.
6. Modal content and nested popups inherit the intended theme and brand.

Do not assume two packages share a compatible lock manager because they both use React. Inspect installed versions and the local wrappers. A duplicate lock, blanket body-position rule or competing focus-return handler can break this sequence.

Toasts that sit visually above a modal can still be outside its active accessibility/focus scope. Essential modal errors belong in that modal, not only in a global toaster. Check pointer events, the accessibility tree and keyboard reachability of toast actions; a high z-index alone does not make them accessible.

Background isolation must prevent keyboard and pointer interaction as well as present correct semantics to assistive technology. Inspect actual `inert`, aria-hidden and primitive behavior without assuming one attribute performs all three jobs. Record mobile scrolling and nested behavior as unrun when no browser evidence exists.
