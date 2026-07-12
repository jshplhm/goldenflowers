---
layout: redesign
title: "Schedule a Consultation"
seo_title: "Schedule a Wedding Floral Consultation | Golden Flowers"
permalink: /consultation-form
description: "Check your date with Golden Flowers, a Lake Tahoe wedding florist. Tell us your date and venue and we'll reply, usually within 48 hours."
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
    <form action="{{ site.consult_endpoint }}" method="POST" id="consultation-form" data-multistep data-ajax>
      <button type="button" class="form-back" data-form-back hidden>&larr; Back</button>
      <div class="form-progress" aria-hidden="true"><span class="on"></span><span data-progress-step2></span></div>
      <h2 class="form-heading" data-form-heading>Is your date open?</h2>
      <div class="hp-wrap" aria-hidden="true">
        <label for="hp">Company</label>
        <input type="text" id="hp" name="gf_hp" tabindex="-1" autocomplete="off">
      </div>
      <div class="form-step-1">
        <div class="field-full">
          <label for="date">Wedding date</label>
          <input type="text" id="date" name="date" placeholder="mm/dd/yyyy" inputmode="numeric" maxlength="10" autocomplete="off" data-date-mask required>
        </div>
        <div class="field-full">
          <label for="name">Your name</label>
          <input type="text" id="name" name="name" placeholder="One name or both" autocomplete="name" required>
        </div>
        <!-- Contact chooser, check all that apply: each checked channel
             reveals its field (CSS :has() covers no-JS; JS enables/disables
             the inputs so unchosen ones neither validate nor submit). -->
        <fieldset class="field-full reach-fieldset">
          <legend>How should we reach you?</legend>
          <div class="reach-seg">
            <label><input type="checkbox" name="contact_method" value="Email">Email</label>
            <label><input type="checkbox" name="contact_method" value="Text">Text</label>
          </div>
          <div class="reach-reveal" data-reach-email>
            <div class="reach-inner">
              <label for="email">Email address</label>
              <input type="email" id="email" name="email" placeholder="your@email.com" autocomplete="email">
            </div>
          </div>
          <div class="reach-reveal" data-reach-phone>
            <div class="reach-inner">
              <label for="phone">Phone number</label>
              <input type="tel" id="phone" name="phone" placeholder="775-555-0123" autocomplete="tel" inputmode="tel" data-phone-mask>
            </div>
          </div>
          <p class="reach-note" data-reach-note>Wedding only. No marketing, ever.</p>
        </fieldset>
      </div>
      <div class="form-advance field-full">
        <button type="button" class="btn-primary" data-form-advance>Continue &rarr;</button>
      </div>
      <div class="form-step-2">
        <div class="field-full venue-combo" data-venue-combo data-venues="{{ site.data.consult_venues.names | jsonify | escape }}">
          <label for="venue">Venue <span class="opt">(optional)</span></label>
          <input type="text" id="venue" name="venue" placeholder="Type your venue" autocomplete="off" role="combobox" aria-expanded="false" aria-autocomplete="list">
          <div class="venue-suggest" role="listbox" hidden></div>
        </div>
        <div class="field-full">
          <label for="aesthetic">Aesthetic direction</label>
          <select id="aesthetic" name="aesthetic" required>
            <option value="" disabled selected>Which direction resonates?</option>
            <option>Lush &amp; Romantic &mdash; rich, dramatic, deep tones</option>
            <option>Elevated Minimalist &mdash; clean, airy, restrained</option>
            <option>Wildflower Modern &mdash; wild, seasonal, editorial</option>
            <option>A mix or something else &mdash; I'll explain below</option>
            <option>Not sure yet</option>
          </select>
        </div>
        <div class="field-full">
          <label for="budget">Approximate budget</label>
          <select id="budget" name="budget" required>
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
          <label for="message">Anything else? <span class="opt">(optional)</span></label>
          <textarea id="message" name="message" placeholder="Guest count, must-have flowers, inspiration..." rows="4"></textarea>
        </div>
        <div class="form-submit field-full">
          <button type="submit" class="btn-primary">Check my date &rarr;</button>
        </div>
      </div>
    </form>
    <div id="consultation-success" class="form-success" data-form-success hidden>
      <div class="form-success-check" aria-hidden="true">&#10003;</div>
      <h3>Thank you<span data-success-name></span>.</h3>
      <p class="form-success-lede">Your consultation request<span data-success-date-line hidden> for <strong data-success-date></strong></span> is in. Checking our calendar now.</p>
      <hr class="form-success-rule">
      <div class="form-success-steps">
        <span class="form-head-label">What happens next</span>
        <ol class="success-steps">
          <li><span class="n">1</span><strong>We check your date</strong><span class="success-step-body">Confirming availability<span data-success-step-date> for your date</span>.</span></li>
          <li><span class="n">2</span><strong>You hear from us</strong><span class="success-step-body" data-success-note>A personal note from Brittany, within 48 hours.</span></li>
          <li><span class="n">3</span><strong>We design together</strong><span class="success-step-body">If your date's open, we'll book a call to plan your florals.</span></li>
        </ol>
      </div>
    </div>
  </div>
</section>
