---
layout: redesign
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
{%- comment -%}
  Words, then the photograph (2026-09-24), the treatment /sustainability took
  the same day. Copy beside the picture put a headline and a photograph at the
  same height competing for the same attention and left the column under the
  headline empty.
{%- endcomment -%}
<header class="text-hero">
  <span class="lab"><span data-ed="weddings:hero.label">{{ site.data.weddings.hero.label }}</span></span>
  <h1>{% include em.html t=site.data.weddings.hero.heading k="weddings:hero.heading" %}</h1>
  <p class="th-sub"><span data-ed="weddings:hero.subheading">{{ site.data.weddings.hero.subheading }}</span></p>
  {%- comment -%} Deliberately NOT "Check your date": the nav carries that on
  every screen, so the hero can serve the reason someone opened this page. It
  jumps to the investment block. {%- endcomment -%}
  <a class="btn btn-ink" href="#pricing"><span data-ed="weddings:hero.button_primary">{{ site.data.weddings.hero.button_primary }}</span> <span>&darr;</span></a>
</header>

<figure class="page-pic">
  <img src="{{ site.baseurl }}/assets/images/portfolio/kelly-dylan/kelly-dylan-13.jpg"
       alt="Bride holding a lush garden-rose and ranunculus bouquet at a Lake Tahoe beach wedding by Golden Flowers"
       width="1500" height="844" loading="eager" fetchpriority="high"
       style="object-position:center 55%;" sizes="(min-width:1500px) 1500px, 100vw">
</figure>

<!-- PROCESS -->
{%- comment -%}
  NUMBERED ROWS ACROSS THE PAGE (2026-09-24). This was a timeline down a
  narrow left column with an icon per step, which spent an icon on each row,
  wrapped every line early, and left more than half the width empty. Each step
  is now a row: number and timing on the left, the step and what happens on
  the right, hairline between. Seven steps read as seven steps.

  `icon:` in _data/weddings.yml is no longer rendered. It is left in the data
  rather than stripped out, so restoring the old treatment is a markup change
  and not a data re-entry job.
{%- endcomment -%}
<section class="block proc-rows">
  <div class="proc-head">
    <span class="lab"><span data-ed="weddings:process.label">{{ site.data.weddings.process.label }}</span></span>
    <h2 class="h-lg"><span data-ed="weddings:process.heading">{{ site.data.weddings.process.heading }}</span></h2>
    <p class="proc-intro"><span data-ed="weddings:process.intro">{{ site.data.weddings.process.intro }}</span></p>
  </div>
  {%- comment -%} Steps carry an optional `phase`; a heading is emitted wherever
  it changes, which breaks the run into "before you book" and "once you're
  booked". Leave every phase blank and it renders as one continuous list.
  {%- endcomment -%}
  {%- assign seen_phase = "" %}
  <ol class="proc-list">
  {%- for step in site.data.weddings.process.steps %}
  {%- if step.phase and step.phase != seen_phase %}
    <li class="proc-phase"><span data-ed="weddings:process.steps.{{ forloop.index0 }}.phase">{{ step.phase }}</span></li>
  {%- assign seen_phase = step.phase %}
  {%- endif %}
    <li class="proc-row">
      <span class="proc-n" aria-hidden="true">{{ forloop.index | prepend: "0" | slice: -2, 2 }}</span>
      <span class="proc-when"><span data-ed="weddings:process.steps.{{ forloop.index0 }}.when">{{ step.when }}</span></span>
      <div class="proc-body">
        <h3><span data-ed="weddings:process.steps.{{ forloop.index0 }}.title">{{ step.title }}</span></h3>
        <p><span data-ed="weddings:process.steps.{{ forloop.index0 }}.body">{{ step.body }}</span></p>
      </div>
    </li>
  {%- endfor %}
  </ol>
</section>

<!-- WHAT'S INCLUDED -->
<section class="block incl">
  <span class="lab"><span data-ed="weddings:included.label">{{ site.data.weddings.included.label }}</span></span>
  <h2 class="h-lg"><span data-ed="weddings:included.heading">{{ site.data.weddings.included.heading }}</span></h2>
  <div class="incl-grid">
    {%- for item in site.data.weddings.included.items %}
    <div class="incl-item">
      <h3><span data-ed="weddings:included.items.{{ forloop.index0 }}.title">{{ item.title }}</span></h3>
      {%- assign b = item.body | strip %}
      <p{% if b == "" %} class="ed-empty"{% endif %}><span data-ed="weddings:included.items.{{ forloop.index0 }}.body" data-ed-hint="Describe what this covers">{{ item.body }}</span></p>
    </div>
    {%- endfor %}
  </div>
</section>

<!-- INVESTMENT -->
{%- comment -%}
  One figure, on the page's own ground (2026-09-24). This was a dark forest
  band carrying a three-tier ladder with a photograph per tier. The band is
  gone because the page reads as one surface now, and the ladder is gone
  because a minimum and an entry price are the two things the no-price call
  ruled out. See the header on `pricing:` in _data/weddings.yml.

  #pricing sits on the SECTION, which carries the padding the anchor needs.
{%- endcomment -%}
{%- assign fig = site.data.weddings.pricing.figure | strip -%}
{%- if fig != "" %}
<section class="block invest" id="pricing">
  <span class="lab"><span data-ed="weddings:pricing.label">{{ site.data.weddings.pricing.label }}</span></span>
  <div class="invest-row">
    <div class="invest-fig">
      <p class="invest-amount"><span data-ed="weddings:pricing.figure">{{ site.data.weddings.pricing.figure }}</span></p>
      <p class="invest-label"><span data-ed="weddings:pricing.figure_label">{{ site.data.weddings.pricing.figure_label }}</span></p>
    </div>
    <div class="invest-note">
      <h2><span data-ed="weddings:pricing.heading">{{ site.data.weddings.pricing.heading }}</span></h2>
      <p><span data-ed="weddings:pricing.note">{{ site.data.weddings.pricing.note }}</span></p>
    </div>
  </div>
</section>
{%- endif %}

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
{%- comment -%} Heading in a left rail, questions in the right column
(2026-09-23). Full width, the accordion was a stack of hairlines running the
whole measure with the heading stranded above it and half the row empty after
each question. {%- endcomment -%}
<section class="block faq-split">
  <div class="faq-head">
    <span class="lab"><span data-ed="weddings:faq.label">{{ site.data.weddings.faq.label }}</span></span>
    <h2 class="h-lg"><span data-ed="weddings:faq.heading">{{ site.data.weddings.faq.heading }}</span></h2>
  </div>
  {% include redesign-faq.html %}
</section>

<!-- CLOSING -->
<section class="cta">
  <span class="lab"><span data-ed="weddings:closing.label">{{ site.data.weddings.closing.label }}</span></span>
  <h2 class="disp">{% include em.html t=site.data.weddings.closing.heading k="weddings:closing.heading" %}</h2>
  <p><span data-ed="weddings:closing.body">{{ site.data.weddings.closing.body }}</span></p>
  <a class="btn btn-ink" href="{{ site.baseurl }}/consultation-form"><span data-ed="weddings:closing.button">{{ site.data.weddings.closing.button }}</span> <span>&rarr;</span></a>
</section>
