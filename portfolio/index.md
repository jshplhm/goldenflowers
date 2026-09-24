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
  - /portfolio/niamh-nick
  - /portfolio/catherine-joaquin
  # /portfolio/emma-ross and /portfolio/sarah-brian came OFF this list on
  # 2026-09-24: both weddings are published again, so those URLs are real pages
  # and a redirect here would shadow them.
  # Squarespace URLs those retired pages used to absorb. Without these three the
  # old links 404 instead of merely redirecting somewhere less specific.
  # The Squarespace aliases for emma-ross and sarah-brian moved onto those two
  # pages with them; only jacqueline-brandon's still belongs here.
  - /portfolio-1/jacquelineandbrandon
---

<!-- TEXT HEADER (no full hero: on Portfolio, the work is the hero) -->
<header class="text-hero">
  <span class="lab"><span data-ed="portfolio_page:header.label">{{ site.data.portfolio_page.header.label }}</span></span>
  <h1>{% include em.html t=site.data.portfolio_page.header.heading k="portfolio_page:header.heading" %}</h1>
  <p class="th-sub"><span data-ed="portfolio_page:header.subheading">{{ site.data.portfolio_page.header.subheading }}</span></p>
</header>

{%- comment -%}
  Two up, in the order of _data/portfolio_meta.yml. Adding, retiring or
  reordering one is a data edit and the grid reflows.

  HIDDEN WEDDINGS (2026-09-24). An entry carrying `hidden: true` comes off this
  grid, off the "more weddings" rail, and asks search engines not to list its
  page. The page itself stays live, so an old link, a bookmark or a card in
  someone's inbox still lands somewhere real. Hiding is therefore NOT the same
  as /edit's "Remove wedding", which deletes the page and the photographs and
  301s the address; hiding is reversible from the same screen that did it.

  Both the order and the flag are set in /edit under "Portfolio order".
{%- endcomment -%}
<div class="pf-grid" data-ed-pforder>
{%- for w in site.data.portfolio_meta -%}
{%- unless w.hidden -%}
{% include portfolio-card.html w=w %}
{%- endunless -%}
{%- endfor -%}
</div>

<section class="cta">
  <h2 class="disp">{% include em.html t=site.data.portfolio_page.cta.heading k="portfolio_page:cta.heading" %}</h2>
  <p><span data-ed="portfolio_page:cta.body">{{ site.data.portfolio_page.cta.body }}</span></p>
  <a class="btn btn-ink" href="{{ site.baseurl }}/consultation-form"><span data-ed="portfolio_page:cta.button">{{ site.data.portfolio_page.cta.button }}</span> <span>&rarr;</span></a>
</section>
