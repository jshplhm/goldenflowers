---
layout: default
v3: true
title: "Schedule a Consultation"
seo_title: "Schedule a Wedding Floral Consultation | Golden Flowers"
permalink: /consultation-form
description: "Schedule a free consultation with Golden Flowers, a Lake Tahoe wedding florist. We respond within 48 hours."
canonical_url: https://goldenflorals.com/consultation-form
---

<section class="section cta">
  <div class="container">
    <span class="eyebrow">Check your date</span>
    <h2 class="section-title">Let's start the<br>conversation.</h2>
    <p class="lead" style="margin:0 auto;">Tell us your date, venue, and vision. We reply within 48 hours to confirm availability, consultations are complimentary, by phone or video.</p>
  </div>
</section>

<section class="section" style="padding-top:0;">
  <div class="form-wrap" data-form-wrap>
    <form action="https://formspree.io/f/xgobrjyo" method="POST" id="consultation-form" data-multistep data-ajax>
      <input type="hidden" name="_subject" value="New consultation request, Golden Flowers">
      <input type="hidden" name="_next" value="{{ site.baseurl }}/consultation-form#consultation-success">
      <input type="text" name="_gotcha" tabindex="-1" autocomplete="off" aria-hidden="true" style="position:absolute;left:-9999px;width:1px;height:1px;opacity:0;">
      <span class="form-step-indicator" aria-hidden="true">Step 1 of 2</span>
      <div class="form-step-1">
        <div class="field-full">
          <label for="date">Wedding date</label>
          <input type="date" id="date" name="date">
        </div>
        <div class="field-full">
          <label for="name">Your name</label>
          <input type="text" id="name" name="name" placeholder="First &amp; last" autocomplete="name" required>
        </div>
        <div class="field-full">
          <label for="email">Email address</label>
          <input type="email" id="email" name="email" placeholder="your@email.com" autocomplete="email" required>
        </div>
      </div>
      <div class="form-advance field-full">
        <button type="button" class="btn btn--primary" data-form-advance>Check my date →</button>
        <p class="form-step-hint">Then: aesthetic · budget · the details</p>
      </div>
      <div class="form-step-2">
        <button type="button" class="form-back field-full" data-form-back>← Back</button>
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
        <div class="form-submit">
          <button type="submit" class="btn btn--primary">Send consultation request</button>
          <p class="form-note">We'll respond within 48 hours · complimentary</p>
        </div>
      </div>
    </form>
    <div id="consultation-success" class="form-success" data-form-success hidden>
      <div class="form-success-tags" data-success-tags></div>
      <div class="form-success-check" aria-hidden="true">✓</div>
      <h3>Thank you for reaching out.</h3>
      <p data-success-date-line hidden>We've got your details for <strong data-success-date></strong>. We'll email you within <strong>48 hours</strong> to confirm availability.</p>
      <p data-success-default>We'll email you within <strong>48 hours</strong> to confirm availability.</p>
      <div class="form-success-book">
        <p class="form-success-book-prompt">Prefer to skip the wait? Grab 30 minutes with Brittany, by phone or video.</p>
        <a href="https://calendar.app.google/iKY1Xqerqtcv6fdj7" target="_blank" rel="noopener" class="btn btn--primary">Book a call with Brittany →</a>
      </div>
      <div class="form-success-next">
        <span class="eyebrow">While you wait</span>
        <a href="{{ site.baseurl }}/portfolio">Explore the portfolio →</a>
        <a href="{{ site.baseurl }}/sustainability">Read our sustainability pledge →</a>
        <a href="{{ site.baseurl }}/about">Meet Brittany →</a>
        <a href="{{ site.baseurl }}/" style="color:var(--muted);margin-top:8px;">← Back to home</a>
      </div>
    </div>
  </div>
</section>

<script>
// Two-step reveal + partial-lead capture + in-place AJAX success.
// Copied verbatim from the site's consultation form behavior (unchanged logic).
(function() {
  document.querySelectorAll('form[data-multistep]').forEach(function(form) {
    const step1 = form.querySelector('.form-step-1');
    const step2 = form.querySelector('.form-step-2');
    const advance = form.querySelector('.form-advance');
    const advanceBtn = form.querySelector('[data-form-advance]');
    const indicator = form.querySelector('.form-step-indicator');
    const backBtn = form.querySelector('[data-form-back]');
    if (!step2 || !advanceBtn) return;
    step2.hidden = true;
    function toTop() { const m = form.closest('.modal'); if (m) m.scrollTop = 0; }
    advanceBtn.addEventListener('click', function() {
      const reqs = form.querySelectorAll('.form-step-1 [required]');
      for (let i = 0; i < reqs.length; i++) {
        if (!reqs[i].reportValidity()) return;
      }
      if (!form.dataset.partialSent && form.hasAttribute('data-ajax')) {
        form.dataset.partialSent = '1';
        try {
          const p = new FormData();
          ['date', 'name', 'email'].forEach(function(n) {
            const fld = form.querySelector('[name="' + n + '"]');
            if (fld) p.append(n, fld.value);
          });
          p.append('_subject', 'Date check started (Step 1): Golden Flowers');
          fetch(form.action, { method: 'POST', body: p, headers: { 'Accept': 'application/json' } });
        } catch (e) {}
      }
      if (step1) step1.hidden = true;
      if (advance) advance.hidden = true;
      step2.hidden = false;
      if (indicator) indicator.textContent = 'Step 2 of 2';
      toTop();
    });
    if (backBtn) backBtn.addEventListener('click', function() {
      step2.hidden = true;
      if (step1) step1.hidden = false;
      if (advance) advance.hidden = false;
      if (indicator) indicator.textContent = 'Step 1 of 2';
      toTop();
    });
  });

  function fmtDate(v) {
    if (!v) return '';
    const d = new Date(v + 'T00:00');
    if (isNaN(d)) return v;
    return d.toLocaleDateString('en-US', { month: 'long', day: 'numeric', year: 'numeric' });
  }
  document.querySelectorAll('form[data-ajax]').forEach(function(form) {
    form.addEventListener('submit', function(e) {
      e.preventDefault();
      const btn = form.querySelector('[type="submit"]');
      if (btn) { btn.dataset.label = btn.textContent; btn.disabled = true; btn.textContent = 'Sending…'; }
      const data = new FormData(form);
      fetch(form.action, { method: 'POST', body: data, headers: { 'Accept': 'application/json' } })
        .then(function(r) {
          if (!r.ok) throw new Error('bad response');
          const wrap = form.closest('[data-form-wrap]') || form.parentNode;
          const success = wrap.querySelector('[data-form-success]');
          if (!success) { window.location = form.querySelector('[name="_next"]') ? form.querySelector('[name="_next"]').value : '/'; return; }
          const dateVal = data.get('date');
          const dateLine = success.querySelector('[data-success-date-line]');
          const dateEl = success.querySelector('[data-success-date]');
          const dflt = success.querySelector('[data-success-default]');
          if (dateVal && dateEl && dateLine) {
            dateEl.textContent = fmtDate(dateVal);
            dateLine.hidden = false;
            if (dflt) dflt.hidden = true;
          }
          const tagWrap = success.querySelector('[data-success-tags]');
          if (tagWrap) {
            tagWrap.innerHTML = '';
            const chips = [];
            if (dateVal) chips.push(fmtDate(dateVal));
            ['aesthetic', 'budget'].forEach(function(name) {
              let v = data.get(name);
              if (!v || /not sure/i.test(v)) return;
              if (name === 'aesthetic') v = v.split(',')[0];
              chips.push(v);
            });
            chips.forEach(function(t) {
              const s = document.createElement('span');
              s.className = 'stag';
              s.textContent = t;
              tagWrap.appendChild(s);
            });
          }
          form.hidden = true;
          Array.prototype.forEach.call(wrap.children, function(el) {
            if (el !== success && !el.classList.contains('modal-close')) el.classList.add('is-gone');
          });
          success.hidden = false;
          success.setAttribute('tabindex', '-1');
          success.scrollIntoView({ behavior: 'smooth', block: 'center' });
          success.focus();
        })
        .catch(function() {
          if (btn) { btn.disabled = false; btn.textContent = btn.dataset.label || 'Send'; }
          form.submit();
        });
    });
  });
})();

if (window.location.hash === '#consultation-success') {
  var f = document.getElementById('consultation-form');
  var s = document.getElementById('consultation-success');
  if (f) f.hidden = true;
  if (s) s.hidden = false;
}
</script>
