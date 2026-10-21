/**
 * Measure an explicit Vite static-JavaScript entry graph.
 * Usage: BUILD_DIR MANIFEST ENTRY [BUDGET_KIB].
 * Use a Node runtime qualified for this TypeScript helper (see guide 23).
 * Example: node bundle-budget-check.ts dist dist/.vite/manifest.json src/main.tsx 90
 * The optional positive budget is in gzip KiB, not a route or load-time guarantee.
 * Without a budget the result is MEASURED_NO_BUDGET, not a budget pass.
 * Static imports are deduplicated; dynamic entries are listed separately.
 * Filename-only usage exits 2 UNVERIFIED. Next.js output is unsupported.
 */

import { inputRoot, readBounded } from './safe-input.mjs';
import { relative, resolve, isAbsolute } from 'node:path';
import { gzipSync } from 'node:zlib';
import process from 'node:process';

async function main() {
  const buildDir = process.argv[2] ?? 'dist';
  if (process.argv[3]) {
    await measureManifest(buildDir, process.argv[3], process.argv[4], process.argv[5]);
    return;
  }
  console.error('UNVERIFIED: filename heuristics cannot establish route bundle weight. Supply MANIFEST ENTRY [BUDGET_KIB].');
  process.exitCode = 2;
  return;
}

async function measureManifest(dir: string, manifestPath: string, entry: string, budgetText?: string) {
  const safeKey = (value: string) => value.length <= 256 && /^(?:[A-Za-z0-9_@+.-]+\/)*[A-Za-z0-9_@+.-]+$/.test(value);
  const budget = budgetText === undefined ? undefined : Number(budgetText);
  if (!entry || !safeKey(entry) || process.argv.length > 6 || (budget !== undefined && (!Number.isFinite(budget) || budget <= 0))) throw new Error('Invalid arguments');
  const root = await inputRoot(dir);
  const manifestRelative = relative(resolve(dir), resolve(manifestPath));
  const manifest = JSON.parse((await readBounded(root, manifestRelative, 2 * 1024 * 1024)).toString('utf8'));
  if (Object.keys(manifest).length > 4096) throw new Error('Input count exceeded');
  if (!manifest || typeof manifest !== 'object' || Array.isArray(manifest) || !Object.hasOwn(manifest, entry) || manifest[entry]?.isEntry !== true) throw new Error('Invalid manifest entry');
  const visited = new Set<string>(), assets = new Set<string>(), dynamic = new Set<string>();
  const assetData = new Map<string, Buffer>(); let totalReadBytes = 0;
  async function visit(key: string) {
    if (visited.has(key)) return;
    if (visited.size >= 256 || key.length > 256 || /[\x00-\x1f\x7f]/.test(key)) throw new Error('Input count exceeded');
    if (!Object.hasOwn(manifest, key)) throw new Error('Missing import');
    const chunk = manifest[key];
    if (!chunk || typeof chunk !== 'object' || Array.isArray(chunk) || typeof chunk.file !== 'string') throw new Error('Invalid chunk');
    for (const field of ['imports', 'dynamicImports']) {
      if (chunk[field] !== undefined && (!Array.isArray(chunk[field]) || !chunk[field].every((x: unknown) => typeof x === 'string' && safeKey(x)))) throw new Error('Invalid imports');
    }
    if (!/\.m?js$/.test(chunk.file)) throw new Error('Unsupported non-JS chunk');
    const candidate = resolve(root, chunk.file), rel = relative(root, candidate);
    if (isAbsolute(chunk.file) || rel.startsWith('..') || isAbsolute(rel)) throw new Error('Escaping asset');
    if (!assetData.has(candidate)) {
      const bytes = await readBounded(root, rel, 8 * 1024 * 1024);
      totalReadBytes += bytes.length; if (totalReadBytes > 64 * 1024 * 1024) throw new Error('Input bytes exceeded');
      assetData.set(candidate, bytes);
    }
    visited.add(key); assets.add(candidate);
    for (const lazy of chunk.dynamicImports ?? []) dynamic.add(lazy);
    for (const dependency of chunk.imports ?? []) await visit(dependency);
  }
  await visit(entry);
  const measurements = [];
  for (const asset of [...assets].sort()) {
    const data = assetData.get(asset)!;
    measurements.push({file:relative(root,asset), bytes:data.length, gzipBytes:gzipSync(data,{level:9}).length});
  }
  const gzipBytes = measurements.reduce((sum,a) => sum+a.gzipBytes,0);
  const verdict = budget === undefined ? 'MEASURED_NO_BUDGET' : gzipBytes/1024 > budget ? 'OVER_BUDGET' : 'WITHIN_BUDGET';
  console.log(JSON.stringify({entry,assets:measurements,staticAssetCount:assets.size,gzipBytes,gzipKiB:gzipBytes/1024,dynamicEntries:[...dynamic].filter(k=>!visited.has(k)).sort(),budgetKiB:budget??null,verdict,limits:'Static JS graph only; excludes CSS/media, runtime requests, CDN encoding, browser timing and dynamic totals.'},null,2));
  if (verdict === 'OVER_BUDGET') process.exitCode = 1;
}
main().catch(() => { console.error('UNVERIFIED: missing, malformed, unsupported or unsafe bundle measurement input.'); process.exitCode = 2; });
