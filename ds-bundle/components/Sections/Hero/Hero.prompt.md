# Hero

Full-viewport-height hero. Used on home, blog index, and sustainability pages.

## HTML

```html
<section class="hero">
  <!-- Background image (required for real pages; use dark gradient for previews) -->
  <img class="bg" src="/assets/images/hero.jpg" alt="">
  <div class="hero-in">
    <p class="lab ey">Lake Tahoe Wedding Florist</p>
    <h1 class="disp">Flowers grown from the land where <em>you wed</em></h1>
    <div class="hero-foot">
      <p class="hero-sub">Sustainable, farm-direct florals for weddings across the Sierra Nevada.</p>
      <div class="hero-btns">
        <a class="btn" href="/consultation">Book a consultation</a>
        <a class="btn ghost" href="/portfolio">See our work</a>
      </div>
    </div>
  </div>
</section>
```

## Rules

- `height: 100vh; min-height: 660px` — always full viewport height.
- Background: `<img class="bg">` with `object-fit: cover`. For previews without an image, use `background: linear-gradient(160deg, oklch(27% .05 150), oklch(19.5% .04 150))`.
- The dark gradient overlay is applied via `.hero::after` in CSS — don't add it manually.
- Headline: Cormorant Garamond (`var(--d)`), clamp(2.9rem, 8vw, 8rem), max-width 17ch.
- Eyebrow `.lab` + `.ey` combination: lab styles text, ey adds `color: var(--paper)`.
- Buttons: always `.btn` (terra) + `.btn.ghost` (white outline) side-by-side in `.hero-btns`.
- Copy is `var(--paper)` (white) — the overlay ensures legibility over any image.

## Interior variant

For shorter interior hero (64vh), add class `.hero-sm`:
```html
<section class="hero hero-sm">
```
