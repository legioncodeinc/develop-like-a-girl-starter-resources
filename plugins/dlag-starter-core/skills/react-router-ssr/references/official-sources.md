# Official sources

Observed 2026-10-20. Preserve the application's pinned framework APIs.

- [Cloudflare React Router integration](https://developers.cloudflare.com/workers/framework-guides/web-apps/react-router/): current guide identifies v8, SSR, Vite integration and request context. It states SPA mode/prerendering unsupported in that integration.
- [Framework data loading](https://reactrouter.com/start/framework/data-loading): server loaders and browser-visible route data.
- [Framework actions](https://reactrouter.com/start/framework/actions): mutation handling and form integration.
- [HTTP headers](https://reactrouter.com/how-to/headers): response header propagation.
- [Error boundaries](https://reactrouter.com/how-to/error-boundary): route failures.

Account services in the recipe are explicit application contracts, not installed implementations. Ownership, CSRF and private caching are Build Studio boundary requirements and require application review.
