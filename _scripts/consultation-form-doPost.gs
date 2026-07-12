/**
 * Golden Flowers consultation form — hardened intake, v3.3 (July 2026).
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
 *   partial leads  — step-1-only submissions. One digest email per day.
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

var BUDGETS = [
  "$5,000–$8,000",
  "$8,000–$12,000",
  "$12,000–$18,000",
  "$18,000–$25,000",
  "$25,000+",
  "Not sure yet"
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
var HEADERS = [
  'Submitted', 'Status', 'Name', 'Email', 'Wedding Date', 'Aesthetic',
  'Budget', 'Message', 'Venue', 'Source', 'Updated', 'Lead ID',
  'Contact Method', 'Phone', 'Page', 'Button'
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
    writeRow_(leads, rowInLeads, leadsCols,
      buildRowValues_(p, false, leads.getRange(rowInLeads, leadsCols['Submitted']).getValue() || now, now, leadId));
    if (!wasComplete) sendCompleteEmail_(p);
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
  sendCompleteEmail_(p);

  return success_();
}

function success_() {
  return ContentService.createTextOutput(JSON.stringify({ result: 'success' }))
    .setMimeType(ContentService.MimeType.JSON);
}

function sheet_(ss, name) {
  return ss.getSheetByName(name) || ss.insertSheet(name);
}

function sendMail_(subject, body) {
  GmailApp.sendEmail(NOTIFY_EMAIL, subject, body, { bcc: BCC_EMAIL });
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
    'Lead ID': leadId || ''
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

  // Crypto-spam vocabulary and links in fields where they can never
  // legitimately appear. Deliberately NOT applied to the message field,
  // where a real couple might paste a venue or Pinterest link.
  if (/btc|bitcoin|crypto|withdraw|https?:|www\./i.test(name + ' ' + date)) {
    r.push('spam keywords');
  }
  if (venue && /btc|bitcoin|crypto|withdraw/i.test(venue)) r.push('spam keywords in venue');

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

function sendCompleteEmail_(p) {
  var subject = 'New consult request: ' + (p.name || 'Unknown') + '  ·  ' + (p.date || 'no date');
  // Deliberately no Source / Opened-from lines: Brittany forwards these
  // emails to couples, and lead-gen internals shouldn't travel with them.
  // Arrival source still lands in the sheet's Source column.
  var lines = ['Name: ' + (p.name || '')];
  if (String(p.contact_method || '').trim()) lines.push('Reach them by: ' + p.contact_method);
  lines = lines.concat([
    'Email: ' + (p.email || '(not given)'),
    'Phone: ' + (fmtPhone_(p.phone) || '(not given)'),
    'Wedding date: ' + (p.date || ''),
    'Venue: ' + (venueValue_(p) || '(not given)'),
    'Aesthetic: ' + (p.aesthetic || ''),
    'Budget: ' + (p.budget || ''),
    'Message: ' + (p.message || '(none)')
  ]);
  sendMail_(subject, lines.join('\n'));
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

/** Both daily digests, run by the single time-driven trigger. */
function dailyDigests() {
  partialLeadsDigest_();
  spamDigest_();
}

/** One email per day listing everyone currently sitting on Partial leads.
 *  Skips silently when the tab is empty. */
function partialLeadsDigest_() {
  var ss = SpreadsheetApp.getActive();
  var sheet = ss.getSheetByName(PARTIALS_SHEET);
  if (!sheet || sheet.getLastRow() < 2) return;
  var headerRow = ensureHeaders_(sheet);
  var cols = colMap_(headerRow);
  var values = sheet.getRange(2, 1, sheet.getLastRow() - 1, headerRow.length).getValues();
  var minAge = new Date(Date.now() - PARTIAL_MIN_AGE_MINUTES * 60000);
  var dayAgo = new Date(Date.now() - 24 * 3600000);

  var fresh = [], older = [];
  values.forEach(function (row) {
    var name = row[cols['Name'] - 1], email = row[cols['Email'] - 1];
    var phone = cols['Phone'] ? row[cols['Phone'] - 1] : '';
    if (!name && !email && !phone) return; // blank spacer row
    var updated = row[cols['Updated'] - 1];
    if (updated instanceof Date && updated > minAge) return; // possibly still typing
    var entry =
      '• ' + (name || '(no name)') + ' — ' + contactLine_(row, cols) + '\n' +
      '  Wedding date: ' + (fmtWeddingDate_(row[cols['Wedding Date'] - 1]) || '(none)') +
      '  ·  Started: ' + fmtWhen_(row[cols['Submitted'] - 1]);
    var submitted = row[cols['Submitted'] - 1];
    (submitted instanceof Date && submitted > dayAgo ? fresh : older).push(entry);
  });

  if (!fresh.length && !older.length) return;

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
}

/** One email per day IF anything new landed on the Spam tab since the last
 *  digest — so false positives actually get reviewed. */
function spamDigest_() {
  var ss = SpreadsheetApp.getActive();
  var sheet = ss.getSheetByName(SPAM_SHEET);
  if (!sheet || sheet.getLastRow() < 2) return;
  var headerRow = ensureHeaders_(sheet);
  var cols = colMap_(headerRow);
  var values = sheet.getRange(2, 1, sheet.getLastRow() - 1, sheet.getLastColumn()).getValues();
  var reasonCol = headerRow.indexOf('Reason'); // 0-based, -1 if absent

  var props = PropertiesService.getScriptProperties();
  var last = Number(props.getProperty('spamDigestAt') || 0);
  var newest = last;
  var fresh = [];

  values.forEach(function (row) {
    var submitted = row[cols['Submitted'] - 1];
    if (!(submitted instanceof Date)) return;
    if (submitted.getTime() > newest) newest = submitted.getTime();
    if (submitted.getTime() <= last) return;
    fresh.push(
      '• ' + (row[cols['Name'] - 1] || '(no name)') + ' — ' + contactLine_(row, cols) + '\n' +
      '  Wedding date: ' + (fmtWeddingDate_(row[cols['Wedding Date'] - 1]) || '(none)') +
      '  ·  Caught: ' + fmtWhen_(submitted) +
      (reasonCol > -1 ? '\n  Why: ' + (row[reasonCol] || '') : '')
    );
  });

  if (!fresh.length) { props.setProperty('spamDigestAt', String(newest)); return; }

  sendMail_(
    fresh.length + ' new spam submission' + (fresh.length > 1 ? 's' : '') + ' — worth a quick look',
    'These were caught by the spam rules since the last digest. Real couples\n' +
    'are never deleted, so if one of these looks legitimate it just needs a\n' +
    'reply — everything they typed is on the Spam tab.\n\n' +
    fresh.join('\n') + '\n\n' +
    'Spam tab: ' + ss.getUrl()
  );
  props.setProperty('spamDigestAt', String(newest));
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
 *  first FOUR logs should be [] (real submissions pass — old form, email
 *  lead, text lead, both-channels lead), the rest non-empty. */
function testVet() {
  Logger.log(spamReasons_({
    name: 'Josh Pelham', email: 'jpelham03@gmail.com', date: '06/11/2028',
    aesthetic: 'Elevated Minimalist (clean, airy, restrained)', budget: '$25,000+',
    message: "idk but I'm happy to be married", k: FORM_TOKEN, ts: String(Date.now() - 30000)
  }));
  Logger.log(spamReasons_({ // new form, email channel
    name: 'Jordan & Sam', contact_method: 'Email', email: 'jpelham03@gmail.com',
    date: '06/11/2028', aesthetic: 'Wildflower Modern — wild, seasonal, editorial',
    budget: '$12,000–$18,000', k: FORM_TOKEN, ts: String(Date.now() - 30000)
  }));
  Logger.log(spamReasons_({ // new form, text channel — no email at all
    name: 'Jordan & Sam', contact_method: 'Text', phone: '775-555-0123',
    date: '06/11/2028', aesthetic: 'Lush & Romantic — rich, dramatic, deep tones',
    budget: '$8,000–$12,000', k: FORM_TOKEN, ts: String(Date.now() - 30000)
  }));
  Logger.log(spamReasons_({ // both channels checked
    name: 'Jordan & Sam', contact_method: 'Email, Text',
    email: 'jpelham03@gmail.com', phone: '775-555-0123',
    date: '06/11/2028', k: FORM_TOKEN, ts: String(Date.now() - 30000)
  }));
  Logger.log(spamReasons_({ // bot guessing the new fields wrong
    name: 'x', contact_method: 'Both', phone: '555-0123', date: '06/11/2028'
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
    aesthetic: 'Elevated Minimalist, clean, airy, restrained', budget: '$8,000–$12,000',
    message: 'Прывітанне, я хацеў даведацца Ваш прайс.'
  }));
}
