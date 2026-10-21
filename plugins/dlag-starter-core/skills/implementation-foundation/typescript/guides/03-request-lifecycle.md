# Typed requests and React Router SSR

Use the installed React Router framework route types generated for the actual route. Current framework documentation describes `./+types/<route>` imports with `Route.LoaderArgs`, `Route.ActionArgs`, and `Route.ComponentProps`. Verify the project's installed major and scaffold before applying an example. Do not introduce another framework's event, action, locals, serialization, or cookie lifecycle conventions.

Server loader and action code must obtain a request-specific authenticated context through the application's implemented server adapter. A declaration for that context is not an authentication implementation. Client-supplied user or tenant IDs do not establish identity. Before data access, verify the session, membership, object ownership, and operation permission. The database owner's RLS and server authorization rules remain required even when all types compile.

Client loaders and actions execute with browser capabilities and may not import server credentials. For a server-to-client handoff, review exactly which data the client receives, how revalidation occurs, and whether any client override drops or widens server data. Do not assume automatic merging based on conventions from a different router. Nested routes need explicit ownership of shared keys and data access. A full server record is not a safe default handoff.

For form submissions, handle repeated keys and uploaded files deliberately; `Object.fromEntries` can conceal repeated-field ambiguity. Bound the request, validate each expected field, authorize the mutation, perform it once, then return safe errors or a redirect with the intended status. Refresh session-derived state after login/logout through the actual project's lifecycle. A cookie set on a response does not retroactively authenticate an already computed request context.

An action-triggered revalidation test must exercise the actual router and session adapter, not merely call a pure parser. Test direct server navigation and hydrated navigation, invalid action input, logout followed by navigation, stale in-flight requests, aborted requests, and two simultaneous users. Module-level mutable user/session state can cross requests in a reused Worker isolate. Pure immutable constants may be shared; request identity and per-user clients belong in request scope.

Plain Worker endpoints use their configured handler and generated binding types. The supplied endpoint example deliberately implements a public validation response only. It is not an authorized database mutation. It includes request byte limits and stable output codes and does not stand in for a Supabase session or RLS implementation.

Source: [React Router type generation](https://reactrouter.com/explanation/type-safety). The documentation and examples here do not establish compatibility with an uninspected installed application.
