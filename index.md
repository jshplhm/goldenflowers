---
layout: redesign
hero_nav: true
title: "Golden Flowers"
seo_title: "Lake Tahoe & Sierra Nevada Wedding Florist | Golden Flowers"
permalink: /
description: "Golden Flowers is a luxury Lake Tahoe wedding florist creating elevated, sustainable floral design, grown and sourced close to home across the Sierra Nevada."
canonical_url: https://goldenflorals.com/
redirect_from:
  # Old Squarespace retail-shop URLs. Squarespace's own URL mappings sent these to
  # grassvalleyflowers.com (external); we keep them on-site at home instead.
  # /order + several added 2026-07-09 from GSC 404 lists, bookmarks, and Google's index.
  - /order
  - /order-flowers
  - /order-flowers/p/purple-hippo
  - /order-flowers/p/hand-crafted-chocolates
  - /order-flowers/p/uniquely-fancy
  - /send-flowers
  - /send-flowers/p/milk-dip-cup-92wf6-abmpj-jb64e
  - /send-flowers/p/milk-dip-cup-92wf6-abmpj-jb64e-sfh7b-k5knw
  - /send-flowers/p/milk-dip-cup-92wf6-abmpj-jb64e-sfh7b-sbyg3-zlaxk
  - /send-flowers/p/earth-sky-planter-4awkk-nazcb-w7e3y
  - /send-flowers/p/spring-bowl-rltkk-4a48k-6738j
  - /send-flowers/p/country-feast-set-3nybt-zczh5-bgj3f
  - /sendflowers
  - /sendflowers/p/i-love-you
  - /sendflowers/p/sympathy-arrangment
  - /sendflowers/p/the-haven-vessel-pfjys
  - /sendflowers/p/uniquely-fancy-m2clb
  - /the-vday-shop
  - /the-vday-shop-1
  - /the-vday-shop/p/y9uaydt8w2o28islosjxaevlkwpbbw
  - /the-vday-shop/p/hand-crafted-chocolates
---

<!-- HERO (three photos crossfading behind fixed copy — see HERO ROTATION in redesign.css) -->
{%- comment -%} data-boost MUST match the data-boost of the FIRST .bg image below.
The rotator only sets this attribute once JS runs, so if it starts absent while
the lead photo wants the boost, the left-hand scrim fades in ~1.2s after the
photo has already painted, which reads as a bug. Rendering the right value here
means there is nothing to transition on load. Reorder the photos, update this.
{%- endcomment -%}
<header class="hero hero-rot" id="hero-rot" data-boost="1">
  {% comment %} The hero-1/2/3 classes identify the PHOTO, not its slot: each one
  carries that photo's own object-position (including the phone overrides in
  redesign.css), so reordering the slideshow means moving these elements and
  leaving every class attached to its own image. Laux leads as of 2026-08-10.

  Art-directed: a landscape photo in a portrait viewport crops the SIDES and keeps
  the full height, so on a phone half the frame would be blown-out sky.
  object-position cannot fix that, so phones get a crop cut from the original.
  The leading photo is the LCP image, so it is eager + fetchpriority high and the
  phone crop is preloaded by the same media query. {% endcomment %}
  <picture>
    <source media="(max-width:700px)" srcset="{{ site.baseurl }}/assets/images/home-hero-laux-portrait.jpg">
    <img class="bg is-on hero-3" data-boost="1" src="{{ site.baseurl }}/assets/images/home-hero-laux.jpg" alt="Golden hour in an Olympic Valley meadow: bride and groom in tall grass with the Sierra Nevada behind them, bride holding a green and lavender bouquet" fetchpriority="high">
  </picture>
  <img class="bg hero-1" src="{{ site.baseurl }}/assets/images/portfolio/kelly-dylan/kelly-dylan-07.jpg" alt="Lake Tahoe beach wedding: bride with veil blowing in the wind, blue delphinium ceremony aisle at Kings Beach" style="object-position:center 50%;" loading="lazy">
  <img class="bg hero-2" src="{{ site.baseurl }}/assets/images/portfolio/lynn-aaron/lynn-aaron-19.jpg" alt="Snowy Sierra mountaintop wedding ceremony: couple kissing between two towering floral installations" loading="lazy">
  <div class="hero-boost" aria-hidden="true"></div>
  <div class="hero-in">
    {% if site.data.home.hero.eyebrow and site.data.home.hero.eyebrow != "" %}<p class="ey lab"><span data-ed="home:hero.eyebrow">{{ site.data.home.hero.eyebrow }}</span></p>{% endif %}
    <h1 class="disp">{% include em.html t=site.data.home.hero.heading k="home:hero.heading" %}</h1>
    <div class="hero-foot">
      <p class="hero-sub"><span data-ed="home:hero.subheading">{{ site.data.home.hero.subheading }}</span></p>
      <a class="btn" href="{{ site.baseurl }}/portfolio"><span data-ed="home:hero.button">{{ site.data.home.hero.button }}</span> <span>&rarr;</span></a>
    </div>
  </div>

  <div class="hero-dots">
    <button type="button" class="hd on" data-go="0" aria-label="Show photo 1"></button>
    <button type="button" class="hd" data-go="1" aria-label="Show photo 2"></button>
    <button type="button" class="hd" data-go="2" aria-label="Show photo 3"></button>
    <button type="button" class="hd-pause" aria-label="Pause slideshow">&#10073;&#10073;</button>
  </div>
</header>

<!-- INTRO (paper band) -->
<div class="band-paper">
<section class="credo intro">
  <div class="intro-band">
    <div class="intro-side">
      {%- if site.data.home.intro.label and site.data.home.intro.label != "" %}<span class="lab"><span data-ed="home:intro.label">{{ site.data.home.intro.label }}</span></span>{% endif -%}
    </div>
    <div class="intro-body">
      <p><span data-ed="home:intro.paragraph1">{{ site.data.home.intro.paragraph1 }}</span></p>
      <p><span data-ed="home:intro.paragraph2">{{ site.data.home.intro.paragraph2 }}</span></p>
      {%- if site.data.home.intro.link and site.data.home.intro.link != "" %}
      <p class="intro-more"><a href="{{ site.baseurl }}/about" class="txt-link"><span data-ed="home:intro.link">{{ site.data.home.intro.link }}</span> &rarr;</a></p>
      {%- endif %}
    </div>
  </div>
</section>
</div>

<!-- CREDO (cream) -->
<section class="credo">
  <span class="lab"><span data-ed="home:why.label">{{ site.data.home.why.label }}</span></span>
  <h2 class="disp">{% include em.html t=site.data.home.why.heading k="home:why.heading" %}</h2>
  <div class="facts">
    {%- for fact in site.data.home.why.facts %}
    <div class="fact"><div class="fact-head"><h3><span data-ed="home:why.facts.{{ forloop.index0 }}.title">{{ fact.title }}</span></h3></div><p><span data-ed="home:why.facts.{{ forloop.index0 }}.body">{{ fact.body }}</span></p>
    {%- comment -%} A fact links onward only when the YAML gives it both a label
    and a URL, so the link travels with its own card if the facts are reordered. {%- endcomment -%}
    {%- if fact.link and fact.link != "" and fact.link_url and fact.link_url != "" %}<p class="fact-more"><a href="{{ site.baseurl }}{{ fact.link_url }}" class="txt-link"><span data-ed="home:why.facts.{{ forloop.index0 }}.link">{{ fact.link }}</span> &rarr;</a></p>{% endif -%}
    </div>
    {%- endfor %}
  </div>
</section>

<!-- WORK (paper band) -->
<div class="band-paper">
<section class="work">
  {%- comment -%} One way out of this section, not two. The link lives below the
  photos rather than in the header: a reader decides they want more AFTER looking,
  not before. {%- endcomment -%}
  <div class="work-head">
    <h2 class="disp"><span data-ed="home:work.heading">{{ site.data.home.work.heading }}</span></h2>
  </div>
  {%- comment -%} Driven by _data/home_work.yml so /edit can choose which three
  weddings appear and in what order. Names and venues come from portfolio_meta,
  never from here, so a rename on /portfolio can never leave home stale. A slug
  that no longer exists is skipped rather than rendering a broken tile, which
  means a stale manifest can never break the build. {%- endcomment -%}
  {%- assign slotClass = "feature,portrait,wide" | split: "," -%}
  {%- assign slotSizes = "58vw,38vw,100vw" | split: "," -%}
  <div class="grid" data-ed-homework>
    {%- assign slot = 0 -%}
    {%- for hw in site.data.home_work -%}
    {%- assign m = site.data.portfolio_meta | where: "slug", hw.slug | first -%}
    {%- if m and slot < 3 -%}
    {%- assign base = '/assets/images/portfolio/' | append: hw.slug | append: '/' | append: hw.slug | append: '-' -%}
    <a class="tile {{ slotClass[slot] }}" href="{{ site.baseurl }}/portfolio/{{ hw.slug }}"><img src="{{ site.baseurl }}{{ base }}{{ hw.photo }}.jpg" sizes="{{ slotSizes[slot] }}" alt="{{ m.name }} wedding flowers at {{ m.venue }}, {{ m.place }}" style="object-position:{{ hw.focus | default: 'center center' }};"><span class="cap"><b>{{ m.name }}</b><span>{{ m.venue }}</span></span></a>
    {%- assign slot = slot | plus: 1 -%}
    {%- endif -%}
    {%- endfor -%}
  </div>
  {%- comment -%} The grid is a preview, not the archive. Three weddings show the
  range (historic indoor, mountain, lakeside); the rest live on /portfolio. This
  closing link is the point of the section, so it gets its own line rather than
  only sitting in the header. {%- endcomment -%}
  <p class="work-more"><a href="{{ site.baseurl }}/portfolio" class="txt-link"><span data-ed="home:work.more">{{ site.data.home.work.more }}</span> &rarr;</a></p>
</section>
</div>

<!-- PROCESS & PRICING -->
{%- comment -%} Straight after the wedding previews, because "what does this
cost?" is the question looking at the work produces. It is a signpost, not a
price list: no figures live here, so /weddings stays the single place a number
can be wrong. {%- endcomment -%}
<section class="proc-signpost">
  <span class="lab"><span data-ed="home:process.label">{{ site.data.home.process.label }}</span></span>
  <h2 class="disp"><span data-ed="home:process.heading">{{ site.data.home.process.heading }}</span></h2>
  <p><span data-ed="home:process.body">{{ site.data.home.process.body }}</span></p>
  <p class="marq-foot"><a href="{{ site.baseurl }}/weddings" class="txt-link"><span data-ed="home:process.link">{{ site.data.home.process.link }}</span> &rarr;</a></p>
</section>

<!-- VENUE MARQUEE -->
<section class="marq">
  <span class="lab"><span data-ed="home:marquee.label">{{ site.data.home.marquee.label }}</span></span>
  <div class="marq-track" aria-hidden="true">
    <span>Edgewood Tahoe</span><span>The Ritz-Carlton</span><span>Thunderbird Lodge</span><span>Palisades High Camp</span><span>Martis Camp</span><span>Schaffer's Camp</span><span>The Miner's Foundry</span><span>National Exchange</span>
    <span>Edgewood Tahoe</span><span>The Ritz-Carlton</span><span>Thunderbird Lodge</span><span>Palisades High Camp</span><span>Martis Camp</span><span>Schaffer's Camp</span><span>The Miner's Foundry</span><span>National Exchange</span>
  </div>
  <p class="marq-foot"><a href="{{ site.baseurl }}/venues" class="txt-link"><span data-ed="home:marquee.link">{{ site.data.home.marquee.link }}</span> &rarr;</a></p>
</section>

<!-- IMMERSIVE -->
<section class="immersive">
  <img class="bg" src="{{ site.baseurl }}/assets/images/portfolio/lynn-aaron/lynn-aaron-23.jpg" alt="Long reception table at Palisades High Camp under string lights, set with garden roses, olive foliage and green velvet napkins">
  <div class="il">
    <span class="lab"><span data-ed="home:immersive.label">{{ site.data.home.immersive.label }}</span></span>
    <p class="disp"><span data-ed="home:immersive.heading">{{ site.data.home.immersive.heading }}</span></p>
  </div>
</section>

<!-- TESTIMONIAL -->
<section class="testi">
  <div class="stars" aria-label="Five stars">★★★★★</div>
  <blockquote class="disp">{% include em.html t=site.data.home.testimonial.quote k="home:testimonial.quote" %}</blockquote>
  <p class="by"><b><span data-ed="home:testimonial.name">{{ site.data.home.testimonial.name }}</span></b> &nbsp;·&nbsp; <span data-ed="home:testimonial.context">{{ site.data.home.testimonial.context }}</span></p>
  <p class="marq-foot" style="margin-top:24px;"><a href="{{ site.baseurl }}/weddings#reviews" class="txt-link"><span data-ed="home:testimonial.link">{{ site.data.home.testimonial.link }}</span> &rarr;</a></p>
</section>

<!-- CLOSING -->
<section class="cta">
  <h2 class="disp">{% include em.html t=site.data.home.cta.heading k="home:cta.heading" %}</h2>
  <p><span data-ed="home:cta.body">{{ site.data.home.cta.body }}</span></p>
  <a class="btn btn-ink" href="{{ site.baseurl }}/consultation-form"><span data-ed="home:cta.button">{{ site.data.home.cta.button }}</span> <span>&rarr;</span></a>
</section>
