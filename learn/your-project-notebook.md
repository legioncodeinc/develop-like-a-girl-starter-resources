<picture>
  <source media="(prefers-color-scheme: dark)" srcset="../assets/brand/dlag-signature-on-dark-1200.png">
  <img src="../assets/brand/dlag-signature-on-light-1200.png" alt="Develop Like a Girl" width="210">
</picture>

**THE BUILD STUDIO · STARTER KIT**

# Your Project Notebook

The Project Notebook keeps the facts your next session needs: who the product serves, what you accepted, how the system works, and what is still unfinished. Start with the smallest set of documents that makes those facts easy to find.

## Start with one brief

For a project without an existing convention, request one file in a named location:

```text
/dlag-starter-core:review-project Draft a Project Notebook brief from this project's
actual files and our accepted decisions. Save it to docs/project-brief.md. Include the
goal, current stack, first-version scope, open decisions, and sources for important
facts. Preserve existing files; if that destination already exists, propose the update
first.
```

The default workflow can return a draft in chat. Naming the file and requesting a save makes the intended write explicit. Confirm the reported path and read the saved result. Do not treat an unsaved response as a persistent notebook.

## Preserve the project's structure

If the project already keeps documentation in `docs/`, `library/`, or another location, use that convention. The studio name does not require renaming folders. Projects already using the bundled notebook schema can use its [document locations](../plugins/dlag-starter-core/skills/project-notebook/references/locations.md). You do not need to create that full tree for a small project.

Keep project facts, future work, decisions, and verification results distinguishable. A planned feature should not be described as implemented. A file that was written should not be described as tested until the relevant check has actually run. Keep credentials and private customer records out of the notebook.

## Record decisions while they are fresh

For a meaningful choice, capture the decision, reason, alternatives that mattered, owner, and date. For example: “Use a contact link for the first release; defer automated inquiries until someone owns the inbox.” A short decision record can prevent several sessions of repeated debate.

## Refresh after a useful change

Send:

```text
/dlag-starter-core:review-project Compare docs/project-brief.md with the current
implementation and the supplied check results. Identify stale statements and missing
decisions. Propose a focused update without changing unrelated documents.
```

Accept the proposed edit or request the exact revision you want. Keep evidence tied to the version it describes. If the project uses `library/notes/` for human notes, leave that area under human control.

## Restart without retelling everything

At the next session, provide the brief and latest task handoff. Ask for the current state and one next action. A good notebook helps the studio resume from facts instead of assumptions.

**Next:** [Review and release](review-and-release.md). Use the editable [project brief](worksheets/project-brief.md) as a starting point.

---

[Learning hub](README.md) · [Kit overview](../README.md)
