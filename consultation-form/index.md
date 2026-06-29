---
layout: redesign
title: "Schedule a Consultation"
seo_title: "Schedule a Wedding Floral Consultation | Golden Flowers"
permalink: /consultation-form
description: "Schedule a free consultation with Golden Flowers, a Lake Tahoe wedding florist. We respond within 48 hours."
canonical_url: https://goldenflorals.com/consultation-form
---

<!-- HERO -->
<header class="hero hero-sm">
  <img class="bg" src="https://images.squarespace-cdn.com/content/v1/67e81d7599b7ef0dec0ec81c/1779129104888-WQHCD92BY6WE4CQZH8QU/14.jpg?format=2500w" alt="Bride holding her bouquet at Lake Tahoe" style="object-position:center 40%;">
  <div class="hero-in">
    <p class="ey lab">Get started</p>
    <h1 class="disp">Let's start the <em>conversation.</em></h1>
    <div class="hero-foot">
      <p class="hero-sub">Tell us your date, venue, and vision. We follow up within 48 hours to confirm availability.</p>
    </div>
  </div>
</header>

<!-- INTRO -->
<section class="block">
  <div class="twoup">
    <div>
      <span class="lab">What happens next</span>
      <h2 class="h-lg" style="margin-bottom:26px;">Three steps, no pressure.</h2>
      <ol class="next-steps">
        <li><span class="n">1</span><strong>You send the form.</strong>Your date, venue, and a little about your vision — about two minutes.</li>
        <li><span class="n">2</span><strong>We reply within 48 hours.</strong>We confirm we're open on your date — we take one wedding per day, so dates go quickly.</li>
        <li><span class="n">3</span><strong>We talk it through.</strong>A complimentary call, then a custom proposal built around your season and venue.</li>
      </ol>
    </div>
    <div class="contact-links">
      <span class="lab">Reach us directly</span>
      <h2 class="h-lg" style="margin-bottom:26px;">Or just say hello.</h2>
      <p><a href="tel:5305577689">(530) 557-7689</a></p>
      <p><a href="mailto:brittany@goldenflorals.com">brittany@goldenflorals.com</a></p>
      <p><a href="https://www.instagram.com/goldenflowersfloraldesign/" target="_blank" rel="noopener">@goldenflowersfloraldesign</a></p>
      <p style="color:var(--ink);margin-top:22px;">Incline Village, Lake Tahoe</p>
      <p style="font-size:.85rem;color:var(--mute);margin-top:5px;line-height:1.5;">By appointment only — we don't host walk-ins. Serving Lake Tahoe, Truckee, Nevada City &amp; beyond.</p>
    </div>
  </div>
</section>

<hr class="hr-line">

<!-- FORM -->
<section class="form-section" id="consultation">
  <div data-form-wrap>
    <form action="https://formspree.io/f/xgobrjyo" method="POST" id="consultation-form" data-multistep data-ajax>
      <input type="hidden" name="_subject" value="New consultation request, Golden Flowers">
      <input type="hidden" name="_next" value="{{ site.baseurl }}/consultation-form#consultation-success">
      <input type="text" name="_gotcha" tabindex="-1" autocomplete="off" aria-hidden="true" style="position:absolute;left:-9999px;width:1px;height:1px;opacity:0;">
      <span class="form-step-indicator" aria-hidden="true">Step 1 of 2</span>
      <div class="form-step-1">
        <div class="field-full">
          <label for="date">Wedding date</label>
          <input type="text" id="date" name="date" placeholder="mm/dd/yyyy" inputmode="numeric" maxlength="10" autocomplete="off" data-date-mask>
        </div>
        <div>
          <label for="name">Your name</label>
          <input type="text" id="name" name="name" placeholder="First &amp; last" autocomplete="name" required>
        </div>
        <div>
          <label for="email">Email address</label>
          <input type="email" id="email" name="email" placeholder="your@email.com" autocomplete="email" required>
        </div>
      </div>
      <div class="form-advance field-full">
        <button type="button" class="btn-primary" data-form-advance>Check my date &rarr;</button>
        <p class="form-step-hint">Then: aesthetic · budget · the details</p>
      </div>
      <div class="form-step-2">
        <button type="button" class="form-back field-full" data-form-back>&larr; Back</button>
        <div class="field-full">
          <label for="aesthetic">Aesthetic direction</label>
          <select id="aesthetic" name="aesthetic">
            <option value="" disabled selected>Which direction resonates?</option>
            <option>Lush &amp; Romantic, rich, dramatic, deep tones</option>
            <option>Elevated Minimalist, clean, airy, restrained</option>
            <option>Wildflower Modern, wild, seasonal, editorial</option>
            <option>A mix, I'll explain below</option>
            <option>Not sure yet</option>
          </select>
        </div>
        <div class="field-full">
          <label for="budget">Approximate budget</label>
          <select id="budget" name="budget">
            <option value="" disabled selected>Estimated florals budget</option>
            <option>$5,000–$8,000</option>
            <option>$8,000–$12,000</option>
            <option>$12,000–$18,000</option>
            <option>$18,000–$25,000</option>
            <option>$25,000+</option>
            <option>Not sure yet</option>
          </select>
        </div>
        <div class="field-full">
          <label for="message">Tell us about your wedding</label>
          <textarea id="message" name="message" placeholder="Your venue, your vision, anything that matters to you." rows="4"></textarea>
        </div>
        <div class="form-submit field-full">
          <button type="submit" class="btn-primary">Send consultation request</button>
          <p class="form-note">We'll respond within 48 hours · Consultations are complimentary</p>
        </div>
      </div>
    </form>
    <div id="consultation-success" class="form-success" data-form-success hidden>
      <div class="form-success-tags" data-success-tags></div>
      <div class="form-success-check" aria-hidden="true">&#10003;</div>
      <h3>Thank you for reaching out.</h3>
      <p data-success-date-line hidden>We've got your details for <strong data-success-date></strong>. We'll email you within <strong>48 hours</strong> to confirm availability.</p>
      <p data-success-default>We'll email you within <strong>48 hours</strong> to confirm availability.</p>
      <div class="form-success-book">
        <p class="form-success-book-prompt">Prefer to skip the wait? Grab 30 minutes with Brittany, by phone or video.</p>
        <a href="https://calendar.app.google/iKY1Xqerqtcv6fdj7" target="_blank" rel="noopener" class="btn-primary">Book a call with Brittany &rarr;</a>
      </div>
      <div class="form-success-next">
        <span class="lab">While you wait</span>
        <a href="{{ site.baseurl }}/portfolio">Explore the portfolio &rarr;</a>
        <a href="{{ site.baseurl }}/sustainability">Read our sustainability pledge &rarr;</a>
        <a href="{{ site.baseurl }}/about">Meet Brittany &rarr;</a>
      </div>
    </div>
  </div>
</section>

<script>
/* Consultation form: two-step reveal + mm/dd/yyyy mask + in-place AJAX success.
   Ported from the legacy default layout so this page is self-contained. */
(function(){
  // ---- two-step reveal ----
  document.querySelectorAll('form[data-multistep]').forEach(function(form){
    var step1=form.querySelector('.form-step-1'), step2=form.querySelector('.form-step-2');
    var advance=form.querySelector('.form-advance'), advanceBtn=form.querySelector('[data-form-advance]');
    var indicator=form.querySelector('.form-step-indicator'), backBtn=form.querySelector('[data-form-back]');
    if(!step2||!advanceBtn) return;
    step2.hidden=true;
    advanceBtn.addEventListener('click', function(){
      var reqs=form.querySelectorAll('.form-step-1 [required]');
      for(var i=0;i<reqs.length;i++){ if(!reqs[i].reportValidity()) return; }
      if(!form.dataset.partialSent && form.hasAttribute('data-ajax')){
        form.dataset.partialSent='1';
        try{
          var p=new FormData();
          ['date','name','email'].forEach(function(n){ var f=form.querySelector('[name="'+n+'"]'); if(f) p.append(n,f.value); });
          p.append('_subject','Date check started (Step 1): Golden Flowers');
          fetch(form.action,{method:'POST',body:p,headers:{'Accept':'application/json'}});
        }catch(e){}
      }
      if(step1) step1.hidden=true;
      if(advance) advance.hidden=true;
      step2.hidden=false;
      if(indicator) indicator.textContent='Step 2 of 2';
    });
    if(backBtn) backBtn.addEventListener('click', function(){
      step2.hidden=true; if(step1) step1.hidden=false; if(advance) advance.hidden=false;
      if(indicator) indicator.textContent='Step 1 of 2';
    });
  });

  // ---- wedding-date mask ----
  function mask(value, advance){
    var d=value.replace(/\D/g,'').slice(0,8); if(!d) return '';
    var out='',i=0,a=d[0];
    if(a>='2'){ out='0'+a; i=1; }
    else if(a==='1'){ if(d.length<2) return '1'; if(d[1]<='2'){ out='1'+d[1]; i=2; } else { out='01'; i=1; } }
    else { if(d.length<2) return '0'; if(d[1]==='0') return '0'; out='0'+d[1]; i=2; }
    if(i>=d.length) return advance?out+'/':out;
    out+='/'; var b=d[i];
    if(b>='4'){ out+='0'+b; i+=1; }
    else if(b==='3'){ if(i+1>=d.length) return out+'3'; if(d[i+1]<='1'){ out+='3'+d[i+1]; i+=2; } else { out+='03'; i+=1; } }
    else if(b==='0'){ if(i+1>=d.length) return out+'0'; if(d[i+1]==='0') return out+'0'; out+='0'+d[i+1]; i+=2; }
    else { if(i+1>=d.length) return out+b; out+=b+d[i+1]; i+=2; }
    if(i>=d.length) return advance?out+'/':out;
    return out+'/'+d.slice(i,i+4);
  }
  document.querySelectorAll('[data-date-mask]').forEach(function(el){
    var field=document.createElement('span'); field.className='date-field';
    el.parentNode.insertBefore(field, el); field.appendChild(el);
    var ghost=document.createElement('span'); ghost.className='date-ghost'; ghost.setAttribute('aria-hidden','true');
    var gt=document.createElement('span'); gt.className='gt'; var rest=document.createTextNode('');
    ghost.appendChild(gt); ghost.appendChild(rest); field.appendChild(ghost);
    el.removeAttribute('placeholder');
    function render(){ gt.textContent=el.value; rest.nodeValue='mm/dd/yyyy'.slice(el.value.length); }
    el.addEventListener('input', function(e){
      var deleting=e.inputType && e.inputType.indexOf('delete')===0;
      el.value=mask(el.value, !deleting); render();
    });
    render();
  });

  // ---- AJAX submit -> in-place success ----
  function fmtDate(v){
    if(!v) return ''; var m=v.match(/^(\d{2})\/(\d{2})\/(\d{4})$/);
    if(m){ var d=new Date(+m[3],+m[1]-1,+m[2]); if(!isNaN(d)) return d.toLocaleDateString('en-US',{month:'long',day:'numeric',year:'numeric'}); }
    return v;
  }
  function showSuccess(form, data){
    var wrap=form.closest('[data-form-wrap]')||form.parentNode;
    var success=wrap.querySelector('[data-form-success]');
    if(!success){ var n=form.querySelector('[name="_next"]'); window.location=n?n.value:'/'; return; }
    var dateVal=data.get('date');
    var dateLine=success.querySelector('[data-success-date-line]'), dateEl=success.querySelector('[data-success-date]'), dflt=success.querySelector('[data-success-default]');
    if(dateVal&&dateEl&&dateLine){ dateEl.textContent=fmtDate(dateVal); dateLine.hidden=false; if(dflt) dflt.hidden=true; }
    var tagWrap=success.querySelector('[data-success-tags]');
    if(tagWrap){
      tagWrap.innerHTML=''; var chips=[]; if(dateVal) chips.push(fmtDate(dateVal));
      ['aesthetic','budget'].forEach(function(name){ var v=data.get(name); if(!v||/not sure/i.test(v)) return; if(name==='aesthetic') v=v.split(',')[0]; chips.push(v); });
      chips.forEach(function(t){ var s=document.createElement('span'); s.className='stag'; s.textContent=t; tagWrap.appendChild(s); });
    }
    form.hidden=true;
    Array.prototype.forEach.call(wrap.children, function(el){ if(el!==success) el.classList.add('is-gone'); });
    success.hidden=false; success.setAttribute('tabindex','-1');
    success.scrollIntoView({behavior:'smooth',block:'center'}); success.focus();
  }
  document.querySelectorAll('form[data-ajax]').forEach(function(form){
    form.addEventListener('submit', function(e){
      e.preventDefault();
      var btn=form.querySelector('[type="submit"]'); if(btn){ btn.disabled=true; btn.textContent='Sending…'; }
      var data=new FormData(form);
      fetch(form.action,{method:'POST',body:data,headers:{'Accept':'application/json'}}).catch(function(){}).then(function(){ showSuccess(form,data); });
    });
  });

  // ---- direct landing on success hash ----
  if(window.location.hash==='#consultation-success'){
    var f=document.getElementById('consultation-form'), s=document.getElementById('consultation-success');
    if(f) f.hidden=true; if(s) s.hidden=false;
  }
})();
</script>
