# Named imports, curated maps and sprites

| Actual need | Default within the existing project |
|---|---|
| Small known set and initial navigation | Static named imports |
| Names supplied from repository content | Small typed allowlisted map |
| Rarely opened large section | Existing route/module code split; measure impact |
| Same approved SVGs shared by independent renderers | Existing sprite, if its pipeline already exists |
| Existing external icon service | Preserve only under its explicit network/privacy/product policy |

```tsx
import { ArrowRight, ChevronDown } from 'lucide-react';
// Avoid: import * as Icons from 'lucide-react'; const Icon = Icons[name];
```

A curated map includes every icon you put in that map because any key can be selected at runtime. A TypeScript union does not prove the bundler can remove unused runtime map entries. Keep the map small and split by an existing route boundary if needed. Static runtime-name lookup is not a network dynamic import and can render consistently during SSR.

A sprite keeps trusted `<symbol>` definitions in an approved asset and references one with `<use>`. For an existing same-origin sprite:

```tsx
<svg aria-hidden="true" focusable="false" viewBox="0 0 24 24" width="24" height="24">
  <use href="/icons.svg#arrow-right" />
</svg>
```

The sprite URL and fragment must come from the approved asset map, not arbitrary content. An external sprite can be cached separately; an inline sprite avoids a request but repeats bytes in each document. Neither is universally smaller. Test browser support, CSP, caching, path/viewBox behavior and meaningful names on consuming controls. SVG sprites are not universally supported in email clients.

SVGR produces React components from SVG; it does not create a sprite. Adding SVGO, a sprite generator or a Vite plugin is build-tool work with separate installation/configuration authorization. Do not copy a Webpack configuration into Vite.

For a bundle regression, compare the production chunk before/after, count actual imports, inspect namespace access and central maps, then measure compressed transfer and parse cost using existing tools. Development module size is not production evidence. Above-the-fold controls keep fixed dimensions and a server-renderable icon; do not make an essential action wait for a CDN request.
