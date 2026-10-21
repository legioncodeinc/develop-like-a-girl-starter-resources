/**
 * Optional installed react-error-boundary feature wrapper; framework routes use their ErrorBoundary export.
 * This example wraps a subtree that actually suspends, not every loader transition.
 *
 * Usage:
 *
 *   <RouteBoundary name="dashboard">
 *     <DashboardPage />
 *   </RouteBoundary>
 *
 * See `guides/05-error-handling.md` for placement rules (one per route, plus
 * per-feature where a failure should be isolated).
 */

import { ErrorBoundary, type FallbackProps } from 'react-error-boundary';
import { Suspense, type ReactNode } from 'react';
import { useLocation } from 'react-router'; 

export function RouteBoundary({
  name,
  children,
  fallback,
}: {
  name: string;
  children: ReactNode;
  fallback?: ReactNode;
}) {
  const { pathname } = useLocation();

  return (
    <ErrorBoundary
      FallbackComponent={(props) => <DefaultFallback {...props} boundaryName={name} />}
      onError={(error, info) => {
        // Connect the approved redacted reporter explicitly in the application.
        // Do not send raw error/info or form values to an unselected service.
        void error; void info;
      }}
      resetKeys={[pathname]}
    >
      <Suspense fallback={fallback ?? <DefaultSuspenseFallback />}>
        {children}
      </Suspense>
    </ErrorBoundary>
  );
}

function DefaultFallback({ resetErrorBoundary, boundaryName }: FallbackProps & { boundaryName: string }) {
  return (
    <div role="alert" className="route-error">
      <h2>Something went wrong in {boundaryName}</h2>
      <p>Please try again. If the problem continues, contact support.</p>
      <button onClick={resetErrorBoundary}>Try again</button>
    </div>
  );
}

function DefaultSuspenseFallback() {
  // Return a sized skeleton matching the expected content to prevent CLS.
  // See `guides/07-performance.md §web-vitals-targets`.
  return <div aria-busy="true" className="route-skeleton" style={{ minHeight: '60vh' }} />;
}
