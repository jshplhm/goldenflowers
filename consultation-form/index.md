---
layout: redesign
title: "Schedule a Consultation"
seo_title: "Schedule a Wedding Floral Consultation | Golden Flowers"
permalink: /consultation-form
description: "Check your date with Golden Flowers, a Lake Tahoe wedding florist. Tell us your date and venue and we'll reply, usually within 48 hours."
canonical_url: https://goldenflorals.com/consultation-form
redirect_from:
  - /contact
# This page is kept, not promoted. Nothing links to it any more (the footer's
# "Contact us" is gone), but it stays alive because every .btn/.pill/.m-cta on
# the site is a real link here that JS upgrades into the lightbox, and because
# /contact still 301s in. So it is the fallback for anyone whose JS never ran,
# and the landing spot for old links, bookmarks and ads.
#
# auto_consult raises the lightbox for people who do arrive, so a stray link
# gives them the same form every button gives. noindex + sitemap:false take it
# out of search without breaking any of the above: noindex is not a block, so
# the URL keeps resolving, ads keep landing, and the 301 keeps working.
auto_consult: true
noindex: true
sitemap: false
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
      <div class="form-progress"><button type="button" class="form-back" data-form-back aria-label="Back" hidden>&larr;</button><span class="on"></span><span data-progress-step2></span></div>
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
          <label for="name">What is your name?</label>
          <input type="text" id="name" name="name" placeholder="Your name" autocomplete="name" required>
        </div>
        <!-- Who we're talking to changes how Brittany follows up, so it's a
             closed set the server can whitelist, not free text. Almost every
             visitor IS the couple, so we assume that and charge nobody the
             cost of saying so: ticking the box reveals the role select and the
             optional couple's-names field together. Kept identical to the
             lightbox in _includes/consult-modal.html — this page is a
             hand-maintained copy of that form, not an include of it, and the
             two silently drifting apart is how this block ended up a required
             dropdown here long after the lightbox stopped being one.

             Unticked, the hidden input submits "One of the couple"; ticked, JS
             disables it and the select submits one of the other three. Every
             value is in the ROLES whitelist in consultation-form-doPost.gs, so
             no redeploy is needed.

             Without JS (this page posts natively, unlike the lightbox) the
             select stays disabled and the reveal stays shut, so the box does
             nothing and role submits as "One of the couple". Deliberate: a
             disabled required control is skipped by native validation, whereas
             a visible-but-unfocusable required one blocks the submit entirely.
             Recording an optional field's default beats refusing the lead. -->
        <div class="field-full">
          <input type="hidden" name="role" value="One of the couple" data-role-default>
          <label class="not-couple"><input type="checkbox" data-not-couple> I'm filling this out for someone else</label>
          <div class="reach-reveal" data-couple-reveal>
            <div class="reach-inner">
              <!-- Word-buttons, not a select: three options is under the count
                   where a dropdown earns its collapse, and this is one tap
                   instead of tap-scroll-tap on a phone. Radios, since exactly
                   one can be true.

                   LABEL AND VALUE DIFFER ON PURPOSE. The Apps Script whitelists
                   the exact submitted string, and editing this file deploys
                   nothing, so a changed `value` is rejected as spam until the
                   script is redeployed. Reword the visible text freely. -->
              <!-- Names BEFORE role: the box they just ticked says they are
                   filling this out for someone else, so "for whom" is the
                   question that follows it. -->
              <label for="couple">Couple's names <span class="opt">(optional)</span></label>
              <input type="text" id="couple" name="couple" placeholder="Who's getting married?" autocomplete="off" disabled>
              <fieldset class="reach-fieldset stack-label">
                <legend>Your role</legend>
                <div class="reach-seg role-seg">
                  <label><input type="radio" name="role" value="The wedding planner" disabled required>The wedding planner</label>
                  <label><input type="radio" name="role" value="Family or a friend of the couple" disabled required>Family or a friend</label>
                  <label><input type="radio" name="role" value="Someone else" disabled required>Someone else</label>
                </div>
              </fieldset>
            </div>
          </div>
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
        <!-- Aesthetic direction dropped 2026-08-10 (owner). Server keeps its
             AESTHETICS whitelist and the sheet keeps its Aesthetic column so
             stale cached pages are accepted, not flagged as spam. -->
        <div class="field-full">
          <label for="budget">Approximate budget</label>
          <select id="budget" name="budget" required>
            <option value="" disabled selected>Estimated florals budget</option>
            <option>$5,000–$8,000</option>
            <option>$8,000–$15,000</option>
            <option>$15,000–$25,000</option>
            <option>$25,000+</option>
            <option>Not sure yet</option>
          </select>
        </div>
        <div class="field-full">
          <label for="message">Anything else? <span class="opt">(optional)</span></label>
          <textarea id="message" name="message" placeholder="Guest count, must-have flowers, inspiration..." rows="4"></textarea>
        </div>
        <div class="form-submit field-full">
          <button type="submit" class="btn-primary">Check my date</button>
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
          <li><span class="n">1</span><strong data-success-step-head>We check your date</strong><span class="success-step-body">Making sure<span data-success-step-date> your date is open</span>.</span></li>
          <li><span class="n">2</span><strong>You hear from us</strong><span class="success-step-body" data-success-note>Brittany replies within 48 hours.</span></li>
          <li><span class="n">3</span><strong>We design together</strong><span class="success-step-body" data-success-step-plan>If your date&#39;s open, we&#39;ll book a call to plan your florals.</span></li>
        </ol>
      </div>
    </div>
  </div>
</section>
