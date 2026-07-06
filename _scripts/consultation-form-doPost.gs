/**
 * Golden Flowers consultation form — hardened intake (July 2026).
 *
 * Paste this into the Apps Script project attached to the leads spreadsheet
 * (Extensions → Apps Script from the sheet), replacing the existing doPost.
 * IMPORTANT: if the current doPost does anything besides appendRow — e.g. it
 * emails Brittany on each submission — copy those lines into the spot marked
 * "EXISTING EXTRAS" below before replacing.
 *
 * Design goals, in priority order:
 *   1. Never lose a real lead. Nothing is ever discarded: submissions that
 *      fail the checks land on a "Spam" tab with all their data, so even a
 *      false positive is recoverable, not gone.
 *   2. Bots learn nothing. Rejected posts get the same success response as
 *      real ones, so the bot believes it worked and doesn't adapt.
 *   3. Every rule below only rejects input the real form cannot physically
 *      produce (dropdowns, the date mask, required fields), so a human using
 *      the site can never trip them.
 */

// Must match the value appended in _includes/redesign-consult-js.html.
// Posts without it are still accepted if otherwise clean (keeps the no-JS
// fallback path working) — they're just tagged "(unverified)" in Status.
var FORM_TOKEN = 'gf-lupine-26';

// Exact strings the two dropdowns can produce. The modal and the contact page
// phrase the aesthetic options slightly differently, so both variants appear.
var AESTHETICS = [
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

function doPost(e) {
  var p = (e && e.parameter) || {};
  var reasons = spamReasons_(p);

  var status = String(p.status || '') === 'partial' ? 'Step 1 only' : 'Complete';
  if (String(p.k || '') !== FORM_TOKEN) status += ' (unverified)';

  var row = [new Date(), status,
             p.name || '', p.email || '', p.date || '',
             p.aesthetic || '', p.budget || '', p.message || ''];

  var ss = SpreadsheetApp.getActive();
  if (reasons.length) {
    var spamSheet = ss.getSheetByName('Spam') || ss.insertSheet('Spam');
    row[1] = reasons.join('; ');
    spamSheet.appendRow(row);
  } else {
    ss.getSheets()[0].appendRow(row); // leads tab (first tab in the spreadsheet)
    // EXISTING EXTRAS: if the old doPost sent a notification email or similar,
    // that code belongs here so it only fires for real submissions.
  }

  // Same response either way — bots must not be able to tell they were binned.
  return ContentService.createTextOutput(JSON.stringify({ result: 'success' }))
    .setMimeType(ContentService.MimeType.JSON);
}

function spamReasons_(p) {
  var r = [];
  var name = String(p.name || '').trim();
  var email = String(p.email || '').trim();
  var date = String(p.date || '').trim();
  var aesthetic = String(p.aesthetic || '').trim();
  var budget = String(p.budget || '').trim();

  // The live form marks name + email required and the browser enforces a
  // valid email shape, so posts missing either never came from the form.
  if (!name) r.push('missing name');
  if (!/^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/.test(email)) r.push('bad email');

  // The date input is masked to digits and slashes — anything else (like the
  // "+ 2 BTC" text in the July spam wave) cannot be typed into it.
  if (date && !/^[\d\/\s]*$/.test(date)) r.push('bad date');

  // Dropdowns can only submit their exact option strings (or empty).
  if (aesthetic && AESTHETICS.indexOf(aesthetic) === -1) r.push('bad aesthetic');
  if (budget && BUDGETS.indexOf(budget) === -1) r.push('bad budget');

  // Crypto-spam vocabulary and links in fields where they can never
  // legitimately appear. Deliberately NOT applied to the message field,
  // where a real couple might paste a venue or Pinterest link.
  if (/btc|bitcoin|crypto|withdraw|https?:|www\./i.test(name + ' ' + date)) {
    r.push('spam keywords');
  }

  // Flood control. A real visit produces at most 2 posts (step-1 partial +
  // complete); even a redo is 4. The bot ran at ~10 per minute.
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

/** Run this in the editor (Run → testVet) to sanity-check the rules:
 *  first log should be [] (a real submission passes), the rest non-empty. */
function testVet() {
  Logger.log(spamReasons_({ name: 'Josh Pelham', email: 'jpelham03@gmail.com',
    date: '06/11/2028', aesthetic: 'Elevated Minimalist (clean, airy, restrained)',
    budget: '$25,000+', message: "idk but I'm happy to be married", k: FORM_TOKEN }));
  Logger.log(spamReasons_({ name: 'g6c2xl', email: '96b0fvr6ra06pq@web-library.net',
    date: '📈 + 2 BTC. Sign In', message: '83wosy' }));
  Logger.log(spamReasons_({ name: 'x', email: 'not-an-email', date: '12/31/2028' }));
}
