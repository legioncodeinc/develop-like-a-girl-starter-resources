# 14: Forms & Validation (extended)

Use installed project versions. Code fences are focused examples with project imports identified, not complete applications or executed receipts. Additional packages, tools, provider setup and configuration require the applicable user authorization. Starter uses React Router framework SSR, Cloudflare Workers and Supabase; optional library comparisons do not select a service.


The capacity/bundle/community estimates are comparison heuristics, not measured application results or current license grants. Verify exact installed versions, supported APIs, SSR behavior and licensing before choosing. No provider is selected by this comparison.

## Conditional library comparison

| Project shape | Form lib | Schema lib | Why |
|---|---|---|---|
| Complex client field lifecycle in React18/19 | **React Hook Form**, if installed | **Zod** | Performance, ergonomics, ecosystem |
| Bundle-sensitive (edge / mobile-web) | RHF | **Valibot** | ~10x smaller than Zod, similar API |
| Cross-framework (React + Solid + Vue) | **TanStack Form** | Zod or Valibot | Same form code across frameworks |
| Progressive enhancement (forms work without JS) | **Conform** + RHF or alone | Zod | Built for route actions; no-JS-friendly |
| You need a hosted survey/feedback product | Unselected survey product | n/a | Decide explicitly before adoption |

Native router Form/action is valid for ordinary forms. Complex client field lifecycles can use an existing compatible form/schema library; the comparisons below preserve the reasons for choosing among them.

---

## When to choose each

### React Hook Form (complex installed client forms)
- React-only project, you want the largest ecosystem of resolvers / DevTools / examples.
- Uncontrolled inputs by default: keystroke renders only the touched field.
- Pairs with `@hookform/resolvers/zod` (or `/valibot`, `/yup`, `/joi`, `/arktype`).

### TanStack Form (when "framework-agnostic" matters)
- You ship the same form to a React app and a Solid/Vue surface (rare but real for component libraries).
- Type inference is sharper than RHF's because TanStack Form is built type-first.
- Trade-off: smaller ecosystem, fewer Stack Overflow answers, more code-by-hand.

### Conform (progressive enhancement is non-negotiable)
- The form must submit and show errors with JS disabled (government, healthcare, accessibility-mandated surfaces).
- Built around the platform `<form>`, FormData, and route actions.
- Layers cleanly with React 19 `useActionState`. Use it *with* Zod, not instead of it.

### Formbricks (don't author, embed)
- You want an in-app NPS / CSAT / feature-feedback survey, not a CRUD form.
- Self-hosted OSS alternative to Typeform + Hotjar surveys.
- Out of scope for the Form Layer: flag it and route to product.

---

## Schema library choice (Zod vs Valibot)

Zod and Valibot have near-identical mental models. The difference is bundle.

| | Zod | Valibot |
|---|---|---|
| Bundle (gzipped, typical schema) | ~12 KB | ~1.5 KB |
| API style | Method chaining (`z.string().email()`) | Functional pipes (`pipe(string(), email())`) |
| Type inference | Excellent | Excellent |
| Ecosystem | Massive (default everywhere) | Growing fast in 2026 |
| Standard Schema spec | Yes | Yes |

**Pick Zod by default.** Pick Valibot when bundle budget bites: usually edge-runtime endpoints, mobile web, or component libraries that ship a schema.

Both implement the [Standard Schema](https://standardschema.dev/) spec, so RHF / TanStack Form / Conform accept either with the right resolver. Migration is mechanical but tedious: don't migrate without a measured bundle win.

---

## Conform with a framework route action

When Conform is already installed and approved, preserve native method="post" behavior. The browser and server share a pure schema, not a server module import. Persisting/sending is deliberately outside this validation-only example and needs actual ownership, abuse and delivery controls.

```tsx
// app/routes/contact.tsx; installed Conform/Zod versions must match this API.
import { Form, data, useActionData, useNavigation } from 'react-router';
import { useForm, getFormProps, getInputProps, getTextareaProps } from '@conform-to/react';
import { parseWithZod } from '@conform-to/zod';
import { z } from 'zod';
const ContactSchema = z.object({ email: z.string().email(), message: z.string().min(10).max(1000) });
export async function action({ request }: { request: Request }) {
  // Validate origin/content-type/body size through the application's existing boundary.
  const submission = parseWithZod(await request.formData(), { schema: ContactSchema });
  if (submission.status !== 'success') return data(submission.reply(), { status: 400 });
  // No write or email occurs in this validation-only example.
  return submission.reply();
}
export default function Contact() {
  const lastResult = useActionData<typeof action>();
  const navigation = useNavigation();
  const [form, fields] = useForm({ lastResult,
    onValidate: ({ formData }) => parseWithZod(formData, { schema: ContactSchema }),
    shouldValidate: 'onBlur' });
  return <Form method="post" {...getFormProps(form)}>
    <label htmlFor={fields.email.id}>Email</label>
    <input {...getInputProps(fields.email, { type: 'email' })} />
    <p role="alert">{fields.email.errors}</p>
    <label htmlFor={fields.message.id}>Message</label>
    <textarea {...getTextareaProps(fields.message)} />
    <p role="alert">{fields.message.errors}</p>
    <button disabled={navigation.state !== 'idle'}>Validate</button>
  </Form>;
}
```



The same `ContactSchema` validates on the server (security) and on the client (UX): the canonical "validate at the boundary twice" pattern from [guides/06-forms.md](06-forms.md).

---

## Choice tree

1. **Are you on a framework route action and care about no-JS?** → Conform + Zod.
2. **Cross-framework component library shipping forms?** → TanStack Form + Zod (or Valibot).
3. **Bundle budget is biting?** → RHF + Valibot (or TanStack Form + Valibot).
4. **Ordinary route form** → native router Form/action. **Complex installed client form** → RHF + an existing compatible schema resolver. (See [guides/06-forms.md](06-forms.md).)

A hosted survey is a separate product decision. Starter selects no survey service; record the requirement through Project Notebook before any service adoption.

---

## Common findings

> **[Should-refactor]** `package.json:31`: `yup` listed alongside `zod`. Converge on Zod. See [guides/06-forms.md §share-schemas](06-forms.md).

> **[Should-refactor]** `apps/edge-fn/src/validate.ts:1`: Zod schema imported into an edge function bundle. Measure bundle; if Zod is the dominant cost, swap to Valibot. See this guide §schema-library-choice.

> **[Must-fix]** `app/contact/actions.ts:5`: route action accepts FormData without parsing. Add `parseWithZod` (Conform) or `safeParse` (raw Zod). See [guides/11-server-components.md §server-actions](11-server-components.md).

---

## Handoffs

- **Visual / token decisions on form fields** → `Design Foundation`.
- **route action security review (auth, RBAC, CSRF posture)** → `Security Review`.
- **Survey product strategy (Formbricks vs Typeform vs build)** → `Project Notebook` PRD.
