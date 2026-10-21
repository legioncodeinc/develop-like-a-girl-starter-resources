# Reversible archive with an enduring error location

Prerequisites: the app already uses Sonner through its product notification wrapper and has a persistent archive view from which items can be restored later. Keep one existing Toaster, with the current theme and token mapping. Do not add another system.

```ts
// ui/notifications.ts: local adapter, only when Sonner is already selected.
import { toast } from 'sonner';
export function archiveNotice(label: string, restore: () => void) {
  toast(`${label} archived`, {
    description: 'You can also restore it from the archive.',
    action: { label: 'Undo', onClick: restore },
    duration: 8000,
  });
}
export function restoredNotice() { toast.success('Item restored'); }
```

```tsx
// components/ArchiveButton.tsx: imports the product adapter, not the vendor.
import { useRef, useState } from 'react';
import { archiveNotice, restoredNotice } from '../ui/notifications';
type Props = {
  itemId: string;
  itemName: string;
  archive: (id: string) => Promise<void>;
  restore: (id: string) => Promise<void>;
};
export function ArchiveButton({ itemId, itemName, archive, restore }: Props) {
  const [pending, setPending] = useState(false);
  const [error, setError] = useState('');
  const busy = useRef(false);
  async function run(operation: 'archive' | 'restore') {
    if (busy.current) return;
    busy.current = true;
    setPending(true);
    setError('');
    try {
      if (operation === 'archive') {
        await archive(itemId);
        archiveNotice(itemName, () => { void run('restore'); });
      } else {
        await restore(itemId);
        restoredNotice();
      }
    } catch {
      setError(operation === 'archive'
        ? 'Could not confirm archive. Check the item and try again.'
        : 'Could not confirm restore. Open the archive and retry there.');
    } finally {
      busy.current = false;
      setPending(false);
    }
  }
  return (
    <div>
      <button type="button" disabled={pending} onClick={() => { void run('archive'); }}>
        {pending ? 'Working...' : `Archive ${itemName}`}
      </button>
      {error ? <p role="alert">{error}</p> : null}
    </div>
  );
}
```

The containing surface must remain mounted while this example owns error state. If archiving removes the row, lift operation/error state and notifications into a stable parent or the existing mutation layer before using this pattern. The restore callback must retain the original stable item ID; do not reuse a stale row for another item.

Eight seconds here is illustrative, not an accessibility guarantee. Check keyboard access, dismissal, timing needs and a durable recovery path. Do not move focus to the toast. If a modal is active, keep essential errors inside its active scope. Verify the installed toaster's live-region behavior instead of assuming success and error methods assign specific roles.

A persistent toast can supplement a failure with an explicit retry, but the page still needs an enduring error location. Never announce success before its promise resolves or infer server success from a local click.
