# Request and response boundaries

A server loader reads for a route. A server action mutates. Client loaders/actions execute in the browser and cannot hold secrets. Ordinary SSR components are rendered on the server and hydrated in the browser; this does not make them React Server Components. Keep private services in .server.ts modules and do not expose credentials through loader data, error text, serialized context or public build variables.

Construct the Supabase server client for each request using the request cookies, public project configuration and response-cookie accumulator. Validate identity through the supported Supabase server verification path. A client claim, hidden form user ID or cookie parsed without verification cannot grant access. Pass the verified identity into a service that enforces ownership in its query and uses RLS as appropriate. Browser-visible publishable keys depend on correctly configured RLS. Secret/service-role keys bypass ordinary access boundaries and are not the default application client.

Before mutation, reject unsupported methods, enforce an application CSRF defense (same-origin checks for ordinary browser forms plus the project's selected token strategy where needed), validate fields and then authorize the requested operation. Distinguish malformed input, unauthenticated, forbidden, missing and provider failure. Do not turn every error into HTTP 200. Keep safe field errors close to the form; log only redacted operational context, never cookies or request bodies by default.

Set Cache-Control: private, no-store for authenticated responses, auth failures and responses that refresh cookies. Merge route and ancestor headers deliberately. Preserve each Set-Cookie header separately with append or the framework's supported cookie helpers, including on redirects/errors. Avoid a shared CDN cache path for personalized HTML or data. Public content caching requires an explicit independent route policy.

For OAuth, callback URLs are allowlisted project configuration and return destinations must be local safe paths. Never echo an arbitrary returnTo into a redirect. Auth provider setup belongs to the Supabase capability; stop the dependent portion if the integration is absent.

The same loader must protect document and client navigation data requests. Root loader identity does not by itself authorize every child action. Actions revalidate loaders according to the router's lifecycle; do not add a second manual global data cache unless required.

Acceptance for a real application: initial document HTML contains expected safe content; a browser hydrates without mismatch; navigation and form submission show pending state; invalid input retains values; two different users cannot read or change each other's record; cookies refresh without collapsing; private content is absent from shared caching; provider failure returns a safe failure. These checks remain proposed until run against the application.
