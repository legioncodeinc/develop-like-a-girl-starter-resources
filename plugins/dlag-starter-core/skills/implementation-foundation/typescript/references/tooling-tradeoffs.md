# Tooling tradeoffs

## Type checking and transforms

Vite and framework transforms can remove TypeScript syntax and transform JSX. They do not establish the same fact as a complete type-checking program. Keep the actual compiler program and generated route/binding declarations in the required checks. Babel can be part of an existing React transform chain; its presence is not automatically a defect. Do not delete it based on reasoning from a CLI with no JSX. Verify plugins, syntax transforms, browser targets and emitted modules before changing the pipeline.

## Test runner

Vitest and Jest expose similar assertion, spy, mock and fake-timer concepts, but a prefix substitution is not a complete migration. Module mocking, ESM, globals, environment, cleanup, timers and transforms must be checked against installed versions. Keep the existing runner unless a measured decision authorizes a change. CI needs a finite run and meaningful exit code. Coverage adapters must match that runner. Neither runner proves real Worker or browser behavior without the corresponding environment.

## Bundler and library wrappers

A direct bundler configuration gives explicit entry lists, targets, externals and public metadata. A library wrapper may simplify a library's declaration and module-format outputs. Starter already has a Vite/framework app build; neither observation selects a different bundler. Inspect actual server/browser graph boundaries and native dependencies. An external native module still requires a runtime capable of loading it. No dual-format npm package, per-harness build, or package publisher is selected.

## Runtime validator

Choose the existing validated contract implementation and infer static types from it where available. Zod and Valibot use different APIs and may require distinct integration adapters. Check exact installed versions and desired unknown-key/default/error behavior. Measure actual browser or Worker output if size is the proposed benefit. Server code does not ship to browsers merely because it executes on Workers. Protocol-specific validator version requirements from an unselected SDK have no authority here. A dependency-free guard may be adequate for a small fixed contract when it checks every required field and rejects malformed data.

## Package manager and workspaces

npm, pnpm and Yarn have different lockfiles, lifecycle and linking behavior. Respect the one the project actually uses. Frozen install commands are caller actions and can run project/dependency lifecycle code. No install is authorized here. Workspace globs, package dependencies and selected cache inputs must match the actual tree. A manager or orchestrator migration needs measured value, complete migration effects, rollback and owner approval. Do not repeat vendor speed numbers as local proof.

## Current API evidence

Read on 2026-10-21 UTC:

- [TypeScript module resolution](https://www.typescriptlang.org/tsconfig/moduleResolution.html): bundler resolution permits extensionless relative imports; Node modes model the corresponding loader.
- [React Router type safety](https://reactrouter.com/explanation/type-safety): framework route type generation produces per-route types and evaluates route configuration. Match the installed version before adopting a generated type import.
- [Workers TypeScript](https://developers.cloudflare.com/workers/languages/typescript/): generated runtime/binding types depend on configuration, compatibility date and flags. The current docs note that --check validates recorded generation inputs, not the complete declaration body. It cannot replace type checking or runtime proof.
- [Supabase generated types](https://supabase.com/docs/guides/api/rest/generating-types): generated database shapes support typed clients and require synchronization with schema. This packet does not claim remote schema, RLS, or authentication was tested.

No downloaded source archive is required. Historical performance numbers, universal tool rankings and platform policies for unselected hosts are intentionally not presented as current Starter facts.
