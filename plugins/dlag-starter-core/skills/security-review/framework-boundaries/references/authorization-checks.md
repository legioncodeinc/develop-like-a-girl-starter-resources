# Identity and authorization check catalog

Each entry requires detection, manual confirmation, a ruled-out path and justified impact. Use the concrete examples and existing local Security snippets for selected-stack code. Do not execute request probes under this method.

## A1. A UI or edge redirect is the only gate

Detect redirects, role checks and protected route groups in the app/Worker. Map protected route to its loader/action/resource handler and data function. Confirm a missing gate only after following shared helpers. A parent route's UI, hidden component, client navigation effect or admin menu is not evidence that every independently callable server surface is protected. Rule out when every relevant path reaches a verified guard before data access. Vulnerable: an admin layout hides children while an action deletes any record. Fixed: the action verifies the actor and data function enforces the appropriate role/owner. Severity depends on actual reachable data/mutation; do not borrow another framework's middleware advisory.

## A2. Path or route coverage gaps

Compare the configured public/protected paths with every endpoint and method, including API prefixes, callbacks and fallback handlers. Show both the condition and the unguarded surface. A caller-supplied route id, header, return path or referring-page name is never proof of authority. Deny-by-default routing reduces omissions but does not establish record ownership. Rule out a path-only suspicion when a downstream resource guard actually covers it. Vulnerable: only /admin is guarded while /api/admin exports data. Fixed: each export path checks verified admin capability before querying. A fragile protected-path list without an actual exposed path is a design note, not a confirmed exploit.

## A3. Session decode treated as verification

Detect jwtDecode/decodeJwt/atob or parsing a cookie/header into user/role. Trace what sets the server actor. A decoded JWT payload, browser user state, x-user-id or raw cookie value cannot be trusted without verification. Use the configured Supabase verification path; getSession() alone reads session material and is not authoritative server validation. A verified user/claims call still needs the correct project/issuer/audience, expiration and project revocation requirements. Rule out a decode used only as an untrusted UI hint with a real downstream check. Vulnerable: cookie JSON grants admin. Fixed: verified identity then server-controlled role/membership lookup. Impact rises when the caller can become another user or obtain admin powers.

## A4. Browser-writable role or privilege fields

Find role/isAdmin/ownerId/tenantId/plan/price coming from form, query, storage, mutable profile metadata or request JSON. Confirm whether that field drives an allow decision or write. Public display metadata and browser preference state are not authoritative. Rule out when the server derives identity/role from validated session and controlled membership records. Vulnerable: form role=admin grants export. Fixed: ignore submitted authority fields and require a server-controlled permission. Supabase user-editable metadata must not define admin privilege.

## A5. Login without record ownership

Find queries/writes by a submitted id. Confirm owner/tenant/membership enforcement for the exact operation and database role used. Read RLS policy predicates and WITH CHECK behavior when RLS is claimed; a service-role client can bypass it. A schema checking id shape is not ownership. Vulnerable: signed-in actor deletes where id=postedId. Fixed: one atomic query constrains id and verified owner, or verifies membership in the same safe transaction. Avoid check-then-write races; zero rows means unavailable without exposing whether another user's record exists. Sensitive or bulk exposure changes impact, not merely sequential ids.

## A6. Privileged backend key in browser

Trace VITE_ names, literal secrets, env spreads, server data and built artifacts only when already supplied/in scope. A Supabase publishable/anon key is designed for browser use and still depends on correct RLS. A service-role key, database credential, Resend key, R2 secret or Stripe secret belongs only on the server. Variable naming alone is not proof of actual bundle content, but an explicit literal in browser code supplies direct evidence. Do not print even a credential prefix; redact the complete value. Proposed rotation/history cleanup is an owner action, not performed by this review.

## A7. Catch handler fails open

Trace guards through try/catch/finally. A thrown redirect/Response/denial must not be swallowed and followed by privileged output. Vulnerable: catch logs an auth error then returns the same private dataset. Fixed: place the guard outside a broad catch or rethrow intended control responses, and return a safe error for operational failures. Rule out a catch that rethrows and cannot fall through. Authentication provider failure should deny the operation, not switch to an anonymous privileged fallback.

## A8. Inverted or short-circuited logic

Read if(session)return, !user.role === 'admin', || versus && and negated promises in their exact control flow. Pattern hits are not intent evidence. Confirm the branch actually permits unauthorized data/mutation, including error and missing-user paths. Fixed: explicit no-user401, insufficient-permission403 and scoped query, with negative tests in an authorized implementation task. Group repeated instances by shared cause; do not inflate findings by counting every caller twice.

## A9. Client-only authorization and server state

Trace role checks in useEffect, component render, localStorage and navigation back to loader/action/Worker surfaces. Client checks may improve UX but cannot authorize server work. An SSR setting itself is not a security finding. Separately examine module/global stores written with per-user state: a Workers isolate may serve multiple requests. Request-local verified identity must stay on the request/context path, not a shared currentUser global. Show one request write and another potential read. Public immutable config/cache is a ruled-out case.
