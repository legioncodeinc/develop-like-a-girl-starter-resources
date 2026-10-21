# Preference and provider wiring

Read the installed provider, root route and saved preference before adding state. Keep one persistence authority. Cookies and localStorage holding different values cause a flash and repeated overrides. Do not introduce a theming package merely to obtain light/dark/system behavior.

| Concern | Decision to record |
|---|---|
| Selector | Existing `.dark`, `data-theme`, or CSS-only media strategy |
| Default | Usually `system`, or the existing approved explicit default |
| Stored choice | Exact allowlisted values `light`, `dark`, `system` |
| Persistence | Existing cookie or localStorage key, path and expiry |
| Resolved appearance | Derived from stored choice and OS, never persisted over `system` |
| Forced route appearance | Explicit product requirement; preserve user's stored choice when leaving |
| Transition suppression | Existing scoped mechanism and reduced-motion tokens |
| CSP | Existing nonce/hash policy if a bootstrap script is actually needed |
| Brand | Separate approved brand key, not another theme choice |

The [complete example](../examples/react-router-theme.md) uses a validated preference cookie and server action. It renders the same initial choice on the server and client. CSS follows OS changes immediately for `system`; no `matchMedia` listener is required for styling. The control provides all three choices, retains an explicit save action and exposes pending/error feedback.

If another component needs the resolved appearance for content, use a post-mount media listener and a stable server placeholder:

```tsx
import { useEffect, useState } from 'react';
type Preference = 'light' | 'dark' | 'system';
export function useResolvedTheme(preference: Preference) {
  const [systemDark, setSystemDark] = useState<boolean | null>(null);
  useEffect(() => {
    const query = window.matchMedia('(prefers-color-scheme: dark)');
    const update = () => setSystemDark(query.matches);
    update();
    query.addEventListener('change', update);
    return () => query.removeEventListener('change', update);
  }, []);
  return preference === 'system'
    ? systemDark === null ? null : systemDark ? 'dark' : 'light'
    : preference;
}
```

Render theme-neutral content while `null`; never substitute a different initial button label based on `window`. For styling alone, use CSS instead. If an already installed provider offers `attribute`, `defaultTheme`, `enableSystem`, `storageKey`, `forcedTheme` or `nonce`, map those options to the table using its installed API. Keep its bootstrap and subscription code rather than duplicating it.

For an existing localStorage strategy, stored invalid values fall back to system; storage access must be caught because privacy settings may throw. A `storage` event can synchronize other tabs; it does not fire in the tab doing the write, so that tab updates its own state. Clear or store the supported `system` value consistently. OS changes affect appearance only while the choice is system. Remove listeners on unmount. Preserve existing custom keys to avoid resetting users' preference.
