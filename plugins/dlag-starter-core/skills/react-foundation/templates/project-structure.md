# Canonical Feature-Based Project Structure

Use installed project versions. Code fences are focused examples with project imports identified, not complete applications or executed receipts. Additional packages, tools, provider setup and configuration require the applicable user authorization. Starter uses React Router framework SSR, Cloudflare Workers and Supabase; optional library comparisons do not select a service.

Illustrative organization; preserve the installed framework scaffold. Source: [guides/01-project-structure.md](../guides/01-project-structure.md).

## Full tree

```
.
├── app/
│   ├── routes/                     # framework route modules
│   ├── root.tsx                    # framework document/root component
│   ├── routes.ts                   # framework route map
│   ├── services/                   # private *.server.ts services
│   │   └── profile.tsx             # loader/action/component/ErrorBoundary
│   │                               # generated route types follow scaffold
│   ├── assets/                     # static images, fonts
│   ├── components/                 # SHARED components only
│   │   ├── ui/                     # primitive UI (Button, Dialog, etc.)
│   │   ├── layouts/                # app / page layouts
│   │   └── providers/              # context providers (theme, auth bridge)
│   ├── config/                     # env vars, global config
│   │   └── env.ts                  # public configuration only; private Workers bindings stay server-side
│   ├── features/                   # THE BULK OF THE APP
│   │   ├── <feature-name>/
│   │   │   ├── api/                # 3-part request declarations
│   │   │   ├── components/
│   │   │   ├── hooks/
│   │   │   ├── stores/             # zustand stores SCOPED to this feature
│   │   │   ├── types/
│   │   │   └── utils/
│   ├── hooks/                      # truly shared hooks
│   ├── lib/                        # pre-configured libraries
│   │   ├── api-client.ts           # fetch/axios wrapper, interceptors
│   │   ├── auth.ts                 # auth utilities
│   │   └── query-client.ts         # TanStack Query client + defaults
│   ├── stores/                     # truly global stores (rare)
│   ├── testing/
│   │   ├── setup.ts                # vitest setup
│   │   ├── test-utils.tsx          # renderWithProviders
│   │   └── mocks/
│   │       ├── server.ts           # msw server setup
│   │       ├── browser.ts          # msw browser setup
│   │       └── handlers/
│   │           └── <feature>.ts
│   ├── types/                      # global types (domain-independent)
│   └── utils/                      # truly shared utilities
├── e2e/                            # Playwright tests
│   └── tests/
├── public/
├── .eslintrc.{js,cjs} | eslint.config.js
├── tsconfig.json
├── vite.config.ts
├── vitest.config.ts | in vite.config
├── playwright.config.ts
└── package.json
```

## Rules

See [guides/01-project-structure.md](../guides/01-project-structure.md) for the three rules (no cross-feature imports, unidirectional flow, no barrel files).

## ESLint enforcement

See [templates/eslint.config.js](eslint.config.js) for the illustrative `import/no-restricted-paths` zone list.

## Framework SSR integration

Keep app/root.tsx, app/routes.ts, generated route types, entry.server/client and Workers context with the selected scaffold. Feature/shared imports remain one-way. See project-file-map.md for the existing edition map.
