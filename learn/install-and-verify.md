<picture>
  <source media="(prefers-color-scheme: dark)" srcset="../assets/brand/dlag-signature-on-dark-1200.png">
  <img src="../assets/brand/dlag-signature-on-light-1200.png" alt="Develop Like a Girl" width="210">
</picture>

**THE BUILD STUDIO · STARTER KIT**

# Install and verify your kit

By the end, Core and your selected builder will be available in a Claude Code session opened in your own project folder.

## Before you begin

Use the [official Claude Code setup guide](https://code.claude.com/docs/en/setup) if you have not installed and signed into Claude Code. Have Git available for the GitHub marketplace. You can check both from your terminal:

```bash
claude --version
git --version
```

Both should print a version. If either command is missing, complete that tool's setup before continuing. The examples below use the terminal installation route. Claude Code also has a plugin panel; its current options are documented in [Install and manage plugins](https://code.claude.com/docs/en/discover-plugins).

## 1. Add the marketplace and install Core

Run in your terminal:

```bash
claude plugin marketplace add https://github.com/legioncodeinc/develop-like-a-girl-starter-resources.git
claude plugin install dlag-starter-core@dlag-starter
```

Adding a marketplace makes its plugins discoverable. Installing Core loads the shared foundation. The default user installation makes it available to you across projects; use the plugin panel if you need a different installation scope.

## 2. Install your builder

For public pages, service websites, content, or inquiry forms:

```bash
claude plugin install dlag-starter-website-builder@dlag-starter
```

For signed-in workflows, data screens, onboarding, search, or integrations:

```bash
claude plugin install dlag-starter-app-builder@dlag-starter
```

You can install both. Keep Core installed and enabled alongside either builder.

## 3. Open your own project

Open a terminal in the folder containing your project. For a new project, create and open an empty folder using your usual file manager. Then launch:

```bash
claude
```

You do not need to clone this marketplace to use it. Avoid building inside its `plugins/` directory. This repository distributes the kit; your project has its own files.

## 4. Confirm availability

Inside Claude Code, enter:

```text
/plugin
```

Confirm `dlag-starter-core` and your chosen builder appear as installed and enabled. Then send:

```text
/dlag-starter-core:get-started Inspect this folder and propose a first task. Keep the
proposal in chat.
```

A useful result describes the current folder and recommends a next task. It is a setup proposal, not a newly built app. If the command is unavailable, start a fresh session in the project folder and check the plugin panel again. Keep the full `dlag-starter-core:` prefix.

## If installation stops

For a repository or network error, check the exact URL and your connection. If an organization manages your Claude Code installation, ask its administrator whether this marketplace is allowed. Do not paste access tokens into a prompt or issue. [Troubleshooting](troubleshooting.md) has the next checks.

**Next:** [Your first session](your-first-session.md).

---

[Learning hub](README.md) · [Kit overview](../README.md)
