---
layout: redesign
title: "Niamh & Nick · Elevated Minimalist"
seo_title: "Niamh & Nick Wedding Flowers · Elevated Minimalist | Golden Flowers"
permalink: /portfolio/niamh-nick
portfolio_key: niamh-nick
description: "A Golden Flowers wedding: elevated minimalist floral design for a Lake Tahoe and Sierra Nevada celebration."
hero_photo: niamh-nick-04.jpg
---

{% include portfolio-subnav.html name="Niamh & Nick" %}

<header class="text-hero venue-hero">
  <span class="lab">Elevated Minimalist</span>
  <h1>Niamh & Nick</h1>
  {%- assign subtitle = site.data.portfolio[page.portfolio_key] %}
  {%- assign subtitle_k = page.portfolio_key | prepend: "portfolio:" %}
  <p class="th-sub">{% include em.html t=subtitle k=subtitle_k %}</p>
</header>

{% include portfolio-gallery.html slug="niamh-nick" hero="niamh-nick-04.jpg" name="Niamh & Nick" %}

{% include wedding-cta.html %}
