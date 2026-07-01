# PricingBlock

Centered pricing display: eyebrow, headline, large price number, feature list, closing tagline. Used on the Process page.

## HTML

```html
<section class="block">
  <div class="pricing">
    <span class="lab">Investment</span>
    <h2 class="disp">Designed around your day</h2>
    <div class="price-num disp">Starting at $4,500</div>
    <p class="price-sub">Full ceremony + reception package</p>
    <ul class="price-list">
      <li>Bridal bouquet &amp; bridesmaid flowers</li>
      <li>Ceremony arch or altar design</li>
      <li>Reception centrepieces (up to 12 tables)</li>
      <li>Day-of delivery &amp; full setup at your venue</li>
    </ul>
    <p class="price-tagline disp">No surprises. Every stem named before you sign.</p>
  </div>
</section>
```

## Rules

- `.pricing` is centered, max-width 720px inside a `.block` container.
- `.price-num`: Cormorant Garamond (`.disp`), clamp(2.6rem, 6vw, 4.6rem). Use the same color as body — no special color needed.
- `.price-sub`: 0.8rem, uppercase, `var(--mute)`.
- `.price-list li`: each item has a terra bullet (CSS `::before` dot), `var(--fg2)` text, top border `var(--line)`.
- `.price-tagline`: Cormorant Garamond, 1.35rem, `var(--forest)`.

## Dark variant

Add `.pricing-dark` to `.block` to use on `var(--forest-deep)` backgrounds. Adjusts text colors automatically.
