# React Router document with a persistent theme choice

This complete example uses the existing React Router framework SSR APIs and a small allowlisted preference cookie. Adapt root exports, route configuration, stylesheet path and error boundary to the actual project. Do not replace its root file wholesale. There is no theming package prerequisite. The CSS in [the token template](../templates/tokens.css.md) supplies light, dark and system appearance before hydration.

```tsx
// app/root.tsx: merge these pieces into the existing root route.
import { Links, Meta, Outlet, Scripts, ScrollRestoration, useFetcher, data } from 'react-router';
import type { Route } from './+types/root';
import './app.css';

type Theme = 'light' | 'dark' | 'system';
function normalizeTheme(value: unknown): Theme {
  return value === 'light' || value === 'dark' ? value : 'system';
}
function readTheme(cookie: string | null): Theme {
  for (const pair of (cookie ?? '').split(';')) {
    const [name, ...rest] = pair.trim().split('=');
    if (name === 'studio-theme') {
      try { return normalizeTheme(decodeURIComponent(rest.join('='))); }
      catch { return 'system'; }
    }
  }
  return 'system';
}
// Small URL-encoded body only; count bytes before allocating decoded form data.
async function readPreference(request: Request): Promise<
  { theme: Theme } | { error: string; status: number }
> {
  const type = request.headers.get('Content-Type') ?? '';
  if (!/^application\/x-www-form-urlencoded(?:\s*;\s*charset=utf-8)?\s*$/i.test(type)) {
    return { error: 'Unsupported preference format.', status: 415 };
  }
  const declared = request.headers.get('Content-Length');
  if (declared && (!/^\d+$/.test(declared) || Number(declared) > 1024)) {
    return { error: 'Preference request is too large.', status: 413 };
  }
  if (!request.body) return { error: 'Preference is missing.', status: 400 };
  const reader = request.body.getReader();
  const chunks: Uint8Array[] = [];
  let length = 0;
  let reads = 0;
  const deadline = Date.now() + 5000;
  let timer: ReturnType<typeof setTimeout> | undefined;
  let expired = false;
  const timeout = new Promise<never>((_, reject) => {
    timer = setTimeout(() => { expired = true; reject(new Error('preference timeout')); }, 5000);
  });
  try {
    while (true) {
      if (Date.now() >= deadline) { expired = true; throw new Error('preference timeout'); }
      if (++reads > 1024) throw new Error('too many body chunks');
      const part = await Promise.race([reader.read(), timeout]);
      if (part.done) break;
      length += part.value.byteLength;
      if (length > 1024) {
        void reader.cancel().catch(() => {});
        return { error: 'Preference request is too large.', status: 413 };
      }
      if (part.value.byteLength) chunks.push(part.value);
    }
    const bytes = new Uint8Array(length);
    let offset = 0;
    for (const chunk of chunks) { bytes.set(chunk, offset); offset += chunk.byteLength; }
    const body = new TextDecoder('utf-8', { fatal: true }).decode(bytes);
    const form = new URLSearchParams(body);
    if ([...form.keys()].some(key => key !== 'intent' && key !== 'theme') ||
        form.getAll('intent').length !== 1 || form.get('intent') !== 'theme' ||
        form.getAll('theme').length !== 1) {
      return { error: 'Invalid preference fields.', status: 400 };
    }
    const theme = form.get('theme');
    if (theme !== 'light' && theme !== 'dark' && theme !== 'system') {
      return { error: 'Choose Light, Dark or System.', status: 400 };
    }
    return { theme };
  } catch {
    void reader.cancel().catch(() => {});
    return { error: expired ? 'Preference request timed out.' : 'Invalid preference request.', status: expired ? 408 : 400 };
  } finally {
    if (timer !== undefined) clearTimeout(timer);
    reader.releaseLock();
  }
}
export function loader({ request }: Route.LoaderArgs) {
  return { theme: readTheme(request.headers.get('Cookie')) };
}
export async function action({ request }: Route.ActionArgs) {
  // Keep the application's existing CSRF policy as well.
  if (request.method !== 'POST') {
    return data({ error: 'Method not allowed.' }, { status: 405, headers: { Allow: 'POST' } });
  }
  if (request.headers.get('Origin') !== new URL(request.url).origin) {
    return data({ error: 'Invalid request origin.' }, { status: 403 });
  }
  const parsed = await readPreference(request);
  if ('error' in parsed) return data({ error: parsed.error }, { status: parsed.status });
  const value = parsed.theme;
  const secure = new URL(request.url).protocol === 'https:' ? '; Secure' : '';
  return data({ saved: true, theme: value }, {
    headers: {
      'Set-Cookie': `studio-theme=${value}; Path=/; Max-Age=31536000; SameSite=Lax; HttpOnly${secure}`,
      'Cache-Control': 'private, no-store',
    },
  });
}
function responseCookies(source: Headers): string[] {
  if (!source.has('Set-Cookie')) return [];
  const server = source as Headers & {
    getSetCookie?: () => string[];
    getAll?: (name: string) => string[];
  };
  if (typeof server.getSetCookie === 'function') return server.getSetCookie();
  if (typeof server.getAll === 'function') return server.getAll('Set-Cookie');
  throw new Error('Server Headers API must expose distinct Set-Cookie values.');
}
export function headers({ parentHeaders, loaderHeaders, actionHeaders, errorHeaders }: Route.HeadersArgs) {
  const result = new Headers(parentHeaders);
  for (const source of [loaderHeaders, actionHeaders, errorHeaders]) {
    if (!source) continue;
    for (const [name, value] of source) {
      // A document response must not inherit a data response's entity headers.
      if (name !== 'set-cookie' && name !== 'content-type' && name !== 'content-length') result.set(name, value);
    }
    for (const cookie of responseCookies(source)) result.append('Set-Cookie', cookie);
  }
  result.set('Cache-Control', 'private, no-store');
  return result;
}
function ThemePreference({ theme, actionResult }: {
  theme: Theme;
  actionResult?: Route.ComponentProps['actionData'];
}) {
  const fetcher = useFetcher<typeof action>();
  const pending = fetcher.state !== 'idle';
  const result = fetcher.data ?? actionResult;
  return (
    <fetcher.Form method="post" action="/">
      <input type="hidden" name="intent" value="theme" />
      <label htmlFor="theme-choice">Appearance</label>
      <select key={theme} id="theme-choice" name="theme" defaultValue={theme}>
        <option value="light">Light</option>
        <option value="dark">Dark</option>
        <option value="system">System</option>
      </select>
      <button type="submit" disabled={pending}>{pending ? 'Saving...' : 'Save appearance'}</button>
      <p role="status">{!pending && result && 'saved' in result ? 'Appearance saved.' : ''}</p>
      {result && 'error' in result ? <p role="alert">{result.error}</p> : null}
    </fetcher.Form>
  );
}
export default function App({ loaderData, actionData }: Route.ComponentProps) {
  // A non-JavaScript POST can render before its new cookie is on a request.
  const theme = actionData && 'theme' in actionData ? actionData.theme : loaderData.theme;
  return (
    <html lang="en" data-theme={theme}>
      <head>
        <meta charSet="utf-8" />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <meta name="color-scheme" content="light dark" />
        <Meta /><Links />
      </head>
      <body className="bg-background text-foreground">
        <ThemePreference theme={theme} actionResult={actionData} />
        <Outlet />
        <ScrollRestoration /><Scripts />
      </body>
    </html>
  );
}
```

The root action must be the action reached by `action="/"` in the actual route tree. Use the actual root basename when mounted under a prefix. The example includes `intent=theme`. Preserve existing root actions and their parsing limits: route that intent through the existing action dispatcher rather than replacing unrelated actions or consuming a request stream twice. Successful fetcher actions revalidate loader data under the framework's normal rules; do not suppress that revalidation without an equivalent update. If root exports a `Layout`, integrate the document there with its existing loader/error-boundary handling.

This cookie is HttpOnly because only the server writes it. A browser-written preference cookie would necessarily have a different policy; do not mix those methods. A first-time system user receives the same `data-theme="system"` markup in both environments and CSS chooses the OS scheme. No browser preference read occurs during render. Preserve the existing CSP nonce propagation to framework script components if configured.

Observe save failure, hard reload, each explicit choice under both OS schemes, system changes while open, route navigation and an expired cookie. Check the actual framework version's generated route types and compile the integrated source. These examples have not been run in a real application.

The preference body is capped at 1 KiB before text/form allocation and has a five-second read deadline. The endpoint rejects multipart/files, unsupported media types, unknown or repeated fields and invalid UTF-8. Application-level request, cache and CSRF controls still apply.

The headers export preserves distinct Set-Cookie values from loader, action and error headers, including other application cookies; it never splits cookies on commas. It accepts the standard server `Headers.getSetCookie()` API or Workers' documented `getAll('Set-Cookie')` accessor. It fails explicitly if neither can preserve separate cookies. Preserve the application's existing header-combining helper if it already supplies this behavior. Nested route headers must retain this private cache policy and required parent headers rather than overriding them with public caching.

Without JavaScript, the POST's loader may still read the old request cookie. The action therefore returns the validated theme, and the document/control prefer that action result for that response. The same action data is serialized for initial hydration. Subsequent requests read the newly stored cookie. Failed actions use the loader preference and display the action error. A blocked cookie still cannot guarantee persistence across a later reload.
