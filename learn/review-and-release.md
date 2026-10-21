<picture>
  <source media="(prefers-color-scheme: dark)" srcset="../assets/brand/dlag-signature-on-dark-1200.png">
  <img src="../assets/brand/dlag-signature-on-light-1200.png" alt="Develop Like a Girl" width="210">
</picture>

**THE BUILD STUDIO · STARTER KIT**

# Review and release

A release decision needs an accepted scope, the actual changed files, and evidence that the required behavior works. The Ready Check organizes that evidence for your decision.

## 1. Collect the candidate

Identify the version being reviewed and include all relevant staged, unstaged, and untracked changes. Supply the accepted brief, changed paths, actual test or build results, browser observations, and known gaps. Use the [release checklist](worksheets/release-checklist.md) to collect them.

Read-only review roles cannot run shell commands or collect live provider evidence for you. A caller with the right tools and authorization must perform the required checks and supply the results. A proposed command is not a passing result.

## 2. Review in the right order

Security review comes first, followed by quality review against the same candidate and accepted requirements. Dependency and repository evidence are also considered. Resolve blocking findings before continuing through the sequence. If fixes change the candidate, refresh the reviews and checks affected by those changes.

Useful evidence includes the successful user flow, invalid-input and permission failures, relevant automated checks, and actual browser observations. Choose checks that matter to the change. A documentation edit and a payment flow do not need identical verification.

## 3. Request the Ready Check

Send:

```text
/dlag-starter-core:ready-check Assess the supplied candidate against the accepted brief.
Include the complete change inventory and attached check results. Review security before
quality, then dependency and repository evidence. Report blocking findings, missing
proof, and whether this exact change is ready for owner review. Do not publish or
deploy.
```

Expected verdicts include **BLOCKED**, **INCOMPLETE**, or **READY FOR OWNER REVIEW IN THE STATED SCOPE**. A ready verdict requires applicable reviews and required checks to be complete with no blocking findings. Missing or mismatched evidence remains a gap.

## 4. Make the release decision

Review the findings and confirm the target environment, owner, rollback approach, and any remaining limitations. Explicitly authorize the specific external action when you want it performed. A successful Ready Check is not permission to commit, push, change provider settings, send messages, charge cards, or deploy.

For the actual release, use the project's established process with a capable, authorized operator. Confirm the result at the target after deployment and record the version and observed behavior. Update the Project Notebook with what was actually released.

## If the answer is blocked

Ask for the smallest missing piece of evidence or correction. Supply it, then rerun only the reviews and checks whose inputs or coverage changed. Do not relabel an earlier result as a fresh pass.

**Next:** [Your Project Notebook](your-project-notebook.md). The bundled [Ready Check procedure](../plugins/dlag-starter-core/skills/ready-check/guides/procedure.md) explains the full assessment.

---

[Learning hub](README.md) · [Kit overview](../README.md)
