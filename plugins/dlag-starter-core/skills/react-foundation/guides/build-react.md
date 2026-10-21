# Build one React slice

Use installed project versions. Code fences are focused examples with project imports identified, not complete applications or executed receipts. Additional packages, tools, provider setup and configuration require the applicable user authorization. Starter uses React Router framework SSR, Cloudflare Workers and Supabase; optional library comparisons do not select a service.

Start with one user action and its visible result. Map the route, component, form and server service before editing. Preserve the React Router app directory; group feature-specific code under app/features only when the feature needs it. Shared presentational primitives live in app/components. Avoid creating empty layers or moving working files solely to match a diagram.

A component receives validated loader data or props and renders it. Derive labels, filtered arrays and counts during render. Use state for changing UI information, such as an open panel. Use an effect only to synchronize with an external system; clean up subscriptions. Do not fetch the route's initial data in an effect or copy loader data into a second store.

Browser globals, current random values and local timezone formatting can produce a different first render on the server and client. Keep the first render deterministic. Read browser-only preferences after hydration when required, with an accessible usable initial state. Never read window, document or localStorage at module initialization. Keep server credentials and clients in server-only modules. Loader return values become browser-visible data.

Use native form controls with persistent labels and suitable input types. Associate validation feedback with the input and an error summary. Keep entered values on validation failure. Use the router's pending state, disable repeat submission as appropriate, and announce status without moving focus unexpectedly. A disabled button alone does not enforce payment or mutation idempotency on the server.

Use route ErrorBoundary exports for unexpected errors; return structured validation results for expected invalid input. Add Suspense only around actual deferred/streaming work with useful fallback content. Router navigation pending UI serves ordinary loader transitions; an unconditional extra Suspense wrapper does not prove loading behavior.

Keep TypeScript strict when authoring a new application. Validate FormData, URL parameters and external JSON at their boundary using existing validation tools or explicit checks. Do not add a validation package merely to validate one string. Keep services independent from rendering and scope clients/identity to the current request.

Completion evidence: changed paths, concrete behavior, checks actually run, denied/failure cases examined, and anything still proposed. A source review does not prove SSR, hydration or browser accessibility. No performance or accessibility conformance score without measurement.
