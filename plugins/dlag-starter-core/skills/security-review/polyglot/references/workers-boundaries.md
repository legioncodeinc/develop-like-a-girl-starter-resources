# Concrete Workers boundary pairs

These examples preserve the backend mechanisms using the selected stack. They are source-review examples with unrun runtime/SDK/provider behavior, not a complete server or cookie SSR adapter. Security Review reads them; a separately authorized implementation caller supplies tests. Existing project SDKs/types and selected auth configuration must be confirmed before use.

## 1. Request identity, explicit fields and scoped Supabase access

Vulnerable: trust a body `owner_id`, spread the whole JSON into a row, or use a service-role client and id-only update. A valid browser session on another route does not authorize this one.

This is a bearer-only handler pair, not the cookie/session refresh implementation. `createClient` is from the existing selected Supabase SDK. `readJson` below bounds actual bytes. The supplied SQL/RLS must also permit only the current owner. Anonymous/publishable server client plus verified token does not bypass RLS. Privileged/service-role paths need a separate explicit authorization design.

```ts
import { createClient } from '@supabase/supabase-js';

async function readJson(request: Request | Response, max = 16_384): Promise<unknown> {
  if (!request.body) throw new Error('invalid-body');
  const reader = request.body.getReader();
  const chunks: Uint8Array[] = [];
  let total = 0;
  try {
    for (;;) {
      const { done, value } = await reader.read();
      if (done) break;
      total += value.byteLength;
      if (total > max) { await reader.cancel(); throw new Error('body-too-large'); }
      chunks.push(value);
    }
  } finally { reader.releaseLock(); }
  const bytes = new Uint8Array(total);
  let offset = 0;
  for (const chunk of chunks) { bytes.set(chunk, offset); offset += chunk.byteLength; }
  return JSON.parse(new TextDecoder('utf-8', { fatal: true }).decode(bytes));
}

type Env = { SUPABASE_URL: string; SUPABASE_PUBLISHABLE_KEY: string };
const reply = (status: number) => new Response(null, {
  status, headers: { 'Cache-Control': 'no-store' },
});

export async function updateProfile(request: Request, env: Env): Promise<Response> {
  const header = request.headers.get('Authorization') ?? '';
  const match = /^Bearer ([A-Za-z0-9._~-]+)$/.exec(header);
  if (!match) return reply(401);
  const token = match[1];
  const db = createClient(env.SUPABASE_URL, env.SUPABASE_PUBLISHABLE_KEY, {
    global: { headers: { Authorization: `Bearer ${token}` } },
    auth: { persistSession: false, autoRefreshToken: false, detectSessionInUrl: false },
  });
  const { data: identity, error: authError } = await db.auth.getUser(token);
  if (authError || !identity.user) return reply(401);
  let body: unknown;
  try { body = await readJson(request); } catch { return reply(400); }
  if (body === null || typeof body !== 'object' || Array.isArray(body)) return reply(400);
  const input = body as Record<string, unknown>;
  if (Object.keys(input).length !== 1 || typeof input.display_name !== 'string') return reply(400);
  const displayName = input.display_name.trim();
  if (displayName.length < 1 || displayName.length > 80) return reply(400);
  const { data, error } = await db.from('profiles')
    .update({ display_name: displayName })
    .eq('id', identity.user.id).eq('owner_id', identity.user.id)
    .select('id, display_name').maybeSingle();
  if (error) return reply(500);
  if (!data) return reply(404);
  return Response.json(data, { headers: { 'Cache-Control': 'no-store' } });
}
```

Review HTTP method routing separately. The profile schema in this example deliberately makes `profiles.id` and `owner_id` equal to the user identity; change the id predicate only with the actual schema, while retaining verified ownership and allowed fields. Server cookie flows additionally need the selected SSR adapter's cookie propagation, refresh behavior and no shared cache. This example does not implement them.

## 2. Fixed query structure and bounded sort

Vulnerable: concatenate `sort` into SQL, or accept `owner_id` as a filter supplied by the client.

```ts
const columns = { newest: 'created_at', title: 'title' } as const;
const key = url.searchParams.get('sort');
const column = key === 'title' ? columns.title : columns.newest;
const { data, error } = await userScopedDb.from('documents')
  .select('id, title, created_at')
  .eq('owner_id', verifiedUser.id)
  .order(column, { ascending: key === 'title' })
  .limit(50);
```

`userScopedDb` and `verifiedUser` must come from the actual server verification path, not client JSON. Handle errors without returning internal details. RPCs/raw SQL must bind values and enforce the same ownership. Parameter binding never replaces authorization.

## 3. R2 key ownership instead of user filesystem paths

Vulnerable: `env.FILES.get(url.searchParams.get('key'))`, or a row lookup by id alone followed by private-object delivery.

```ts
// Preconditions: actual server-verified identity, RLS-protected user client,
// a validated documentId, and an existing R2 binding named FILES.
const { data: record, error } = await userScopedDb.from('documents')
  .select('id, owner_id, object_key').eq('id', documentId)
  .eq('owner_id', verifiedUser.id).maybeSingle();
if (error || !record) return new Response(null, { status: 404 });
const prefix = `users/${verifiedUser.id}/`;
if (typeof record.object_key !== 'string' || !record.object_key.startsWith(prefix)) {
  return new Response(null, { status: 404 });
}
const object = await env.FILES.get(record.object_key);
if (!object) return new Response(null, { status: 404 });
return new Response(object.body, { headers: {
  'Content-Type': 'application/octet-stream',
  'Content-Disposition': 'attachment',
  'Cache-Control': 'private, no-store',
  'X-Content-Type-Options': 'nosniff',
} });
```

The object key is server-created at upload time and stored in an owner-controlled row. The prefix check is defense in depth after row ownership, not sufficient authorization alone. R2 keys are opaque identifiers, not local filesystem paths; never apply filesystem `..` normalization as an authorization mechanism. Public buckets/custom domains, temporary signed URLs, overwrite/delete behavior, MIME validation, maximum upload sizes and delivery expiry need separate actual configuration evidence.

## 4. Fixed outbound destination with redirects refused

Vulnerable: fetch a query-string URL with cookies, bearer credentials or unrestricted redirects.

```ts
const allowedOrigin = 'https://api.example.invalid'; // replace with reviewed fixed service origin
function fixedTarget(rawPath: string): URL {
  if (!/^\/[a-z0-9/-]{1,120}$/.test(rawPath) || rawPath.startsWith('//')) {
    throw new Error('bad-path');
  }
  const url = new URL(rawPath, allowedOrigin);
  if (url.origin !== allowedOrigin || url.username || url.password) throw new Error('bad-origin');
  return url;
}
async function fixedCatalog(): Promise<unknown> {
  const upstream = await fetch(fixedTarget('/v1/catalog'), {
    redirect: 'manual', signal: AbortSignal.timeout(3_000),
    headers: { Accept: 'application/json' },
  });
  if ((upstream.status >= 300 && upstream.status <= 399) || !upstream.ok) {
    await upstream.body?.cancel();
    throw new Error('upstream-refused');
  }
  // Reuse the actual bounded stream parser from pair 1. No request cookies or
  // Authorization headers are forwarded; return selected public DTO fields.
  return readJson(upstream, 65_536);
}
```

Cloudflare Workers currently requires `manual` redirect handling; `redirect: error` is not supported by its Request implementation. Reject the returned 3xx status and cancel its body. This example uses a fixed server-selected origin, not a general URL proxy. It performs no request here. It does not implement user-selected DNS resolution, rebinding or private-network controls. If those are needed but unproven, report the gap rather than treating a hostname allowlist as sufficient.

## 5. Cookie mutation origin and local redirect

```ts
function sameOriginMutation(request: Request, canonicalOrigin: string): boolean {
  const origin = request.headers.get('Origin');
  return origin !== null && origin === new URL(canonicalOrigin).origin;
}
function localRedirect(raw: string, canonicalOrigin: string): string {
  if (!raw.startsWith('/') || raw.startsWith('//') || raw.includes('\\')) return '/';
  const url = new URL(raw, canonicalOrigin);
  if (url.origin !== new URL(canonicalOrigin).origin || url.username || url.password) return '/';
  return url.pathname + url.search + url.hash;
}
```

Use a configured canonical origin; never derive the trust anchor from attacker-controlled forwarded headers. Cookie-authenticated changes still need the actual chosen CSRF design, secure cookie flags, current session/permission checks and cache isolation. Missing Origin policy and trusted non-browser flows need explicit treatment. Bearer-only routes that never accept ambient cookie authentication have a different CSRF threat model.

## 6. Commands, files and prototype pollution

Workers business logic must not acquire a host shell or local upload directory from these examples. Conditional existing Node code still needs fixed executables, separately validated arguments, no shell, timeout/output limits, a stable canonical path boundary and no symlink/race escape. `execFile` alone does not prevent option injection. A string prefix alone does not confine a mutable filesystem. Default to R2 keys for Starter bytes and fixed query structures for data.

Avoid generic deep merges of request JSON. A small explicit DTO prevents `__proto__`, `constructor`, `prototype`, role and owner properties from reaching models. If an existing library performs recursive merge, inspect its actual version, own-property handling, null/array behavior, depth/size limits and dangerous-key rejection at every level. A toy merge replacement is not a production-ready library.

Primary references: [Workers Request](https://developers.cloudflare.com/workers/runtime-apis/request/), [Supabase SSR advanced guide](https://supabase.com/docs/guides/auth/server-side/advanced-guide), [OWASP SSRF prevention](https://cheatsheetseries.owasp.org/cheatsheets/Server_Side_Request_Forgery_Prevention_Cheat_Sheet.html). These references inform review; SDK compilation, RLS behavior, R2 access and provider/runtime tests remain unrun.
