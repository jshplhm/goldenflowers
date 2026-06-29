---
layout: redesign
title: "Lake Tahoe Wedding Venues"
seo_title: "Lake Tahoe Wedding Venues We Love | Golden Flowers"
permalink: /venues
description: "The Lake Tahoe and Sierra Nevada wedding venues Golden Flowers knows best, from Edgewood Tahoe and the Ritz-Carlton to Palisades High Camp and Martis Camp. Venue-specific, foam-free, California-grown floral design."
canonical_url: https://goldenflorals.com/venues
---

<link rel="stylesheet" href="https://unpkg.com/leaflet@1.9.4/dist/leaflet.css" integrity="sha256-p4NxAoJBhIIN+hmNHrzRCf9tD/miZyoHS5obTRR9BMY=" crossorigin="">
<script src="https://unpkg.com/leaflet@1.9.4/dist/leaflet.js" integrity="sha256-20nQCchB9co0qIjJZRGuk2/Z9VM+kNiyxNV1lvTlZBo=" crossorigin=""></script>

<!-- HEADER (no full-bleed photo — the map is the visual) -->
<section class="block venues-head" style="padding-top:clamp(120px,15vw,180px);padding-bottom:clamp(30px,4vw,44px);">
  <span class="lab">Venues</span>
  <h1 class="h-lg">The venues we love.</h1>
  <p style="max-width:640px;color:var(--fg2);font-size:1.06rem;line-height:1.6;margin-top:14px;">We work a deliberately small set of Tahoe and Sierra venues — in depth, across every season — rather than trying to cover the whole basin. Find yours on the map, or tell us where you're getting married.</p>
</section>

<!-- INTERACTIVE MAP -->
<section class="venue-map-wrap">
  <div class="venue-map-legend">
    <b><span class="lg-dot"></span> Venues we know intimately — tap to explore</b>
    <b><span class="lg-dot sm"></span> More venues we love to design at</b>
  </div>
  <div id="venue-map" class="venue-map" role="img" aria-label="Map of Lake Tahoe wedding venues"></div>
</section>

<!-- THE NINE (text links — SEO + no-JS fallback) -->
<section class="block" style="padding-top:clamp(40px,5vw,60px);">
  <span class="lab">The nine we know best</span>
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

<!-- GOLD COUNTRY INSET -->
<section class="block">
  <div class="region-split">
    <div>
      <span class="lab">Gold Country</span>
      <h2>Our Nevada City &amp; Grass Valley home base.</h2>
      <p style="color:var(--fg2);line-height:1.65;margin-top:10px;">About an hour west of the lake, around our home base, our sister shop keeps everyday flowers flowing — and we design weddings at the historic venues of the Sierra foothills, too.</p>
    </div>
    <div id="region-map" class="region-map" role="img" aria-label="Map of Nevada City and Grass Valley wedding venues"></div>
  </div>
</section>

<!-- ALSO LOVE -->
<section class="block" style="padding-top:0;">
  <div class="venues-more">
    <p class="lab">We also love designing at</p>
    <ul class="venues-more-list">
      <li>The HideOut</li><li>Tahoe Blue Estate</li><li>West Shore Cafe &amp; Inn</li><li>Everline Resort</li><li>Olympic Valley Stables</li><li>Zephyr Lodge, Northstar</li><li>The Chateau, Incline Village</li><li>The Landing Resort</li><li>Lakeview Lodge, Heavenly</li><li>Sunnyside</li><li>Valhalla Tahoe</li><li>Tahoe Mountain Club</li><li>PlumpJack at Palisades</li><li>Gar Woods Grill &amp; Pier</li><li>Lahontan Golf Club</li>
    </ul>
    <p class="lab" style="margin-top:40px;">In the foothills</p>
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

<script>
(function(){
  if (typeof L === 'undefined') return;
  var BASE='{{ site.baseurl }}';
  var TILES='https://{s}.basemaps.cartocdn.com/light_all/{z}/{x}/{y}{r}.png';
  var TOPTS={subdomains:'abcd',maxZoom:18,attribution:'&copy; OpenStreetMap &copy; CARTO'};
  function dot(cls){ return L.divIcon({className:'v-pin',html:'<span class="v-dot'+(cls||'')+'"></span>',iconSize:cls?[11,11]:[18,18],iconAnchor:cls?[5,5]:[9,9]}); }

  // Big = has a page (click-through); small = named only
  var big=[
    [38.961,-119.939,"Edgewood Tahoe","edgewood-tahoe"],
    [39.274,-120.124,"The Ritz-Carlton, Lake Tahoe","ritz-carlton-lake-tahoe"],
    [39.236,-119.931,"Thunderbird Lodge","thunderbird-lodge"],
    [39.273,-120.130,"Schaffer's Camp","schaffers-camp"],
    [39.197,-120.247,"Palisades High Camp","palisades-high-camp"],
    [39.293,-120.139,"Martis Camp","martis-camp"],
    [39.244,-119.943,"Hyatt Regency Lake Tahoe","hyatt-regency-lake-tahoe"],
    [39.054,-120.118,"Hellman-Ehrman Mansion","hellman-ehrman-mansion"],
    [39.237,-120.025,"North Tahoe Event Center","north-tahoe-event-center"]
  ];
  var small=[
    [39.069,-120.155,"West Shore Cafe & Inn"],[39.197,-120.265,"Everline Resort"],
    [39.149,-120.156,"Sunnyside"],[39.226,-120.082,"Gar Woods"],
    [39.198,-120.236,"PlumpJack at Palisades"],[39.088,-119.931,"Tahoe Blue Estate"],
    [38.957,-119.949,"The Landing Resort"],[38.940,-120.043,"Valhalla Tahoe"],
    [39.252,-119.948,"The Chateau, Incline Village"],[39.236,-120.114,"Tahoe Mountain Club"]
  ];
  var region=[
    [39.262,-121.016,"The National Exchange"],[39.219,-121.060,"The Holbrooke"],
    [39.261,-121.017,"Miner's Foundry"],[39.206,-121.052,"Empire Mine"],
    [39.197,-121.077,"The North Star House"],[39.260,-121.013,"Nevada City Winery"]
  ];

  var map=L.map('venue-map',{scrollWheelZoom:false,zoomControl:true}).setView([39.16,-120.05],10);
  L.tileLayer(TILES,TOPTS).addTo(map);
  var pts=[];
  big.forEach(function(v){
    var m=L.marker([v[0],v[1]],{icon:dot('')}).addTo(map);
    m.bindTooltip(v[2],{className:'v-tip',direction:'top',offset:[0,-10]});
    m.on('click',function(){ window.location=BASE+'/venues/'+v[3]; });
    pts.push([v[0],v[1]]);
  });
  small.forEach(function(v){
    var m=L.marker([v[0],v[1]],{icon:dot(' sm')}).addTo(map);
    m.bindTooltip(v[2],{className:'v-tip',direction:'top',offset:[0,-7]});
    pts.push([v[0],v[1]]);
  });
  map.fitBounds(pts,{padding:[44,44]});

  var rmap=L.map('region-map',{scrollWheelZoom:false,zoomControl:false}).setView([39.235,-121.04],12);
  L.tileLayer(TILES,TOPTS).addTo(rmap);
  region.forEach(function(v){
    L.marker([v[0],v[1]],{icon:dot(' sm')}).addTo(rmap)
     .bindTooltip(v[2],{className:'v-tip',direction:'top',offset:[0,-7]});
  });
})();
</script>
