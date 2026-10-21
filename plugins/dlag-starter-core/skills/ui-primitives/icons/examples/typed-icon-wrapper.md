# Typed icon wrapper with an enforced naming contract

Use only when `lucide-react` is already installed and its named exports match these imports. Keep the project's existing wrapper location and accepted sizing/stroke defaults. The values below illustrate a common 24-unit grid; they do not replace product tokens.

```tsx
import { ArrowRight, Check, Search, Settings, X } from 'lucide-react';
import type { LucideIcon, LucideProps } from 'lucide-react';

const icons = { arrowRight: ArrowRight, check: Check, search: Search, settings: Settings, close: X } as const satisfies Record<string, LucideIcon>;
export type IconName = keyof typeof icons;
type VisualProps = Pick<LucideProps, 'size' | 'strokeWidth' | 'absoluteStrokeWidth' | 'className'>;
type Props = VisualProps & { name: IconName; label?: string };

export function parseIconName(value: unknown): IconName | null {
  return typeof value === 'string' && Object.prototype.hasOwnProperty.call(icons, value)
    ? value as IconName : null;
}
export function Icon({ name, label, ...visual }: Props) {
  const Glyph = icons[name];
  const accessibleLabel = label?.trim();
  return (
    <Glyph
      {...visual}
      focusable="false"
      role={accessibleLabel ? 'img' : undefined}
      aria-label={accessibleLabel || undefined}
      aria-hidden={accessibleLabel ? undefined : true}
    />
  );
}
export function ExampleControls({ onClose }: { onClose: () => void }) {
  return (
    <div>
      <button type="button"><Icon name="arrowRight" size={16} />Continue</button>
      <Icon name="check" size={20} label="Verified" />
      <button type="button" aria-label="Close dialog" onClick={onClose}>
        <Icon name="close" size={20} />
      </button>
    </div>
  );
}
```

A blank label is treated as decorative, so callers must provide visible text when meaning is needed. The restricted visual prop surface prevents accidentally adding a competing `aria-label`, role, focus handler or tabIndex. If the existing product needs refs or additional visual props, extend that local contract deliberately; do not expose every SVG prop by default.

Unknown content values use `parseIconName` before reaching the typed component. Compile and inspect all three contexts in the target project. This file is an implementation example, not a report that axe or a screen reader passed.
