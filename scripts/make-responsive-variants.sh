#!/usr/bin/env bash
# Generates the responsive image variants that _plugins/responsive_images.rb
# references in production HTML. Run after `jekyll build` in the deploy
# workflow; variants land in _site (published, never committed).
#
#   assets/images/<path>/<name>.jpg -> $OUT/<path>/<name>-{480,960,1440}w.jpg
#
# $CACHE persists between CI runs (actions/cache), so only new or changed
# photos are resized. Uses ImageMagick (CI, shrink-only) or sips (macOS).
set -euo pipefail

SRC=${1:-assets/images}
OUT=${2:-_site/assets/images/rsp}
CACHE=${RSP_CACHE:-.rsp-cache}
WIDTHS="480 960 1440"

mkdir -p "$CACHE"
count=0
while IFS= read -r -d '' f; do
  rel=${f#"$SRC"/}
  case "$rel" in rsp/*) continue ;; esac
  stem=${rel%.*}
  # Skip by CONTENT hash, not mtime: CI checkouts stamp every source file
  # with the clone time, so an mtime comparison against the restored cache
  # regenerated all ~950 variants on every deploy (confirmed in run logs).
  shafile="$CACHE/${stem}.src.sha"
  sha=$(shasum "$f" | cut -d' ' -f1)
  if [ -f "$shafile" ] && [ "$(cat "$shafile")" = "$sha" ]; then
    ok=1
    for w in $WIDTHS; do [ -f "$CACHE/${stem}-${w}w.jpg" ] || ok=0; done
    [ "$ok" = 1 ] && continue
  fi
  for w in $WIDTHS; do
    dest="$CACHE/${stem}-${w}w.jpg"
    mkdir -p "$(dirname "$dest")"
    # resize by WIDTH (srcset w-descriptors are widths), never enlarge
    if command -v magick >/dev/null 2>&1; then
      magick "$f" -auto-orient -resize "${w}x>" -quality 80 -strip "$dest"
    elif command -v convert >/dev/null 2>&1; then
      convert "$f" -auto-orient -resize "${w}x>" -quality 80 -strip "$dest"
    else
      cw=$(sips -g pixelWidth "$f" | awk '/pixelWidth/{print $2}')
      if [ "$cw" -gt "$w" ]; then
        sips --resampleWidth "$w" -s format jpeg -s formatOptions 80 "$f" --out "$dest" >/dev/null
      else
        cp "$f" "$dest"
      fi
    fi
    count=$((count + 1))
  done
  mkdir -p "$(dirname "$shafile")"
  printf '%s' "$sha" > "$shafile"
done < <(find "$SRC" -type f \( -iname '*.jpg' -o -iname '*.jpeg' \) -print0)

mkdir -p "$OUT"
cp -R "$CACHE"/. "$OUT"/
find "$OUT" -name '*.src.sha' -delete   # cache bookkeeping, not for publishing
echo "responsive variants: $count generated, $(find "$CACHE" -name '*.jpg' | wc -l | tr -d ' ') total"
