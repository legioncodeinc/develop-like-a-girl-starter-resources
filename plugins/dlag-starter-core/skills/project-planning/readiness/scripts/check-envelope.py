#!/usr/bin/env python3
"""Check local guide links and encoded readiness cases, not learner competence.

Run after assembly. Optional --support-root supplies an authoring shared-resource
view; it is not needed by a complete installed package. No source archive is read.
"""
import argparse
import json
from pathlib import Path
import re

parser=argparse.ArgumentParser(description=__doc__)
parser.add_argument('--support-root',type=Path)
args=parser.parse_args()
base=Path(__file__).resolve().parents[1]
assembly_root=base.parents[2]
count=0
for path in base.rglob('*.md'):
    if path.name in {'LICENSE.md','THIRD-PARTY-NOTICES.md'}:continue
    text=path.read_text();assert chr(0x2014) not in text,str(path)
    for target in re.findall(r'\[[^\]]*\]\(([^)]+)\)',text):
        if '://' in target or target.startswith('#'):continue
        resolved=(path.parent/target.split('#')[0]).resolve()
        found=resolved.exists()
        if not found and args.support_root:
            try:relative=resolved.relative_to(assembly_root)
            except ValueError:relative=None
            found=relative is not None and (args.support_root/relative).exists()
        assert found,f'{path}: {target}'
        count+=1
for case in json.loads((base/'references/examples/readiness-fixtures.json').read_text()):
    errors=[]
    if case['material_unknowns']:
        if case['status']!='blocked':errors.append('material unknowns concealed')
    elif len(case['recommendations'])!=1:errors.append('one scoped recommendation required')
    if case['understanding']!='pending':errors.append('no learner response supports understanding')
    if case['implemented']:errors.append('advice is not implementation')
    result='REVISE' if errors else 'PASS';assert result==case['expected'],case['id']
    print(f"{case['id']}: {result}; {', '.join(errors) or 'encoded advisory boundary preserved'}")
print(f'PASS: {count} local links and 3 encoded readiness cases. No learner or runtime qualification.')
