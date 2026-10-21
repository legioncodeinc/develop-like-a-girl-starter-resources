---
ai_description: |
  HUMAN-ONLY junk drawer. Agents MUST NOT read from, write to, create
  files in, or reference files in this folder for any purpose.
  If you want to capture something persistent, write to
  library/knowledge/private/<domain>/<slug>.md instead.
  This invariant is absolute and has no exceptions.
human_description: |
  Unstructured scratch space for humans. Agents do not touch this folder.
  Put anything here: rough notes, links, half-formed ideas, meeting notes.
  Nothing in notes/ is authoritative or maintained.
  For persistent reference, move content to knowledge/private/ when it matures.
---

<!-- Optional documentation template: preserve the receiving repository's existing schema. The default Starter Notebook location remains library/knowledge/private/product/. This role creates only expressly requested missing Markdown files; lifecycle moves, issue creation, publication and generated binary packets remain proposals for separately authorized work. Audience-document export is not supplied by this Playbook. -->

# Notes

Human-only scratch space. Agents never read or write here.

Put rough notes, links, and half-formed ideas here. Nothing here is authoritative.

When a note matures into reference material, move it to `knowledge/private/<domain>/`.
