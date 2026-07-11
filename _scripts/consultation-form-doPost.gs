/**
 * Golden Flowers consultation form — hardened intake, v2 (July 2026).
 *
 * Paste this into the Apps Script project attached to the leads spreadsheet
 * (Extensions -> Apps Script from the sheet), replacing everything currently
 * there, then Deploy -> Manage deployments -> Edit (pencil) -> New version.
 * Using "New version" on the EXISTING deployment keeps the same /exec URL —
 * no need to touch _config.yml.
 *
 * After deploying, run setupStaleTrigger() once from the editor (select it in
 * the function dropdown, click Run). That installs the 30-minute timer that
 * emails you about people who filled step 1 and never finished step 2. It'll
 * ask for authorization the first time — that's normal, it's your own script.
 *
 * What changed from v1:
 *   - A step-1 partial and its step-2 completion now update ONE row (matched
 *     by a client-generated lead_id) instead of appending two separate lines.
 *   - Real date validation: must be a real calendar date, and within a
 *     sane engagement window (not 37 years ago, not the year 7081).
 *   - Real email validation: format check, a blocklist of placeholder/burner
 *     domains (example.com, test.com, mailinator, etc.), and a live DNS
 *     lookup (Google's free public DNS-over-HTTPS API — no signup, no cost)
 *     confirming the domain can actually receive mail.
 *   - A honeypot field (gf_hp) and a "too fast to be human" timing check.
 *   - Lead source (utm_source/medium/campaign, or a guess from referrer) is
 *     recorded per lead.
 *   - New columns are appended after the existing 8 (Submitted..Message) so
 *     nothing already in the sheet shifts. Every read/write below is by
 *     header NAME, not column letter — you can drag columns into any order
 *     you like afterward without touching this script.
 *
 * Design goals, in priority order (unchanged from v1):
 *   1. Never lose a real lead. Nothing is ever discarded: submissions that
 *      fail the checks land on a "Spam" tab with all their data, so even a
 *      false positive is recoverable, not gone.
 *   2. Bots learn nothing. Rejected posts get the same success response as
 *      real ones, so the bot believes it worked and doesn't adapt.
 *   3. Every rule only rejects input the real form cannot physically
 *      produce, so a human using the site can never trip it.
 */

var NOTIFY_EMAIL = 'brittany@goldenflorals.com';

// Must match the value the JS sends. Posts without it are still accepted if
// otherwise clean (keeps the no-JS fallback working) — just tagged
// "(unverified)" in Status.
var FORM_TOKEN = 'gf-lupine-26';

// How long a step-1-only lead sits idle before you get a follow-up nudge.
var STALE_MINUTES = 30;

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
var HEADERS = [
  'Submitted', 'Status', 'Name', 'Email', 'Wedding Date', 'Aesthetic',
  'Budget', 'Message', 'Venue', 'Source', 'Page', 'Button',
  'Updated', 'Notified', 'Lead ID'
];

function doPost(e) {
  var p = (e && e.parameter) || {};
  var ss = SpreadsheetApp.getActive();
  var leadsSheet = ss.getSheets()[0];
  var headerRow = ensureHeaders_(leadsSheet);
  var cols = colMap_(headerRow);

  var isPartial = String(p.status || '') === 'partial';
  var reasons = spamReasons_(p);
  var now = new Date();

  if (reasons.length) {
    writeToSpam_(ss, p, isPartial, reasons, now);
    return success_();
  }

  var leadId = String(p.lead_id || '').trim();
  var existingRow = leadId ? findRowByLeadId_(leadsSheet, cols, leadId) : 0;

  if (existingRow) {
    var currentStatus = String(leadsSheet.getRange(existingRow, cols['Status']).getValue() || '');
    if (isPartial && /^Complete/.test(currentStatus)) {
      // A step-1 ping that arrived late (after step 2 already landed, e.g. a
      // network race from a fast double-tap) must never downgrade a
      // completed lead back to "in progress" or blank out its details.
      return success_();
    }
    writeRow_(leadsSheet, existingRow, cols,
      buildRowValues_(p, isPartial, leadsSheet.getRange(existingRow, cols['Submitted']).getValue(), now, leadId));
  } else {
    var newRow = leadsSheet.getLastRow() + 1;
    writeRow_(leadsSheet, newRow, cols, buildRowValues_(p, isPartial, now, now, leadId || genLeadIdFallback_()));
  }

  if (!isPartial) sendCompleteEmail_(p);

  return success_();
}

function success_() {
  return ContentService.createTextOutput(JSON.stringify({ result: 'success' }))
    .setMimeType(ContentService.MimeType.JSON);
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

function buildRowValues_(p, isPartial, submittedAt, updatedAt, leadId) {
  return {
    'Submitted': submittedAt,
    'Updated': updatedAt,
    'Status': statusLabel_(p, isPartial),
    'Name': p.name || '',
    'Email': p.email || '',
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
  var spamSheet = ss.getSheetByName('Spam') || ss.insertSheet('Spam');
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

  // The live form marks name + email required, so posts missing either
  // never came from the form.
  if (!name) r.push('missing name');
  if (!email) {
    r.push('missing email');
  } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/.test(email)) {
    r.push('bad email format');
  } else {
    var domain = email.split('@')[1].toLowerCase();
    if (PLACEHOLDER_DOMAINS.indexOf(domain) !== -1) {
      r.push('placeholder email domain');
    } else if (!domainReceivesMail_(domain)) {
      r.push('email domain cannot receive mail');
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
  if (email && floodCount_(email) > 6) r.push('flood');

  return r;
}

// Rolling per-email counter; the 10-minute window renews on every hit, so a
// sustained bot stays counted while a couple returning tomorrow starts fresh.
function floodCount_(email) {
  var cache = CacheService.getScriptCache();
  var key = 'n:' + email.toLowerCase();
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
  // That data still lands in the sheet (Source / Page / Button columns).
  var body = [
    'Name: ' + (p.name || ''),
    'Email: ' + (p.email || ''),
    'Wedding date: ' + (p.date || ''),
    'Venue: ' + (venueValue_(p) || '(not given)'),
    'Aesthetic: ' + (p.aesthetic || ''),
    'Budget: ' + (p.budget || ''),
    '',
    'Message:',
    p.message || '(none)'
  ].join('\n');
  GmailApp.sendEmail(NOTIFY_EMAIL, subject, body);
}

/** Time-driven trigger (install once via setupStaleTrigger). Emails a single
 *  batched digest of everyone who finished step 1 and went quiet, so you're
 *  not pinged once per abandoned form. */
function notifyStalePartials() {
  var sheet = SpreadsheetApp.getActive().getSheets()[0];
  var lastRow = sheet.getLastRow();
  if (lastRow < 2) return;
  var headerRow = ensureHeaders_(sheet);
  var cols = colMap_(headerRow);
  var values = sheet.getRange(2, 1, lastRow - 1, headerRow.length).getValues();
  var cutoff = new Date(Date.now() - STALE_MINUTES * 60000);
  var stale = [];

  values.forEach(function (row, i) {
    var status = String(row[cols['Status'] - 1] || '');
    var notified = String(row[cols['Notified'] - 1] || '');
    var updated = row[cols['Updated'] - 1];
    // "In progress" is the pre-July-2026 wording; matched so old rows still digest.
    if (/^(Step 1 only|In progress)/.test(status) && notified !== 'Y' && updated instanceof Date && updated < cutoff) {
      stale.push({
        rowNum: i + 2,
        name: row[cols['Name'] - 1],
        email: row[cols['Email'] - 1],
        date: row[cols['Wedding Date'] - 1],
        updated: updated
      });
    }
  });

  if (!stale.length) return;

  var body = stale.map(function (s) {
    return '- ' + (s.name || '(no name)') + ' <' + (s.email || 'no email') + '>' +
      (s.date ? '  ·  wanting ' + s.date : '') +
      '  ·  started ' + Utilities.formatDate(s.updated, Session.getScriptTimeZone(), 'MMM d, h:mm a');
  }).join('\n');

  GmailApp.sendEmail(
    NOTIFY_EMAIL,
    stale.length + ' partial consult submission' + (stale.length > 1 ? 's' : '') + ' — never finished step 2',
    'These people filled in step 1 (name/email/date) ' + STALE_MINUTES + '+ minutes ago and never completed the form:\n\n' +
    body + '\n\nMight be worth a friendly nudge email if you want to follow up.'
  );

  stale.forEach(function (s) { sheet.getRange(s.rowNum, cols['Notified']).setValue('Y'); });
}

/** Run once from the editor after deploying. Installs (or re-installs) the
 *  30-minute timer that powers notifyStalePartials. Safe to re-run. */
function setupStaleTrigger() {
  ScriptApp.getProjectTriggers().forEach(function (t) {
    if (t.getHandlerFunction() === 'notifyStalePartials') ScriptApp.deleteTrigger(t);
  });
  ScriptApp.newTrigger('notifyStalePartials').timeBased().everyMinutes(30).create();
}

/** Run this in the editor (Run -> testVet) to sanity-check the rules: the
 *  first log should be [] (a real submission passes), the rest non-empty. */
function testVet() {
  Logger.log(spamReasons_({
    name: 'Josh Pelham', email: 'jpelham03@gmail.com', date: '06/11/2028',
    aesthetic: 'Elevated Minimalist (clean, airy, restrained)', budget: '$25,000+',
    message: "idk but I'm happy to be married", k: FORM_TOKEN, ts: String(Date.now() - 30000)
  }));
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
