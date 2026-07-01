/* @ds-bundle name="GoldenFlowers" version="1.0.0" exports="SiteNav,Button,GhostButton,Hero,TextHero,CredoSection,ImmersiveQuote,ProcessSteps,CtaSection,Footer,Testimonial,QuoteCard,PricingBlock,WorkGrid" */
(function(g){'use strict';
const e={};

e.SiteNav=function(p={}){
  const{brand='Golden Flowers',links=['Weddings','Portfolio','Process','About','Blog'],cta={text:'Check my date',href:'#'}}=p;
  return`<nav class="site-nav nav-anim"><a class="brand" href="/">${brand}</a><div class="nav-r">${links.map(l=>`<a href="#">${l}</a>`).join('')}<a class="pill" href="${cta.href}">${cta.text}</a></div></nav>`;
};

e.Button=function(p={}){
  const{text='Book a consultation',href='#',variant='terra'}=p;
  const cls=variant==='ink'?'btn btn-ink':'btn';
  return`<a class="${cls}" href="${href}">${text}</a>`;
};

e.GhostButton=function(p={}){
  const{text='Learn more',href='#',variant='ghost'}=p;
  const cls=variant==='ghost-ink'?'btn ghost-ink':'btn ghost';
  return`<a class="${cls}" href="${href}">${text}</a>`;
};

e.Hero=function(p={}){
  const{eyebrow='Lake Tahoe Wedding Florist',headline='Flowers grown from the land where you wed',subhead='Sustainable, farm-direct florals for weddings across the Sierra Nevada.',primaryCta={text:'Book a consultation',href:'#'},secondaryCta={text:'See our work',href:'#'},bgColor='oklch(27% .05 150)'}=p;
  return`<section class="hero" style="min-height:500px;"><div class="bg" style="background:linear-gradient(160deg,${bgColor},oklch(19.5% .04 150));position:absolute;inset:0;"></div><div class="hero-in"><p class="lab ey">${eyebrow}</p><h1 class="disp">${headline}</h1><div class="hero-foot"><p class="hero-sub">${subhead}</p><div class="hero-btns"><a class="btn" href="${primaryCta.href}">${primaryCta.text}</a><a class="btn ghost" href="${secondaryCta.href}">${secondaryCta.text}</a></div></div></div></section>`;
};

e.TextHero=function(p={}){
  const{eyebrow='Our approach',headline='Designed for the terrain, the light, <em>the moment</em>',sub='Every arrangement begins with what the Sierra Nevada is growing right now.',cta={text:'Start planning',href:'#'}}=p;
  return`<div class="text-hero"><span class="lab">${eyebrow}</span><h1>${headline}</h1><p class="th-sub">${sub}</p><a class="btn" href="${cta.href}">${cta.text}</a></div>`;
};

e.CredoSection=function(p={}){
  const{eyebrow='Our philosophy',headline='We design with the land, not against it.',facts=[{n:'01',title:'Farm-direct',body:'Grown on our Nevada City property or sourced within 60 miles — no flown-in product.'},{n:'02',title:'Foam-free',body:'Every arrangement is built without floral foam, reducing microplastics in Sierra watersheds.'},{n:'03',title:'Named varieties',body:'You know every stem by name before we finalize. Transparency is part of the process.'}]}=p;
  return`<section class="credo"><span class="lab">${eyebrow}</span><h2 class="disp">${headline}</h2><div class="facts">${facts.map(f=>`<div class="fact"><span class="n">${f.n}</span><h3 class="disp">${f.title}</h3><p>${f.body}</p></div>`).join('')}</div></section>`;
};

e.ImmersiveQuote=function(p={}){
  const{eyebrow='The Golden Flowers way',quote='Flowers that remember where they came from.',bgColor='oklch(19.5% .04 150)'}=p;
  return`<section class="immersive" style="background:${bgColor};"><div class="il"><p class="lab">${eyebrow}</p><p class="disp">${quote}</p></div></section>`;
};

e.ProcessSteps=function(p={}){
  const{eyebrow='How it works',headline='A process as considered as the flowers.',intro='From first message to wedding day, you\'ll always know what\'s next.',steps=[{n:'1',when:'Week 1',title:'Initial consultation',body:'We discuss your vision, venue, date, and budget. No pressure — just a real conversation about what you want.'},{n:'2',when:'Weeks 2–4',title:'Design proposal',body:'You receive a full written proposal with named stems, arrangement concepts, and a line-item investment breakdown.'},{n:'3',when:'6 months out',title:'Stem selection',body:'We confirm availability from our farm and trusted local growers. You approve the final palette.'},{n:'4',when:'Wedding week',title:'Harvest & design',body:'Everything is cut fresh from the field, conditioned, and arranged in our Nevada City studio.'}]}=p;
  return`<section class="proc"><div class="proc-wrap"><div class="proc-head"><span class="lab">${eyebrow}</span><h2 class="disp">${headline}</h2><p>${intro}</p></div>${steps.map(s=>`<div class="proc-step"><div class="proc-num"><span class="proc-when">${s.when}</span>${s.n}</div><div><h3 class="disp">${s.title}</h3><p>${s.body}</p></div></div>`).join('')}</div></section>`;
};

e.CtaSection=function(p={}){
  const{eyebrow='Ready to begin',headline='Let\'s talk about your wedding.',sub='Most dates book 8–12 months out. A quick conversation is always the right first step.',cta={text:'Check my date',href:'#'}}=p;
  return`<section class="cta"><p class="lab">${eyebrow}</p><h2 class="disp">${headline}</h2><p>${sub}</p><a class="btn" href="${cta.href}">${cta.text}</a></section>`;
};

e.Footer=function(p={}){
  const{brand='Golden Flowers',tagline='Farm-direct, foam-free wedding florals in the Lake Tahoe region.',cta={text:'Start a conversation',href:'#'}}=p;
  return`<footer class="site-footer"><div class="foot-in"><div class="foot-lead"><div class="foot-brand disp">${brand}</div><p class="foot-tag">${tagline}</p><a class="foot-cta" href="${cta.href}">${cta.text}</a></div><div class="foot-cols"><div><h4>Services</h4><a href="#">Wedding florals</a><a href="#">Ceremony & reception</a><a href="#">Proposals</a></div><div><h4>Explore</h4><a href="#">Portfolio</a><a href="#">Venues</a><a href="#">Process</a><a href="#">Blog</a></div><div><h4>Contact</h4><p>Nevada City, CA</p><p>Lake Tahoe Region</p></div></div></div><div class="foot-bottom"><span>© 2026 Golden Flowers</span><span>Sustainably grown in the Sierra Nevada</span></div></footer>`;
};

e.Testimonial=function(p={}){
  const{stars='★★★★★',quote:'Working with Golden Flowers was the best decision we made for our wedding. Every stem felt chosen for us specifically — for our venue, our vision, our day.',name:'Emma & Ross',venue='Edgewood Tahoe'}=p;
  return`<section class="testi"><div class="stars">${stars}</div><blockquote class="disp">"${quote}"</blockquote><p class="by">— <b>${name}</b>, ${venue}</p></section>`;
};

e.QuoteCard=function(p={}){
  const{stars='★★★★★',quote='They matched our vibe perfectly — moody, lush, completely wild-feeling. The ceremony arch was unreal.',name='Niamh & Nick',venue='Hellman-Ehrman Mansion'}=p;
  return`<div class="quote-card"><div class="stars">${stars}</div><p class="disp">"${quote}"</p><p class="src"><b>${name}</b>, ${venue}</p></div>`;
};

e.PricingBlock=function(p={}){
  const{eyebrow='Investment',headline='Designed around your day',price='Starting at $4,500',sub='Ceremony + reception packages',includes=['Bridal bouquet & bridesmaid flowers','Ceremony arch or altar design','Reception centrepieces','Bud vases, accents & décor','Day-of delivery & setup'],tagline='No surprises. Every stem named before you sign.'}=p;
  return`<section class="block"><div class="pricing"><span class="lab">${eyebrow}</span><h2 class="disp">${headline}</h2><div class="price-num disp">${price}</div><p class="price-sub">${sub}</p><ul class="price-list">${includes.map(i=>`<li>${i}</li>`).join('')}</ul><p class="price-tagline disp">${tagline}</p></div></section>`;
};

e.WorkGrid=function(p={}){
  const{eyebrow='Recent weddings',headline:'The work',photos=[{label:'Emma & Ross',venue:'Edgewood Tahoe',span:'feature',color:'oklch(27% .05 150)'},{label:'Niamh & Nick',venue:'Hellman Ehrman',span:'portrait',color:'oklch(34% .02 148)'},{label:'Allie & Devin',venue:'Ritz-Carlton',span:'quarter',color:'oklch(39% .04 150)'},{label:'Katie & James',venue:'Martis Camp',span:'quarter',color:'oklch(32% .06 145)'},{label:'Lynn & Aaron',venue:'Old Greenwood',span:'quarter',color:'oklch(36% .04 148)'},{label:'Sam & Matt',venue:'Palisades',span:'quarter',color:'oklch(30% .05 150)'}]}=p;
  return`<section class="work"><div class="work-head"><span class="lab">${eyebrow}</span><h2 class="disp">${headline}</h2></div><div class="grid">${photos.map(ph=>`<a class="tile ${ph.span}" href="#" style="background:${ph.color};"><div class="cap"><b>${ph.label}</b><span>${ph.venue}</span></div></a>`).join('')}</div></section>`;
};

g.GoldenFlowers=e;
})(typeof window!=='undefined'?window:globalThis);
