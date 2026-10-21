# 18: Drag-and-Drop & Animation

Use installed project versions. Code fences are focused examples with project imports identified, not complete applications or executed receipts. Additional packages, tools, provider setup and configuration require the applicable user authorization. Starter uses React Router framework SSR, Cloudflare Workers and Supabase; optional library comparisons do not select a service.


The capacity/bundle/community estimates are comparison heuristics, not measured application results or current license grants. Verify exact installed versions, supported APIs, SSR behavior and licensing before choosing. No provider is selected by this comparison.

## Conditional library comparison

| Use case | Pick | Why |
|---|---|---|
| Drag-and-drop in React, accessible-first | **dnd-kit** | Modern, headless, replaces react-dnd |
| Cross-framework sortable lists | **SortableJS** | Tiny, framework-agnostic |
| Layout & gesture animation in React | **Motion** (Framer Motion) | The motion standard for React |
| Complex timeline / stagger / SVG animation | **GSAP** | Best-in-class for non-React-y motion |
| Embed designer animations | **Lottie** | After Effects → JSON → web |
| Studio-grade multi-property choreography | **Theatre.js** | Visual editor for code-driven animation |
| Smooth list reorders without DnD | **auto-animate** | Drop-in for `useState` list changes |

The defaults: **dnd-kit** for drag-and-drop, **Motion** for animation, **auto-animate** for "I just want list reorders to feel smooth," and **Lottie** when designers ship After Effects assets.

---

## When to choose each

### dnd-kit (the React DnD default)
- Replaces `react-dnd`, which is in maintenance.
- Headless: you bring the visual treatment. Plays nicely with Tailwind / shadcn / Radix.
- Keyboard sensors and live announcements are the relevant primitives. Do not add deprecated aria-grabbed/aria-dropeffect attributes.
- Use for kanban boards, sortable lists, file/tree reordering, drawer/sheet drag handles.

### SortableJS (when React isn't the only client)
- Vanilla JS, framework-agnostic. There's a React wrapper but the library shines outside React.
- Pick it if you're shipping the same DnD UX into a non-React surface (Storybook docs, marketing site, embedded widget).

### Motion / Framer Motion (the React motion default)
- Declarative `<motion.div>` with springs, layout animations, gesture handling, exit animations.
- Use the installed package/API consistently. The example uses motion/react from the motion package; a project using framer-motion needs its matching documented imports.
- Use for page transitions, modal in/out, layout-id shared element transitions, draggable elements with snap.

### GSAP (the heavy lifter)
- Use for complex sequences that React's render cycle resists: multi-step timelines, stagger, scroll-driven animation, SVG morphing.
- Verify current GSAP package/license terms with the owner before adopting; this guide does not establish a license grant.
- Best paired with React via `useGSAP` hook (`@gsap/react`).

### Lottie (designer-authored animation)
- After Effects → Bodymovin export → JSON → render in `lottie-react` or `@lottiefiles/dotlottie-react`.
- Use for hero illustrations, success/empty-state animations, onboarding sequences. Don't use for UI motion (use Motion).
- `dotLottie` is the modern format: smaller, animated, supports interactivity.

### Theatre.js (studio-grade choreography)
- Visual editor for code-driven animations: adjust easings/keyframes in a panel, persist as JSON.
- Use for marketing sites, product launches, branded experiences with multi-property choreography.
- Overkill for in-product UI motion.

### auto-animate (the lazy win)
- One-line drop-in: wrap a parent with `useAutoAnimate()` and child additions/removals/reorders animate.
- Use for `useState`-driven lists where DnD isn't needed but reorders should feel less jarring.

---

## The accessibility floor (non-negotiable)

Drag-and-drop is the single most common source of a11y regressions. The floor:

1. **Keyboard-operable.** Every drag must be doable via keyboard: usually space-to-pick-up, arrows-to-move, space-to-drop, escape-to-cancel. dnd-kit's `KeyboardSensor` handles this.
2. **Live region announcements.** When an item picks up, moves, drops, or cancels, a screen reader hears it. dnd-kit ships an `Announcements` API; provide labels per action (`onDragStart`, `onDragOver`, `onDragEnd`, `onDragCancel`).
3. **`aria-grabbed` is deprecated.** Modern guidance is to manage focus and live region text instead. dnd-kit does this for you. Don't add `aria-grabbed` manually.
4. **Reduced-motion respect.** `@media (prefers-reduced-motion: reduce)` must disable layout animations and DnD-induced motion. Motion supports this via `useReducedMotion()`. GSAP via `gsap.matchMedia()`.
5. **Touch targets ≥ 44×44 px** for drag handles on touch devices.

Verify actual keyboard and live-announcement behavior. The example uses DndContext accessibility.announcements, not a separate invented provider.

---

## Starter (dnd-kit sortable list with announcements)

```tsx
import {
  DndContext,
  KeyboardSensor,
  PointerSensor,
  closestCenter,
  useSensor,
  useSensors,
  type DragEndEvent,
} from '@dnd-kit/core';
import {
  SortableContext,
  arrayMove,
  sortableKeyboardCoordinates,
  useSortable,
  verticalListSortingStrategy,
} from '@dnd-kit/sortable';
import { CSS } from '@dnd-kit/utilities';
import { useEffect, useState } from 'react';

function useReducedDragMotion() {
  const [reduce, setReduce] = useState(false); // deterministic initial SSR/client render
  useEffect(() => {
    const media = window.matchMedia('(prefers-reduced-motion: reduce)');
    const update = () => setReduce(media.matches); update();
    media.addEventListener('change', update);
    return () => media.removeEventListener('change', update);
  }, []);
  return reduce;
}
function Item({ id }: { id: string }) {
  const reduce = useReducedDragMotion();
  const { attributes, listeners, setNodeRef, setActivatorNodeRef, transform, transition } = useSortable({ id });
  return (
    <li
      ref={setNodeRef}
      style={{ transform: CSS.Transform.toString(transform), transition: reduce ? undefined : transition }}
    >
      <button type="button" ref={setActivatorNodeRef} {...attributes} {...listeners}
        aria-label={`Move item ${id}`} style={{ minWidth: 44, minHeight: 44 }}>{id}</button>
    </li>
  );
}

export function SortableList() {
  const [items, setItems] = useState(['a', 'b', 'c', 'd']);
  const sensors = useSensors(
    useSensor(PointerSensor),
    useSensor(KeyboardSensor, { coordinateGetter: sortableKeyboardCoordinates }),
  );

  return (
    <DndContext
      sensors={sensors}
      collisionDetection={closestCenter}
      accessibility={{
        announcements: {
          onDragStart: ({ active }) => `Picked up ${active.id}.`,
          onDragOver: ({ active, over }) =>
            over ? `${active.id} is over ${over.id}.` : `${active.id} is no longer over a droppable.`,
          onDragEnd: ({ active, over }) =>
            over ? `${active.id} dropped on ${over.id}.` : `${active.id} dropped.`,
          onDragCancel: ({ active }) => `Dropping ${active.id} was cancelled.`,
        },
      }}
      onDragEnd={({ active, over }: DragEndEvent) => {
        if (!over || active.id === over.id) return;
        setItems((cur) => arrayMove(cur, cur.indexOf(String(active.id)), cur.indexOf(String(over.id))));
      }}
    >
      <SortableContext items={items} strategy={verticalListSortingStrategy}>
        <ul>
          {items.map((id) => (
            <Item key={id} id={id} />
          ))}
        </ul>
      </SortableContext>
    </DndContext>
  );
}
```

## Starter (Motion, layout animation with reduced-motion respect)

```tsx
import { motion, useReducedMotion } from 'motion/react';

export function FadeUp({ children }: { children: React.ReactNode }) {
  const reduce = useReducedMotion();
  return (
    <motion.div
      initial={reduce ? false : { opacity: 0, y: 12 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: reduce ? 0 : 0.25, ease: 'easeOut' }}
    >
      {children}
    </motion.div>
  );
}
```

---

## Choice tree

1. **You need drag-and-drop** → dnd-kit (with announcements + keyboard sensor; that's the floor).
2. **You need a sortable in non-React surfaces too** → SortableJS.
3. **You need layout / page / micro-interaction motion in React** → Motion.
4. **You need scroll-driven, timeline, or SVG-heavy motion** → GSAP.
5. **Designer ships an After Effects animation** → Lottie (dotLottie format).
6. **You just want list reorders to feel smooth, no DnD** → auto-animate.
7. **Studio-grade branded experience** → Theatre.js.

---

## Common findings

> **[Must-fix]** `src/features/board/KanbanBoard.tsx:1`: `react-dnd` in use; no keyboard sensor; no live announcements. Migrate to dnd-kit and provide the `accessibility.announcements` props. See this guide §a11y-floor.

> **[Must-fix]** `src/components/Modal.tsx:5`: Motion fade-and-slide ignores `prefers-reduced-motion`. Wrap with `useReducedMotion`.

> **[Should-refactor]** `src/lottie/welcome.json`: 1.4 MB Lottie file. Re-export as dotLottie or split into smaller animations; cite bundle impact.

---

## Handoffs

- **Motion tokens (durations, easings, distances) and motion-design intent** → `Design Foundation`. Durations and easings live in tokens, not magic numbers.
- **Custom-built interactive canvas / 3D scenes** → React Three Fiber territory; outside this guide.
- **Performance impact of layout animations under load** → [guides/07-performance.md](07-performance.md) + Profiler trace.
