# Destructive confirmation with pending and failure states

Use the actual product's local AlertDialog wrapper. This example assumes the already installed Radix-backed shadcn exports below support `asChild` and controlled open state. Feature code imports those local wrappers. The callback is supplied by an authorized application boundary; this UI does not implement deletion, authorization or provider access.

```tsx
import { useRef, useState } from 'react';
import { AlertDialog, AlertDialogTrigger, AlertDialogContent, AlertDialogTitle,
  AlertDialogDescription, AlertDialogCancel, AlertDialogAction } from '@/components/ui/alert-dialog';

type Props = { itemName: string; onConfirm: () => Promise<void> };
export function ConfirmRemoval({ itemName, onConfirm }: Props) {
  const [open, setOpen] = useState(false);
  const [pending, setPending] = useState(false);
  const [error, setError] = useState('');
  const busy = useRef(false);
  async function confirm() {
    if (busy.current) return;
    busy.current = true;
    setPending(true);
    setError('');
    try {
      await onConfirm();
      setOpen(false);
    } catch {
      setError('Removal failed. Nothing has been confirmed. Check the current item before retrying.');
    } finally {
      busy.current = false;
      setPending(false);
    }
  }
  return (
    <AlertDialog open={open} onOpenChange={setOpen}>
      <AlertDialogTrigger asChild><button type="button">Remove {itemName}</button></AlertDialogTrigger>
      <AlertDialogContent>
        <AlertDialogTitle>Remove {itemName}?</AlertDialogTitle>
        <AlertDialogDescription>This removal cannot be undone. Cancel to keep the item.</AlertDialogDescription>
        {pending ? <p role="status">Removal is in progress. Closing this dialog does not cancel the request.</p> : null}
        {error ? <p role="alert">{error}</p> : null}
        <AlertDialogCancel>Cancel</AlertDialogCancel>
        <AlertDialogAction disabled={pending} onClick={event => {
          // Keep the dialog open until the asynchronous operation succeeds.
          event.preventDefault();
          void confirm();
        }}>{pending ? 'Removing...' : 'Confirm removal'}</AlertDialogAction>
      </AlertDialogContent>
    </AlertDialog>
  );
}
```

Focus starts on Cancel according to the installed alert-dialog contract; verify it. Escape and Cancel close safely and never call `confirm`. A pending action cannot be submitted twice from this component, but the server still owns idempotency and race handling. A network error may leave the outcome uncertain, so the error does not claim the item is definitely unchanged.

If successful deletion removes the trigger, the surrounding workflow must focus a logical remaining item or heading. If the component unmounts on route navigation, preserve the application's pending-operation and result policy. Do not turn cancellation into an implicit server rollback.

Observe title/description association, initial focus, Tab/Shift+Tab, Escape, scroll lock, slow/failing callback and focus return. These are expected checks, not already checked boxes. Permanent removal needs prior confirmation; a short-lived Undo toast cannot provide it.
