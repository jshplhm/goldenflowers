# QuoteCard

3-column grid of bordered testimonial cards. Used on process, weddings, and studio pages.

## HTML

```html
<div class="quote-grid">
  <div class="quote-card">
    <div class="stars">★★★★★</div>
    <p class="disp">"They matched our vibe perfectly — moody, lush, completely wild-feeling."</p>
    <p class="src"><b>Niamh &amp; Nick</b>, Hellman-Ehrman Mansion</p>
  </div>
  <div class="quote-card">
    <div class="stars">★★★★★</div>
    <p class="disp">"We gave them almost no direction and trusted the process. Best thing we could have done."</p>
    <p class="src"><b>Allie &amp; Devin</b>, Ritz-Carlton Lake Tahoe</p>
  </div>
  <div class="quote-card">
    <div class="stars">★★★★★</div>
    <p class="disp">"The foam-free approach meant our flowers looked as natural on the table as in the field."</p>
    <p class="src"><b>Katie &amp; James</b>, Martis Camp</p>
  </div>
</div>
```

## Rules

- `.quote-grid`: 3-column CSS grid, `var(--paper)` cards with `var(--line)` border, border-radius 8px.
- Always use exactly 3 cards — the grid is designed for 3 columns. Use the carousel variant for more.
- `.stars`: `var(--terra)`, 0.8rem, letter-spacing 0.2em.
- Quote text: Cormorant Garamond (`.disp`), 1.22rem, no surrounding quotes in HTML (include `"` in the text).
- Attribution `.src`: 0.76rem, uppercase, `var(--mute)`. Bold the name.
- Real couples from the portfolio: Emma & Ross (Edgewood), Niamh & Nick (Hellman-Ehrman), Allie & Devin (Ritz-Carlton), Katie & James (Martis Camp), Lynn & Aaron (Old Greenwood), Sam & Matt (Palisades), Tori & Tucker, Dylan & Josh, Jacqueline & Brandon, Camille & Max.

## Carousel variant (for 4+ quotes)

Wrap `.quote-grid` in `.testi-carousel` and add prev/next controls with `.testi-nav`.
