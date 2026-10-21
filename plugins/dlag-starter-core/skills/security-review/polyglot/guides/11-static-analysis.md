# 11 Static analysis (Semgrep, Opengrep, gosec)

> **Read-only method.** Security Review uses Read, Grep, Glob and Skill only. Commands below are inert reference for a separately authorized caller with the required tools. Do not execute, save files, install, browse, read credentials, contact providers, or alter Git from this role. Return findings in chat. Use the local [review contract](../references/review-contract.md) for scope, data and output restrictions.


Loads [../references/cross-cutting/static-analysis-rulesets.md](../references/cross-cutting/static-analysis-rulesets.md) and [../references/cross-cutting/tool-commands.md](../references/cross-cutting/tool-commands.md).

Static analysis adds coverage to the ecosystem checklists; it never replaces them. The ecosystem `rg` sweeps run in every audit.

## Steps

1. **Pick the packs** for the stacks in scope from the table in static-analysis-rulesets.md section 1. Always include `p/security-audit`, `p/secrets`, and `p/owasp-top-ten`; add `p/github-actions`, `p/dockerfile`, and `p/terraform` when this review owns guide 12 [primary reference](https://semgrep.dev/docs/cli-reference).
2. **Evaluate supplied Semgrep evidence or separately authorized existing-tool use** per section 2. Record actual verified version, `--metrics=off`, reviewed local rules by default; registry retrieval only separately authorized (never `--config auto`), exclusions, JSON output to `raw/polyglot/`. Scope the run to this review's paths.
3. **If Semgrep cannot run** (not already available, or network/rule retrieval not authorized), run Opengrep v1.30.0 against a local rules folder if one is available [primary reference](https://github.com/opengrep/opengrep). For Go, also run gosec (guide 03) [primary reference](https://github.com/securego/gosec).
4. **If no engine runs**, record the cap and set the `sast_engine` measure to `not-run` (section 4).
5. **Triage results** with section 3: start at `possible` and at most `medium`; read each ERROR and WARNING hit in production code; promote to `likely` or `confirmed` only after tracing user input to the sink; drop test, fixture, example, and generated code hits and count them in notes.
6. **De-duplicate** against the ecosystem checklist findings: one finding per location and CWE, with the Semgrep rule id added to `refs`.
7. **Record measures**: `sast_engine` (1 or `not-run`), `sast_hits_total`, `sast_hits_confirmed` (promoted after reading), with the engine and version as `source`.

## Done when

An engine ran or its cap is recorded, every production ERROR and WARNING hit was read and either became a finding or was dropped with a reason in notes.

## Sources

[primary reference](https://semgrep.dev/docs/cli-reference), [primary reference](https://github.com/opengrep/opengrep), [primary reference](https://github.com/securego/gosec), [primary reference](https://docs.github.com/en/actions/reference/security/secure-use)
