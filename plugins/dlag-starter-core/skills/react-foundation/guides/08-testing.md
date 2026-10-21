# 08: Testing

Use installed project versions. Code fences are focused examples with project imports identified, not complete applications or executed receipts. Additional packages, tools, provider setup and configuration require the applicable user authorization. Starter uses React Router framework SSR, Cloudflare Workers and Supabase; optional library comparisons do not select a service.


## The stack

**Vitest + React Testing Library + MSW + Playwright** describe the preferred testing layers when available. Inspect existing packages/scripts first; no dependency install or replacement is implied. Preserve a valid existing setup.

## The pyramid (bulletproof-react version)

| Layer | Tool | Effort | Scope |
|---|---|---|---|
| Unit | Vitest | ~15% | Pure fns, reducers, utils, shared hooks |
| **Integration** | Vitest + RTL + MSW | **~70%** | Rendered components, real user flows, mocked network |
| E2E | Playwright | ~15% | 20-30 business-critical flows |

Integration tests are where the value is. The Kent Dodds / Guillermo Rauch position ("integration tests are where confidence comes from") holds.

## Rules

### 1. Test behavior, not implementation

```tsx
// bad
expect(component.state.isLoading).toBe(true);

// good
expect(screen.getByRole('status')).toHaveTextContent('Loading');
```

If refactoring the implementation (Redux → Zustand, class → function) breaks tests, the inspect whether they encoded an intended behavior or accidentally coupled to internals.

### 2. MSW over fetch mocks

```ts
// src/testing/mocks/handlers/discussions.ts
import { http, HttpResponse } from 'msw';
export const discussionHandlers = [
  http.get('/api/discussions', () => HttpResponse.json([{ id: '1', title: 'Hello' }])),
];
```

Handlers are reused across dev, Storybook, unit tests. One source of truth.

### 3. Prefer `getByRole` / `getByLabelText`

Accessibility queries first, then `getByText`, then `getByTestId` (last resort). A missing role query is a useful signal; inspect actual semantics and accessible names rather than assuming query failure proves a WCAG violation.

### 4. Real `user-event`, not `fireEvent`

```ts
const user = userEvent.setup();
await user.click(screen.getByRole('button', { name: /save/i }));
```

Simulates realistic interaction timing and focus behavior.

### 5. Snapshot tests are forbidden in component tests

Snapshot tests break for the wrong reasons and rot fast. Exception: golden-output tests for pure functions (schema serializers, etc.) are fine.

### 6. Record the actual coverage/risk target

The illustrative 70% configuration below is a project proposal, not a universal correctness gate. Invest in critical denied/failure paths and integration confidence rather than chasing a number.

## Vitest setup

```ts
// vite.config.ts
import { defineConfig } from 'vitest/config';
export default defineConfig({
  test: {
    environment: 'jsdom',
    setupFiles: ['./src/testing/setup.ts'],
    globals: true,
    coverage: { reporter: ['text', 'html'], thresholds: { statements: 70 } },
  },
});
```

```ts
// src/testing/setup.ts
import '@testing-library/jest-dom/vitest';
import { afterAll, afterEach, beforeAll } from 'vitest';
import { server } from './mocks/server';

beforeAll(() => server.listen({ onUnhandledRequest: 'error' }));
afterEach(() => server.resetHandlers());
afterAll(() => server.close());
```

See the setup template and its explicit companion modules. A MemoryRouter-only component test does not execute framework SSR loaders/actions; include native route tests with the installed framework harness.

## Integration test example

```tsx
// src/features/discussions/__tests__/discussions.test.tsx
import { screen, waitFor } from '@testing-library/react';
import { userEvent } from '@testing-library/user-event';
import { DiscussionsPage } from '../DiscussionsPage';
import { renderWithProviders } from '@/testing/test-utils';

test('shows discussions and lets user delete one', async () => {
  renderWithProviders(<DiscussionsPage />);
  expect(await screen.findByText('Hello')).toBeInTheDocument();

  const user = userEvent.setup();
  await user.click(screen.getByRole('button', { name: /delete hello/i }));
  await user.click(screen.getByRole('button', { name: /confirm/i }));

  await waitFor(() => expect(screen.queryByText('Hello')).not.toBeInTheDocument());
});
```

`renderWithProviders` wraps with `QueryClientProvider`, `MemoryRouter`, theme, etc. Define once in `src/testing/test-utils.tsx`.

## E2E with Playwright

```ts
// e2e/login.spec.ts
import { test, expect } from '@playwright/test';

test('user can log in and see dashboard', async ({ page }) => {
  await page.goto('/login');
  await page.getByLabel('Email').fill('test@example.com');
  await page.getByLabel('Password').fill('synthetic-local-fixture-only'); // use only a configured local synthetic identity
  await page.getByRole('button', { name: 'Sign in' }).click();
  await expect(page.getByRole('heading', { name: 'Dashboard' })).toBeVisible();
});
```

Run in CI headless; UI mode locally for flake debugging.

## Common findings

> **[Must-fix]** `src/components/button.test.tsx:1`: tests internal state (`expect(component.state.count).toBe(1)`). Rewrite to test rendered output. See [guides/08-testing.md §rule-1](08-testing.md).

> **[Should-refactor]** `src/features/auth/login.test.tsx:10`: mocks `fetch` with `vi.fn()`. Replace with MSW handler. See [guides/08-testing.md §rule-2](08-testing.md).

> **[Must-fix]** `vitest.config.ts:3`: no setup file registered; `@testing-library/jest-dom` matchers missing. See [templates/test-setup.ts](../templates/test-setup.ts).

## Example in action

See [examples/code-review-example-before-after.md](../examples/code-review-example-before-after.md) for test-quality findings on a PR.
