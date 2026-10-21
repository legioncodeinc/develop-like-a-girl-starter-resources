// Inert example helpers, imported explicitly by an app or fictional local fixture.
// No provider SDKs, account credentials or network requests are used here.
export function authorizeOwnedRecord(principal, record) {
  if (!principal?.id) return { allowed: false, status: 401 };
  if (!record || record.ownerId !== principal.id) {
    return { allowed: false, status: 404 };
  }
  return { allowed: true, status: 200 };
}

export function finalizePrivateResponse(response, cookieHeaders = [], cacheHeaders = {}) {
  const headers = new Headers(response.headers);
  for (const [name, value] of Object.entries(cacheHeaders)) headers.set(name, value);
  for (const value of cookieHeaders) headers.append('Set-Cookie', value);
  headers.set('Cache-Control', 'private, no-store');
  return new Response(response.body, {
    status: response.status, statusText: response.statusText, headers,
  });
}

export function requireVerifiedObject(record, object) {
  // ready means the app's explicit completion and content checks already passed.
  if (record?.state !== 'ready' || !object ||
      object.size !== record.expectedSize ||
      object.httpMetadata?.contentType !== record.expectedType) {
    throw new Error('Object unavailable');
  }
  return object;
}

export function stableDeliveryKey(eventId, purpose) {
  const valid = /^[a-zA-Z0-9-]{1,80}$/;
  if (!valid.test(eventId) || !valid.test(purpose)) {
    throw new Error('Invalid persisted delivery identity');
  }
  return `transactional/${eventId}/${purpose}`;
}

export function requireStringBindings(env, names) {
  for (const name of names) {
    if (typeof env?.[name] !== 'string' || env[name].trim() === '') {
      throw new Error(`Missing ${name}`);
    }
  }
}
