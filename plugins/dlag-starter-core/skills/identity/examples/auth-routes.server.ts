// Protocol handlers for the installed Supabase SSR SDK. These are not mounted routes.
// Wire them into the project's actual React Router resource route / action boundary.
import { requestSupabase } from './request-supabase.server';
import { finalizePrivateResponse } from './boundary-helpers.mjs';
import { checkedAppOrigin, requireSameOriginMutation, allowedReturnPath, callbackCode } from './auth-route-guards.mjs';

type AuthBindings = { SUPABASE_URL: string; SUPABASE_PUBLISHABLE_KEY: string; APP_ORIGIN: string };
type State = ReturnType<typeof requestSupabase>;

async function authResponse(request: Request, env: AuthBindings,
  run: (state: State, appOrigin: string) => Promise<Response>) {
  let state: State | undefined;
  try {
    const appOrigin = checkedAppOrigin(env.APP_ORIGIN);
    state = requestSupabase(request, env);
    const response = await run(state, appOrigin);
    const final = state.finish(response);
    final.headers.set('Referrer-Policy', 'no-referrer');
    return final;
  } catch (error) {
    const response = error instanceof Response ? error : new Response('Authentication unavailable', { status: 503 });
    const final = state ? state.finish(response) : finalizePrivateResponse(response);
    final.headers.set('Referrer-Policy', 'no-referrer');
    return final;
  }
}

export function googleSignInAction(request: Request, env: AuthBindings) {
  return authResponse(request, env, async (state, appOrigin) => {
    requireSameOriginMutation(request, appOrigin);
    const next = allowedReturnPath(new URL(request.url).searchParams.get('next'));
    const callback = new URL('/auth/callback', appOrigin);
    callback.searchParams.set('next', next);
    const { data, error } = await state.supabase.auth.signInWithOAuth({
      provider: 'google', options: { redirectTo: callback.href, skipBrowserRedirect: true },
    });
    if (error || !data.url) return new Response('Sign-in could not start', { status: 400 });
    // SDK output is checked against the configured auth service before redirecting.
    const destination = new URL(data.url);
    if (destination.origin !== new URL(env.SUPABASE_URL).origin ||
        destination.pathname !== '/auth/v1/authorize' || destination.username || destination.password) {
      return new Response('Sign-in could not start', { status: 502 });
    }
    return new Response(null, { status: 303, headers: { Location: destination.href } });
  });
}

export function oauthCallbackLoader(request: Request, env: AuthBindings) {
  return authResponse(request, env, async (state, appOrigin) => {
    if (request.method !== 'GET') return new Response('Method not allowed', { status: 405, headers: { Allow: 'GET' } });
    const url = new URL(request.url);
    if (url.origin !== appOrigin) return new Response('Sign-in failed', { status: 400 });
    const code = callbackCode(url);
    if (!code) return new Response('Sign-in failed', { status: 400 });
    const { data, error } = await state.supabase.auth.exchangeCodeForSession(code);
    if (error || !data.session || !data.user) return new Response('Sign-in failed', { status: 400 });
    const location = new URL(allowedReturnPath(url.searchParams.get('next')), appOrigin).href;
    // Tokens stay inside SDK state/cookies; none are returned as loader data.
    return new Response(null, { status: 303, headers: { Location: location } });
  });
}

export function signOutAction(request: Request, env: AuthBindings) {
  return authResponse(request, env, async (state, appOrigin) => {
    requireSameOriginMutation(request, appOrigin);
    // This example intentionally signs out this session. Choose another scope explicitly.
    const { error } = await state.supabase.auth.signOut({ scope: 'local' });
    if (error) return new Response('Sign-out could not be completed', { status: 503 });
    return new Response(null, { status: 303, headers: { Location: new URL('/sign-in', appOrigin).href } });
  });
}
