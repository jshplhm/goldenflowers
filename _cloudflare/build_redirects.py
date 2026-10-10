#!/usr/bin/env python3
"""Turn the site's redirect stubs into real-301 lists for Cloudflare.

GitHub Pages cannot send a 301, so every `redirect_from` address is a 200 page
with a meta refresh. Run `bundle exec jekyll build`, then this script. It reads
_site and writes, next to itself:

  redirects.csv              source_path,target_url,status   (the inventory)
  cloudflare-bulk-redirects.csv   paste/upload into a Cloudflare Bulk Redirect list

Two kinds of row:
  old   an old address (a redirect stub) -> the page it points at
  slash a live page asked for with a trailing slash, which GitHub Pages 404s
        (/blog/ -> /blog)
"""
import csv, os, re, sys
ROOT = os.path.dirname(os.path.dirname(os.path.abspath(__file__)))
SITE = os.path.join(ROOT, "_site")
HOST = "goldenflorals.com"
SKIP_DIRS = ("assets", "edit", "seo-report", "hero-lab", "proposal-archive")

def url_path(rel):
    """_site-relative file -> the address it is served at (canonical form)."""
    if rel == "index.html": return "/"
    if rel.endswith("/index.html"): return "/" + rel[:-len("index.html")]
    return "/" + rel[:-len(".html")]

stubs, pages = {}, []
for d, _, files in os.walk(SITE):
    for f in files:
        if not f.endswith(".html"): continue
        rel = os.path.relpath(os.path.join(d, f), SITE)
        if rel.split(os.sep)[0] in SKIP_DIRS: continue
        head = open(os.path.join(d, f), encoding="utf-8", errors="replace").read(1500)
        m = re.search(r'http-equiv="refresh" content="0; url=([^"]+)"', head)
        # /admin points off-site at the CMS on purpose; leave it alone.
        if m and not m.group(1).startswith("https://" + HOST): continue
        if m: stubs[url_path(rel)] = m.group(1)
        else: pages.append(url_path(rel))

rows = []
def add(src, target, kind):
    rows.append((src, target, kind))

for src, target in sorted(stubs.items()):
    # follow a chain to its end so nothing hops twice
    seen = set()
    while True:
        p = re.sub(r"^https://" + re.escape(HOST), "", target) or "/"
        nxt = stubs.get(p) or stubs.get(p.rstrip("/")) or stubs.get(p + "/")
        if not nxt or p in seen: break
        seen.add(p); target = nxt
    bare = src.rstrip("/") or "/"
    for variant in sorted({bare, bare + "/", bare + ".html"} if bare != "/" else {"/"}):
        add(variant, target, "old")

taken = {r[0] for r in rows}
for p in sorted(pages):
    if p in ("/", "/404") or p.endswith("/"): continue
    if p + "/" not in taken:
        add(p + "/", "https://" + HOST + p, "slash")

here = os.path.dirname(os.path.abspath(__file__))
with open(os.path.join(here, "redirects.csv"), "w", newline="") as fh:
    w = csv.writer(fh); w.writerow(["source_path", "target_url", "status", "kind"])
    for s, t, k in rows: w.writerow([s, t, 301, k])
# Cloudflare Bulk Redirects CSV: no header row.
# source,target,status,preserve_query_string,include_subdomains,subpath_matching,preserve_path_suffix
with open(os.path.join(here, "cloudflare-bulk-redirects.csv"), "w", newline="") as fh:
    w = csv.writer(fh)
    for s, t, k in rows:
        w.writerow(["https://" + HOST + s, t, 301, "TRUE", "FALSE", "FALSE", "FALSE"])
old = sum(1 for r in rows if r[2] == "old"); print(len(stubs), "stubs ->", old, "old rows +", len(rows) - old, "slash rows =", len(rows))
