---
layout: default
title: "Schedule a Consultation"
seo_title: "Schedule a Wedding Floral Consultation | Golden Flowers"
permalink: /consultation-form
description: "Schedule a free consultation with Golden Flowers, a Lake Tahoe wedding florist. We respond within 48 hours."
canonical_url: https://goldenflorals.com/consultation-form
hide_consult_cta: true
no_prefooter: true
---

<section class="hero hero--interior">
  <div class="hero-media">
    <img src="https://images.squarespace-cdn.com/content/v1/67e81d7599b7ef0dec0ec81c/1779129104888-WQHCD92BY6WE4CQZH8QU/14.jpg?format=2500w" alt="Bride holding her bouquet at Lake Tahoe" loading="eager">
  </div>
  <div class="hero-copy">
    <span class="hero-eyebrow">Get started</span>
    <h1 class="hero-display">Let's start the conversation.</h1>
    <p class="hero-sub">Tell us about your date, venue, and vision. We'll follow up within 48 hours to confirm availability and schedule a call.</p>
  </div>
</section>

<section class="section" style="padding-top:72px;padding-bottom:16px;">
  <div class="container" style="max-width:1040px;">
    <div class="twoup" style="gap:72px;">
      <div>
        <span class="label">What happens next</span>
        <h2 class="section-head" style="font-size:clamp(2rem,3vw,2.8rem);margin-bottom:30px;">Three steps, no pressure.</h2>
        <ol style="list-style:none;margin:0;padding:0;">
          <li style="position:relative;padding-left:42px;margin-bottom:24px;line-height:1.5;color:var(--fg2);">
            <span style="position:absolute;left:0;top:-2px;font-family:var(--f-d);font-style:italic;font-size:1.5rem;color:var(--acc);">1</span>
            <strong style="color:var(--fg);display:block;margin-bottom:3px;">You send the form.</strong>
            Your date, venue, and a little about your vision &mdash; about two minutes.
          </li>
          <li style="position:relative;padding-left:42px;margin-bottom:24px;line-height:1.5;color:var(--fg2);">
            <span style="position:absolute;left:0;top:-2px;font-family:var(--f-d);font-style:italic;font-size:1.5rem;color:var(--acc);">2</span>
            <strong style="color:var(--fg);display:block;margin-bottom:3px;">We reply within 48 hours.</strong>
            We confirm we're open on your date &mdash; we take one wedding per day, so dates go quickly.
          </li>
          <li style="position:relative;padding-left:42px;line-height:1.5;color:var(--fg2);">
            <span style="position:absolute;left:0;top:-2px;font-family:var(--f-d);font-style:italic;font-size:1.5rem;color:var(--acc);">3</span>
            <strong style="color:var(--fg);display:block;margin-bottom:3px;">We talk it through.</strong>
            A complimentary call, then a custom proposal built around your season and venue.
          </li>
        </ol>
      </div>
      <div>
        <span class="label">Reach us directly</span>
        <h2 class="section-head" style="font-size:clamp(2rem,3vw,2.8rem);margin-bottom:30px;">Or just say hello.</h2>
        <p style="font-size:1.05rem;margin-bottom:12px;"><a href="tel:5305577689">(530) 557-7689</a></p>
        <p style="font-size:1.05rem;margin-bottom:12px;"><a href="mailto:brittany@goldenflorals.com">brittany@goldenflorals.com</a></p>
        <p style="font-size:1.05rem;margin-bottom:12px;"><a href="https://www.instagram.com/goldenflowersfloraldesign/" target="_blank" rel="noopener">@goldenflowersfloraldesign</a></p>
        <p style="font-size:1.05rem;color:var(--fg);margin-top:22px;">Incline Village, Lake Tahoe</p>
        <p style="font-size:.85rem;color:var(--fgm);margin-top:5px;line-height:1.5;">By appointment only &mdash; we don't host walk-ins. Serving Lake Tahoe, Truckee, Nevada City &amp; beyond.</p>
      </div>
    </div>
  </div>
</section>

<hr class="section-div">

<section class="form-section" id="consultation">
  <div class="container" style="max-width:1100px;" data-form-wrap>
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
        <div class="form-submit">
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
        <span class="label">While you wait</span>
        <a href="{{ site.baseurl }}/portfolio">Explore the portfolio &rarr;</a>
        <a href="{{ site.baseurl }}/sustainability">Read our sustainability pledge &rarr;</a>
        <a href="{{ site.baseurl }}/about">Meet Brittany &rarr;</a>
      </div>
    </div>
  </div>
</section>

<script>
if (window.location.hash === '#consultation-success') {
  const form = document.getElementById('consultation-form');
  const success = document.getElementById('consultation-success');
  if (form) form.style.display = 'none';
  if (success) success.style.display = 'block';
}
</script>
