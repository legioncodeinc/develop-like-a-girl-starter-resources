# Platform, proxy, upload and deployment checks

## P1. Deployment identity

Read actual Workers entry, React Router/Vite configuration, binding interfaces and deployment config modules. A wrangler file or README is only a hint when actual deployment is unknown. Source control cannot prove live provider settings. No Vercel, Netlify, Node adapter or Supabase Edge Functions becomes Starter's backend default. Describe uncertainty rather than inventing a host.

## P2. Trusted canonical origin and forwarding

A client can control Host/Forwarded/X-Forwarded-* unless the actual ingress overwrites and restricts them. Read where those values influence CSRF, redirects, fetch URLs, IP allowlists, rate limits or logs. Do not select the left-most forwarded-for value as a universal identity. Workers platform metadata has a defined trust boundary; require project evidence before trusting it. Admin authorization must use verified actor/capability rather than IP alone. A documented trusted proxy that removes attacker headers can rule out the specific spoofing path, but needs actual config evidence.

## P3. Remote resource and image fetch

For any Worker preview/image proxy, spell out scheme, host, port, path, query and redirect policy. Broad shared-host wildcards, arbitrary URLs or private addresses can widen SSRF/cost surface. A project-specific origin/path is narrower but still needs DNS and redirect considerations. No built-in image optimizer or its advisories is assumed. R2 binding access avoids arbitrary outbound URL construction where a stored owned object identifier is sufficient.

## P4. Untrusted SVG and files

Uploaded SVG/HTML can contain active content. Establish actual content type, disposition, delivery origin, CSP/sandbox and ownership. Serving arbitrary active uploads inline on the application origin creates a separate risk from static trusted icons. Attachment disposition and a restrictive policy help, but are not proof of malware removal or safe rendering in all contexts. Do not introduce a new processing provider. Bound request/file sizes and counts, and derive object keys/authorization on the server rather than trusting caller paths.

## P5. Redirects and rewrites

Trace destination hostname or whole URL constructed from path/query/form/captured values. Same-site relative redirect guards must reject //, backslashes, controls and parser normalization surprises. Use configured canonical origins, never unchecked Host as a basis for OAuth/payment return decisions. A regex restricting a tenant label still needs controlled suffix/lookup and ownership. A narrower internal navigation target is lower impact; appending tokens to an attacker target is materially worse. Existing local Security snippets contain a concrete validated redirect helper.

## P6. Security response controls

Inspect app and platform layers before calling a header absent. Configuration precedence, errors and static routes can differ. HSTS scope/preload needs full domain readiness. Framing, nosniff, referrer and permissions controls fit purpose; version banners are context, not automatic exploit evidence. Public evidence can be reviewed with the local passive methods, but this source review does not authorize fetching a deployed site.

## P7. Build safety and dev exposure

Look for skipped type/lint/validation checks and any deployed development server, exposed dev origin or debug endpoint. These are contextual priorities; disabled checks alone are not a confirmed access-control flaw. Inspect the actual deployed artifact/process evidence before asserting production exposure. Vite mode and NODE_ENV are different concepts; another framework's compiler-gated security behavior cannot be asserted for React Router without evidence. No build runs merely to inspect the method.

## P8. Bindings and platform secrets

Cloudflare bindings/secrets belong in server context, never root loader env spreads or browser VITE_ values. R2, Resend and Stripe secrets are server-held; no newsletter/job provider is selected. Return named public config fields only. The existence of a binding type does not prove permission or live secret configuration. Do not read private values or configure providers during review.

## P9. Static output and runtime caching

Classify each prerender/static route as public data. Sensitive/user-specific views and loader responses must retain request-time authorization. Check service-worker explicit cache policies and Workers Cache API separately from HTTP headers. Clearing browser state on logout does not necessarily delete cached responses or cross-request memory. Use public-asset allowlists, no-store and actual exclusion code. Runtime/cache tests remain a separate authorized evidence category.

## P10. Unsupported flags and packages

An option/API from another framework is not an equivalent security control in this stack. Identify dead/no-op copied configuration and the actual missing check. Do not install an unsupported runtime or simply rename APIs. Where a feature has no selected implementation, record that exact gap and keep the generic boundary requirement. No provider console, callback registration or app store/release action follows from reading this method.
