# Format and evidence notes

## Nygard core and the useful extension

Michael Nygard's architecture-decision form records Title, Status, Context, Decision and Consequences. The packaged extended Nygard template also requires Alternatives Considered so future readers understand rejected choices. Preserve that distinction rather than attributing the extension to the original five-part form. An accepted record states the actual choice; an unaccepted candidate must remain Proposed.

## Format choice

Nygard is the simple default. MADR makes decision drivers, considered options and per-option pros/cons explicit when the comparison needs that depth. The Y-statement pattern is attributed to Olaf Zimmermann and has five clauses: context, concern, choice, desired quality and accepted downside. It supplements rather than replaces the full alternatives/consequences record. These are practical format choices; no unverified study or claimed superiority score is needed to choose a readable format.

## Governance evidence

A supersession needs both pointers, unchanged historical rationale, owner acceptance and an updated index when one exists. It also needs an explicit implementation handoff when application changes remain: owner, affected components, actual deadline if any, acceptance checks and status. Replacing the record does not migrate the code. A log review should identify consequential decisions missing from records, not judge completeness from file counts.

## Tooling qualification

Plain Markdown is sufficient. Optional tooling versions, configuration schemas and installation methods need current official verification during a separately requested setup task. Renderer output does not prove record completeness. No automatic PR-to-ADR extractor, lint integration, global install or deployment has been implemented by these resources. Deriving a draft from a supplied PR is a manual source/evidence workflow and does not infer owner acceptance.

## Source and execution limits

The three full templates and guides are packaged locally. Use actual project sources and decision evidence when filling them. Synthetic examples are NOT_RUN and are not reusable approval or execution proof. Keep a source claim, an accepted design, implementation, static checks, browser evidence and live provider behavior separate.
