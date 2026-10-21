<picture>
  <source media="(prefers-color-scheme: dark)" srcset="../../assets/brand/dlag-signature-on-dark-1200.png">
  <img src="../../assets/brand/dlag-signature-on-light-1200.png" alt="Develop Like a Girl" width="210">
</picture>

**THE BUILD STUDIO · STARTER KIT**

# Command reference

These are the **14 public commands** shipped with the Starter Kit. Enter them inside Claude Code, not your terminal. Arguments after the command are your plain-language request. Use the full prefix so the correct kit and plugin are selected.

## Core

### get-started

```text
/dlag-starter-core:get-started
```

Inspect your project and propose a starting point. **Returns:** A setup proposal and one next task; application scaffolding is a separate step. [Command details](../../plugins/dlag-starter-core/commands/get-started.md).

### plan-project

```text
/dlag-starter-core:plan-project
```

Define a useful first version. **Returns:** A draft plan, small tasks, acceptance checks and open decisions. [Command details](../../plugins/dlag-starter-core/commands/plan-project.md).

### review-project

```text
/dlag-starter-core:review-project
```

Create or refresh your Project Notebook. **Returns:** A source-based context draft or documentation drift review. [Command details](../../plugins/dlag-starter-core/commands/review-project.md).

### build-task

```text
/dlag-starter-core:build-task
```

Choose the right owner for one bounded task. **Returns:** A scoped handoff and dependencies; Build Lead remains read-only. [Command details](../../plugins/dlag-starter-core/commands/build-task.md).

### explain-this

```text
/dlag-starter-core:explain-this
```

Understand a file, error or technical decision. **Returns:** A plain-language explanation grounded in the supplied material. [Command details](../../plugins/dlag-starter-core/commands/explain-this.md).

### design-interface

```text
/dlag-starter-core:design-interface
```

Build or refine one interface. **Returns:** Requested local interface files, states and a design explanation. [Command details](../../plugins/dlag-starter-core/commands/design-interface.md).

### design-data

```text
/dlag-starter-core:design-data
```

Define records, ownership and data operations. **Returns:** A data design or requested local draft; hosted migrations require separate approval. [Command details](../../plugins/dlag-starter-core/commands/design-data.md).

### check-dependencies

```text
/dlag-starter-core:check-dependencies
```

Understand dependency and advisory evidence. **Returns:** An inventory or findings based on supplied evidence, not an automatic live scan. [Command details](../../plugins/dlag-starter-core/commands/check-dependencies.md).

### manage-repository

```text
/dlag-starter-core:manage-repository
```

Review repository evidence and Git workflow. **Returns:** A focused recommendation; it does not run Git or change GitHub settings. [Command details](../../plugins/dlag-starter-core/commands/manage-repository.md).

### ready-check

```text
/dlag-starter-core:ready-check
```

Assess a specific change before release. **Returns:** Readiness findings after security, quality, dependency and repository review. [Command details](../../plugins/dlag-starter-core/commands/ready-check.md).

## Website Builder

### build-website

```text
/dlag-starter-website-builder:build-website
```

Implement one website slice. **Returns:** Requested local page/content/form changes and a report of observed checks. [Command details](../../plugins/dlag-starter-website-builder/commands/build-website.md).

## App Builder

### build-app

```text
/dlag-starter-app-builder:build-app
```

Implement one app slice. **Returns:** Requested local app files with permissions and failure states considered. [Command details](../../plugins/dlag-starter-app-builder/commands/build-app.md).

### build-app-search

```text
/dlag-starter-app-builder:build-app-search
```

Add a scoped search experience. **Returns:** Search input, filtering, result and permission boundaries for the chosen source. [Command details](../../plugins/dlag-starter-app-builder/commands/build-app-search.md).

### build-integration

```text
/dlag-starter-app-builder:build-integration
```

Connect one provider operation. **Returns:** A local integration contract and implementation with explicit side-effect boundaries. [Command details](../../plugins/dlag-starter-app-builder/commands/build-integration.md).

## Commands, Playbooks, and tools

A public command selects a workflow. Some bundled Playbooks, such as identity or payments, have no dedicated public command; request them through plain language or ask Build Lead for the appropriate handoff. Read-only reviewers and coordinators do not acquire implementation or shell permissions merely because a command is available.

For copyable requests, open [Prompts](../prompts.md). For terminal installation commands, open [Install and verify](../install-and-verify.md).

---

[Learning hub](../README.md) · [Kit overview](../../README.md)
