---
layout: redesign
title: "Weddings"
seo_title: "Lake Tahoe Wedding Flowers Cost & Pricing | Golden Flowers"
permalink: /weddings
description: "What Lake Tahoe wedding flowers cost with Golden Flowers: weddings start at $5,000 and a typical 100 guest wedding runs $10,000 to $16,000. How our process works."
canonical_url: https://goldenflorals.com/weddings
redirect_from:
  # Short addresses that match the menu (2026-09-26): typed or shared, they land here;
  # /weddings stays the address Google ranks.
  - /pricing
  - /process
  - /weddingflowers
  - /weddings-1
  # Retargeted here 2026-07-09 (were -> home): Squarespace's own URL mappings sent
  # /goldenflowers, /a-la-carte, and /a-la-carte-weddings (incl. products) to /weddingflowers
  - /goldenflowers
  - /a-la-carte
  - /a-la-carte/p/basic-package-bgzcp-s5d9e
  - /a-la-carte/p/basic-package-bgzcp-s5d9e-kz83z
  - /a-la-carte/p/basic-package-bgzcp-s5d9e-kghp7
  - /a-la-carte/p/basic-package-bgzcp-s5d9e-5entb
  - /a-la-carte/p/basic-package-bgzcp-s5d9e-5entb-hhsnz
  - /a-la-carte/p/basic-package-bgzcp-s5d9e-5entb-hhsnz-c43ng
  - /a-la-carte/p/basic-package-bgzcp-s5d9e-64msg-epl3n-g2m2r-fm297
  - /a-la-carte/p/q4y7ldy5lm3xj3a8wfk3wwmop33x20
  - /a-la-carte/p/flower-delivery-to-your-venue
  - /a-la-carte-weddings
  - /a-la-carte-weddings/p/signature-bridal-bouquet
  - /a-la-carte-weddings/p/midi-bridal-bouquet
  - /a-la-carte-weddings/p/minimalist-bouquet
  - /a-la-carte-weddings/p/bridesmaid-bouquet
  - /a-la-carte-weddings/p/boutonniere-new
  - /a-la-carte-weddings/p/corsage
  - /a-la-carte-weddings/p/bud-vases
  - /a-la-carte-weddings/p/aisle-marker
  - /a-la-carte-weddings/p/aisle-marker-xf38y
  - /a-la-carte-weddings/p/flower-girl-petals
  - /a-la-carte-weddings/p/floral-design-consultation
  - /a-la-carte-weddings/p/table-arrangement
  - /a-la-carte-weddings/p/delivery-to-your-venue
---

<!-- ===================================================================
     PROCESS & PRICING.

     2026-08-28: the estimator moved off this page to /pricing-tool
     (noindex, unlinked, no CTA) and the published three-figure ladder
     came back in its place. Every figure and every photo lives in
     _data/weddings.yml `pricing`; read that block's header before
     touching a number or a photo pairing.

     Order (2026-09-25, Josh): hero -> what it costs (what's included folded
     in) -> process -> a photograph -> reviews (hidden) -> FAQ -> closing CTA.
     The nav calls this page Pricing, so the price comes first; it used to
     sit ~2,300px down behind seven process steps, with a "Jump to pricing"
     button in the hero apologising for the order.
     =================================================================== -->

<!-- HERO -->
{%- comment -%}
  Words, then the photograph (2026-09-24), the treatment /sustainability took
  the same day. Copy beside the picture put a headline and a photograph at the
  same height competing for the same attention and left the column under the
  headline empty.
{%- endcomment -%}
<header class="text-hero text-hero--pic">
  <span class="lab"><span data-ed="weddings:hero.label">{{ site.data.weddings.hero.label }}</span></span>
  <h1>{% include em.html t=site.data.weddings.hero.heading k="weddings:hero.heading" %}</h1>
  <p class="th-sub"><span data-ed="weddings:hero.subheading">{{ site.data.weddings.hero.subheading }}</span></p>
  {%- comment -%} No hero button (2026-09-25). It was "Jump to pricing",
  there only because pricing sat below the process. Pricing is next now, and
  the nav carries "Check your date" on every screen. {%- endcomment -%}
</header>

<figure class="page-pic">
  <img src="{{ site.baseurl }}/assets/images/portfolio/kelly-dylan/kelly-dylan-13.jpg"
       alt="Bride holding a lush garden-rose and ranunculus bouquet at a Lake Tahoe beach wedding by Golden Flowers"
       width="1500" height="844" loading="eager" fetchpriority="high"
{% include img-crop.html path="/assets/images/portfolio/kelly-dylan/kelly-dylan-13.jpg" ctx="page" %} sizes="(min-width:1500px) 1500px, 100vw">
</figure>

<!-- INVESTMENT -->
{%- comment -%}
  THE PAGE IS CALLED PRICING, SO PRICING GETS A SECTION (2026-09-24, Josh).

  This was one figure, one caption and one paragraph on the page's own ground,
  sitting between "what's included" and the FAQ with nothing to mark it. A
  reader who came here from a nav link reading "Pricing" scrolled past seven
  process steps and six inclusions to reach four lines.

  It is now a band: the position (no minimum, quoted individually), two
  figures, the four things that move the number, and the a la carte answer for
  a smaller budget.

  THE TINT. --bg2 as a SECTION GROUND is reserved, by a rule written into the
  token itself, for the closing block alone. The rule exists because the header
  is a fixed colour sitting over the top of a page, so a second ground there
  made it read grey on one page and white on another. This section is in the
  middle of a page and the header never touches it, so the bug the rule guards
  against cannot happen here. It is one band on one page, not the per-section
  banding that was reversed on 2026-09-16 for making the page shout. Josh asked
  for the tint so pricing reads as its own place. See --bg2 in redesign.css.

  #pricing sits on the SECTION, which carries the padding the anchor needs.
{%- endcomment -%}
{%- assign pr = site.data.weddings.pricing -%}
{%- assign nfig = pr.figures | size -%}
{%- if nfig > 0 %}
<section class="invest-band" id="pricing">
  <div class="invest-wrap">
    <div class="invest-head">
      <h2><span data-ed="weddings:pricing.heading">{{ pr.heading }}</span></h2>
      <p class="invest-intro"><span data-ed="weddings:pricing.intro">{{ pr.intro }}</span></p>
    </div>

    {%- comment -%} Two figures read as a range and a ceiling. The grid is set
    from the count so a single figure still fills the row rather than sitting in
    a half-empty one. {%- endcomment -%}
    {%- comment -%} With `label`s the figures render as a quiet table (2026-09-25):
    what the number is on the left in small caps, the figure on the right, all
    three the same size and a step under the section heading. An optional
    caption sits under the label. Without labels, the older figure-over-caption
    blocks. {%- endcomment -%}
    {%- assign fig_table = pr.figures.first.label | strip -%}
    <div class="invest-figs{% if fig_table != "" %} invest-figs--table{% endif %}" data-n="{{ nfig }}">
      {%- for f in pr.figures %}
      {%- assign fi = forloop.index0 %}
      <div class="invest-fig">
        {%- if fig_table != "" %}
        <div class="invest-lab">
          <p class="invest-label"><span data-ed="weddings:pricing.figures.{{ fi }}.label">{{ f.label }}</span></p>
          {%- assign fc = f.caption | strip %}
          <p class="invest-cap{% if fc == "" %} ed-empty{% endif %}"><span data-ed="weddings:pricing.figures.{{ fi }}.caption">{{ f.caption }}</span></p>
        </div>
        <p class="invest-amount"><span data-ed="weddings:pricing.figures.{{ fi }}.amount">{{ f.amount }}</span></p>
        {%- else %}
        <p class="invest-amount"><span data-ed="weddings:pricing.figures.{{ fi }}.amount">{{ f.amount }}</span></p>
        <p class="invest-cap"><span data-ed="weddings:pricing.figures.{{ fi }}.caption">{{ f.caption }}</span></p>
        {%- endif %}
      </div>
      {%- endfor %}
    </div>


    {%- comment -%} What's included, folded in (2026-09-25). It was its own
    section of six bare names between the process and the price; what it
    answers is "what does that figure buy", so it sits under the figures. {%- endcomment -%}
    {%- assign inc = site.data.weddings.included -%}
    {%- if inc.show != false %}
    <div class="invest-incl">
      <h3 class="grp-h"><span data-ed="weddings:included.label">{{ inc.label }}</span></h3>
      <ul class="invest-incl-list">
        {%- for item in inc.items %}
        <li><span class="ii-t"><span data-ed="weddings:included.items.{{ forloop.index0 }}.title">{{ item.title }}</span></span>
          {%- assign b = item.body | strip %}
          <span class="ii-b{% if b == "" %} ed-empty{% endif %}"><span data-ed="weddings:included.items.{{ forloop.index0 }}.body" data-ed-hint="Describe what this covers">{{ item.body }}</span></span></li>
        {%- endfor %}
      </ul>
    </div>
    {%- endif %}

    {%- assign ndrv = pr.drivers | size -%}
    {%- if ndrv > 0 %}
    <div class="invest-drivers">
      <h3 class="grp-h"><span data-ed="weddings:pricing.drivers_label">{{ pr.drivers_label }}</span></h3>
      <dl class="invest-dl">
        {%- for d in pr.drivers %}
        <div>
          <dt><span data-ed="weddings:pricing.drivers.{{ forloop.index0 }}.title">{{ d.title }}</span></dt>
          <dd><span data-ed="weddings:pricing.drivers.{{ forloop.index0 }}.body">{{ d.body }}</span></dd>
        </div>
        {%- endfor %}
      </dl>
    </div>
    {%- endif %}

    {%- comment -%} Gated on the body, not the heading: emptying the body is how
    the a la carte offer is withdrawn, and a heading left standing over nothing
    is what gating on the heading would leave behind. {%- endcomment -%}
    {%- assign sm = pr.smaller.body | strip -%}
    {%- if sm != "" %}
    <div class="invest-small">
      <h3><span data-ed="weddings:pricing.smaller.heading">{{ pr.smaller.heading }}</span></h3>
      <p><span data-ed="weddings:pricing.smaller.body">{{ pr.smaller.body }}</span></p>
      {%- assign smb = pr.smaller.button | strip -%}
      {%- if smb != "" %}
      <a class="txt-link" href="{{ site.baseurl }}/consultation-form" data-consult-open><span data-ed="weddings:pricing.smaller.button">{{ pr.smaller.button }}</span> &rarr;</a>
      {%- endif %}
    </div>
    {%- endif %}
  </div>
</section>
{%- endif %}

<!-- PRICE GUIDE -->
{%- comment -%}
  PIECE BY PIECE (2026-10-20, Josh): "the fact we give pricing is a big deal.
  It's a moment on the website." So it is its own section straight after the
  price band, with a display heading of the same rank as "What it costs.",
  not a list tucked between two others inside it.

  One row per group: a 4:5 photograph of that kind of piece on the left, the
  group's prices on the right at reading size. Portrait beside words, per the
  landscape rule. The labor line closes the section as a row of its own,
  because it is a real cost, not a footnote. On a phone each group stacks:
  photograph full width, then its list.
{%- endcomment -%}
{%- assign gd = site.data.weddings.pricing.guide -%}
{%- assign ngd = gd.groups | size -%}
{%- if ngd > 0 %}
<section class="block pguide" id="price-guide">
  <div class="pg-head">
    {%- comment -%} No eyebrow on the site (2026-10-20): one label per page,
    and "Pricing" above the h1 is it. Left in the data so /edit can bring it
    back; blank renders as an /edit-only slot. {%- endcomment %}
    {%- assign gl = gd.label | strip %}
    <span class="lab{% if gl == "" %} ed-empty{% endif %}"><span data-ed="weddings:pricing.guide.label">{{ gd.label }}</span></span>
    <h2><span data-ed="weddings:pricing.guide.heading">{{ gd.heading }}</span></h2>
    {%- assign gi = gd.intro | strip %}
    {%- if gi != "" %}
    <p class="pg-intro"><span data-ed="weddings:pricing.guide.intro">{{ gd.intro }}</span></p>
    {%- endif %}
  </div>
  {%- for g in gd.groups %}
  {%- assign gx = forloop.index0 %}
  <div class="pg-row">
    {%- comment -%} The group photograph is a /edit slot too: click it there
    to pick any wedding's photo or upload one. /edit writes "slug/file.jpg",
    the seeded values are full paths; both resolve here. Alt comes from
    photo_alt.yml for whatever is chosen, so a swap never keeps a stale alt. {%- endcomment %}
    {%- assign gp = g.photo | strip %}
    {%- if gp != "" %}
    {%- assign gp0 = gp | slice: 0 %}
    {%- if gp0 != "/" %}{% assign gp = "/assets/images/portfolio/" | append: gp %}{% endif %}
    <figure class="pg-pic">
      <img src="{{ site.baseurl }}{{ gp }}"{% include img-dims.html path=gp %}{% include img-crop.html path=gp ctx="page" %}
           data-ed-photo="weddings:pricing.guide.groups.{{ gx }}.photo"
           alt="{{ site.data.photo_alt[gp] | default: g.alt | escape }}" loading="lazy" sizes="(min-width:1100px) 420px, (min-width:641px) 36vw, 100vw">
    </figure>
    {%- endif %}
    <div class="pg-body">
      <h3><span data-ed="weddings:pricing.guide.groups.{{ gx }}.title">{{ g.title }}</span></h3>
      {%- comment -%} Every row is a <details> in one exclusive group
      (name="pg"): opening one closes the last and the reader never leaves the
      table. Each carries FOUR photo slots from the data; filled ones show,
      empty ones are .ed-empty "Add photo" boxes that only /edit reveals. A row
      with nothing filled is .pg-none: on the site it reads as a plain row
      (no plus, no toggle), in /edit it opens so its slots can be filled.
      No captions (Josh, 2026-10-20). {%- endcomment %}
      <div class="pg-list">
        {%- for it in g.items %}
        {%- assign ix = forloop.index0 %}
        {%- assign nfill = 0 %}
        {%- for ph in it.photos %}{% assign phs = ph | strip %}{% if phs != "" %}{% assign nfill = nfill | plus: 1 %}{% endif %}{% endfor %}
        {%- comment -%} .pg-line holds the row and its add control side by
        side: the control can't live in <summary> (a tap there would also
        open the row), so it sits over the row's right edge instead. {%- endcomment %}
        <div class="pg-line" data-pl-group="{{ g.title | escape }}" data-pl-name="{{ it.name | escape }}" data-pl-price="{{ it.price | escape }}">
        <details class="pg-item{% if nfill == 0 %} pg-none{% endif %}" name="pg">
          {%- comment -%} The row's first example as a small thumbnail (the
          "tap me for photos" cue that replaced the chevron, 2026-10-24), and a
          ? after the name when the piece carries a note. {%- endcomment %}
          {%- assign th = "" %}
          {%- for ph in it.photos %}{% assign phs = ph | strip %}{% if phs != "" and th == "" %}{% assign th = phs %}{% endif %}{% endfor %}
          {%- if th != "" %}{% assign th0 = th | slice: 0 %}{% if th0 != "/" %}{% assign th = "/assets/images/portfolio/" | append: th %}{% endif %}{% endif %}
          {%- assign nt = it.note | strip %}
          <summary{% if nfill == 0 %} tabindex="-1"{% endif %}><span class="pg-th">{% if th != "" %}<img src="{{ site.baseurl }}{{ th }}" alt="" loading="lazy" sizes="56px">{% endif %}</span><span class="pg-n"><span data-ed="weddings:pricing.guide.groups.{{ gx }}.items.{{ ix }}.name" data-ed-hint="Name this piece">{{ it.name }}</span>{% if nt != "" %}<span class="pg-q" aria-label="Has a note">?</span>{% endif %}</span>
            <span class="pg-p"><span data-ed="weddings:pricing.guide.groups.{{ gx }}.items.{{ ix }}.price" data-ed-hint="Add a price">{{ it.price }}</span></span><span class="pg-x" aria-hidden="true"></span></summary>
          <p class="pg-note{% if nt == "" %} ed-empty{% endif %}"><span data-ed="weddings:pricing.guide.groups.{{ gx }}.items.{{ ix }}.note" data-ed-hint="Add a note about this piece">{{ it.note }}</span></p>
          <div class="pg-ex">
            {%- for ph in it.photos %}
            {%- assign pp = ph | strip %}
            {%- assign slot = "weddings:pricing.guide.groups." | append: gx | append: ".items." | append: ix | append: ".photos." | append: forloop.index0 %}
            {%- if pp == "" %}
            <figure class="ed-empty"><img src="{{ site.baseurl }}/assets/images/ui/add-photo.svg" data-ed-photo="{{ slot }}" alt="Add a photo of this piece" width="400" height="500" loading="lazy"></figure>
            {%- else %}
            {%- assign pp0 = pp | slice: 0 %}
            {%- if pp0 != "/" %}{% assign pp = "/assets/images/portfolio/" | append: pp %}{% endif %}
            <figure><img src="{{ site.baseurl }}{{ pp }}"{% include img-dims.html path=pp %}{% include img-crop.html path=pp ctx="guide" %} data-ed-photo="{{ slot }}" alt="{{ site.data.photo_alt[pp] | default: it.name | escape }}" loading="lazy" sizes="(min-width:641px) 240px, 62vw"></figure>
            {%- endif %}
            {%- endfor %}
            {%- comment -%} /edit only (.ed-empty): takes this line off the guide. {%- endcomment %}
            <button type="button" class="ed-empty pg-rmline" data-ed-rmline="weddings:pricing.guide.groups.{{ gx }}.items.{{ ix }}">Remove this line</button>
          </div>
        </details>
        <div class="pl-q" data-pl-q>
          <button type="button" class="pl-add" data-pl-step="1" aria-label="{{ gd.list.add }}: {{ it.name | escape }}">{{ gd.list.add_short }}</button>
          <span class="pl-step" hidden>
            <button type="button" class="pl-minus" data-pl-step="-1" aria-label="One fewer {{ it.name | escape }}"></button>
            <input class="pl-n" type="text" inputmode="numeric" pattern="[0-9]*" maxlength="3" value="0" aria-label="How many: {{ it.name | escape }}">
            <button type="button" class="pl-plus" data-pl-step="1" aria-label="One more {{ it.name | escape }}"></button>
          </span>
        </div>
        </div>
        {%- endfor %}
        {%- comment -%} /edit only: a new line, named "New piece", five empty slots. {%- endcomment %}
        <button type="button" class="ed-empty pg-addline" data-ed-addline="weddings:pricing.guide.groups.{{ gx }}.items">+ Add a line</button>
      </div>
    </div>
  </div>
  {%- endfor %}
  {%- assign lb = gd.labor.label | strip %}
  {%- if lb != "" %}
  <div class="pg-labor">
    <p class="pg-labor-l"><span data-ed="weddings:pricing.guide.labor.label">{{ gd.labor.label }}</span></p>
    <p class="pg-labor-a"><span data-ed="weddings:pricing.guide.labor.amount">{{ gd.labor.amount }}</span></p>
  </div>
  {%- endif %}
  {%- assign pl = gd.list %}
  {%- if pl %}
  {%- include price-list.html %}
  {%- endif %}
</section>
{%- endif %}

<!-- THE ASK AFTER THE PRICES: same band as the closing ask, its own words. -->
{%- assign pa = site.data.weddings.price_ask %}
{%- if pa.heading and pa.show != false %}
<section class="cta cta--mid">
  <h2 class="disp">{% include em.html t=pa.heading k="weddings:price_ask.heading" %}</h2>
  <p><span data-ed="weddings:price_ask.body">{{ pa.body }}</span></p>
  <a class="btn btn-ink" href="{{ site.baseurl }}/consultation-form"><span data-ed="weddings:price_ask.button">{{ pa.button }}</span> <span>&rarr;</span></a>
</section>
{%- endif %}

<!-- PROCESS -->
{%- comment -%}
  NUMBERED ROWS ACROSS THE PAGE (2026-09-24). This was a timeline down a
  narrow left column with an icon per step, which spent an icon on each row,
  wrapped every line early, and left more than half the width empty. Each step
  is now a row: number and timing on the left, the step and what happens on
  the right, hairline between. Seven steps read as seven steps.

  `icon:` in _data/weddings.yml is no longer rendered. It is left in the data
  rather than stripped out, so restoring the old treatment is a markup change
  and not a data re-entry job.
{%- endcomment -%}
<section class="block proc-rows">
  <div class="proc-head">
    <h2 class="h-lg"><span data-ed="weddings:process.heading">{{ site.data.weddings.process.heading }}</span></h2>
    <p class="proc-intro"><span data-ed="weddings:process.intro">{{ site.data.weddings.process.intro }}</span></p>
  </div>
  {%- comment -%} Steps carry an optional `phase`; a heading is emitted wherever
  it changes, which breaks the run into "before you book" and "once you're
  booked". Leave every phase blank and it renders as one continuous list.
  {%- endcomment -%}
  {%- assign seen_phase = "" %}
  <ol class="proc-list">
  {%- for step in site.data.weddings.process.steps %}
  {%- if step.phase and step.phase != seen_phase %}
    <li class="proc-phase grp-h"><span data-ed="weddings:process.steps.{{ forloop.index0 }}.phase">{{ step.phase }}</span></li>
  {%- assign seen_phase = step.phase %}
  {%- endif %}
    <li class="proc-row">
      <span class="proc-ic" aria-hidden="true">{% include icon.html name=step.icon %}</span>
      {%- comment -%} No numerals (2026-09-25). The steps are an <ol>, so order is
      in the markup, and the "when" column already reads as the sequence;
      01-07 running across two phases made 05 look like it started a new list. {%- endcomment %}
      <div class="proc-body">
        <h3><span data-ed="weddings:process.steps.{{ forloop.index0 }}.title">{{ step.title }}</span></h3>
        <p><span data-ed="weddings:process.steps.{{ forloop.index0 }}.body">{{ step.body }}</span></p>
      </div>
    </li>
  {%- endfor %}
  </ol>
</section>


{%- comment -%} REVIEWS: hidden by `testimonials.show: false` in
_data/weddings.yml, not deleted. The 13 quotes still live in
_data/testimonials.yml and still feed the Review/aggregateRating JSON-LD in
the layout. Flip show: true to bring the section back, and restore the home
page's "Read more reviews" link (home.yml testimonial.link) in the same
change, because it points at the #reviews anchor below. {%- endcomment -%}
{%- if site.data.weddings.testimonials.show %}
<section class="block" id="reviews">
  <span class="lab"><span data-ed="weddings:testimonials.label">{{ site.data.weddings.testimonials.label }}</span></span>
  <h2 class="h-lg"><span data-ed="weddings:testimonials.heading">{{ site.data.weddings.testimonials.heading }}</span></h2>
  {% include redesign-testimonials.html %}
</section>
{%- endif %}

<!-- FAQ -->
{%- comment -%} Heading in a left rail, questions in the right column
(2026-09-23). Full width, the accordion was a stack of hairlines running the
whole measure with the heading stranded above it and half the row empty after
each question. {%- endcomment -%}
<section class="block faq-split">
  <div class="faq-head">
    <h2 class="h-lg"><span data-ed="weddings:faq.heading">{{ site.data.weddings.faq.heading }}</span></h2>
  </div>
  {% include redesign-faq.html %}
</section>

<!-- A ROOM, DESIGNED. Moved 2026-10-20 from between the process and the
     FAQ to just above the closing ask: the page now ends on a finished room. The page was ~7,300px of words under one photograph at
     the top; this is what the upper figure buys, a room dressed end to end
     (Palisades High Camp). Landscape, so it takes a full row. -->
<figure class="page-pic page-pic--mid">
  <img src="{{ site.baseurl }}/assets/images/portfolio/lynn-aaron/lynn-aaron-26.jpg"{% include img-dims.html path="/assets/images/portfolio/lynn-aaron/lynn-aaron-26.jpg" %}{% include img-crop.html path="/assets/images/portfolio/lynn-aaron/lynn-aaron-26.jpg" ctx="page" %}
       alt="Reception room at Palisades High Camp dressed end to end: greenery climbing the timber posts, long tables in blush and olive, lounge seating and a tiered cake"
       loading="lazy" sizes="(min-width:1500px) 1500px, 100vw">
</figure>

<!-- CLOSING -->
<section class="cta">
  <h2 class="disp">{% include em.html t=site.data.weddings.closing.heading k="weddings:closing.heading" %}</h2>
  <p><span data-ed="weddings:closing.body">{{ site.data.weddings.closing.body }}</span></p>
  <a class="btn btn-ink" href="{{ site.baseurl }}/consultation-form"><span data-ed="weddings:closing.button">{{ site.data.weddings.closing.button }}</span> <span>&rarr;</span></a>
</section>
