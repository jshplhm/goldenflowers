---
layout: redesign
title: "Jacqueline & Brandon · Lush & Romantic"
seo_title: "Jacqueline & Brandon Wedding Flowers · Lush & Romantic | Golden Flowers"
permalink: /portfolio/jacqueline-brandon
portfolio_key: jacqueline-brandon
redirect_from:
  - /portfolio-1/jacquelineandbrandon
description: "A Golden Flowers wedding: lush & romantic floral design for a Lake Tahoe and Sierra Nevada celebration."
hero_photo: jacqueline-brandon-11.jpg
---

{% include portfolio-subnav.html name="Jacqueline & Brandon" %}

<header class="text-hero venue-hero">
  <span class="lab">Lush & Romantic</span>
  <h1>Jacqueline & Brandon</h1>
  {%- assign subtitle = site.data.portfolio[page.portfolio_key] %}
  {%- assign subtitle_k = page.portfolio_key | prepend: "portfolio:" %}
  <p class="th-sub">{% include em.html t=subtitle k=subtitle_k %}</p>
</header>

{% include portfolio-gallery.html slug="jacqueline-brandon" hero="jacqueline-brandon-11.jpg" name="Jacqueline & Brandon" %}

{% include wedding-cta.html %}
