"""Restore publicly published Wix media and verify their archived checksums."""
from pathlib import Path
import concurrent.futures,hashlib,json,urllib.request
ROOT=Path('web-estate/legacy-wix')
m=json.loads((ROOT/'PUBLIC-CONTENT-MANIFEST.json').read_text())
def restore(item):
 p=ROOT/item['file']
 if p.exists() and hashlib.sha256(p.read_bytes()).hexdigest()==item['sha256']:return
 if not item['url'].startswith('https://static.wixstatic.com/media/'):
  raise ValueError('Unexpected media source')
 with urllib.request.urlopen(item['url'],timeout=90) as r:b=r.read()
 if hashlib.sha256(b).hexdigest()!=item['sha256']:raise ValueError('Media checksum changed: '+item['file'])
 p.parent.mkdir(parents=True,exist_ok=True);p.write_bytes(b)
with concurrent.futures.ThreadPoolExecutor(max_workers=4) as ex:list(ex.map(restore,m['assets']))
for item in m['pages']+m['assets']:
 assert hashlib.sha256((ROOT/item['file']).read_bytes()).hexdigest()==item['sha256'],item['file']
print('Preserved and verified',len(m['pages']),'pages and',len(m['assets']),'media files')
