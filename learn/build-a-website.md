<picture>
  <source media="(prefers-color-scheme: dark)" srcset="../assets/brand/dlag-signature-on-dark-1200.png">
  <img src="../assets/brand/dlag-signature-on-light-1200.png" alt="Develop Like a Girl" width="210">
</picture>

**THE BUILD STUDIO · STARTER KIT**

# Build a website

Use this workflow to produce one useful public page or website feature with a clear result you can review.

**You need:** Core and Website Builder installed, a project folder, an accepted first task, and any approved brand assets or content. [Your first session](your-first-session.md) helps create the brief.

## 1. Agree on the visitor's next action

Name the visitor, what they need to understand, and the action they should take. Gather your logo, preferred colors, key facts, and examples you like. Mark missing copy as draft. Do not ask the builder to invent testimonials, customer logos, prices, or business claims.

## 2. Check the project foundation

The website uses React Router framework SSR with React and Vite on Cloudflare Workers. Start with content maintained in the project. Supabase, R2, and Resend are added when the accepted feature needs data, uploads, or transactional messages.

If the folder is empty, ask for a setup proposal naming the required framework files, dependencies, and commands. Approve the necessary setup before expecting a runnable preview. The builder can author local files; command execution and dependency installation depend on the tools and approval in your session.

## 3. Request one local slice

Send inside Claude Code:

```text
/dlag-starter-website-builder:build-website Use the accepted brief in
docs/first-version.md. Implement the first public page in this project using the
existing design direction. Include responsive layout, keyboard access, and an honest
contact action. Preserve unrelated files. Report changed paths, checks actually run, and
anything still needed for a local preview.
```

When the page works, request the next slice separately. For an inquiry form, define required fields, validation, a success state, and a failure state. Specify where submissions go and whether any real email sending has been authorized.

## 4. Review the experience

Open the local preview when the project can run. Check a narrow phone layout, desktop layout, keyboard navigation, readable text, image loading, and the main action. For a form, try missing and invalid values, a valid submission in the agreed test environment, and a failed request. Record the actual outcomes.

Also check that the first server response contains the intended public content and that form handling uses the Worker server boundary. A browser-only screen is not proof of server-rendered behavior.

## If you get stuck

A missing Core capability usually means Core is not installed or enabled. An unrendered page may need framework setup or dependencies, not another redesign. Bring the exact error and the relevant file to [Explain This](reference/commands.md), then address the smallest cause.

**Next:** [Review and release](review-and-release.md). For deeper procedures, open the bundled [Website Builder Playbook](../plugins/dlag-starter-website-builder/skills/website-builder/SKILL.md).

---

[Learning hub](README.md) · [Kit overview](../README.md)
