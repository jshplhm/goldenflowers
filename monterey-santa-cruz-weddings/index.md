---
layout: redesign
title: "Monterey & Santa Cruz Wedding Florist"
seo_title: "Monterey, Big Sur & Santa Cruz Wedding Florist | Golden Flowers"
permalink: /monterey-santa-cruz-weddings
description: "Golden Flowers designs wedding flowers in Monterey, Carmel, Big Sur and Santa Cruz. Foam-free florals from a studio led by Brittany, born and raised in Monterey County."
canonical_url: https://goldenflorals.com/monterey-santa-cruz-weddings
# Replaces the Tahoe list in the Florist JSON-LD on THIS page only, so the rest
# of the site keeps telling Google we are a Lake Tahoe florist.
area_served:
  - Monterey
  - Carmel-by-the-Sea
  - Carmel Valley
  - Pacific Grove
  - Pebble Beach
  - Big Sur
  - Santa Cruz
  - Capitola
  - Aptos
  - Santa Cruz Mountains
---
{%- comment -%}
  The Central Coast page (2026-10-25). Built so it cannot cost the Lake Tahoe
  rankings: it is a page of its own, out of the main nav, and nothing about
  the home page, /weddings or the venue pages changed for it. It is reached
  from the footer, the /weddings travel FAQ and Brittany's outreach emails.

  Same parts as a venue page (intro beside its heading, a facts strip, the
  approach grid, FAQ, the closing ask) so it reads as part of the site. The
  photograph comes from `hero_photo` in the data file and shows no caption.
{%- endcomment -%}
{%- assign d = site.data.monterey_santa_cruz -%}

<header class="text-hero text-hero--pic venue-hero">
  <h1>{% include em.html t=d.hero.heading k="monterey_santa_cruz:hero.heading" %}</h1>
  <p class="th-sub">{% include em.html t=d.hero.subheading k="monterey_santa_cruz:hero.subheading" %}</p>
</header>

{%- comment -%} The photograph, with no line under it (Josh, 2026-10-25).
Written here rather than through venue-hero.html, which drops any photo that
has no credit. {%- endcomment -%}
{%- assign hp = d.hero_photo -%}
{%- if hp.src and hp.src != "" %}
<figure class="page-pic">
  <span class="pp-clip"><img src="{{ site.baseurl }}{{ hp.src }}"{% include img-crop.html path=hp.src ctx="page" %} alt="{{ hp.alt }}"
       width="1500" height="844" loading="eager" fetchpriority="high"
       sizes="(min-width:1500px) 1500px, 100vw"></span>
</figure>
{%- endif %}

<section class="section">
  <div class="container">
    <div class="venue-intro">
      <div class="vi-head">
        <h2>{% include em.html t=d.intro.heading k="monterey_santa_cruz:intro.heading" %}</h2></div>
      <div class="vi-body">
        {%- for p in d.intro.paragraphs %}
        <p>{% include em.html t=p k="monterey_santa_cruz:intro.paragraphs" i=forloop.index0 %}</p>
        {%- endfor %}
      </div>
    </div>
    <div class="facts-strip">
      {%- for a in d.areas %}
      <div class="fact"><h3 class="fact-h"><span data-ed="monterey_santa_cruz:areas.{{ forloop.index0 }}.label">{{ a.label }}</span></h3><p class="fact-body">{% include em.html t=a.body k="monterey_santa_cruz:areas" i=forloop.index0 f="body" %}</p></div>
      {%- endfor %}
    </div>
  </div>
</section>

<section class="section">
  <div class="container">
    <h2><span data-ed="monterey_santa_cruz:approach.heading">{{ d.approach.heading }}</span></h2>
    <div class="philosophy-grid">
      {%- for item in d.approach.items %}
      <div class="philosophy-item"><h3><span data-ed="monterey_santa_cruz:approach.items.{{ forloop.index0 }}.title">{{ item.title }}</span></h3><p>{% include em.html t=item.body k="monterey_santa_cruz:approach.items" i=forloop.index0 f="body" %}</p></div>
      {%- endfor %}
    </div>
  </div>
</section>

<section class="section">
  <div class="container">
    <div class="faq-split">
      <div class="faq-head">
        <h2><span data-ed="monterey_santa_cruz:faq.heading">{{ d.faq.heading }}</span></h2>
      </div>
      {% include redesign-faq.html %}
    </div>
  </div>
</section>

{%- comment -%} No number here: the coast has no typical range of its own yet,
and /weddings is the one place the prices live. {%- endcomment %}
<section class="section">
  <div class="container">
    <div class="venue-intro">
      <div class="vi-head">
        <h2><span data-ed="monterey_santa_cruz:pricing.heading">{{ d.pricing.heading }}</span></h2></div>
      <div class="vi-body">
        <p>{% include em.html t=d.pricing.body k="monterey_santa_cruz:pricing.body" %}</p>
        <p><a href="{{ site.baseurl }}/weddings#pricing" class="txt-link"><span data-ed="monterey_santa_cruz:pricing.link_pricing">{{ d.pricing.link_pricing }}</span> &rarr;</a>
        <a href="{{ site.baseurl }}/weddings#price-guide" class="txt-link" style="margin-left:24px;"><span data-ed="monterey_santa_cruz:pricing.link_list">{{ d.pricing.link_list }}</span> &rarr;</a></p>
      </div>
    </div>
  </div>
</section>

<div class="cta-section">
  <h2>{% include em.html t=d.cta.heading k="monterey_santa_cruz:cta.heading" %}</h2>
  <p>{% include em.html t=d.cta.body k="monterey_santa_cruz:cta.body" %}</p>
  <a href="{{ site.baseurl }}/consultation-form" class="btn btn-ink" data-consult-open><span data-ed="monterey_santa_cruz:cta.button">{{ d.cta.button }}</span> <span>&rarr;</span></a>
</div>
