#!/usr/bin/env bash
# Generates the responsive image variants that _plugins/responsive_images.rb
# references in production HTML. Variants land in _site (published, never
# committed) and are listed in a manifest the plugin reads.
#
#   assets/images/<path>/<name>.jpg
#     -> $OUT/<path>/<name>-{480,720,960,1440}w.jpg
#     -> $OUT/<path>/<name>-{...,<source width>}w.webp
#
# RUN ORDER MATTERS: this runs BEFORE `jekyll build` so the plugin can read
# the manifest, then `--publish-only` copies the results into _site afterwards.
# The manifest is the contract -- the plugin advertises a candidate only if it
# is listed, so a skipped or dropped variant can never become a 404 in a
# <source>, which browsers do NOT fall back from.
#
# Only widths STRICTLY NARROWER than the source are generated. A "1440w" made
# from a 1399px-wide portrait is the same pixels re-encoded, and re-encoding an
# already-compressed JPEG inflates it: that variant measured 594 KB against a
# 529 KB source, and the browser preferred it. Most of this portfolio is
# portrait, so 100 of 139 live wedding photos were shipping a variant heavier
# than the original. The plugin advertises the source itself as the widest JPEG
# candidate, at its real width, so nothing is lost by skipping those.
#
# $CACHE persists between CI runs (actions/cache), so only new or changed
# photos are resized. Uses ImageMagick (CI) or sips (macOS, JPEG only).
set -euo pipefail

SRC=${1:-assets/images}
OUT=${2:-_site/assets/images/rsp}
CACHE=${RSP_CACHE:-.rsp-cache}
MANIFEST="$CACHE/manifest.txt"
# Keep the ladder in one place; the plugin learns it from the manifest.
# 720 exists because a 390px phone at 2x needs ~562px: without it the browser
# skipped 480w and pulled the 960w file for every photo on /portfolio, which
# made the page HEAVIER on a phone (3.98 MB) than on a desktop (2.91 MB).
# 1200 exists because a phone at 3x needs ~1030-1290 device px for a
# full-width photo (360-430 CSS px), which fell in the 960->1440 gap: the
# browser had to jump to 1440 or the source file. 1920/2560 are for the
# full-bleed 100vw heroes on large high-DPI displays; they are no-ops for
# today's ~1333px sources (shrink-only rule) and cost nothing until a
# wedding is republished from its master at a higher resolution.
WIDTHS="480 720 960 1200 1440 1920 2560"

publish() {
  mkdir -p "$OUT"
  cp -R "$CACHE"/. "$OUT"/
  find "$OUT" \( -name '*.src.sha' -o -name 'manifest.txt' -o -name '*.webp.skip' \) -delete
}

if [ "${1:-}" = "--publish-only" ]; then
  OUT=${2:-_site/assets/images/rsp}
  publish
  echo "responsive variants published: $(find "$OUT" -type f \( -name '*.jpg' -o -name '*.webp' \) | wc -l | tr -d ' ') files"
  exit 0
fi

# ImageMagick 6 (what Ubuntu still ships) has no `magick` binary and no
# `magick identify` subcommand -- it has separate `convert` and `identify`.
# Getting this wrong killed a deploy: `convert identify ...` failed, and the
# failure rode out through `sw=$(srcwidth ...)` under `set -e` before the
# script had printed a single line.
if command -v magick >/dev/null 2>&1; then IM="magick"; IDENTIFY="magick identify"
elif command -v convert >/dev/null 2>&1; then IM="convert"; IDENTIFY="identify"
else IM=""; IDENTIFY=""
fi

# WebP goes through cwebp (the reference encoder, from the `webp` package)
# rather than an ImageMagick delegate, because Ubuntu's imagemagick 6 is not
# guaranteed to have one. ImageMagick still does the decode and resize, so
# -auto-orient and the shrink-only rule behave identically to the JPEG path.
# No cwebp, or RSP_WEBP=0, means no .webp is written -- and because the plugin
# follows the manifest, the pages quietly stay JPEG-only rather than breaking.
webp_ok=0
if [ -n "$IM" ] && [ "${RSP_WEBP:-1}" = "1" ] && command -v cwebp >/dev/null 2>&1; then
  webp_ok=1
fi

# Never returns non-zero: an unreadable width is handled by the caller, and
# under `set -e` a failure here would take the whole run down.
srcwidth() {
  if [ -n "$IDENTIFY" ]; then
    $IDENTIFY -format '%w' "$1[0]" 2>/dev/null || true
  else
    sips -g pixelWidth "$1" 2>/dev/null | awk '/pixelWidth/{print $2}' || true
  fi
}

mkdir -p "$CACHE"
count=0; skipped=0; substituted=0; webpcount=0; webpdropped=0
: > "$MANIFEST"

while IFS= read -r -d '' f; do
  rel=${f#"$SRC"/}
  # wedding_photos/ is the gitignored full-resolution masters. CI never sees
  # them (they are not in the checkout) but a local run does, and they are
  # both the biggest files here and the slowest to resize: 226 originals at
  # 4-8K against 222 photos the site actually serves, so more than half the
  # work went to files that can never be published. Skipping them is what
  # makes the local verify loop in CLAUDE.md usable.
  case "$rel" in rsp/*|wedding_photos/*) continue ;; esac
  stem=${rel%.*}

  sw=$(srcwidth "$f")
  # An unreadable width must not silently drop every variant for that photo,
  # so fall back to generating the full ladder.
  [ -n "$sw" ] || sw=999999

  want=""
  for w in $WIDTHS; do
    if [ "$w" -lt "$sw" ]; then want="$want $w"; else skipped=$((skipped + 1)); fi
  done
  # WebP also gets a rung at the source's own width: the JPEG ladder tops out
  # with the source file, which has no WebP twin, so without this the WebP
  # path would top out lower than the JPEG one on big high-DPI displays.
  wwant=""
  if [ "$webp_ok" = 1 ]; then
    wwant="$want"
    # "|| true": when the width IS unreadable this test fails, and a bare
    # failing `a && b` is the statement's exit status -- under `set -e` that
    # would abort the whole run on one unreadable photo.
    { [ "$sw" != 999999 ] && wwant="$wwant $sw"; } || true
  fi

  # Skip by CONTENT hash, not mtime: CI checkouts stamp every source file
  # with the clone time, so an mtime comparison against the restored cache
  # regenerated all ~950 variants on every deploy (confirmed in run logs).
  shafile="$CACHE/${stem}.src.sha"
  sha=$(shasum "$f" | cut -d' ' -f1)
  fresh=0
  if [ -f "$shafile" ] && [ "$(cat "$shafile")" = "$sha" ]; then
    fresh=1
    # only the widths we actually intend to make, or a photo narrower than the
    # whole ladder would look permanently incomplete and regenerate every run
    for w in $want; do [ -f "$CACHE/${stem}-${w}w.jpg" ] || fresh=0; done
    # WebP has to count too. Judging freshness on the JPEGs alone meant that
    # the first deploy after WebP shipped restored a warm JPEG cache, called
    # every photo done, and wrote no WebP at all -- a green build that quietly
    # delivered nothing. A .skip marker records a WebP deliberately dropped for
    # being no smaller, so those do not look missing forever.
    for w in $wwant; do
      [ -f "$CACHE/${stem}-${w}w.webp" ] || [ -f "$CACHE/${stem}-${w}w.webp.skip" ] || fresh=0
    done
  fi

  if [ "$fresh" = 0 ]; then
    # Drop variants this photo should no longer have. Without this, widths left
    # over from an earlier ladder stay in the cache and get published.
    for w in $WIDTHS $sw; do
      case " $want " in *" $w "*) ;; *) rm -f "$CACHE/${stem}-${w}w.jpg" ;; esac
      case " $wwant " in *" $w "*) ;; *) rm -f "$CACHE/${stem}-${w}w.webp" "$CACHE/${stem}-${w}w.webp.skip" ;; esac
    done

    for w in $want; do
      dest="$CACHE/${stem}-${w}w.jpg"
      mkdir -p "$(dirname "$dest")"
      # resize by WIDTH (srcset w-descriptors are widths), never enlarge.
      # -interlace Plane makes a progressive JPEG: same bytes, but the photo
      # paints in sharpening passes instead of crawling down from the top.
      if [ -n "$IM" ]; then
        $IM "$f" -auto-orient -resize "${w}x>" -quality 80 -interlace Plane -strip "$dest"
      else
        sips --resampleWidth "$w" -s format jpeg -s formatOptions 80 "$f" --out "$dest" >/dev/null
      fi
      # A downscale SHOULD be smaller, but re-encoding an already-compressed
      # JPEG does not always pay for itself -- the sips fallback inflated 30 of
      # 104 genuine downscales in one gallery. Whenever the variant is not
      # actually smaller than its own source, ship the source under the
      # variant's name. The w descriptor then overstates how small that file
      # is, which costs nothing: the browser gets more pixels than it asked
      # for and strictly fewer bytes than either honest alternative.
      if [ "$(wc -c <"$dest")" -ge "$(wc -c <"$f")" ]; then
        cp "$f" "$dest"; substituted=$((substituted + 1))
      fi
      count=$((count + 1))
    done

    for w in $wwant; do
      dest="$CACHE/${stem}-${w}w.webp"
      mkdir -p "$(dirname "$dest")"
      # ImageMagick decodes/orients/resizes, cwebp encodes. PNG on the pipe
      # keeps it lossless between the two.
      $IM "$f" -auto-orient -resize "${w}x>" -strip png:- \
        | cwebp -quiet -q 78 -m 4 -o "$dest" -- -
      # A WebP heavier than the file it would replace is worth nothing. Drop it
      # and let the manifest leave it unadvertised, rather than ship a
      # regression to browsers that prefer it.
      rival="$CACHE/${stem}-${w}w.jpg"
      [ -f "$rival" ] || rival="$f"
      rm -f "$dest.skip"
      if [ "$(wc -c <"$dest")" -ge "$(wc -c <"$rival")" ]; then
        rm -f "$dest"; : > "$dest.skip"; webpdropped=$((webpdropped + 1))
      else
        webpcount=$((webpcount + 1))
      fi
    done

    mkdir -p "$(dirname "$shafile")"
    printf '%s' "$sha" > "$shafile"
  fi

  # Manifest every run, cached or not: it describes what EXISTS, not what this
  # run happened to do.
  for w in $WIDTHS $sw; do
    [ -f "$CACHE/${stem}-${w}w.jpg" ] && echo "${stem}-${w}w.jpg" >> "$MANIFEST"
    [ -f "$CACHE/${stem}-${w}w.webp" ] && echo "${stem}-${w}w.webp" >> "$MANIFEST"
  done
  echo "src ${stem} ${sw}" >> "$MANIFEST"
done < <(find "$SRC" -type f \( -iname '*.jpg' -o -iname '*.jpeg' \) -print0)

sort -u "$MANIFEST" -o "$MANIFEST"

if [ "${RSP_PUBLISH:-1}" = "1" ]; then publish; fi
echo "responsive variants: $count jpeg generated, $skipped skipped as no-ops, $substituted source-substituted, $webpcount webp written, $webpdropped webp dropped as no gain (webp_ok=$webp_ok), $(grep -c . "$MANIFEST") manifest lines"
