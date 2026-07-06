---
layout: redesign
title: "Schedule a Consultation"
seo_title: "Schedule a Wedding Floral Consultation | Golden Flowers"
permalink: /consultation-form
description: "Schedule a free consultation with Golden Flowers, a Lake Tahoe wedding florist. We respond within 48 hours."
canonical_url: https://goldenflorals.com/consultation-form
redirect_from:
  - /contact
---

<!-- TEXT HEADER (no hero image) -->
<header class="text-hero" style="padding-bottom:32px">
  <span class="lab"><span data-ed="consultation:hero.label">{{ site.data.consultation.hero.label }}</span></span>
  <h1>{% include em.html t=site.data.consultation.hero.heading k="consultation:hero.heading" %}</h1>
  <p class="th-sub"><span data-ed="consultation:hero.subheading">{{ site.data.consultation.hero.subheading }}</span></p>
</header>

<!-- INTRO -->
<section class="block tight">
  <div class="twoup">
    <div>
      <span class="lab"><span data-ed="consultation:next_steps.label">{{ site.data.consultation.next_steps.label }}</span></span>
      <h2 class="h-lg" style="margin-bottom:26px;"><span data-ed="consultation:next_steps.heading">{{ site.data.consultation.next_steps.heading }}</span></h2>
      <ol class="next-steps">
        {%- for step in site.data.consultation.next_steps.steps %}
        <li><span class="n">{{ forloop.index }}</span><strong><span data-ed="consultation:next_steps.steps.{{ forloop.index0 }}.title">{{ step.title }}</span></strong><span data-ed="consultation:next_steps.steps.{{ forloop.index0 }}.body">{{ step.body }}</span></li>
        {%- endfor %}
      </ol>
    </div>
    <div class="contact-links">
      <span class="lab"><span data-ed="consultation:reach.label">{{ site.data.consultation.reach.label }}</span></span>
      <h2 class="h-lg" style="margin-bottom:26px;"><span data-ed="consultation:reach.heading">{{ site.data.consultation.reach.heading }}</span></h2>
      <p><a href="tel:5305577689">(530) 557-7689</a></p>
      <p><a href="mailto:brittany@goldenflorals.com">brittany@goldenflorals.com</a></p>
      <p><a href="https://www.instagram.com/goldenflowersfloraldesign/" target="_blank" rel="noopener">@goldenflowersfloraldesign</a></p>
      <p style="color:var(--ink);margin-top:22px;"><span data-ed="consultation:reach.location">{{ site.data.consultation.reach.location }}</span></p>
      <p style="font-size:.85rem;color:var(--mute);margin-top:5px;line-height:1.5;"><span data-ed="consultation:reach.note">{{ site.data.consultation.reach.note }}</span></p>
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
            <option>Lush &amp; Romantic (rich, dramatic, deep tones)</option>
            <option>Elevated Minimalist (clean, airy, restrained)</option>
            <option>Wildflower Modern (wild, seasonal, editorial)</option>
            <option>A mix (I'll explain below)</option>
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
