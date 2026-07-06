---
layout: redesign
hero_nav: true
title: "Golden Flowers"
seo_title: "Lake Tahoe Wedding Florist | Golden Flowers"
permalink: /
description: "Golden Flowers is a Lake Tahoe wedding florist creating elevated, sustainably grown wedding floral artistry for couples getting married across the Sierra Nevada."
canonical_url: https://goldenflorals.com/
redirect_from:
  - /a-la-carte-weddings/p/aisle-marker-xf38y
  - /a-la-carte-weddings/p/aisle-marker
  - /a-la-carte-weddings/p/corsage
  - /a-la-carte-weddings/p/flower-girl-petals
  - /a-la-carte-weddings/p/bud-vases
  - /a-la-carte-weddings/p/signature-bridal-bouquet
  - /a-la-carte-weddings/p/midi-bridal-bouquet
  - /a-la-carte-weddings/p/floral-design-consultation
  - /a-la-carte-weddings/p/minimalist-bouquet
  - /a-la-carte-weddings/p/boutonniere-new
  - /a-la-carte-weddings/p/bridesmaid-bouquet
  - /a-la-carte/p/basic-package-bgzcp-s5d9e
  - /a-la-carte/p/basic-package-bgzcp-s5d9e-kz83z
  - /a-la-carte/p/basic-package-bgzcp-s5d9e-kghp7
  - /a-la-carte/p/basic-package-bgzcp-s5d9e-5entb
  - /a-la-carte/p/basic-package-bgzcp-s5d9e-5entb-hhsnz
  - /a-la-carte/p/basic-package-bgzcp-s5d9e-5entb-hhsnz-c43ng
  - /a-la-carte/p/basic-package-bgzcp-s5d9e-64msg-epl3n-g2m2r-fm297
  - /a-la-carte/p/q4y7ldy5lm3xj3a8wfk3wwmop33x20
  - /a-la-carte/p/flower-delivery-to-your-venue
  - /send-flowers/p/earth-sky-planter-4awkk-nazcb-w7e3y
  - /send-flowers/p/spring-bowl-rltkk-4a48k-6738j
  - /send-flowers/p/country-feast-set-3nybt-zczh5-bgj3f
  - /sendflowers/p/i-love-you
  - /sendflowers/p/sympathy-arrangment
---

<!-- HERO -->
<header class="hero">
  <img class="bg" src="{{ site.baseurl }}/assets/images/portfolio/kelly-dylan/kelly-dylan-07.jpg" alt="Lake Tahoe beach wedding: bride with veil blowing in the wind, blue delphinium ceremony aisle at Kings Beach" style="object-position:center 50%;">
  <div class="hero-in">
    {% if site.data.home.hero.eyebrow and site.data.home.hero.eyebrow != "" %}<p class="ey lab"><span data-ed="home:hero.eyebrow">{{ site.data.home.hero.eyebrow }}</span></p>{% endif %}
    <h1 class="disp">{% include em.html t=site.data.home.hero.heading k="home:hero.heading" %}</h1>
    <div class="hero-foot">
      <p class="hero-sub"><span data-ed="home:hero.subheading">{{ site.data.home.hero.subheading }}</span></p>
      <a class="btn" href="{{ site.baseurl }}/consultation-form"><span data-ed="home:hero.button">{{ site.data.home.hero.button }}</span> <span>&rarr;</span></a>
    </div>
  </div>
</header>

<!-- INTRO (paper band) -->
<div class="band-paper">
<section class="credo">
  <div style="max-width:860px;">
    <p style="font-size:1.08rem;line-height:1.75;color:var(--fg2);"><span data-ed="home:intro.paragraph1">{{ site.data.home.intro.paragraph1 }}</span></p>
    <p style="font-size:1.08rem;line-height:1.75;color:var(--fg2);margin-top:16px;"><span data-ed="home:intro.paragraph2">{{ site.data.home.intro.paragraph2 }}</span></p>
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
    <a class="tile quarter" href="{{ site.baseurl }}/portfolio/jenna-cal"><img src="{{ site.baseurl }}/assets/images/portfolio/jenna-cal/jenna-cal-12.jpg" alt="Jenna &amp; Cal wedding flowers: magnolia-and-greenery arch with red hanging lanterns above a sweetheart table, National Exchange Hotel, Nevada City" style="object-position:center 42%;"><span class="cap"><b>Jenna &amp; Cal</b><span>Elevated Minimalist</span></span></a>
    <a class="tile quarter" href="{{ site.baseurl }}/portfolio/camille-max"><img src="{{ site.baseurl }}/assets/images/portfolio/camille-max/camille-max-30.jpg" alt="Camille &amp; Max wedding flowers: bride on a tree-lined path with a cascading bouquet of trailing amaranthus, North Star House, Grass Valley" style="object-position:center 28%;"><span class="cap"><b>Camille &amp; Max</b><span>Wildflower Modern</span></span></a>
    <a class="tile quarter" href="{{ site.baseurl }}/portfolio/kelly-dylan"><img src="{{ site.baseurl }}/assets/images/portfolio/kelly-dylan/kelly-dylan-04.jpg" alt="Kelly &amp; Dylan wedding flowers: blue delphinium beach ceremony installation, North Tahoe Event Center, Kings Beach" style="object-position:center 40%;"><span class="cap"><b>Kelly &amp; Dylan</b><span>Wildflower Modern</span></span></a>
    <a class="tile quarter" href="{{ site.baseurl }}/portfolio/tori-tucker"><img src="{{ site.baseurl }}/assets/images/portfolio/tori-tucker/tori-tucker-16.jpg" alt="Tori &amp; Tucker wedding flowers: lakeside beach ceremony with a wild peony and garden-rose arch, North Tahoe Event Center, Kings Beach" style="object-position:center 25%;"><span class="cap"><b>Tori &amp; Tucker</b><span>Wildflower Modern</span></span></a>
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
