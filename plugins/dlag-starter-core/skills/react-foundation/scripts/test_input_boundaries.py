"""Synthetic local input-boundary tests only; no ts-morph import or project execution."""
import json, os, pathlib, subprocess, tempfile, unittest
SCRIPTS=pathlib.Path(__file__).resolve().parent
class Inputs(unittest.TestCase):
 def setUp(self):
  self.tmp=tempfile.TemporaryDirectory();self.addCleanup(self.tmp.cleanup);self.root=pathlib.Path(self.tmp.name).resolve();self.build=self.root/'build';self.build.mkdir()
 def node(self,code,*args):return subprocess.run(['node','--input-type=module','-e',code,*map(str,args)],capture_output=True,text=True,timeout=3)
 def read(self,path,cap=64):
  code="import {inputRoot,readBounded} from "+json.dumps((SCRIPTS/'safe-input.mjs').as_uri())+";try {const root=await inputRoot(process.argv[1]);const b=await readBounded(root,process.argv[2],Number(process.argv[3]));console.log(b.length);}catch{console.log('REFUSED');process.exitCode=2;}"
  return self.node(code,self.build,path,cap)
 def test_regular(self):(self.build/'x.js').write_text('hello');self.assertEqual(self.read('x.js').stdout.strip(),'5')
 def test_oversize(self):(self.build/'x.js').write_text('x'*65);self.assertEqual(self.read('x.js').returncode,2)
 def test_symlink(self):(self.root/'outside.js').write_text('SYNTHETIC_SECRET');(self.build/'x.js').symlink_to(self.root/'outside.js');self.assertEqual(self.read('x.js').returncode,2)
 def test_hardlink(self):(self.root/'outside.js').write_text('SYNTHETIC_SECRET');os.link(self.root/'outside.js',self.build/'x.js');self.assertEqual(self.read('x.js').returncode,2)
 def test_fifo(self):os.mkfifo(self.build/'x.js');self.assertEqual(self.read('x.js').returncode,2)
 def test_traversal(self):(self.root/'outside.js').write_text('SYNTHETIC_SECRET');self.assertEqual(self.read('../outside.js').returncode,2)
 def test_parent_symlink(self):(self.build/'linked').symlink_to(self.root,target_is_directory=True);self.assertEqual(self.read('linked/outside.js').returncode,2)
 def test_private(self):(self.build/'.env').write_text('SYNTHETIC_SECRET');self.assertEqual(self.read('.env').returncode,2)
 def audit(self,package):
  (self.build/'package.json').write_text(json.dumps(package));return subprocess.run(['node',str(SCRIPTS/'react-version-audit.ts')],cwd=self.build,capture_output=True,text=True,timeout=3)
 def test_manifest_redaction(self):
  p=self.audit({'name':'SYNTHETIC_MANIFEST_SECRET','dependencies':{'react':'git+https://user:SYNTHETIC_MANIFEST_SECRET@example.invalid/repo','vite':'https://user:SYNTHETIC_MANIFEST_SECRET@example.invalid/pkg'}});self.assertEqual(p.returncode,0);self.assertNotIn('SYNTHETIC_MANIFEST_SECRET',p.stdout+p.stderr)
 def test_framework_redaction(self):
  p=self.audit({'dependencies':{'react':'19.1.0','vite':'https://user:SYNTHETIC_MANIFEST_SECRET@example.invalid/pkg','zustand':'file:/SYNTHETIC_MANIFEST_SECRET','zod':'npm:private:SYNTHETIC_MANIFEST_SECRET'}});self.assertEqual(p.returncode,0);self.assertNotIn('SYNTHETIC_MANIFEST_SECRET',p.stdout+p.stderr)
 def test_canonical_version(self):
  p=self.audit({'name':'SYNTHETIC_MANIFEST_SECRET','dependencies':{'react':'19.1.0-rc.1+build.2','vite':'^6.1.0-beta.1+build.3'}});self.assertEqual(p.returncode,0);self.assertIn('19.1.0 (prerelease/build metadata omitted)',p.stdout);self.assertIn('^6.1.0 (prerelease/build metadata omitted)',p.stdout);self.assertNotIn('SYNTHETIC_MANIFEST_SECRET',p.stdout+p.stderr)
 def test_version_metadata_redacted(self):
  p=self.audit({'dependencies':{'react':'19.1.0+SYNTHETIC_MANIFEST_SECRET','vite':'6.1.0-SYNTHETIC_MANIFEST_SECRET'}});self.assertEqual(p.returncode,0);self.assertNotIn('SYNTHETIC_MANIFEST_SECRET',p.stdout+p.stderr)
 def test_version_major_and_unknown(self):
  for value,expected in [('^19.1.1','React 19 idioms apply'),('~18.3.1','React 18'),('>=18','UNVERIFIED'),('workspace:*','UNVERIFIED')]:
   p=self.audit({'dependencies':{'react':value}});self.assertEqual(p.returncode,0);self.assertIn(expected,p.stdout);self.assertNotIn('- Enabled. Good.',p.stdout)
 def test_package_fifo(self):
  os.mkfifo(self.build/'package.json');p=subprocess.run(['node',str(SCRIPTS/'react-version-audit.ts')],cwd=self.build,capture_output=True,text=True,timeout=3);self.assertEqual(p.returncode,2)
 def test_bundle_manifest_fifo(self):
  os.mkfifo(self.build/'manifest.json');p=subprocess.run(['node',str(SCRIPTS/'bundle-budget-check.ts'),str(self.build),str(self.build/'manifest.json'),'entry'],capture_output=True,text=True,timeout=3);self.assertEqual(p.returncode,2)
 def bundle(self,manifest):
  (self.build/'manifest.json').write_text(json.dumps(manifest));return subprocess.run(['node',str(SCRIPTS/'bundle-budget-check.ts'),str(self.build),str(self.build/'manifest.json'),'entry'],capture_output=True,text=True,timeout=3)
 def test_bundle_asset_fifo(self):
  os.mkfifo(self.build/'asset.js');self.assertEqual(self.bundle({'entry':{'isEntry':True,'file':'asset.js'}}).returncode,2)
 def test_bundle_asset_hardlink(self):
  (self.root/'outside.js').write_text('SYNTHETIC_SECRET');os.link(self.root/'outside.js',self.build/'asset.js');p=self.bundle({'entry':{'isEntry':True,'file':'asset.js'}});self.assertEqual(p.returncode,2);self.assertNotIn('SYNTHETIC_SECRET',p.stdout+p.stderr)
 def test_bundle_outside_manifest(self):
  (self.root/'manifest.json').write_text('{}');p=subprocess.run(['node',str(SCRIPTS/'bundle-budget-check.ts'),str(self.build),str(self.root/'manifest.json'),'entry'],capture_output=True,text=True,timeout=3);self.assertEqual(p.returncode,2)
 def test_package_oversize(self):
  (self.build/'package.json').write_text(' '* (256*1024+1));p=subprocess.run(['node',str(SCRIPTS/'react-version-audit.ts')],cwd=self.build,capture_output=True,text=True,timeout=3);self.assertEqual(p.returncode,2)
 def test_malformed_package_no_echo(self):
  (self.build/'package.json').write_text('SYNTHETIC_MANIFEST_SECRET');p=subprocess.run(['node',str(SCRIPTS/'react-version-audit.ts')],cwd=self.build,capture_output=True,text=True,timeout=3);self.assertEqual(p.returncode,2);self.assertNotIn('SYNTHETIC_MANIFEST_SECRET',p.stdout+p.stderr)
 def root_result(self,path):
  code="import {inputRoot} from "+json.dumps((SCRIPTS/'safe-input.mjs').as_uri())+";try{await inputRoot(process.argv[1]);console.log('ACCEPTED');}catch{console.log('REFUSED');process.exitCode=2;}";return self.node(code,path)
 def test_human_notes_root(self):
  p=self.root/'library'/'notes';p.mkdir(parents=True);self.assertEqual(self.root_result(p).returncode,2)
 def test_human_notes_child(self):
  p=self.build/'library'/'notes';p.mkdir(parents=True);(p/'x.js').write_text('SYNTHETIC_SECRET');self.assertEqual(self.read('library/notes/x.js').returncode,2)
 def test_dev_vars(self):
  (self.build/'.dev.vars').write_text('SYNTHETIC_SECRET');self.assertEqual(self.read('.dev.vars').returncode,2)
 def test_credential_store_root(self):
  p=self.root/'credential-store';p.mkdir();self.assertEqual(self.root_result(p).returncode,2)
 def test_root_ancestor_symlink(self):
  (self.root/'alias').symlink_to(self.build,target_is_directory=True);(self.build/'src').mkdir();self.assertEqual(self.root_result(self.root/'alias'/'src').returncode,2)
 def test_technical_private_root(self):
  p=self.root/'src'/'private';p.mkdir(parents=True);self.assertEqual(self.root_result(p).returncode,0)
 def test_knowledge_private_root(self):
  p=self.root/'library'/'knowledge'/'private';p.mkdir(parents=True);self.assertEqual(self.root_result(p).returncode,0)
 def test_source_scope(self):
  (self.build/'good.ts').write_text("import '../outside.ts'; const x=1;");(self.build/'.env').write_text('SYNTHETIC_SECRET');(self.root/'outside.ts').write_text('SYNTHETIC_SECRET')
  code="import {inputRoot,sourceInputs} from "+json.dumps((SCRIPTS/'safe-input.mjs').as_uri())+";const r=await sourceInputs(await inputRoot(process.argv[1]));console.log(JSON.stringify(r.map(x=>x.name)));";p=self.node(code,self.build);self.assertEqual(p.returncode,0);self.assertEqual(json.loads(p.stdout),['good.ts']);self.assertNotIn('SYNTHETIC_SECRET',p.stdout+p.stderr)
 def test_source_file_count(self):
  for i in range(257):(self.build/f'{i}.ts').write_text('x')
  code="import {inputRoot,sourceInputs} from "+json.dumps((SCRIPTS/'safe-input.mjs').as_uri())+";try{await sourceInputs(await inputRoot(process.argv[1]));process.exitCode=1;}catch{console.log('REFUSED');}";self.assertEqual(self.node(code,self.build).returncode,0)
if __name__=='__main__':unittest.main()
