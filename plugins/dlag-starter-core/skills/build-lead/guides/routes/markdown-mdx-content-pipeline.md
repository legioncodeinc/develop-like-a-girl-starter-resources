# Markdown Mdx Content Pipeline routing

Use **Website Builder** for the bounded decisions below. Check [scope and tool limits](../scope-and-tools.md) first. A route is a proposed handoff until actual availability, authorization and a dispatch receipt are established. Implementation, provider operations and tests remain unperformed unless the capable caller supplies their evidence.

The selected stack is React with React Router SSR, Cloudflare Workers, Supabase database and Auth, Cloudflare secrets and R2, transactional Resend and optional hosted Stripe Checkout. Framework/provider-specific recipes that require another stack are unavailable. Reuse the decision criteria, inputs, negative routing and output requirements only inside that selected scope; consult the current owner's Playbook before any concrete API or configuration recipe.



## Domain
This Specialist owns the full pipeline from raw .md/.mdx source to HTML/JSX output: compiler selection qualified against the actual React/Vite target and installed versions, the remark/rehype plugin chain and its ordering, syntax highlighting via the installed Shiki version, GFM, AST manipulation, custom directive plugins, math (KaTeX) and Mermaid/D2 diagram embedding, and XSS sanitization via rehype-sanitize and DOMPurify.


## Trigger phrases
- "set up MDX for this project"
- "configure Shiki syntax highlighting"
- "write a remark plugin"
- "audit our rehype plugin chain"
- "sanitize user-authored markdown"
- "embed Mermaid diagrams in MDX"
- "migrate off next-mdx-remote"
- "add math rendering to markdown"

## Do NOT route when
- The ask is choosing a docs platform (Starlight, Docusaurus, Mintlify) rather than the compile pipeline; that belongs to a separately qualified documentation-platform workflow; repository content alone does not provide that platform.
- The ask is designing the mdx-components.tsx React component map; that belongs to React Foundation.
- The sanitization audit reveals a broader XSS concern beyond rehype-sanitize/DOMPurify config, such as CSP headers or stored XSS; that belongs to Security Review.
- The ask is generating SDKs or enriching an OpenAPI spec from MDX docs; that belongs to a separately qualified API specification or SDK workflow; these are outside repository-content compilation.

## Inputs the Specialist needs
- The current or intended compiler and whether the content source is trusted (docs) or user-generated (chat, comments).
- The existing remark/rehype plugin chain, if any, and its ordering.
- Whether math, diagrams, or custom directives are in scope for this request.

## Outputs
- A configuration diff or working plugin chain with pinned versions.
- A sanitization schema (docs allowlist vs. user-generated strict allowlist).
- A vitest fixture set for representative inputs and XSS sanitization tests, when setting up a new pipeline.

## Commonly sequenced with
- a separately qualified documentation-platform workflow; repository content alone does not provide that platform: decides the platform before this Specialist configures the pipeline on top of it.
- React Foundation: builds the component map this Specialist's compiled output renders through.
- Security Review: takes broader XSS findings beyond sanitizer configuration.
