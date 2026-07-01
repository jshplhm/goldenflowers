# ImmersiveQuote

Full-bleed dark section with a single large display statement. 78vh height. Used between content sections as a visual pause.

## HTML

```html
<section class="immersive">
  <!-- Optional background image -->
  <img class="bg" src="/assets/images/field.jpg" alt="">
  <div class="il">
    <p class="lab">The Golden Flowers way</p>
    <p class="disp">Flowers that remember where they came from.</p>
  </div>
</section>
```

## Rules

- `height: 78vh; min-height: 520px` — built into `.immersive`.
- Background: `<img class="bg">` covers the section. A dark overlay (`oklch(15% .03 150/.42)`) is applied via `.immersive::after` — always legible.
- Without an image: apply `background: linear-gradient(...)` using forest colors directly on `.immersive`.
- Text is always `var(--paper)` (white). The `.lab` inside `.immersive` automatically uses `var(--terra-soft)` (lighter terra).
- Quote text `.disp`: clamp(1.9rem, 4.4vw, 3.6rem), centered, max-width 20ch.
- One short phrase or sentence only — this is not a paragraph block.
