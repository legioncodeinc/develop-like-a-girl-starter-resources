# SSR page and metadata integration recipe

Inspect the installed scaffold and generated route types. This is an integration pattern, not a copy-complete application. Keep content in a reviewed local data map; public loaders filter published entries and return 404 for unknown slugs. Register routes in app/routes.ts and keep the existing Cloudflare entry/context conventions.

Before the first React Router CLI invocation in a new scaffold, provide an explicit app/entry.server.tsx compatible with the pinned Worker runtime. Preserve an existing server entry. In the React Router 8 fixture, omitting this entry caused the CLI to attempt automatic isbot installation and dependency pruning. Do not accept an automatic dependency change as part of a local build check. A Worker entry can use react-dom/server renderToReadableStream with ServerRouter, propagate the request signal and supplied response headers/status, and set the HTML Content-Type. Keep render-error handling and any streaming/crawler behavior appropriate to the actual application; do not replace an established production entry with a fixture stub.

```tsx
// app/routes/services.tsx, React 19 metadata approach
import { services } from "../content/site";
const canonical = "https://example.invalid/services"; // replace with reviewed site origin
export default function Services() {
  return <main id="main-content">
    <title>{services.title}</title>
    <meta name="description" content={services.summary} />
    <link rel="canonical" href={canonical} />
    <h1>{services.heading}</h1>
    <p>{services.summary}</p>
  </main>;
}
```

Keep lang, viewport, skip link, shared navigation/footer, Scripts and framework restoration in the root shell. Existing meta-export projects can keep that approach with Meta/Links in head instead; avoid competing implementations. For a blog route, export loader with generated Route.LoaderArgs, validate params.slug against the reviewed content map, throw new Response('Not found', {status: 404}) for absent/draft entries and render returned safe fields.

For React Router 8 meta exports, loader output is available as loaderData, not the older data parameter. For example, meta: MetaFunction<typeof loader> can read ({ loaderData }) and return descriptors only after checking its presence. Check the installed types instead of transplanting an older-version example.

Give the root ErrorBoundary its own noindex metadata. When a thrown 404 reaches that boundary, the child route metadata can be bypassed; a child-only noindex fallback does not establish the error document's indexing policy. Inspect the actual missing-route response and keep its real 404 status.

For the lead action, keep React Router's framework origin guard enabled. In the React Router 8 fixture, a cross-origin POST can receive the framework's 400 before the action's explicit 403 check runs. Either refusal is valid when it performs zero persistence/email effects. Do not disable the framework guard merely to force the action-level status into the test.

A robots or sitemap resource module has a loader returning Response and no default UI component. Generate XML through escaped text, using the same canonical route list. Inspect response status, Content-Type and body in actual runtime checks. Do not claim this sketch has generated types or executable provider bindings.
