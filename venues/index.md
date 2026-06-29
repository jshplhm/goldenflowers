---
layout: redesign
title: "Lake Tahoe Wedding Venues"
seo_title: "Lake Tahoe Wedding Venues We Love | Golden Flowers"
permalink: /venues
description: "The Lake Tahoe and Sierra Nevada wedding venues Golden Flowers knows best, from Edgewood Tahoe and the Ritz-Carlton to Palisades High Camp and Martis Camp. Venue-specific, foam-free, California-grown floral design."
canonical_url: https://goldenflorals.com/venues
---

<!-- HEADER -->
<section class="block venues-head" style="padding-top:clamp(120px,15vw,180px);padding-bottom:clamp(8px,2vw,20px);">
  <span class="lab">Venues</span>
  <h1 class="h-lg">We love this place.</h1>
</section>

<!-- CUSTOM TAHOE MAP -->
<section class="map-section">
  <div class="map-figure">
    <svg class="tahoe" viewBox="0 0 480 760" xmlns="http://www.w3.org/2000/svg" role="group" aria-label="Map of Lake Tahoe wedding venues">
      <defs>
        <path id="tahoe-lake" d="M140 122 C168 108 210 104 242 108 C250 109 252 124 258 126 C264 118 276 108 296 108 C318 108 334 116 348 136 C366 166 378 230 378 302 C378 372 372 442 360 500 C350 552 326 598 284 636 C258 656 220 664 188 657 C168 653 156 632 150 608 C146 591 162 580 148 562 C137 531 126 467 124 402 C122 322 124 222 130 172 C134 146 135 132 140 122 Z"/>
      </defs>

      <!-- highways -->
      <path class="t-hwy maj" d="M70 60 Q185 50 300 30 T448 18"/>
      <path class="t-hwy" d="M188 56 L252 78 L294 92"/>            <!-- 267 -->
      <path class="t-hwy" d="M182 60 L166 100"/>                   <!-- 89 spur -->
      <path class="t-hwy" d="M356 472 L452 452"/>                  <!-- 50 east -->
      <path class="t-hwy" d="M236 692 L150 744"/>                  <!-- 50 south -->

      <!-- the lake -->
      <use href="#tahoe-lake" class="t-lake"/>

      <!-- highway labels -->
      <text class="t-lab" x="112" y="50">I-80</text>
      <text class="t-lab" x="446" y="16" text-anchor="end">&#8594; Reno</text>
      <text class="t-lab" x="270" y="74">267</text>
      <text class="t-lab" x="150" y="84" text-anchor="end">89</text>
      <text class="t-lab" x="452" y="446" text-anchor="end">&#8594; Carson City &#183; 50</text>
      <text class="t-lab" x="150" y="754" text-anchor="end">&#8594; Sacramento &#183; 50</text>

      <!-- cities -->
      <g class="t-city">
        <circle cx="185" cy="52" r="3"/><text x="194" y="56">Truckee</text>
        <circle cx="162" cy="108" r="3"/><text x="153" y="111" text-anchor="end">Tahoe City</text>
        <circle cx="352" cy="140" r="3"/><text x="361" y="144">Incline Village</text>
        <circle cx="235" cy="690" r="3"/><text x="235" y="712" text-anchor="middle">South Lake Tahoe</text>
      </g>

      <!-- venues with pages (big, click-through) -->
      <a href="{{ site.baseurl }}/venues/edgewood-tahoe" class="t-pin" aria-label="Edgewood Tahoe — view venue"><circle class="t-dot" cx="272" cy="666" r="5.5"/><text class="t-vlabel" x="281" y="670">Edgewood Tahoe</text></a>
      <a href="{{ site.baseurl }}/venues/ritz-carlton-lake-tahoe" class="t-pin" aria-label="The Ritz-Carlton, Lake Tahoe — view venue"><circle class="t-dot" cx="240" cy="68" r="5.5"/><text class="t-vlabel" x="249" y="66">The Ritz-Carlton</text></a>
      <a href="{{ site.baseurl }}/venues/thunderbird-lodge" class="t-pin" aria-label="Thunderbird Lodge — view venue"><circle class="t-dot" cx="368" cy="330" r="5.5"/><text class="t-vlabel" x="359" y="333" text-anchor="end">Thunderbird Lodge</text></a>
      <a href="{{ site.baseurl }}/venues/schaffers-camp" class="t-pin" aria-label="Schaffer's Camp — view venue"><circle class="t-dot" cx="262" cy="56" r="5.5"/><text class="t-vlabel" x="271" y="54">Schaffer's Camp</text></a>
      <a href="{{ site.baseurl }}/venues/palisades-high-camp" class="t-pin" aria-label="Palisades High Camp — view venue"><circle class="t-dot" cx="95" cy="120" r="5.5"/><text class="t-vlabel" x="104" y="123">Palisades High Camp</text></a>
      <a href="{{ site.baseurl }}/venues/martis-camp" class="t-pin" aria-label="Martis Camp — view venue"><circle class="t-dot" cx="205" cy="74" r="5.5"/><text class="t-vlabel" x="214" y="78">Martis Camp</text></a>
      <a href="{{ site.baseurl }}/venues/hyatt-regency-lake-tahoe" class="t-pin" aria-label="Hyatt Regency Lake Tahoe — view venue"><circle class="t-dot" cx="344" cy="170" r="5.5"/><text class="t-vlabel" x="353" y="173">Hyatt Regency</text></a>
      <a href="{{ site.baseurl }}/venues/hellman-ehrman-mansion" class="t-pin" aria-label="Hellman-Ehrman Mansion — view venue"><circle class="t-dot" cx="116" cy="432" r="5.5"/><text class="t-vlabel" x="107" y="435" text-anchor="end">Hellman-Ehrman</text></a>
      <a href="{{ site.baseurl }}/venues/north-tahoe-event-center" class="t-pin" aria-label="North Tahoe Event Center — view venue"><circle class="t-dot" cx="295" cy="92" r="5.5"/><text class="t-vlabel" x="304" y="90">North Tahoe Event Center</text></a>

      <!-- venues we love (small, name only) -->
      <g class="t-pin" tabindex="0" role="img" aria-label="West Shore Cafe &amp; Inn"><circle class="t-dot sm" cx="114" cy="470" r="3.6"/><text class="t-vlabel" x="105" y="473" text-anchor="end">West Shore Cafe</text></g>
      <g class="t-pin" tabindex="0" role="img" aria-label="Sunnyside"><circle class="t-dot sm" cx="108" cy="252" r="3.6"/><text class="t-vlabel" x="99" y="255" text-anchor="end">Sunnyside</text></g>
      <g class="t-pin" tabindex="0" role="img" aria-label="Gar Woods Grill &amp; Pier"><circle class="t-dot sm" cx="256" cy="100" r="3.6"/><text class="t-vlabel" x="265" y="103">Gar Woods</text></g>
      <g class="t-pin" tabindex="0" role="img" aria-label="PlumpJack at Palisades"><circle class="t-dot sm" cx="86" cy="142" r="3.6"/><text class="t-vlabel" x="95" y="145">PlumpJack</text></g>
      <g class="t-pin" tabindex="0" role="img" aria-label="Tahoe Blue Estate"><circle class="t-dot sm" cx="360" cy="455" r="3.6"/><text class="t-vlabel" x="351" y="458" text-anchor="end">Tahoe Blue Estate</text></g>
      <g class="t-pin" tabindex="0" role="img" aria-label="The Landing Resort"><circle class="t-dot sm" cx="248" cy="676" r="3.6"/><text class="t-vlabel" x="257" y="672">The Landing</text></g>
    </svg>
  </div>

  <div class="map-aside">
    <span class="lab">Where we work</span>
    <h2>The Tahoe basin, at a glance.</h2>
    <p>From Tahoe City and Incline Village down to the south shore — and up into Truckee and Olympic Valley — we design across the lake and the surrounding Sierra. Hover a marker to see the venue; tap a larger one to open its page.</p>
    <ul class="map-legend">
      <li><span class="lg-dot"></span> Featured venues — tap to explore</li>
      <li><span class="lg-dot sm"></span> More venues we love to design at</li>
    </ul>
  </div>
</section>

<hr class="hr-line">

<!-- FEATURED VENUES (links — SEO + fallback) -->
<section class="block">
  <span class="lab">Featured venues</span>
  <div class="venue-list">
    <a href="{{ site.baseurl }}/venues/edgewood-tahoe"><span class="vl-name">Edgewood Tahoe</span><span class="vl-region">South Shore</span></a>
    <a href="{{ site.baseurl }}/venues/ritz-carlton-lake-tahoe"><span class="vl-name">The Ritz-Carlton</span><span class="vl-region">Northstar</span></a>
    <a href="{{ site.baseurl }}/venues/thunderbird-lodge"><span class="vl-name">Thunderbird Lodge</span><span class="vl-region">East Shore</span></a>
    <a href="{{ site.baseurl }}/venues/schaffers-camp"><span class="vl-name">Schaffer's Camp</span><span class="vl-region">Northstar</span></a>
    <a href="{{ site.baseurl }}/venues/palisades-high-camp"><span class="vl-name">Palisades High Camp</span><span class="vl-region">Olympic Valley</span></a>
    <a href="{{ site.baseurl }}/venues/martis-camp"><span class="vl-name">Martis Camp</span><span class="vl-region">Truckee</span></a>
    <a href="{{ site.baseurl }}/venues/hyatt-regency-lake-tahoe"><span class="vl-name">Hyatt Regency</span><span class="vl-region">Incline Village</span></a>
    <a href="{{ site.baseurl }}/venues/hellman-ehrman-mansion"><span class="vl-name">Hellman-Ehrman Mansion</span><span class="vl-region">West Shore</span></a>
    <a href="{{ site.baseurl }}/venues/north-tahoe-event-center"><span class="vl-name">North Tahoe Event Center</span><span class="vl-region">Kings Beach</span></a>
  </div>
</section>

<hr class="hr-line">

<!-- ALSO LOVE -->
<section class="block">
  <div class="venues-more">
    <p class="lab">We also love designing at</p>
    <ul class="venues-more-list">
      <li>The HideOut</li><li>Tahoe Blue Estate</li><li>West Shore Cafe &amp; Inn</li><li>Everline Resort</li><li>Olympic Valley Stables</li><li>Zephyr Lodge, Northstar</li><li>The Chateau, Incline Village</li><li>The Landing Resort</li><li>Lakeview Lodge, Heavenly</li><li>Sunnyside</li><li>Valhalla Tahoe</li><li>Tahoe Mountain Club</li><li>PlumpJack at Palisades</li><li>Gar Woods Grill &amp; Pier</li><li>Lahontan Golf Club</li>
    </ul>
    <p class="lab" style="margin-top:40px;">In the foothills — our Nevada City &amp; Grass Valley home base</p>
    <ul class="venues-more-list">
      <li>The National Exchange</li><li>The Holbrooke</li><li>Miner's Foundry</li><li>The Stone House</li><li>Harmony Ridge</li><li>The North Star House</li><li>Empire Mine</li><li>Lucchesi Vineyards</li><li>Nevada City Winery</li><li>River Highlands Ranch</li><li>The Roth Estate</li>
    </ul>
    <p class="venues-more-note">Some of our favorite work happens away from named venues entirely, at <strong>private residences and lakeside estates</strong>. Don't see yours? We love adding new venues — tell us where you're getting married and we'll take it from there.</p>
  </div>
</section>

<!-- CLOSING -->
<section class="cta">
  <span class="lab">Get started</span>
  <h2 class="disp">Getting married at <em>one of these?</em></h2>
  <p>Tell us your venue and date. We'll let you know if we're available and how we'd approach the design.</p>
  <a class="btn btn-ink" href="{{ site.baseurl }}/consultation-form">Check your date <span>&rarr;</span></a>
</section>
