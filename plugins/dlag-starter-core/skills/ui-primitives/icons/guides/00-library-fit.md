# Fit the existing icon library

Start with `package.json`, the lockfile, icon imports and the local Icon/Button wrappers. Reuse the current library when it has the required shape and style. A new set requires an explicit product decision, dependency approval and its applicable license review; an example is not that approval.

| Library already present | Useful fit | Check in installed version |
|---|---|---|
| Lucide | Consistent outline application icons | Named exports, props, available names and stroke tokens |
| Heroicons | Curated outline/solid vocabulary | Size and variant import paths |
| Tabler | Broad outline coverage | Export names and visual stroke agreement |
| Phosphor | Multiple weights within one vocabulary | Installed weight API and actual emitted bundle |
| Iconify | Existing multi-set integration | Whether data is bundled or fetched, per-set license and fallback |
| Product SVGs | Brand-specific shapes | Rights, viewBox, accessible naming and currentColor suitability |

Do not select a library using a stale icon-count table or a fixed gzip estimate. Count the project's actual required icons and measure the production result using its existing tooling when authorized. A package's named ESM entry point may be designed for tree-shaking; importing from its root is not automatically bad. Dynamic access to a whole namespace is the relevant danger.

Examples of package-specific named imports, conditional on that package already being used:

```tsx
import { ArrowRight } from 'lucide-react';
// Alternative package examples, not imports to combine into one app:
// import { ArrowRightIcon } from '@heroicons/react/24/outline';
// import { IconArrowRight } from '@tabler/icons-react';
```

A visual weight mismatch is a design-system issue; do not fix it by silently mixing sets. A missing brand logo should use an approved asset, not a visually similar vendor icon. Unknown package versions or exports remain prerequisites to verify against the installed source.
