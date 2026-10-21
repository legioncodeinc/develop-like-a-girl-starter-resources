/** Node-only caller adapter. Importing this module does not read inputs. */
import {scanPacket} from './heuristics.mjs';
function checkDepth(text) {let depth=0,quoted=false,escape=false;for(const c of text){if(quoted){if(escape)escape=false;else if(c==='\\')escape=true;else if(c==='"')quoted=false;}else if(c==='"')quoted=true;else if(c==='{'||c==='['){if(++depth>32)throw new Error('Input nesting');}else if(c==='}'||c===']'){if(--depth<0)throw new Error('Input nesting');}}if(quoted||depth!==0)throw new Error('Invalid input');}
export async function run(mode) {
  let timer;
  try {
    const args = process.argv.slice(2); let packet;
    if ((args.length === 2 || (args.length === 4 && args[2] === '--context' && ['bundler','node','worker'].includes(args[3]))) && args[0] === '--root') {
      // Reviewed packaged sibling dependency, no original-source dependency.
      const {inputRoot,sourceInputs} = await import('../../../react-foundation/scripts/safe-input.mjs');
      const sources = await Promise.race([(async()=>{const root = await inputRoot(args[1]);return sourceInputs(root);})(),new Promise((_,reject)=>{timer=setTimeout(()=>reject(new Error('Input deadline')),5000);})]);
      clearTimeout(timer);
      if (sources.some(s=>s.text.includes('\uFFFD'))) throw new Error('Source encoding refused');
      sources.sort((a,b)=>a.name<b.name?-1:a.name>b.name?1:0);
      packet = {context:args[3] ?? 'bundler',sources:sources.map(s=>({text:s.text}))};
    } else if (args.length === 0) {
      const chunks = []; let size = 0;
      await Promise.race([(async()=>{for await (const part of process.stdin) {size += part.length;if(size > 12*1024*1024)throw new Error('Input bytes exceeded');chunks.push(part);}})(),new Promise((_,reject)=>{timer=setTimeout(()=>reject(new Error('Input deadline')),5000);})]);
      clearTimeout(timer);
      const text=new TextDecoder('utf-8',{fatal:true}).decode(Buffer.concat(chunks));checkDepth(text);packet=JSON.parse(text);
    } else throw new Error('Invalid arguments');
    const result=scanPacket(mode,packet);process.stdout.write(JSON.stringify(result)+'\n');process.exitCode=result.findings.length?1:0;
  } catch {
    // Never echo filenames, raw source, arbitrary manifest fields or exceptions.
    process.stderr.write('Input or scan refused; no clean result established.\n',()=>process.exit(2));process.exitCode=2;
  } finally {clearTimeout(timer);process.stdin.destroy();}
}
