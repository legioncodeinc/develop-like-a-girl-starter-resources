# 04, Five-Axis Evaluation

Read [review boundaries](../boundaries.md) first. Git/Python snippets describe optional evidence collection by an authorized caller with those tools; this read-only role consumes supplied evidence and never executes them.

After the traceability table is filled, evaluate the implementation along these five axes. Each axis yields a row in the Scorecard and may yield findings at any severity.

The five axes are: **Completeness**, **Correctness**, **Alignment**, **Gaps**, **Detrimental Patterns**. They map roughly onto Google's eight reviewer dimensions (see the actual applicable source evidence), compressed for this reviewer's plan-relative scope.

---

## Axis 1, Completeness

**Question:** Is every requirement from the plan addressed in code?

Source: the traceability table from step 3.

Checks:

- Every row has a Status of ✅, ⚠️, ❌, or 🟦.
- Counts help locate scope, but do not independently establish a pass or severity. The following is only an orientation heuristic; actual coverage and impact govern:
  - Zero ❌ -> ✅ Pass.
  - 1-2 ❌ on non-critical items -> ⚠️ Partial.
  - 3+ ❌ or 1+ ❌ on a core user flow -> ❌ Fail.
- Any requirement left un-traceable (couldn't find where it lives) is a Completeness gap, record what you searched for.

Findings produced: Critical for every ❌ row on a core flow. Missing required secondary behavior remains a concrete finding; severity follows actual requirement/impact rather than a mechanical count. Suggestion if the plan is ambiguous enough that "done" is subjective.

---

## Axis 2, Correctness

**Question:** Does the implementation do what the plan specifies, not just look like it?

Checks:

- For each ✅ row in the traceability table, re-read the code and confirm behavior. Attention to:
  - Data model / type definitions match the plan's schema (field names, nullability, enum values).
  - API contracts (route path, HTTP method, request/response shape) match.
  - Edge cases the plan called out (e.g., "handle empty list", "retry on 429") are handled.
  - Business-logic constants match (e.g., plan says "free tier = 100/mo", code should not say `if (count > 50)`).
- Flag any case where the surface looks right but the behavior is wrong.

Findings: usually Warning or Critical. A "looks right, acts wrong" bug is worse than a missing feature because it evades later sanity checks.

---

## Axis 3, Alignment

**Question:** Does the code structure match the plan's architecture and conventions?

Checks:

- File locations match the plan's architecture diagram (if any) or the repo's existing conventions.
- Naming follows the plan's vocabulary. If the plan says "subscription", the code should not say "membership" unless that's an established synonym in the codebase.
- Module boundaries respected, e.g., a retrieval module does not reach directly into the unrequested processing service internals; CLI entrypoints do not import test-only helpers.
- Output and CLI behavior match any descriptions in the plan (command flags, JSON shapes, empty states).
- Non-goals honored, no out-of-scope files in the diff (see `03-cross-reference-audit.md` on non-goals).

Findings: usually Warning for naming/placement. Critical for module-boundary violations (e.g., a public package entrypoint importing a `src/internal/*` module, leaks private API into the published `the actual package public surface` surface).

TypeScript/Node/ESM specifics (general best practice, plus the actual applicable source evidence):

- ESM import paths carry explicit extensions where the build requires them; no CommonJS `require` in ESM modules.
- `package.json` `exports` map is not widened to leak internal paths.
- Public API changes are reflected in the emitted `.d.ts` types, not just the runtime code.
- Async entrypoints handle rejection; no floating promises on the dataset or external service calls.

---

## Axis 4, Gaps

**Question:** What's implied but missing, error handling, validation, tests, edge cases?

This axis catches implicit requirements. See `07-common-gaps.md` for the full pattern catalog. Quick checklist:

- **Error handling.** Every relevant `await`, database read/write, database or external call in the diff, is the actual error propagation/handling boundary accounted for? (Warning if absent; Critical if silent failure corrupts the PostgreSQL records.)
- **Input validation.** New CLI commands or Worker request handlers, is input validated before use? (Critical if unvalidated input reaches a dataset write or a shell call.)
- **Empty / degraded states.** Code paths that read optional processing, is the accepted degraded-mode behavior handled when an optional service is unavailable?
- **Gating.** New server operations, are they routed through the required server authorization gate if the plan implies it?
- **Feature flags.** If the plan describes a rollout strategy, is the code behind a flag?
- **Tests.** If the plan explicitly called for Vitest tests, are they present? (If the plan is silent, missing tests is a Suggestion, not a Warning.)
- **Observability.** If the plan described metrics, traces, or logs, are they emitted?

Findings produced: mostly Warning. Critical only when a gap is directly ship-blocking (e.g., an unvalidated MCP tool write to the dataset).

---

## Axis 5, Detrimental Patterns

**Question:** Does the implementation regress existing behavior or introduce anti-patterns?

Checks:

### Regressions
- For every modified function signature, grep the repo for callers. Any caller unvisited by the diff that relied on the old contract is a regression candidate.
- For every deleted file, grep for remaining imports.

### Security smells
- Hardcoded secrets, API keys, tokens in the diff (e.g., an optional processing API key pasted inline instead of read from the secret store).
- `eval`, `Function()`, `child_process` exec on unescaped input.
- User input flowing into dataset queries, file paths, or shell commands without escaping.
- Missing checks on the required server authorization gate for new protected server operations.
- (Deep security audit is `Security Review`'s job; here, flag obvious smells only.)

### Performance anti-patterns
- **N+1 dataset reads** (general ORM/dataset pattern, source: the actual applicable source evidence):
  - `for (const id of ids) { await repository.get(id) }`, loop-over-single-read instead of one batched read.
  - A list read followed by a per-item lookup in `.map()` that re-queries the dataset per element.
  - Repeated reprocessing of the same document in a loop instead of a single batch embed.
- Unbounded loops, recursion without depth limits.
- Missing pagination or `take`/limit on large dataset scans.
- Synchronous blocking work on the unrequested processing service hot path.
- Sequential awaits on actually independent work may be avoidable; verify ordering, failure policy, quotas and bounded concurrency before recommending a change. Do not prescribe unbounded Promise.all for side effects.

### Code health
- Dead code (unreachable branches, unused exports).
- Leftover debugging (`console.log`, `debugger`, `// TODO: remove this`).
- Unused imports (`tsc --noEmit` and the editor usually catch these; flag if not). Watch for copy-paste duplication that `jscpd` would flag.
- Stale comments referring to old behavior.

Findings produced: all severities, calibrated by impact. A `console.log` in a hot path is Warning. A hardcoded secret is Critical. N+1 severity depends on observed scale, latency/limits and core-flow impact; a dashboard/admin label alone does not establish severity.

---

## Scorecard production

From the five axes, produce the scorecard row:

| Category | Status | Rule of thumb |
|---|---|---|
| Completeness | ✅ / ⚠️ / ❌ | ✅ all ✓, ⚠️ if any ❌ rows, ❌ if core flow missing |
| Correctness | ✅ / ⚠️ / ❌ | ✅ behavior matches, ⚠️ minor divergence, ❌ wrong-but-looks-right |
| Alignment | ✅ / ⚠️ / ❌ | ✅ structure matches, ⚠️ naming/placement drift, ❌ module-boundary violation |
| Gaps | ✅ / ⚠️ / ❌ | ✅ no implicit gaps, ⚠️ minor gaps, ❌ auth/validation/error-handling gap |
| Detrimental | ✅ / ⚠️ / ❌ | ✅ clean, ⚠️ code-health drift, ❌ regression or perf anti-pattern on hot path |

Use consistent emoji. Do not mix ✅/✔️ or ❌/✖️.

---

## See also

- Severity classification for each finding: `05-severity-classification.md`.
- Common gap catalog: `07-common-gaps.md`.
- Examples: `examples/01-happy-path-clean-audit.md` (clean scorecard), `examples/02-blocker-heavy-audit.md` (failing scorecard).
