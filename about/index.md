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
    <p class="ey lab"><span data-ed="about:hero.eyebrow">{{ site.data.about.hero.eyebrow }}</span></p>
    <h1>{% include em.html t=site.data.about.hero.heading k="about:hero.heading" %}</h1>
    <p class="sh-sub"><span data-ed="about:hero.subheading">{{ site.data.about.hero.subheading }}</span></p>
  </div>
  <div class="sh-img">
    <img src="{{ site.baseurl }}/assets/images/studio-hero.jpg" alt="The Golden Flowers team finishing a wedding installation" loading="eager">
  </div>
</section>

<!-- STUDIO INTRO -->
<section class="block">
  <div class="twocol">
    <div>
      <span class="lab"><span data-ed="about:intro.label">{{ site.data.about.intro.label }}</span></span>
      <h2><span data-ed="about:intro.heading">{{ site.data.about.intro.heading }}</span></h2>
    </div>
    <div class="prose">
      {%- for p in site.data.about.intro.paragraphs %}
      <p><span data-ed="about:intro.paragraphs.{{ forloop.index0 }}">{{ p }}</span></p>
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
      <span class="lab"><span data-ed="about:one_rule.label">{{ site.data.about.one_rule.label }}</span></span>
      <h2><span data-ed="about:one_rule.heading">{{ site.data.about.one_rule.heading }}</span></h2>
      <div class="prose">
        <p><span data-ed="about:one_rule.paragraph">{{ site.data.about.one_rule.paragraph }}</span></p>
        <span class="kicker"><span data-ed="about:one_rule.kicker">{{ site.data.about.one_rule.kicker }}</span></span>
      </div>
    </div>
  </div>
</section>

<hr class="hr-line">

<!-- THE TEAM -->
<section class="block">
  <div class="story-split">
    <div class="ss-text">
      <span class="lab"><span data-ed="about:team.label">{{ site.data.about.team.label }}</span></span>
      <h2 class="h-lg"><span data-ed="about:team.heading">{{ site.data.about.team.heading }}</span></h2>
      <div class="prose">
        {%- for p in site.data.about.team.paragraphs %}
        <p><span data-ed="about:team.paragraphs.{{ forloop.index0 }}">{{ p }}</span></p>
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
      <span class="lab"><span data-ed="about:certainty.label">{{ site.data.about.certainty.label }}</span></span>
      <h2><span data-ed="about:certainty.heading">{{ site.data.about.certainty.heading }}</span></h2>
    </div>
    <div class="prose">
      {%- for p in site.data.about.certainty.paragraphs %}
      <p><span data-ed="about:certainty.paragraphs.{{ forloop.index0 }}">{{ p }}</span></p>
      {%- endfor %}
    </div>
  </div>
  <div class="cred-grid">
    {%- for pt in site.data.about.certainty.points %}
    <div class="cred-item"><h4><span data-ed="about:certainty.points.{{ forloop.index0 }}.title">{{ pt.title }}</span></h4><p><span data-ed="about:certainty.points.{{ forloop.index0 }}.body">{{ pt.body }}</span></p></div>
    {%- endfor %}
  </div>
</section>

<!-- EDITORIAL BREAK -->
<section class="immersive">
  <img class="bg" src="{{ site.baseurl }}/assets/images/portfolio/catherine-joaquin/catherine-joaquin-15.jpg" alt="Lake Tahoe wedding florals by Golden Flowers">
  <div class="il">
    <span class="lab"><span data-ed="about:editorial.label">{{ site.data.about.editorial.label }}</span></span>
    <p class="disp"><span data-ed="about:editorial.heading">{{ site.data.about.editorial.heading }}</span></p>
  </div>
</section>

<!-- SEASONAL AVAILABILITY -->
<section class="block" id="seasonal-availability">
  <span class="lab"><span data-ed="about:seasonal.label">{{ site.data.about.seasonal.label }}</span></span>
  <h2 class="h-lg"><span data-ed="about:seasonal.heading">{{ site.data.about.seasonal.heading }}</span></h2>
  <p class="prose" style="max-width:560px;margin-top:14px;"><span style="color:var(--fg2);"><span data-ed="about:seasonal.intro">{{ site.data.about.seasonal.intro }}</span></span></p>
  <div class="season-grid">
    {%- for season in site.data.about.seasonal.seasons %}
    {%- assign si = forloop.index0 %}
    <details class="season-card" open>
      <summary><span class="season-name"><span data-ed="about:seasonal.seasons.{{ si }}.name">{{ season.name }}</span></span><span class="season-dates"><span data-ed="about:seasonal.seasons.{{ si }}.dates">{{ season.dates }}</span></span><span class="season-toggle"></span></summary>
      <div class="season-body">
        <ul class="flower-list">{% for f in season.flowers %}<li><span data-ed="about:seasonal.seasons.{{ si }}.flowers.{{ forloop.index0 }}">{{ f }}</span></li>{% endfor %}</ul>
        <p class="season-note"><span data-ed="about:seasonal.seasons.{{ si }}.note">{{ season.note }}</span></p>
      </div>
    </details>
    {%- endfor %}
  </div>
  <p class="season-foot"><span data-ed="about:seasonal.footnote">{{ site.data.about.seasonal.footnote }}</span></p>
</section>

<hr class="hr-line">

<!-- VALUES -->
<section class="block">
  <span class="lab"><span data-ed="about:values.label">{{ site.data.about.values.label }}</span></span>
  <h2 class="h-lg"><span data-ed="about:values.heading">{{ site.data.about.values.heading }}</span></h2>
  <div class="values-grid">
    {%- for v in site.data.about.values.items %}
    <div class="value-item"><h3><span data-ed="about:values.items.{{ forloop.index0 }}.title">{{ v.title }}</span></h3><p><span data-ed="about:values.items.{{ forloop.index0 }}.body">{{ v.body }}</span></p></div>
    {%- endfor %}
  </div>
</section>

<hr class="hr-line">

<!-- SUSTAINABILITY POINTER (full pledge lives on /sustainability) -->
<section class="mini">
  <span class="lab"><span data-ed="about:sustainability_pointer.label">{{ site.data.about.sustainability_pointer.label }}</span></span>
  <h2><span data-ed="about:sustainability_pointer.heading">{{ site.data.about.sustainability_pointer.heading }}</span></h2>
  <p><span data-ed="about:sustainability_pointer.body">{{ site.data.about.sustainability_pointer.body }}</span></p>
  <a href="{{ site.baseurl }}/sustainability" class="txt-link"><span data-ed="about:sustainability_pointer.link">{{ site.data.about.sustainability_pointer.link }}</span> &rarr;</a>
</section>

<!-- CLOSING -->
<section class="cta">
  <span class="lab"><span data-ed="about:closing.label">{{ site.data.about.closing.label }}</span></span>
  <h2 class="disp">{% include em.html t=site.data.about.closing.heading k="about:closing.heading" %}</h2>
  <p><span data-ed="about:closing.body">{{ site.data.about.closing.body }}</span></p>
  <a class="btn btn-ink" href="{{ site.baseurl }}/consultation-form"><span data-ed="about:closing.button">{{ site.data.about.closing.button }}</span> <span>&rarr;</span></a>
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
