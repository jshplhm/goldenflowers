---
layout: redesign
title: "Katie & James · Lush & Romantic"
seo_title: "Katie & James Wedding Flowers · Lush & Romantic | Golden Flowers"
permalink: /portfolio/katie-james
portfolio_key: katie-james
redirect_from:
  - /portfolio-1/katieandjames
description: "A Golden Flowers wedding: lush & romantic floral design for a Lake Tahoe and Sierra Nevada celebration."
hero_photo: katie-james-07.jpg
---

{% include portfolio-subnav.html name="Katie & James" %}

<header class="text-hero venue-hero">
  <span class="lab">Lush & Romantic</span>
  <h1>Katie & James</h1>
  {%- assign subtitle = site.data.portfolio[page.portfolio_key] %}
  {%- assign subtitle_k = page.portfolio_key | prepend: "portfolio:" %}
  <p class="th-sub">{% include em.html t=subtitle k=subtitle_k %}</p>
</header>

{% include portfolio-gallery.html slug="katie-james" hero="katie-james-07.jpg" name="Katie & James" %}

<section class="cta">
  <span class="lab">Planning something like this?</span>
  <h2 class="disp">Tell us your <em>date.</em></h2>
  <p>We take one wedding per date. Send your date and venue and we'll let you know if we're open.</p>
  <a class="btn btn-ink" href="{{ site.baseurl }}/consultation-form">Check your date <span>&rarr;</span></a>
</section>
