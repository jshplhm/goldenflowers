/**
 * Golden Flowers consultation form — hardened intake, v3.6 (August 2026).
 *
 * What changed from v3.5 (v3.6):
 *   - BUDGETS realigned to the price ladder that came back to /weddings on
 *     2026-08-28: 5,000-8,000 (a la carte), 8,000-12,000 (full service starts
 *     at 8,000), 12,000-20,000 (typical), 20,000+.
 *   - PASTE AND REDEPLOY THIS BEFORE THE SITE CHANGE SHIPS. Two of those
 *     strings are new, and an unrecognised budget is a spam reason here, so
 *     until this is live every lead from the new form is filed as spam. The
 *     reverse order is safe: this deployment still accepts every retired
 *     bracket, so a visitor holding a cached page is never rejected.
 *   - $5,000-$8,000 came back off the retired list. It is a real bracket
 *     again, because the ladder publishes an a la carte figure again.
 *
 * What changed from v3.4 (v3.5):
 *   - New `estimate` param and Estimate column (auto-appended on first use):
 *     the planning tool's recap of what the couple picked, which the form now
 *     carries in its own read-only block instead of dumping into the message
 *     box. Message is their words, Estimate is the tool's arithmetic, and
 *     neither has to be untangled from the other any more.
 *   - Both emails show it under its own "From your estimate" heading.
 *   - DEPLOY THIS BEFORE the site change ships. An older deployment does not
 *     reject the new param (nothing unknown is ever a spam reason), it simply
 *     ignores it, so every estimate would land nowhere until this is pasted.
 *   - The alert for a text-only lead (no email address, so no confirmation
 *     went to them) is now the same branded card the couple gets, opening
 *     with the number to text. It was the odd plain-text message out, and
 *     looking different was itself the confusion: nothing on it said why,
 *     or that the first reply was ours to make. The number is plain text,
 *     not a button: Gmail strips sms: hrefs, so a button there can only
 *     ever look clickable.
 *   - Both emails are now built from one set of helpers (emailShell_,
 *     emailRows_, emailNote_, emailEstimate_) so they cannot drift apart
 *     again.
 *
 * What changed from v3.3 (v3.4):
 *   - A resubmitted lead that carries NEW details now emails us the diff
 *     ("Lead updated after confirmation"). Before, the second post updated
 *     the row in silence, so the sheet could hold a venue that the couple's
 *     confirmation (which we are BCC'd on) never showed. That is exactly what
 *     happened on 2026-08-13: complete post with an empty venue sent the
 *     confirmation, the retry after a failed-looking send added the venue to
 *     the row, and nothing said so.
 *   - When those details change, the couple also gets a corrected confirmation
 *     (same subject, so Gmail threads it under the first) instead of being left
 *     holding the stale one. Only the opening line differs. An identical
 *     replay changes nothing, so it still sends no second email to anyone.
 *
 * What changed from v3.2 (v3.3):
 *   - Page and Button columns are BACK (owner request): the page the couple
 *     was on and the CTA they clicked, from the cta_page/cta_button params
 *     the form has been sending all along. Sheet-only — deliberately still
 *     absent from the notification email (Brittany forwards those).
 *
 * What changed from v3.1 (v3.2):
 *   - The chooser is now check-all-that-apply, so contact_method can be
 *     "Email", "Text", or "Email, Text" (one comma-joined value). The rule
 *     validates each comma-separated token.
 *   - Digest/entry lines show email AND phone when a couple gave both.
 *   - Phones store as 775-555-0123 (matches the form's input mask).
 *
 * Paste this into the Apps Script project attached to the leads spreadsheet
 * (Extensions -> Apps Script from the sheet), replacing everything currently
 * there, then Deploy -> Manage deployments -> Edit (pencil) -> New version.
 * Using "New version" on the EXISTING deployment keeps the same /exec URL —
 * no need to touch _config.yml.
 *
 * After deploying, run setupTriggers() once from the editor (select it in
 * the function dropdown, click Run, authorize when asked). That installs the
 * daily-digest timer and removes the old 30-minute stale-partial trigger.
 *
 * The spreadsheet's three tabs, named exactly (case matters):
 *   leads          — completed submissions. Each new one emails immediately.
 *   partial leads  — step-1-only submissions. Daily digest of NEW partials
 *                    only; each is listed once, never re-nagged (watermark).
 *   spam           — rejected submissions. One digest email per day when
 *                    anything new landed, so false positives get reviewed.
 * The script creates any missing tab (with headers) on first use.
 *
 * What changed from v3 (v3.1):
 *   - Step 1 now asks "How should we reach you?" (Email or Text) and shows
 *     only the matching field. New params: contact_method ("Email"/"Text")
 *     and phone. New sheet columns (auto-appended on first use): Contact
 *     Method, Phone.
 *   - "Missing email" is now "no contact info": a submission needs at least
 *     one of email/phone. Email-specific checks run only when an email was
 *     given; phone gets its own character/length checks (mirrors the form's
 *     client-side rule — keep both in sync).
 *   - Flood control keys on email OR phone, whichever was given.
 *   - Digests and the complete-lead email show whichever contact exists and
 *     note when a couple asked to be texted.
 *   - Posts from the previous form (email always present, no contact_method)
 *     still pass every rule, so a stale cached page can't flag as spam.
 *
 * What changed from v2 (v3):
 *   - Three tabs instead of everything on one: partials live on their own
 *     tab and MOVE to Full leads when step 2 arrives (same row count, no
 *     duplicates, Submitted keeps the original step-1 time).
 *   - The 30-minute stale nudge is replaced by one partial-leads digest per
 *     day, formatted for scanning, wedding dates as mm/dd/yyyy (no times).
 *   - New: a daily spam digest whenever anything new hit the Spam tab.
 *   - Every email also BCCs jshplhm@gmail.com.
 *   - The complete-lead email puts the message inline on its "Message:" line.
 *   - LockService serializes concurrent posts (two posts landing together
 *     could both read the same getLastRow() and silently overwrite a lead).
 *   - A complete landing on an already-Complete row (browser retry/replay)
 *     updates the row without re-sending the email.
 *
 * Design goals, in priority order (unchanged):
 *   1. Never lose a real lead. Nothing is ever discarded: submissions that
 *      fail the checks land on the Spam tab with all their data, so even a
 *      false positive is recoverable, not gone.
 *   2. Bots learn nothing. Rejected posts get the same success response as
 *      real ones, so the bot believes it worked and doesn't adapt.
 *   3. Every rule only rejects input the real form cannot physically
 *      produce, so a human using the site can never trip it.
 */

var NOTIFY_EMAIL = 'brittany@goldenflorals.com';
var BCC_EMAIL = 'jshplhm@gmail.com';

var LEADS_SHEET = 'leads';
var PARTIALS_SHEET = 'partial leads';
var SPAM_SHEET = 'spam';

// Hour of day (script timezone) the daily digests go out.
var DIGEST_HOUR = 8;

// A partial younger than this at digest time is someone possibly still
// mid-form — hold it for tomorrow's digest rather than nudging too soon.
var PARTIAL_MIN_AGE_MINUTES = 30;

// Must match the value the JS sends. Posts without it are still accepted if
// otherwise clean (keeps the no-JS fallback working) — just tagged
// "(unverified)" in Status.
var FORM_TOKEN = 'gf-lupine-26';

// Exact strings the two dropdowns can produce. The em-dash forms are the
// current live wording (July 2026 form revision); the older parenthetical
// and comma phrasings stay so a stale cached page can't flag as spam.
var AESTHETICS = [
  "Lush & Romantic — rich, dramatic, deep tones",
  "Elevated Minimalist — clean, airy, restrained",
  "Wildflower Modern — wild, seasonal, editorial",
  "A mix or something else — I'll explain below",
  "A mix — I'll explain below",
  "Lush & Romantic (rich, dramatic, deep tones)",
  "Elevated Minimalist (clean, airy, restrained)",
  "Wildflower Modern (wild, seasonal, editorial)",
  "A mix (I'll explain below)",
  "Lush & Romantic, rich, dramatic, deep tones",
  "Elevated Minimalist, clean, airy, restrained",
  "Wildflower Modern, wild, seasonal, editorial",
  "A mix, I'll explain below",
  "Not sure yet"
];

// Who filled the form in. Added 2026-08-10. Empty is always accepted: a page
// cached before that date never sends the field, and a stale cache must never
// be the reason a real lead lands in spam.
var ROLES = [
  "One of the couple",
  "The wedding planner",
  "Family or a friend of the couple",
  "Someone else"
];
// The default, and the only role worth NOT repeating back: telling a bride she
// is one of the couple is noise. Every other answer changes who we are writing
// to, so it travels with the lead. Must stay identical to ROLES[0] and to the
// hidden input's value in _includes/consult-modal.html.
var ROLE_DEFAULT = ROLES[0];

// The live brackets are the boundaries of the published ladder on /weddings:
// $5,000 a la carte, $8,000 full service, $12,000-$20,000 typical, $20,000 up.
// Change them there and here in the same breath, and deploy this first.
//
// Every retired string is still accepted on purpose: a visitor with an older
// page cached will post one, and rejecting a real lead as spam is far worse
// than accepting a stale label. Drop a retired line once the sheet has stopped
// seeing it (a season is plenty). Note $5,000-$8,000 is off that list again:
// it is a live bracket for the second time.
var BUDGETS = [
  "$5,000–$8,000",
  "$8,000–$12,000",
  "$12,000–$20,000",
  "$20,000+",
  "Not sure yet",
  "$7,500–$12,000",   // RETIRED 2026-08-28
  "$20,000–$30,000",  // RETIRED 2026-08-28
  "$30,000+",         // RETIRED 2026-08-28
  "$8,000–$15,000",   // RETIRED
  "$15,000–$25,000",  // RETIRED
  "$25,000+"          // RETIRED
];

var PLACEHOLDER_DOMAINS = [
  'example.com', 'example.org', 'example.net', 'test.com', 'email.com',
  'mailinator.com', 'yopmail.com', 'guerrillamail.com', 'tempmail.com',
  'trashmail.com', '10minutemail.com', 'fakeinbox.com', 'sharklasers.com',
  'dispostable.com', 'maildrop.cc'
];

// Column order kept stable for anything already in the sheet; new columns
// are appended, never inserted, so existing rows/headers never shift.
// Every read/write is by header NAME, not column letter — columns can be
// dragged into any order afterward without touching this script.
// Deliberately ABSENT (deleting them from the sheet is permanent — the
// script will not re-create them): Landing Page, Referrer, Notified.
// The raw referrer the form sends is ignored; arrival source survives as
// the Source column.
// 'Aesthetic' stays even though the form stopped asking (2026-08-10): the
// column holds real history, and stale cached pages still submit the field.
// 'Role' and 'Couple' are appended last, per the never-insert rule above.
// 'Estimate' (2026-08-16) is the planning-tool recap, machine-written by
// _includes/estimator.html and carried in its own read-only block on the
// form. It has its own column because it is not their words: Message is what
// the couple typed, Estimate is what the tool worked out, and mixing the two
// (which is what the form did until now) made both harder to read.
var HEADERS = [
  'Submitted', 'Status', 'Name', 'Email', 'Wedding Date', 'Aesthetic',
  'Budget', 'Message', 'Venue', 'Source', 'Updated', 'Lead ID',
  'Contact Method', 'Phone', 'Page', 'Button', 'Role', 'Couple', 'Estimate'
];

function doPost(e) {
  var p = (e && e.parameter) || {};
  var ss = SpreadsheetApp.getActive();

  // Serialize the whole read-find-write sequence. Without this, two posts
  // landing together (the step-1 partial racing the complete, or two bots)
  // can both read the same getLastRow() and one row silently overwrites the
  // other — a lost lead, which is the one thing this script must never do.
  var lock = LockService.getScriptLock();
  try {
    lock.waitLock(20000);
  } catch (err) {
    // Couldn't get the lock in 20s (stuck execution). Proceed anyway:
    // a tiny overwrite risk beats definitely dropping the submission.
  }
  try {
    return handlePost_(p, ss);
  } finally {
    try { lock.releaseLock(); } catch (err) {}
  }
}

function handlePost_(p, ss) {
  var isPartial = String(p.status || '') === 'partial';
  var reasons = spamReasons_(p);
  var now = new Date();

  if (reasons.length) {
    writeToSpam_(ss, p, isPartial, reasons, now);
    return success_();
  }

  var leads = sheet_(ss, LEADS_SHEET);
  var partials = sheet_(ss, PARTIALS_SHEET);
  var leadsCols = colMap_(ensureHeaders_(leads));
  var partialCols = colMap_(ensureHeaders_(partials));

  var leadId = String(p.lead_id || '').trim();
  var rowInLeads = leadId ? findRowByLeadId_(leads, leadsCols, leadId) : 0;

  if (isPartial) {
    if (rowInLeads) {
      // A step-1 ping that arrived late (after step 2 already landed, e.g. a
      // network race from a fast double-tap) must never downgrade a
      // completed lead or blank out its details.
      return success_();
    }
    var rowInPartials = leadId ? findRowByLeadId_(partials, partialCols, leadId) : 0;
    if (rowInPartials) {
      writeRow_(partials, rowInPartials, partialCols,
        buildRowValues_(p, true, partials.getRange(rowInPartials, partialCols['Submitted']).getValue() || now, now, leadId));
    } else {
      writeRow_(partials, partials.getLastRow() + 1, partialCols,
        buildRowValues_(p, true, now, now, leadId || genLeadIdFallback_()));
    }
    return success_();
  }

  // Complete submission.
  if (rowInLeads) {
    // Usually a retry/replay of an already-complete lead (the browser
    // resends after a false network error): update the row, but one email
    // per lead — re-emailing every retry would spam the inbox. The status
    // check keeps the email for the edge case of an old "Step 1 only" row
    // that predates the three-tab split and still lives on the lead tab.
    var wasComplete = /^Complete/.test(String(leads.getRange(rowInLeads, leadsCols['Status']).getValue() || ''));
    // Snapshot BEFORE the write. A resend is usually identical, but it can
    // carry details the first post didn't have: the send-failed path leaves
    // the filled form on screen under "Try again", so anything typed before
    // that second tap lands in the sheet AFTER the couple's confirmation has
    // already gone out. Silently absorbing that is how a venue ended up in a
    // row but not in the email Brittany was BCC'd on (2026-08-13).
    var before = wasComplete ? rowSnapshot_(leads, rowInLeads, leadsCols) : null;
    var values = buildRowValues_(p, false, leads.getRange(rowInLeads, leadsCols['Submitted']).getValue() || now, now, leadId);
    writeRow_(leads, rowInLeads, leadsCols, values);
    if (!wasComplete) {
      notifyComplete_(p);
    } else {
      var changes = changedFields_(before, values);
      if (changes.length) {
        // Their first confirmation is now out of date, so replace it rather
        // than leaving them holding the wrong details. Same subject line, so
        // Gmail threads it under the original instead of looking like a
        // duplicate. Identical replays never reach here, so a couple only
        // gets a second email when something they sent actually changed.
        // The alert to us must survive a failed send to them: if Gmail
        // refuses (quota, a bounced address), that is exactly when Brittany
        // most needs to know the couple is holding stale details.
        var coupleState = 'none';
        if (String(p.email || '').trim()) {
          try { sendAutoReply_(p, true); coupleState = 'sent'; }
          catch (err) { coupleState = 'failed'; }
        }
        notifyLeadUpdated_(p, changes, coupleState);
      }
    }
    return success_();
  }

  // Normal completion: pull the step-1 row off the Partial leads tab (keeping
  // its original Submitted time as first contact) and land on Full leads.
  var submittedAt = now;
  var partialRow = leadId ? findRowByLeadId_(partials, partialCols, leadId) : 0;
  if (partialRow) {
    submittedAt = partials.getRange(partialRow, partialCols['Submitted']).getValue() || now;
    partials.deleteRow(partialRow);
  }
  writeRow_(leads, leads.getLastRow() + 1, leadsCols,
    buildRowValues_(p, false, submittedAt, now, leadId || genLeadIdFallback_()));
  notifyComplete_(p);

  return success_();
}

function success_() {
  return ContentService.createTextOutput(JSON.stringify({ result: 'success' }))
    .setMimeType(ContentService.MimeType.JSON);
}

function sheet_(ss, name) {
  return ss.getSheetByName(name) || ss.insertSheet(name);
}

/* Every internal notification. html is optional: the digests are plain lists
   and stay plain, the new-lead alert carries the branded card and keeps body
   as its text/plain part. */
function sendMail_(subject, body, html) {
  var opts = { bcc: BCC_EMAIL };
  if (html) opts.htmlBody = html;
  GmailApp.sendEmail(NOTIFY_EMAIL, subject, body, opts);
}

function statusLabel_(p, isPartial) {
  var base = isPartial ? 'Step 1 only' : 'Complete';
  if (String(p.k || '') !== FORM_TOKEN) base += ' (unverified)';
  return base;
}

/* The venue dropdown's "Somewhere else — type it in" option reveals a free
   text field (venue_other); whatever they typed is the real venue. The
   sentinel option text itself is never worth recording. */
function venueValue_(p) {
  var typed = String(p.venue_other || '').trim();
  if (typed) return typed;
  var v = String(p.venue || '').trim();
  return /^Somewhere else/i.test(v) ? '' : v;
}

/* The fields worth telling us about when an already-confirmed lead comes back
   with different answers. Deliberately not Status/Updated/Source/Page/Button:
   those change on every resend and would make every retry look like news. */
var WATCHED_FIELDS = ['Name', 'Email', 'Phone', 'Wedding Date', 'Venue',
  'Budget', 'Message', 'Role', 'Couple', 'Estimate'];

/* Sheet cells come back as strings OR as Date objects depending on how the
   column was formatted, and 'Wedding Date' is the one that flips. Comparing a
   Date object to the form's "09/19/2026" would report a change on every
   single resend, so both sides go through here first. */
function cellText_(v) {
  if (Object.prototype.toString.call(v) === '[object Date]') {
    return Utilities.formatDate(v, Session.getScriptTimeZone(), 'MM/dd/yyyy');
  }
  return String(v == null ? '' : v).trim();
}

function rowSnapshot_(sheet, row, cols) {
  var out = {};
  WATCHED_FIELDS.forEach(function (h) {
    if (cols[h]) out[h] = cellText_(sheet.getRange(row, cols[h]).getValue());
  });
  return out;
}

function changedFields_(before, after) {
  var out = [];
  if (!before) return out;
  WATCHED_FIELDS.forEach(function (h) {
    if (!(h in before)) return;
    var was = before[h], now = cellText_(after[h]);
    if (now !== was) out.push({ field: h, from: was, to: now });
  });
  return out;
}

/* Internal alert, sent alongside (not instead of) the couple's corrected
   confirmation, because Brittany is the one who replies and needs to see what
   moved. `coupleState` is 'sent', 'none' (no email address to send to) or
   'failed' (Gmail refused, e.g. quota) — a failure has to be visible here,
   since it means the couple is still holding the stale details. */
function notifyLeadUpdated_(p, changes, coupleState) {
  var coupleLine = coupleState === 'sent'
    ? 'A corrected confirmation has been sent to them, threaded under the first.'
    : coupleState === 'failed'
      ? 'WARNING: the corrected confirmation to them FAILED to send. They still'
        + ' have the old details, so mention the change when you reply.'
      : 'They gave no email address, so nothing was sent to them.';
  var lines = [
    'This lead was already confirmed, then resubmitted with different details.',
    'The sheet row is now up to date.',
    coupleLine,
    '',
    'Name: ' + (p.name || ''),
    'Email: ' + (p.email || '(not given)'),
    'Phone: ' + (fmtPhone_(p.phone) || '(not given)'),
    '',
    'What changed:'
  ];
  changes.forEach(function (c) {
    var from = c.from || '(empty)', to = c.to || '(empty)';
    // Message and Estimate can both be several lines, and an inline arrow
    // turns those into one unreadable run. Stack them instead.
    if (from.indexOf('\n') !== -1 || to.indexOf('\n') !== -1) {
      lines.push('  ' + c.field + ':', '    was:', indent_(indent_(from)), '    now:', indent_(indent_(to)));
    } else {
      lines.push('  ' + c.field + ': ' + from + '  ->  ' + to);
    }
  });
  sendMail_('Lead updated after confirmation: ' + (p.name || 'unknown'), lines.join('\n'));
}

/* Phones land in the sheet as 775-555-0123 (the same shape the form's
   input mask produces); anything unusual is kept exactly as typed. */
function fmtPhone_(raw) {
  var v = String(raw || '').trim();
  if (!v) return '';
  var d = v.replace(/\D/g, '');
  if (d.length === 11 && d.charAt(0) === '1') d = d.slice(1);
  if (d.length === 10) return d.slice(0, 3) + '-' + d.slice(3, 6) + '-' + d.slice(6);
  return v;
}

function buildRowValues_(p, isPartial, submittedAt, updatedAt, leadId) {
  return {
    'Submitted': submittedAt,
    'Updated': updatedAt,
    'Status': statusLabel_(p, isPartial),
    'Name': p.name || '',
    'Email': p.email || '',
    'Contact Method': p.contact_method || '',
    'Phone': fmtPhone_(p.phone),
    'Wedding Date': p.date || '',
    'Venue': venueValue_(p),
    'Aesthetic': p.aesthetic || '',
    'Budget': p.budget || '',
    'Message': p.message || '',
    'Source': sourceLabel_(p),
    'Page': p.cta_page || '',
    'Button': p.cta_button || '',
    'Lead ID': leadId || '',
    'Role': p.role || '',
    'Couple': p.couple || '',
    'Estimate': p.estimate || ''
  };
}

function writeRow_(sheet, row, cols, values) {
  Object.keys(values).forEach(function (key) {
    if (cols[key]) sheet.getRange(row, cols[key]).setValue(values[key]);
  });
}

function writeToSpam_(ss, p, isPartial, reasons, now) {
  var spamSheet = sheet_(ss, SPAM_SHEET);
  var spamHeaders = ensureHeaders_(spamSheet);
  if (spamHeaders.indexOf('Reason') === -1) {
    spamSheet.getRange(1, spamHeaders.length + 1).setValue('Reason');
    spamHeaders = spamHeaders.concat(['Reason']);
  }
  var cols = colMap_(spamHeaders);
  var newRow = spamSheet.getLastRow() + 1;
  var values = buildRowValues_(p, isPartial, now, now, p.lead_id || '');
  values['Reason'] = reasons.join('; ');
  writeRow_(spamSheet, newRow, cols, values);
}

function findRowByLeadId_(sheet, cols, leadId) {
  var col = cols['Lead ID'];
  var lastRow = sheet.getLastRow();
  if (!col || lastRow < 2) return 0;
  var finder = sheet.getRange(2, col, lastRow - 1, 1).createTextFinder(leadId).matchEntireCell(true);
  var cell = finder.findNext();
  return cell ? cell.getRow() : 0;
}

function genLeadIdFallback_() {
  return 'srv-' + Utilities.getUuid();
}

/** Ensures every header in HEADERS exists on the sheet, appending any that
 *  are missing after whatever is already there. Returns the full header row
 *  (existing order preserved) so callers can build a name -> column map. */
function ensureHeaders_(sheet) {
  var lastCol = sheet.getLastColumn();
  var lastRow = sheet.getLastRow();
  if (lastRow < 1 || lastCol < 1) {
    sheet.getRange(1, 1, 1, HEADERS.length).setValues([HEADERS]);
    return HEADERS.slice();
  }
  var existing = sheet.getRange(1, 1, 1, lastCol).getValues()[0]
    .map(function (v) { return String(v || '').trim(); });
  var appendCols = HEADERS.filter(function (h) { return existing.indexOf(h) === -1; });
  if (appendCols.length) {
    sheet.getRange(1, existing.length + 1, 1, appendCols.length).setValues([appendCols]);
    existing = existing.concat(appendCols);
  }
  return existing;
}

function colMap_(headerRow) {
  var map = {};
  headerRow.forEach(function (h, i) { if (h) map[h] = i + 1; });
  return map;
}

function spamReasons_(p) {
  var r = [];
  var name = String(p.name || '').trim();
  var email = String(p.email || '').trim();
  var phone = String(p.phone || '').trim();
  var method = String(p.contact_method || '').trim();
  var date = String(p.date || '').trim();
  var venue = (String(p.venue || '') + ' ' + String(p.venue_other || '')).trim();
  var aesthetic = String(p.aesthetic || '').trim();
  var budget = String(p.budget || '').trim();
  var role = String(p.role || '').trim();

  // Honeypot: a field real visitors never see or fill. Anything in it is a
  // bot filling every input it finds in the raw HTML.
  if (String(p.gf_hp || '').trim()) r.push('honeypot');

  // Real form flow takes several seconds minimum (mask setup, click advance,
  // fill step 2, click submit). A ts this fresh means a script POSTed
  // directly, skipping the page entirely.
  var ts = Number(p.ts || 0);
  if (ts && Date.now() - ts >= 0 && Date.now() - ts < 1200) r.push('submitted too fast');

  // The chooser checkboxes can only produce "Email", "Text", or the joined
  // "Email, Text". Empty is fine: the pre-chooser form (a stale cached page)
  // never sends the field.
  if (method) {
    var badToken = method.split(',').some(function (t) {
      t = t.trim();
      return t !== 'Email' && t !== 'Text';
    });
    if (badToken) r.push('bad contact method');
  }

  // The live form marks name required and always collects at least one way
  // to reach them (email or phone, whichever channel they picked), so posts
  // with neither never came from the form.
  if (!name) r.push('missing name');
  if (!email && !phone) r.push('no contact info');
  if (email) {
    if (!/^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/.test(email)) {
      r.push('bad email format');
    } else {
      var domain = email.split('@')[1].toLowerCase();
      if (PLACEHOLDER_DOMAINS.indexOf(domain) !== -1) {
        r.push('placeholder email domain');
      } else if (!domainReceivesMail_(domain)) {
        r.push('email domain cannot receive mail');
      }
    }
  }

  // The phone field validates client-side before step 1 advances: only
  // phone-ish characters, 10–15 digits. Mirrors phoneIssue() in
  // redesign-consult-js.html — keep both in sync.
  if (phone) {
    if (!/^[\d\s().+-]{7,25}$/.test(phone)) {
      r.push('bad phone characters');
    } else {
      var pd = phone.replace(/\D/g, '');
      if (pd.length < 10 || pd.length > 15) r.push('bad phone length');
    }
  }

  // The date input is masked to digits and slashes — anything else (like
  // the "+ 2 BTC" text from the July spam wave) cannot be typed into it.
  if (date) {
    if (!/^[\d\/\s]*$/.test(date)) {
      r.push('bad date characters');
    } else {
      var m = date.match(/^(\d{2})\/(\d{2})\/(\d{4})$/);
      if (!m) {
        r.push('bad date format');
      } else {
        var mm = +m[1], dd = +m[2], yyyy = +m[3];
        var d = new Date(yyyy, mm - 1, dd);
        var realCalendarDate = d.getFullYear() === yyyy && d.getMonth() === mm - 1 && d.getDate() === dd;
        if (!realCalendarDate) {
          r.push('invalid calendar date');
        } else {
          var thisYear = new Date().getFullYear();
          if (yyyy < thisYear - 1 || yyyy > thisYear + 6) r.push('date out of reasonable range');
        }
      }
    }
  }

  // Dropdowns can only submit their exact option strings (or empty).
  if (aesthetic && AESTHETICS.indexOf(aesthetic) === -1) r.push('bad aesthetic');
  if (budget && BUDGETS.indexOf(budget) === -1) r.push('bad budget');
  if (role && ROLES.indexOf(role) === -1) r.push('bad role');

  // Crypto-spam vocabulary and links in fields where they can never
  // legitimately appear. Deliberately NOT applied to the message field,
  // where a real couple might paste a venue or Pinterest link.
  if (/btc|bitcoin|crypto|withdraw|https?:|www\./i.test(name + ' ' + date)) {
    r.push('spam keywords');
  }
  if (venue && /btc|bitcoin|crypto|withdraw/i.test(venue)) r.push('spam keywords in venue');

  // The estimate recap is machine-written and never typed: the tool cannot
  // emit a link, and its longest possible output (every row present, every
  // extra ticked) is a few hundred characters. Anything else here is a bot
  // that found the hidden input and filled it like every other field.
  var estimate = String(p.estimate || '').trim();
  if (estimate) {
    if (estimate.length > 1200) r.push('estimate too long');
    else if (/btc|bitcoin|crypto|withdraw|https?:|www\./i.test(estimate)) r.push('spam keywords in estimate');
  }

  // Flood control. A real visit produces at most 2 posts (step-1 partial +
  // complete); even a redo is 4. The July bot ran at ~10/min.
  var floodKey = email || phone.replace(/\D/g, '');
  if (floodKey && floodCount_(floodKey) > 6) r.push('flood');

  return r;
}

// Rolling per-contact counter; the 10-minute window renews on every hit, so a
// sustained bot stays counted while a couple returning tomorrow starts fresh.
function floodCount_(contact) {
  var cache = CacheService.getScriptCache();
  var key = 'n:' + contact.toLowerCase();
  var n = Number(cache.get(key) || 0) + 1;
  cache.put(key, String(n), 600);
  return n;
}

// Free DNS-over-HTTPS lookup (Google's public resolver, no API key). Fails
// OPEN on any network error or unexpected response — a lookup hiccup must
// never cost a real lead. Falls back to checking for an A record before
// declaring a domain dead, since some small domains route mail without an
// explicit MX record.
function domainReceivesMail_(domain) {
  var cache = CacheService.getScriptCache();
  var key = 'mxok:' + domain;
  var cached = cache.get(key);
  if (cached !== null) return cached === '1';
  var ok = true;
  try {
    var mx = dnsQuery_(domain, 'MX');
    if (mx && mx.Status === 3) {
      ok = false; // NXDOMAIN — the domain itself doesn't exist
    } else if (mx && mx.Status === 0 && (!mx.Answer || !mx.Answer.length)) {
      var a = dnsQuery_(domain, 'A');
      if (a && (a.Status === 3 || !a.Answer || !a.Answer.length)) ok = false;
    }
  } catch (err) {
    ok = true;
  }
  cache.put(key, ok ? '1' : '0', 3600);
  return ok;
}

function dnsQuery_(domain, type) {
  var resp = UrlFetchApp.fetch(
    'https://dns.google/resolve?name=' + encodeURIComponent(domain) + '&type=' + type,
    { muteHttpExceptions: true }
  );
  if (resp.getResponseCode() !== 200) return null;
  return JSON.parse(resp.getContentText());
}

function sourceLabel_(p) {
  var utmSource = String(p.utm_source || '').trim();
  var utmMedium = String(p.utm_medium || '').trim();
  var utmCampaign = String(p.utm_campaign || '').trim();
  var ref = String(p.referrer || '').trim();

  if (utmSource) {
    var label = utmSource;
    if (utmMedium) label += ' / ' + utmMedium;
    if (utmCampaign) label += ' (' + utmCampaign + ')';
    return label;
  }
  if (!ref) return 'Direct or typed URL';

  var host = '';
  try { host = ref.replace(/^https?:\/\//, '').split('/')[0].toLowerCase(); } catch (e) {}
  if (host.indexOf('google.') !== -1) return 'Google (organic search)';
  if (host.indexOf('instagram.com') !== -1) return 'Instagram';
  if (host.indexOf('facebook.com') !== -1 || host.indexOf('fb.com') !== -1) return 'Facebook';
  if (host.indexOf('pinterest') !== -1) return 'Pinterest';
  if (host.indexOf('goldenflorals.com') !== -1 || host.indexOf('jshplhm.github.io') !== -1) return 'Internal navigation';
  return host ? ('Referral: ' + host) : 'Unknown';
}

/* ---------------------------------------------------------------------------
   Shared email furniture.

   Both notifications are the same object seen from two sides: the couple's
   confirmation and, when they left no email, our own alert. They read back
   the same answers, so they are built from the same pieces. Brittany noticed
   the text-only alert "looked different" long before anyone thought to ask
   why, which is the whole argument for keeping one set of parts.

   Brand palette as hex (the site's oklch values do not render in email).
--------------------------------------------------------------------------- */
var EM_GREEN = '#2e4034', EM_INK = '#20281f', EM_CREAM = '#f3efe6',
    EM_PAPER = '#fdfbf7', EM_LINE = '#d9d2c4', EM_MUTE = '#6f6e62';

/* Small uppercase heading that names the block under it. */
function emailEyebrow_(label) {
  return '<p style="margin:0 0 10px;font:11px Helvetica,Arial,sans-serif;' +
    'letter-spacing:.14em;text-transform:uppercase;color:' + EM_MUTE + ';">' +
    escHtml_(label) + '</p>';
}

/* Two-column label/value table: the shape every block of read-back answers
   takes, so the details, the estimate and the alert all line up. */
function emailRows_(rows, gap) {
  if (!rows.length) return '';
  return '<table role="presentation" cellpadding="0" cellspacing="0" style="margin:0 0 ' + gap + ';">' +
    rows.map(function (r) {
      return '<tr>' +
        '<td style="padding:3px 18px 3px 0;font:13px Helvetica,Arial,sans-serif;color:' + EM_MUTE + ';white-space:nowrap;vertical-align:top;">' + escHtml_(r[0]) + '</td>' +
        '<td style="padding:3px 0;font:14px Helvetica,Arial,sans-serif;color:' + EM_INK + ';">' + escHtml_(r[1]) + '</td>' +
      '</tr>';
    }).join('') + '</table>';
}

/* Free text, set apart so a long or multi-line note stays readable and never
   merges into the answers above it. */
function emailNote_(label, text, gap) {
  if (!String(text || '').trim()) return '';
  return emailEyebrow_(label) +
    '<p style="margin:0 0 ' + gap + ';padding:12px 16px;background:' + EM_CREAM + ';border-left:2px solid ' + EM_GREEN + ';font:14px/1.6 Helvetica,Arial,sans-serif;color:' + EM_INK + ';white-space:pre-wrap;">' +
    escHtml_(String(text).trim()) + '</p>';
}

/* The planning tool's recap. It arrives as "Label: value" lines; a line
   without a colon (someone reworded a label into one) still prints, spanning
   both columns, rather than being silently dropped. */
function emailEstimate_(est, label, gap) {
  var s = String(est || '').trim();
  if (!s) return '';
  return emailEyebrow_(label) +
    '<table role="presentation" cellpadding="0" cellspacing="0" style="margin:0 0 ' + gap + ';">' +
    s.split('\n').map(function (line) {
      var i = line.indexOf(': ');
      if (i === -1) {
        return '<tr><td colspan="2" style="padding:3px 0;font:14px Helvetica,Arial,sans-serif;color:' + EM_INK + ';">' + escHtml_(line) + '</td></tr>';
      }
      return '<tr>' +
        '<td style="padding:3px 18px 3px 0;font:13px Helvetica,Arial,sans-serif;color:' + EM_MUTE + ';white-space:nowrap;vertical-align:top;">' + escHtml_(line.slice(0, i)) + '</td>' +
        '<td style="padding:3px 0;font:14px Helvetica,Arial,sans-serif;color:' + EM_INK + ';">' + escHtml_(line.slice(i + 2)) + '</td>' +
      '</tr>';
    }).join('') + '</table>';
}

/* The card every notification arrives in: cream page, paper card, wordmark.
   footerHtml is the block below the rule (the couple gets a signature, we get
   a one-line provenance note); pass '' for none. */
function emailShell_(bodyHtml, footerHtml) {
  var bodyPad = footerHtml ? '22px 40px 0' : '22px 40px 32px';
  return '' +
  '<table role="presentation" width="100%" cellpadding="0" cellspacing="0" style="background:' + EM_CREAM + ';margin:0;padding:28px 12px;">' +
    '<tr><td align="center">' +
      '<table role="presentation" width="520" cellpadding="0" cellspacing="0" style="max-width:520px;width:100%;background:' + EM_PAPER + ';border:1px solid ' + EM_LINE + ';border-radius:4px;">' +
        '<tr><td style="padding:36px 40px 0;text-align:center;">' +
          '<div style="font:400 30px Georgia,\'Times New Roman\',serif;letter-spacing:.02em;color:' + EM_GREEN + ';">Golden&nbsp;Flowers</div>' +
          '<div style="font:11px Helvetica,Arial,sans-serif;letter-spacing:.16em;text-transform:uppercase;color:' + EM_MUTE + ';margin-top:9px;">Lake&nbsp;Tahoe Wedding Florist</div>' +
          '<div style="border-top:1px solid ' + EM_LINE + ';margin:24px 0 0;"></div>' +
        '</td></tr>' +
        '<tr><td style="padding:' + bodyPad + ';font:15px/1.65 Helvetica,Arial,sans-serif;color:' + EM_INK + ';">' +
          bodyHtml +
        '</td></tr>' +
        (footerHtml
          ? '<tr><td style="padding:0 40px 36px;font:14px/1.6 Helvetica,Arial,sans-serif;color:' + EM_INK + ';">' + footerHtml + '</td></tr>'
          : '') +
      '</table>' +
    '</td></tr>' +
  '</table>';
}

/* Our alert for a lead that gave no email address.
 *
 * Same card as the couple's confirmation on purpose. This is the one lead
 * where nothing was sent to them, so it is also the one lead that needs an
 * instruction at the top rather than a receipt: text them, here is the
 * number, here is the draft. Everything below the banner is the same set of
 * answers the confirmation reads back, in the third person.
 *
 * Deliberately no Source / Opened-from lines: Brittany forwards these emails
 * to couples, and lead-gen internals shouldn't travel with them. Arrival
 * source still lands in the sheet's Source column.
 */
function sendCompleteEmail_(p) {
  var name = String(p.name || '').trim();
  var phone = fmtPhone_(p.phone);
  var email = String(p.email || '').trim();
  var dateLong = fmtDateLong_(p.date);

  var subject = phone
    ? 'Text back: ' + (name || 'new consult request') + (dateLong ? '  ·  ' + dateLong : '')
    : 'New consult request: ' + (name || 'Unknown') + '  ·  ' + (p.date || 'no date');

  /* ---- plain-text part (kept in step with the HTML; no em dashes) ---- */
  var lines = [];
  if (phone) {
    lines.push('TEXT THEM: ' + phone,
      'They gave no email address, so no confirmation went out. This is the only reply they get.',
      '');
  }
  lines.push('Name: ' + (name || ''));
  // Who we're talking to leads, because it changes the whole reply.
  if (String(p.role || '').trim()) lines.push('They are: ' + p.role);
  if (String(p.couple || '').trim()) lines.push('Couple: ' + p.couple);
  if (String(p.contact_method || '').trim()) lines.push('Reach them by: ' + p.contact_method);
  lines = lines.concat([
    'Email: ' + (email || '(not given)'),
    'Phone: ' + (phone || '(not given)'),
    'Wedding date: ' + (p.date || ''),
    'Venue: ' + (venueValue_(p) || '(not given)'),
    'Budget: ' + (p.budget || ''),
    'Message: ' + (p.message || '(none)')
  ]);
  // Only surfaced when a stale cached page still sent it.
  if (String(p.aesthetic || '').trim()) lines.push('Aesthetic: ' + p.aesthetic);
  // The planning tool's recap, under its own heading and last: it is several
  // lines, and it is the tool's arithmetic rather than anything they wrote,
  // so it must never look like the continuation of their message.
  var est = String(p.estimate || '').trim();
  if (est) lines = lines.concat(['', 'From their estimate:', indent_(est)]);
  var textBody = lines.join('\n');

  /* ---- the banner: what to do, before anything to read ---- */
  var banner;
  if (phone) {
    // The number and nothing else. A tap-to-text button cannot work here:
    // Gmail keeps only http, https, mailto and ftp hrefs, so an sms: link
    // arrives styled and dead (2026-08-20). What matters is that the number
    // is easy to take: it is plain selectable text, which the Gmail app on a
    // phone also auto-links, so a long press offers Copy.
    banner =
      '<table role="presentation" width="100%" cellpadding="0" cellspacing="0" style="margin:0 0 24px;background:' + EM_GREEN + ';border-radius:3px;">' +
        '<tr><td style="padding:20px 22px;text-align:center;">' +
          '<div style="font:11px Helvetica,Arial,sans-serif;letter-spacing:.14em;text-transform:uppercase;color:#b9c9bb;">No email address · text them back</div>' +
          '<div style="font:28px Helvetica,Arial,sans-serif;color:#ffffff;margin:10px 0 0;white-space:nowrap;">' + escHtml_(phone) + '</div>' +
        '</td></tr>' +
      '</table>' +
      '<p style="margin:0 0 22px;">They asked us to reach them by text, so nothing has been sent to them yet. This message is the only one that went anywhere, and it came to us.</p>';
  } else if (email) {
    // Not reachable through notifyComplete_, which only calls this with no
    // email. Kept honest for the safety-net call inside sendAutoReply_.
    banner = emailEyebrow_('New consult request') +
      '<p style="margin:0 0 22px;">The confirmation to <strong>' + escHtml_(email) + '</strong> did not go out, so they are waiting on a first reply from us.</p>';
  } else {
    banner = emailEyebrow_('New consult request') +
      '<p style="margin:0 0 22px;">No email address and no phone number came through with this one. The full row is on the leads tab.</p>';
  }

  /* ---- the answers, third person ---- */
  var rows = [];
  if (name) rows.push(['Their name', name]);
  var role = String(p.role || '').trim();
  if (role && role !== ROLE_DEFAULT) {
    var couple = String(p.couple || '').trim();
    if (couple) rows.push(['Getting married', couple]);
    rows.push(['They are', role]);
  }
  if (email) rows.push(['Email', email]);
  // Skipped when the banner above already said it: for a lead with a phone and
  // no email, "Reach them by: Text" is the same sentence twice.
  if (!phone && String(p.contact_method || '').trim()) rows.push(['Reach them by', String(p.contact_method).trim()]);
  if (dateLong) rows.push(['Wedding date', dateLong]);
  var venue = venueValue_(p);
  if (venue) rows.push(['Venue', venue]);
  if (String(p.aesthetic || '').trim()) rows.push(['Style', String(p.aesthetic).trim()]);
  if (String(p.budget || '').trim()) rows.push(['Budget', String(p.budget).trim()]);

  var note = String(p.message || '').trim();
  var body = banner +
    (rows.length ? emailEyebrow_('What they sent us') + emailRows_(rows, note || est ? '18px' : '24px') : '') +
    emailNote_('Their note', note, est ? '18px' : '24px') +
    emailEstimate_(est, 'From their estimate', '24px') +
    '<div style="border-top:1px solid ' + EM_LINE + ';margin:0 0 16px;"></div>' +
    '<p style="margin:0;font:12px Helvetica,Arial,sans-serif;color:' + EM_MUTE + ';">Sent by the consultation form on goldenflorals.com. The full row is on the leads tab.</p>';

  sendMail_(subject, textBody, emailShell_(body, ''));
}

/* Every line of a multi-line block, shifted, so it reads as one thing under
   its heading instead of merging into the flat list above it. */
function indent_(block) {
  return String(block).split('\n').map(function (l) { return '  ' + l; }).join('\n');
}

/* One notification per completed lead. When we have their email we send THEM
   the branded confirmation and BCC ourselves (we reply to that thread to start
   the conversation, so a separate internal "new lead" email is redundant).
   With no email (text-only lead) we fall back to the internal alert so it is
   never missed. */
function notifyComplete_(p) {
  if (String(p.email || '').trim()) sendAutoReply_(p);
  else sendCompleteEmail_(p);
}

/* Immediate branded confirmation to the couple. Getting an email into their
   inbox seconds after they submit (while they are still on the page, primed by
   the success screen to look for it) is our best shot at surviving spam
   filters: they can fish it out now instead of missing our real reply later.
   BCC lands the same thread in our inbox to reply from.

   isUpdate: this is the corrected copy of a confirmation we already sent,
   because the lead came back with different details. Only the opening line
   changes. It does not apologize or mention a first email: from where they are
   sitting the first attempt looked like it failed, so "we have your latest
   details" is both true and the least confusing thing we can say. */
function sendAutoReply_(p, isUpdate) {
  var email = String(p.email || '').trim();
  if (!email) { sendCompleteEmail_(p); return; }  // safety net; caller already branches

  var first = (String(p.name || '').trim().split(/\s+/)[0]) || '';
  var dateLong = fmtDateLong_(p.date);
  var subject = dateLong
    ? 'Checking availability for ' + dateLong + ' · Golden Flowers'
    : 'Checking your availability · Golden Flowers';

  // Only the fields they actually filled in.
  //
  // This email is BOTH the couple's receipt and, via the BCC, the only
  // notification we get for a lead that gave an email: the internal
  // sendCompleteEmail_ alert never fires for them. So everything they told us
  // has to be here, or it exists only in the sheet.
  var rows = [];
  // Their full name. The greeting is on a first name, and the To: header is
  // just an address, so without this a surname reaches us nowhere.
  var fullName = String(p.name || '').trim();
  if (fullName) rows.push(['Your name', fullName]);
  // Who is writing, when it is not one of the couple. Both lines are step 1
  // answers, and together they are the difference between replying to a bride
  // and replying to a planner about someone else's wedding.
  var role = String(p.role || '').trim();
  if (role && role !== ROLE_DEFAULT) {
    var couple = String(p.couple || '').trim();
    if (couple) rows.push(['Getting married', couple]);
    rows.push(['You are', role]);
  }
  if (dateLong) rows.push(['Wedding date', dateLong]);
  var venue = venueValue_(p);
  if (venue) rows.push(['Venue', venue]);
  if (String(p.aesthetic || '').trim()) rows.push(['Style', String(p.aesthetic).trim()]);
  if (String(p.budget || '').trim()) rows.push(['Budget', String(p.budget).trim()]);
  // A number here means they ticked Text as well as Email (the form only
  // submits the phone when Text is chosen). Reading it back confirms we have
  // it right, and it is the only place their number appears on the copy we
  // are BCC'd: the internal alert with the Phone line only fires for leads
  // that gave no email at all.
  var phone = fmtPhone_(p.phone);
  if (phone) rows.push(['Phone / text', phone]);
  // Their free-text note gets its own block (it can be long / multi-line), so
  // it all lives in this one email and they never wonder if it went through.
  var note = String(p.message || '').trim();
  // The planning tool's recap, kept apart from their note for the same reason
  // the form does: one is what they wrote, the other is what the tool worked
  // out. Reading it back is also a quiet accuracy check, since this is the
  // last chance to catch a slider they left somewhere wrong.
  var est = String(p.estimate || '').trim();

  var hi = first ? 'Hi ' + first + ',' : 'Hi,';
  var opener = isUpdate
    ? 'Thank you, we have your latest details. Here is what we have on file for you now.'
    : 'Thank you for reaching out. We have received your request and we are checking our calendar now.';

  // Plain-text fallback (kept in step with the HTML; no em dashes in copy).
  var t = [hi, '',
    opener, ''];
  if (rows.length || note) {
    t.push('Here is what you sent us:');
    rows.forEach(function (r) { t.push('  ' + r[0] + ': ' + r[1]); });
    if (note) { t.push('  Your note: ' + note); }
    t.push('');
  }
  if (est) { t.push('From your estimate:', indent_(est), ''); }
  t.push(
    'We will be in touch within 48 hours to let you know if your date is open and how we would approach your florals.', '',
    'In the meantime, you can text us anytime at 530-557-7689.', '',
    'Warmly,', 'Brittany', 'Golden Flowers', 'Lake Tahoe wedding florist', 'goldenflorals.com');
  var textBody = t.join('\n');

  var body =
    '<p style="margin:0 0 16px;">' + escHtml_(hi) + '</p>' +
    '<p style="margin:0 0 22px;">' + escHtml_(opener) + '</p>' +
    (rows.length ? emailEyebrow_('Here is what you sent us') + emailRows_(rows, note || est ? '18px' : '24px') : '') +
    emailNote_('Your note', note, est ? '18px' : '24px') +
    emailEstimate_(est, 'From your estimate', '24px') +
    '<p style="margin:0 0 22px;">We will be in touch within 48 hours to let you know if your date is open and how we would approach your florals.</p>' +
    '<p style="margin:0 0 26px;">In the meantime, you can text us anytime at <strong style="color:' + EM_GREEN + ';white-space:nowrap;">530-557-7689</strong>.</p>' +
    '<div style="border-top:1px solid ' + EM_LINE + ';margin:0 0 20px;"></div>';

  var footer =
    'Warmly,<br>' +
    '<strong>Brittany</strong><br>' +
    '<span style="color:' + EM_GREEN + ';">Golden Flowers</span><br>' +
    '<span style="color:' + EM_MUTE + ';">Lake Tahoe wedding florist</span><br>' +
    '<a href="https://goldenflorals.com" style="color:' + EM_GREEN + ';text-decoration:none;">goldenflorals.com</a>';

  GmailApp.sendEmail(email, subject, textBody, {
    htmlBody: emailShell_(body, footer),
    name: 'Golden Flowers',
    replyTo: NOTIFY_EMAIL,
    bcc: NOTIFY_EMAIL + ',' + BCC_EMAIL
  });
}

/* "06/12/2027" -> "June 12, 2027". Unknown shapes are shown exactly as typed
   rather than guessed at. */
function fmtDateLong_(raw) {
  var s = String(raw || '').trim();
  if (!s) return '';
  var m = s.match(/^(\d{1,2})\/(\d{1,2})\/(\d{4})$/);
  if (!m) return s;
  var months = ['January', 'February', 'March', 'April', 'May', 'June', 'July',
    'August', 'September', 'October', 'November', 'December'];
  var mo = parseInt(m[1], 10), d = parseInt(m[2], 10);
  if (mo < 1 || mo > 12 || d < 1 || d > 31) return s;
  return months[mo - 1] + ' ' + d + ', ' + m[3];
}

function escHtml_(v) {
  return String(v == null ? '' : v)
    .replace(/&/g, '&amp;').replace(/</g, '&lt;').replace(/>/g, '&gt;')
    .replace(/"/g, '&quot;');
}

/* One line of contact info for digest entries: whatever they gave (both,
   when they gave both), tagged when the couple asked to be texted. */
function contactLine_(row, cols) {
  var email = String(row[cols['Email'] - 1] || '').trim();
  var phone = cols['Phone'] ? fmtPhone_(row[cols['Phone'] - 1]) : '';
  var method = cols['Contact Method'] ? String(row[cols['Contact Method'] - 1] || '').trim() : '';
  var parts = [];
  if (email) parts.push(email);
  if (phone) parts.push(phone + (method === 'Text' ? ' (reach by text)' : ''));
  return parts.join('  ·  ') || 'no contact info';
}

/* Wedding dates land in the sheet as strings but Sheets often coerces them
   to Dates, which print with a midnight time. Digests always show plain
   mm/dd/yyyy either way. */
function fmtWeddingDate_(v) {
  if (v instanceof Date) return Utilities.formatDate(v, Session.getScriptTimeZone(), 'MM/dd/yyyy');
  return String(v || '');
}

function fmtWhen_(v) {
  if (v instanceof Date) return Utilities.formatDate(v, Session.getScriptTimeZone(), 'MMM d, h:mm a');
  return String(v || '');
}

/** The daily digest, run by the single time-driven trigger.
 *  Spam is NOT digested by design (2026-08-15): the bot volume made a daily
 *  list of it pure noise. Everything caught is still written to the Spam tab
 *  in full, so a false positive is recoverable by looking there. Do not
 *  restore a spam email without asking. */
function dailyDigests() {
  partialLeadsDigest_();
}

/** One email per day listing partials that landed since the last digest.
 *  Normally each partial is listed once (watermark = newest Submitted time
 *  already covered), the same way the spam digest works — no more daily
 *  re-nagging about the same stragglers. Biased toward listing a straggler
 *  twice rather than never: see the watermark cap below. Skips silently when
 *  nothing is new. */
function partialLeadsDigest_() {
  var ss = SpreadsheetApp.getActive();
  var sheet = ss.getSheetByName(PARTIALS_SHEET);
  if (!sheet || sheet.getLastRow() < 2) return;
  var headerRow = ensureHeaders_(sheet);
  var cols = colMap_(headerRow);
  var values = sheet.getRange(2, 1, sheet.getLastRow() - 1, headerRow.length).getValues();
  var minAge = new Date(Date.now() - PARTIAL_MIN_AGE_MINUTES * 60000);
  var dayAgo = new Date(Date.now() - 24 * 3600000);

  var props = PropertiesService.getScriptProperties();
  var last = Number(props.getProperty('partialDigestAt') || 0);
  var newest = last;
  var heldOldest = Infinity;

  var fresh = [], older = [];
  values.forEach(function (row) {
    var name = row[cols['Name'] - 1], email = row[cols['Email'] - 1];
    var phone = cols['Phone'] ? row[cols['Phone'] - 1] : '';
    if (!name && !email && !phone) return; // blank spacer row
    var updated = row[cols['Updated'] - 1];
    if (updated instanceof Date && updated > minAge) { // possibly still typing, hold for tomorrow
      var held = row[cols['Submitted'] - 1];
      if (held instanceof Date && held.getTime() < heldOldest) heldOldest = held.getTime();
      return;
    }
    var submitted = row[cols['Submitted'] - 1];
    var subMs = submitted instanceof Date ? submitted.getTime() : 0;
    if (subMs && subMs <= last) return; // already covered by an earlier digest
    if (subMs > newest) newest = subMs; // only unemailed rows advance the watermark
    var entry =
      '• ' + (name || '(no name)') + ' — ' + contactLine_(row, cols) + '\n' +
      '  Wedding date: ' + (fmtWeddingDate_(row[cols['Wedding Date'] - 1]) || '(none)') +
      '  ·  Started: ' + fmtWhen_(row[cols['Submitted'] - 1]);
    // Role and couple are step 1 answers, so a partial always has them, and
    // they decide whether "a friendly note" goes to a bride or to a planner
    // holding several weddings. Columns are guarded: a sheet created before
    // 2026-08-10 has neither.
    var pRole = cols['Role'] ? String(row[cols['Role'] - 1] || '').trim() : '';
    var pCouple = cols['Couple'] ? String(row[cols['Couple'] - 1] || '').trim() : '';
    if (pRole && pRole !== ROLE_DEFAULT) {
      entry += '\n  They are: ' + pRole +
        (pCouple ? '  ·  Getting married: ' + pCouple : '');
    }
    (submitted instanceof Date && submitted > dayAgo ? fresh : older).push(entry);
  });

  // Never let the watermark pass a row we held back: it started earlier than
  // something we did email, so a plain high-water mark would skip it forever
  // once it settles. Capping can re-list a newer partial one extra time, which
  // is the right trade — a duplicate is visible, a dropped lead is silent.
  if (heldOldest < Infinity) {
    var cap = Math.max(heldOldest - 1, last); // and never move it backward
    if (newest > cap) newest = cap;
  }

  if (!fresh.length && !older.length) { props.setProperty('partialDigestAt', String(newest)); return; }

  var parts = [
    'These couples filled in step 1 (date, name, contact) but never finished step 2.',
    'A friendly note sometimes brings them back.',
    ''
  ];
  if (fresh.length) parts = parts.concat(['NEW IN THE LAST 24 HOURS', ''], fresh, ['']);
  if (older.length) parts = parts.concat([fresh.length ? 'STILL WAITING FROM BEFORE' : 'WAITING', ''], older, ['']);
  parts.push('Full list: ' + SpreadsheetApp.getActive().getUrl());

  var total = fresh.length + older.length;
  sendMail_(
    total + ' partial lead' + (total > 1 ? 's' : '') + ' — finished step 1 only',
    parts.join('\n')
  );
  props.setProperty('partialDigestAt', String(newest));
}

/** Run once from the editor after deploying. Replaces the old 30-minute
 *  stale-partial trigger with the single daily digest timer. Safe to re-run. */
function setupTriggers() {
  ScriptApp.getProjectTriggers().forEach(function (t) {
    var fn = t.getHandlerFunction();
    if (fn === 'notifyStalePartials' || fn === 'dailyDigests') ScriptApp.deleteTrigger(t);
  });
  ScriptApp.newTrigger('dailyDigests').timeBased().everyDays(1).atHour(DIGEST_HOUR).create();
}

/** Run this in the editor (Run -> testVet) to sanity-check the rules: the
 *  first SIX logs should be [] (real submissions pass — old form, email
 *  lead, text lead, both-channels lead, couple with role, planner with the
 *  couple's names), the rest non-empty. */
function testVet() {
  Logger.log(spamReasons_({ // post-2026-08-10 form: role, no aesthetic
    name: 'Jordan Reyes', contact_method: 'Email', email: 'jpelham03@gmail.com',
    date: '06/11/2028', role: 'One of the couple', budget: '$15,000–$25,000',
    k: FORM_TOKEN, ts: String(Date.now() - 30000)
  }));
  Logger.log(spamReasons_({ // planner filling it in for a couple
    name: 'Alex Chen', contact_method: 'Email', email: 'jpelham03@gmail.com',
    date: '06/11/2028', role: 'The wedding planner', couple: 'Jordan & Sam',
    budget: '$25,000+', k: FORM_TOKEN, ts: String(Date.now() - 30000)
  }));
  Logger.log(spamReasons_({
    name: 'Josh Pelham', email: 'jpelham03@gmail.com', date: '06/11/2028',
    aesthetic: 'Elevated Minimalist (clean, airy, restrained)', budget: '$25,000+',
    message: "idk but I'm happy to be married", k: FORM_TOKEN, ts: String(Date.now() - 30000)
  }));
  Logger.log(spamReasons_({ // new form, email channel
    name: 'Jordan & Sam', contact_method: 'Email', email: 'jpelham03@gmail.com',
    date: '06/11/2028', aesthetic: 'Wildflower Modern — wild, seasonal, editorial',
    budget: '$15,000–$25,000', k: FORM_TOKEN, ts: String(Date.now() - 30000)
  }));
  Logger.log(spamReasons_({ // new form, text channel — no email at all
    name: 'Jordan & Sam', contact_method: 'Text', phone: '775-555-0123',
    date: '06/11/2028', aesthetic: 'Lush & Romantic — rich, dramatic, deep tones',
    budget: '$8,000–$15,000', k: FORM_TOKEN, ts: String(Date.now() - 30000)
  }));
  Logger.log(spamReasons_({ // both channels checked
    name: 'Jordan & Sam', contact_method: 'Email, Text',
    email: 'jpelham03@gmail.com', phone: '775-555-0123',
    date: '06/11/2028', k: FORM_TOKEN, ts: String(Date.now() - 30000)
  }));
  Logger.log(spamReasons_({ // bot guessing the new fields wrong
    name: 'x', contact_method: 'Both', phone: '555-0123', date: '06/11/2028'
  }));
  Logger.log(spamReasons_({ // bot inventing a role string the select can't produce
    name: 'x', contact_method: 'Email', email: 'a@b.com', date: '06/11/2028',
    role: 'bride', k: FORM_TOKEN, ts: String(Date.now() - 30000)
  }));
  Logger.log(spamReasons_({ name: 'y', date: '06/11/2028' })); // no contact info at all
  Logger.log(spamReasons_({ // July bot wave
    name: 'g6c2xl', email: '96b0fvr6ra06pq@web-library.net',
    date: '📈 + 2 BTC. Sign In', message: '83wosy'
  }));
  Logger.log(spamReasons_({ name: 'x', email: 'not-an-email', date: '12/31/2028' }));
  Logger.log(spamReasons_({ name: 'josh', email: 'test@g.com', date: '12/12/12' })); // your own test row
  Logger.log(spamReasons_({ // the RobertDuh row — should flag on date range + no ts/token
    name: 'RobertDuh', email: 'zekisuqic419@gmail.com', date: '10/11/1989',
    aesthetic: 'Elevated Minimalist, clean, airy, restrained', budget: '$8,000–$15,000',
    message: 'Прывітанне, я хацеў даведацца Ваш прайс.'
  }));
}
