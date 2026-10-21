# Existing drawer patterns

This code belongs in a product-owned wrapper only when Vaul is already installed and its Root/Portal/Content/Close and snap-point API matches. Feature code imports `FiltersDrawer` from that local wrapper. Preserve an existing Sheet or another primitive family when that already satisfies the task. No package installation is implied.

```tsx
// components/FiltersDrawer.tsx: conditional Vaul-backed local wrapper.
import { useState } from 'react';
import { Drawer } from 'vaul';
import type { ReactNode } from 'react';
const snapPoints = [0.5, 1];
export function FiltersDrawer({ children }: { children: ReactNode }) {
  const [open, setOpen] = useState(false);
  const [snap, setSnap] = useState<number | string | null>(snapPoints[0]);
  return (
    <Drawer.Root open={open} onOpenChange={setOpen}
      snapPoints={snapPoints} activeSnapPoint={snap} setActiveSnapPoint={setSnap}>
      <Drawer.Trigger asChild><button type="button">Filters</button></Drawer.Trigger>
      <Drawer.Portal>
        <Drawer.Overlay className="fixed inset-0 bg-overlay" />
        <Drawer.Content className="fixed inset-x-0 bottom-0 flex max-h-[90dvh] flex-col border border-border bg-surface text-foreground">
          <div className="p-4">
            <Drawer.Title>Filters</Drawer.Title>
            <Drawer.Description>Choose which results to show.</Drawer.Description>
            <button type="button" onClick={() => setSnap(snap === 1 ? 0.5 : 1)}>
              {snap === 1 ? 'Reduce panel' : 'Expand panel'}
            </button>
            <Drawer.Close asChild><button type="button">Close filters</button></Drawer.Close>
          </div>
          <div className="min-h-0 flex-1 overflow-y-auto p-4">{children}</div>
        </Drawer.Content>
      </Drawer.Portal>
    </Drawer.Root>
  );
}
```

Use the existing layer/radius/motion utilities on Overlay and Content; the example omits invented values. `bg-overlay`, `bg-surface` and other roles require the product's semantic-token bridge. The visible Expand/Reduce and Close controls provide alternatives to dragging. Verify snap behavior and whether the installed API accepts fractional points; names and types are version-sensitive.

For a simple drawer omit snap props and retain a single controlled open state. For a side drawer preserve an installed direction API or the existing Sheet wrapper. Long content scrolls inside a flex child with `min-h-0` and overflow, while the primitive owns page scroll locking. Test overscroll and the on-screen keyboard.

If an existing design explicitly uses `shouldScaleBackground`, preserve the required wrapper attribute from the installed version and verify it with reduced motion. Do not introduce background scaling as a default or change the entire document structure just for the example.

A nested Vaul drawer may use its installed `NestedRoot` API rather than a second unrelated root. Both levels still need titles, descriptions where useful and close controls. Keep the nesting shallow and run the [layering checks](03-layering.md). A native-looking drag handle does not replace a keyboard-accessible action. React Router SSR does not require a Next-specific client directive; browser-only operations remain in the primitive's lifecycle.

## Two related drawer levels

Use only if the installed Vaul exports `NestedRoot`; this belongs in the local wrapper module. Reuse the product's layer classes rather than inferring defaults.

```tsx
import { Drawer } from 'vaul';
export function RelatedDrawers() {
  return (
    <Drawer.Root>
      <Drawer.Trigger asChild><button type="button">Open item details</button></Drawer.Trigger>
      <Drawer.Portal>
        <Drawer.Overlay className="fixed inset-0 bg-overlay" />
        <Drawer.Content className="fixed inset-x-0 bottom-0 bg-surface text-foreground">
          <Drawer.Title>Item details</Drawer.Title>
          <Drawer.Description>Review this item and its related information.</Drawer.Description>
          <Drawer.NestedRoot>
            <Drawer.Trigger asChild><button type="button">Related information</button></Drawer.Trigger>
            <Drawer.Portal>
              <Drawer.Overlay className="fixed inset-0 bg-overlay" />
              <Drawer.Content className="fixed inset-x-0 bottom-0 bg-surface text-foreground">
                <Drawer.Title>Related information</Drawer.Title>
                <Drawer.Description>Close this panel to return to item details.</Drawer.Description>
                <Drawer.Close asChild><button type="button">Back to details</button></Drawer.Close>
              </Drawer.Content>
            </Drawer.Portal>
          </Drawer.NestedRoot>
          <Drawer.Close asChild><button type="button">Close details</button></Drawer.Close>
        </Drawer.Content>
      </Drawer.Portal>
    </Drawer.Root>
  );
}
```

The example intentionally does not invent layer numbers. Apply the already approved overlay/nested-overlay utilities before use and verify the entire open-child-close-parent sequence. If no such nesting is required by the task, use a single panel.
