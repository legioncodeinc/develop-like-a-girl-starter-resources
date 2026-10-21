# Discover critical fonts early

A preload lets the browser discover a particular file before CSS would normally request it. It is a hint, not a guarantee of a fixed scheduler priority or improved LCP. Start with the one or two font files used by important above-the-fold text. Treat more than three as a reason to inspect contention, not a browser limit.

```html
<link rel="preload" href="/fonts/product-body-latin.woff2"
      as="font" type="font/woff2" crossorigin="anonymous">
```

In JSX the corresponding attribute is `crossOrigin="anonymous"`. Match the exact URL used by the font-face, including the version/hash and origin. Fonts use CORS fetching: an anonymous font preload matches that mode even for a same-origin URL. Mismatched URLs, credentials modes or types can waste the hint or cause another fetch. A cross-origin font also needs appropriate response CORS headers; the link does not set them.

## When the hint earns its cost

Preload a critical face discovered late through CSS when a trace shows that discovery contributes delay. Reuse already emitted framework hints. Avoid every weight, italic, below-fold face and every language subset: a preload can fetch a subset even when this page has none of its characters. Compare the total competing font and LCP-image requests under constrained conditions. Subset excessive bytes before simply raising discovery priority.

| Hint | Intended use |
|---|---|
| `preload` with `as="font"` | A specific critical font for the current document |
| `prefetch` | A speculative later navigation resource, only if the existing app uses it and measurements justify it |
| `modulepreload` | JavaScript modules, not font files |
| `preconnect` | An already approved remote origin; does not fetch the font itself |

Use WOFF2 for the supported modern-browser baseline. MIME and file signatures must agree. Preserve any documented compatibility requirement that needs another format. Do not add a Google Fonts stylesheet or preconnect as the Starter default: supplied files and the approved delivery origin avoid an extra browser disclosure. If an existing remote stylesheet remains in scope, document the origin, privacy decision, stylesheet discovery chain and actual font requests.

## React Router placement

Use the project's root route `links` export or its existing document-head convention. When a `links` export is used, the root document must already render the framework's `Links` component. Do not replace the existing root or add a second one.

```tsx
// Append an item to the existing links export using its existing typing.
{ rel: 'preload', href: '/fonts/product-body-latin.woff2',
  as: 'font', type: 'font/woff2', crossOrigin: 'anonymous' }
```

Use [the complete configuration template](../templates/react-font-config.md) after checking installed APIs. Root placement affects every route; route-specific faces should not be needlessly loaded site-wide.

## Verify discovery and duplicates

In a real browser trace with cache disabled, filter font requests and inspect final URLs, initiators, response type, request mode and transferred bytes. Compare the hint and CSS source; a repeated filename alone can represent distinct versions or origins. Re-test with warm cache and the font blocked. Record whether the text is visible, whether a fallback persists and whether the LCP resource waited behind unnecessary fonts. Report unknown headers or unrun traces as such.

Reference: [MDN preload](https://developer.mozilla.org/en-US/docs/Web/HTML/Reference/Attributes/rel/preload).
