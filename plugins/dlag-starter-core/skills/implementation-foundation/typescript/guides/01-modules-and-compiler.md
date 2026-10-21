# Modules, compiler, and layout

Separate browser components, Worker/server modules, domain functions, data adapters, and Node-only build tooling. A browser component may import a pure DTO parser; it must not import a module that creates a privileged client or reads a server secret. File naming alone is not proof of a boundary. Inspect transitive imports and the actual bundler output.

For Vite-bundled application code, bundler module resolution models the bundler's package exports and relative import behavior. A relative TypeScript import need not acquire a `.js` suffix just to resemble a Node library. For a directly executed Node ESM helper, resolve according to the actual Node loader and emitted filename; ordinary relative ESM imports require their real extension. Do not apply either rule to every package in a workspace. CommonJS interop in an existing dependency is different from introducing `require` into an ESM-only module.

Keep strict checking. `unknown` is the right starting point for outside data. Fix nullability, wrong imports, and type-only imports rather than changing strictness or adding an assertion to silence the compiler. `import type` and `export type` make type dependencies explicit under verbatim module syntax. Isolated compilation settings must agree with the tool that transforms each file. Type stripping or a successful Vite transform does not replace a type checker.

Treat generated route and Worker declaration files as generated output. Change the owning route/config source, regenerate through the already approved toolchain, inspect the diff, and run the appropriate existing type check. Do not hand-edit a generated declaration to make an incompatible binding appear available. Generate only in an authorized execution context: route type generation evaluates route configuration.

Use separate compiler programs when browser DOM, Worker bindings, and Node build globals would otherwise bleed into one another. The template is a browser fragment, not a replacement for a framework scaffold. Preserve the scaffold's rootDirs, include paths, generated declarations, and project references. Worker types must match its compatibility date, flags, rules, and bindings. Node types in a build configuration do not prove Node filesystem or process features exist in Worker request code.

Review output paths, aliases, casing, module exports, target/lib settings, and declarations against the actual delivery target. A compiler target names syntax emission; it does not install runtime APIs. Keep source maps private or intentionally published according to the release policy. Type-only checks, transforms, bundling, and runtime smoke tests establish different facts.

Sources: [TypeScript resolution](https://www.typescriptlang.org/tsconfig/moduleResolution.html), [Worker TypeScript](https://developers.cloudflare.com/workers/languages/typescript/), [React Router types](https://reactrouter.com/explanation/type-safety).
