// Bounded, supplied-input review. No fetch, file access, CLI or credential collection.
// Replace every cookie value with REDACTED before invoking this helper.
const namePattern = /^[!#$%&'*+.^_`|~0-9A-Za-z-]{1,128}$/;
const failure = () => { throw new Error('Invalid cookie-review input'); };

export function reviewCookieHeaders(lines, {
  expectName, topology = 'server-only', environment = 'production',
} = {}) {
  if (!Array.isArray(lines) || lines.length > 64 ||
      typeof expectName !== 'string' || !namePattern.test(expectName) ||
      !['server-only', 'browser-ssr'].includes(topology) ||
      !['production', 'loopback-development'].includes(environment)) failure();
  let total = 0;
  const cookies = lines.map((line) => {
    if (typeof line !== 'string' || line.length > 8192 || /[\x00-\x1f\x7f]/.test(line)) failure();
    total += line.length;
    if (total > 262144) failure();
    const parts = line.split(';').map((p) => p.trim());
    if (parts.length > 32) failure();
    const index = parts[0].indexOf('=');
    if (index < 1) failure();
    const name = parts[0].slice(0, index), value = parts[0].slice(index + 1);
    if (!namePattern.test(name) || !['REDACTED', ''].includes(value)) failure();
    const attrs = new Map();
    let duplicate = false;
    for (const part of parts.slice(1)) {
      if (!part) continue;
      const eq = part.indexOf('=');
      const key = (eq < 0 ? part : part.slice(0, eq)).trim().toLowerCase();
      if (!/^[a-z-]{1,40}$/.test(key)) failure();
      if (attrs.has(key)) duplicate = true;
      attrs.set(key, eq < 0 ? true : part.slice(eq + 1).trim());
    }
    return { name, attrs, duplicate };
  });
  const findings = [];
  const add = (cookieIndex, code, severity) => findings.push({ cookieIndex, code, severity });
  const selected = cookies.map((cookie, index) => ({ cookie, index }))
    .filter(({ cookie }) => cookie.name === expectName);
  if (selected.length === 0) add(null, 'EXPECTED_COOKIE_MISSING', 'must-fix');
  for (const { cookie: c, index } of selected) {
    const a = c.attrs;
    if (c.duplicate) add(index, 'DUPLICATE_ATTRIBUTE', 'must-fix');
    if (topology === 'server-only' && a.get('httponly') !== true) add(index, 'HTTPONLY_REQUIRED', 'must-fix');
    if (topology === 'browser-ssr' && a.get('httponly') === true) add(index, 'BROWSER_SSR_REQUIRES_READABLE_COOKIE', 'must-fix');
    if (a.has('httponly') && a.get('httponly') !== true) add(index, 'INVALID_HTTPONLY', 'must-fix');
    if (a.has('secure') && a.get('secure') !== true) add(index, 'INVALID_SECURE', 'must-fix');
    if (environment === 'production' && a.get('secure') !== true) add(index, 'SECURE_REQUIRED', 'must-fix');
    const sameSite = typeof a.get('samesite') === 'string' ? a.get('samesite').toLowerCase() : '';
    if (!['lax', 'strict', 'none'].includes(sameSite)) add(index, 'SAMESITE_INVALID_OR_MISSING', 'must-fix');
    if (sameSite === 'none') {
      if (a.get('secure') !== true) add(index, 'NONE_REQUIRES_SECURE', 'must-fix');
      add(index, 'CROSS_SITE_CSRF_REVIEW_REQUIRED', 'should-refactor');
    }
    if (a.get('path') !== '/') add(index, 'EXPLICIT_ROOT_PATH_REQUIRED', 'should-refactor');
    if (c.name.startsWith('__Host-')) {
      if (a.has('domain')) add(index, 'HOST_PREFIX_FORBIDS_DOMAIN', 'must-fix');
      if (a.get('path') !== '/') add(index, 'HOST_PREFIX_REQUIRES_ROOT_PATH', 'must-fix');
      if (a.get('secure') !== true) add(index, 'HOST_PREFIX_REQUIRES_SECURE', 'must-fix');
    }
    if (c.name.startsWith('__Secure-') && a.get('secure') !== true) add(index, 'SECURE_PREFIX_REQUIRES_SECURE', 'must-fix');
    if (!a.has('max-age') && !a.has('expires')) add(index, 'EXPIRY_POLICY_UNSPECIFIED', 'should-refactor');
    if (a.has('max-age') && (typeof a.get('max-age') !== 'string' ||
        !/^-?\d{1,10}$/.test(a.get('max-age')))) add(index, 'MAX_AGE_INVALID', 'must-fix');
    if (a.has('expires') && (typeof a.get('expires') !== 'string' ||
        !Number.isFinite(Date.parse(a.get('expires'))))) add(index, 'EXPIRES_INVALID', 'must-fix');
  }
  return { inspected: selected.length, headerCount: lines.length,
    passed: !findings.some((f) => f.severity === 'must-fix'), findings };
}
