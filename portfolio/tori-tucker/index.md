---
layout: redesign
title: "Tori & Tucker · Wildflower Modern"
seo_title: "Tori & Tucker Wedding Flowers · Wildflower Modern | Golden Flowers"
permalink: /portfolio/tori-tucker
portfolio_key: tori-tucker
redirect_from:
  - /portfolio-1/tori-and-tucker
description: "A Golden Flowers wedding: wildflower modern floral design for a Lake Tahoe and Sierra Nevada celebration."
hero_photo: tori-tucker-12.jpg
---

{% include portfolio-subnav.html name="Tori & Tucker" %}

<header class="text-hero venue-hero">
  <span class="lab">Wildflower Modern</span>
  <h1>Tori & Tucker</h1>
  {%- assign subtitle = site.data.portfolio[page.portfolio_key] %}
  {%- assign subtitle_k = page.portfolio_key | prepend: "portfolio:" %}
  <p class="th-sub">{% include em.html t=subtitle k=subtitle_k %}</p>
</header>

{% include portfolio-gallery.html slug="tori-tucker" hero="tori-tucker-12.jpg" name="Tori & Tucker" %}

<section class="cta">
  <span class="lab">Planning something like this?</span>
  <h2 class="disp">Tell us your <em>date.</em></h2>
  <p>We take one wedding per date. Send your date and venue and we'll let you know if we're open.</p>
  <a class="btn btn-ink" href="{{ site.baseurl }}/consultation-form">Check your date <span>&rarr;</span></a>
</section>
