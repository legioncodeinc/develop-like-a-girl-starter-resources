# Command lists and a modal palette

Use the project's existing command wrapper. The complete example assumes its local `Command` exports wrap an installed cmdk and its local Dialog is the already selected Radix-backed shadcn family. Inspect these exports and `asChild` support before adapting it. A different family needs its matching local composition API, not an extra dependency.

```tsx
import { useEffect, useRef, useState } from 'react';
import { useNavigate } from 'react-router';
import { Dialog, DialogTrigger, DialogContent, DialogTitle, DialogDescription, DialogClose } from '@/components/ui/dialog';
import { Command, CommandInput, CommandList, CommandEmpty, CommandGroup, CommandItem } from '@/components/ui/command';

export function CommandPalette() {
  const [open, setOpen] = useState(false);
  const trigger = useRef<HTMLButtonElement>(null);
  const previousFocus = useRef<HTMLElement | null>(null);
  const navigate = useNavigate();
  useEffect(() => {
    const onKeyDown = (event: KeyboardEvent) => {
      const target = event.target;
      if (event.defaultPrevented || event.isComposing || event.repeat) return;
      if (target instanceof HTMLElement && (target.isContentEditable || /^(INPUT|TEXTAREA|SELECT)$/.test(target.tagName))) return;
      if (event.key.toLowerCase() === 'k' && (event.metaKey || event.ctrlKey)) {
        event.preventDefault();
        previousFocus.current = document.activeElement instanceof HTMLElement ? document.activeElement : null;
        setOpen(value => !value);
      }
    };
    document.addEventListener('keydown', onKeyDown);
    return () => document.removeEventListener('keydown', onKeyDown);
  }, []);
  function go(path: '/dashboard' | '/settings') {
    setOpen(false);
    navigate(path);
  }
  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger asChild>
        <button ref={trigger} type="button" onClick={() => { previousFocus.current = trigger.current; }}>Open commands</button>
      </DialogTrigger>
      <DialogContent onCloseAutoFocus={event => {
        event.preventDefault();
        const target = previousFocus.current;
        if (target?.isConnected) target.focus(); else trigger.current?.focus();
      }}>
        <DialogTitle>Commands</DialogTitle>
        <DialogDescription>Find a destination, then press Enter to open it.</DialogDescription>
        <DialogClose asChild><button type="button">Close commands</button></DialogClose>
        <Command>
          <CommandInput aria-label="Search commands" placeholder="Search commands..." />
          <CommandList>
            <CommandEmpty>No matching commands.</CommandEmpty>
            <CommandGroup heading="Navigation">
              <CommandItem value="dashboard" onSelect={() => go('/dashboard')}>Dashboard</CommandItem>
              <CommandItem value="settings" onSelect={() => go('/settings')}>Settings</CommandItem>
            </CommandGroup>
          </CommandList>
        </Command>
      </DialogContent>
    </Dialog>
  );
}
```

Mount once in the appropriate existing layout. This custom close-focus callback is only needed for the alternate keyboard trigger; retain the primitive's ordinary default when there is a single trigger. After navigation, the application also needs its existing route-focus policy, which may supply the logical successor instead of returning to a removed old element. The explicit Close control preserves a visible dismissal path; avoid duplicating a visible close button when the local content wrapper already supplies one.

An inline list uses Command/Input/List/Group/Item without a modal wrapper; it does not inherit modal behavior. Preserve built-in Arrow Up/Down selection, Enter activation and dialog Escape cancellation. Inspect actual combobox/listbox naming and selected states in the installed component.

For async results, update search text from the **input's** `onValueChange`; the root Command's value callback describes selected item state. Use `shouldFilter={false}` if the server already filters. Debounce within the existing query layer, abort or discard stale results, and expose loading, error and no-results states separately. Do not show no-results while a request is still pending. Pass a provided search function through the app's existing data boundary; this guide does not create a new endpoint or provider.

A custom local filter can normalize case and return a rank, for example `value.toLowerCase().includes(search.toLowerCase()) ? 1 : 0`. Keep item values stable and distinct from labels. Do not execute arbitrary commands or navigate to a URL supplied by untrusted search data; map approved identifiers to allowed actions.

## Complete asynchronous list adapter

This optional example receives an existing, authorized search function. It adds no endpoint. Its results are already filtered, so cmdk local filtering is disabled. Use the actual local Command exports.

```tsx
import { useEffect, useState } from 'react';
import { Command, CommandInput, CommandList, CommandEmpty, CommandItem } from '@/components/ui/command';
type Result = { id: string; label: string };
type State = { query: string; status: 'idle' | 'loading' | 'ready' | 'error'; results: Result[] };
type Props = {
  search: (query: string, signal: AbortSignal) => Promise<Result[]>;
  onChoose: (id: string) => void;
};
export function AsyncCommands({ search, onChoose }: Props) {
  const [query, setQuery] = useState('');
  const [state, setState] = useState<State>({ query: '', status: 'idle', results: [] });
  useEffect(() => {
    const controller = new AbortController();
    let current = true;
    const normalized = query.trim();
    if (!normalized) {
      setState({ query, status: 'idle', results: [] });
      return () => { current = false; controller.abort(); };
    }
    setState({ query, status: 'loading', results: [] });
    const timer = window.setTimeout(() => {
      void (async () => {
        try {
          const results = await search(normalized, controller.signal);
          if (current) setState({ query, status: 'ready', results });
        } catch {
          if (current && !controller.signal.aborted) setState({ query, status: 'error', results: [] });
        }
      })();
    }, 200);
    return () => { current = false; window.clearTimeout(timer); controller.abort(); };
  }, [query, search]);
  const fresh = state.query === query;
  const loading = query.trim() !== '' && (!fresh || state.status === 'loading');
  return (
    <div>
      <Command shouldFilter={false}>
        <CommandInput aria-label="Search available items" value={query} onValueChange={setQuery} />
        <CommandList aria-busy={loading}>
          {fresh && state.status === 'ready' && state.results.map(item => (
            <CommandItem key={item.id} value={item.id} onSelect={() => onChoose(item.id)}>{item.label}</CommandItem>
          ))}
          {fresh && state.status === 'ready' && state.results.length === 0 ? <CommandEmpty>No matches.</CommandEmpty> : null}
        </CommandList>
      </Command>
      <p role="status">{loading ? 'Searching...' : !query.trim() ? 'Type to search.' : ''}</p>
      {fresh && state.status === 'error' ? <p role="alert">Search failed. Change the query to retry.</p> : null}
    </div>
  );
}
```

Keep `search` referentially stable through the existing query/service layer, otherwise every render can restart the effect. The freshness check prevents stale items from remaining selectable during the render before an effect starts. The source query boundary still validates result shape and identifiers. The 200ms delay is an illustrative query debounce, not a design-system motion duration. Abort is advisory; the current-request flag prevents a late result from overwriting a new search even when the underlying function ignores cancellation.
