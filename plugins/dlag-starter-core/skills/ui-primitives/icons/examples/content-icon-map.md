# Icons named in repository content

A page's checked-in data contains a label and an optional icon key. The application accepts only the keys in its compiled map. New glyphs require a deliberate import and source change.

```tsx
// components/FeatureLabel.tsx
// Adapt the path to the actual local wrapper from typed-icon-wrapper.md.
import { Icon, parseIconName } from './Icon';

type Props = { label: string; icon: unknown };
export function FeatureLabel({ label, icon }: Props) {
  const name = parseIconName(icon);
  return (
    <span>
      {name ? <Icon name={name} size={20} /> : null}
      <span>{label}</span>
    </span>
  );
}
```

The visible label preserves meaning even if the supplied icon is missing, unknown or malicious. A known name renders the same static SVG during SSR and hydration. `constructor`, `__proto__`, a URL and an import path all fail validation. The map does not evaluate a string, fetch markup or import arbitrary code.

For a standalone status icon, use a visible fallback such as `Verified` rather than returning an empty element when the icon fails. For a control, the button remains named and usable whether its decorative icon exists or not. Never render raw SVG markup from repository content through an HTML injection API without a separately reviewed content trust boundary.

A full-library map and an icon CDN are not necessary for this use case. They increase bundle or network scope. If the actual product already requires either, preserve its separately approved boundary and measure its behavior. Do not introduce a CMS or external service to make a string-name example work.
