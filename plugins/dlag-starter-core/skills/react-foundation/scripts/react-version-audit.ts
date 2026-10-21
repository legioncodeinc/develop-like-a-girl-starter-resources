/**
 * scripts/react-version-audit.ts
 *
 * Stub ;  reads package.json, determines React + ecosystem versions, and
 * reports:
 *   - Whether the app is React 18 or 19
 *   - Whether React Compiler is adoptable
 *   - Which version-specific idioms apply (`guides/10-react-19-idioms.md`)
 *   - Deprecated libraries to retire (moment, enzyme, recoil, CRA, ...)
 *
 * Run:
 *   node <skill>/scripts/react-version-audit.ts
 *
 * Output: markdown report to stdout; exit 0.
 */

import { inputRoot, readBounded, versionLabel } from './safe-input.mjs';

type PackageJson = {
  name?: string;
  dependencies?: Record<string, string>;
  devDependencies?: Record<string, string>;
};

const DEPRECATED: Record<string, string> = {
  moment: 'Use date-fns. See guides/13-ecosystem-catalog.md.',
  enzyme: 'Abandoned. Migrate to React Testing Library.',
  recoil: 'Meta deprecated. Migrate to Jotai.',
  'react-scripts': 'Legacy CRA candidate; selected target is Vite + React Router framework SSR.',
  'styled-components': 'Runtime CSS-in-JS. Prefer Tailwind / CSS Modules / vanilla-extract for new code.',
  '@emotion/styled': 'Runtime CSS-in-JS. Prefer Tailwind / CSS Modules / vanilla-extract for new code.',
};

async function main() {
  const root = await inputRoot(process.cwd());
  const pkg: PackageJson = JSON.parse((await readBounded(root, 'package.json', 256 * 1024)).toString('utf8'));
  if (!pkg || typeof pkg !== 'object' || Array.isArray(pkg)) throw new Error('Invalid input');
  const deps = { ...(pkg.dependencies ?? {}), ...(pkg.devDependencies ?? {}) };

  const declaredReact = versionLabel(deps.react);
  const match = declaredReact.match(/^[~^]?(\d+)(?:\.|$)/);
  const reactVersion = match ? match[1] : '';
  console.log('Declarations only: inspect lockfile/resolved packages and build configuration separately.');
  const [major] = reactVersion.split('.');

  console.log('# React Version Audit'); // package name is unnecessary untrusted output
  console.log('');
  console.log(`React declared constraint: ${declaredReact || '(not found)'}`);
  console.log('');

  if (!major) {
    console.log('UNVERIFIED: React missing or declaration not a simple major constraint; inspect resolved lockfile.');
    return;
  }

  if (Number(major) >= 19) {
    console.log('## React 19 idioms apply');
    console.log('- Browser function-form Actions/useActionState are optional; router Form/action remains valid.');
    console.log('- `useOptimistic` for instant UI feedback on mutations.');
    console.log('- `useFormStatus` for nested submit buttons.');
    console.log('- `use()` hook for reading promises / contexts.');
    console.log('- Ref as a prop (retire new `forwardRef` usage).');
    console.log('- React19 Context shorthand is available; .Provider remains valid.');
    console.log('');
  } else if (Number(major) === 18) {
    console.log('## React 18 ;  upgrade to 19 candidate');
    console.log('- Plan migration. See guides/10-react-19-idioms.md.');
    console.log('- React Compiler is still adoptable on React 18; consider enabling first.');
    console.log('');
  } else {
    console.log(`## React ${major}; review compatibility under explicitly requested upgrade scope.`);
    console.log('');
  }

  // Compiler adoption check
  const hasCompilerPlugin = !!deps['eslint-plugin-react-compiler'];
  const hasCompilerRuntime = !!deps['babel-plugin-react-compiler'] || !!deps['react-compiler-runtime'];
  console.log('## React Compiler');
  if (hasCompilerPlugin && hasCompilerRuntime) {
    console.log('- Candidate packages declared; activation/compatibility is UNVERIFIED until build config and output are inspected.');
  } else {
    console.log('- Declared packages do not establish activation.');
    if (!hasCompilerPlugin) console.log('  - Inspect the installed compatible React Hooks/Compiler lint integration.');
    if (!hasCompilerRuntime) console.log('  - Compiler package not declared; do not install or change config automatically.');
    console.log('  - See guides/07-performance.md §react-compiler.');
  }
  console.log('');

  // Deprecated
  const toRetire = Object.keys(DEPRECATED).filter((p) => deps[p]);
  if (toRetire.length) {
    console.log('## Deprecated dependencies to retire');
    for (const p of toRetire) console.log(`- \`${p}\`: ${DEPRECATED[p]}`);
    console.log('');
  }

  // Stack classification
  console.log('## Stack classification');
  const stack = [
    deps.next ? `Next.js ${versionLabel(deps.next)}` : null,
    deps.vite ? `Vite ${versionLabel(deps.vite)}` : null,
    deps.remix ? `Remix ${versionLabel(deps.remix)}` : null,
    deps['react-router'] ? `React Router ${versionLabel(deps['react-router'])}` : null,
  ].filter(Boolean);
  console.log(`- Framework: ${stack.join(', ') || '(unclear; inspect route configuration, do not assume SPA or RSC)'}`);
  console.log(`- Server cache: ${deps['@tanstack/react-query'] ? `TanStack Query ${versionLabel(deps['@tanstack/react-query'])}` : deps.swr ? `SWR ${versionLabel(deps.swr)}` : '(none; use framework loaders/actions unless a distinct cache need exists)'}`);
  console.log(`- Global state: ${deps.zustand ? `Zustand ${versionLabel(deps.zustand)}` : deps.jotai ? `Jotai ${versionLabel(deps.jotai)}` : deps['@reduxjs/toolkit'] ? `RTK ${versionLabel(deps['@reduxjs/toolkit'])}` : '(none; colocate UI state first)'}`);
  console.log(`- Forms: ${deps['react-hook-form'] ? `React Hook Form ${versionLabel(deps['react-hook-form'])}` : '(none; native router Form is valid)'}`);
  console.log(`- Validation: ${deps.zod ? `Zod ${versionLabel(deps.zod)}` : '(none; use existing validation or explicit bounded checks)'}`);
  console.log(`- Test runner: ${deps.vitest ? `Vitest ${versionLabel(deps.vitest)}` : deps.jest ? `Jest ${versionLabel(deps.jest)}` : '(none; record test gap, do not install automatically)'}`);
}

main().catch(() => { console.error('UNVERIFIED: unsafe, oversized or malformed package input.'); process.exitCode = 2; });
