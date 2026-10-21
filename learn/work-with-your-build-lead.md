<picture>
  <source media="(prefers-color-scheme: dark)" srcset="../assets/brand/dlag-signature-on-dark-1200.png">
  <img src="../assets/brand/dlag-signature-on-light-1200.png" alt="Develop Like a Girl" width="210">
</picture>

**THE BUILD STUDIO · STARTER KIT**

# Work with your Build Lead

Use the Build Lead when a request needs a clear boundary, several responsibilities, or a sensible next owner. It reads the available context and prepares the handoff. Implementation belongs to a capable caller or the appropriate Specialist.

## Give it a task it can finish defining

A useful request includes the result, relevant files or brief, constraints, and a check. For example:

```text
/dlag-starter-core:build-task Scope the next task from docs/first-version.md: improve
the private-notes empty state. Identify the relevant files and available implementation
Playbook. Preserve data and authentication behavior. Return one handoff with acceptance
checks and unresolved dependencies.
```

The response should name the installed capability that fits, what the task may change, what it depends on, and what evidence will show completion. A reference to a Specialist is not proof that another agent has been launched.

## Use the handoff

Read the proposal and correct its scope. Then request the actual local implementation through the identified builder or Playbook. If you want delegation and the session supports it, say so. If it does not, the caller can follow the Playbook directly and identify that direct use.

For a website task, a handoff might become:

```text
/dlag-starter-website-builder:build-website Implement the accepted handoff above in this
project. Keep it to the stated files and behavior, preserve unrelated work, and report
changed files plus actual check results.
```

## Keep decisions small

Ask for one recommended next task and the reason it comes first. Shared data, identity, or API decisions should be settled before dependent work starts. A short plan with a completed flow is easier to evaluate than several unfinished features.

When you pause, request a handoff naming the current goal, accepted decisions, files changed, checks completed, open questions, and next task. The [task handoff worksheet](worksheets/task-handoff.md) provides a reusable structure.

## When the work drifts

Say: “Return to the accepted task. List what is complete, what is blocked, and the smallest remaining step.” If a new tool, provider, or broader refactor appears, ask why the current outcome needs it before approving the expansion.

**Next:** [Your Project Notebook](your-project-notebook.md). The full [Build Lead Playbook](../plugins/dlag-starter-core/skills/build-lead/SKILL.md) contains the routing procedure.

---

[Learning hub](README.md) · [Kit overview](../README.md)
