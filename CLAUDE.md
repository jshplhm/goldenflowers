# Golden Flowers — goldenflorals.com

Jekyll 4.3 site for a Lake Tahoe wedding florist (Brittany; Josh runs the
tech). GitHub Pages via Actions: **every push to `main` deploys the live site
in ~2 minutes** (`gh run list` to watch). There is no staging — verify
locally before pushing. `main` is the only branch.

## Commands

```sh
bundle exec jekyll build            # dev build → _site (byte-stable; good for diffing)
bundle exec jekyll serve --port 4004 --no-watch   # local preview
JEKYLL_ENV=production bundle exec jekyll build    # adds srcset markup (see Images)
```

- **Before trusting any local `_site` diff: `ps aux | grep jekyll` and kill
  strays.** A forgotten `jekyll serve` watcher silently rebuilds `_site` with
  `0.0.0.0:<port>` URLs and a stale config. This has burned us twice.
- Rebuild-to-rebuild, pages differ only in the `?v=<timestamp>` CSS
  cache-buster and `feed.xml`'s `<updated>`; strip those when diffing.
  The gold-standard check for refactors: build before/after, compare all
  ~720 output files byte-wise modulo those two.
- Screenshot verification is the house style (design-first owner). Playwright
  with `channel: 'chrome'` works; take mobile shots at ≥460px width
  (narrower clips the right edge). Browser-test masked-input/JS behavior —
  reading the code has repeatedly missed real bugs here.

## Architecture

- **Layouts**: everything chains into `_layouts/redesign.html` (`post.html`
  and `venue.html` are thin wrappers). It carries the `Florist` JSON-LD
  (street address lives ONLY there and in Google Business Profile —
  deliberately not in visible text: no walk-ins).
- **Copy lives in `_data/*.yml`, not in templates.** Pages render it via
  `_includes/em.html` (`*italic*`/`**bold**` markup, HTML-escapes first —
  keep it that way) or `<span data-ed="file:dot.path">` spans. Both the
  inline editor (/edit) and Pages CMS write these files; never hardcode
  visitor-facing prose in HTML. Venue pages read `_data/venues/<slug>.yml`.
- **Wedding galleries**: `_includes/portfolio-gallery.html` auto-lists
  `assets/images/portfolio/<slug>/` at build time. Display order =
  `_data/gallery_order.yml` (written by /edit drag-reorder; stale entries are
  skipped, unlisted files append — a bad manifest can't break a build).
  Desktop lays varied rows via positional `mo-2/mo-3/mo-6` classes; on
  ≤600px everything pairs 2-up except `mo-6` bands and `.mo-fin` — the last
  photo, widened ONLY when the tile run after the final band is odd
  (unconditionally widening it CREATES an orphan gap on even runs).
- **Inline editor** (`/edit`, `assets/editor/editor.js`): iframe over the
  live site; saves commit straight to `main` via GitHub API (fine-grained
  PAT in localStorage). Supports copy edits, blog posts, photo
  add/delete/reorder/swap/hero, one-form "New wedding" creation, "Remove
  wedding" (deletes page+photos, 301s the URL, blocked if a photo is
  featured elsewhere or it's the style's last wedding), and "Change style"
  (moves the hub card between aesthetic sections and swaps the label on the
  wedding page). Portfolio collages are quantity-aware: 4+ cards use the
  composed layouts, 3/2/1 fall back to feature-pair/pair/band via
  :is(#id) quantity queries in portfolio/index.md.
  Test with `?dryrun=1` (commits land on `window.__gfDryrun`), `?branch=X`
  to redirect commits. Photo paths must be canonicalized from `rsp/`
  srcset variants before matching page source (`canonicalImagePath`).
- **Pages CMS** (app.pagescms.org, config `.pages.yml`) is the form-based
  fallback editor. It strips YAML comments on save; media output paths must
  NOT carry a baseurl prefix (site's baseurl is "").

## Images

- Originals in `assets/images/wedding_photos/` are **gitignored full-res** —
  never `git add -A` them. Published derivatives: `assets/images/portfolio/
  <slug>/<slug>-NN.jpg` (~2000px, editor resizes client-side on upload).
- Production builds get srcset via `_plugins/responsive_images.rb`
  (dev HTML is deliberately untouched so diffs stay clean). Variants
  (480/960/1440w) are generated in CI by `scripts/make-responsive-variants.sh`
  into `_site/assets/images/rsp/` — never committed. The script skips by
  source content hash (`.src.sha` in `.rsp-cache`); the Actions cache key is
  run_id-suffixed because actions/cache never re-saves on an exact-key hit.
  A healthy image-free deploy logs `responsive variants: 0 generated`.
- If a template knows an image's real rendered width, set `sizes=` on the
  `<img>` — the plugin preserves it (gallery tiles declare 50vw on phones).

## Consultation form (the money path — touch with care)

- Client: `_includes/consult-modal.html` + `redesign-consult-js.html`
  (two-step, date mask, venue type-ahead, lead_id per load, honest-failure
  send with retry). Two-digit years settle ONLY on blur/Continue — never
  re-add a timer to the mask (slow typists got hijacked to 2020).
- Server: Google Apps Script, source of truth `_scripts/consultation-form-
  doPost.gs`. **Editing the file deploys nothing** — paste into the Apps
  Script editor, Deploy → Manage deployments → New version (same URL), and
  re-run `setupTriggers()`. Sheet tabs: `leads` / `partial leads` / `spam`
  (exact names). Never re-add Page/Button/Notified/Referrer columns.
  Every rule must only reject input the real form cannot produce.
- Anti-spam whitelists (AESTHETICS/BUDGETS) must contain the exact option
  strings — em/en dashes included. New form fields need their rule mirrored
  server-side and the Apps Script redeployed BEFORE the form change ships.

## Copy & design rules (owner mandates)

- **No em dashes in prose, ever**; no AI-pattern phrasing. Exception: the
  form's aesthetic option labels ("Lush & Romantic — rich…") are approved.
- **No terracotta / warm accent colors anywhere** — monochrome forest-green
  + cream only.
- Consult-form copy was chosen word-by-word by the owner: don't reword.
- Never claim "one wedding per date" explicitly; honesty guardrails apply
  to scarcity/urgency copy.
- Deleted blog posts must 301 (editor appends to `blog/index.md`
  redirect_from) — nothing may 404.

## Gotchas that cost real debugging time

- GitHub contents API caches reads for ~60s — editor fetches use
  `cache: "no-store"`; keep that on any read-after-write path.
- Quoting: inserting `: ` into unquoted `_data/faqs.yml` scalars breaks the
  build — quote YAML values with colons.
- `jekyll-paginate-v2` requires the Actions workflow build (classic Pages
  builder can't) — don't switch `build_type`.
- Pages are served WITHOUT trailing slashes (`/venues`, not `/venues/`).
- `seo-report/`, `proposal-archive/`, `wedding_photos/` are local-only
  (gitignored) — the repo is PUBLIC, so nothing private may be committed;
  git history is also public.
- llms.txt at the root is deliberate (AI crawlers); robots.txt is
  intentionally minimal.
