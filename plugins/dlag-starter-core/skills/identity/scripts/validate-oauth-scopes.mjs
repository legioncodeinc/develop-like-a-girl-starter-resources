// Bounded literal matching over explicitly supplied sanitized source texts.
// No filesystem traversal, config loading, execution, network access or CLI.
const shortScopes = new Set(['openid', 'email', 'profile']);
const validScope = (s) => typeof s === 'string' && (shortScopes.has(s) ||
  /^https:\/\/www\.googleapis\.com\/auth\/[A-Za-z0-9._/-]{1,200}$/.test(s) || s === 'https://mail.google.com/');
const fail = () => { throw new Error('Invalid scope-review input'); };

export function reviewOAuthScopes(sourceTexts, declaredScopes) {
  if (!Array.isArray(sourceTexts) || sourceTexts.length < 1 || sourceTexts.length > 64 ||
      !Array.isArray(declaredScopes) || declaredScopes.length > 128 ||
      declaredScopes.some((s) => !validScope(s))) fail();
  let total = 0;
  const used = new Set();
  for (const text of sourceTexts) {
    if (typeof text !== 'string' || text.length > 65536) fail();
    total += text.length;
    if (total > 1048576) fail();
    for (const m of text.matchAll(/https:\/\/www\.googleapis\.com\/auth\/[A-Za-z0-9._/-]+|https:\/\/mail\.google\.com\//g)) {
      if (!validScope(m[0])) fail();
      used.add(m[0]);
    }
    // Candidate quoted literals, including the ordinary space-delimited scope string.
    // No AST/runtime claim: comments and unrelated literals can produce candidates.
    for (const m of text.matchAll(/(['"`])([A-Za-z0-9 ._:/-]{1,2048})\1/g)) {
      for (const word of m[2].split(/\s+/)) if (shortScopes.has(word)) used.add(word);
    }
    if (used.size > 128) fail();
  }
  const declared = new Set(declaredScopes);
  const declaredUnused = [...declared].filter((s) => !used.has(s)).sort();
  const usedUndeclared = [...used].filter((s) => !declared.has(s)).sort();
  return { suppliedTexts: sourceTexts.length, literalCandidates: [...used].sort(),
    declaredUnused, usedUndeclared, matches: !declaredUnused.length && !usedUndeclared.length };
}
