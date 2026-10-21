// Contract illustration only. Match the installed generated Route type location.
// Requires an existing React Router framework route named notes and generated types.
import type { Route } from './+types/notes';
// TypeScript cannot establish that this safe DTO was authorized. The application's
// actual server loader must produce it after session, membership and ownership checks.
export type NotesView = Readonly<{ items: ReadonlyArray<{ id: string; title: string }> }>;
export function NotesSummary({loaderData}: Route.ComponentProps) {
  // Application route return inference must supply this shape. No assertion here.
  return loaderData.items.length;
}
