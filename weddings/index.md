---
layout: redesign
title: "Weddings"
seo_title: "Lake Tahoe Wedding Flowers & Pricing | Golden Flowers"
permalink: /weddings
description: "Golden Flowers designs seasonal, foam-free wedding flowers for Lake Tahoe, Truckee, and the Sierra Nevada. How our process works and what to expect on pricing."
canonical_url: https://goldenflorals.com/weddings
redirect_from:
  - /weddingflowers
  - /weddings-1
  # Retargeted here 2026-07-09 (were -> home): Squarespace's own URL mappings sent
  # /goldenflowers, /a-la-carte, and /a-la-carte-weddings (incl. products) to /weddingflowers
  - /goldenflowers
  - /a-la-carte
  - /a-la-carte/p/basic-package-bgzcp-s5d9e
  - /a-la-carte/p/basic-package-bgzcp-s5d9e-kz83z
  - /a-la-carte/p/basic-package-bgzcp-s5d9e-kghp7
  - /a-la-carte/p/basic-package-bgzcp-s5d9e-5entb
  - /a-la-carte/p/basic-package-bgzcp-s5d9e-5entb-hhsnz
  - /a-la-carte/p/basic-package-bgzcp-s5d9e-5entb-hhsnz-c43ng
  - /a-la-carte/p/basic-package-bgzcp-s5d9e-64msg-epl3n-g2m2r-fm297
  - /a-la-carte/p/q4y7ldy5lm3xj3a8wfk3wwmop33x20
  - /a-la-carte/p/flower-delivery-to-your-venue
  - /a-la-carte-weddings
  - /a-la-carte-weddings/p/signature-bridal-bouquet
  - /a-la-carte-weddings/p/midi-bridal-bouquet
  - /a-la-carte-weddings/p/minimalist-bouquet
  - /a-la-carte-weddings/p/bridesmaid-bouquet
  - /a-la-carte-weddings/p/boutonniere-new
  - /a-la-carte-weddings/p/corsage
  - /a-la-carte-weddings/p/bud-vases
  - /a-la-carte-weddings/p/aisle-marker
  - /a-la-carte-weddings/p/aisle-marker-xf38y
  - /a-la-carte-weddings/p/flower-girl-petals
  - /a-la-carte-weddings/p/floral-design-consultation
  - /a-la-carte-weddings/p/table-arrangement
  - /a-la-carte-weddings/p/delivery-to-your-venue
---

<!-- TEXT HEADER (no photo: distinct from the other pages) -->
<header class="text-hero">
  <span class="lab"><span data-ed="weddings:hero.label">{{ site.data.weddings.hero.label }}</span></span>
  <h1>{% include em.html t=site.data.weddings.hero.heading k="weddings:hero.heading" %}</h1>
  <p class="th-sub"><span data-ed="weddings:hero.subheading">{{ site.data.weddings.hero.subheading }}</span></p>
  <div class="hero-btns">
    <a class="btn" href="{{ site.baseurl }}/consultation-form"><span data-ed="weddings:hero.button_primary">{{ site.data.weddings.hero.button_primary }}</span></a>
    <a class="btn ghost-ink" href="{{ site.baseurl }}/about"><span data-ed="weddings:hero.button_secondary">{{ site.data.weddings.hero.button_secondary }}</span> <span>&rarr;</span></a>
  </div>
</header>

<!-- PROCESS (dark) -->
<section class="proc">
  <div class="proc-wrap">
    <div class="proc-head">
      <span class="lab"><span data-ed="weddings:process.label">{{ site.data.weddings.process.label }}</span></span>
      <h2><span data-ed="weddings:process.heading">{{ site.data.weddings.process.heading }}</span></h2>
      <p><span data-ed="weddings:process.intro">{{ site.data.weddings.process.intro }}</span></p>
    </div>
    {%- for step in site.data.weddings.process.steps %}
    <div class="proc-step"><div class="proc-num">{{ step.number }}</div><div><span class="proc-when"><span data-ed="weddings:process.steps.{{ forloop.index0 }}.when">{{ step.when }}</span></span><h3><span data-ed="weddings:process.steps.{{ forloop.index0 }}.title">{{ step.title }}</span></h3><p><span data-ed="weddings:process.steps.{{ forloop.index0 }}.body">{{ step.body }}</span></p></div></div>
    {%- endfor %}
  </div>
</section>

<!-- WHAT'S INCLUDED -->
<section class="block">
  <span class="lab"><span data-ed="weddings:included.label">{{ site.data.weddings.included.label }}</span></span>
  <h2 class="h-lg"><span data-ed="weddings:included.heading">{{ site.data.weddings.included.heading }}</span></h2>
  <div class="included-grid">
    {%- for item in site.data.weddings.included.items %}
    <div class="value-item"><h3><span data-ed="weddings:included.items.{{ forloop.index0 }}.title">{{ item.title }}</span></h3><p><span data-ed="weddings:included.items.{{ forloop.index0 }}.body">{{ item.body }}</span></p></div>
    {%- endfor %}
  </div>
</section>

<hr class="hr-line">

<!-- PRICING (dark: the page premium moment) -->
<section class="block pricing-dark" id="pricing">
  <div class="pricing">
    <span class="lab"><span data-ed="weddings:pricing.label">{{ site.data.weddings.pricing.label }}</span></span>
    <p class="price-num"><span data-ed="weddings:pricing.price">{{ site.data.weddings.pricing.price }}</span></p>
    <p class="price-sub"><span data-ed="weddings:pricing.price_sub">{{ site.data.weddings.pricing.price_sub }}</span></p>
    <ul class="price-list">
      {%- for point in site.data.weddings.pricing.points %}
      <li>{% include em.html t=point k="weddings:pricing.points" i=forloop.index0 %}</li>
      {%- endfor %}
    </ul>
    <p class="price-tagline"><span data-ed="weddings:pricing.tagline">{{ site.data.weddings.pricing.tagline }}</span></p>
  </div>
</section>


<!-- RISK REVERSAL -->
<section class="block">
  <div class="callout">
    <span class="lab"><span data-ed="weddings:risk.label">{{ site.data.weddings.risk.label }}</span></span>
    <h2><span data-ed="weddings:risk.heading">{{ site.data.weddings.risk.heading }}</span></h2>
    <p style="max-width:540px;margin:0 auto 22px;color:var(--fg2);"><span data-ed="weddings:risk.body">{{ site.data.weddings.risk.body }}</span></p>
    <p class="q"><span data-ed="weddings:risk.quote">{{ site.data.weddings.risk.quote }}</span></p>
    <p class="src"><span data-ed="weddings:risk.source">{{ site.data.weddings.risk.source }}</span></p>
  </div>
</section>

<!-- TESTIMONIALS -->
<section class="block tight" id="reviews">
  <span class="lab"><span data-ed="weddings:testimonials.label">{{ site.data.weddings.testimonials.label }}</span></span>
  <h2 class="h-lg"><span data-ed="weddings:testimonials.heading">{{ site.data.weddings.testimonials.heading }}</span></h2>
  {% include redesign-testimonials.html %}
</section>

<hr class="hr-line">

<!-- SEASONAL CALLOUT -->
<section class="mini">
  <span class="lab"><span data-ed="weddings:seasonal.label">{{ site.data.weddings.seasonal.label }}</span></span>
  <h2><span data-ed="weddings:seasonal.heading">{{ site.data.weddings.seasonal.heading }}</span></h2>
  <p><span data-ed="weddings:seasonal.body">{{ site.data.weddings.seasonal.body }}</span></p>
  <a href="{{ site.baseurl }}/about#seasonal-availability" class="txt-link"><span data-ed="weddings:seasonal.link">{{ site.data.weddings.seasonal.link }}</span> &rarr;</a>
</section>

<hr class="hr-line">

<!-- FAQ -->
<section class="block">
  <span class="lab"><span data-ed="weddings:faq.label">{{ site.data.weddings.faq.label }}</span></span>
  <h2 class="h-lg"><span data-ed="weddings:faq.heading">{{ site.data.weddings.faq.heading }}</span></h2>
  {% include redesign-faq.html %}
</section>

<!-- VENUE CTA -->
<section class="mini">
  <span class="lab"><span data-ed="weddings:venue_cta.label">{{ site.data.weddings.venue_cta.label }}</span></span>
  <h2><span data-ed="weddings:venue_cta.heading">{{ site.data.weddings.venue_cta.heading }}</span></h2>
  <p><span data-ed="weddings:venue_cta.body">{{ site.data.weddings.venue_cta.body }}</span></p>
  <a href="{{ site.baseurl }}/venues" class="txt-link"><span data-ed="weddings:venue_cta.link">{{ site.data.weddings.venue_cta.link }}</span> &rarr;</a>
</section>

<!-- CLOSING -->
<section class="cta">
  <span class="lab"><span data-ed="weddings:closing.label">{{ site.data.weddings.closing.label }}</span></span>
  <h2 class="disp">{% include em.html t=site.data.weddings.closing.heading k="weddings:closing.heading" %}</h2>
  <p><span data-ed="weddings:closing.body">{{ site.data.weddings.closing.body }}</span></p>
  <a class="btn btn-ink" href="{{ site.baseurl }}/consultation-form"><span data-ed="weddings:closing.button">{{ site.data.weddings.closing.button }}</span> <span>&rarr;</span></a>
</section>
