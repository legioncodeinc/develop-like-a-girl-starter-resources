---
name: stripe-payments
description: "Add optional hosted Stripe Checkout and verified server payment state to Starter React Router SSR apps on Cloudflare Workers."
license: AGPL-3.0-or-later
compatibility: Claude Code
---

# Stripe Payments Playbook

Payments are optional and disabled in a new project. Build the requested local hosted Checkout path only after the project chooses payments. The Starter stack is React Router SSR on Cloudflare Workers, with Supabase identity and database ownership. Card entry belongs on Stripe's hosted page.

1. Read the [implementation procedure](guides/hosted-checkout.md) and [Worker recipe](references/worker-recipe.md).
2. Complete the [payment worksheet](templates/payment-plan.md) using the project's accepted requirements. Inspect installed SDK versions and placeholder configuration without reading secrets.
3. Write the smallest requested local endpoints, schema drafts and UI. Load Core prerequisites by name: `dlag-starter-core:identity`, `dlag-starter-core:secrets`, `dlag-starter-core:implementation-foundation`. A missing prerequisite means report the gap; never access a sibling plugin's files.
4. Check the changed success and refusal paths, then report exact files and observed evidence using the worksheet. Keep local mocks, real SDK verification and provider operation distinct.

Read existing destinations before editing and preserve unrelated changes. Write/Edit is limited to the requested local project files and placeholder wiring. No shell, installations, credentials, Stripe requests, account configuration, real charges, sends, migrations, deployment, commit or push from this Playbook. Building code does not authorize those operations. No custom Elements, saved-card charging, subscriptions, refund automation or Stripe Connect in this initial hosted one-time-payment recipe. Escalate a requested expansion before implementing it.

Read the [edition boundaries](../../references/edition-boundaries.md). The [paired Specialist](../../agents/stripe-payments.md) follows the same scope. [Provenance](../../PROVENANCE.md) records the adaptation. If delegation is unavailable, follow this Playbook directly and identify direct use.
