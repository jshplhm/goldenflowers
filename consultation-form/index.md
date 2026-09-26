---
layout: redesign
title: "Schedule a Consultation"
seo_title: "Schedule a Wedding Floral Consultation | Golden Flowers"
permalink: /consultation-form
description: "Check your date with Golden Flowers, a Lake Tahoe wedding florist. Tell us your date and venue and we'll be in touch."
canonical_url: https://goldenflorals.com/consultation-form
redirect_from:
  - /contact
# This page is kept, not promoted. Nothing links to it (every .btn/.pill/.m-cta
# is a real link here that JS upgrades into the lightbox), so it is the no-JS
# fallback plus the landing spot for /contact, old bookmarks and ads. noindex +
# sitemap:false keep it out of search without breaking any of that.
#
# No auto_consult since 2026-09-25. The page used to raise the lightbox over
# itself on arrival, because the page's own form sat under two columns of
# prose. The form is now the first thing on the page, so the lightbox would
# be the same form twice. Josh called the old page "trash".
noindex: true
sitemap: false
---

<style>
/* ONE COLUMN (2026-09-25, after the gallery-mat mockup's contact page that
   Josh liked). Heading, form, then the two things people also look for here,
   all on one 560px rail so the page reads top to bottom as one object. The
   form used to sit under two columns of prose and a hairline, ~1000px down. */
.contact-rail{max-width:calc(560px + 2 * var(--pad));margin:0 auto;padding-left:var(--pad);padding-right:var(--pad);}
.contact-hero{padding-top:var(--hero-top);}
.contact-hero h1{font-family:var(--d);font-weight:430;font-optical-sizing:auto;font-size:var(--t-d2);line-height:1.04;letter-spacing:-.02em;margin:16px 0 14px;}
.contact-hero h1 em{color:var(--forest);}
.contact-hero .th-sub{font-size:var(--t-lede);color:var(--fg2);line-height:1.55;}
.contact-rail.form-section{max-width:calc(560px + 2 * var(--pad));padding-top:clamp(36px,4vw,48px);padding-bottom:0;}
/* The form's own heading says the step ("Is your date open?"); on this page
   the h1 above already asks for the date, so the bar alone carries the step. */
.contact-rail .form-heading{font-size:var(--t-d4);margin-top:22px;}
.contact-after{display:grid;grid-template-columns:1fr 1fr;gap:32px 40px;margin-top:clamp(56px,6vw,80px);padding-top:clamp(32px,4vw,44px);padding-bottom:var(--sp-m);border-top:1px solid var(--line);}
.contact-after .lab{display:block;margin-bottom:16px;}
.contact-after .contact-links p{font-size:var(--t-sm);margin-bottom:8px;}
.contact-after .contact-links .where{color:var(--fg2);margin-top:16px;}
.contact-after .contact-links .note{font-size:var(--t-ui);color:var(--mute);line-height:1.5;}
.contact-after .next-steps{margin:0;}
.contact-after .next-steps li{padding-left:26px;margin-bottom:12px;font-size:var(--t-sm);}
.contact-after .next-steps .n{font-family:var(--b);font-size:var(--t-ui);font-weight:500;top:1px;}
.contact-after .next-steps strong{display:inline;margin:0;}
@media(max-width:620px){.contact-after{grid-template-columns:1fr;}}
/* Once sent, the thank-you carries its own "What happens next"; one is enough. */
#consultation:has(#consultation-success:not([hidden])) + .contact-rail .contact-after > div:last-child{display:none;}
</style>

<header class="contact-rail contact-hero">
  <span class="lab"><span data-ed="consultation:hero.label">{{ site.data.consultation.hero.label }}</span></span>
  <h1>{% include em.html t=site.data.consultation.hero.heading k="consultation:hero.heading" %}</h1>
  <p class="th-sub"><span data-ed="consultation:hero.subheading">{{ site.data.consultation.hero.subheading }}</span></p>
</header>

<!-- FORM -->
<section class="form-section contact-rail" id="consultation">
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
          <select id="budget" name="budget" required data-chips>
            <option value="" disabled selected>Estimated florals budget</option>
            {%- comment -%} These must match the modal in _includes/consult-modal.html
            EXACTLY, en dashes included, and both must match the BUDGETS whitelist in
            _scripts/consultation-form-doPost.gs. This page had drifted: it was still
            offering $8,000-$15,000 / $15,000-$25,000 / $25,000+, brackets the modal
            retired on 2026-08-28, so the same form collected two different scales
            depending on whether a visitor had JS. {%- endcomment -%}
            <option>$5,000&ndash;$8,000</option>
            <option>$8,000&ndash;$12,000</option>
            <option>$12,000&ndash;$20,000</option>
            <option>$20,000+</option>
            <option>Not sure yet</option>
          </select>
        </div>
        <div class="field-full">
          <label for="message">Anything else? <span class="opt">(optional)</span></label>
          <textarea id="message" name="message" placeholder="Must-have flowers, inspiration..." rows="4"></textarea>
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
          <li><span class="n">2</span><strong>You hear from us</strong><span class="success-step-body" data-success-note>Brittany replies personally.</span></li>
          <li><span class="n">3</span><strong>We design together</strong><span class="success-step-body" data-success-step-plan>If your date&#39;s open, we&#39;ll book a call to plan your florals.</span></li>
        </ol>
      </div>
    </div>
  </div>
</section>

<!-- UNDER THE FORM: the other ways in, and what happens after you send it.
     Labels only, no headings: they are answers to side questions, not
     sections competing with the form above them. -->
<section class="contact-rail">
  <div class="contact-after">
    <div class="contact-links">
      <span class="lab"><span data-ed="consultation:reach.label">{{ site.data.consultation.reach.label }}</span></span>
      <p><a href="tel:5305577689">(530) 557-7689</a></p>
      <p><a href="mailto:brittany@goldenflorals.com">brittany@goldenflorals.com</a></p>
      <p><a href="https://www.instagram.com/goldenflowersfloraldesign/" target="_blank" rel="noopener">Instagram</a></p>
      <p class="where"><span data-ed="consultation:reach.location">{{ site.data.consultation.reach.location }}</span></p>
      <p class="note"><span data-ed="consultation:reach.note">{{ site.data.consultation.reach.note }}</span></p>
    </div>
    <div>
      <span class="lab"><span data-ed="consultation:next_steps.label">{{ site.data.consultation.next_steps.label }}</span></span>
      <ol class="next-steps">
        {%- for step in site.data.consultation.next_steps.steps %}
        <li><span class="n">{{ forloop.index }}</span><strong><span data-ed="consultation:next_steps.steps.{{ forloop.index0 }}.title">{{ step.title }}</span></strong> <span data-ed="consultation:next_steps.steps.{{ forloop.index0 }}.body">{{ step.body }}</span></li>
        {%- endfor %}
      </ol>
    </div>
  </div>
</section>
