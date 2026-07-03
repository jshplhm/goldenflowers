---
layout: redesign
title: "Portfolio"
seo_title: "Lake Tahoe Wedding Floral Design | Golden Flowers Portfolio"
permalink: /portfolio
description: "Browse our wedding floral designs: wild, sustainable, editorial arrangements for Lake Tahoe, Nevada City, Truckee and the broader Sierra."
canonical_url: https://goldenflorals.com/portfolio
redirect_from:
  - /portfolio-1
  # Old galleries with no 1:1 replacement -> portfolio index
  - /portfolio-1/allieanddevin
  - /portfolio-1/dylanandjosh
  - /portfolio-1/dylanandjosh-jd238
  - /portfolio-1/samandmatt
---

<style>
/* Portfolio index: each aesthetic gets a distinct editorial composition so the
   three groups read as separate chapters, not one repeated 4-up stamp.
   Heights come from fixed grid rows + row/col spans; images absolutely fill
   each cell, so the layout never depends on image load or intrinsic ratio. */
.pf-group .pf-grid{column-count:unset;display:grid;grid-template-columns:repeat(6,1fr);gap:16px;}
.pf-group .pf-grid .pf-card{margin:0;position:relative;overflow:hidden;min-height:0;}
.pf-group .pf-grid .pf-card img{position:absolute;inset:0;width:100%;height:100%;object-fit:cover;display:block;}

/* 01 — Lush & Romantic: wide feature + portrait on top, even pair below */
#lush-romantic .pf-grid{grid-auto-rows:clamp(140px,13.5vw,200px);}
#lush-romantic .pf-card:nth-child(1){grid-column:span 4;grid-row:span 2;}
#lush-romantic .pf-card:nth-child(2){grid-column:span 2;grid-row:span 2;}
#lush-romantic .pf-card:nth-child(3){grid-column:span 3;grid-row:span 2;}
#lush-romantic .pf-card:nth-child(4){grid-column:span 3;grid-row:span 2;}

/* 02 — Elevated Minimalist: quiet triptych over one full-width cinematic band */
#elevated-minimalist .pf-grid{grid-auto-rows:clamp(150px,15vw,230px);}
#elevated-minimalist .pf-card:nth-child(1){grid-column:span 2;grid-row:span 2;}
#elevated-minimalist .pf-card:nth-child(2){grid-column:span 2;grid-row:span 2;}
#elevated-minimalist .pf-card:nth-child(3){grid-column:span 2;grid-row:span 2;}
#elevated-minimalist .pf-card:nth-child(4){grid-column:span 6;grid-row:span 2;}

/* 03 — Wildflower Modern: mirror of 01 — even pair on top, wide feature below */
#wildflower-modern .pf-grid{grid-auto-rows:clamp(140px,13.5vw,200px);}
#wildflower-modern .pf-card:nth-child(1){grid-column:span 3;grid-row:span 2;}
#wildflower-modern .pf-card:nth-child(2){grid-column:span 3;grid-row:span 2;}
#wildflower-modern .pf-card:nth-child(3){grid-column:span 4;grid-row:span 2;}
#wildflower-modern .pf-card:nth-child(4){grid-column:span 2;grid-row:span 2;}

@media(max-width:900px){
  .pf-group .pf-grid{grid-template-columns:repeat(2,1fr);grid-auto-rows:auto !important;}
  .pf-group .pf-grid .pf-card{grid-column:span 1 !important;grid-row:auto !important;aspect-ratio:4/5;}
  #elevated-minimalist .pf-card:nth-child(4){grid-column:span 2 !important;aspect-ratio:16/7;}
}
@media(max-width:560px){
  .pf-group .pf-grid{grid-template-columns:1fr;}
  #elevated-minimalist .pf-card:nth-child(4){grid-column:span 1 !important;aspect-ratio:4/5;}
}
</style>

<!-- TEXT HEADER (no full hero: on Portfolio, the work is the hero) -->
<header class="text-hero">
  <span class="lab">Portfolio</span>
  <h1>Real weddings. <em>Three directions.</em></h1>
  <p class="th-sub">Lake Tahoe and the Sierra Nevada, grouped by the three directions couples ask for most. A starting point. We design in every style.</p>
</header>

<!-- Lush & Romantic -->
<section class="pf-group" id="lush-romantic">
  <div class="pf-group-head">
    <span class="lab">01 / Aesthetic</span>
    <h2>Lush &amp; Romantic</h2>
    <p>Rich and cinematic, in deep shades of burgundy and plum.</p>
  </div>
  <div class="pf-grid">
    <a class="pf-card" href="{{ site.baseurl }}/portfolio/katie-james">
      <img src="{{ site.baseurl }}/assets/images/portfolio/katie-james/katie-james-07.jpg" alt="Katie &amp; James wedding flowers: The Miner's Foundry, Nevada City" loading="lazy">
      <span class="pf-cap"><b>Katie &amp; James</b></span>
    </a>
    <a class="pf-card" href="{{ site.baseurl }}/portfolio/jacqueline-brandon">
      <img src="{{ site.baseurl }}/assets/images/portfolio/jacqueline-brandon/jacqueline-brandon-11.jpg" alt="Jacqueline &amp; Brandon wedding flowers: National Exchange Hotel, Nevada City" loading="lazy">
      <span class="pf-cap"><b>Jacqueline &amp; Brandon</b></span>
    </a>
    <a class="pf-card" href="{{ site.baseurl }}/portfolio/hannah-chance">
      <img src="{{ site.baseurl }}/assets/images/portfolio/hannah-chance/hannah-chance-10.jpg" alt="Hannah &amp; Chance wedding flowers: The Stone House, Nevada County" loading="lazy">
      <span class="pf-cap"><b>Hannah &amp; Chance</b></span>
    </a>
    <a class="pf-card" href="{{ site.baseurl }}/portfolio/lynn-aaron">
      <img src="{{ site.baseurl }}/assets/images/portfolio/lynn-aaron/lynn-aaron-02.jpg" alt="Lynn &amp; Aaron wedding flowers: long banquet table with wild foraged centerpieces during dinner, Palisades High Camp, Olympic Valley" loading="lazy" style="object-position:center 42%;">
      <span class="pf-cap"><b>Lynn &amp; Aaron</b></span>
    </a>
  </div>
</section>

<!-- Elevated Minimalist -->
<section class="pf-group" id="elevated-minimalist">
  <div class="pf-group-head">
    <span class="lab">02 / Aesthetic</span>
    <h2>Elevated Minimalist</h2>
    <p>Clean lines, ivory and sage. Design that lets the view do the talking.</p>
  </div>
  <div class="pf-grid">
    <a class="pf-card" href="{{ site.baseurl }}/portfolio/emma-ross">
      <img src="{{ site.baseurl }}/assets/images/portfolio/emma-ross/emma-ross-18.jpg" alt="Emma &amp; Ross wedding flowers: cascading ivory bouquet, River Highlands Ranch" loading="lazy" style="object-position:center 45%;">
      <span class="pf-cap"><b>Emma &amp; Ross</b></span>
    </a>
    <a class="pf-card" href="{{ site.baseurl }}/portfolio/jenna-cal">
      <img src="{{ site.baseurl }}/assets/images/portfolio/jenna-cal/jenna-cal-15.jpg" alt="Jenna &amp; Cal wedding flowers: National Exchange Hotel, Nevada City" loading="lazy">
      <span class="pf-cap"><b>Jenna &amp; Cal</b></span>
    </a>
    <a class="pf-card" href="{{ site.baseurl }}/portfolio/niamh-nick">
      <img src="{{ site.baseurl }}/assets/images/portfolio/niamh-nick/niamh-nick-05.jpg" alt="Niamh &amp; Nick wedding flowers: blue and white bridal bouquet, Harmony Ridge, Nevada City" loading="lazy" style="object-position:center 38%;">
      <span class="pf-cap"><b>Niamh &amp; Nick</b></span>
    </a>
    <a class="pf-card" href="{{ site.baseurl }}/portfolio/sarah-brian">
      <img src="{{ site.baseurl }}/assets/images/portfolio/sarah-brian/sarah-brian-01.jpg" alt="Sarah &amp; Brian wedding flowers: hanging greenery and white floral ceremony installation, The Miner's Foundry, Nevada City" loading="lazy" style="object-position:center 40%;">
      <span class="pf-cap"><b>Sarah &amp; Brian</b></span>
    </a>
  </div>
</section>

<!-- Wildflower Modern -->
<section class="pf-group" id="wildflower-modern">
  <div class="pf-group-head">
    <span class="lab">03 / Aesthetic</span>
    <h2>Wildflower Modern</h2>
    <p>Native blooms and grasses, styled with an editorial eye.</p>
  </div>
  <div class="pf-grid">
    <a class="pf-card" href="{{ site.baseurl }}/portfolio/camille-max">
      <img src="{{ site.baseurl }}/assets/images/portfolio/camille-max/camille-max-16.jpg" alt="Camille &amp; Max wedding flowers: North Star House, Grass Valley" loading="lazy">
      <span class="pf-cap"><b>Camille &amp; Max</b></span>
    </a>
    <a class="pf-card" href="{{ site.baseurl }}/portfolio/catherine-joaquin">
      <img src="{{ site.baseurl }}/assets/images/portfolio/catherine-joaquin/catherine-joaquin-15.jpg" alt="Catherine &amp; Joaquin wedding flowers: National Exchange Hotel, Nevada City" loading="lazy">
      <span class="pf-cap"><b>Catherine &amp; Joaquin</b></span>
    </a>
    <a class="pf-card" href="{{ site.baseurl }}/portfolio/kelly-dylan">
      <img src="{{ site.baseurl }}/assets/images/portfolio/kelly-dylan/kelly-dylan-04.jpg" alt="Kelly &amp; Dylan wedding flowers: blue delphinium beach ceremony installation, North Tahoe Event Center, Kings Beach" loading="lazy" style="object-position:center 40%;">
      <span class="pf-cap"><b>Kelly &amp; Dylan</b></span>
    </a>
    <a class="pf-card" href="{{ site.baseurl }}/portfolio/tori-tucker">
      <img src="{{ site.baseurl }}/assets/images/portfolio/tori-tucker/tori-tucker-12.jpg" alt="Tori &amp; Tucker wedding flowers: North Tahoe Event Center, Kings Beach" loading="lazy">
      <span class="pf-cap"><b>Tori &amp; Tucker</b></span>
    </a>
  </div>
</section>

<section class="cta">
  <span class="lab">Something different in mind?</span>
  <h2 class="disp">We work in <em>every direction.</em></h2>
  <p>These three are only a starting point. Bring your Pinterest board, a venue photo, or a feeling you can't quite name yet, and we'll design from there.</p>
  <a class="btn btn-ink" href="{{ site.baseurl }}/consultation-form">Share your inspiration <span>&rarr;</span></a>
</section>
