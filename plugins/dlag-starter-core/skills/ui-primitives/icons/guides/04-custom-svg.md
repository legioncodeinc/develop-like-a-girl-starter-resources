# Custom SVG component

Use an approved SVG asset when the installed set does not contain the required brand or product shape. Preserve its rights/notice and original viewBox proportions. Changing `viewBox` alone to force a 24-unit grid can crop or distort path data. Normalize the drawing intentionally or keep its original coordinates with consistent display dimensions.

```tsx
import { useId } from 'react';
type Props = { size?: number; className?: string; label?: string };
export function ArrowIcon({ size = 24, className, label }: Props) {
  const titleId = useId();
  const name = label?.trim();
  return (
    <svg width={size} height={size} viewBox="0 0 24 24" fill="none"
      stroke="currentColor" strokeWidth={2} strokeLinecap="round" strokeLinejoin="round"
      className={className} focusable="false"
      role={name ? 'img' : undefined}
      aria-hidden={name ? undefined : true}
      aria-labelledby={name ? titleId : undefined}>
      {name ? <title id={titleId}>{name}</title> : null}
      <path d="M5 12h14" />
      <path d="m12 5 7 7-7 7" />
    </svg>
  );
}
```

The outline inherits `color`; consumers use approved text-role classes. Filled icons use `fill="currentColor"` if the artwork is meant to be monochrome. Do not strip deliberate multi-color branding. Match the existing set's stroke weight and optical size rather than assuming every library uses the same stroke.

For designer-exported SVGs inspect metadata, IDs, scripts, event handlers, foreignObject and external references before converting trusted path data to JSX. An optimizer is not a sanitizer. Use only an already installed, authorized optimization path. Preserve viewBox, required title/description relationships and unique IDs for clip paths, masks or gradients. Do not execute an ad hoc install command from an asset guide.

Group custom exports in the existing icon module, for example `export { ArrowIcon } from './ArrowIcon'`. Keep fixed import names so the bundler can reason about usage. Verify dimensions, currentColor inheritance, dark mode, naming and keyboard focus in the real app. Record optimization and accessibility execution separately; source shape alone does not establish either.
