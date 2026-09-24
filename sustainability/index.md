---
layout: redesign
title: "Our Sustainability Pledge"
seo_title: "Sustainable Lake Tahoe Wedding Florist | Golden Flowers"
permalink: /sustainability
description: "Golden Flowers is a sustainable, foam-free Lake Tahoe wedding florist. Farm-grown, California-sourced flowers, composting, reuse, and a pledge kept in public."
canonical_url: https://goldenflorals.com/sustainability
redirect_from:
  - /golden-flowers-sustainable-lake-tahoe-wedding-florist
---

<!-- HERO -->
{%- comment -%}
  WORDS, THEN THE PHOTOGRAPH (Josh, 2026-09-24). This was copy beside the
  picture, which put a headline and a photograph at the same height competing
  for the same attention, and left the column under the headline empty. The
  subject here is a place, and a place wants width: the headline owns the top,
  then the photograph runs the full measure underneath at full strength.

  Studio deliberately does NOT do this. Its photograph is of a person, and a
  full-width landscape crop of a person loses the face.
{%- endcomment -%}
<header class="text-hero">
  <span class="lab"><span data-ed="sustainability:hero.eyebrow">{{ site.data.sustainability.hero.eyebrow }}</span></span>
  <h1>{% include em.html t=site.data.sustainability.hero.heading k="sustainability:hero.heading" %}</h1>
  <p class="th-sub"><span data-ed="sustainability:hero.subheading">{{ site.data.sustainability.hero.subheading }}</span></p>
</header>

<figure class="page-pic">
  <img src="{{ site.baseurl }}/assets/images/portfolio/camille-max/camille-max-28.jpg"
       alt="Couple walking a tree-lined lane, flowers grown on California land by Golden Flowers"
       width="1500" height="844" loading="eager" fetchpriority="high"
       style="object-position:center 45%;" sizes="(min-width:1500px) 1500px, 100vw">
</figure>

{% include redesign-pledge.html hide_head=true %}

<!-- CLOSING -->
<section class="cta">
  <span class="lab"><span data-ed="sustainability:closing.label">{{ site.data.sustainability.closing.label }}</span></span>
  <h2 class="disp">{% include em.html t=site.data.sustainability.closing.heading k="sustainability:closing.heading" %}</h2>
  <p><span data-ed="sustainability:closing.body">{{ site.data.sustainability.closing.body }}</span></p>
  <a class="btn btn-ink" href="{{ site.baseurl }}/consultation-form"><span data-ed="sustainability:closing.button">{{ site.data.sustainability.closing.button }}</span> <span>&rarr;</span></a>
</section>
