# Route a new design system

Use Design Foundation for a new product's design brief, tokens, utility layer, component/screen specs and static examples. Read [scope and tools](../scope-and-tools.md) before work. This is a distinct mode from enforcing an existing system or implementing a component.

## Domain

Interview the owner for aesthetic and scope, choose an appropriate starting direction and record its justification. Build the design brief, master tokens CSS, utility CSS, component specs, screen specs, static HTML examples and README as a coherent system. Layer tokens before utilities, components before screens. These are source-of-truth specifications; they do not prove mounted production code. Never invent the owner's taste.

## Trigger phrases

- Build a design system for this product.
- Bootstrap the UI direction.
- Create tokens and utilities.
- Start a fresh design system from references.
- Scaffold component and screen specs.

## Do NOT route when

- An incremental change or existing-system review stays with Design Foundation's enforcement mode, using the current system as authority.
- A user says “you decide” without an aesthetic: request three reference products or a specific owner preference instead of guessing.
- Runtime dark mode or multi-brand token application belongs to UI Primitives.
- Production React component behavior belongs to React Foundation; React shadcn qualifies selected library mechanics. A spec cannot stand in for implementation.

## Inputs

Require palette, surface metaphor, motion vocabulary, typography, radius and density direction, or explicit reference products from a structured interview. Record non-negotiables and why they matter. Qualify dark mode, tenant branding, RTL if scoped, component inventory and target screens. Keep unanswered design decisions open.

## Outputs

Produce the approved design brief, master tokens, utilities, component specs, screen specs, static examples and navigator in the authorized project design folder. Preserve consistent naming, scale and accessible states. Record the current Design Foundation owner and which illustrative artifacts remain untested.

## Sequence

Design Foundation owns both bootstrapping and later enforcement within this fixed roster. UI Primitives consumes the tokens for theme behavior; Asset Delivery implements the font/image loading decisions. Browser Checks supplies actual browser and accessibility observations when capable tools exist. An HTML preview, visual critique and independent accessibility result remain different evidence.
