---
layout: redesign
title: "Jenna & Cal · Elevated Minimalist"
seo_title: "Jenna & Cal Wedding Flowers · Elevated Minimalist | Golden Flowers"
permalink: /portfolio/jenna-cal
portfolio_key: jenna-cal
redirect_from:
  - /portfolio-1/jennaandcal
description: "A Golden Flowers wedding: elevated minimalist floral design for a Lake Tahoe and Sierra Nevada celebration."
hero_photo: jenna-cal-15.jpg
---

{% include portfolio-subnav.html name="Jenna & Cal" %}

<header class="text-hero venue-hero">
  <span class="lab">Elevated Minimalist</span>
  <h1>Jenna & Cal</h1>
  {%- assign subtitle = site.data.portfolio[page.portfolio_key] %}
  {%- assign subtitle_k = page.portfolio_key | prepend: "portfolio:" %}
  <p class="th-sub">{% include em.html t=subtitle k=subtitle_k %}</p>
</header>

{% include portfolio-gallery.html slug="jenna-cal" hero="jenna-cal-15.jpg" name="Jenna & Cal" %}

{% include wedding-cta.html %}
