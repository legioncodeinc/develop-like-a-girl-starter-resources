// Build Studio cookie-policy input. Pure functions; no I/O or provider calls.
// This does not serialize or rename Supabase's own chunked auth cookies.
export function chooseSessionCookieConfig({
  topology = 'browser-ssr', environment = 'production', mode = 'same-site',
  ttlSeconds = 86400,
} = {}) {
  if (!['browser-ssr', 'server-only'].includes(topology) ||
      !['production', 'staging', 'loopback-development'].includes(environment) ||
      !['same-site', 'strict', 'cross-site'].includes(mode) ||
      !Number.isSafeInteger(ttlSeconds) || ttlSeconds < 1 || ttlSeconds > 31536000) {
    throw new Error('Invalid cookie policy');
  }
  const secure = environment !== 'loopback-development';
  if (mode === 'cross-site' && !secure) throw new Error('Cross-site cookies require HTTPS');
  return Object.freeze({
    ...(topology === 'server-only' ? { name: secure ? '__Host-session' : 'session' } : {}),
    httpOnly: topology === 'server-only', secure,
    sameSite: mode === 'strict' ? 'strict' : mode === 'cross-site' ? 'none' : 'lax',
    path: '/', maxAge: ttlSeconds,
  });
}

// Only for a separately accepted server-only opaque session implementation.
// Use the installed Supabase SSR serializer for SDK-owned cookies instead.
export function serializeOpaqueSessionCookie(value, config) {
  if (typeof value !== 'string' || value.length > 4096 || /[\x00-\x1f\x7f]/.test(value) ||
      !config || !['__Host-session', 'session'].includes(config.name) ||
      config.httpOnly !== true || typeof config.secure !== 'boolean' ||
      config.path !== '/' || config.domain !== undefined ||
      !['lax', 'strict', 'none'].includes(config.sameSite) ||
      !Number.isSafeInteger(config.maxAge) || config.maxAge < 0 || config.maxAge > 31536000 ||
      (config.name.startsWith('__Host-') && !config.secure) ||
      (config.sameSite === 'none' && !config.secure)) {
    throw new Error('Invalid opaque cookie');
  }
  return [`${config.name}=${encodeURIComponent(value)}`, 'Path=/',
    `Max-Age=${config.maxAge}`, 'HttpOnly', ...(config.secure ? ['Secure'] : []),
    `SameSite=${config.sameSite[0].toUpperCase()}${config.sameSite.slice(1)}`].join('; ');
}
