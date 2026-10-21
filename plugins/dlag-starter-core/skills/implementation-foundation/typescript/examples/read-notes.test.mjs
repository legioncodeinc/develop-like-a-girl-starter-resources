// Node built-in test example, no third-party dependencies or real data access.
import test from 'node:test';
import assert from 'node:assert/strict';
import {readNotes} from './read-notes.mjs';
const principal=Object.freeze({verified:true,subject:'user_a'});
function fixture(rows=[]) {
  const calls=[];
  return {calls,adapter:{listOwnedNotes:async args=>{calls.push(structuredClone(args));return structuredClone(rows);}}};
}
test('empty IDs return an empty result without querying',async()=>{
  const f=fixture();assert.deepEqual(await readNotes(f.adapter,principal,[]),{items:[],truncated:false});assert.equal(f.calls.length,0);
});
test('one batch deduplicates IDs and forwards the exact bounded owned-read arguments',async()=>{
  const f=fixture([{id:'a',title:'Alpha',owner_id:'user_a'},{id:'b',title:'Beta',owner_id:'user_a'}]);
  assert.deepEqual(await readNotes(f.adapter,principal,['a','b','a']),{items:[{id:'a',title:'Alpha'},{id:'b',title:'Beta'}],truncated:false});
  assert.deepEqual(f.calls,[{subject:'user_a',ids:['a','b'],limit:51}]);
});
test('only the public DTO fields leave the domain function',async()=>{
  const f=fixture([{id:'a',title:'Alpha',owner_id:'user_a',server_secret:'fixture-private',internal_role:'fixture'}]);
  const result=await readNotes(f.adapter,principal,['a']);assert.deepEqual(result.items,[{id:'a',title:'Alpha'}]);assert.equal(JSON.stringify(result).includes('fixture-private'),false);
});
test('malformed and oversized ID collections reject before any query',async()=>{
  const f=fixture();for(const ids of [["a'b"],['%'],[''],[42],Array.from({length:51},()=> 'a')])await assert.rejects(()=>readNotes(f.adapter,principal,ids),/Invalid identifiers/);
  assert.equal(f.calls.length,0);
});
test('unverified principal rejects before querying',async()=>{
  const f=fixture();await assert.rejects(()=>readNotes(f.adapter,{verified:false,subject:'user_a'},['a']),/Principal required/);assert.equal(f.calls.length,0);
});
test('cross-owner rows and unexpected identifiers reject instead of becoming an empty result',async()=>{
  for(const row of [{id:'a',title:'Alpha',owner_id:'user_b'},{id:'b',title:'Beta',owner_id:'user_a'}]){
    const f=fixture([row]);await assert.rejects(()=>readNotes(f.adapter,principal,['a']),/Invalid result/);assert.equal(f.calls.length,1);
  }
});
test('malformed backend shapes reject without silently dropping rows',async()=>{
  for(const rows of [null,{},[{id:'a',title:42,owner_id:'user_a'}],Array.from({length:52},()=>({id:'a',title:'Alpha',owner_id:'user_a'}))]){
    const f=fixture(rows);await assert.rejects(()=>readNotes(f.adapter,principal,['a']),/Invalid result/);
  }
});
test('backend rejection remains visible to the server error boundary',async()=>{
  const failure=new Error('task-created backend failure');let calls=0;
  await assert.rejects(()=>readNotes({listOwnedNotes:async()=>{calls++;throw failure;}},principal,['a']),error=>error===failure);assert.equal(calls,1);
});
