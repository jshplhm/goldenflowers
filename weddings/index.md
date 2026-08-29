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

<!-- ===================================================================
     PROCESS & PRICING.

     2026-08-28: the estimator moved off this page to /pricing-tool
     (noindex, unlinked, no CTA) and the published three-figure ladder
     came back in its place. Every figure and every photo lives in
     _data/weddings.yml `pricing`; read that block's header before
     touching a number or a photo pairing.

     Order: hero -> process -> the ladder -> reviews (hidden) -> FAQ
     -> closing CTA.
     =================================================================== -->

<!-- HERO -->
<header class="hero hero-land">
  <img class="bg" src="{{ site.baseurl }}/assets/images/portfolio/kelly-dylan/kelly-dylan-13.jpg" alt="Bride holding a lush garden-rose and ranunculus bouquet at a Lake Tahoe beach wedding by Golden Flowers" style="object-position:center 55%;">
  <div class="hero-in">
    <p class="ey lab"><span data-ed="weddings:hero.label">{{ site.data.weddings.hero.label }}</span></p>
    <h1 class="disp">{% include em.html t=site.data.weddings.hero.heading k="weddings:hero.heading" %}</h1>
    <div class="hero-foot">
      <p class="hero-sub"><span data-ed="weddings:hero.subheading">{{ site.data.weddings.hero.subheading }}</span></p>
      {%- comment -%} Deliberately NOT "Check your date": the nav carries that
      on every screen, so the hero can serve the reason someone opened this
      page. It jumps to the price ladder. {%- endcomment -%}
      <a class="btn" href="#pricing"><span data-ed="weddings:hero.button_primary">{{ site.data.weddings.hero.button_primary }}</span> <span>&darr;</span></a>
    </div>
  </div>
</header>

<!-- PROCESS -->
<section class="proc">
  <div class="proc-wrap">
    <div class="proc-head">
      <span class="lab"><span data-ed="weddings:process.label">{{ site.data.weddings.process.label }}</span></span>
      <h2><span data-ed="weddings:process.heading">{{ site.data.weddings.process.heading }}</span></h2>
      <p><span data-ed="weddings:process.intro">{{ site.data.weddings.process.intro }}</span></p>
    </div>
    {%- comment -%} Steps carry an optional `phase`; a heading is emitted wherever
    it changes, which breaks the timeline into "before you book" and "once you're
    booked". Leave every phase blank and it renders as one continuous run.
    {%- endcomment -%}
    {%- assign seen_phase = "" %}
    {%- for step in site.data.weddings.process.steps %}
    {%- if step.phase and step.phase != seen_phase %}
    <p class="proc-phase"><span data-ed="weddings:process.steps.{{ forloop.index0 }}.phase">{{ step.phase }}</span></p>
    {%- assign seen_phase = step.phase %}
    {%- endif %}
    <div class="proc-step">
      {%- comment -%} The icon replaced the numeral, and inherits .proc-num
      wholesale: that rule's background is what punches a hole in the timeline
      rail behind it. Without it the rail draws through the icon. {%- endcomment -%}
      <div class="proc-num proc-icon">{% include icon.html name=step.icon %}</div>
      <div><span class="proc-when"><span data-ed="weddings:process.steps.{{ forloop.index0 }}.when">{{ step.when }}</span></span><h3><span data-ed="weddings:process.steps.{{ forloop.index0 }}.title">{{ step.title }}</span></h3><p><span data-ed="weddings:process.steps.{{ forloop.index0 }}.body">{{ step.body }}</span></p></div>
    </div>
    {%- endfor %}
  </div>
</section>

<!-- INVESTMENT -->
{%- comment -%} One figure and one label per tier. No cards: a card implies a
package, and we are deliberately not saying what each figure buys.

#pricing sits on the SECTION, not the heading, because the section carries its
own padding. See the .pricing-dark rule in redesign.css. {%- endcomment -%}
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
        or a full site-root path when /edit swapped in an upload. The
        data-ed-photo attribute is what makes the photo clickable in /edit:
        it names the data file and the key, because the path is not written
        in this page's source for the editor to find. {%- endcomment -%}
        {%- assign tier_src = tier.photo | prepend: "/assets/images/portfolio/" -%}
        {%- assign tier_lead = tier.photo | slice: 0, 1 -%}
        {%- if tier_lead == "/" %}{% assign tier_src = tier.photo %}{% endif -%}
        <img class="price-shot" src="{{ site.baseurl }}{{ tier_src }}" alt="{{ tier.alt }}" loading="lazy" width="800" height="1000" sizes="(max-width:900px) 90vw, 30vw" data-ed-photo="weddings:pricing.tiers.{{ forloop.index0 }}.photo">
        {%- endif %}
        {%- if tier.badge %}<span class="price-badge"><span data-ed="weddings:pricing.tiers.{{ forloop.index0 }}.badge">{{ tier.badge }}</span></span>{% endif %}
        <dd><span data-ed="weddings:pricing.tiers.{{ forloop.index0 }}.amount">{{ tier.amount }}</span></dd>
        <dt><span data-ed="weddings:pricing.tiers.{{ forloop.index0 }}.label">{{ tier.label }}</span></dt>
        {%- comment -%} The a la carte offer, deliberately a line inside the
        first tier rather than a column of its own. Blank it in the CMS to
        withdraw the offer; the paragraph disappears on its own. {%- endcomment -%}
        {%- if tier.entry_note and tier.entry_note != "" %}
        <p class="price-entry"><span data-ed="weddings:pricing.tiers.{{ forloop.index0 }}.entry_note">{{ tier.entry_note }}</span></p>
        {%- endif %}
      </div>
      {%- endfor %}
    </dl>
  </div>
</section>

{%- comment -%} REVIEWS: hidden by `testimonials.show: false` in
_data/weddings.yml, not deleted. The 13 quotes still live in
_data/testimonials.yml and still feed the Review/aggregateRating JSON-LD in
the layout. Flip show: true to bring the section back, and restore the home
page's "Read more reviews" link (home.yml testimonial.link) in the same
change, because it points at the #reviews anchor below. {%- endcomment -%}
{%- if site.data.weddings.testimonials.show %}
<section class="block" id="reviews">
  <span class="lab"><span data-ed="weddings:testimonials.label">{{ site.data.weddings.testimonials.label }}</span></span>
  <h2 class="h-lg"><span data-ed="weddings:testimonials.heading">{{ site.data.weddings.testimonials.heading }}</span></h2>
  {% include redesign-testimonials.html %}
</section>

<hr class="hr-line">
{%- endif %}

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
