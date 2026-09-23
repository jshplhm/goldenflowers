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
<!-- HERO. The photograph first, the name under it. Type is never on the picture:
     it sits below at reading size, which is also where the h1 can carry the
     search phrase without fighting the image. One still photograph, no
     slideshow (see the commit that removed it). A landscape only ever appears
     here or full width or beside a block of words, never squeezed into a
     portrait slot. -->
<header class="hero-top">
  <figure class="ht-pic">
    <picture>
      <source media="(max-width:700px)" srcset="{{ site.baseurl }}/assets/images/home-hero-laux-portrait.jpg">
      <img src="{{ site.baseurl }}/assets/images/home-hero-laux.jpg" fetchpriority="high"
           style="object-position:37% 72%;"
           alt="Golden hour in an Olympic Valley meadow: a couple in tall grass with the Sierra Nevada behind them, the bride holding a green and lavender bouquet">
    </picture>
  </figure>
  <div class="ht-words">
    {%- comment -%} The name, then one sentence, and the sentence IS the h1. It
    reads on from the wordmark: "Golden Flowers / a luxury Lake Tahoe wedding
    florist creating...". The search phrase sits inside a real sentence instead
    of standing alone as a four-word label, and the title tag still carries the
    short phrase on its own. The old hero sub-heading is gone: it said the same
    thing in fewer words directly underneath. {%- endcomment -%}
    <div class="ht-mark">Golden Flowers</div>
    <h1 class="ht-line">{% include em.html t=site.data.home.hero.heading k="home:hero.heading" %}</h1>
  </div>
</header>

<!-- Full width, side to side: a landscape gets the whole column or nothing. -->
<section class="pband">
  <div class="pb-row pb-row--full">
    <figure class="pb-pic"><img src="{{ site.baseurl }}/assets/images/portfolio/kelly-dylan/kelly-dylan-07.jpg" loading="lazy" alt="A couple on the shore between two installations of blue delphinium and anemone, Lake Tahoe and the Sierra behind them"></figure>
  </div>
  <div class="pb-row">
    <figure class="pb-pic"><img src="{{ site.baseurl }}/assets/images/portfolio/kelly-dylan/kelly-dylan-09.jpg" loading="lazy" alt="Bridal bouquet of blue delphinium, anemone and orange ranunculus on the shore of Lake Tahoe"></figure>
    <figure class="pb-pic"><img src="{{ site.baseurl }}/assets/images/portfolio/hannah-dillon/hannah-dillon-24.jpg" loading="lazy" alt="Magenta and coral blooms on the corten steel arch at Austin Ridge"></figure>
  </div>
</section>

<!-- WHO WE ARE. Large opening line, the argument under it at reading size, a
     closing line back up at display size. The label sits ABOVE the words rather
     than out in a margin rail: the rail was the only indented thing on the page
     and it was what made the scroll read as three different alignments. -->
<section class="credo intro">
  {%- if site.data.home.intro.label and site.data.home.intro.label != "" %}
  <span class="lab"><span data-ed="home:intro.label">{{ site.data.home.intro.label }}</span></span>
  {% endif -%}
  <p class="intro-lead"><span data-ed="home:intro.lead">{{ site.data.home.intro.lead }}</span></p>
  <p class="intro-body"><span data-ed="home:intro.body">{{ site.data.home.intro.body }}</span></p>
  {%- if site.data.home.intro.close and site.data.home.intro.close != "" %}
  <p class="intro-close"><span data-ed="home:intro.close">{{ site.data.home.intro.close }}</span></p>
  {%- endif %}
  {%- if site.data.home.intro.link and site.data.home.intro.link != "" %}
  <p class="intro-more"><a href="{{ site.baseurl }}/about" class="txt-link"><span data-ed="home:intro.link">{{ site.data.home.intro.link }}</span> &rarr;</a></p>
  {%- endif %}
</section>

<!-- Portrait pair. -->
<section class="pband">
  <div class="pb-row">
    <figure class="pb-pic"><img src="{{ site.baseurl }}/assets/images/portfolio/mikayla-jeff/mikayla-jeff-03.jpg" loading="lazy" alt="Tall whimsical ceremony installation of thistle, lilac and trailing green against Olympic Valley pines"></figure>
    <figure class="pb-pic"><img src="{{ site.baseurl }}/assets/images/portfolio/katie-james/katie-james-05.jpg" loading="lazy" alt="Blush and butter-cream roses massed on a stone wall at The Miner&#39;s Foundry"></figure>
  </div>
</section>

<!-- PHOTOGRAPHS, and Process & Pricing beside one of them. The signpost used to
     be its own full-width centred band; in a column next to a picture the page
     stops starting and stopping. -->
<section class="pband">
  <div class="pb-row pb-row--split">
    <div class="pb-txt">
  <h2 class="disp"><span data-ed="home:process.heading">{{ site.data.home.process.heading }}</span></h2>
  <p><span data-ed="home:process.body">{{ site.data.home.process.body }}</span></p>
  <p class="marq-foot"><a href="{{ site.baseurl }}/weddings" class="txt-link"><span data-ed="home:process.link">{{ site.data.home.process.link }}</span> &rarr;</a></p>
    </div>
    <figure class="pb-pic"><img src="{{ site.baseurl }}/assets/images/portfolio/katie-james/katie-james-08.jpg" loading="lazy" alt="Stone-walled ceremony room: a couple before their officiant under a towering arch of blush, peach and cream blooms"></figure>
  </div>
</section>

<section class="pband">
  <div class="pb-row pb-row--full">
    <figure class="pb-pic"><img src="{{ site.baseurl }}/assets/images/blog/palisades-tahoe-wedding-high-camp/palisades-tahoe-wedding-high-camp-01.jpg" loading="lazy" alt="A couple on the pier at the water's edge, the snow-covered Sierra across the lake behind them"></figure>
  </div>
</section>

{% comment %}
     FACTS. The eyebrow and the old "We grow our own flowers..." headline are
     gone (Josh, 2026-09-22): the three claims say it themselves and the headline
     made a farming claim the studio does not make. The rule the copy now follows
     (2026-09-23): we farm, but we do not own a farm. The plot is ours, the land
     is a shared organic community farm worked with regenerative practices, and
     it grows annual cut flowers, perennials and food side by side. Say "our
     plot"; never "our farm", "our fields", or "field-grown".
{% endcomment %}
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

<!-- Between the three text blocks (Josh, 2026-09-23). Facts, then the venues
     map, then the review used to run straight into each other: three sections
     of words with no photograph to separate them, which is the one thing this
     page had been careful about everywhere else. -->
<section class="pband">
  <div class="pb-row pb-row--full">
    <figure class="pb-pic"><img src="{{ site.baseurl }}/assets/images/portfolio/tori-tucker/tori-tucker-05.jpg" loading="lazy" alt="A beach ceremony set on the shore of Lake Tahoe, an arch and chairs waiting under a grey sky"></figure>
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
  <div class="pb-row pb-row--split rev pb-sq">
    <div class="pb-txt vmini-txt">
      <div class="vmini-map">{% include lake-mini.html %}</div>
    <p class="disp"><span data-ed="home:marquee.label">{{ site.data.home.marquee.label }}</span></p>
    <p class="vmini-more"><a href="{{ site.baseurl }}/venues" class="txt-link"><span data-ed="home:marquee.link">{{ site.data.home.marquee.link }}</span> &rarr;</a></p>
    </div>
    <figure class="pb-pic"><img src="{{ site.baseurl }}/assets/images/portfolio/brooke-josh/brooke-josh-09.jpg" loading="lazy" alt="A ceremony lawn at The Chateau with the chairs set in rows, pines and a blossoming tree behind"></figure>
  </div>
</section>


<!-- Between the venues block and the review. -->
<section class="pband">
  <div class="pb-row pb-row--full">
    <figure class="pb-pic"><img src="{{ site.baseurl }}/assets/images/portfolio/lynn-aaron/lynn-aaron-19.jpg" loading="lazy" alt="Snowy Sierra mountaintop ceremony: a couple kissing between two towering floral installations"></figure>
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

<!-- THE LAST RUN OF PHOTOGRAPHS (Josh, 2026-09-23). One section, not two, so
     every gap in here is the .pband row gap rather than two sections' padding
     butting together, which made the first break twice the size of the rest.

     The scroll above is pale the whole way down: a meadow at golden hour, the
     lake, a beach. This run goes the other way, into the dark and saturated
     work, so the page has a tonal arc instead of one note held for its whole
     length. Landscapes and pairs alternate, because two full-width landscapes
     stacked read as one long photograph with a seam in it. The second pair is
     flipped so the wide tile is on the left: every pair on the page had the
     wide one on the right, which turned a rhythm into a template. -->
<section class="pband">
  <div class="pb-row pb-row--full">
    <figure class="pb-pic"><img src="{{ site.baseurl }}/assets/images/portfolio/tori-tucker/tori-tucker-13.jpg" loading="lazy" alt="Lake Tahoe beach ceremony: a bride reading her vows between two coral and burgundy installations"></figure>
  </div>
  <div class="pb-row">
    <figure class="pb-pic"><img src="{{ site.baseurl }}/assets/images/portfolio/jac-brandon/jac-brandon-07.jpg" loading="lazy" alt="A couple in black, the bride holding a bouquet of crimson and oxblood roses against dark foliage"></figure>
    <figure class="pb-pic"><img src="{{ site.baseurl }}/assets/images/portfolio/lynn-aaron/lynn-aaron-28.jpg" loading="lazy" alt="A lounge vignette: a low white vessel of burgundy and blush blooms on marble, candles beside it"></figure>
  </div>
  <div class="pb-row pb-row--full">
    <figure class="pb-pic"><img src="{{ site.baseurl }}/assets/images/portfolio/lynn-aaron/lynn-aaron-02.jpg" loading="lazy" alt="Guests seated along a long banquet table run with greenery and candles, caught mid-dinner"></figure>
  </div>
  <div class="pb-row flip">
    <figure class="pb-pic"><img src="{{ site.baseurl }}/assets/images/portfolio/lynn-aaron/lynn-aaron-29.jpg" loading="lazy" alt="A dark installation of burgundy ranunculus and trailing amaranthus over a black-draped table"></figure>
    <figure class="pb-pic"><img src="{{ site.baseurl }}/assets/images/portfolio/tori-tucker/tori-tucker-18.jpg" loading="lazy" alt="A bouquet of pink garden roses and trailing greenery held against an ivory gown"></figure>
  </div>
</section>

<section class="credo closing">
  <p class="intro-close">{% include em.html t=site.data.home.cta.heading k="home:cta.heading" %}</p>
  <p class="intro-more"><a href="{{ site.baseurl }}/consultation-form" class="txt-link"><span data-ed="home:cta.button">{{ site.data.home.cta.button }}</span> &rarr;</a></p>
</section>
