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

     Order (2026-09-25, Josh): hero -> what it costs (what's included folded
     in) -> process -> a photograph -> reviews (hidden) -> FAQ -> closing CTA.
     The nav calls this page Pricing, so the price comes first; it used to
     sit ~2,300px down behind seven process steps, with a "Jump to pricing"
     button in the hero apologising for the order.
     =================================================================== -->

<!-- HERO -->
{%- comment -%}
  Words, then the photograph (2026-09-24), the treatment /sustainability took
  the same day. Copy beside the picture put a headline and a photograph at the
  same height competing for the same attention and left the column under the
  headline empty.
{%- endcomment -%}
<header class="text-hero text-hero--pic">
  <span class="lab"><span data-ed="weddings:hero.label">{{ site.data.weddings.hero.label }}</span></span>
  <h1>{% include em.html t=site.data.weddings.hero.heading k="weddings:hero.heading" %}</h1>
  <p class="th-sub"><span data-ed="weddings:hero.subheading">{{ site.data.weddings.hero.subheading }}</span></p>
  {%- comment -%} No hero button (2026-09-25). It was "Jump to pricing",
  there only because pricing sat below the process. Pricing is next now, and
  the nav carries "Check your date" on every screen. {%- endcomment -%}
</header>

<figure class="page-pic">
  <img src="{{ site.baseurl }}/assets/images/portfolio/kelly-dylan/kelly-dylan-13.jpg"
       alt="Bride holding a lush garden-rose and ranunculus bouquet at a Lake Tahoe beach wedding by Golden Flowers"
       width="1500" height="844" loading="eager" fetchpriority="high"
{% include img-crop.html path="/assets/images/portfolio/kelly-dylan/kelly-dylan-13.jpg" ctx="page" %} sizes="(min-width:1500px) 1500px, 100vw">
</figure>

<!-- INVESTMENT -->
{%- comment -%}
  THE PAGE IS CALLED PRICING, SO PRICING GETS A SECTION (2026-09-24, Josh).

  This was one figure, one caption and one paragraph on the page's own ground,
  sitting between "what's included" and the FAQ with nothing to mark it. A
  reader who came here from a nav link reading "Pricing" scrolled past seven
  process steps and six inclusions to reach four lines.

  It is now a band: the position (no minimum, quoted individually), two
  figures, the four things that move the number, and the a la carte answer for
  a smaller budget.

  THE TINT. --bg2 as a SECTION GROUND is reserved, by a rule written into the
  token itself, for the closing block alone. The rule exists because the header
  is a fixed colour sitting over the top of a page, so a second ground there
  made it read grey on one page and white on another. This section is in the
  middle of a page and the header never touches it, so the bug the rule guards
  against cannot happen here. It is one band on one page, not the per-section
  banding that was reversed on 2026-09-16 for making the page shout. Josh asked
  for the tint so pricing reads as its own place. See --bg2 in redesign.css.

  #pricing sits on the SECTION, which carries the padding the anchor needs.
{%- endcomment -%}
{%- assign pr = site.data.weddings.pricing -%}
{%- assign nfig = pr.figures | size -%}
{%- if nfig > 0 %}
<section class="invest-band" id="pricing">
  <div class="invest-wrap">
    <div class="invest-head">
      <h2><span data-ed="weddings:pricing.heading">{{ pr.heading }}</span></h2>
      <p class="invest-intro"><span data-ed="weddings:pricing.intro">{{ pr.intro }}</span></p>
    </div>

    {%- comment -%} Two figures read as a range and a ceiling. The grid is set
    from the count so a single figure still fills the row rather than sitting in
    a half-empty one. {%- endcomment -%}
    {%- comment -%} With `label`s the figures render as a quiet table (2026-09-25):
    what the number is on the left in small caps, the figure on the right, all
    three the same size and a step under the section heading. An optional
    caption sits under the label. Without labels, the older figure-over-caption
    blocks. {%- endcomment -%}
    {%- assign fig_table = pr.figures.first.label | strip -%}
    <div class="invest-figs{% if fig_table != "" %} invest-figs--table{% endif %}" data-n="{{ nfig }}">
      {%- for f in pr.figures %}
      {%- assign fi = forloop.index0 %}
      <div class="invest-fig">
        {%- if fig_table != "" %}
        <div class="invest-lab">
          <p class="invest-label"><span data-ed="weddings:pricing.figures.{{ fi }}.label">{{ f.label }}</span></p>
          {%- assign fc = f.caption | strip %}
          <p class="invest-cap{% if fc == "" %} ed-empty{% endif %}"><span data-ed="weddings:pricing.figures.{{ fi }}.caption">{{ f.caption }}</span></p>
        </div>
        <p class="invest-amount"><span data-ed="weddings:pricing.figures.{{ fi }}.amount">{{ f.amount }}</span></p>
        {%- else %}
        <p class="invest-amount"><span data-ed="weddings:pricing.figures.{{ fi }}.amount">{{ f.amount }}</span></p>
        <p class="invest-cap"><span data-ed="weddings:pricing.figures.{{ fi }}.caption">{{ f.caption }}</span></p>
        {%- endif %}
      </div>
      {%- endfor %}
    </div>


    {%- comment -%} What's included, folded in (2026-09-25). It was its own
    section of six bare names between the process and the price; what it
    answers is "what does that figure buy", so it sits under the figures. {%- endcomment -%}
    {%- assign inc = site.data.weddings.included -%}
    <div class="invest-incl">
      <h3 class="grp-h"><span data-ed="weddings:included.label">{{ inc.label }}</span></h3>
      <ul class="invest-incl-list">
        {%- for item in inc.items %}
        <li><span class="ii-t"><span data-ed="weddings:included.items.{{ forloop.index0 }}.title">{{ item.title }}</span></span>
          {%- assign b = item.body | strip %}
          <span class="ii-b{% if b == "" %} ed-empty{% endif %}"><span data-ed="weddings:included.items.{{ forloop.index0 }}.body" data-ed-hint="Describe what this covers">{{ item.body }}</span></span></li>
        {%- endfor %}
      </ul>
    </div>

    {%- assign ndrv = pr.drivers | size -%}
    {%- if ndrv > 0 %}
    <div class="invest-drivers">
      <h3 class="grp-h"><span data-ed="weddings:pricing.drivers_label">{{ pr.drivers_label }}</span></h3>
      <dl class="invest-dl">
        {%- for d in pr.drivers %}
        <div>
          <dt><span data-ed="weddings:pricing.drivers.{{ forloop.index0 }}.title">{{ d.title }}</span></dt>
          <dd><span data-ed="weddings:pricing.drivers.{{ forloop.index0 }}.body">{{ d.body }}</span></dd>
        </div>
        {%- endfor %}
      </dl>
    </div>
    {%- endif %}

    {%- comment -%} Gated on the body, not the heading: emptying the body is how
    the a la carte offer is withdrawn, and a heading left standing over nothing
    is what gating on the heading would leave behind. {%- endcomment -%}
    {%- assign sm = pr.smaller.body | strip -%}
    {%- if sm != "" %}
    <div class="invest-small">
      <h3><span data-ed="weddings:pricing.smaller.heading">{{ pr.smaller.heading }}</span></h3>
      <p><span data-ed="weddings:pricing.smaller.body">{{ pr.smaller.body }}</span></p>
      {%- assign smb = pr.smaller.button | strip -%}
      {%- if smb != "" %}
      <a class="txt-link" href="{{ site.baseurl }}/consultation-form" data-consult-open><span data-ed="weddings:pricing.smaller.button">{{ pr.smaller.button }}</span> &rarr;</a>
      {%- endif %}
    </div>
    {%- endif %}
  </div>
</section>
{%- endif %}

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
    <li class="proc-phase grp-h"><span data-ed="weddings:process.steps.{{ forloop.index0 }}.phase">{{ step.phase }}</span></li>
  {%- assign seen_phase = step.phase %}
  {%- endif %}
    <li class="proc-row">
      <span class="proc-ic" aria-hidden="true">{% include icon.html name=step.icon %}</span>
      {%- comment -%} No numerals (2026-09-25). The steps are an <ol>, so order is
      in the markup, and the "when" column already reads as the sequence;
      01-07 running across two phases made 05 look like it started a new list. {%- endcomment %}
      <div class="proc-body">
        <h3><span data-ed="weddings:process.steps.{{ forloop.index0 }}.title">{{ step.title }}</span></h3>
        <p><span data-ed="weddings:process.steps.{{ forloop.index0 }}.body">{{ step.body }}</span></p>
      </div>
    </li>
  {%- endfor %}
  </ol>
</section>

<!-- A ROOM, DESIGNED. The page was ~7,300px of words under one photograph at
     the top; this is what the upper figure buys, a room dressed end to end
     (Palisades High Camp). Landscape, so it takes a full row. -->
<figure class="page-pic page-pic--mid">
  <img src="{{ site.baseurl }}/assets/images/portfolio/lynn-aaron/lynn-aaron-26.jpg"{% include img-dims.html path="/assets/images/portfolio/lynn-aaron/lynn-aaron-26.jpg" %}
       alt="Reception room at Palisades High Camp dressed end to end: greenery climbing the timber posts, long tables in blush and olive, lounge seating and a tiered cake"
       loading="lazy" sizes="(min-width:1500px) 1500px, 100vw">
</figure>

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
    <h2 class="h-lg"><span data-ed="weddings:faq.heading">{{ site.data.weddings.faq.heading }}</span></h2>
  </div>
  {% include redesign-faq.html %}
</section>

<!-- CLOSING -->
<section class="cta">
  <h2 class="disp">{% include em.html t=site.data.weddings.closing.heading k="weddings:closing.heading" %}</h2>
  <p><span data-ed="weddings:closing.body">{{ site.data.weddings.closing.body }}</span></p>
  <a class="btn btn-ink" href="{{ site.baseurl }}/consultation-form"><span data-ed="weddings:closing.button">{{ site.data.weddings.closing.button }}</span> <span>&rarr;</span></a>
</section>
