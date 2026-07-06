/* Golden Flowers inline site editor.
 *
 * Loads the live site in an iframe and makes every element carrying a
 * data-ed="file:dot.path" attribute click-to-edit. Saves write the changed
 * values back into _data/<file>.yml on GitHub (same files Pages CMS edits),
 * which triggers the normal Actions deploy.
 *
 * Query params: ?branch=<name> commits to a branch other than main;
 * ?dryrun=1 skips the commit and exposes results on window.__gfDryrun.
 */
import { parseDocument } from "https://cdn.jsdelivr.net/npm/yaml@2/+esm";

const CFG = window.GF_ED;
const params = new URLSearchParams(location.search);
const BRANCH = params.get("branch") || "main";
const DRYRUN = params.get("dryrun") === "1";
const API = `https://api.github.com/repos/${CFG.owner}/${CFG.repo}/contents/`;
const TOKEN_KEY = "gf_ed_token";

const frame = document.getElementById("ed-frame");
const saveBtn = document.getElementById("ed-save");
const discardBtn = document.getElementById("ed-discard");
const statusEl = document.getElementById("ed-status");
const pageEl = document.getElementById("ed-page");
const loginEl = document.getElementById("ed-login");
const loginForm = document.getElementById("ed-login-form");
const loginErr = document.getElementById("ed-login-err");
const tokenInput = document.getElementById("ed-token");

/* dirty[key] = new plain-text value with *asterisk* markup */
const dirty = new Map();

/* ---------- auth ---------- */

function token() { return localStorage.getItem(TOKEN_KEY) || ""; }

async function validateToken(t) {
  const r = await fetch(`https://api.github.com/repos/${CFG.owner}/${CFG.repo}`, {
    headers: { Authorization: `Bearer ${t}`, Accept: "application/vnd.github+json" },
  });
  return r.ok;
}

async function ensureAuth() {
  if (token() && (await validateToken(token()))) return;
  localStorage.removeItem(TOKEN_KEY);
  loginEl.hidden = false;
  tokenInput.focus();
}

loginForm.addEventListener("submit", async (e) => {
  e.preventDefault();
  loginErr.style.display = "none";
  const t = tokenInput.value.trim();
  if (!t) return;
  if (await validateToken(t)) {
    localStorage.setItem(TOKEN_KEY, t);
    loginEl.hidden = true;
  } else {
    loginErr.textContent = "That key didn't work. Check it and try again.";
    loginErr.style.display = "block";
  }
});

/* ---------- markup round-trip ---------- */

/* DOM subtree -> "text with *em* and **strong** markers" */
function serialize(node) {
  let out = "";
  for (const n of node.childNodes) {
    if (n.nodeType === Node.TEXT_NODE) {
      out += n.nodeValue;
    } else if (n.nodeType === Node.ELEMENT_NODE) {
      const tag = n.tagName;
      if (tag === "EM" || tag === "I") out += "*" + serialize(n) + "*";
      else if (tag === "STRONG" || tag === "B") out += "**" + serialize(n) + "**";
      else if (tag === "BR") out += " ";
      else out += serialize(n);
    }
  }
  return out;
}

function cleanValue(el) {
  return serialize(el).replace(/\u00A0/g, " ").replace(/\s+/g, " ").trim();
}

function escapeHtml(s) {
  return s.replace(/&/g, "&amp;").replace(/</g, "&lt;").replace(/>/g, "&gt;");
}

/* "text with *markers*" -> HTML matching what em.html renders */
function renderValue(v) {
  let h = escapeHtml(v);
  h = h.replace(/\*\*([^*]+)\*\*/g, "<strong>$1</strong>");
  h = h.replace(/\*([^*]+)\*/g, "<em>$1</em>");
  return h;
}

/* ---------- iframe wiring ---------- */

const FRAME_CSS = `
  [data-ed]{cursor:text;transition:outline-color .12s;outline:1px dashed transparent;outline-offset:3px;}
  [data-ed]:hover{outline-color:rgba(47,93,58,.75);background:rgba(47,93,58,.06);}
  [data-ed].gf-editing{outline:2px solid rgba(47,93,58,.95);background:rgba(47,93,58,.07);cursor:text;}
  [data-ed].gf-dirty{box-shadow:0 0 0 2px rgba(200,150,30,.45);}
`;

let editing = null;

function frameDoc() {
  try { return frame.contentDocument; } catch { return null; }
}

function startEdit(el) {
  if (editing === el) return;
  stopEdit();
  editing = el;
  /* baseline = the value currently on disk, captured before the first edit */
  if (el.dataset.gfBaseline === undefined && !dirty.has(el.getAttribute("data-ed"))) {
    el.dataset.gfBaseline = cleanValueOfHtml(el.innerHTML);
  }
  el.dataset.gfOriginal = el.innerHTML;
  el.classList.add("gf-editing");
  el.setAttribute("contenteditable", "true");
  el.focus();
}

function stopEdit(revert) {
  if (!editing) return;
  const el = editing;
  editing = null;
  el.removeAttribute("contenteditable");
  el.classList.remove("gf-editing");
  if (revert) {
    el.innerHTML = el.dataset.gfOriginal;
    delete el.dataset.gfOriginal;
    return;
  }
  const key = el.getAttribute("data-ed");
  const val = cleanValue(el);
  const doc = frameDoc();
  /* compare against a pristine render of what's on disk for this key */
  const before = el.dataset.gfBaseline !== undefined ? el.dataset.gfBaseline : cleanValueOfHtml(el.dataset.gfOriginal);
  if (val !== before) {
    dirty.set(key, val);
    doc && doc.querySelectorAll(`[data-ed="${CSS.escape(key)}"]`).forEach((n) => {
      n.classList.add("gf-dirty");
      if (n !== el) n.innerHTML = renderValue(val);
    });
  } else {
    dirty.delete(key);
    el.classList.remove("gf-dirty");
  }
  delete el.dataset.gfOriginal;
  refreshBar();
}

function cleanValueOfHtml(html) {
  const tmp = document.createElement("div");
  tmp.innerHTML = html;
  return cleanValue(tmp);
}

function hookFrame() {
  const doc = frameDoc();
  if (!doc || !doc.body) {
    statusEl.textContent = "Couldn't reach the page.";
    return;
  }
  const style = doc.createElement("style");
  style.textContent = FRAME_CSS;
  doc.head.appendChild(style);

  try { pageEl.textContent = doc.title || frame.contentWindow.location.pathname; } catch { pageEl.textContent = ""; }

  /* re-apply unsaved edits after in-site navigation */
  for (const [key, val] of dirty) {
    doc.querySelectorAll(`[data-ed="${CSS.escape(key)}"]`).forEach((n) => {
      n.innerHTML = renderValue(val);
      n.classList.add("gf-dirty");
    });
  }

  doc.addEventListener(
    "click",
    (e) => {
      const t = e.target.closest && e.target.closest("[data-ed]");
      if (t) {
        e.preventDefault();
        e.stopPropagation();
        startEdit(t);
      } else if (editing) {
        stopEdit();
      }
    },
    true
  );

  doc.addEventListener(
    "keydown",
    (e) => {
      if (!editing) return;
      if (e.key === "Enter") { e.preventDefault(); stopEdit(); }
      else if (e.key === "Escape") { e.preventDefault(); stopEdit(true); }
    },
    true
  );

  doc.addEventListener("paste", (e) => {
    if (!editing) return;
    e.preventDefault();
    const text = (e.clipboardData || window.clipboardData).getData("text/plain");
    frame.contentDocument.execCommand("insertText", false, text);
  }, true);

  doc.addEventListener("focusout", (e) => {
    if (editing && e.target === editing) stopEdit();
  }, true);
}

frame.addEventListener("load", hookFrame);
/* the iframe may already be loaded by the time this module runs */
if (frameDoc() && frameDoc().readyState === "complete" && frameDoc().body) hookFrame();

/* ---------- toolbar ---------- */

function refreshBar() {
  const n = dirty.size;
  saveBtn.disabled = n === 0;
  discardBtn.disabled = n === 0;
  saveBtn.textContent = n ? `Save (${n})` : "Save";
  if (n) { statusEl.textContent = "Unsaved changes"; statusEl.className = "ed-status"; }
  else if (!statusEl.classList.contains("ok")) statusEl.textContent = "";
}

discardBtn.addEventListener("click", () => {
  dirty.clear();
  refreshBar();
  statusEl.textContent = "";
  frame.contentWindow.location.reload();
});

window.addEventListener("beforeunload", (e) => {
  if (dirty.size) { e.preventDefault(); e.returnValue = ""; }
});

/* ---------- saving ---------- */

function b64encodeUtf8(str) {
  const bytes = new TextEncoder().encode(str);
  let bin = "";
  for (let i = 0; i < bytes.length; i += 0x8000) {
    bin += String.fromCharCode.apply(null, bytes.subarray(i, i + 0x8000));
  }
  return btoa(bin);
}

function b64decodeUtf8(b64) {
  const bin = atob(b64.replace(/\n/g, ""));
  const bytes = new Uint8Array(bin.length);
  for (let i = 0; i < bin.length; i++) bytes[i] = bin.charCodeAt(i);
  return new TextDecoder().decode(bytes);
}

function ghHeaders() {
  const h = { Accept: "application/vnd.github+json" };
  if (token()) h.Authorization = `Bearer ${token()}`;
  return h;
}

function keyPath(dotPath) {
  return dotPath.split(".").map((s) => (/^\d+$/.test(s) ? Number(s) : s));
}

async function saveFile(file, entries, attempt = 0) {
  const path = `_data/${file}.yml`;
  const getRes = await fetch(`${API}${path}?ref=${encodeURIComponent(BRANCH)}`, { headers: ghHeaders() });
  if (!getRes.ok) throw new Error(`Couldn't read ${path} (${getRes.status})`);
  const meta = await getRes.json();
  const doc = parseDocument(b64decodeUtf8(meta.content));

  for (const [dotPath, value] of entries) {
    const p = keyPath(dotPath);
    if (doc.getIn(p) === undefined) throw new Error(`"${dotPath}" not found in ${path} — it may have moved. Refresh and retry.`);
    doc.setIn(p, value);
  }

  if (DRYRUN) {
    window.__gfDryrun = window.__gfDryrun || {};
    window.__gfDryrun[path] = doc.toString();
    console.log(`[dryrun] would commit ${path}:\n` + doc.toString());
    return;
  }

  const putRes = await fetch(`${API}${path}`, {
    method: "PUT",
    headers: ghHeaders(),
    body: JSON.stringify({
      message: `Update site copy in ${path} via inline editor`,
      content: b64encodeUtf8(doc.toString()),
      sha: meta.sha,
      branch: BRANCH,
    }),
  });
  if (putRes.status === 409 && attempt === 0) return saveFile(file, entries, 1); // file changed under us: refetch and retry once
  if (!putRes.ok) throw new Error(`Couldn't save ${path} (${putRes.status})`);
}

saveBtn.addEventListener("click", async () => {
  if (!dirty.size) return;
  if (!DRYRUN && !token()) { await ensureAuth(); if (!token()) return; }

  saveBtn.disabled = true;
  discardBtn.disabled = true;
  statusEl.className = "ed-status";
  statusEl.textContent = "Saving…";

  /* group dirty keys by data file */
  const byFile = new Map();
  for (const [key, val] of dirty) {
    const i = key.indexOf(":");
    const file = key.slice(0, i);
    if (!byFile.has(file)) byFile.set(file, []);
    byFile.get(file).push([key.slice(i + 1), val]);
  }

  try {
    for (const [file, entries] of byFile) await saveFile(file, entries);
    dirty.clear();
    const doc = frameDoc();
    doc && doc.querySelectorAll(".gf-dirty").forEach((n) => n.classList.remove("gf-dirty"));
    refreshBar();
    statusEl.className = "ed-status ok";
    statusEl.textContent = DRYRUN ? "Dry run done — nothing committed" : "Saved ✓ Live in ~2 minutes";
  } catch (err) {
    statusEl.className = "ed-status err";
    statusEl.textContent = err.message;
    refreshBar();
  }
});

if (!DRYRUN) ensureAuth();
