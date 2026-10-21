# Tailwind in the existing React/Vite application

Read the actual manifest, lockfile, `vite.config.*`, React Router configuration and root stylesheet import before editing. The selected Starter stack uses React Router framework SSR on Workers. Plain React/Vite client apps have a different plugin chain. A styling repair does not authorize changing the rendering mode, router version, Cloudflare adapter or component library.

Use the dedicated `@tailwindcss/vite` plugin when the approved project uses Vite. Preserve its framework plugins, aliases, server environment, SSR settings and existing ordering. Do not process the same stylesheet through both Tailwind's PostCSS and Vite plugins. Remove another PostCSS plugin only after proving nothing else still needs it. [Official Vite recommendation](https://tailwindcss.com/docs/upgrade-guide#using-vite).

The [integration example](../references/react-router-vite-setup.md) shows the distinct additions: Tailwind import and plugin entry, CSS import, root stylesheet wiring, a real React component, and a CSS-module reference. Adapt each to the existing paths rather than replacing whole files.

## CSS entry and independent stylesheets

```css
/* app/app.css; merge with existing tokens and resets */
@import "tailwindcss";
```

Use the app's existing semantic variables and `@theme inline` mapping. A separately processed CSS module can read generated variables directly:

```css
.title { color: var(--color-gray-950); }
```

When it needs custom utility or variant compilation, reference the actual entry without emitting it again:

```css
/* app/components/Heading.module.css */
@reference "../app.css";
.title { @apply text-2xl font-bold; }
```

## Diagnose a missing style in order

1. Check installed versions and the actual Tailwind plugin entry. An example in a README is not evidence that the app loads it.
2. Confirm the global CSS import reaches the root document on direct navigation and error routes.
3. Check literal class names and source paths with [the source-detection example](../references/component-fit-worked-cases.md).
4. Inspect generated CSS: absent rule means generation/source scope; present rule means selector, cascade, loading or layout.
5. After a permitted plugin change, restart the already-approved development process when required by Vite.
6. Run the consuming app's existing build and browser checks when available. Record unavailable checks. Do not add a Lightning CSS transformer option or reinstall dependencies as a speculative fix.

Workers bindings, secrets, deployments and provider configuration belong to the existing app setup and are not changed by this CSS procedure. The [Workers React Router guide](https://developers.cloudflare.com/workers/framework-guides/web-apps/react-router/) describes that integration; inspect the installed version before applying a newer example.
