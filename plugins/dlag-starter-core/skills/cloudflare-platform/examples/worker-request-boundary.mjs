// Framework-neutral request adapter. Auth belongs to the injected framework handler.
export function createWorkerBoundary(handleRequest) {
  if (typeof handleRequest !== "function") {
    throw new TypeError("A framework request handler is required");
  }
  return {
    fetch(request, env, ctx) {
      // A fresh context is created for each request; no user state is retained here.
      return handleRequest(request, { cloudflare: { env, ctx } });
    },
  };
}

// Apply to private loader/action/denial responses using framework-supported headers.
// Existing Headers preserve repeated Set-Cookie values in a compatible runtime.
export function privateResponseHeaders(existing) {
  const headers = new Headers(existing);
  headers.set("Cache-Control", "private, no-store");
  return headers;
}
