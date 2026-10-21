# Binding map

Status: Draft. Names and intended behavior only; never paste values.

## Requested scope

- Requested local deliverable and approved files:
- App directory, source configuration path and existing runner:
- Locked Wrangler/framework versions inspected:
- Existing Worker entry and SSR context path:
- Environment and resolved Worker name:
- Account/resource identifiers supplied through approved project documentation:
- Hosted operations requested separately, if any:

## Environment matrix

| Binding name | Type: public config / server config / secret / resource | Required operation | Local source by filename only | Staging destination | Production destination | Owner |
| --- | --- | --- | --- | --- | --- | --- |
| [name] | [type] | [operation] | [name only] | [Worker/resource] | [Worker/resource] | [role] |

## Exposure and refusal

- Exact browser-public allowlist and return shape:
- Public key class and clean origin validation:
- Exact project ownership/approval checked separately from format:
- Server-only consumer modules and callers:
- Forbidden browser imports checked:
- Missing-name/wrong-type behavior before provider work:
- Optional-feature behavior when its bindings are absent:
- Supported required-name declaration or reason not used:
- Per-environment public/resource targets checked:

## Value ownership

- Existing secure operator delivery mechanism:
- Single writer or coordinated writers for each hosted binding:
- Local file loader and environment-specific precedence:
- Ignore/track status checked by filenames only:
- Shared consumers, if any, and separate provider-key feasibility:
- Rotation owner and linked rotation record:
- Required capability not supplied by the selected model:

## Verification

| Check | Expected outcome | Actual outcome | Evidence or unrun reason |
| --- | --- | --- | --- |
| Public function with extra private fields | Private fields absent | [observed/unrun] | [path/result] |
| Private/legacy key or credential-bearing/untrusted URL | Refuse without value disclosure | [observed/unrun] | [path/result] |
| Required value absent, whitespace-only or wrong type | Refuse without value disclosure | [observed/unrun] | [path/result] |
| Optional private values absent on public path | Public path still works | [observed/unrun] | [path/result] |
| Server import review | Private consumers stay server-only | [observed/unrun] | [paths] |
| Local loader | Correct name set for selected environment | [observed/unrun] | [operator evidence] |
| Browser build review | No private value or module in client output | [observed/unrun] | [artifact identity] |
| Hosted names and version | Correct target and deployed version | [observed/unrun] | [name-only metadata] |
| Authorized provider operation | Intended scoped behavior | [observed/unrun] | [safe result identifier] |

## Handoff

- Delivered paths:
- Source/synthetic/runtime/provider evidence distinctions:
- Pending operator action with exact target and effect:
- Remaining questions and owner:

Do not change a draft expectation into a passing result without execution evidence.
