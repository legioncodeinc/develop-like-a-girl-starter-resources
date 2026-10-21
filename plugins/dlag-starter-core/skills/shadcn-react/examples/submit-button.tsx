// Example assumes this project already exports a standard React Button here.
// Confirm the alias and prop API before using it. This is not registry source.
import { Button } from "@/components/ui/button";

type Props = { pending: boolean; label?: string };
export function SubmitButton({ pending, label = "Save changes" }: Props) {
  return (
    <Button type="submit" disabled={pending} aria-busy={pending}>
      {pending ? "Saving changes..." : label}
    </Button>
  );
}
