<picture>
  <source media="(prefers-color-scheme: dark)" srcset="../assets/brand/dlag-signature-on-dark-1200.png">
  <img src="../assets/brand/dlag-signature-on-light-1200.png" alt="Develop Like a Girl" width="210">
</picture>

**THE BUILD STUDIO · STARTER KIT**

# Troubleshooting

Start with the exact symptom and the smallest relevant check. Keep the command, plugin name, and full error available; remove private values before sharing.

| What you see | What to check | What to do next |
| --- | --- | --- |
| `claude` is not found | Whether Claude Code is installed and available in your terminal. | Follow the [official setup guide](https://code.claude.com/docs/en/setup), open a fresh terminal, and check `claude --version`. |
| Marketplace cannot be added | Exact repository URL, connection, Git availability, and organization policy. | Compare the URL with [Install and verify](install-and-verify.md); keep the original error if it still fails. |
| Repository not found or access denied | The repository URL and any authentication or network restriction in your environment. | Confirm the URL and connection before changing credentials or settings. |
| A command is missing | Plugin installed, enabled, and available in this session. | Open `/plugin`, confirm Core and the chosen builder, then start a fresh session. |
| A builder says Core is missing | The matching `dlag-starter-core` installation. | Install and enable this kit’s Core explicitly. |
| Slash command is rejected by the terminal | Whether you entered a session command at a shell prompt. | Launch `claude` in your project, then enter the slash command there. |
| A plan appears but no file exists | Whether you requested saving to a named path and the caller has write tools. | Request the precise Markdown destination; ask for the actual saved path. |
| Build Lead returns a handoff instead of code | The task used the coordination workflow. | Send the accepted handoff to the appropriate implementation builder or Playbook. |
| A local file exists but the app will not run | Missing framework setup, dependencies, or an actual error. | Supply the relevant error and project manifest; approve only the setup the task needs. |
| Ready Check is incomplete | Missing candidate identity, check results, or required review evidence. | Supply the named gap for the same version of the work. |
| A Specialist cannot be dispatched | Available delegation tools and installed role registration. | Ask the caller to use the bundled Playbook directly and state that direct use. |

## Bring a useful problem report

Include the kit and plugin name, command, Claude Code version, expected result, actual result, and minimal reproduction. For application errors, include the relevant file and error text. Describe checks as run or unrun. Avoid sharing `.env` files, tokens, payment details, or private user records.

```text
/dlag-starter-core:explain-this Explain this error using the supplied command, error
text, and relevant file. Separate what the evidence proves from likely causes. Recommend
one next check before changing anything.
```

## When the task keeps expanding

Restate the accepted outcome and ask for what is complete, what is blocked, and one next step. If the same attempt keeps failing, stop repeating it and inspect the new evidence. A tool limitation should be reported directly; changing the claim from “untested” to “working” does not solve it.

## Update carefully

Use Claude Code's plugin management controls for updates and enablement. Follow the current [plugin management documentation](https://code.claude.com/docs/en/discover-plugins) for your installed version. Keep the prior plugin version and error when investigating a regression.

**Next:** Return to [Install and verify](install-and-verify.md) or the [learning hub](README.md).

---

[Learning hub](README.md) · [Kit overview](../README.md)
