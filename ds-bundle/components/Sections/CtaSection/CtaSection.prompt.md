# CtaSection

Centered closing CTA section. Background is `var(--bg2)`. Used at the bottom of most pages before the footer.

## HTML

```html
<!-- Standard -->
<section class="cta">
  <p class="lab">Ready to begin</p>
  <h2 class="disp">Let's talk about <em>your</em> wedding.</h2>
  <p>Most dates book 8–12 months out. A quick conversation is always the right first step.</p>
  <a class="btn" href="/consultation">Check my date</a>
</section>

<!-- Tall variant (thank-you / confirmation pages) -->
<section class="cta cta--tall">
  <p class="lab">What happens next</p>
  <h2 class="disp">We'll be in touch <em>within 24 hours.</em></h2>
  <p>In the meantime, explore our portfolio to see what's possible for your day.</p>
  <a class="btn" href="/portfolio">See our work</a>
</section>
```

## Rules

- Background: always `var(--bg2)` (built into `.cta`).
- `<em>` in headline → `var(--terra)` color (not italic — this DS uses `em` for color, not style).
- Body copy: `var(--mute)`, max-width 42ch, centered.
- CTA: always `.btn` (terra). One CTA per section.
- `.cta--tall` adds `min-height: 86vh` and flex-centers content — for standalone confirmation pages.
