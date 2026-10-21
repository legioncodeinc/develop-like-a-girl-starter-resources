# Official references

Observed October 20, 2026. Consult the application's pinned versions before applying syntax.

- [Cloudflare React Router integration](https://developers.cloudflare.com/workers/framework-guides/web-apps/react-router/): Workers framework SSR and Vite conventions; follow the current scaffold rather than a generic SPA template.
- [React Router route modules](https://reactrouter.com/start/framework/route-module): loaders, metadata and React 19 document metadata. The current guidance recommends built-in metadata elements for React 19 and explains complete replacement for child meta arrays.
- [React Router root](https://reactrouter.com/api/framework-conventions/root.tsx): root document and Meta/Links when using route exports.
- [React Router resource routes](https://reactrouter.com/how-to/resource-routes): loaders returning Response without a UI export, used here for robots/sitemap.
- [Google structured data introduction](https://developers.google.com/search/docs/appearance/structured-data/intro-structured-data): page facts and structured-data eligibility; search appearance is not guaranteed.
- [W3C form notifications](https://www.w3.org/WAI/tutorials/forms/notifications/): identifying errors and announcing completion accessibly.

Request limits, idempotency, origin checks and deferred mail execution are Build Studio application boundary requirements. The recipes name required application contracts; these links do not establish implementation or a complete security audit.
