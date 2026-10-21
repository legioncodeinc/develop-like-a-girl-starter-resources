# 01: Project Structure

Use installed project versions. Code fences are focused examples with project imports identified, not complete applications or executed receipts. Additional packages, tools, provider setup and configuration require the applicable user authorization. Starter uses React Router framework SSR, Cloudflare Workers and Supabase; optional library comparisons do not select a service.

The feature-based folder layout from bulletproof-react. Follow it. Deviations need justification.


## The canonical tree

```
src/
  app/            routes, app.tsx, provider.tsx, router.tsx
  assets/         static images/fonts
  components/     SHARED components used across features
  config/         global config, env exports
  features/       FEATURE MODULES (the bulk of code)
  hooks/          shared hooks
  lib/            pre-configured libraries (e.g., lib/api-client.ts)
  stores/         global state stores
  testing/        test utilities, MSW handlers, mocks
  types/          shared types
  utils/          shared utilities
```

See [templates/project-structure.md](../templates/project-structure.md) for a drop-in scaffold.

## Feature layout

```
src/features/awesome-feature/
  api/            request declarations + hooks
  assets/
  components/     components scoped to this feature
  hooks/
  stores/
  types/
  utils/
```

Include only the subfolders the feature needs. Empty folders are clutter.

## Three rules that matter

### Rule 1: No cross-feature imports

`src/features/comments` must not import from `src/features/discussions`. Features compose **at the `app/` layer**, not by reaching into each other.

Enforce with ESLint `import/no-restricted-paths`:

```js
{
  target: './src/features/comments',
  from: './src/features',
  except: ['./comments'],
}
```

See [templates/eslint.config.js](../templates/eslint.config.js) for the full zone list.

### Rule 2: Unidirectional flow

`shared → features → app`. Shared imports nothing. Features import only from shared. App imports from features and shared. Enforces a DAG with no back-edges.

```js
{ target: './src/features', from: './src/app' }
{ target: ['./src/components', './src/hooks', './src/lib', './src/types', './src/utils'],
  from: ['./src/features', './src/app'] }
```

### Rule 3: No barrel files

Aggregator index files can obscure imports, create graph-wide dependencies and hide cycles. Confirm actual emitted bundle/cycle behavior rather than treating the filename as proof. Import files directly:

```ts
// bad
import { Button } from '@/components';

// good
import { Button } from '@/components/ui/button/button';
```

Exception: component libraries with an explicit public API (e.g., `src/components/ui/button/index.ts` that exports `Button` and its types): acceptable at the *leaf* level, never at aggregator level.

## React Router framework SSR variant

Use the existing framework app directory. app/root.tsx owns the document, app/routes.ts the route map and app/routes/ route modules. Feature modules live under app/features/, shared primitives under app/components/ and request-private services under app/services/*.server.ts. Keep framework-generated route types and Workers context with the scaffold. Do not add a second BrowserRouter, a SPA createRoot entry or a Next page/layout convention. See the local project file map.

Feature grouping and one-way imports remain useful. Do not move a working small application merely to satisfy this illustration. A barrel's real graph/bundle effects require measurement; its existence alone does not prove broken tree shaking.

## Anti-patterns (these are findings)

- Flat structure (all components in one folder).
- "Layer-based" (`components/`, `hooks/`, `services/` at root with no feature grouping) in any app >10 components.
- Cross-feature imports.
- Barrel files at aggregator levels.
- `types.ts` floating in the repo root: put them in `features/<feature>/types/` or `src/types/`.

## Worked example

See [examples/refactor-proposal-example.md](../examples/refactor-proposal-example.md): phase 1 reorganizes a layer-based `src/` into this feature-based layout.

## Finding template

When flagging a project structure issue:

> **[Should-refactor]** `src/services/userService.ts:1`: user-specific logic sits in a global `services/` layer rather than `src/features/users/api/`. Move per [guides/01-project-structure.md §feature-layout](01-project-structure.md). Enables future cross-feature-import rules.
