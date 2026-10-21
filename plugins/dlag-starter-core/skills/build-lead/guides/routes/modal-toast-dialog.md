# Modal Toast Dialog routing

Use **UI Primitives** for the bounded decisions below. Check [scope and tool limits](../scope-and-tools.md) first. A route is a proposed handoff until actual availability, authorization and a dispatch receipt are established. Implementation, provider operations and tests remain unperformed unless the capable caller supplies their evidence.

The selected stack is React with React Router SSR, Cloudflare Workers, Supabase database and Auth, Cloudflare secrets and R2, transactional Resend and optional hosted Stripe Checkout. Framework/provider-specific recipes that require another stack are unavailable. Reuse the decision criteria, inputs, negative routing and output requirements only inside that selected scope; consult the current owner's Playbook before any concrete API or configuration recipe.



## Domain
This Specialist owns the accessible overlay surface in React applications: alert dialogs, confirmation dialogs, drawers/sheets, toasts, and command menus, plus the shared focus, scroll-lock, and ARIA contract underneath all of them. It selects the right primitive (Radix Dialog, AlertDialog, Vaul Drawer, Sonner toast, cmdk command menu, Headless UI), wires it correctly (portal, focus trap, keyboard), and validates the result against a six-point accessible-modal contract and a four-tier toast-vs-notification taxonomy.


## Trigger phrases
- "which overlay primitive should I use here"
- "the focus trap breaks when the drawer opens"
- "wire Sonner in this an unselected Next framework app"
- "build a Vaul drawer with snap points"
- "build a command palette"
- "audit this modal for accessibility"

## Do NOT route when
- The ask is design tokens or animation values (the data-[state=open]/closed CSS itself); this Specialist wires the state attributes, Design Foundation authors the animation.
- The ask is general React state management or component-tree architecture unrelated to overlays; that belongs to React Foundation.
- The overlay gates a destructive, irreversible, or privilege-escalating action and has not yet been security-reviewed; that audit belongs to Security Review before this Specialist declares it done.
- The user wants a hand-rolled custom focus trap; push back and redirect to the built-in Radix/Headless UI implementation instead of building one.

## Inputs the Specialist needs
- The overlay type and use case (alert, confirmation, drawer, toast, command menu).
- Whether the action being confirmed is destructive or irreversible.
- The framework context (an unselected Next framework App Router requires "use client" for Vaul).

## Outputs
- A wired overlay component with portal mount, focus trap, and keyboard handling in place.
- A pass/fail against the six-point accessible-modal contract (aria-modal, role, focus trap, Escape, scroll lock, focus return).
- An overlay-audit-report for audit requests, covering primitive selection, taxonomy fit, and stacking.

## Commonly sequenced with
- Design Foundation: authors the motion/animation values targeting the data-[state] attributes this Specialist wires.
- React Foundation: owns the broader component architecture the overlay lives inside.
- Security Review: reviews any overlay gating a destructive or privilege-escalating action.
