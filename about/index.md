---
layout: redesign
title: "About Golden Flowers"
seo_title: "About Brittany & Golden Flowers | Lake Tahoe Wedding Florist"
permalink: /about
description: "Golden Flowers is a Lake Tahoe floral studio led by Brittany, an artist and an agronomist, with a team of seasoned floral designers across the Sierra Nevada."
canonical_url: https://goldenflorals.com/about
redirect_from:
  - /about-us
---

<style>
/* Editorial text + portrait splits: Brittany photos woven through the page */
.story-split{display:grid;grid-template-columns:1fr 1fr;gap:clamp(28px,5vw,64px);align-items:stretch;}
.story-split .ss-text{align-self:center;}
.story-split .ss-text .prose{margin-top:16px;}
/* The frame clips, so a photo or the video zoomed in /edit stays inside its
   rounded box. The video's sizing moved here from an inline style, which the
   framing include needs the style attribute for. */
.story-split .ss-img{overflow:hidden;border-radius:var(--r-img);}
.story-split .ss-img :is(img,video){width:100%;height:100%;min-height:clamp(360px,40vw,540px);object-fit:cover;border-radius:var(--r-img);display:block;}
.story-split.rev .ss-img{order:-1;}
@media(max-width:760px){
  .story-split{grid-template-columns:1fr;gap:22px;}
  .story-split.rev .ss-img{order:0;}
  .story-split.img-first-mobile .ss-img{order:-1;}
  .story-split .ss-img :is(img,video){min-height:0;aspect-ratio:4/5;}
}

/* No full-width rules between sections either (2026-09-26): the page
   alternates photograph and words, and that change already marks each break.

   No bands (2026-09-25). This page kept the old site's forest-green band and a
   tint band after every other page moved to one ground in September: Josh
   read them as "the older style of our site". Sections break on space and a
   hairline here like everywhere else. */

/* The four planning points were bold serif at 1.6 leading; every other
   small serif heading on the site is regular weight at 1.2. */
.cred-item h4{font-weight:430;line-height:1.2;}
</style>

<!-- STUDIO HERO (split: deliberately not full-bleed) -->
<section class="studio-hero">
  <div class="sh-text">
    <p class="ey lab"><span data-ed="about:hero.eyebrow">{{ site.data.about.hero.eyebrow }}</span></p>
    <h1>{% include em.html t=site.data.about.hero.heading k="about:hero.heading" %}</h1>
    <p class="sh-sub"><span data-ed="about:hero.subheading">{{ site.data.about.hero.subheading }}</span></p>
  </div>
  <div class="sh-img">
    <img src="{{ site.baseurl }}/assets/images/our-story.jpg" alt="Brittany of Golden Flowers arranging a floral installation at an outdoor wedding" loading="eager"{% include img-dims.html path="/assets/images/our-story.jpg" %}{% include img-crop.html path="/assets/images/our-story.jpg" ctx="studio" %}>
  </div>
</section>

<!-- BRITTANY -->
<section class="block">
  <div class="story-split rev">
    <div class="ss-img">
      <img src="{{ site.baseurl }}/assets/images/studio-brittany.jpg" alt="Brittany of Golden Flowers with a large floral installation" loading="lazy"{% include img-dims.html path="/assets/images/studio-brittany.jpg" %}{% include img-crop.html path="/assets/images/studio-brittany.jpg" ctx="studio" %}>
    </div>
    <div class="ss-text">
      <h2><span data-ed="about:brittany.heading">{{ site.data.about.brittany.heading }}</span></h2>
      <div class="prose">
        {%- for p in site.data.about.brittany.paragraphs %}
        <p><span data-ed="about:brittany.paragraphs.{{ forloop.index0 }}">{{ p }}</span></p>
        {%- endfor %}
      </div>
    </div>
  </div>
</section>

<!-- THE TEAM -->
<section class="block">
  <div class="story-split img-first-mobile">
    <div class="ss-text">
      <h2 class="h-lg"><span data-ed="about:team.heading">{{ site.data.about.team.heading }}</span></h2>
      <div class="prose">
        {%- for p in site.data.about.team.paragraphs %}
        <p><span data-ed="about:team.paragraphs.{{ forloop.index0 }}">{{ p }}</span></p>
        {%- endfor %}
      </div>
    </div>
    <div class="ss-img">
      {%- comment -%} The poster paints instantly; the video file itself (4MB —
      timelapses compress poorly) isn't fetched until the visitor scrolls near
      this section, so it never competes with the photos above it. {%- endcomment -%}
      <video class="team-video" muted loop playsinline preload="none" poster="{{ site.baseurl }}/assets/videos/team-timelapse-poster.jpg" data-lazy-video{% include img-crop.html path="/assets/videos/team-timelapse.mp4" ctx="studio" %}>
        <source data-src="{{ site.baseurl }}/assets/videos/team-timelapse.mp4" type="video/mp4">
      </video>
      <script>
      (function(){
        var v=document.querySelector('video[data-lazy-video]');
        if(!v) return;
        function start(){
          var s=v.querySelector('source[data-src]');
          if(!s) return;
          s.src=s.getAttribute('data-src'); s.removeAttribute('data-src');
          v.load();
          var p=v.play(); if(p && p.catch) p.catch(function(){});
        }
        if(!('IntersectionObserver' in window)){ start(); return; }
        var io=new IntersectionObserver(function(es){
          es.forEach(function(e){ if(e.isIntersecting){ io.disconnect(); start(); } });
        },{rootMargin:'800px'});
        io.observe(v);
      })();
      </script>
    </div>
  </div>
</section>

<!-- HOW WE WORK -->
<section class="block">
  {%- comment -%} No photo here on purpose (Josh, 2026-09-26): every wedding
  photo tried beside "Planned months ahead" read as unrelated to it. Add one
  only if it shows planning itself (sketches, sourcing, a cooler of stems). {%- endcomment %}
  <div class="twocol">
    <div>
      <h2><span data-ed="about:planning.heading">{{ site.data.about.planning.heading }}</span></h2>
    </div>
    <div class="prose">
      {%- for p in site.data.about.planning.paragraphs %}
      <p><span data-ed="about:planning.paragraphs.{{ forloop.index0 }}">{{ p }}</span></p>
      {%- endfor %}
    </div>
  </div>
  <div class="cred-grid">
    {%- for pt in site.data.about.planning.points %}
    <div class="cred-item"><h4><span data-ed="about:planning.points.{{ forloop.index0 }}.title">{{ pt.title }}</span></h4><p><span data-ed="about:planning.points.{{ forloop.index0 }}.body">{{ pt.body }}</span></p></div>
    {%- endfor %}
  </div>
</section>

{%- comment -%} Seasonal availability moved OFF this page (Josh, 2026-09-25):
a 40-flower reference table was the longest thing on a page about who the
studio is. The answer now lives in the /weddings FAQ "What flowers will be
available for my date?", which was the only link to it. {%- endcomment %}
<!-- WHAT WE BELIEVE (the old philosophy grid and sustainability pointer, as one block) -->
<section class="block">
  <div class="twocol">
    <div>
      <h2><span data-ed="about:beliefs.heading">{{ site.data.about.beliefs.heading }}</span></h2>
    </div>
    <div class="prose">
      {%- for p in site.data.about.beliefs.paragraphs %}
      <p><span data-ed="about:beliefs.paragraphs.{{ forloop.index0 }}">{{ p }}</span></p>
      {%- endfor %}
      <p><a href="{{ site.baseurl }}/sustainability" class="txt-link"><span data-ed="about:beliefs.link">{{ site.data.about.beliefs.link }}</span> &rarr;</a></p>
    </div>
  </div>
</section>

<!-- REVIEW (a different couple from the home page's) -->
<section class="testi">
  <div class="stars" aria-label="Five stars">★★★★★</div>
  <blockquote class="disp">{% include em.html t=site.data.about.testimonial.quote k="about:testimonial.quote" %}</blockquote>
  <p class="by"><b><span data-ed="about:testimonial.name">{{ site.data.about.testimonial.name }}</span></b> &nbsp;·&nbsp; <span data-ed="about:testimonial.context">{{ site.data.about.testimonial.context }}</span></p>
</section>

<!-- CLOSING -->
<section class="cta">
  <h2 class="disp">{% include em.html t=site.data.about.closing.heading k="about:closing.heading" %}</h2>
  <p><span data-ed="about:closing.body">{{ site.data.about.closing.body }}</span></p>
  <a class="btn btn-ink" href="{{ site.baseurl }}/consultation-form"><span data-ed="about:closing.button">{{ site.data.about.closing.button }}</span> <span>&rarr;</span></a>
</section>
