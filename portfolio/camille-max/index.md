---
layout: redesign
title: "Camille & Max · Wildflower Modern"
seo_title: "Camille & Max Wedding Flowers · Wildflower Modern | Golden Flowers"
permalink: /portfolio/camille-max
portfolio_key: camille-max
redirect_from:
  - /portfolio-1/camille-and-max
description: "Camille & Max at the North Star House in Grass Valley: an autumn wedding with cascading blush and burgundy bouquets and an arbor that looks grown in place."
hero_photo: camille-max-16.jpg
---

{% include portfolio-subnav.html name="Camille & Max" %}

<header class="text-hero venue-hero">
  <span class="lab">Wildflower Modern</span>
  <h1>Camille & Max</h1>
  {%- assign subtitle = site.data.portfolio[page.portfolio_key] %}
  {%- assign subtitle_k = page.portfolio_key | prepend: "portfolio:" %}
  <p class="th-sub">{% include em.html t=subtitle k=subtitle_k %}</p>
</header>

{% include portfolio-gallery.html slug="camille-max" hero="camille-max-16.jpg" name="Camille & Max" %}

{% include wedding-cta.html %}
