# SSR and hydration

The first client render must match the server's markup. A guard that prevents a server exception can still produce different text or attributes on the client. This is unsafe:

```tsx
// Different initial markup on server and browser.
const dark = typeof window !== 'undefined' && window.matchMedia('(prefers-color-scheme: dark)').matches;
return <button>{dark ? 'Use light' : 'Use dark'}</button>;
```

Use validated loader data for a stored explicit preference. Use CSS for appearance. For genuinely browser-dependent content, render an equal-size neutral placeholder until an effect supplies the value, or use a label that does not depend on the resolved theme. A disabled placeholder control must not look like an available action.

A root pre-paint script may intentionally mutate only the root theme attribute before hydration. When preserving such an existing strategy, a narrowly applied `suppressHydrationWarning` may be appropriate for that known attribute difference. It is an escape hatch, not a blanket requirement or a repair for different descendants. The cookie example requires no suppression.

`useEffect` callbacks run in the browser. Browser reads there do not need a redundant `typeof window` test solely for SSR, but storage may still throw. Module-scope reads and render-time reads remain unsafe. A client-side layout effect can synchronize a mounted component before a later paint; it cannot run before server HTML's first paint. Do not treat an isomorphic layout-effect alias as a substitute for server brand resolution or early CSS.

For large themed content, preserve useful server HTML. Hiding the whole application until mounted increases delay and does not establish a correct theme. Test root loader error boundaries and fallback documents too: they need safe default tokens and a consistent document shape.

[Cookie edge cases](../examples/cookie-edge-cases.md) covers missing and malformed values, system preference, expiry, caching, blocked persistence and concurrent tabs. Check hydration-console output in the real app after applying the example. Static inspection is not successful hydration evidence.
