---
layout: default
title: "Schedule a Consultation"
seo_title: "Schedule a Wedding Floral Consultation | Golden Flowers"
permalink: /consultation-form
description: "Schedule a free consultation with Golden Flowers, Lake Tahoe's preferred wedding florist. We respond within 48 hours."
canonical_url: https://goldenflorals.com/consultation-form
---

<section class="hero hero--interior">
  <div class="hero-media">
    <img src="https://images.squarespace-cdn.com/content/v1/67e81d7599b7ef0dec0ec81c/1779129104888-WQHCD92BY6WE4CQZH8QU/14.jpg" alt="Bride holding her bouquet at Lake Tahoe" loading="eager">
  </div>
  <div class="hero-copy">
    <span class="hero-eyebrow">Get started</span>
    <h1 class="hero-display">Let's start the conversation.</h1>
    <p class="hero-sub">Tell us about your date, venue, and vision. We'll follow up within 48 hours to confirm availability and schedule a call.</p>
  </div>
</section>

<section class="form-section" id="consultation">
  <div class="container" style="max-width:1100px;" data-form-wrap>
    <form action="https://formspree.io/f/xgobrjyo" method="POST" id="consultation-form" data-multistep data-ajax>
      <input type="hidden" name="_subject" value="New consultation request, Golden Flowers">
      <input type="hidden" name="_next" value="{{ site.baseurl }}/consultation-form#consultation-success">
      <span class="form-step-indicator" aria-hidden="true">Step 1 of 2</span>
      <div class="form-step-1">
        <div class="field-full">
          <label for="date">Wedding date</label>
          <input type="date" id="date" name="date">
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
        <p class="form-step-hint">Then — aesthetic · budget · the details</p>
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
      <p data-success-date-line hidden>We'll confirm availability for <strong data-success-date></strong> and reach out within <strong>48 hours</strong>.</p>
      <p data-success-default>We'll follow up within <strong>48 hours</strong> to confirm availability and schedule your consultation with Brittany.</p>
      <p>Complimentary consultation, by phone or video.</p>
      <div class="form-success-next">
        <span class="label">While you wait</span>
        <a href="{{ site.baseurl }}/portfolio">Explore the portfolio &rarr;</a>
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
