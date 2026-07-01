# Footer

Site-wide footer. Dark `var(--forest-deep)` background, warm gray text. Two-column layout: brand/tagline left, 3-column link grid right.

## HTML

```html
<footer class="site-footer">
  <div class="foot-in">
    <div class="foot-lead">
      <div class="foot-brand disp">Golden Flowers</div>
      <p class="foot-tag">Farm-direct, foam-free wedding florals in the Lake Tahoe region.</p>
      <a class="foot-cta" href="/consultation">Start a conversation</a>
    </div>
    <div class="foot-cols">
      <div>
        <h4>Services</h4>
        <a href="/weddings">Wedding florals</a>
        <a href="/consultation">Consultation</a>
      </div>
      <div>
        <h4>Explore</h4>
        <a href="/portfolio">Portfolio</a>
        <a href="/venues">Venues</a>
        <a href="/process">Process</a>
        <a href="/blog">Blog</a>
      </div>
      <div>
        <h4>Contact</h4>
        <p>Nevada City, CA</p>
        <p>By appointment only</p>
      </div>
    </div>
  </div>
  <div class="foot-bottom">
    <span>© 2026 Golden Flowers</span>
    <span>Sustainably grown in the Sierra Nevada</span>
  </div>
</footer>
```

## Rules

- Background: `var(--forest-deep)` — the only element in the DS with this background.
- Brand `.foot-brand`: Cormorant Garamond (`.disp`), clamp(2.4rem, 5vw, 3.6rem), `var(--paper)`.
- Tagline `.foot-tag`: `oklch(82% .02 130)` (warm muted white), 0.98rem.
- CTA `.foot-cta`: outline button (semi-transparent white border), not a `.btn`. Turns terra on hover.
- Column headings `h4`: 0.72rem, uppercase, `var(--terra-soft)`.
- Links/text: `oklch(86% .02 130)`.
- Bottom bar: small copyright + secondary tagline, `oklch(68% .02 130)`.
