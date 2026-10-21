# Cookie and preference edge cases

Use the [complete document example](react-router-theme.md) as the base. Theme preference is untrusted presentation data. Only exact allowed values reach the document; never reuse it as an account or tenant authority.

| Input or condition | Expected behavior |
|---|---|
| No cookie | Server and first client use `system`; CSS follows OS |
| `studio-theme=dark` under light OS | Explicit dark wins |
| `studio-theme=light` under dark OS | Explicit light wins |
| `studio-theme=system` and OS changes | CSS responds without rewriting stored choice |
| Unknown, encoded markup, malformed percent escape | Normalize to system; never inject raw value |
| POST contains duplicate/unexpected values | Existing boundary validation must choose/reject deliberately; accept only one intended preference field |
| Cross-origin POST or unsupported method | Reject before setting the cookie |
| Cookies blocked | Saving may appear successful but reload may revert; verify persistence and explain limitation |
| Cookie expires | Return to system |
| Old localStorage preference exists | Do not silently merge two authorities; document a separately scoped migration if needed |
| Two tabs | A new request sees the current cookie; an already open tab retains its loader snapshot until revalidation |
| Offline or failed save | Keep current appearance and show persistent error, not a false success |

The simple server-authoritative example does not promise instant cross-tab changes. If the product requires that, use its existing revalidation/event mechanism after a confirmed save; avoid sending theme data to a provider. A cookie does not reveal the OS scheme to the server. CSS handles system appearance; browser-dependent content still needs a stable initial render.

For deployment verify Secure on HTTPS, intended Path, expiry and SameSite. HttpOnly is appropriate when the server owns writes; a client-writing pattern cannot use it. Preference cookies can affect cache personalization even though they are not secrets. Preserve application CSRF and cache policies. Do not assume `Vary: Cookie` protects a custom Workers cache.

When no server personalization exists, a CSS-only system theme is simpler. When explicit persistence already uses a localStorage provider, preserve and repair that implementation rather than adding a second authority. See [flash prevention](../guides/03-flash-prevention.md).
