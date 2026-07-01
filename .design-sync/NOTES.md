# Design Sync Notes

## Off-script approach

This repo is a Jekyll static site (no JS component library, no Storybook). The design system was built manually from `assets/css/redesign.css` — component factory functions in `_ds_bundle.js`, CSS copied directly as `_ds_bundle.css`, previews hand-crafted as self-contained HTML cards.

## Font situation

`redesign.css` uses `--d: 'Cormorant Garamond', Georgia, serif` (weight 430, optical sizing). Google Fonts is loaded at static weights 300–600. `font-weight: 430` rounds to 400 in most browsers without variable-weight support. The visual difference is minimal. If this becomes a concern, update `styles.css` to use variable font syntax: `family=Cormorant+Garamond:ital,wght@0,300..700;1,300..700`.

The redesign-preview.html prototype uses DM Serif Display instead of Cormorant Garamond — the CSS has Cormorant Garamond as the current deployed font. Per memory: "DM Serif Display locked" for the v3 rebuild. If the deployed CSS switches to DM Serif Display, update `styles.css` accordingly.

## Image placeholders

Preview cards that require images (Hero, WorkGrid, ImmersiveQuote, GhostButton) use CSS gradients in forest/ink tones instead of photographs. The design agent's component panes will show tonal placeholder tiles rather than actual wedding photos.

## `_ds_sync.json` format

Uses a minimal off-script sidecar format. SHA hashes are the first 12 characters of SHA-256. Future re-syncs will find this anchor and can diff against it.

## Re-syncing

To update after CSS changes:
1. Copy updated `redesign.css` to `ds-bundle/_ds_bundle.css`
2. Update any component HTML/d.ts/prompt.md as needed
3. Re-run upload (projectId is pinned in config.json)
4. Update `_ds_sync.json` with new hashes

## Font loading in the claude.ai/design context

`styles.css` loads Google Fonts via `@import url(...)`. This requires network access to render the display font. If the design tool can't reach Google Fonts, Cormorant Garamond falls back to Georgia, which is a reasonable serif fallback.
