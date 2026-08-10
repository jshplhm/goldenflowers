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
<header class="hero hero-rot" id="hero-rot">
  <img class="bg is-on hero-1" src="{{ site.baseurl }}/assets/images/portfolio/kelly-dylan/kelly-dylan-07.jpg" alt="Lake Tahoe beach wedding: bride with veil blowing in the wind, blue delphinium ceremony aisle at Kings Beach" style="object-position:center 50%;" fetchpriority="high">
  <img class="bg hero-2" src="{{ site.baseurl }}/assets/images/portfolio/lynn-aaron/lynn-aaron-19.jpg" alt="Snowy Sierra mountaintop wedding ceremony: couple kissing between two towering floral installations" loading="lazy">
  {% comment %} Art-directed: a landscape photo in a portrait viewport crops the SIDES
  and keeps the full height, so on a phone half the frame would be blown-out sky.
  object-position cannot fix that, so phones get a crop cut from the original. {% endcomment %}
  <picture>
    <source media="(max-width:700px)" srcset="{{ site.baseurl }}/assets/images/home-hero-laux-portrait.jpg">
    <img class="bg hero-3" data-boost="1" src="{{ site.baseurl }}/assets/images/home-hero-laux.jpg" alt="Golden hour in an Olympic Valley meadow: bride and groom in tall grass with the Sierra Nevada behind them, bride holding a green and lavender bouquet" loading="lazy">
  </picture>
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
<section class="credo" style="padding-top:clamp(64px,8vw,104px);">
  <div style="max-width:960px;">
    <p style="font-family:var(--d);font-weight:430;font-optical-sizing:auto;font-size:clamp(1.4rem,2.6vw,2rem);line-height:1.5;letter-spacing:-.01em;color:var(--ink);text-wrap:pretty;"><span data-ed="home:intro.paragraph1">{{ site.data.home.intro.paragraph1 }}</span></p>
    <p style="font-family:var(--d);font-weight:430;font-optical-sizing:auto;font-size:clamp(1.4rem,2.6vw,2rem);line-height:1.5;letter-spacing:-.01em;color:var(--ink);text-wrap:pretty;margin-top:28px;"><span data-ed="home:intro.paragraph2">{{ site.data.home.intro.paragraph2 }}</span></p>
  </div>
</section>
</div>

<!-- CREDO (cream) -->
<section class="credo">
  <span class="lab"><span data-ed="home:why.label">{{ site.data.home.why.label }}</span></span>
  <h2 class="disp">{% include em.html t=site.data.home.why.heading k="home:why.heading" %}</h2>
  <div class="facts">
    {%- for fact in site.data.home.why.facts %}
    <div class="fact"><span class="n">{{ fact.number }}</span><h3><span data-ed="home:why.facts.{{ forloop.index0 }}.title">{{ fact.title }}</span></h3><p><span data-ed="home:why.facts.{{ forloop.index0 }}.body">{{ fact.body }}</span></p></div>
    {%- endfor %}
  </div>
</section>

<!-- WORK (paper band) -->
<div class="band-paper">
<section class="work">
  <div class="work-head">
    <h2 class="disp"><span data-ed="home:work.heading">{{ site.data.home.work.heading }}</span></h2>
    <a href="{{ site.baseurl }}/portfolio" class="txt-link"><span data-ed="home:work.link">{{ site.data.home.work.link }}</span> &rarr;</a>
  </div>
  <div class="grid">
    <a class="tile feature" href="{{ site.baseurl }}/portfolio/katie-james"><img src="{{ site.baseurl }}/assets/images/portfolio/katie-james/katie-james-08.jpg" alt="Katie &amp; James wedding flowers: lush pastel floral ceremony arch on a stone wall, The Miner's Foundry, Nevada City" style="object-position:center 45%;"><span class="cap"><b>Katie &amp; James</b><span>Lush &amp; Romantic</span></span></a>
    <a class="tile portrait" href="{{ site.baseurl }}/portfolio/lynn-aaron"><img src="{{ site.baseurl }}/assets/images/portfolio/lynn-aaron/lynn-aaron-17.jpg" alt="Lynn &amp; Aaron wedding flowers: reception tables with foraged bud-vase florals against green velvet drapery, Palisades High Camp, Olympic Valley" style="object-position:center 50%;"><span class="cap"><b>Lynn &amp; Aaron</b><span>Lush &amp; Romantic</span></span></a>
    <a class="tile quarter" href="{{ site.baseurl }}/portfolio/jenna-cal"><img src="{{ site.baseurl }}/assets/images/portfolio/jenna-cal/jenna-cal-12.jpg" sizes="(max-width:860px) 50vw, 25vw" alt="Jenna &amp; Cal wedding flowers: magnolia-and-greenery arch with red hanging lanterns above a sweetheart table, National Exchange Hotel, Nevada City" style="object-position:center 42%;"><span class="cap"><b>Jenna &amp; Cal</b><span>Elevated Minimalist</span></span></a>
    <a class="tile quarter" href="{{ site.baseurl }}/portfolio/camille-max"><img src="{{ site.baseurl }}/assets/images/portfolio/camille-max/camille-max-30.jpg" sizes="(max-width:860px) 50vw, 25vw" alt="Camille &amp; Max wedding flowers: bride on a tree-lined path with a cascading bouquet of trailing amaranthus, North Star House, Grass Valley" style="object-position:center 28%;"><span class="cap"><b>Camille &amp; Max</b><span>Wildflower Modern</span></span></a>
    <a class="tile quarter" href="{{ site.baseurl }}/portfolio/kelly-dylan"><img src="{{ site.baseurl }}/assets/images/portfolio/kelly-dylan/kelly-dylan-04.jpg" sizes="(max-width:860px) 50vw, 25vw" alt="Kelly &amp; Dylan wedding flowers: blue delphinium beach ceremony installation, North Tahoe Event Center, Kings Beach" style="object-position:center 40%;"><span class="cap"><b>Kelly &amp; Dylan</b><span>Wildflower Modern</span></span></a>
    <a class="tile quarter" href="{{ site.baseurl }}/portfolio/tori-tucker"><img src="{{ site.baseurl }}/assets/images/portfolio/tori-tucker/tori-tucker-16.jpg" sizes="(max-width:860px) 50vw, 25vw" alt="Tori &amp; Tucker wedding flowers: lakeside beach ceremony with a wild peony and garden-rose arch, North Tahoe Event Center, Kings Beach" style="object-position:center 25%;"><span class="cap"><b>Tori &amp; Tucker</b><span>Wildflower Modern</span></span></a>
  </div>
</section>
</div>

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
  <img class="bg" src="{{ site.baseurl }}/assets/images/portfolio/lynn-aaron/lynn-aaron-19.jpg" alt="First kiss at a mountain wedding ceremony at Palisades High Camp, dramatic floral installations by Golden Flowers">
  <div class="il">
    <span class="lab"><span data-ed="home:immersive.label">{{ site.data.home.immersive.label }}</span></span>
    <p class="disp"><span data-ed="home:immersive.heading">{{ site.data.home.immersive.heading }}</span></p>
  </div>
</section>

<!-- AESTHETICS -->
<section class="aes">
  <div class="aes-wrap">
    <div class="aes-head">
      <span class="lab"><span data-ed="home:aesthetics.label">{{ site.data.home.aesthetics.label }}</span></span>
      <h2 class="disp"><span data-ed="home:aesthetics.heading">{{ site.data.home.aesthetics.heading }}</span></h2>
    </div>
    <div class="aes-row">
      <a class="aes-card" href="{{ site.baseurl }}/portfolio#lush-romantic">
        <div class="ph"><span class="idx">01</span><img src="{{ site.baseurl }}/assets/images/portfolio/katie-james/katie-james-01.jpg" alt="Lush and romantic floral design: candlelit reception tablescape with peach and burgundy blooms"></div>
        <h3><span data-ed="home:aesthetics.cards.0.title">{{ site.data.home.aesthetics.cards[0].title }}</span></h3>
        <p><span data-ed="home:aesthetics.cards.0.body">{{ site.data.home.aesthetics.cards[0].body }}</span></p>
        <span class="more"><span data-ed="home:aesthetics.cards.0.link">{{ site.data.home.aesthetics.cards[0].link }}</span></span>
      </a>
      <a class="aes-card" href="{{ site.baseurl }}/portfolio#elevated-minimalist">
        <div class="ph"><span class="idx">02</span><img src="{{ site.baseurl }}/assets/images/portfolio/emma-ross/emma-ross-14.jpg" alt="Elevated minimalist floral design: ivory calla and ranunculus bouquet"></div>
        <h3><span data-ed="home:aesthetics.cards.1.title">{{ site.data.home.aesthetics.cards[1].title }}</span></h3>
        <p><span data-ed="home:aesthetics.cards.1.body">{{ site.data.home.aesthetics.cards[1].body }}</span></p>
        <span class="more"><span data-ed="home:aesthetics.cards.1.link">{{ site.data.home.aesthetics.cards[1].link }}</span></span>
      </a>
      <a class="aes-card" href="{{ site.baseurl }}/portfolio#wildflower-modern">
        <div class="ph"><span class="idx">03</span><img src="{{ site.baseurl }}/assets/images/portfolio/camille-max/camille-max-17.jpg" alt="Wildflower modern floral design: rose-lined aisle recessional, North Star House, Grass Valley"></div>
        <h3><span data-ed="home:aesthetics.cards.2.title">{{ site.data.home.aesthetics.cards[2].title }}</span></h3>
        <p><span data-ed="home:aesthetics.cards.2.body">{{ site.data.home.aesthetics.cards[2].body }}</span></p>
        <span class="more"><span data-ed="home:aesthetics.cards.2.link">{{ site.data.home.aesthetics.cards[2].link }}</span></span>
      </a>
    </div>
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
