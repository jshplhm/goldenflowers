---
layout: redesign
hero_nav: true
title: "Golden Flowers"
seo_title: "Lake Tahoe Wedding Florist | Golden Flowers"
permalink: /
description: "Golden Flowers is a Lake Tahoe wedding florist designing artful, sustainably grown, foam-free wedding flowers for couples getting married across the Sierra Nevada."
canonical_url: https://goldenflorals.com/
---

<!-- HERO -->
<header class="hero">
  <img class="bg" src="{{ site.baseurl }}/assets/images/portfolio/lynn-aaron/lynn-aaron-19.jpg" alt="Lake Tahoe wedding florals: a floral arch above the lake at Palisades High Camp by Golden Flowers" style="object-position:center 45%;">
  <div class="hero-in">
    <p class="ey lab">{{ site.data.home.hero.eyebrow }}</p>
    <h1 class="disp">{% include em.html t=site.data.home.hero.heading %}</h1>
    <div class="hero-foot">
      <p class="hero-sub">{{ site.data.home.hero.subheading }}</p>
      <a class="btn" href="{{ site.baseurl }}/consultation-form">{{ site.data.home.hero.button }} <span>&rarr;</span></a>
    </div>
  </div>
</header>

<!-- INTRO (paper band) -->
<div class="band-paper">
<section class="credo">
  <div style="max-width:860px;">
    <p style="font-size:1.08rem;line-height:1.75;color:var(--fg2);">{{ site.data.home.intro.paragraph1 }}</p>
    <p style="font-size:1.08rem;line-height:1.75;color:var(--fg2);margin-top:16px;">{{ site.data.home.intro.paragraph2 }}</p>
  </div>
</section>
</div>

<!-- CREDO (cream) -->
<section class="credo">
  <span class="lab">{{ site.data.home.why.label }}</span>
  <h2 class="disp">{% include em.html t=site.data.home.why.heading %}</h2>
  <div class="facts">
    {%- for fact in site.data.home.why.facts %}
    <div class="fact"><span class="n">{{ fact.number }}</span><h3>{{ fact.title }}</h3><p>{{ fact.body }}</p></div>
    {%- endfor %}
  </div>
</section>

<!-- WORK (paper band) -->
<div class="band-paper">
<section class="work">
  <div class="work-head">
    <h2 class="disp">{{ site.data.home.work.heading }}</h2>
    <a href="{{ site.baseurl }}/portfolio" class="txt-link">{{ site.data.home.work.link }} &rarr;</a>
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
  <span class="lab">{{ site.data.home.marquee.label }}</span>
  <div class="marq-track" aria-hidden="true">
    <span>Edgewood Tahoe</span><span>The Ritz-Carlton</span><span>Thunderbird Lodge</span><span>Palisades High Camp</span><span>Martis Camp</span><span>Schaffer's Camp</span><span>The Miner's Foundry</span><span>National Exchange</span>
    <span>Edgewood Tahoe</span><span>The Ritz-Carlton</span><span>Thunderbird Lodge</span><span>Palisades High Camp</span><span>Martis Camp</span><span>Schaffer's Camp</span><span>The Miner's Foundry</span><span>National Exchange</span>
  </div>
  <p class="marq-foot"><a href="{{ site.baseurl }}/venues" class="txt-link">{{ site.data.home.marquee.link }} &rarr;</a></p>
</section>

<!-- IMMERSIVE -->
<section class="immersive">
  <img class="bg" src="{{ site.baseurl }}/assets/images/portfolio/tori-tucker/tori-tucker-05.jpg" alt="Floral ceremony arch on the Lake Tahoe shore by Golden Flowers, mountains across the water">
  <div class="il">
    <span class="lab">{{ site.data.home.immersive.label }}</span>
    <p class="disp">{{ site.data.home.immersive.heading }}</p>
  </div>
</section>

<!-- AESTHETICS -->
<section class="aes">
  <div class="aes-wrap">
    <div class="aes-head">
      <span class="lab">{{ site.data.home.aesthetics.label }}</span>
      <h2 class="disp">{{ site.data.home.aesthetics.heading }}</h2>
    </div>
    <div class="aes-row">
      <a class="aes-card" href="{{ site.baseurl }}/portfolio#lush-romantic">
        <div class="ph"><span class="idx">01</span><img src="{{ site.baseurl }}/assets/images/portfolio/katie-james/katie-james-01.jpg" alt="Lush and romantic floral design: candlelit reception tablescape with peach and burgundy blooms"></div>
        <h3>{{ site.data.home.aesthetics.cards[0].title }}</h3>
        <p>{{ site.data.home.aesthetics.cards[0].body }}</p>
        <span class="more">{{ site.data.home.aesthetics.cards[0].link }}</span>
      </a>
      <a class="aes-card" href="{{ site.baseurl }}/portfolio#elevated-minimalist">
        <div class="ph"><span class="idx">02</span><img src="{{ site.baseurl }}/assets/images/portfolio/emma-ross/emma-ross-14.jpg" alt="Elevated minimalist floral design: ivory calla and ranunculus bouquet"></div>
        <h3>{{ site.data.home.aesthetics.cards[1].title }}</h3>
        <p>{{ site.data.home.aesthetics.cards[1].body }}</p>
        <span class="more">{{ site.data.home.aesthetics.cards[1].link }}</span>
      </a>
      <a class="aes-card" href="{{ site.baseurl }}/portfolio#wildflower-modern">
        <div class="ph"><span class="idx">03</span><img src="{{ site.baseurl }}/assets/images/portfolio/camille-max/camille-max-17.jpg" alt="Wildflower modern floral design: rose-lined aisle recessional, North Star House, Grass Valley"></div>
        <h3>{{ site.data.home.aesthetics.cards[2].title }}</h3>
        <p>{{ site.data.home.aesthetics.cards[2].body }}</p>
        <span class="more">{{ site.data.home.aesthetics.cards[2].link }}</span>
      </a>
    </div>
  </div>
</section>


<!-- TESTIMONIAL -->
<section class="testi">
  <div class="stars" aria-label="Five stars">★★★★★</div>
  <blockquote class="disp">{% include em.html t=site.data.home.testimonial.quote %}</blockquote>
  <p class="by"><b>{{ site.data.home.testimonial.name }}</b> &nbsp;·&nbsp; {{ site.data.home.testimonial.context }}</p>
  <p class="marq-foot" style="margin-top:24px;"><a href="{{ site.baseurl }}/weddings#reviews" class="txt-link">{{ site.data.home.testimonial.link }} &rarr;</a></p>
</section>

<!-- CLOSING -->
<section class="cta">
  <h2 class="disp">{% include em.html t=site.data.home.cta.heading %}</h2>
  <p>{{ site.data.home.cta.body }}</p>
  <a class="btn btn-ink" href="{{ site.baseurl }}/consultation-form">{{ site.data.home.cta.button }} <span>&rarr;</span></a>
</section>
