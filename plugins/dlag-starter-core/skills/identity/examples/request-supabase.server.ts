// Adapt only to the installed @supabase/ssr version. Not a complete app.
// Hosted *.supabase.co HTTPS origins and modern sb_publishable_ keys only.
// Custom domains, legacy anon JWTs and loopback need a separately accepted adapter.
import { createServerClient, parseCookieHeader, serializeCookieHeader } from '@supabase/ssr';
import { finalizePrivateResponse } from './boundary-helpers.mjs';
import { publicSupabaseConfig } from './auth-route-guards.mjs';

type Bindings = { SUPABASE_URL: string; SUPABASE_PUBLISHABLE_KEY: string };

export function requestSupabase(request: Request, env: Bindings) {
  const publicConfig = publicSupabaseConfig(env);
  const cookieView = new Map(parseCookieHeader(request.headers.get('Cookie') ?? '')
    .filter((item) => typeof item.value === 'string')
    .map((item) => [item.name, item.value as string]));
  const pendingCookies: string[] = [];
  const pendingCacheHeaders: Record<string, string> = {};
  const supabase = createServerClient(publicConfig.url, publicConfig.publishableKey, {
    cookieOptions: { secure: true, sameSite: 'lax', path: '/' },
    cookies: {
      getAll: () => [...cookieView].map(([name, value]) => ({ name, value })),
      setAll: (cookies, headers = {}) => {
        for (const { name, value, options } of cookies) {
          cookieView.set(name, value);
          pendingCookies.push(serializeCookieHeader(name, value, options));
        }
        Object.assign(pendingCacheHeaders, headers);
      },
    },
  });
  const finish = (response: Response) =>
    finalizePrivateResponse(response, pendingCookies, pendingCacheHeaders);
  return { supabase, finish };
}

// A route handler must finalize every returned or thrown Response.
// Integrate the same finalization at the actual React Router response boundary
// so headers survive nested routes, redirects and streaming.
export async function privateIdentityResponse(request: Request, env: Bindings) {
  let state: ReturnType<typeof requestSupabase> | undefined;
  try {
    state = requestSupabase(request, env);
    const { data, error } = await state.supabase.auth.getClaims();
    if (error || !data?.claims?.sub) {
      // Cookie-only teaching endpoint: no HTTP authentication challenge is implemented.
      // A mounted browser route may instead redirect to its accepted sign-in page.
      return state.finish(new Response('Access denied', { status: 403 }));
    }
    // Identity validation is separate from resource authorization and RLS.
    return state.finish(Response.json({ signedIn: true }));
  } catch (error) {
    const response = error instanceof Response
      ? error : new Response('Request unavailable', { status: 503 });
    return state ? state.finish(response) : finalizePrivateResponse(response);
  }
}
