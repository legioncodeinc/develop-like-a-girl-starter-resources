# React Router and Vite integration example

These are complete illustrative fragments for an existing approved project. Read its installed versions and current files first. The fragments are not whole-file replacements. No package installation, configuration update or process execution is authorized by reading this example.

## Dependencies and Vite entry

If the approved task includes adding missing dependencies, the corresponding npm command is:

```bash
npm install tailwindcss @tailwindcss/vite
```

Use the existing package manager and lockfile discipline. In a React Router framework project, the baseline plugin relationship is:

```ts
import { reactRouter } from "@react-router/dev/vite";
import tailwindcss from "@tailwindcss/vite";
import { defineConfig } from "vite";

export default defineConfig({
  plugins: [tailwindcss(), reactRouter()],
});
```

This minimal example intentionally omits project-owned plugins. A Workers project must retain its existing Cloudflare Vite plugin configuration and server environment; an existing path-resolution plugin must also remain. Add `tailwindcss()` to that actual array rather than copying this minimal config over it. Plain React/Vite uses its existing React plugin instead of adding framework routing. [Tailwind React Router installation](https://tailwindcss.com/docs/installation/framework-guides/react-router), [Workers integration](https://developers.cloudflare.com/workers/framework-guides/web-apps/react-router/).

## Global stylesheet

```css
/* app/app.css */
@import "tailwindcss";
@theme {
  --color-brand: oklch(0.55 0.16 250);
}
```

The color is illustrative. Use the approved semantic token contract. Keep current theme selectors, source registrations and imports.

## Root stylesheet import and component

Add the existing stylesheet import to the application's current root module. Retain its `Layout`, document elements, loader, headers, `Links`, `Meta`, `Scripts`, scroll restoration and error boundary.

```tsx
// app/root.tsx: this import is the addition, not a replacement module.
import "./app.css";
```

A route component can consume it without browser globals:

```tsx
export default function ExampleRoute() {
  return (
    <main className="mx-auto max-w-xl p-6">
      <h1 className="text-3xl font-bold text-brand">Project overview</h1>
      <p className="mt-3 text-base">Review the current project before changing its styling.</p>
    </main>
  );
}
```

## A separately processed CSS module

```css
/* app/components/Heading.module.css */
@reference "../app.css";
.title { @apply text-2xl font-bold text-brand; }
```

```tsx
import styles from "./Heading.module.css";
export function Heading({ title }: { title: string }) {
  return <h2 className={styles.title}>{title}</h2>;
}
```

For a plain value, `.title { color: var(--color-brand); }` needs no `@reference`. Custom utilities and variants need the reference context. [Directives](https://tailwindcss.com/docs/functions-and-directives#reference).

## Readable production CSS diagnostic

When an existing supported Tailwind Vite version exposes this option, the plugin entry can keep optimization but omit minification for a scoped diagnostic:

```ts
import tailwindcss from "@tailwindcss/vite";
const diagnosticTailwindPlugin = tailwindcss({ optimize: { minify: false } });
```

Substitute that entry only in the existing authorized diagnostic setup, preserve other plugins, and restore normal build settings afterward. Read the installed option type first. The option is not a fix for absent source classes.

## Acceptance

Record [manifest/version], [Vite file and plugin entries], [CSS entry], [root import], [representative generated rule], [actual build result], and [SSR/first paint/hydration result]. An example parse or isolated CSS compilation cannot establish the last two application results.
