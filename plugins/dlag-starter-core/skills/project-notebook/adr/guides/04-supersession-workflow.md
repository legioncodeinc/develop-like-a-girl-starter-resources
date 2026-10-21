# Supersession and Deprecation Workflow

ADRs are permanent, they are never deleted. When a decision changes, the old ADR enters a new status, and a new ADR records the replacement decision. The bidirectional link between the two is mandatory.

---

## Status transitions

```
Proposed ──-> Accepted ──-> Superseded by ADR-NNNN
                       ──-> Deprecated (reason required)
         ──-> Rejected  (reason required)
```

| Status | Meaning |
|---|---|
| Proposed | Decision is actively being ratified. Not yet binding. Do not reference from code. |
| Accepted | Decision is binding. This is the normal operating state. |
| Superseded | A newer ADR replaced this one. Link is bidirectional. |
| Deprecated | The decision was retired without a direct replacement (e.g., the feature was removed). Requires a deprecation rationale. |
| Rejected | The decision was proposed and explicitly rejected. Record the rejection rationale so the same proposal is not re-raised without new evidence. |

---

## Supersession: step-by-step

### Step 1, Write the new ADR

First verify the actual owner's acceptance of the replacement and record its evidence. A candidate without that acceptance stays Proposed, and the older Accepted decision remains active. You may draft independent context while acceptance is pending, but do not change the old status or claim supersession. The Accepted example below applies only after that gate is satisfied. Then perform and read back both reciprocal updates; acceptance of the replacement does not prove implementation is complete.

Author the new ADR (call it ADR-025) as a normal Nygard or MADR record. In its header, add a `Supersedes` line after the Status:

```markdown
## Status

Accepted

Supersedes ADR-012
```

In the Context section, briefly explain why the old decision no longer holds:

> ADR-012 chose reusable presigned download links. The project now requires immediate revocation when record ownership changes, so the accepted replacement uses a Worker proxy with current access checks.

### Step 2, Update the superseded ADR

Open the old ADR (ADR-012) and change its Status section:

```markdown
## Status

Superseded by ADR-025
```

Do not modify any other content in the old ADR. The superseded record must remain readable as a historical artifact.

### Step 3, Update the ADR log index

If the project uses `adr-log.md` or a Log4brains `config.yml`, update the entry for ADR-012 to reflect its new status. Log4brains does this automatically when it regenerates the site.

---

## Deprecation (no direct replacement)

Use Deprecated when:
- The feature the decision supported was removed ("we dropped the retired integration adapter, so the ADR for its queue is no longer relevant")
- The decision became moot due to external changes (a third-party service discontinued)
- The technology was retired without a replacement decision recorded (legacy cleanup)

In the deprecated ADR:

```markdown
## Status

Deprecated

Rationale: The retired integration adapter was removed in Q1 2026. This decision no longer applies.
```

---

## Rejection

Use Rejected for a `Proposed` ADR that was explicitly voted down. Always record the rejection rationale:

```markdown
## Status

Rejected

Rationale: The proposal to parse every tool payload into a structured AST for the pre-tool-use gate was rejected in the architecture review on 2025-11-10. Primary objections: parse latency on the dispatch hot path and coupling the gate to every tool's schema. The proposal can be revisited if the string-based gate proves too coarse.
```

A rejected ADR is valuable, it prevents the same proposal from being re-raised without new evidence.

---

## Optional tool-assisted supersession

Plain Markdown edits are the default. An existing separately requested ADR tool may help create the new record or its index, but the installed version's actual behavior must be checked. Never assume a command updates both records, preserves historical content or produces valid links. The [optional tooling guide](05-tooling-integration.md) describes the required boundary. Project Notebook performs only authorized local Markdown writes; no command or configuration change follows from supersession authoring.

---

## Audit checklist

Before closing a supersession:

- [ ] New ADR exists with `Supersedes: ADR-NNNN` in header
- [ ] Old ADR's Status updated to `Superseded by ADR-MMMM`
- [ ] ADR log index (if maintained separately) reflects both statuses
- [ ] Both ADRs reference each other by number
- [ ] New ADR's Context section explains why the old decision no longer holds

## Acceptance, migration and partial failure

Check that the actual owner accepted the replacement and record its evidence. A Proposed replacement does not supersede an Accepted decision. Edit only the old record's status and reciprocal pointer when those specific edits are authorized; retain its historical context, choice, consequences and alternatives. If one write fails or a file is owned by another active worker, stop before dependent work, report the incomplete pair and preserve both states. Do not claim the chain is complete until both files and their relative links have been read back.

Superseding an ADR does not migrate the application. Record affected components, implementation owner, verification criteria and any actual deadline. Separate accepted replacement, implemented change, tested behavior and released behavior in the log. Do not invent a migration deadline from a template or a meeting's date.

## Scale governance to the actual team

Name the actual decision authority and a maintainer for follow-through. A larger team's existing architecture board can provide that authority; a small project can use its named owner. Do not invent a board, approval, quarterly audit or extra bureaucracy. Use a review cadence only when the team chooses it, and recheck affected decisions when source behavior, requirements, contracts or a provider boundary changes. Retired decisions retain the deprecation rationale and historical links.

For a replacement that requires application migration, add these explicit fields to its implementation handoff when applicable: action_required (the concrete change), responsible owner and acceptance evidence, affected components, migration_deadline (the actual approved deadline or UNKNOWN), access/approval prerequisites, rollback/recovery plan and source/runtime verification criteria. Record current implementation and release state separately. A filled deadline field, an accepted replacement or a reviewer comment cannot establish that the required migration occurred.
