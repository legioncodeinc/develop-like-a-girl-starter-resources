/** Domain example. The caller owns real Supabase session/RLS/client implementation.
 * listOwnedNotes must enforce the verified principal and pass IDs through typed
 * client parameters, never SQL interpolation. This function supplies no auth adapter. */
export async function readNotes(adapter, principal, ids) {
  if (!principal || principal.verified!==true || typeof principal.subject!=='string' || !/^[A-Za-z0-9_-]{1,80}$/.test(principal.subject)) throw new Error('Principal required');
  if (!Array.isArray(ids) || ids.length>50 || ids.some(id=>typeof id!=='string'||!/^[A-Za-z0-9_-]{1,80}$/.test(id))) throw new Error('Invalid identifiers');
  const selected=[...new Set(ids)];if(!selected.length)return {items:[],truncated:false};
  const rows=await adapter.listOwnedNotes({subject:principal.subject,ids:selected,limit:51});
  if(!Array.isArray(rows)||rows.length>51)throw new Error('Invalid result');
  const allowed=new Set(selected),items=[];
  for(const row of rows){
    if(!row||typeof row!=='object'||!allowed.has(row.id)||typeof row.title!=='string'||row.title.length>120||row.owner_id!==principal.subject)throw new Error('Invalid result');
    items.push({id:row.id,title:row.title});
  }
  return {items:items.slice(0,50),truncated:items.length>50};
}
