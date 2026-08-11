#!/usr/bin/env bash
# Generates the responsive image variants that _plugins/responsive_images.rb
# references in production HTML. Run after `jekyll build` in the deploy
# workflow; variants land in _site (published, never committed).
#
#   assets/images/<path>/<name>.jpg -> $OUT/<path>/<name>-{480,720,960,1440}w.jpg
#
# Only widths STRICTLY NARROWER than the source are generated. A "1440w" made
# from a 1399px-wide portrait is the same pixels re-encoded, and re-encoding an
# already-compressed JPEG inflates it: that variant measured 594 KB against a
# 529 KB source, and the browser preferred it. Most of this portfolio is
# portrait, so 100 of 139 live wedding photos were shipping a variant heavier
# than the original. The plugin advertises the source itself as the widest
# candidate, at its real width, so nothing is lost by skipping those.
#
# $CACHE persists between CI runs (actions/cache), so only new or changed
# photos are resized. Uses ImageMagick (CI, shrink-only) or sips (macOS).
set -euo pipefail

SRC=${1:-assets/images}
OUT=${2:-_site/assets/images/rsp}
CACHE=${RSP_CACHE:-.rsp-cache}
# Keep in sync with RSP_WIDTHS in _plugins/responsive_images.rb.
# 720 exists because a 390px phone at 2x needs ~562px: without it the browser
# skipped 480w and pulled the 960w file for every photo on /portfolio, which
# made the page HEAVIER on a phone (3.98 MB) than on a desktop (2.91 MB).
WIDTHS="480 720 960 1440"

# Pixel width of a source image, however this machine is equipped.
srcwidth() {
  if command -v magick >/dev/null 2>&1; then
    magick identify -format '%w' "$1[0]" 2>/dev/null
  elif command -v identify >/dev/null 2>&1; then
    identify -format '%w' "$1[0]" 2>/dev/null
  else
    sips -g pixelWidth "$1" 2>/dev/null | awk '/pixelWidth/{print $2}'
  fi
}

mkdir -p "$CACHE"
count=0
skipped=0
substituted=0
while IFS= read -r -d '' f; do
  rel=${f#"$SRC"/}
  case "$rel" in rsp/*) continue ;; esac
  stem=${rel%.*}

  sw=$(srcwidth "$f")
  # An unreadable width must not silently drop every variant for that photo,
  # so fall back to generating the full ladder.
  [ -n "$sw" ] || sw=999999
  want=""
  for w in $WIDTHS; do
    if [ "$w" -lt "$sw" ]; then want="$want $w"; else skipped=$((skipped + 1)); fi
  done

  # Skip by CONTENT hash, not mtime: CI checkouts stamp every source file
  # with the clone time, so an mtime comparison against the restored cache
  # regenerated all ~950 variants on every deploy (confirmed in run logs).
  shafile="$CACHE/${stem}.src.sha"
  sha=$(shasum "$f" | cut -d' ' -f1)
  if [ -f "$shafile" ] && [ "$(cat "$shafile")" = "$sha" ]; then
    ok=1
    # only the widths we actually intend to make, or a photo narrower than the
    # whole ladder would look permanently incomplete and regenerate every run
    for w in $want; do [ -f "$CACHE/${stem}-${w}w.jpg" ] || ok=0; done
    [ "$ok" = 1 ] && continue
  fi

  # Drop variants this photo should no longer have. Without this, widths left
  # over from an earlier ladder stay in the cache and get published.
  for w in $WIDTHS; do
    case " $want " in
      *" $w "*) ;;
      *) rm -f "$CACHE/${stem}-${w}w.jpg" ;;
    esac
  done

  for w in $want; do
    dest="$CACHE/${stem}-${w}w.jpg"
    mkdir -p "$(dirname "$dest")"
    # resize by WIDTH (srcset w-descriptors are widths), never enlarge.
    # -interlace Plane makes a progressive JPEG: same bytes, but the photo
    # paints in sharpening passes instead of crawling down from the top.
    if command -v magick >/dev/null 2>&1; then
      magick "$f" -auto-orient -resize "${w}x>" -quality 80 -interlace Plane -strip "$dest"
    elif command -v convert >/dev/null 2>&1; then
      convert "$f" -auto-orient -resize "${w}x>" -quality 80 -interlace Plane -strip "$dest"
    else
      sips --resampleWidth "$w" -s format jpeg -s formatOptions 80 "$f" --out "$dest" >/dev/null
    fi
    # A downscale SHOULD be smaller, but re-encoding an already-compressed JPEG
    # does not always pay for itself -- the sips fallback inflated 30 of 104
    # genuine downscales in one gallery. Whenever the variant is not actually
    # smaller than its own source, ship the source under the variant's name.
    # The w descriptor then overstates how small that file is, which costs
    # nothing: the browser gets more pixels than it asked for and strictly
    # fewer bytes than either honest alternative.
    if [ "$(wc -c <"$dest")" -ge "$(wc -c <"$f")" ]; then
      cp "$f" "$dest"
      substituted=$((substituted + 1))
    fi
    count=$((count + 1))
  done
  mkdir -p "$(dirname "$shafile")"
  printf '%s' "$sha" > "$shafile"
done < <(find "$SRC" -type f \( -iname '*.jpg' -o -iname '*.jpeg' \) -print0)

mkdir -p "$OUT"
cp -R "$CACHE"/. "$OUT"/
find "$OUT" -name '*.src.sha' -delete   # cache bookkeeping, not for publishing
echo "responsive variants: $count generated, $skipped skipped as no-ops, $substituted source-substituted, $(find "$CACHE" -name '*.jpg' | wc -l | tr -d ' ') total"
