---
layout: redesign
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

<!-- HERO (five photos crossfading behind fixed copy — see HERO ROTATION in redesign.css) -->
{%- comment -%} data-boost MUST match the data-boost of the FIRST .bg image below.
The rotator only sets this attribute once JS runs, so if it starts absent while
the lead photo wants the boost, the left-hand scrim fades in after the photo has
already painted, which reads as a bug. Rendering the right value here means there
is nothing to transition on load. Reorder the photos, update this.

Every photo currently carries data-boost="1", so the attribute never changes and
the boost layer is in effect a second permanent scrim. Left per-photo on purpose:
the moment one pale photo wants it and another does not, the machinery is here.
{%- endcomment -%}
<header class="hero hero-beside hero-home">

  {%- comment -%}
    THE COPY SITS BESIDE THE PHOTOGRAPH, NOT ON IT (Josh, 2026-09-22, off the
    /hero-kb mockup, variant A). The slideshow underneath is unchanged: same
    five photos in the same order, same per-photo crops and zoom origins, same
    template parking for photos 2-5, same rotator, same timings. Only the
    layout around it moved.

    WHAT THAT DELETED RATHER THAN RESTYLED: the ::after scrim and the
    .hero-boost layer both existed to darken a photograph enough for white type
    to sit on it legibly. With the type on paper beside it neither has a job.
    The photographs are shown as photographs now rather than as backgrounds, at
    full brightness, and no longer cropped to whatever a 100vh box leaves.

    #hero-rot IS the grid, so every element the rotator looks up (.bg,
    .hero-dots .hd, #hero-rest, .hero-boost) is still a descendant of it and is
    still found. One line of the rotator changed: the insert was
    hero.insertBefore(node, boostEl), and boostEl is a grandchild now, so it is
    boostEl.parentNode.insertBefore. See _layouts/redesign.html.

    .hero-boost stays in the markup, hidden by CSS, because the rotator still
    mirrors each photo's data-boost flag and expects to find the element.
  {%- endcomment -%}

  <div class="hero-in">
    {% if site.data.home.hero.eyebrow and site.data.home.hero.eyebrow != "" %}<p class="ey lab"><span data-ed="home:hero.eyebrow">{{ site.data.home.hero.eyebrow }}</span></p>{% endif %}
    <h1 class="disp">{% include em.html t=site.data.home.hero.heading k="home:hero.heading" %}</h1>
    <div class="hero-foot">
      <p class="hero-sub"><span data-ed="home:hero.subheading">{{ site.data.home.hero.subheading }}</span></p>
      <a class="btn" href="{{ site.baseurl }}/portfolio"><span data-ed="home:hero.button">{{ site.data.home.hero.button }}</span> <span>&rarr;</span></a>
    </div>
  </div>

  <div class="hs-right">
    <div class="hs-stage">
    {% comment %} ONE STILL PHOTOGRAPH, not a slideshow (Josh, 2026-09-22).
    There used to be five photos crossfading here on a timer, with a Ken Burns
    push, four of them parked in a <template> so they did not compete with the
    LCP image. All of it is gone. The argument against it: the page now opens
    into a run of photographs a screen below, so the hero was no longer the only
    place work appeared, it was the worst one, because the visitor could not
    choose what they saw. It also auto-advanced with no pause control (that was
    removed as clutter in August), and it spent bandwidth on the one image that
    decides LCP.

    Art direction still applies: a portrait crop is cut for phones, because
    object-position cannot fix a landscape frame in a portrait viewport. This
    photograph is 2:3 and the plate is 5:6, so the crop is slight.
    {% endcomment %}
      <img class="bg" style="object-position:50% 38%;" fetchpriority="high"
           src="{{ site.baseurl }}/assets/images/portfolio/mikayla-jeff/mikayla-jeff-05.jpg"
           alt="Olympic Valley ceremony: a couple kissing between two tall asymmetric installations of lilac and white against the pines">
    </div>
  </div>
</header>

<!-- PHOTOGRAPHS. The four photographs that used to rotate through the hero are
     placed down the page now, plus placeholders for the rest. -->
<section class="pband">
  <div class="pb-row pb-row--land">
    <figure class="pb-pic"><img src="{{ site.baseurl }}/assets/images/home-hero-laux.jpg" loading="lazy" alt="Golden hour in an Olympic Valley meadow: a couple in tall grass with the Sierra Nevada behind them"></figure>
    <figure class="pb-pic"><img src="{{ site.baseurl }}/assets/images/portfolio/kelly-dylan/kelly-dylan-07.jpg" loading="lazy" alt="Lake Tahoe beach wedding: a couple on the sand between borders of blue delphinium"></figure>
  </div>
  <div class="pb-row">
    {% include photo-slot.html n=1 s="tall" %}
    {% include photo-slot.html n=2 s="wide" %}
  </div>
</section>

<!-- INTRO. After photographs, not before them. -->
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

<!-- PHOTOGRAPHS, and Process & Pricing beside one of them. The signpost used to
     be its own full-width centred band; in a column next to a picture the page
     stops starting and stopping. -->
<section class="pband">
  <div class="pb-row">
    {% include photo-slot.html n=3 s="tall" %}
    {% include photo-slot.html n=4 s="wide" %}
  </div>
  <div class="pb-row pb-row--split">
    <div class="pb-txt">
  <span class="lab"><span data-ed="home:process.label">{{ site.data.home.process.label }}</span></span>
  <h2 class="disp"><span data-ed="home:process.heading">{{ site.data.home.process.heading }}</span></h2>
  <p><span data-ed="home:process.body">{{ site.data.home.process.body }}</span></p>
  <p class="marq-foot"><a href="{{ site.baseurl }}/weddings" class="txt-link"><span data-ed="home:process.link">{{ site.data.home.process.link }}</span> &rarr;</a></p>
    </div>
    <figure class="pb-pic"><img src="{{ site.baseurl }}/assets/images/portfolio/katie-james/katie-james-08.jpg" loading="lazy" alt="Stone-walled ceremony room: a couple before their officiant under a towering arch of blush, peach and cream blooms"></figure>
  </div>
</section>

<!-- FACTS. The eyebrow and the "We grow our own flowers..." headline are gone
     (Josh, 2026-09-22): the three claims say it themselves and the headline made
     a farming claim the studio does not make. -->
<section class="credo credo-facts">
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

<!-- VENUES beside a photograph, then more photographs. Was a scrolling ticker of
     venue names: motion that said nothing you could not read standing still, and
     names that meant little to anyone who did not already know them. The lake
     says it in one look. Same geometry and the same twelve featured coordinates
     as the map on /venues so the two agree, but outline only: no roads, no town
     names, no labels, no hover. It links to the map you can actually use, and
     the copy still reads from home.marquee.* so /edit keeps working. -->
<section class="pband">
  <div class="pb-row pb-row--split rev">
    <div class="pb-txt vmini-txt">
      <div class="vmini-map">{% include lake-mini.html %}</div>
    <p class="disp"><span data-ed="home:marquee.label">{{ site.data.home.marquee.label }}</span></p>
    <p class="vmini-more"><a href="{{ site.baseurl }}/venues" class="txt-link"><span data-ed="home:marquee.link">{{ site.data.home.marquee.link }}</span> &rarr;</a></p>
    </div>
    <figure class="pb-pic"><img src="{{ site.baseurl }}/assets/images/portfolio/lynn-aaron/lynn-aaron-19.jpg" loading="lazy" alt="Snowy Sierra mountaintop ceremony: a couple kissing between two towering floral installations"></figure>
  </div>
  <div class="pb-row pb-row--land">
    <figure class="pb-pic"><img src="{{ site.baseurl }}/assets/images/portfolio/tori-tucker/tori-tucker-13.jpg" loading="lazy" alt="Lake Tahoe beach ceremony: a bride reading her vows between two coral and burgundy floral installations"></figure>
    {% include photo-slot.html n=5 s="wide" %}
  </div>
</section>

<!-- TESTIMONIAL -->
<section class="testi">
  <div class="stars" aria-label="Five stars">★★★★★</div>
  <blockquote class="disp">{% include em.html t=site.data.home.testimonial.quote k="home:testimonial.quote" %}</blockquote>
  <p class="by"><b><span data-ed="home:testimonial.name">{{ site.data.home.testimonial.name }}</span></b> &nbsp;·&nbsp; <span data-ed="home:testimonial.context">{{ site.data.home.testimonial.context }}</span></p>
  {%- comment -%} Points at the #reviews anchor on /weddings, which is hidden
  while weddings.yml `testimonials.show` is false. Guarded on empty so blanking
  the link text in the CMS removes it cleanly rather than leaving a bare arrow.
  Restore both together. {%- endcomment -%}
  {%- if site.data.home.testimonial.link != "" %}
  <p class="marq-foot" style="margin-top:24px;"><a href="{{ site.baseurl }}/weddings#reviews" class="txt-link"><span data-ed="home:testimonial.link">{{ site.data.home.testimonial.link }}</span> &rarr;</a></p>
  {%- endif %}
</section>

<!-- CLOSING -->
<section class="cta">
  <h2 class="disp">{% include em.html t=site.data.home.cta.heading k="home:cta.heading" %}</h2>
  <p><span data-ed="home:cta.body">{{ site.data.home.cta.body }}</span></p>
  <a class="btn btn-ink" href="{{ site.baseurl }}/consultation-form"><span data-ed="home:cta.button">{{ site.data.home.cta.button }}</span> <span>&rarr;</span></a>
</section>
