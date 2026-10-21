# Create the requested Project Notebook

Use only when the user requests local project documentation setup in a named workspace or disposable folder. An inspection request alone produces a draft. Never infer application or provider setup from a notebook request.

1. Identify the exact authorized root and document location. Preserve existing project conventions. In a new disposable project without a convention, use library/knowledge/private/product/ within that named root. Do not write outside it or follow symlinks to another root.
2. Check every destination with Glob/Read before writing. Use [the document set](../templates/document-set.md): project-notebook.md, project-brief.md, decisions.md, tasks.md and evidence.md. Create only documents needed for the request. Existing matching files stay unchanged. Conflicting files get a merge proposal unless the user expressly requested their edit. Never delete, move or rename existing material.
3. Fill each shape from supplied facts. Use the selected edition's function ownership. Preserve unknowns, actual acceptance evidence and unrun checks. Do not include credentials or customer data.
4. Use Write for requested missing Markdown files. Use Edit only for expressly requested existing documentation changes and preserve unrelated text. Do not create application source, manifests, framework files, .env files, configuration, AGENTS.md, scripts or provider resources.
5. Read each saved file back. Verify scope, relative links, decision states and task acceptance cases. Read-back checks prove documentation content only; they do not execute an app or test providers.
6. Report saved paths, preserved conflicts, checks and questions. If writes are unavailable, return completed drafts with proposed paths and explicitly say nothing was saved.
