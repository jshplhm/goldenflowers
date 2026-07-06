---
layout: redesign
title: "Lynn & Aaron · Lush & Romantic"
seo_title: "Lynn & Aaron Wedding Flowers · Lush & Romantic | Golden Flowers"
permalink: /portfolio/lynn-aaron
portfolio_key: lynn-aaron
redirect_from:
  - /portfolio-1/lynn-and-aaron
description: "Lynn & Aaron at Palisades High Camp: jewel-toned wedding flowers with coral peonies, oxblood dahlias, and trailing amaranthus, scaled for the mountaintop."
hero_photo: lynn-aaron-16.jpg
---

{% include portfolio-subnav.html name="Lynn & Aaron" %}

<header class="text-hero venue-hero">
  <span class="lab">Lush & Romantic</span>
  <h1>Lynn & Aaron</h1>
  {%- assign subtitle = site.data.portfolio[page.portfolio_key] %}
  {%- assign subtitle_k = page.portfolio_key | prepend: "portfolio:" %}
  <p class="th-sub">{% include em.html t=subtitle k=subtitle_k %}</p>
</header>

{% include portfolio-gallery.html slug="lynn-aaron" hero="lynn-aaron-16.jpg" name="Lynn & Aaron" %}

{% include wedding-cta.html %}
