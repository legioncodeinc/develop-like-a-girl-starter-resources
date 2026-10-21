# Framework settings and file ownership

In the existing react-router.config.ts, preserve installed configuration types and keep framework SSR enabled:

```ts
import type { Config } from "@react-router/dev/config";
export default { ssr: true } satisfies Config;
```

This fragment is merged with existing settings; it does not replace the file. Use the scaffold's Vite plugin configuration for its pinned versions. Keep the Cloudflare Vite integration and React Router framework integration together, and retain the scaffold's worker environment name. Route entries belong in app/routes.ts; the root shell belongs in app/root.tsx. Use generated Route.LoaderArgs, Route.ActionArgs and Route.ComponentProps appropriate to the actual route filename.

The Cloudflare Vite integration documented on 2026-10-20 does not support React Router SPA mode or prerendering. Use SSR for this kit. A generic React/Vite SPA template alone does not satisfy a website SSR request.

The worker forwards request, environment and execution context to the framework. If the existing template uses newer typed middleware/context APIs, preserve them rather than adding a second incompatible context shape. Refer to the [Worker recipe](../../cloudflare-platform/templates/worker-entry.md) and validate against installed types.
