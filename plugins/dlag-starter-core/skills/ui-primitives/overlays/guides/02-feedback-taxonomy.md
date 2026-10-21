# Four feedback patterns

Choose by the user's need before choosing a component.

| Pattern | Use | Lifetime and action |
|---|---|---|
| Ephemeral result | Saved, copied, reversible archive | Quiet nonblocking feedback; no mandatory response |
| Confirmation | Irreversible deletion, overwrite, consequential decision | Stays until an explicit decision; cancellation is safe |
| Contextual panel | Filters, details, supplemental task | User opens/closes; modality follows the actual requirement |
| Persistent notification | Important failure, background job status, event history | Information remains available when a toast is missed |

Field validation belongs by the field with its label/error associations. A failure blocking a task needs an enduring visible location. A toast may supplement it, but even an infinite-duration toast can be dismissed and is not a durable record. A full notification center is not created merely by selecting a toast package.

A normal success announcement should not interrupt the user or move focus. A quiet live region can use `role="status"`. Reserve assertive alerts for urgent asynchronous changes. `alertdialog` is a dialog role, not a synonym for an ARIA live-region `alert`. Do not assume a particular toast method's role from its name; inspect the installed toaster's rendered accessibility behavior.

A toast with Undo is useful for a genuinely reversible operation. Await the operation before reporting success, handle failed undo, keep the action keyboard reachable and provide adequate time. A visible archive/recovery route should remain after the toast disappears. If expiration makes the action irrecoverable, require an appropriate prior confirmation instead of relying on the toast.

Common failures and corrections:

- A delete toast appears only after irreversible deletion: use a prior confirmation and clear consequence text.
- A modal asks users to acknowledge every successful save: use a polite result or inline status.
- An upload failure disappears while the user is reading elsewhere: retain the failure beside the task and a retry action.
- A pending promise produces a success toast immediately: await completion; suppress duplicate submissions.
- A toast action points at a stale item or state: capture the correct stable item identifier and handle the server result.

The [complete undo example](../examples/feedback-with-undo.md) covers pending, success and both archive/restore failures. Important errors stay in the page; the notification is supplemental. No event needs a new provider or external notification service.
