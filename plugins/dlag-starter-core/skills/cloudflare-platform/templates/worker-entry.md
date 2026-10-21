# Worker entry adaptation

Use the existing scaffold as the source of truth. This documented context-object shape is appropriate only when the pinned framework and template expose context.cloudflare. Preserve a newer typed context API if the project uses one.

```ts
import { createRequestHandler } from "react-router";
import { createWorkerBoundary } from "./worker-request-boundary.mjs";

const handleRequest = createRequestHandler(
  () => import("virtual:react-router/server-build"),
  import.meta.env.MODE,
);

export default createWorkerBoundary(handleRequest) satisfies ExportedHandler<Env>;
```

Env and ExportedHandler come from the existing scaffold's generated Cloudflare types. If it uses a CloudflareEnvironment augmentation, retain that declaration. This fragment assumes the project's virtual module declaration, Cloudflare Vite plugin and generated binding types; it is not a standalone TypeScript program. Keep the handler factory free of user state. Request-specific services belong inside the request boundary or receive the request explicitly.

For a loader, read context.cloudflare.env only on the server. Return deliberately selected data, never env itself. Add service bindings in the project's existing local configuration only for the authorized integration. See [binding checklist](bindings-checklist.md).

The packaged [request-boundary helper](../examples/worker-request-boundary.mjs) is illustrative application source. When adopting this recipe, copy that helper beside workers/app.ts or adapt its import to a local application helper; never import from an installed plugin cache at application runtime. Its privateResponseHeaders function adds the private cache policy to existing Headers; the route must still preserve those headers and repeated cookies through framework composition. A Node fixture can exercise this small adapter with an injected handler. Such a fixture proves forwarding and header behavior only, not React rendering or Supabase authentication.
