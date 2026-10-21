# Candidate locators for the selected stack

Security Review itself has Read/Grep/Glob. Use their scoped equivalents. A caller with separately authorized shell may use the following read-only patterns against explicitly approved source files. Do not recursively read private .env, credentials, notes, symlinks/hardlinks, dependencies, generated output or unrelated repositories. Prefer file/line names and read only the safe relevant source excerpt. Do not send repository data to external research queries.

```text
Surface declarations: export ... loader|action|clientLoader|clientAction|fetch
Identity candidates: getSession, getUser, getClaims, jwtDecode, decodeJwt, atob, x-user-id
Authority inputs: formData.get, request.json, params, searchParams, role, ownerId, tenantId, price
Query/return candidates: select('*'), SELECT *, .eq('id',...), return row, return {...record}
Boundary candidates: VITE_ names, envPrefix, import.meta.env, context.cloudflare.env, context.env
Raw rendering: dangerouslySetInnerHTML, innerHTML, outerHTML, insertAdjacentHTML, document.write
Markdown: marked, markdown-it, remark, rehype, MDX compile, sanitizer/purify
Control flow: redirect/error/throw inside try/catch; missing-user branch; !role ===; || versus &&
Shared state: top-level let/var, exported mutable object, currentUser/currentTenant, global cache
Browser storage: localStorage/sessionStorage writes, document.cookie, token/key/session names
Caches: Cache-Control public/s-maxage, caches.open, cache.put, service-worker fetch handler
Outbound: fetch(variable), URL from params/body, Cookie/Authorization forwarding, dynamic Location
Limits: request.json/formData, Content-Length, stream reader, array/batch/file counts, Infinity
Config: source maps, debug/dev mode, unsafe-inline/eval, nonce, CSP Report-Only, forwarding headers
```

Read the actual code and caller/guard paths after every hit. An auth-named function, sanitizer elsewhere in a file, cache directive in a comment, or object type name does not prove a check. Missing a regex hit cannot prove absence or safety. In all package formats, declared ranges and multiple lockfile entries require importer-resolution review.
