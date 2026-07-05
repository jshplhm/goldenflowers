---
layout: redesign
title: "Weddings"
seo_title: "Lake Tahoe Wedding Flowers & Wedding Florist | Golden Flowers"
permalink: /weddings
description: "Golden Flowers is a Lake Tahoe wedding florist designing seasonally grown, foam-free wedding flowers for couples getting married in Lake Tahoe, Truckee, and the Sierra Nevada."
canonical_url: https://goldenflorals.com/weddings
redirect_from:
  - /weddingflowers
  - /weddings-1
---

<!-- TEXT HEADER (no photo: distinct from the other pages) -->
<header class="text-hero">
  <span class="lab">{{ site.data.weddings.hero.label }}</span>
  <h1>{% include em.html t=site.data.weddings.hero.heading %}</h1>
  <p class="th-sub">{{ site.data.weddings.hero.subheading }}</p>
  <div class="hero-btns">
    <a class="btn" href="{{ site.baseurl }}/consultation-form">{{ site.data.weddings.hero.button_primary }}</a>
    <a class="btn ghost-ink" href="{{ site.baseurl }}/about">{{ site.data.weddings.hero.button_secondary }} <span>&rarr;</span></a>
  </div>
</header>

<!-- PROCESS (dark) -->
<section class="proc">
  <div class="proc-wrap">
    <div class="proc-head">
      <span class="lab">{{ site.data.weddings.process.label }}</span>
      <h2>{{ site.data.weddings.process.heading }}</h2>
      <p>{{ site.data.weddings.process.intro }}</p>
    </div>
    {%- for step in site.data.weddings.process.steps %}
    <div class="proc-step"><div class="proc-num">{{ step.number }}</div><div><span class="proc-when">{{ step.when }}</span><h3>{{ step.title }}</h3><p>{{ step.body }}</p></div></div>
    {%- endfor %}
  </div>
</section>

<!-- WHAT'S INCLUDED -->
<section class="block">
  <span class="lab">{{ site.data.weddings.included.label }}</span>
  <h2 class="h-lg">{{ site.data.weddings.included.heading }}</h2>
  <div class="included-grid">
    {%- for item in site.data.weddings.included.items %}
    <div class="value-item"><h3>{{ item.title }}</h3><p>{{ item.body }}</p></div>
    {%- endfor %}
  </div>
</section>

<hr class="hr-line">

<!-- PRICING (dark: the page premium moment) -->
<section class="block pricing-dark" id="pricing">
  <div class="pricing">
    <span class="lab">{{ site.data.weddings.pricing.label }}</span>
    <p class="price-num">{{ site.data.weddings.pricing.price }}</p>
    <p class="price-sub">{{ site.data.weddings.pricing.price_sub }}</p>
    <ul class="price-list">
      {%- for point in site.data.weddings.pricing.points %}
      <li>{% include em.html t=point %}</li>
      {%- endfor %}
    </ul>
    <p class="price-tagline">{{ site.data.weddings.pricing.tagline }}</p>
  </div>
</section>


<!-- RISK REVERSAL -->
<section class="block">
  <div class="callout">
    <span class="lab">{{ site.data.weddings.risk.label }}</span>
    <h2>{{ site.data.weddings.risk.heading }}</h2>
    <p style="max-width:540px;margin:0 auto 22px;color:var(--fg2);">{{ site.data.weddings.risk.body }}</p>
    <p class="q">{{ site.data.weddings.risk.quote }}</p>
    <p class="src">{{ site.data.weddings.risk.source }}</p>
  </div>
</section>

<!-- TESTIMONIALS -->
<section class="block tight" id="reviews">
  <span class="lab">{{ site.data.weddings.testimonials.label }}</span>
  <h2 class="h-lg">{{ site.data.weddings.testimonials.heading }}</h2>
  {% include redesign-testimonials.html %}
</section>

<hr class="hr-line">

<!-- SEASONAL CALLOUT -->
<section class="mini">
  <span class="lab">{{ site.data.weddings.seasonal.label }}</span>
  <h2>{{ site.data.weddings.seasonal.heading }}</h2>
  <p>{{ site.data.weddings.seasonal.body }}</p>
  <a href="{{ site.baseurl }}/about#seasonal-availability" class="txt-link">{{ site.data.weddings.seasonal.link }} &rarr;</a>
</section>

<hr class="hr-line">

<!-- FAQ -->
<section class="block">
  <span class="lab">{{ site.data.weddings.faq.label }}</span>
  <h2 class="h-lg">{{ site.data.weddings.faq.heading }}</h2>
  {% include redesign-faq.html %}
</section>

<!-- VENUE CTA -->
<section class="mini">
  <span class="lab">{{ site.data.weddings.venue_cta.label }}</span>
  <h2>{{ site.data.weddings.venue_cta.heading }}</h2>
  <p>{{ site.data.weddings.venue_cta.body }}</p>
  <a href="{{ site.baseurl }}/venues" class="txt-link">{{ site.data.weddings.venue_cta.link }} &rarr;</a>
</section>

<!-- CLOSING -->
<section class="cta">
  <span class="lab">{{ site.data.weddings.closing.label }}</span>
  <h2 class="disp">{% include em.html t=site.data.weddings.closing.heading %}</h2>
  <p>{{ site.data.weddings.closing.body }}</p>
  <a class="btn btn-ink" href="{{ site.baseurl }}/consultation-form">{{ site.data.weddings.closing.button }} <span>&rarr;</span></a>
</section>
