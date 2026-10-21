# Project documentation locations

Preserve the existing project's conventions. The Build Studio name Project Notebook does not rename library/ or authorize a documentation migration.

For a project already using Project Notebook Schema v2, propose these locations:

| Draft | Proposed destination |
| --- | --- |
| Initial project context | library/knowledge/private/product/project-brief.md |
| Internal system explanation | library/knowledge/private/[domain]/[topic].md |
| User guide | library/knowledge/public/guides/[topic].md |
| Decision record | library/knowledge/private/architecture/ADR-[next-number]-[topic].md |
| Planned feature | library/requirements/backlog/prd-[next-number]-[topic]/ |

Before proposing a number, inspect all existing relevant lifecycle folders. PRD numbers are local sequential numbers; issue document numbers must match an actual supplied GitHub issue. If the inventory is incomplete, leave the number unassigned. Do not invent issue numbers or create formal requirements from an unaccepted idea.

Keep planned, active and completed work distinct. Any requested lifecycle move is a separate file operation requiring authorization and available tools. QA report content belongs to the review workflow. Shared contract terms require their accepted owner and exact revision; flag a missing agreement before parallel implementation.

Never write or propose automated updates to library/notes/, which is for the human. Never edit a derived documentation mirror. Older library/knowledge-base/, library/architecture/, library/requirements/features/, library/requirements/issues/ and library/qa/ paths are legacy: report them only and leave migration outside this review.

For a new project without a convention, present the completed context draft in chat and propose one private context file. Use the named destination when the user requested saving it; ask only when the destination is unresolved. No path in this reference independently grants permission to write.
