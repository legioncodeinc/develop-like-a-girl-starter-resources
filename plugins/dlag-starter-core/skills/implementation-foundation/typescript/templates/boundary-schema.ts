// Dependency-free type guard. Choose the existing project validator where appropriate.
export type PublicNote = Readonly<{ id: string; title: string }>;
export type ParseNotes = {ok:true;items:PublicNote[]} | {ok:false;code:'INVALID_ROWS'};
export function parseNotes(input:unknown):ParseNotes {
  if(!Array.isArray(input)||input.length>50)return {ok:false,code:'INVALID_ROWS'};
  const items:PublicNote[]=[];
  for(const row of input){
    if(!row||typeof row!=='object'||!('id' in row)||!('title' in row)||typeof row.id!=='string'||!/^[A-Za-z0-9_-]{1,80}$/.test(row.id)||typeof row.title!=='string'||row.title.length>120)return {ok:false,code:'INVALID_ROWS'};
    items.push({id:row.id,title:row.title});
  }
  return {ok:true,items};
}
