---
layout: redesign
title: "Our Sustainability Pledge"
seo_title: "Sustainable Lake Tahoe Wedding Florist | Golden Flowers"
permalink: /sustainability
description: "Golden Flowers is a sustainable, foam-free Lake Tahoe wedding florist. California-grown flowers, composting, reuse, and a pledge kept in public."
canonical_url: https://goldenflorals.com/sustainability
redirect_from:
  - /golden-flowers-sustainable-lake-tahoe-wedding-florist
---

<!-- HERO -->
{%- comment -%}
  Copy beside the photograph (Josh, 2026-09-22, kept 2026-09-24). This was
  briefly words-then-a-full-width-landscape to match the design review; Josh
  preferred it the way it was, and the rest of that pass (numbered pledges)
  stayed. .hero-beside carries the whole layout; hero-sm only sets the height
  the grid no longer uses, and is left on so nothing else keyed to it changes.
{%- endcomment -%}
<header class="hero hero-beside hero-sm">
  <div class="hero-in">
    <p class="ey lab"><span data-ed="sustainability:hero.eyebrow">{{ site.data.sustainability.hero.eyebrow }}</span></p>
    <h1 class="disp">{% include em.html t=site.data.sustainability.hero.heading k="sustainability:hero.heading" %}</h1>
    <div class="hero-foot">
      <p class="hero-sub"><span data-ed="sustainability:hero.subheading">{{ site.data.sustainability.hero.subheading }}</span></p>
    </div>
  </div>

  <div class="hs-right">
    <div class="hs-stage">
      <img class="bg" src="{{ site.baseurl }}/assets/images/portfolio/camille-max/camille-max-28.jpg"{% include img-dims.html path="/assets/images/portfolio/camille-max/camille-max-28.jpg" %}{% include img-crop.html path="/assets/images/portfolio/camille-max/camille-max-28.jpg" ctx="page" %} alt="Couple walking a tree-lined lane, flowers grown on California land by Golden Flowers">
    </div>
  </div>
</header>

{% include redesign-pledge.html hide_head=true %}

<!-- CLOSING -->
<section class="cta">
  <h2 class="disp">{% include em.html t=site.data.sustainability.closing.heading k="sustainability:closing.heading" %}</h2>
  <p><span data-ed="sustainability:closing.body">{{ site.data.sustainability.closing.body }}</span></p>
  <a class="btn btn-ink" href="{{ site.baseurl }}/consultation-form"><span data-ed="sustainability:closing.button">{{ site.data.sustainability.closing.button }}</span> <span>&rarr;</span></a>
</section>
