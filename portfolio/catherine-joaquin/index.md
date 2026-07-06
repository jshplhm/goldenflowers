---
layout: redesign
title: "Catherine & Joaquin · Wildflower Modern"
seo_title: "Catherine & Joaquin Wedding Flowers · Wildflower Modern | Golden Flowers"
permalink: /portfolio/catherine-joaquin
portfolio_key: catherine-joaquin
description: "A Golden Flowers wedding: wildflower modern floral design for a Lake Tahoe and Sierra Nevada celebration."
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

<section class="cta">
  <span class="lab">Planning something like this?</span>
  <h2 class="disp">Tell us your <em>date.</em></h2>
  <p>We take one wedding per date. Send your date and venue and we'll let you know if we're open.</p>
  <a class="btn btn-ink" href="{{ site.baseurl }}/consultation-form">Check your date <span>&rarr;</span></a>
</section>
