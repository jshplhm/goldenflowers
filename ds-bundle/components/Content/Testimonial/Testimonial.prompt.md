# Testimonial

Full-width centered testimonial block with large display quote. Used as a standalone section between content blocks.

## HTML

```html
<section class="testi">
  <div class="stars">★★★★★</div>
  <blockquote class="disp">"Working with Golden Flowers was the best decision we made for our entire wedding."</blockquote>
  <p class="by">— <b>Emma &amp; Ross</b>, Edgewood Tahoe</p>
</section>
```

## Rules

- `.testi`: max-width 1100px, centered, generous top/bottom padding.
- `.stars`: `var(--terra)` color, letter-spacing 0.3em. Always 5 stars (★★★★★).
- `blockquote`: Cormorant Garamond (`.disp`), clamp(1.8rem, 3.9vw, 3.1rem). Include the opening and closing `"` as literal characters in the text.
- `<em>` inside the quote: renders in `var(--forest)` (not italic). Use for a key phrase.
- Attribution `.by`: 0.85rem, uppercase, `var(--mute)`. Bold the couple name with `<b>`.
- Use real couple names from the portfolio (Emma & Ross, Niamh & Nick, Allie & Devin, etc.).

## For grids of smaller cards, use QuoteCard instead.
