---
layout: redesign
title: "Kelly & Dylan · Wildflower Modern"
seo_title: "Kelly & Dylan Wedding Flowers · Wildflower Modern | Golden Flowers"
permalink: /portfolio/kelly-dylan
portfolio_key: kelly-dylan
description: "Kelly & Dylan at the North Tahoe Event Center: a blue-and-citrus Lake Tahoe beach ceremony with delphinium, anemone, thistle, and orange ranunculus."
hero_photo: kelly-dylan-08.jpg
---

{% include portfolio-subnav.html name="Kelly & Dylan" %}

<header class="text-hero venue-hero">
  <span class="lab">Wildflower Modern</span>
  <h1>Kelly & Dylan</h1>
  {%- assign subtitle = site.data.portfolio[page.portfolio_key] %}
  {%- assign subtitle_k = page.portfolio_key | prepend: "portfolio:" %}
  <p class="th-sub">{% include em.html t=subtitle k=subtitle_k %}</p>
</header>

{% include portfolio-gallery.html slug="kelly-dylan" hero="kelly-dylan-08.jpg" name="Kelly & Dylan" %}

{% include wedding-cta.html %}
