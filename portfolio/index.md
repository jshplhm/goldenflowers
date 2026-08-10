---
layout: redesign
title: "Portfolio"
seo_title: "Lake Tahoe Wedding Floral Design | Golden Flowers Portfolio"
permalink: /portfolio
description: "Browse our wedding floral designs: wild, sustainable, editorial arrangements for Lake Tahoe, Nevada City, Truckee and the broader Sierra."
canonical_url: https://goldenflorals.com/portfolio
redirect_from:
  # Added 2026-07-09: old Squarespace gallery page, from GSC "Redirect error" list
  - /gallery
  - /portfolio-1
  # Old galleries with no 1:1 replacement -> portfolio index
  - /portfolio-1/allieanddevin
  - /portfolio-1/dylanandjosh
  - /portfolio-1/dylanandjosh-jd238
  - /portfolio-1/samandmatt
  # Retired 2026-08-09 when the portfolio was cut to its strongest work.
  # The pages are gone; these keep every inbound link and indexed URL alive.
  - /portfolio/jacqueline-brandon
  - /portfolio/hannah-chance
  - /portfolio/emma-ross
  - /portfolio/niamh-nick
  - /portfolio/sarah-brian
  - /portfolio/catherine-joaquin
  # Squarespace URLs those retired pages used to absorb. Without these three the
  # old links 404 instead of merely redirecting somewhere less specific.
  - /portfolio-1/jacquelineandbrandon
  - /portfolio-1/emma-and-ross
  - /portfolio-1/sarahandbrian
---

<!-- TEXT HEADER (no full hero: on Portfolio, the work is the hero) -->
<header class="text-hero">
  <span class="lab"><span data-ed="portfolio_page:header.label">{{ site.data.portfolio_page.header.label }}</span></span>
  <h1>{% include em.html t=site.data.portfolio_page.header.heading k="portfolio_page:header.heading" %}</h1>
  <p class="th-sub"><span data-ed="portfolio_page:header.subheading">{{ site.data.portfolio_page.header.subheading }}</span></p>
</header>

{%- comment -%}
  One band per wedding, ordered by _data/portfolio_meta.yml. Adding or retiring
  a wedding is a data edit: the numbering, the width rotation and the phone
  swipe strip all follow from the list.
{%- endcomment -%}
<div class="pfx-bands">
{%- for w in site.data.portfolio_meta -%}
{%- assign n = forloop.index | prepend: '0' | slice: -2, 2 -%}
{% include portfolio-band.html w=w n=n %}
{%- endfor -%}
</div>

<section class="cta">
  <span class="lab"><span data-ed="portfolio_page:cta.label">{{ site.data.portfolio_page.cta.label }}</span></span>
  <h2 class="disp">{% include em.html t=site.data.portfolio_page.cta.heading k="portfolio_page:cta.heading" %}</h2>
  <p><span data-ed="portfolio_page:cta.body">{{ site.data.portfolio_page.cta.body }}</span></p>
  <a class="btn btn-ink" href="{{ site.baseurl }}/consultation-form"><span data-ed="portfolio_page:cta.button">{{ site.data.portfolio_page.cta.button }}</span> <span>&rarr;</span></a>
</section>
