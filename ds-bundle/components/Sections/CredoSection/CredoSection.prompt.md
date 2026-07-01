# CredoSection

Philosophy/value statement section: eyebrow + large display headline + 3-column numbered facts grid. Used on home and Studio pages.

## HTML

```html
<section class="credo">
  <span class="lab">Our philosophy</span>
  <h2 class="disp">We design with the land, <em>not against it.</em></h2>
  <div class="facts">
    <div class="fact">
      <span class="n">01</span>
      <h3 class="disp">Farm-direct</h3>
      <p>Grown on our Nevada City property or sourced within 60 miles.</p>
    </div>
    <div class="fact">
      <span class="n">02</span>
      <h3 class="disp">Foam-free</h3>
      <p>Every arrangement is built without floral foam.</p>
    </div>
    <div class="fact">
      <span class="n">03</span>
      <h3 class="disp">Named varieties</h3>
      <p>You know every stem by name before we finalize.</p>
    </div>
  </div>
</section>
```

## Rules

- `.credo` max-width 1500px with generous top/bottom padding.
- `.n` class: Cormorant Garamond italic, 1.6rem, `var(--terra)` color. Use as a decorative numeric label.
- `.facts` is a 3-column grid separated by a top border (`var(--line)`). Use 2–4 `.fact` items.
- `<em>` in headline renders in `var(--forest)` (not italic — `em{font-style:normal}` in this DS).
- Body text in `.fact p`: `var(--mute)` color, max-width 34ch.
