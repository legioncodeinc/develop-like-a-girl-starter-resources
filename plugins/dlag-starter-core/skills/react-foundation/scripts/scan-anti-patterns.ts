/**
 * scripts/scan-anti-patterns.ts
 *
 * Limited heuristic; scans a React codebase for common anti-patterns listed in
 * `guides/12-anti-patterns.md`. Produces a markdown report to stdout.
 *
 * Run:
 *   node <skill>/scripts/scan-anti-patterns.ts <src-path>
 *
 * Documented candidates (only effects, aggregator barrels and index keys execute):
 *
 *   1. useEffect-for-derived-state   (useEffect whose body is only `setState(derivedFromExistingVars)`)
 *   2. useEffect-for-prop-sync       (useEffect([props.X], () => setLocal(props.X)))
 *   3. barrel-files                  (aggregator index.ts that only re-exports)
 *   4. premature-memoization         (useMemo / useCallback for trivial compute)
 *   5. any-type-on-api-data          (const x = await fetch(..) as SomeType)
 *   6. Server/browser boundary: MANUAL ONLY in this SSR edition
 *   7. leaf-fetch                    (fetch() inside a component file, not in api/ layer)
 *   8. index-as-key                  ({items.map((_, i) => <X key={i} />)})
 *
 * Implementation guidance:
 * - Use ts-morph for AST parsing.
 * - Emit findings as structured JSON, then render markdown.
 * - Exit0 means the heuristic completed; never use it as a security/quality verdict.
 */

import { Project, SyntaxKind } from 'ts-morph';
import { inputRoot, sourceInputs } from './safe-input.mjs';
import { relative, resolve, isAbsolute } from 'node:path';
import process from 'node:process';

type Severity = 'must-fix' | 'should-refactor' | 'style';
type Finding = { file: string; line: number; rule: string; severity: Severity; message: string; guide: string };

const MUST_FIX_RULES = new Set([
  'useEffect-for-derived-state',
  'useEffect-for-prop-sync',
  'any-type-on-api-data',
  'use-client-at-root',
  'index-as-key',
]);

async function main() {
  const srcArg = process.argv[2];
  if (!srcArg || process.argv.length !== 3) throw new Error('Explicit input root required');
  const srcPath = await inputRoot(srcArg);
  const inputs = await sourceInputs(srcPath);
  // In-memory only. No tsconfig, filesystem import, dependency or standard-lib discovery.
  const project = new Project({ useInMemoryFileSystem: true, skipFileDependencyResolution: true,
    skipAddingFilesFromTsConfig: true, compilerOptions: { noLib: true, noResolve: true } });
  for (const input of inputs) project.createSourceFile('/input/' + input.name.replaceAll('\\', '/'), input.text);
  const findings: Finding[] = [];

  project.getSourceFiles().forEach((sf) => {
    const rel = sf.getFilePath().replace(/^\/input\//, '');

    // 1 + 2 ;  naive scan for useEffect(() => setX(Y), [Y])
    sf.getDescendantsOfKind(SyntaxKind.CallExpression).forEach((call) => {
      const expr = call.getExpression();
      if (expr.getText() !== 'useEffect') return;
      const body = call.getArguments()[0];
      if (!body) return;
      const bodyText = body.getText();
      const setStateMatch = bodyText.match(/^\(\)\s*=>\s*set[A-Z]\w+\((.+)\)\s*$/s);
      if (setStateMatch) {
        findings.push({
          file: rel,
          line: call.getStartLineNumber(),
          rule: 'useEffect-for-derived-state',
          severity: 'should-refactor',
          message: `useEffect whose body is only setState of derived value. Compute during render.`,
          guide: 'guides/12-anti-patterns.md#1',
        });
      }
    });

    // RSC use-client detector excluded: this edition uses framework SSR.
    // Manually inspect the actual server/browser import graph per guide11.

    // 8 ;  <X key={i}> with index arg
    sf.getDescendantsOfKind(SyntaxKind.JsxAttribute).forEach((attr) => {
      if (attr.getNameNode().getText() !== 'key') return;
      const expr = attr.getFirstChildByKind(SyntaxKind.JsxExpression);
      if (expr?.getText().match(/^\{(i|idx|index)\}$/)) {
        findings.push({
          file: rel,
          line: attr.getStartLineNumber(),
          rule: 'index-as-key',
          severity: 'should-refactor',
          message: `Using array index as key. Use a stable ID.`,
          guide: 'guides/12-anti-patterns.md#11',
        });
      }
    });

    // 3 ;  barrel files (leaf exception: a single-component folder exporting its main component is OK)
    if (sf.getBaseName() === 'index.ts') {
      const stmts = sf.getStatements();
      const reExportOnly = stmts.length > 0 && stmts.every((s) => s.getKind() === SyntaxKind.ExportDeclaration);
      if (reExportOnly && stmts.length > 3) {
        findings.push({
          file: rel,
          line: 1,
          rule: 'barrel-files',
          severity: 'should-refactor',
          message: `Aggregator barrel file with ${stmts.length} re-exports; inspect actual cycles/bundle effects.`,
          guide: 'guides/12-anti-patterns.md#3',
        });
      }
    }
  });

  report(findings);
  const mustFix = findings.filter((f) => MUST_FIX_RULES.has(f.rule)).length;
  console.log('REVIEW_REQUIRED: heuristic candidates only; findings are not independently confirmed defects.');
  process.exitCode = 0;
  void mustFix;
}

function report(findings: Finding[]) {
  console.log('# Anti-pattern scan');
  console.log('');
  console.log(`Total findings: ${findings.length}`);
  const bySev = (s: Severity) => findings.filter((f) => f.severity === s).length;
  console.log(`- must-fix: ${bySev('must-fix')}`);
  console.log(`- should-refactor: ${bySev('should-refactor')}`);
  console.log(`- style: ${bySev('style')}`);
  console.log('');
  const byRule = new Map<string, Finding[]>();
  findings.forEach((f) => {
    if (!byRule.has(f.rule)) byRule.set(f.rule, []);
    byRule.get(f.rule)!.push(f);
  });
  for (const [rule, fs] of byRule) {
    console.log(`## ${rule} (${fs.length})`);
    fs.forEach((f) => {
      console.log(`- **[${f.severity}]** \`${f.file}:${f.line}\` ;  ${f.message} (${f.guide})`);
    });
    console.log('');
  }
}

main().catch(() => { console.error('UNVERIFIED: unsafe, oversized, missing or unsupported source input.'); process.exitCode = 2; });
