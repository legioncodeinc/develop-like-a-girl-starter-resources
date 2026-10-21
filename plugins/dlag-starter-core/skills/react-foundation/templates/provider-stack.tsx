/** Optional installed TanStack Query provider example, not a mandatory SSR scaffold.
 * Requires React and @tanstack/react-query already installed, compatible and approved.
 * Place under the existing framework root; do not add BrowserRouter/createRoot.
 * Loader data remains owned by the router. No auth/session authority lives here.
 * Server rendering gets a fresh instance per tree/request; never seed module-global
 * QueryClients with user data. Identity keys and logout/tenant reset need app tests.
 */
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { createContext, useState, type ReactNode } from 'react';
export const ThemeContext = createContext<'light' | 'dark'>('light');
function makeQueryClient() {
  return new QueryClient({ defaultOptions: {
    queries: { staleTime: 60_000, retry: 2, refetchOnWindowFocus: false },
    mutations: { retry: 0 },
  } });
}
export function AppProvider({ children, initialTheme }: {
  children: ReactNode; initialTheme: 'light' | 'dark';
}) {
  const [queryClient] = useState(makeQueryClient);
  return <QueryClientProvider client={queryClient}>
    <ThemeContext.Provider value={initialTheme}>{children}</ThemeContext.Provider>
  </QueryClientProvider>;
}
// Use in the actual app/root.tsx with its existing Outlet, ErrorBoundary,
// document, Scripts and hydration entry. InitialTheme must agree server/browser.
// Put Suspense only around actual suspending work. App-owned auth context may
// expose a safe current-user DTO, never server credentials or authorization power.
