/** Public validation endpoint. No auth, persistence, provider, or secret access. */
export async function readSmallJson(request, maxBytes = 4096) {
  if (!Number.isInteger(maxBytes) || maxBytes < 1 || maxBytes > 4096) throw new Error('Invalid bound');
  if (!/^application\/json(?:\s*;|$)/i.test(request.headers.get('content-type') ?? '')) return {ok:false,code:'CONTENT_TYPE'};
  if (!request.body) return {ok:false,code:'INVALID_JSON'};
  const reader=request.body.getReader(), parts=[];let size=0;
  try {
    while(true) {const {done,value}=await reader.read();if(done)break;size+=value.byteLength;if(size>maxBytes){await reader.cancel();return {ok:false,code:'BODY_LIMIT'};}parts.push(value);}
    const bytes=new Uint8Array(size);let offset=0;for(const part of parts){bytes.set(part,offset);offset+=part.length;}
    let input;try{input=JSON.parse(new TextDecoder('utf-8',{fatal:true}).decode(bytes));}catch{return {ok:false,code:'INVALID_JSON'};}
    if (!input || typeof input!=='object' || Array.isArray(input) || Object.keys(input).some(k=>k!=='title') || typeof input.title!=='string' || input.title.trim().length<1 || input.title.length>120) return {ok:false,code:'INVALID_TITLE'};
    return {ok:true,value:{title:input.title.trim()}};
  } catch {return {ok:false,code:'BODY_READ_FAILED'};} finally {reader.releaseLock();}
}
export async function handlePublicValidation(request) {
  if(request.method!=='POST')return Response.json({code:'METHOD_NOT_ALLOWED'},{status:405,headers:{Allow:'POST','Cache-Control':'no-store'}});
  const parsed=await readSmallJson(request);
  if(!parsed.ok)return Response.json({code:parsed.code},{status:parsed.code==='BODY_LIMIT'?413:parsed.code==='CONTENT_TYPE'?415:400,headers:{'Cache-Control':'no-store'}});
  return Response.json({valid:true},{headers:{'Cache-Control':'no-store'}});
}
