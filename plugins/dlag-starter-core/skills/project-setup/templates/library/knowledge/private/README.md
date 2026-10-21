---
ai_description: |
  Internal engineering and business documentation. ADRs live in
  architecture/ADR-<n>-<kebab-slug>.md; shared CTRs live in
  contracts/CTR-<###>-<slug>.md; documentation standards live in
  standards/documentation-framework.md. Add only source-backed domains.
  Internal evidence and unresolved findings must not become public by default.
human_description: |
  Knowledge for engineering, founders, sales, service, account teams, and
  other internal readers. Includes architecture, business insights, decisions,
  operations, and approved internal explanatory manuscripts.
---

<!-- Optional documentation template: preserve the receiving repository's existing schema. The default Starter Notebook location remains library/knowledge/private/product/. This role creates only expressly requested missing Markdown files; lifecycle moves, issue creation, publication and generated binary packets remain proposals for separately authorized work. Audience-document export is not supplied by this Playbook. -->

# Knowledge: Private

This area explains the system and business to the team. It also holds the evidence and decisions that support audience documents.

## Shared folders

| Folder | Contents |
| --- | --- |
| `architecture/` | Architecture narratives and `ADR-<n>-<kebab-slug>.md` decision records |
| [`contracts/`](contracts/README.md) | `CTR-<###>-<slug>.md` shared API, event, data, permission, or state agreements |
| `standards/` | `documentation-framework.md` and repository writing or engineering rules |

## Add domains as needed

Use domains such as `auth/`, `data/`, `security/`, `operations/`, `strategy/`, `personas/`, or `reporting/` when the sources support them. Add a README that explains the domain. Do not seed unrelated domains or assume a technology stack.

project foundation planning, when available, builds the private current-state and foundation material before implementation. audience-document preparation uses supported sources to write documents for specific readers. Keep their draft decisions, source gaps, evidence, and review records private until the owner approves a public statement.

## Store the right material

Keep PRDs in `requirements/` and IRDs in `issues/`. Keep curated explanatory Markdown here when it is internal. Put approved external Markdown in `knowledge/public/`. Keep brand assets and generated Word/PDF files at an agreed location outside `library/`.
