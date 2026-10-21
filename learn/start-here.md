<picture>
  <source media="(prefers-color-scheme: dark)" srcset="../assets/brand/dlag-signature-on-dark-1200.png">
  <img src="../assets/brand/dlag-signature-on-light-1200.png" alt="Develop Like a Girl" width="210">
</picture>

**THE BUILD STUDIO · STARTER KIT**

# Start here

Your first goal is a clear, useful task. You do not need to understand the whole technology stack before you begin.

## Choose a result

Write one sentence: **“I want [person] to be able to [action] so that [result].”** A good first website result might be a visitor understanding a service and sending an inquiry. A good first app result might be a signed-in member saving and reopening a private note.

Keep the first version small enough to describe in a few sentences. Put nice-to-have ideas in a separate list. The [project brief worksheet](worksheets/project-brief.md) helps you capture both without turning every idea into a requirement.

## Know what you are installing

Core contains the shared planning, design, implementation foundations, and review methods. Website Builder adds public-page and content workflows. App Builder adds signed-in workflows and product features. Each builder needs this kit's Core.

A Playbook is the method and its supporting material. A Specialist applies a method within a focused responsibility. The Build Lead helps choose the right work and owner. These names describe how the studio is organized; actual tool access and delegation depend on your Claude Code session.

Starter uses React and React Router on Cloudflare Workers, with Supabase for database and authentication. Website content starts in the project, with no separate CMS required.

## Prepare only what you need now

Have Claude Code and Git available, choose your project folder, and bring your idea or existing files. Add approved logos, colors, and copy when they matter to the task. You can plan before creating hosting accounts or connecting payment services.

[Install and verify](install-and-verify.md), then start a session in your project folder and send:

```text
/dlag-starter-core:get-started My goal is to help a visitor understand my service and
request a conversation. Inspect the current folder and propose one useful first task.
Explain any missing decisions in plain language.
```

## Recognize a useful answer

The response should say what already exists, what the first task would change, and how you will know it works. Unknowns should be called out. If the response jumps straight to a large application, ask it to return to one person, one action, and one observable result.

**Next:** [Your first session](your-first-session.md).

---

[Learning hub](README.md) · [Kit overview](../README.md)
