#!/usr/bin/env python3
"""
Download all funnelish images and videos from rgb.html to assets/rgb/
and update rgb.html to use local paths.
"""
import re
import os
import urllib.request
import hashlib
from pathlib import Path

BASE = Path(__file__).resolve().parent
HTML_FILE = BASE / "rgb.html"
ASSETS_DIR = BASE / "assets" / "rgb"
ASSETS_DIR.mkdir(parents=True, exist_ok=True)

def extract_urls(content):
    urls = set()
    # url(https://img.funnelish.com/...)
    for m in re.finditer(r'url\s*\(\s*["\']?(https://img\.funnelish\.com[^"\')\s?]+)', content):
        u = m.group(1).split("?")[0].rstrip(");")
        urls.add(u)
    # poster="https://img.funnelish.com/..."
    for m in re.finditer(r'poster=["\'](https://img\.funnelish\.com[^"\']+)', content):
        urls.add(m.group(1).split("?")[0])
    # data-src=https://videos.funnelish.com/...
    for m in re.finditer(r'data-src=(https://videos\.funnelish\.com[^\s>]+)', content):
        urls.add(m.group(1).split("?")[0])
    # data-src=//img.funnelish.com/... or data-srcset="//img...
    for m in re.finditer(r'data-src=//(img\.funnelish\.com[^\s>]+)', content):
        urls.add("https://" + m.group(1).split("?")[0])
    for m in re.finditer(r'data-srcset="[^"]*?//(img\.funnelish\.com[^\s"]+)', content):
        u = "https://" + m.group(1).split()[0].split("?")[0]
        urls.add(u)
    # <img ... src=https://img.funnelish.com/...
    for m in re.finditer(r'src=(https://img\.funnelish\.com[^\s>]+)', content):
        urls.add(m.group(1).split("?")[0])
    return urls

def url_to_filename(url):
    """Create a safe local filename from URL (preserve extension)."""
    # Use path after domain, replace / with _, decode %XX for readability where safe
    path = urllib.parse.urlparse(url).path
    ext = Path(path).suffix or ".bin"
    name = path.strip("/").replace("/", "_")
    # Limit length, keep extension
    if len(name) > 180:
        name = name[:180]
    if not name.endswith(ext):
        name = name + ext
    return name

def download(url):
    local_path = ASSETS_DIR / url_to_filename(url)
    if local_path.exists():
        return str(local_path.relative_to(BASE))
    try:
        req = urllib.request.Request(url, headers={"User-Agent": "Mozilla/5.0"})
        with urllib.request.urlopen(req, timeout=60) as r:
            data = r.read()
        local_path.write_bytes(data)
        return str(local_path.relative_to(BASE))
    except Exception as e:
        print(f"Failed {url}: {e}")
        return None

def main():
    content = HTML_FILE.read_text(encoding="utf-8", errors="replace")
    urls = extract_urls(content)
    print(f"Found {len(urls)} unique media URLs")
    url_to_local = {}
    for i, url in enumerate(sorted(urls)):
        rel = download(url)
        if rel:
            url_to_local[url] = rel
            print(f"  [{i+1}/{len(urls)}] {url[:60]}... -> {rel}")
    # Build replacement map: also protocol-relative and with query string for posters
    replacements = []
    for url, local in url_to_local.items():
        local_path = "./" + local.replace("\\", "/")
        replacements.append((url, local_path))
        # protocol-relative
        if url.startswith("https://"):
            rel_url = "//" + url[8:]
            replacements.append((rel_url, local_path))
        # poster with ?auto=webp...
        if "thumbnails" in url and "?" not in url:
            for q in ["?auto=webp&optimize=medium", "?auto=webp"]:
                replacements.append((url + q, local_path))
    # Sort by length descending so longer matches first
    replacements.sort(key=lambda x: -len(x[0]))
    new_content = content
    for old, new in replacements:
        new_content = new_content.replace(old, new)
    # data-src=// and data-srcset="// (no protocol)
    for url, local in url_to_local.items():
        if url.startswith("https://"):
            rel = "//" + url[8:]
            local_path = "./" + local.replace("\\", "/")
            new_content = new_content.replace("data-src=" + rel, "data-src=" + local_path)
            new_content = new_content.replace('data-srcset="' + rel, 'data-srcset="' + local_path)
    HTML_FILE.write_text(new_content, encoding="utf-8")
    print("Updated rgb.html with local paths.")

if __name__ == "__main__":
    main()
