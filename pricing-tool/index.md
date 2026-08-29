---
layout: redesign
title: "Pricing tool"
seo_title: "Pricing tool | Golden Flowers"
permalink: /pricing-tool
sitemap: false
noindex: true
description: "Internal planning tool. Not linked from the site and not indexed."
---

<!-- =====================================================================
     INTERNAL PRICING TOOL. Moved here from the pricing section of
     /weddings on 2026-08-28, where it was the site's whole pricing
     answer and was reading as a detour on the way to an inquiry. The
     published three-figure ladder took its place there.

     This page is INTERNAL. It is noindex + sitemap: false, it appears
     in no navigation, and nothing on the site links to it. It is not
     secret (anyone with the URL can open it) so nothing on it may say
     anything we would not say to a couple.

     It runs the component with cta="off" and start="blank".

     cta="off": no "Check your date" buttons, no note under them, no
     mobile sticky bar. There is nobody on this page to convert, and a
     CTA here would hand the estimator's recap to the consult form on
     our own behalf.

     start="blank": nothing is preselected and the panel shows no figure
     until the first answer. Opening this on a screenshare and having it
     already read "$15,000 to $22,000" puts a number in the room nobody
     asked for, and every number after it is then read against that one.
     The guest slider still holds a position, because a slider has to,
     but its position is a control and not a claim: no price is shown
     until Brittany answers something.

     EVERY DOLLAR FIGURE behind it is an estimate in _data/estimator.yml,
     extrapolated from Brittany's price guide and not confirmed by her.
     Read that file's header before changing one.

     Its $7,500 `settings.minimum` is now BELOW the $8,000 full-service
     minimum published on /weddings. Those should agree; which one moves
     is Brittany's call, not a silent edit.
     ===================================================================== -->

{% assign C = site.data.estimator.copy %}

<header class="es-head">
  <span class="lab">{{ C.eyebrow }}</span>
  <h1>{{ C.heading }}</h1>
  <p class="es-lede">{{ C.lede }}</p>
  <p class="es-disc">
    <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.6" aria-hidden="true"><circle cx="12" cy="12" r="9"/><path d="M12 11v5M12 7.6v.4"/></svg>
    <span>{{ C.disclaimer }}</span>
  </p>
</header>

{% include estimator.html cta="off" start="blank" %}
