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
  <img class="bg" src="{{ site.baseurl }}/assets/images/portfolio/kelly-dylan/kelly-dylan-13.jpg" alt="Bride holding a lush garden-rose and ranunculus bouquet at a Lake Tahoe beach wedding by Golden Flowers" style="object-position:center 55%;">
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
    {%- comment -%} Steps carry an optional `phase`; a heading is emitted wherever
    it changes, which breaks the timeline into "before you book" and "once you're
    booked" without restructuring the data or moving any step's data-ed path.
    Leave every phase blank and it renders as one continuous run, as before.
    {%- endcomment -%}
    {%- assign seen_phase = "" %}
    {%- for step in site.data.weddings.process.steps %}
    {%- if step.phase and step.phase != seen_phase %}
    <p class="proc-phase"><span data-ed="weddings:process.steps.{{ forloop.index0 }}.phase">{{ step.phase }}</span></p>
    {%- assign seen_phase = step.phase %}
    {%- endif %}
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
    <div class="value-item">
      {%- if item.icon %}{% include icon.html name=item.icon %}{% endif %}
      <h3><span data-ed="weddings:included.items.{{ forloop.index0 }}.title">{{ item.title }}</span></h3>
      <p><span data-ed="weddings:included.items.{{ forloop.index0 }}.body">{{ item.body }}</span></p>
    </div>
    {%- endfor %}
  </div>
</section>

{%- comment -%} No hairline here: the band is full bleed now, so the change of
background is its own divider. A rule only separates two sections that SHARE a
surface. {%- endcomment -%}

<!-- PRICING (dark: the page premium moment) -->
{%- comment -%} One figure and one label per tier. No cards: a card implies a
package, and we are deliberately not saying what each figure buys. {%- endcomment -%}
<section class="pricing-dark" id="pricing">
  <div class="pricing">
    <span class="lab"><span data-ed="weddings:pricing.label">{{ site.data.weddings.pricing.label }}</span></span>
    <h2 class="h-lg"><span data-ed="weddings:pricing.heading">{{ site.data.weddings.pricing.heading }}</span></h2>
    <p class="price-basis"><span data-ed="weddings:pricing.note">{{ site.data.weddings.pricing.note }}</span></p>
    <dl class="price-scale">
      {%- for tier in site.data.weddings.pricing.tiers %}
      <div class="price-row{% if tier.lead %} is-lead{% endif %}">
        {%- if tier.photo %}
        {%- comment -%} `photo:` is a wedding gallery path (kelly-dylan/kelly-dylan-07.jpg),
        or a full site-root path when /edit swapped in an upload. {%- endcomment -%}
        {%- assign tier_src = tier.photo | prepend: "/assets/images/portfolio/" -%}
        {%- assign tier_lead = tier.photo | slice: 0, 1 -%}
        {%- if tier_lead == "/" %}{% assign tier_src = tier.photo %}{% endif -%}
        <img class="price-shot" src="{{ site.baseurl }}{{ tier_src }}" alt="{{ tier.alt }}" loading="lazy" sizes="(max-width:900px) 90vw, 30vw" data-ed-photo="weddings:pricing.tiers.{{ forloop.index0 }}.photo">
        {%- endif %}
        <dd><span data-ed="weddings:pricing.tiers.{{ forloop.index0 }}.amount">{{ tier.amount }}</span></dd>
        <dt><span data-ed="weddings:pricing.tiers.{{ forloop.index0 }}.label">{{ tier.label }}</span></dt>
      </div>
      {%- endfor %}
    </dl>
  </div>
</section>

{%- comment -%} The "everything is planned twice" callout was cut here. Both of
its claims (over-sourcing, and capping the calendar) are already answered at
length in the FAQ below, and as a short paragraph between the price and the
reviews it had no job the page was not already doing. Copy is still in
_data/weddings.yml under `assurance:` if it is ever wanted back.
{%- endcomment -%}

{%- comment -%} FAQ before the reviews: the questions a five-figure number
provokes come first, and other couples' words are a warmer handoff into "is your
date still open" than an accordion of logistics.
Dividers follow from the order: the dark band into the FAQ is a change of
background and carries itself, the FAQ and the reviews share a surface so the
hairline sits between them, and the reviews into the tinted CTA is another
background change. {%- endcomment -%}

<!-- FAQ -->
<section class="block">
  <span class="lab"><span data-ed="weddings:faq.label">{{ site.data.weddings.faq.label }}</span></span>
  <h2 class="h-lg"><span data-ed="weddings:faq.heading">{{ site.data.weddings.faq.heading }}</span></h2>
  {% include redesign-faq.html %}
</section>

<hr class="hr-line">

{%- comment -%} .tight is gone: it assumed a quiet neighbour, and the reviews are
now the last content section before the CTA, so they take the ordinary section
break like everything else. It also keeps the hairline above them centred. {%- endcomment -%}
<!-- TESTIMONIALS -->
<section class="block" id="reviews">
  <span class="lab"><span data-ed="weddings:testimonials.label">{{ site.data.weddings.testimonials.label }}</span></span>
  <h2 class="h-lg"><span data-ed="weddings:testimonials.heading">{{ site.data.weddings.testimonials.heading }}</span></h2>
  {% include redesign-testimonials.html %}
</section>

<!-- CLOSING -->
<section class="cta">
  <span class="lab"><span data-ed="weddings:closing.label">{{ site.data.weddings.closing.label }}</span></span>
  <h2 class="disp">{% include em.html t=site.data.weddings.closing.heading k="weddings:closing.heading" %}</h2>
  <p><span data-ed="weddings:closing.body">{{ site.data.weddings.closing.body }}</span></p>
  <a class="btn btn-ink" href="{{ site.baseurl }}/consultation-form"><span data-ed="weddings:closing.button">{{ site.data.weddings.closing.button }}</span> <span>&rarr;</span></a>
</section>
