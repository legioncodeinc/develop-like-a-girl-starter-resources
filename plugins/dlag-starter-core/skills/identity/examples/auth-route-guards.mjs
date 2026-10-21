// Pure guards used by the protocol examples. No provider calls or file access.
const destinations = new Set(['/app', '/account']);
export function checkedAppOrigin(value) {
  if (typeof value !== 'string' || value.length > 2048) throw new Error('Invalid application origin');
  let url;
  try { url = new URL(value); } catch { throw new Error('Invalid application origin'); }
  if (url.protocol !== 'https:' || url.username || url.password || value !== url.origin) {
    throw new Error('Invalid application origin');
  }
  return url.origin;
}
export function requireSameOriginMutation(request, appOrigin) {
  const expected = checkedAppOrigin(appOrigin);
  if (request.method !== 'POST') throw new Response('Method not allowed', { status: 405, headers: { Allow: 'POST' } });
  if (request.headers.get('Origin') !== expected) throw new Response('Request not allowed', { status: 403 });
}
export function allowedReturnPath(value) {
  return typeof value === 'string' && destinations.has(value) ? value : '/app';
}
export function callbackCode(url) {
  const codes = url.searchParams.getAll('code');
  if (url.searchParams.has('error') || codes.length !== 1 || codes[0].length < 1 ||
      codes[0].length > 4096 || /[\x00-\x20\x7f]/.test(codes[0])) return null;
  return codes[0];
}

// This recipe accepts hosted project origins and modern public keys only.
// A matching shape does not prove that the project is the owner's approved project.
export function publicSupabaseConfig(env) {
  const rawUrl = env?.SUPABASE_URL;
  const publishableKey = env?.SUPABASE_PUBLISHABLE_KEY;
  if (typeof publishableKey !== 'string' || publishableKey.length > 4096 ||
      !/^sb_publishable_[A-Za-z0-9_-]+$/.test(publishableKey)) {
    throw new Error('Invalid public Supabase key configuration');
  }
  if (typeof rawUrl !== 'string' || rawUrl.length > 2048) {
    throw new Error('Invalid public Supabase URL configuration');
  }
  let parsed;
  try { parsed = new URL(rawUrl); }
  catch { throw new Error('Invalid public Supabase URL configuration'); }
  if (parsed.protocol !== 'https:' ||
      !/^[a-z0-9](?:[a-z0-9-]*[a-z0-9])?\.supabase\.co$/.test(parsed.hostname) ||
      parsed.username !== '' || parsed.password !== '' || parsed.port !== '' ||
      parsed.pathname !== '/' || parsed.search !== '' || parsed.hash !== '' ||
      (rawUrl !== parsed.origin && rawUrl !== `${parsed.origin}/`)) {
    throw new Error('Invalid public Supabase URL configuration');
  }
  return { url: parsed.origin, publishableKey };
}
