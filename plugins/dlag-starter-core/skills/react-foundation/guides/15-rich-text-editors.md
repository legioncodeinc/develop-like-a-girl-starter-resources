# 15: Rich Text & Block Editors

Use installed project versions. Code fences are focused examples with project imports identified, not complete applications or executed receipts. Additional packages, tools, provider setup and configuration require the applicable user authorization. Starter uses React Router framework SSR, Cloudflare Workers and Supabase; optional library comparisons do not select a service.


The capacity/bundle/community estimates are comparison heuristics, not measured application results or current license grants. Verify exact installed versions, supported APIs, SSR behavior and licensing before choosing. No provider is selected by this comparison.

## Conditional library comparison

| Project shape | Pick | Why |
|---|---|---|
| Notion-like block editor, fastest start | **BlockNote** | Notion UX out of the box, built on TipTap |
| Notion-like with custom blocks / branding | **TipTap** | The leader; commercial Cloud for collab |
| Meta-scale apps, accessibility floor mandatory | **Lexical** | Powers Facebook, Instagram, Threads |
| Slate already in the codebase, want plugins | **Plate.js** | Best-in-class Slate plugin set |
| Engine-level control, you'll build the UI | **ProseMirror** | What TipTap is built on |
| Want AI completions out of the box | **Novel.sh** | TipTap + Vercel AI SDK preset |
| Yoopta/notion-clone vibe with less lock-in | **Yoopta-Editor** | Modular, zero-lock-in alternative |

If an editor is explicitly requested, evaluate: **BlockNote** if you want Notion UX, **TipTap** if you'll customize blocks, **Lexical** if accessibility and reliability at scale dominate.

---

## When to choose each

### BlockNote (the easiest path to Notion UX)
- You want slash commands, drag-and-drop blocks, and a familiar Notion feel without designing the editor surface.
- Wraps TipTap with a polished React UI, sensible defaults, and a JSON document format.
- Trade-off: opinionated. If you need a deeply custom block system, drop down to TipTap.

### TipTap (the Notion-style leader)
- You'll author custom blocks, marks, and node-views.
- Headless React API; you bring the UI primitives (toolbar, slash menu).
- Commercial **TipTap Cloud** adds collaboration, comments, AI, and document storage. This is an unselected service; collaboration needs an explicit architecture/provider decision.

### Lexical (Meta's editor)
- You're building consumer-scale text input (comments, posts, DMs) where reliability and accessibility cannot wobble.
- Excellent screen-reader support; immutable editor state; predictable performance.
- Steeper learning curve than TipTap; smaller plugin ecosystem.

### Plate.js (Slate, batteries included)
- You inherited a Slate codebase or want the Slate data model with a curated plugin set (mentions, tables, code blocks, AI).
- React-first; ships with a starter UI built on shadcn primitives.
- Trade-off: Slate's maintenance cadence is slower than ProseMirror's.

### ProseMirror (the engine)
- You'll build a domain-specific editor (legal contracts, scientific papers, code-and-prose hybrids) where you need every transaction and schema rule to be yours.
- Library, not a framework. Expect to write a lot.
- 90% of teams who think they want ProseMirror want TipTap.

### Novel.sh (AI completions out of the box)
- TipTap-based editor with Vercel AI SDK pre-wired (streamed completions, slash-command AI actions).
- Use it as inspiration / a starting point, not a long-term lock-in. Fork it.

### Yoopta-Editor (the modular alternative)
- Notion-like UX with a plugin architecture that's lighter than TipTap's.
- Smaller community; evaluate maintenance cadence before adopting.

---

## Decision axes

1. **Collaboration?** TipTap (with Cloud or self-hosted Yjs) and Lexical lead. BlockNote inherits TipTap's collab. Plate has Yjs support. ProseMirror requires assembly.
2. **AI completions?** No provider or model call is selected by this guide. Preserve editor document/export contracts and record a separate requested integration decision. Novel is a comparison reference, not a default.
3. **Mobile / RN?** Lexical has the best mobile story (Meta uses it on iOS/Android web views). TipTap works but the touch UX needs love.
4. **Document portability?** Markdown export: TipTap, BlockNote, Plate are mature. JSON-as-source-of-truth: all of them. Round-tripping rich content through Markdown lossily is a common foot-gun.
5. **A11y floor?** Lexical > TipTap >= BlockNote > Plate >= ProseMirror (depends on you) > Novel.

---

## Optional installed TipTap example

```tsx
import { useEditor, EditorContent } from '@tiptap/react';
import StarterKit from '@tiptap/starter-kit';
import Placeholder from '@tiptap/extension-placeholder';

export function Editor({
  initial,
  onChange,
}: {
  initial?: string;
  onChange: (html: string) => void;
}) {
  const editor = useEditor({
    extensions: [
      StarterKit,
      Placeholder.configure({ placeholder: 'Start writing…' }),
    ],
    content: initial ?? '',
    immediatelyRender: false, // SSR-safe in React 19 / React Router framework SSR
    onUpdate: ({ editor }) => onChange(editor.getHTML()),
  });

  return <EditorContent editor={editor} />;
}
```

Persist as JSON (`editor.getJSON()`), not HTML, when round-trip fidelity matters. HTML is fine for read-only render but lossy for nested marks.

## Optional installed BlockNote browser component

```tsx
import '@blocknote/mantine/style.css';
import { useCreateBlockNote } from '@blocknote/react';
import { BlockNoteView } from '@blocknote/mantine';

export function NotionLikeEditor() {
  const editor = useCreateBlockNote();
  return <BlockNoteView editor={editor} />;
}
```

This code belongs in a browser-only integration loaded after hydration using the existing framework client-module/dynamic loading boundary if the package evaluates browser globals. Keep an SSR-safe placeholder before mount. Test keyboard/accessibility behavior and cleanup; this does not establish a complete editor or persistence.

---

## Choice tree

1. **You want Notion UX with the least work.** → BlockNote.
2. **You want Notion UX but will customize blocks heavily.** → TipTap.
3. **You're at consumer scale and a11y/reliability floor matters.** → Lexical.
4. **You inherited Slate or want Slate's data model with a curated plugin set.** → Plate.js.
5. **You'll author a domain-specific editor and own the schema completely.** → ProseMirror.
6. **AI completions requested.** Record the separate runtime, identity, data and spend decision before selecting an adapter.

---

## Common findings

> **[Should-refactor]** `src/features/notes/Editor.tsx:1`: uses `react-quill`. Quill is in maintenance; document model is brittle. Migrate to TipTap or BlockNote depending on Notion-likeness needed.

> **[Must-fix]** `src/features/posts/render.tsx:5`: renders editor HTML without a reviewed sanitizer. Validate editor JSON and allowlisted extensions server-side; do not assume JSON or an editor renderer automatically prevents unsafe URLs/HTML. Use a correctly configured sanitization pipeline for untrusted HTML. See [guides/13-ecosystem-catalog.md §markdown](13-ecosystem-catalog.md).

> **[Should-refactor]** `package.json:24`: both `@tiptap/react` and `slate-react` present. Converge on one editor stack. Mixed editors leak into the export pipeline and the AI prompt format.

---

## Handoffs

- **Realtime collaboration infra (Yjs server, Liveblocks, PartyKit)** → flag for `Cloudflare Platform` or Project Notebook PRD.
- **Token / typography / spacing of the editor surface** → `Design Foundation`.
- **AI completions inside the editor** → `the owner for an explicitly requested AI integration`.
- **Server-side sanitization of editor HTML/JSON** → `Security Review`.
