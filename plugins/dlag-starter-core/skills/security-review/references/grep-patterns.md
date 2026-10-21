# Deterministic search patterns

These are review leads, not automatic findings or execution permission. The read-only Specialist uses equivalent available Read/Grep/Glob queries. A separately authorized caller can run shell examples against its supplied project. Match actual route/source directories and installed libraries. List file names for credential leads; do not print matched values or credential-bearing git patches into chat. Do not scan personal home directories, environment values, production logs or unrelated repositories.

## Secret/public boundary leads

```bash
rg -l -i 'VITE_.*(KEY|SECRET|TOKEN|PASSWORD)|SUPABASE_.*(SECRET|SERVICE_ROLE)|STRIPE_.*SECRET|RESEND_API_KEY' app workers src --glob '*.ts' --glob '*.tsx' --glob '*.js'
rg -l -i 'supersecret|changeme|password123|your-secret-key|test-secret' app workers src
rg -l 'envPrefix|define:|window\.ENV|import\.meta\.env|process\.env' --glob '*config*' --glob '*.ts' --glob '*.tsx'
rg --files --hidden -g '.env*' -g '.dev.vars*' -g '!node_modules' -g '!.git'
```

A publishable Supabase key is intentionally public and not automatically a secret finding. Trace actual authority and client reachability. A template placeholder is not a live credential. An authorized history reviewer can list affected paths with `git log --all --diff-filter=A --name-only --format= -- '**/.env*' '**/.dev.vars*'`; file-name evidence alone does not show a credential existed. Secret detectors must redact their output before supplying evidence.

## Request authorization and injection

```bash
rg -n 'export.*(loader|action)|createRequestHandler|middleware' app workers --glob '*.ts' --glob '*.tsx'
rg -n 'getClaims|getUser|getSession|Authorization|requireActor|requireUser|owner_id|tenant_id|membership' app workers --glob '*.ts' --glob '*.tsx'
rg -n 'dangerouslySetInnerHTML|innerHTML|DOMParser|sanitize|redirect\(|new URL\(' app workers --glob '*.ts' --glob '*.tsx'
rg -n 'ENABLE ROW LEVEL SECURITY|FORCE ROW LEVEL SECURITY|CREATE POLICY|WITH CHECK|SECURITY DEFINER|BYPASSRLS|set_config|current_setting' --glob '*.sql' --glob '*.ts'
rg -n 'sql\.raw\(|sql\.identifier\(|\.query\(|\.execute\(|\.rpc\(|\.order\(' app workers --glob '*.ts'
```

The presence of a helper, auth import or RLS string is not proof that every route invokes it, that it verifies identity or that its actual role is constrained. Read its caller, implementation, query/response/effect boundary and refusal branch. Raw SQL, identifier maps and RPC permissions require the chosen driver's actual semantics. A generic search cannot detect every query interpolation or bypass.

## R2, uploads and response leakage

```bash
rg -n 'createPresigned|presign|R2Bucket|\.get\(|\.put\(|\.delete\(|arrayBuffer\(|formData\(' app workers --glob '*.ts' --glob '*.tsx'
rg -n 'Cache-Control|Vary|caches\.default|cache\.put|JSON\.stringify|Response\.json|data\(' app workers --glob '*.ts' --glob '*.tsx'
```

Confirm actual bucket/key ownership, public/private split, byte/type/count limits, finalization, capability expiry, approved response fields and private cache scope. Broad method names are noisy leads; do not report every get/put as a vulnerability.

## Webhook, email and money paths

```bash
rg -n -i 'webhook|stripe-signature|constructEvent|constructEventAsync|request\.json|request\.text|waitUntil|queueMicrotask' app workers --glob '*.ts'
rg -n 'event\.id|processed_webhooks|inbox|pending|leased|completed|failed|idempotenc|entitlement|checkout|sendEmail|resend' app workers --glob '*.ts'
rg -n 'fetch\(|redirect:|https?://' app workers --glob '*.ts'
```

Read raw-body and signature order before any effect; distinguish durable verified acceptance from in-memory work and from completed effects. Inspect actual business/customer mapping, concurrency and recovery. URLs from signed payloads can still be SSRF inputs. Do not print webhook bodies, customer payloads or provider keys.

## Dependency and CI paths

```bash
rg -n 'npm install|npm ci|frozen-lockfile|ignore-scripts|pull_request_target|workflow_run|permissions:|id-token:|uses:' .github/workflows package.json
```

Read the full lockfile for `resolved`, `integrity`, version and `hasInstallScript` changes. Use the [parsed-origin example](secure-by-default-snippets.md) with the actual project's approved origins, not substring matching. Installed package/advisory/registry checks are external/command work and require their own caller authorization. Do not install tools or change CI while reviewing it.

## Cookies, headers, logs and telemetry

```bash
rg -n -i 'sameSite|httpOnly|secure:|__Host-|localStorage|sessionStorage|Set-Cookie' app workers --glob '*.ts' --glob '*.tsx'
rg -n 'Content-Security-Policy|Strict-Transport-Security|X-Frame-Options|X-Content-Type-Options|frame-ancestors|nonce|rateLimit' app workers --glob '*.ts' --glob '*.tsx'
rg -l 'console\.(log|error|warn)|captureException|captureMessage|beforeSend|beforeBreadcrumb|maskAllInputs|maskTextSelector|maskCapturedNetworkRequest' app workers --glob '*.ts' --glob '*.tsx'
```

Supabase browser/SSR token-sharing cookies are not interchangeable with a custom opaque HttpOnly session. Match actual design and SDK requirements. Telemetry may be absent or use another SDK; no product is selected by these patterns. Inspect sensitive custom properties and redact before transmission. Source matches do not replace production bundle, browser, runtime, role/policy or sink evidence.
