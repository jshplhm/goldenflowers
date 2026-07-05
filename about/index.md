---
layout: redesign
title: "About Golden Flowers"
seo_title: "About Golden Flowers | Sustainable Lake Tahoe Wedding Florist"
permalink: /about
description: "Golden Flowers is a Lake Tahoe wedding florist specializing in bold, sustainable, artful floral design. Located in Incline Village, our studio creates seasonally grown arrangements, from editorial bouquets to full installations, for couples who want their wedding flowers to feel intentional and unforgettable."
canonical_url: https://goldenflorals.com/about
---

<style>
/* Editorial text + portrait splits: Brittany photos woven through the page */
.story-split{display:grid;grid-template-columns:1fr 1fr;gap:clamp(28px,5vw,64px);align-items:stretch;}
.story-split .ss-text{align-self:center;}
.story-split .ss-text .prose{margin-top:16px;}
.story-split .ss-img img{width:100%;height:100%;min-height:clamp(360px,40vw,540px);object-fit:cover;border-radius:4px;display:block;}
.story-split.rev .ss-img{order:-1;}
@media(max-width:760px){
  .story-split{grid-template-columns:1fr;gap:22px;}
  .story-split.rev .ss-img{order:0;}
  .story-split .ss-img img{min-height:0;aspect-ratio:4/5;}
}
</style>

<!-- STUDIO HERO (split: deliberately not full-bleed) -->
<section class="studio-hero">
  <div class="sh-text">
    <p class="ey lab">{{ site.data.about.hero.eyebrow }}</p>
    <h1>{% include em.html t=site.data.about.hero.heading %}</h1>
    <p class="sh-sub">{{ site.data.about.hero.subheading }}</p>
  </div>
  <div class="sh-img">
    <img src="{{ site.baseurl }}/assets/images/studio-hero.jpg" alt="The Golden Flowers team finishing a wedding installation" loading="eager">
  </div>
</section>

<!-- STUDIO INTRO -->
<section class="block">
  <div class="twocol">
    <div>
      <span class="lab">{{ site.data.about.intro.label }}</span>
      <h2>{{ site.data.about.intro.heading }}</h2>
    </div>
    <div class="prose">
      {%- for p in site.data.about.intro.paragraphs %}
      <p>{{ p }}</p>
      {%- endfor %}
    </div>
  </div>
</section>

<hr class="hr-line">

<!-- ONE WEDDING A DAY: BY CHOICE -->
<section class="block">
  <div class="story-split rev">
    <div class="ss-img">
      <img src="{{ site.baseurl }}/assets/images/our-story.jpg" alt="Brittany of Golden Flowers building a wedding installation" loading="lazy">
    </div>
    <div class="ss-text">
      <span class="lab">{{ site.data.about.one_rule.label }}</span>
      <h2>{{ site.data.about.one_rule.heading }}</h2>
      <div class="prose">
        <p>{{ site.data.about.one_rule.paragraph }}</p>
        <span class="kicker">{{ site.data.about.one_rule.kicker }}</span>
      </div>
    </div>
  </div>
</section>

<hr class="hr-line">

<!-- THE TEAM -->
<section class="block">
  <div class="story-split">
    <div class="ss-text">
      <span class="lab">{{ site.data.about.team.label }}</span>
      <h2 class="h-lg">{{ site.data.about.team.heading }}</h2>
      <div class="prose">
        {%- for p in site.data.about.team.paragraphs %}
        <p>{{ p }}</p>
        {%- endfor %}
      </div>
    </div>
    <div class="ss-img">
      <img src="{{ site.baseurl }}/assets/images/our-story-2.jpg" alt="Brittany of Golden Flowers arranging seasonal blooms at the studio" loading="lazy">
    </div>
  </div>
</section>

<hr class="hr-line">

<!-- CERTAINTY -->
<section class="block">
  <div class="twocol">
    <div>
      <span class="lab">{{ site.data.about.certainty.label }}</span>
      <h2>{{ site.data.about.certainty.heading }}</h2>
    </div>
    <div class="prose">
      {%- for p in site.data.about.certainty.paragraphs %}
      <p>{{ p }}</p>
      {%- endfor %}
    </div>
  </div>
  <div class="cred-grid">
    {%- for pt in site.data.about.certainty.points %}
    <div class="cred-item"><h4>{{ pt.title }}</h4><p>{{ pt.body }}</p></div>
    {%- endfor %}
  </div>
</section>

<!-- EDITORIAL BREAK -->
<section class="immersive">
  <img class="bg" src="{{ site.baseurl }}/assets/images/portfolio/catherine-joaquin/catherine-joaquin-15.jpg" alt="Lake Tahoe wedding florals by Golden Flowers">
  <div class="il">
    <span class="lab">{{ site.data.about.editorial.label }}</span>
    <p class="disp">{{ site.data.about.editorial.heading }}</p>
  </div>
</section>

<!-- SEASONAL AVAILABILITY -->
<section class="block" id="seasonal-availability">
  <span class="lab">{{ site.data.about.seasonal.label }}</span>
  <h2 class="h-lg">{{ site.data.about.seasonal.heading }}</h2>
  <p class="prose" style="max-width:560px;margin-top:14px;"><span style="color:var(--fg2);">{{ site.data.about.seasonal.intro }}</span></p>
  <div class="season-grid">
    {%- for season in site.data.about.seasonal.seasons %}
    <details class="season-card" open>
      <summary><span class="season-name">{{ season.name }}</span><span class="season-dates">{{ season.dates }}</span><span class="season-toggle"></span></summary>
      <div class="season-body">
        <ul class="flower-list">{% for f in season.flowers %}<li>{{ f }}</li>{% endfor %}</ul>
        <p class="season-note">{{ season.note }}</p>
      </div>
    </details>
    {%- endfor %}
  </div>
  <p class="season-foot">{{ site.data.about.seasonal.footnote }}</p>
</section>

<hr class="hr-line">

<!-- VALUES -->
<section class="block">
  <span class="lab">{{ site.data.about.values.label }}</span>
  <h2 class="h-lg">{{ site.data.about.values.heading }}</h2>
  <div class="values-grid">
    {%- for v in site.data.about.values.items %}
    <div class="value-item"><h3>{{ v.title }}</h3><p>{{ v.body }}</p></div>
    {%- endfor %}
  </div>
</section>

<hr class="hr-line">

<!-- SUSTAINABILITY POINTER (full pledge lives on /sustainability) -->
<section class="mini">
  <span class="lab">{{ site.data.about.sustainability_pointer.label }}</span>
  <h2>{{ site.data.about.sustainability_pointer.heading }}</h2>
  <p>{{ site.data.about.sustainability_pointer.body }}</p>
  <a href="{{ site.baseurl }}/sustainability" class="txt-link">{{ site.data.about.sustainability_pointer.link }} &rarr;</a>
</section>

<!-- CLOSING -->
<section class="cta">
  <span class="lab">{{ site.data.about.closing.label }}</span>
  <h2 class="disp">{% include em.html t=site.data.about.closing.heading %}</h2>
  <p>{{ site.data.about.closing.body }}</p>
  <a class="btn btn-ink" href="{{ site.baseurl }}/consultation-form">{{ site.data.about.closing.button }} <span>&rarr;</span></a>
</section>

<script>
/* Seasonal availability: desktop = always open & not collapsible; mobile = collapsed, expandable. */
(function(){
  var cards=[].slice.call(document.querySelectorAll('.season-card'));
  if(!cards.length) return;
  var mq=window.matchMedia('(min-width:861px)');
  function apply(){
    cards.forEach(function(d){
      if(mq.matches){ d.open=true; d.dataset.lock='1'; }
      else { d.dataset.lock=''; }
    });
  }
  cards.forEach(function(d){
    d.querySelector('summary').addEventListener('click', function(e){ if(d.dataset.lock==='1') e.preventDefault(); });
  });
  if(!mq.matches) cards.forEach(function(d){ d.open=false; });  // mobile: start collapsed
  apply();
  mq.addEventListener('change', apply);
})();
</script>
