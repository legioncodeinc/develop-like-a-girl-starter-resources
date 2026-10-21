// Inert example. completedIds must come from verified owner-scoped server state.
export function progress(steps, completedIds) {
  const known = [...new Set(steps.map(step => step.id))];
  const completed = new Set(completedIds);
  const count = known.filter(id => completed.has(id)).length;
  return { count, total: known.length, label: `${count} of ${known.length} complete` };
}
