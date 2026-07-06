---
layout: redesign
title: "Hannah & Chance · Lush & Romantic"
seo_title: "Hannah & Chance Wedding Flowers · Lush & Romantic | Golden Flowers"
permalink: /portfolio/hannah-chance
portfolio_key: hannah-chance
description: "A Golden Flowers wedding: lush & romantic floral design for a Lake Tahoe and Sierra Nevada celebration."
hero_photo: hannah-chance-10.jpg
---

{% include portfolio-subnav.html name="Hannah & Chance" %}

<header class="text-hero venue-hero">
  <span class="lab">Lush & Romantic</span>
  <h1>Hannah & Chance</h1>
  {%- assign subtitle = site.data.portfolio[page.portfolio_key] %}
  {%- assign subtitle_k = page.portfolio_key | prepend: "portfolio:" %}
  <p class="th-sub">{% include em.html t=subtitle k=subtitle_k %}</p>
</header>

{% include portfolio-gallery.html slug="hannah-chance" hero="hannah-chance-10.jpg" name="Hannah & Chance" %}

{% include wedding-cta.html %}
