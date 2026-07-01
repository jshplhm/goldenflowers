# GhostButton

Outline/ghost pill button. Always used as a secondary CTA alongside a filled `.btn`.

## HTML

```html
<!-- Ghost (white outline) — use on dark/hero backgrounds -->
<a class="btn ghost" href="/portfolio">See our work</a>

<!-- Ghost-ink (ink outline) — use on light backgrounds -->
<a class="btn ghost-ink" href="/about">Learn more</a>
```

## Rules

- `.btn.ghost` → white semi-transparent border (`oklch(100% 0 0/.55)`), white text. For dark backgrounds (hero, `.forest-deep` sections).
- `.btn.ghost-ink` → `var(--line)` border, `var(--ink)` text. For light backgrounds.
- On hover, ghost fills white; ghost-ink fills ink. Neither hover uses terra — terra is reserved for the primary `.btn`.
- Always pair with a filled `.btn` — ghost is never the only CTA.

## Pairing example

```html
<div class="hero-btns">
  <a class="btn" href="/consultation">Book a consultation</a>
  <a class="btn ghost" href="/portfolio">See our work</a>
</div>
```
