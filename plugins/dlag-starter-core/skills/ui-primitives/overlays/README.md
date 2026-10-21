# Dialogs, drawers, feedback and command menus

Use this route for confirmation, supplemental panels, transient results, command search, broken focus or overlay stacking. Inspect the installed local wrappers and primitive family first. A Radix `asChild` recipe is conditional on a Radix-backed wrapper; do not paste it into a different family's API.

| Task | Resource |
|---|---|
| Choose the existing component | [Selection](guides/00-selection.md) |
| Focus, Escape, semantics and scroll | [Modal contract](guides/01-modal-contract.md) |
| Toast, confirmation, panel or history | [Feedback taxonomy](guides/02-feedback-taxonomy.md) |
| Portals, themes and nested layers | [Layering](guides/03-layering.md) |
| Existing Vaul drawers | [Drawer patterns](guides/04-drawers.md) |
| Existing cmdk/shadcn command menu | [Command patterns](guides/05-command-menu.md) |
| Pending/error/destructive confirmation | [Complete confirmation example](examples/confirmation.md) |
| Reversible archive and failed undo | [Complete feedback example](examples/feedback-with-undo.md) |
| Review record | [Overlay audit](templates/overlay-audit.md) |

Use the existing focus and scroll machinery; do not invent a trap. Keep design/motion values in the product tokens. A confirmation UI does not provide server authorization, CSRF protection or exactly-once execution. A persistent notification history requires an actual data model and separately requested implementation. Save a requested review at the project's documentation location as `YYYY-MM-DD-overlay-review.md` when no convention exists.
