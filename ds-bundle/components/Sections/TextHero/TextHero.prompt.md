# TextHero

Text-only page header for interior pages that skip the full-bleed hero image. Used on Studio, Process, Blog post headers, and consultation pages.

## HTML

```html
<div class="text-hero">
  <span class="lab">Our approach</span>
  <h1 class="disp">Designed for the terrain, the light, <em>the moment.</em></h1>
  <p class="th-sub">Every arrangement begins with what the Sierra Nevada is growing right now.</p>
  <a class="btn" href="/consultation">Start planning</a>
</div>
```

## Rules

- `padding-top: clamp(120px, 15vw, 180px)` — built into the class. Accounts for the fixed nav.
- Eyebrow: `.lab` class, `var(--terra)` color, uppercase tracking.
- Headline: `.disp` class for Cormorant Garamond. `<em>` inside renders in `var(--forest)`.
- Subhead `.th-sub`: `var(--fg2)` color, max-width 42ch.
- CTA is optional — omit if the page has a CTA elsewhere.
- Max-width 1500px, auto margin, padded with `var(--pad)`.

## Typography sizes

- Eyebrow: 0.74rem, 0.22em letter-spacing, uppercase
- Headline: clamp(2.6rem, 6vw, 5rem)
- Subhead: 1.1rem
