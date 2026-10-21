# 19: Notifications & Toasts

Use installed project versions. Code fences are focused examples with project imports identified, not complete applications or executed receipts. Additional packages, tools, provider setup and configuration require the applicable user authorization. Starter uses React Router framework SSR, Cloudflare Workers and Supabase; optional library comparisons do not select a service.


## The three notification surfaces

1. **Toast**: ephemeral, in-page, "just happened" feedback. Lives ~3-5s. Library: Sonner.
2. **In-app inbox**: persistent, per-user, cross-channel notification center (the bell icon). Library/infra: Novu, Knock.
3. **OS push**: Web Push, iOS APNs, Android FCM. Wakes users outside the app. Infra: OneSignal, FCM, APNs (often through Novu/Knock).

Choose the surface from an actual user journey and persistence requirement, not an assumed adoption timeline. Do not conflate ephemeral feedback with durable or external delivery.

---

The capacity/bundle/community estimates are comparison heuristics, not measured application results or current license grants. Verify exact installed versions, supported APIs, SSR behavior and licensing before choosing. No provider is selected by this comparison.

## Conditional library comparison

| Surface | Conditional candidate | Why |
|---|---|---|
| Toast (in-page ephemeral) | **Sonner** | Best-in-class React toast lib |
| Toast (legacy alternative) | **react-hot-toast** | Still maintained, smaller surface |
| In-app inbox + multi-channel routing (OSS) | **Novu** | OSS, self-hostable, most flexible |
| In-app inbox + workflows (hosted SaaS) | **Knock** | Workflow-driven, polished APIs |
| Web/mobile push at scale | **OneSignal** | Hosted push comparison; current terms require review |
| Native push transport | **FCM** (Android/Web) + **APNs** (iOS) | The platform primitives |

For an already installed shadcn toast surface, **Sonner** is a candidate. No cross-channel service is selected for Starter. Web Push usually flows through Novu/Knock or directly to FCM/APNs.

---

## When to choose each

### Sonner (the toast default)
- Built by the same author as `cmdk` and `vaul`. Used in shadcn/ui's toaster.
- Stack-able, swipe-to-dismiss, promise integration, rich content (custom JSX).
- Tiny bundle, tree-shakeable. Pairs with shadcn `toaster.tsx` out of the box.
- Promise toasts (`toast.promise(...)`) are the cleanest pattern for action feedback.

### react-hot-toast (the alternative)
- Pre-shadcn-era favorite. Still maintained.
- Slightly smaller API. Pick it if a project already uses it; new projects should pick Sonner.

### Novu (OSS multi-channel notification infra)
- Workflow-as-code: in-app + email + SMS + push, with one event payload.
- Self-host or managed cloud. Best fit when you want to own the infra and the schemas.
- Provides a React `<Inbox />` component that wires the bell icon to your backend.

### Knock (workflow-driven SaaS)
- Workflow editor in a UI; each notification becomes a node graph (channels, conditions, batching, digests).
- Best when product/marketing edits notifications without code deploys.
- Compare actual current fees and operational ownership; this guide does not supply current pricing.

### OneSignal (push at scale)
- Inspect current product terms, retention/data handling and limits before any separate provider decision.
- Wraps FCM + APNs + Web Push under one SDK and dashboard.
- Use when you need a push product fast and don't already have Novu/Knock for routing.

### FCM / APNs (the primitives)
- Use directly when you have a small number of push events and want zero vendor lock-in.
- Volume comes with operational cost (token registration, retry, deliverability). At any meaningful scale, route through Novu/Knock/OneSignal.

---

## Decision axes

1. **What's the surface?** Toast → Sonner. Inbox → Novu/Knock. Push → OneSignal/FCM/APNs.
2. **OSS vs managed?** Novu OSS. Knock and OneSignal SaaS. FCM/APNs are platform.
3. **Does product/marketing edit notifications?** Yes → Knock (visual workflow editor). No → Novu (code-defined).
4. **Multi-channel orchestration (email + push + in-app + SMS)?** Record a separate orchestration/lifetime/consent/retry decision. Novu/Knock are comparison candidates, not selected Starter services.

---

## Optional installed Sonner toaster

```tsx
// Existing framework root composition; keep its document/Links/Scripts structure (or root)
import { Toaster } from 'sonner';

export function ExampleToastShell({ children }: { children: React.ReactNode }) {
  return (
    <html>
      <body>
        {children}
        <Toaster position="bottom-right" richColors closeButton />
      </body>
    </html>
  );
}
```

```tsx
// in any client component
import { toast } from 'sonner';
// saveDraft is an explicit injected application transport; server auth is separate.

export function SaveButton({ saveDraft }: { saveDraft: () => Promise<void> }) {
  return (
    <button
      onClick={() =>
        toast.promise(saveDraft(), {
          loading: 'Saving…',
          success: 'Draft saved',
          error: 'Could not save. Try again.',
        })
      }
    >
      Save
    </button>
  );
}
```

The `toast.promise` pattern is the canonical "show feedback for an in-flight action": never roll a custom one when this exists.

## Persistent inbox and delivery boundary

An inbox is a server-owned per-user dataset, not a subscriber ID trusted from the browser. Load only rows authorized to the current actor; mark-as-read must enforce ownership. A React bell component supplies no backend fan-out, signed subscriber authorization or delivery proof.

Starter selects no Novu, Knock, OneSignal, FCM/APNs, queue or newsletter provider. The comparisons above describe distinct surfaces for an explicit future decision, not service defaults. Resend is transactional email only and does not implement an inbox or browser push. Do not configure a vendor or invoke delivery from this guide.

## Toast accessibility floor

- Toasts must be wrapped in an `aria-live` region (verify the installed Sonner configuration and actual screen-reader output rather than assuming an error always receives assertive priority).
- Auto-dismiss must be defeatable; either pause-on-hover/focus or expose a close button. Sonner has both.
- Don't put critical state-changing actions in a toast. Confirmations belong in a dialog (Radix Dialog), not a swipe-away.
- Reduced motion: inspect actual installed Sonner motion behavior and do not override reduced-motion preferences.

---

## Choice tree

1. **You want feedback for the action that just happened in-page** → Sonner.
2. **You want a bell icon that lists past notifications, persisted server-side** → Novu (OSS) or Knock (SaaS).
3. **You want product/marketing to edit notifications without deploys** → Knock.
4. **You want Web Push / mobile push out today** → OneSignal (or Novu if you already have it).
5. **You're at the level where one vendor is constraining you** → use FCM / APNs directly through your own service.

---

## Common findings

> **[Should-refactor]** `src/components/Toast.tsx:1`: homemade toast component with no `aria-live` region. Replace with Sonner. See this guide §toast-accessibility-floor.

> **[Should-refactor]** `src/features/notifications/handler.ts:1`: inspect duplicated channel logic against actual delivery requirements and ownership. A provider migration requires a separate explicit decision; duplication alone does not make the controls incorrect.

> **[Should-refactor]** `package.json:50`: `react-toastify` (legacy aesthetic, slow updates). Migrate to Sonner.

---

## Handoffs

- **Worker / queue / fan-out infrastructure** for cross-channel delivery → `Cloudflare Platform`. The notification *worker* (cron, webhook receiver, retry logic) is theirs. The *React surface* (Inbox component, toast call sites) is ours.
- **Email template authoring (MJML, React Email)** → out of scope; flag for `Project Notebook` PRD if the design team needs templates.
- **Push token storage and rotation, auth posture** → `Security Review`.
- **Notification copy / tone / cadence policy** → `Design Foundation` for copy, product for cadence.
