---
layout: redesign
title: "Emma & Ross · Elevated Minimalist"
seo_title: "Emma & Ross Wedding Flowers · Elevated Minimalist | Golden Flowers"
permalink: /portfolio/emma-ross
portfolio_key: emma-ross
redirect_from:
  - /portfolio-1/emma-and-ross
description: "A Golden Flowers wedding: elevated minimalist floral design for a Lake Tahoe and Sierra Nevada celebration."
hero_photo: emma-ross-08.jpg
---

{% include portfolio-subnav.html name="Emma & Ross" %}

<header class="text-hero venue-hero">
  <span class="lab">Elevated Minimalist</span>
  <h1>Emma & Ross</h1>
  {%- assign subtitle = site.data.portfolio[page.portfolio_key] %}
  {%- assign subtitle_k = page.portfolio_key | prepend: "portfolio:" %}
  <p class="th-sub">{% include em.html t=subtitle k=subtitle_k %}</p>
</header>

{% include portfolio-gallery.html slug="emma-ross" hero="emma-ross-08.jpg" name="Emma & Ross" %}

{% include wedding-cta.html %}
