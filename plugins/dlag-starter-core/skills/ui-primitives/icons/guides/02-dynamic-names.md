# A string name selects from known icons

Repository content can provide a string such as `search` or `settings`. Validate it against a small own-property allowlist, not a whole-library namespace or dynamic import path. Unknown names get an explicit fallback policy. A missing decorative icon can disappear without losing information; a missing semantic icon still needs its visible or accessible text.

```tsx
import { ArrowRight, Search, Settings } from 'lucide-react';
import type { LucideIcon } from 'lucide-react';
export const icons = { arrowRight: ArrowRight, search: Search, settings: Settings } as const satisfies Record<string, LucideIcon>;
export type IconName = keyof typeof icons;
export function iconName(value: unknown): IconName | null {
  return typeof value === 'string' && Object.prototype.hasOwnProperty.call(icons, value)
    ? value as IconName
    : null;
}
```

See the [complete wrapper](../examples/typed-icon-wrapper.md). The own-property check rejects keys such as `constructor` and `__proto__`. Do not log arbitrary supplied names merely to debug a miss.

The [content example](../examples/content-icon-map.md) demonstrates unknown-name behavior. Imports are fixed at build time; runtime data only chooses an approved component. It works under React Router SSR without a framework-specific client directive. Do not treat a forwarded-ref component as invalid because `typeof Component` is not `function`; use the typed registry.

Lazy-load a rare approved icon group only through the application's existing split boundary. A stable fallback must reserve its space and preserve meaning. Avoid creating `lazy()` components on every render. An arbitrary `import(name)` or full namespace map expands the bundle and code boundary. A runtime icon service adds a provider request, caching, availability and privacy consequences; this Starter route does not introduce one.

Above-the-fold icons may use a static allowlisted map without a waterfall. The restriction is on delayed fetching or unpredictable loading, not on a simple property lookup. Match server and first-client input data so the same glyph renders on both.
