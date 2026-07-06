---
layout: redesign
title: "Catherine & Joaquin · Wildflower Modern"
seo_title: "Catherine & Joaquin Wedding Flowers · Wildflower Modern | Golden Flowers"
permalink: /portfolio/catherine-joaquin
portfolio_key: catherine-joaquin
description: "Catherine & Joaquin at the National Exchange Hotel: a dried, textural fall wedding with pampas, bunny tails, and preserved grasses in warm cream and wheat."
hero_photo: catherine-joaquin-15.jpg
---

{% include portfolio-subnav.html name="Catherine & Joaquin" %}

<header class="text-hero venue-hero">
  <span class="lab">Wildflower Modern</span>
  <h1>Catherine & Joaquin</h1>
  {%- assign subtitle = site.data.portfolio[page.portfolio_key] %}
  {%- assign subtitle_k = page.portfolio_key | prepend: "portfolio:" %}
  <p class="th-sub">{% include em.html t=subtitle k=subtitle_k %}</p>
</header>

{% include portfolio-gallery.html slug="catherine-joaquin" hero="catherine-joaquin-15.jpg" name="Catherine & Joaquin" %}

{% include wedding-cta.html %}
