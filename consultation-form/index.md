---
layout: default
title: "Schedule a Consultation"
seo_title: "Schedule a Wedding Floral Consultation | Golden Flowers"
permalink: /consultation-form
description: "Schedule a free consultation with Golden Flowers, Lake Tahoe's preferred wedding florist. We respond within 48 hours."
canonical_url: https://goldenflorals.com/consultation-form
---

<header class="page-header">
  <span class="label">Get started</span>
  <h1>Let's start the conversation.</h1>
  <p>Tell us about your date, venue, and vision. We'll follow up within 48 hours to confirm availability and schedule a call.</p>
</header>

<section class="form-section" id="consultation">
  <div class="container" style="max-width:1100px;">
    <form action="https://formspree.io/f/xgobrjyo" method="POST" id="consultation-form">
      <input type="hidden" name="_subject" value="New consultation request, Golden Flowers">
      <input type="hidden" name="_next" value="{{ site.baseurl }}/consultation-form#consultation-success">
      <div>
        <label for="name">Your name</label>
        <input type="text" id="name" name="name" placeholder="Full name" required>
      </div>
      <div>
        <label for="email">Email address</label>
        <input type="email" id="email" name="email" placeholder="your@email.com" required>
      </div>
      <div>
        <label for="date">Wedding date</label>
        <input type="date" id="date" name="date">
      </div>
      <div>
        <label for="venue">Venue</label>
        <select id="venue" name="venue">
          <option value="" disabled selected>Select venue or type below</option>
          <option>Edgewood Tahoe</option>
          <option>Palisades High Camp</option>
          <option>National Exchange Hotel, Nevada City</option>
          <option>Ritz-Carlton Lake Tahoe at Northstar</option>
          <option>Hyatt Regency Lake Tahoe</option>
          <option>Tahoe Mountain Club / The Timbers</option>
          <option>Hellman-Ehrman Mansion</option>
          <option>Miner's Foundry, Nevada City</option>
          <option>Private estate / other</option>
          <option>Not sure yet</option>
        </select>
      </div>
      <div>
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
      <div>
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
        <label for="message">Tell us about your wedding</label>
        <textarea id="message" name="message" placeholder="Venue setting, vision, anything that matters to you." rows="4"></textarea>
      </div>
      <div class="form-submit">
        <button type="submit" class="btn-primary">Send consultation request</button>
        <p class="form-note">We'll respond within 48 hours · Consultations are complimentary</p>
      </div>
    </form>
    <div id="consultation-success" style="display:none;margin-top:32px;padding:24px;border:1px solid oklch(34% .09 148 / .4);background:oklch(34% .09 148 / .06);">
      <p style="color:var(--acc);font-family:var(--f-d);font-style:italic;font-size:1.4rem;margin-bottom:8px;">Thank you, we'll be in touch soon.</p>
      <p style="font-size:.88rem;color:var(--fg2);">We'll follow up within 48 hours to confirm availability and schedule your consultation with Brittany.</p>
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
