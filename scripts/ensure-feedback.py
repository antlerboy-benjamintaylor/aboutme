"""Preserve the discussion shortcut when public catalogues are regenerated."""
from pathlib import Path
import sys

root = Path(sys.argv[1])
css = '.discussion-pixel{position:fixed!important;right:0!important;bottom:0!important;width:44px!important;height:44px!important;background:transparent!important;opacity:1!important;z-index:1000}.discussion-pixel::after{content:"";position:absolute;right:8px;bottom:8px;width:5px;height:5px;background:#981b3a;opacity:.45;border-radius:50%}.discussion-pixel:focus-visible{outline:3px solid #b98736;outline-offset:-3px}.discussion-pixel:hover::after{opacity:1}'
for page in root.rglob('*.html'):
    text = page.read_text()
    if '</body>' not in text:
        continue
    if 'class="discussion-pixel"' not in text:
        text = text.replace('</body>', '<a class="discussion-pixel" href="https://github.com/antlerboy/aboutme/issues/1" aria-label="Antlerboy.com updates and discussion"></a></body>')
    if '.discussion-pixel::after' not in text:
        text = text.replace('</head>', '<style>' + css + '</style></head>')
    page.write_text(text)
