<picture>
  <source media="(prefers-color-scheme: dark)" srcset="../assets/brand/dlag-signature-on-dark-1200.png">
  <img src="../assets/brand/dlag-signature-on-light-1200.png" alt="Develop Like a Girl" width="210">
</picture>

**THE BUILD STUDIO · STARTER KIT**

# Build an app

Start with one complete user action, such as signing in, creating a private note, and reopening it. That gives you a small product flow you can test before adding more features.

**You need:** Core and App Builder installed, an accepted brief, a project folder, and a decision about who owns each record. Use the [project brief worksheet](worksheets/project-brief.md) if those decisions are still scattered.

## 1. Define the first flow

Name the actor, input, saved result, and who may see or change it. Include the empty screen, invalid input, denied access, loading state, and failed request. Decide which data can be sample data while you are building.

Send:

```text
/dlag-starter-core:plan-project Plan a small private-notes app. A signed-in person can
create, list, and reopen their own notes. Define ownership and the main success,
invalid-input, signed-out, and denied-access cases. Keep sharing, billing, uploads, and
AI features deferred. Save the draft to docs/first-version.md, preserving existing
files.
```

## 2. Set the data and identity boundary

Starter uses Supabase authentication and PostgreSQL records, with server request checks and row-level ownership policies. Cloudflare Workers handles the app server boundary. A signed-in interface alone does not protect another person’s records.

Use `/dlag-starter-core:design-data` for a local data design and draft. Applying a migration or configuring a hosted service is a separate step. If the app is new, agree on the required framework and dependency setup before expecting the local files to run.

## 3. Implement the accepted slice

After accepting the brief, send:

```text
/dlag-starter-app-builder:build-app Implement the accepted private-notes slice from
docs/first-version.md in this project. Follow the existing stack and conventions.
Include empty, invalid, signed-out, denied, and failed states. Keep provider credentials
as placeholders. Report saved files, observed checks, and untested behavior.
```

Use [Build Lead](work-with-your-build-lead.md) when you need help splitting the task or choosing an implementation owner. The App Builder owns the app slice; Build Lead coordinates the handoff.

## 4. Check ownership, not just appearance

Verify the successful flow with an agreed test account. Then verify that a signed-out visitor cannot read protected data and one user cannot read or update another user's record. Check direct server requests as well as the interface. A mocked demonstration is useful but does not establish that live database permissions work.

## 5. Add the next feature deliberately

The App Builder also includes data interfaces, onboarding, search, provider integrations, and optional Stripe payments. Use [the command reference](reference/commands.md) for search and integration entry points. Ask for the named Playbook for domains without their own command.

The payments material uses Stripe-hosted Checkout. Keep billing out of the first flow unless payment is essential to the product. Real charges, provider configuration, messages, and deployment need an explicit decision.

**Next:** [Review and release](review-and-release.md). Detailed recipes live in the bundled [App Builder Playbook](../plugins/dlag-starter-app-builder/skills/app-builder/SKILL.md).

---

[Learning hub](README.md) · [Kit overview](../README.md)
