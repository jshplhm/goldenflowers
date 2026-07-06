---
layout: redesign
title: "Sarah & Brian · Elevated Minimalist"
seo_title: "Sarah & Brian Wedding Flowers · Elevated Minimalist | Golden Flowers"
permalink: /portfolio/sarah-brian
portfolio_key: sarah-brian
redirect_from:
  - /portfolio-1/sarahandbrian
description: "Sarah & Brian at The Miner's Foundry: an all-white, garden-boho wedding with white roses, ranunculus, baby's breath, and hanging greenery against old stone."
hero_photo: sarah-brian-06.jpg
---

{% include portfolio-subnav.html name="Sarah & Brian" %}

<header class="text-hero venue-hero">
  <span class="lab">Elevated Minimalist</span>
  <h1>Sarah & Brian</h1>
  {%- assign subtitle = site.data.portfolio[page.portfolio_key] %}
  {%- assign subtitle_k = page.portfolio_key | prepend: "portfolio:" %}
  <p class="th-sub">{% include em.html t=subtitle k=subtitle_k %}</p>
</header>

{% include portfolio-gallery.html slug="sarah-brian" hero="sarah-brian-06.jpg" name="Sarah & Brian" %}

{% include wedding-cta.html %}
