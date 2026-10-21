<picture>
  <source media="(prefers-color-scheme: dark)" srcset="../assets/brand/dlag-signature-on-dark-1200.png">
  <img src="../assets/brand/dlag-signature-on-light-1200.png" alt="Develop Like a Girl" width="210">
</picture>

**THE BUILD STUDIO · STARTER KIT**

# Improve an existing project

Make one useful change while preserving the decisions and work already in the repository.

**You need:** Core installed, access to the project, and a concrete problem or desired result. Add the matching builder if the change needs it. Start Claude Code in the actual project folder.

## 1. Understand before editing

Send:

```text
/dlag-starter-core:get-started Inspect this existing project for a focused improvement.
My goal is to make the contact form's errors clearer. Identify the current framework,
relevant files, existing tests, and any uncommitted work from the evidence available.
Propose a small change. Keep it in chat for now.
```

If the project uses a different stack from this kit, ask for a compatibility assessment before implementation. A stack mismatch is a decision to resolve, not a reason to migrate the project automatically.

## 2. Name the boundary

State which screen or flow may change and which behavior must stay the same. Supply the error, reproduction steps, or a screenshot when helpful. Ask the studio to distinguish the observed problem from its hypothesis about the cause.

```text
Limit this task to the existing contact form's validation messages and focus behavior.
Preserve its fields, submission endpoint, styling direction, and unrelated changes.
Propose the affected files and checks before implementation.
```

## 3. Implement with the appropriate owner

Once you accept the proposal, use `/dlag-starter-core:design-interface` for a focused interface change, `/dlag-starter-website-builder:build-website` for a website slice, or `/dlag-starter-app-builder:build-app` for an app slice. Include the accepted scope in the request. If the right owner is unclear, use `/dlag-starter-core:build-task` to prepare the handoff.

## 4. Compare before and after

Reproduce the original problem and check the intended improvement. Also check the neighboring behavior you asked to preserve. Review the actual diff, including any untracked files, before deciding the change is ready. Ask for unrun checks to remain explicitly pending.

## Keep the context current

Use `/dlag-starter-core:review-project` to identify any Project Notebook details that now differ from the implementation. Request a specific documentation update when needed. Preserve existing documentation conventions and history.

**Next:** [Review and release](review-and-release.md). If the change stalls, bring its exact failure to [Troubleshooting](troubleshooting.md).

---

[Learning hub](README.md) · [Kit overview](../README.md)
