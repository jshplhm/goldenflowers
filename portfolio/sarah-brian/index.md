---
layout: redesign
title: "Sarah & Brian · Elevated Minimalist"
seo_title: "Sarah & Brian Wedding Flowers · Elevated Minimalist | Golden Flowers"
permalink: /portfolio/sarah-brian
portfolio_key: sarah-brian
redirect_from:
  - /portfolio-1/sarahandbrian
description: "A Golden Flowers wedding: elevated minimalist floral design for a Lake Tahoe and Sierra Nevada celebration."
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

<section class="cta">
  <span class="lab">Planning something like this?</span>
  <h2 class="disp">Tell us your <em>date.</em></h2>
  <p>We take one wedding per date. Send your date and venue and we'll let you know if we're open.</p>
  <a class="btn btn-ink" href="{{ site.baseurl }}/consultation-form">Check your date <span>&rarr;</span></a>
</section>
