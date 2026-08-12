# Golden Flowers — Design System Conventions

## Setup

No framework or provider required. Every component is plain HTML + CSS. Load `styles.css` (which loads Google Fonts and `_ds_bundle.css`) and then write semantic HTML with the class vocabulary below.

```html
<link rel="stylesheet" href="_ds/styles.css">
```

No JavaScript is needed for static layout. Interactive behaviors (scroll-aware nav, mobile menu) use small inline scripts in the real site, but all visual states can be triggered with classes for design purposes.

## Styling idiom

This is a **CSS class system**. No inline styles, no CSS-in-JS, no Tailwind. Apply design tokens via the class vocabulary; write new layout glue with `var(--*)` custom properties.

### Token reference

| Token | Value | Use |
|-------|-------|-----|
| `var(--bg)` | warm off-white | page background |
| `var(--bg2)` | slightly darker warm cream | alternate section bg (`.cta`, `.proc`) |
| `var(--paper)` | near-white | cards, overlays, text on dark |
| `var(--ink)` | near-black | primary text |
| `var(--forest)` | dark forest green | secondary headings, `<em>` accent |
| `var(--forest-deep)` | deeper green | footer, dark hero backgrounds |
| `var(--fg2)` | medium dark | body copy, secondary text |
| `var(--mute)` | muted gray | captions, metadata, placeholders |
| `var(--accent)` | terracotta / burnt orange | CTA buttons, accent bullets, stars |
| `var(--accent-soft)` | lighter terracotta | text on dark backgrounds |
| `var(--line)` | subtle warm border | dividers, card borders |
| `var(--d)` | Cormorant Garamond, Georgia | display / heading font |
| `var(--b)` | DM Sans, system-ui | body font |
| `var(--pad)` | clamp(24px, 5vw, 72px) | page edge padding |

### Typography classes

| Class | Font | Use |
|-------|------|-----|
| `.disp` | `var(--d)`, weight 430 | all headings, display quotes, brand names |
| `.lab` | `var(--b)` | eyebrow labels: 0.74rem, 0.22em tracking, uppercase, `var(--accent)` |
| `.prose p` | `var(--b)` | article body: 1.05rem, 1.72 line-height, `var(--fg2)` |
| `.txt-link` | `var(--b)` | inline text links with terra underline |

Note: in this design system `<em>` is **not italic** — `em { font-style: normal }`. Use `<em>` inside headings for `var(--forest)` color accent. For terra accent, use `<em>` inside `.cta h2`.

### Button classes

| Class | Appearance |
|-------|-----------|
| `.btn` | terra fill, paper text (primary CTA) |
| `.btn.btn-ink` | ink fill, paper text |
| `.btn.btn-primary` | alias for `.btn` |
| `.btn.ghost` | white outline — use on dark/hero backgrounds |
| `.btn.ghost-ink` | ink outline — use on light backgrounds |
| `.pill` | bordered pill — nav CTA only |
| `.foot-cta` | semi-transparent white outline — footer only |

## Where the truth lives

Read `styles.css` (and the `_ds_bundle.css` it imports) for the complete token and component catalog. Each component folder has a `.prompt.md` with the canonical HTML pattern.

## Idiomatic example

```html
<section class="block">
  <div class="twocol">
    <div>
      <span class="lab">Sustainability</span>
      <h2 class="disp">Foam-free from <em>day one.</em></h2>
    </div>
    <div class="prose">
      <p class="lead">We stopped using floral foam before it was a talking point.</p>
      <p>Every arrangement is built on a grid, pin frog, or water-bearing vessel.</p>
      <a class="btn ghost-ink" href="/sustainability">Our sustainability pledge</a>
    </div>
  </div>
</section>
```

---

## Component index

| Component | Group | Description |
|-----------|-------|-------------|
| SiteNav | Navigation | Fixed top nav bar |
| Button | Buttons | Terra and ink filled CTA buttons |
| GhostButton | Buttons | Outline buttons for dark/light backgrounds |
| Hero | Sections | Full-viewport hero with image overlay |
| TextHero | Sections | Text-only interior page header |
| CredoSection | Sections | Philosophy statement + numbered facts grid |
| ImmersiveQuote | Sections | 78vh full-bleed dark quote section |
| ProcessSteps | Sections | Numbered vertical timeline |
| CtaSection | Sections | Centered closing CTA block |
| Footer | Sections | Dark footer with brand + link columns |
| Testimonial | Content | Centered large blockquote |
| QuoteCard | Content | 3-column testimonial card grid |
| PricingBlock | Content | Centered price display with feature list |
| WorkGrid | Content | 12-column portfolio photo grid |
