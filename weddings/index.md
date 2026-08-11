---
layout: redesign
hero_nav: true
title: "Weddings"
seo_title: "Lake Tahoe Wedding Flowers & Pricing | Golden Flowers"
permalink: /weddings
description: "Golden Flowers designs seasonal, sustainable wedding flowers for Lake Tahoe, Truckee, and the Sierra Nevada. How our process works and what to expect on pricing."
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

<!-- HERO (photo: strengthened as a cold first impression for paid-ad traffic) -->
<header class="hero hero-land">
  <img class="bg" src="{{ site.baseurl }}/assets/images/portfolio/tori-tucker/tori-tucker-02.jpg" alt="Bride holding a lush garden-rose and ranunculus bouquet at a Lake Tahoe beach wedding by Golden Flowers" style="object-position:center 55%;">
  <div class="hero-in">
    <p class="ey lab"><span data-ed="weddings:hero.label">{{ site.data.weddings.hero.label }}</span></p>
    <h1 class="disp">{% include em.html t=site.data.weddings.hero.heading k="weddings:hero.heading" %}</h1>
    <div class="hero-foot">
      <p class="hero-sub"><span data-ed="weddings:hero.subheading">{{ site.data.weddings.hero.subheading }}</span></p>
      <a class="btn" href="{{ site.baseurl }}/consultation-form"><span data-ed="weddings:hero.button_primary">{{ site.data.weddings.hero.button_primary }}</span> <span>&rarr;</span></a>
    </div>
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
    {%- if site.data.weddings.pricing.guide_url != empty %}
    <a class="price-guide" href="{{ site.data.weddings.pricing.guide_url }}" target="_blank" rel="noopener">
      <span data-ed="weddings:pricing.guide_text">{{ site.data.weddings.pricing.guide_text }}</span>
      <svg class="price-guide-arw" width="11" height="11" viewBox="0 0 11 11" fill="none" aria-hidden="true"><path d="M1.5 9.5 9.5 1.5M3.6 1.5h5.9v5.9" stroke="currentColor" stroke-width="1.2" stroke-linecap="round" stroke-linejoin="round"/></svg>
    </a>
    {%- endif %}
    <p class="price-tagline"><span data-ed="weddings:pricing.tagline">{{ site.data.weddings.pricing.tagline }}</span></p>
  </div>
</section>


<!-- ASSURANCE (quiet beat between the price and the proof: no card, hangs off
     the same left rail as every other section on the page) -->
<section class="block tight assurance">
  <span class="lab"><span data-ed="weddings:assurance.label">{{ site.data.weddings.assurance.label }}</span></span>
  <h2 class="h-lg"><span data-ed="weddings:assurance.heading">{{ site.data.weddings.assurance.heading }}</span></h2>
  <p><span data-ed="weddings:assurance.body">{{ site.data.weddings.assurance.body }}</span></p>
</section>

<!-- TESTIMONIALS -->
<section class="block tight" id="reviews">
  <span class="lab"><span data-ed="weddings:testimonials.label">{{ site.data.weddings.testimonials.label }}</span></span>
  <h2 class="h-lg"><span data-ed="weddings:testimonials.heading">{{ site.data.weddings.testimonials.heading }}</span></h2>
  {% include redesign-testimonials.html %}
</section>

<hr class="hr-line">

<!-- FAQ -->
<section class="block">
  <span class="lab"><span data-ed="weddings:faq.label">{{ site.data.weddings.faq.label }}</span></span>
  <h2 class="h-lg"><span data-ed="weddings:faq.heading">{{ site.data.weddings.faq.heading }}</span></h2>
  {% include redesign-faq.html %}
</section>

<!-- CLOSING -->
<section class="cta">
  <span class="lab"><span data-ed="weddings:closing.label">{{ site.data.weddings.closing.label }}</span></span>
  <h2 class="disp">{% include em.html t=site.data.weddings.closing.heading k="weddings:closing.heading" %}</h2>
  <p><span data-ed="weddings:closing.body">{{ site.data.weddings.closing.body }}</span></p>
  <a class="btn btn-ink" href="{{ site.baseurl }}/consultation-form"><span data-ed="weddings:closing.button">{{ site.data.weddings.closing.button }}</span> <span>&rarr;</span></a>
</section>
