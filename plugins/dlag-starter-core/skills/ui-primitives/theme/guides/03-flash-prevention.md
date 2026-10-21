# Diagnose a wrong-theme flash

Find which source wins at four moments: server HTML, parsed stylesheet, any bootstrap script, and hydrated React state. Compare the actual delivered HTML with storage, not just the hydrated DOM. Check missing/invalid preference, OS dark/light, hard refresh, slow CPU, route changes and blocked storage.

Prefer the existing correct mechanism. A cookie-rendered explicit choice plus a CSS system media query can paint correctly without JavaScript. For an existing localStorage class strategy, the early bootstrap must run before themed content paints, use exactly the provider's storage key and selectors, and handle denied storage. An effect after hydration cannot repair the first paint.

Illustrative fixed bootstrap for a project that already uses `.dark` and `theme` localStorage:

```js
(function () {
  var preference = 'system';
  try {
    var saved = localStorage.getItem('theme');
    if (saved === 'light' || saved === 'dark' || saved === 'system') preference = saved;
  } catch (_) {}
  var dark = preference === 'dark' ||
    (preference === 'system' && matchMedia('(prefers-color-scheme: dark)').matches);
  document.documentElement.classList.toggle('dark', dark);
  document.documentElement.style.colorScheme = dark ? 'dark' : 'light';
})();
```

Do not inject user values into script source. This example is not needed by the cookie example. A package with its own bootstrap must not receive a second copy. A deferred or module script does not establish early execution. Inspect actual streaming placement instead of assuming a provider appears in the head.

Strict CSP must permit the exact script using the application's existing nonce or hash arrangement. A nonce must match the response policy and the delivered script; never trust an inbound public header as an authorized nonce. Nonce-bearing HTML caching must preserve that relationship and the application's security policy. A header named `x-nonce` alone does not authorize execution. Do not weaken CSP or introduce `unsafe-inline` to hide a failure.

Personalized HTML must not be served to another visitor through an unkeyed public cache. Confirm Workers and any CDN cache behavior with the existing HTTP policy; browser `Vary` alone does not prove an edge cache keys by preference. A separately cached bootstrap still needs correct execution order and CSP.

When browser evidence is available, record a throttled reload and inspect first paint, class changes and style recalculation. Check token transitions, late CSS, duplicate providers and extensions if a flash remains. Report a source fix separately from an observed flash-free result.
