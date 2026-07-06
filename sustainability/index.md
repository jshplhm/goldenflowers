---
layout: redesign
hero_nav: true
title: "Our Sustainability Pledge"
seo_title: "Sustainable & Eco-Friendly Lake Tahoe Wedding Florist | Golden Flowers"
permalink: /sustainability
description: "Golden Flowers is a sustainable, foam-free Lake Tahoe wedding florist. Farm-grown and California-sourced flowers, no floral foam, composting, reuse, and a steady pull toward lower-impact wedding design."
canonical_url: https://goldenflorals.com/sustainability
redirect_from:
  - /golden-flowers-sustainable-lake-tahoe-wedding-florist
---

<!-- HERO -->
<header class="hero hero-sm">
  <img class="bg" src="{{ site.baseurl }}/assets/images/portfolio/camille-max/camille-max-28.jpg" alt="Couple walking a tree-lined lane, flowers grown on California land by Golden Flowers" style="object-position:center 45%;">
  <div class="hero-in">
    <p class="ey lab"><span data-ed="sustainability:hero.eyebrow">{{ site.data.sustainability.hero.eyebrow }}</span></p>
    <h1 class="disp">{% include em.html t=site.data.sustainability.hero.heading k="sustainability:hero.heading" %}</h1>
    <div class="hero-foot">
      <p class="hero-sub"><span data-ed="sustainability:hero.subheading">{{ site.data.sustainability.hero.subheading }}</span></p>
    </div>
  </div>
</header>

{% include redesign-pledge.html hide_head=true %}

<!-- CLOSING -->
<section class="cta">
  <span class="lab"><span data-ed="sustainability:closing.label">{{ site.data.sustainability.closing.label }}</span></span>
  <h2 class="disp">{% include em.html t=site.data.sustainability.closing.heading k="sustainability:closing.heading" %}</h2>
  <p><span data-ed="sustainability:closing.body">{{ site.data.sustainability.closing.body }}</span></p>
  <a class="btn btn-ink" href="{{ site.baseurl }}/consultation-form"><span data-ed="sustainability:closing.button">{{ site.data.sustainability.closing.button }}</span> <span>&rarr;</span></a>
</section>
