/* Golden Flowers inline site editor.
 *
 * Loads the live site in an iframe and makes three kinds of things editable:
 *   - data-ed="file:dot.path" spans: page copy stored in _data/<file>.yml
 *     (same files Pages CMS edits)
 *   - data-ed-fm="field" data-ed-src="path" spans: a front-matter field of a
 *     blog post (the title)
 *   - data-ed-post="path" article: the whole body of a blog post, edited in
 *     place and saved back as clean HTML
 * The toolbar can also create and delete blog posts. Every save commits to
 * GitHub, which triggers the normal Actions deploy.
 *
 * Query params: ?branch=<name> commits to a branch other than main;
 * ?dryrun=1 skips the commit and exposes results on window.__gfDryrun.
 */
import { parseDocument, stringify } from "https://cdn.jsdelivr.net/npm/yaml@2/+esm";

const CFG = window.GF_ED;
const params = new URLSearchParams(location.search);
const BRANCH = params.get("branch") || "main";
const DRYRUN = params.get("dryrun") === "1";
const API = `https://api.github.com/repos/${CFG.owner}/${CFG.repo}/contents/`;
const TOKEN_KEY = "gf_ed_token";

const frame = document.getElementById("ed-frame");
const saveBtn = document.getElementById("ed-save");
const discardBtn = document.getElementById("ed-discard");
const newBtn = document.getElementById("ed-new");
const delBtn = document.getElementById("ed-del");
const photosBtn = document.getElementById("ed-photos");
const imginsBtn = document.getElementById("ed-imgins");
const phModal = document.getElementById("ed-ph-modal");
const phTitle = document.getElementById("ed-ph-title");
const phGrid = document.getElementById("ed-ph-grid");
const phStatus = document.getElementById("ed-ph-status");
const phAdd = document.getElementById("ed-ph-add");
const phClose = document.getElementById("ed-ph-close");
const repModal = document.getElementById("ed-rep-modal");
const repForm = document.getElementById("ed-rep-form");
const repPreview = document.getElementById("ed-rep-preview");
const repErr = document.getElementById("ed-rep-err");
const repCancel = document.getElementById("ed-rep-cancel");
const repGalWrap = document.getElementById("ed-rep-gal-wrap");
const repGalLabel = document.getElementById("ed-rep-gal-label");
const repGal = document.getElementById("ed-rep-gal");
const fileInput = document.getElementById("ed-file");
const filesInput = document.getElementById("ed-files");
const statusEl = document.getElementById("ed-status");
const pageEl = document.getElementById("ed-page");
const loginEl = document.getElementById("ed-login");
const loginForm = document.getElementById("ed-login-form");
const loginErr = document.getElementById("ed-login-err");
const tokenInput = document.getElementById("ed-token");
const newModal = document.getElementById("ed-new-modal");
const newForm = document.getElementById("ed-new-form");
const newTitle = document.getElementById("ed-new-title");
const newDesc = document.getElementById("ed-new-desc");
const newErr = document.getElementById("ed-new-err");
const newCancel = document.getElementById("ed-new-cancel");

/* dirty[key] = new plain-text value with *asterisk* markup */
const dirty = new Map();
/* postDirty[path] = { title?, body? } — pending edits to a _posts file */
const postDirty = new Map();
/* postBaseline[path] = { title?, body? } — what was on disk before editing */
const postBaseline = new Map();

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

/* ---------- markup round-trip (data-ed spans) ---------- */

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

function cleanValueOfHtml(html) {
  const tmp = document.createElement("div");
  tmp.innerHTML = html;
  return cleanValue(tmp);
}

/* ---------- post body round-trip ---------- */

/* Tags that survive a body save; everything else is unwrapped. */
const POST_TAGS = new Set([
  "H2", "H3", "H4", "P", "BR", "HR", "UL", "OL", "LI", "A", "STRONG", "EM",
  "IMG", "BLOCKQUOTE", "FIGURE", "FIGCAPTION", "TABLE", "THEAD", "TBODY", "TR", "TH", "TD",
]);
const POST_ATTRS = {
  A: ["href", "target", "rel"],
  IMG: ["src", "alt", "loading"],
  TD: ["colspan", "rowspan"],
  TH: ["colspan", "rowspan"],
};
const BLOCKISH = /^(H[1-6]|P|DIV|UL|OL|LI|BLOCKQUOTE|FIGURE|TABLE|HR|SECTION|ARTICLE)$/;

function normalizeTree(parent) {
  let n = parent.firstChild;
  while (n) {
    const next = n.nextSibling;
    if (n.nodeType === Node.COMMENT_NODE) {
      n.remove();
    } else if (n.nodeType === Node.ELEMENT_NODE) {
      normalizeTree(n);
      let tag = n.tagName;
      if (tag === "B" || tag === "I") {
        const repl = n.ownerDocument.createElement(tag === "B" ? "strong" : "em");
        while (n.firstChild) repl.appendChild(n.firstChild);
        n.replaceWith(repl);
      } else if (tag === "H1") {
        const repl = n.ownerDocument.createElement("h2");
        while (n.firstChild) repl.appendChild(n.firstChild);
        n.replaceWith(repl);
      } else if (!POST_TAGS.has(tag)) {
        const hasBlockChild = [...n.children].some((c) => BLOCKISH.test(c.tagName));
        if (tag === "DIV" && !hasBlockChild && n.textContent.trim()) {
          /* contenteditable's default line container -> paragraph */
          const p = n.ownerDocument.createElement("p");
          while (n.firstChild) p.appendChild(n.firstChild);
          n.replaceWith(p);
        } else {
          n.replaceWith(...n.childNodes);
        }
      } else {
        for (const a of [...n.attributes]) {
          const keep = POST_ATTRS[tag];
          if (!keep || !keep.includes(a.name.toLowerCase())) n.removeAttribute(a.name);
        }
        /* pasted links can carry script-executing schemes; keep only web/mail links */
        if (tag === "A" && n.hasAttribute("href") && !/^(https?:|mailto:|tel:|[/#])/i.test(n.getAttribute("href").trim())) {
          n.removeAttribute("href");
        }
        if (tag === "P" && !n.textContent.trim() && !n.querySelector("img")) n.remove();
      }
    }
    n = next;
  }
}

/* article DOM -> clean HTML string for the _posts file */
function cleanPostHtml(articleEl) {
  const tmp = document.createElement("div");
  tmp.innerHTML = articleEl.innerHTML;
  normalizeTree(tmp);
  return tmp.innerHTML
    .replace(/<\/(p|h2|h3|h4|ul|ol|blockquote|figure|table)>\s*/gi, "</$1>\n\n")
    .trim();
}

/* ---------- dirty bookkeeping ---------- */

function dirtyCount() {
  let n = dirty.size;
  for (const v of postDirty.values()) n += Object.keys(v).length;
  return n;
}

function setPostField(path, field, value, baseline) {
  const cur = postDirty.get(path) || {};
  if (value === baseline) {
    delete cur[field];
    if (Object.keys(cur).length === 0) postDirty.delete(path);
    else postDirty.set(path, cur);
    return false;
  }
  cur[field] = value;
  postDirty.set(path, cur);
  return true;
}

/* ---------- iframe wiring ---------- */

const ED_SEL = "[data-ed],[data-ed-fm]";
const FRAME_CSS = `
  [data-ed],[data-ed-fm]{cursor:text;transition:outline-color .12s;outline:1px dashed transparent;outline-offset:3px;}
  [data-ed]:hover,[data-ed-fm]:hover{outline-color:rgba(47,93,58,.75);background:rgba(47,93,58,.06);}
  [data-ed-post]{transition:outline-color .12s;outline:1px dashed transparent;outline-offset:6px;}
  [data-ed-post]:hover{outline-color:rgba(47,93,58,.45);}
  .gf-editing{outline:2px solid rgba(47,93,58,.95) !important;background:rgba(47,93,58,.05);cursor:text;}
  .gf-dirty{box-shadow:0 0 0 2px rgba(200,150,30,.45);}
  img:hover{outline:2px dashed rgba(47,93,58,.55);outline-offset:-2px;cursor:pointer;}
  [data-ed-post] img:hover{outline:none;cursor:text;}
`;

/* current page context, set on every iframe load */
let curPage = "";
let curGallery = null;
let lastRange = null;

let editing = null;

function frameDoc() {
  try { return frame.contentDocument; } catch { return null; }
}

function isPostBody(el) { return el.hasAttribute("data-ed-post"); }

function startEdit(el) {
  if (editing === el) return;
  stopEdit();
  editing = el;
  if (isPostBody(el)) {
    const path = el.getAttribute("data-ed-post");
    const base = postBaseline.get(path) || {};
    if (base.body === undefined && !(postDirty.get(path) || {}).body) {
      base.body = cleanPostHtml(el);
      postBaseline.set(path, base);
    }
    try { el.ownerDocument.execCommand("defaultParagraphSeparator", false, "p"); } catch {}
  } else {
    /* baseline = the value currently on disk, captured before the first edit */
    const fmField = el.getAttribute("data-ed-fm");
    const key = fmField ? el.getAttribute("data-ed-src") + "#" + fmField : el.getAttribute("data-ed");
    const alreadyDirty = fmField
      ? (postDirty.get(el.getAttribute("data-ed-src")) || {})[fmField] !== undefined
      : dirty.has(key);
    if (el.dataset.gfBaseline === undefined && !alreadyDirty) {
      el.dataset.gfBaseline = cleanValueOfHtml(el.innerHTML);
    }
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

  if (isPostBody(el)) {
    const path = el.getAttribute("data-ed-post");
    const changed = setPostField(path, "body", cleanPostHtml(el), (postBaseline.get(path) || {}).body);
    el.classList.toggle("gf-dirty", changed);
    delete el.dataset.gfOriginal;
    refreshBar();
    return;
  }

  const val = cleanValue(el);
  const before = el.dataset.gfBaseline !== undefined ? el.dataset.gfBaseline : cleanValueOfHtml(el.dataset.gfOriginal);
  const doc = frameDoc();
  const fmField = el.getAttribute("data-ed-fm");

  if (fmField) {
    const path = el.getAttribute("data-ed-src");
    const changed = setPostField(path, fmField, val, before);
    el.classList.toggle("gf-dirty", changed);
  } else {
    const key = el.getAttribute("data-ed");
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
  }
  delete el.dataset.gfOriginal;
  refreshBar();
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
  delBtn.hidden = !doc.querySelector("[data-ed-post]");
  imginsBtn.hidden = delBtn.hidden;
  curPage = doc.body.getAttribute("data-ed-page") || "";
  const gal = doc.querySelector("[data-ed-gallery]");
  curGallery = gal ? {
    slug: gal.getAttribute("data-ed-gallery"),
    hero: gal.getAttribute("data-ed-ghero"),
    name: gal.getAttribute("data-ed-gname"),
  } : null;
  photosBtn.hidden = !curGallery;
  wedRmBtn.hidden = !curGallery;
  styleBtn.hidden = !curGallery;
  lastRange = null;
  doc.addEventListener("selectionchange", () => {
    const sel = doc.getSelection();
    if (sel && sel.rangeCount && editing && isPostBody(editing) && editing.contains(sel.anchorNode)) {
      lastRange = sel.getRangeAt(0).cloneRange();
    }
  });

  /* re-apply unsaved edits after in-site navigation */
  for (const [key, val] of dirty) {
    doc.querySelectorAll(`[data-ed="${CSS.escape(key)}"]`).forEach((n) => {
      n.innerHTML = renderValue(val);
      n.classList.add("gf-dirty");
    });
  }
  for (const [path, edits] of postDirty) {
    if (edits.body !== undefined) {
      const art = doc.querySelector(`[data-ed-post="${CSS.escape(path)}"]`);
      if (art) { art.innerHTML = edits.body; art.classList.add("gf-dirty"); }
    }
    if (edits.title !== undefined) {
      const t = doc.querySelector(`[data-ed-fm="title"][data-ed-src="${CSS.escape(path)}"]`);
      if (t) { t.textContent = edits.title; t.classList.add("gf-dirty"); }
    }
  }

  doc.addEventListener(
    "click",
    (e) => {
      const t = e.target.closest && e.target.closest(ED_SEL);
      if (t) {
        e.preventDefault();
        e.stopPropagation();
        startEdit(t);
        return;
      }
      const body = e.target.closest && e.target.closest("[data-ed-post]");
      if (body) {
        if (e.target.closest("a")) e.preventDefault();
        startEdit(body);
        return;
      }
      const img = e.target.closest && e.target.closest("img");
      if (img && img.closest("[data-ed-gallery]")) {
        e.preventDefault();
        e.stopPropagation();
        if (editing) stopEdit();
        openPhotos();
        return;
      }
      if (img) {
        e.preventDefault();
        e.stopPropagation();
        if (editing) stopEdit();
        openReplace(img);
        return;
      }
      if (editing) stopEdit();
    },
    true
  );

  doc.addEventListener(
    "keydown",
    (e) => {
      if (!editing) return;
      if (e.key === "Escape") { e.preventDefault(); stopEdit(true); }
      /* Enter commits single-line fields; inside a post body it makes a new paragraph */
      else if (e.key === "Enter" && !isPostBody(editing)) { e.preventDefault(); stopEdit(); }
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

/* Hook each new document as soon as its DOM is ready (not after every photo
 * finishes loading). The document object changes identity on navigation. */
let hookedDoc = null;
setInterval(() => {
  const doc = frameDoc();
  if (doc && doc !== hookedDoc && doc.body && doc.readyState !== "loading") {
    hookedDoc = doc;
    hookFrame();
  }
}, 200);

/* ---------- toolbar ---------- */

function refreshBar() {
  const n = dirtyCount();
  saveBtn.disabled = n === 0;
  discardBtn.disabled = n === 0;
  saveBtn.textContent = n ? `Save (${n})` : "Save";
  if (n) { statusEl.textContent = "Unsaved changes"; statusEl.className = "ed-status"; }
  else if (!statusEl.classList.contains("ok")) statusEl.textContent = "";
}

discardBtn.addEventListener("click", () => {
  dirty.clear();
  postDirty.clear();
  postBaseline.clear();
  refreshBar();
  statusEl.textContent = "";
  frame.contentWindow.location.reload();
});

window.addEventListener("beforeunload", (e) => {
  if (dirtyCount()) { e.preventDefault(); e.returnValue = ""; }
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

async function getFile(path) {
  /* no-store: GitHub's contents API allows 60s of browser caching, which made
   * read-after-write checks (e.g. "is this photo still used?") see stale files */
  const r = await fetch(`${API}${path}?ref=${encodeURIComponent(BRANCH)}`, { headers: ghHeaders(), cache: "no-store" });
  if (!r.ok) throw new Error(`Couldn't read ${path} (${r.status})`);
  return r.json();
}

async function putFile(path, message, content, sha) {
  if (DRYRUN) {
    window.__gfDryrun = window.__gfDryrun || {};
    window.__gfDryrun[path] = content;
    console.log(`[dryrun] would commit ${path}:\n` + content);
    return { ok: true, status: 200 };
  }
  const body = { message, content: b64encodeUtf8(content), branch: BRANCH };
  if (sha) body.sha = sha;
  return fetch(`${API}${path}`, { method: "PUT", headers: ghHeaders(), body: JSON.stringify(body) });
}

async function saveFile(file, entries, attempt = 0) {
  const path = `_data/${file}.yml`;
  const meta = await getFile(path);
  const doc = parseDocument(b64decodeUtf8(meta.content));

  for (const [dotPath, value] of entries) {
    const p = keyPath(dotPath);
    if (doc.getIn(p) === undefined) throw new Error(`"${dotPath}" not found in ${path} — it may have moved. Refresh and retry.`);
    doc.setIn(p, value);
  }

  const res = await putFile(path, `Update site copy in ${path} via inline editor`, doc.toString(), meta.sha);
  if (res.status === 409 && attempt === 0) return saveFile(file, entries, 1); // file changed under us: refetch and retry once
  if (!res.ok) throw new Error(`Couldn't save ${path} (${res.status})`);
}

async function savePostFile(path, edits, attempt = 0) {
  const meta = await getFile(path);
  const raw = b64decodeUtf8(meta.content);
  const m = raw.match(/^---\r?\n([\s\S]*?)\r?\n---\r?\n?/);
  if (!m) throw new Error(`${path} doesn't look like a blog post.`);
  let fmText = m[1];
  let body = raw.slice(m[0].length);

  if (edits.title !== undefined) {
    const fmDoc = parseDocument(fmText);
    fmDoc.setIn(["title"], edits.title);
    fmText = fmDoc.toString().replace(/\n+$/, "");
  }
  if (edits.body !== undefined) body = edits.body + "\n";

  const out = `---\n${fmText}\n---\n\n${body.replace(/^\n+/, "")}`;
  const res = await putFile(path, `Update blog post ${path.replace(/^_posts\//, "")} via inline editor`, out, meta.sha);
  if (res.status === 409 && attempt === 0) return savePostFile(path, edits, 1);
  if (!res.ok) throw new Error(`Couldn't save ${path} (${res.status})`);
}

saveBtn.addEventListener("click", async () => {
  if (!dirtyCount()) return;
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
    for (const [path, edits] of postDirty) await savePostFile(path, edits);
    dirty.clear();
    postDirty.clear();
    postBaseline.clear();
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

/* ---------- new & delete post ---------- */

function slugify(t) {
  return t.toLowerCase()
    .replace(/['’]/g, "")
    .replace(/&/g, " and ")
    .replace(/[^a-z0-9]+/g, "-")
    .replace(/^-+|-+$/g, "")
    .slice(0, 60) || "post";
}

function localDateStr() {
  const d = new Date();
  const p = (x) => String(x).padStart(2, "0");
  return `${d.getFullYear()}-${p(d.getMonth() + 1)}-${p(d.getDate())}`;
}

newBtn.addEventListener("click", () => {
  newErr.style.display = "none";
  newModal.hidden = false;
  newTitle.focus();
});

newCancel.addEventListener("click", () => { newModal.hidden = true; });

newForm.addEventListener("submit", async (e) => {
  e.preventDefault();
  newErr.style.display = "none";
  const title = newTitle.value.trim();
  if (!title) return;
  if (!DRYRUN && !token()) { newModal.hidden = true; await ensureAuth(); return; }

  const slug = slugify(title);
  const date = localDateStr();
  const path = `_posts/${date}-${slug}.md`;
  const fm = stringify({
    layout: "post",
    title,
    date,
    permalink: `/blog/${slug}/`,
    description: newDesc.value.trim(),
  });
  const content = `---\n${fm}---\n\n<p>Write your post here.</p>\n`;

  try {
    const res = await putFile(path, `New blog post: ${title}`, content);
    if (res.status === 422) throw new Error("A post with that name already exists — pick a different title.");
    if (!res.ok) throw new Error(`Couldn't create the post (${res.status}).`);
    newModal.hidden = true;
    newTitle.value = "";
    newDesc.value = "";
    statusEl.className = "ed-status ok";
    statusEl.textContent = DRYRUN
      ? "Dry run done — nothing committed"
      : `Post created ✓ In ~2 minutes it will be at /blog/${slug}/ — open it there to write it.`;
  } catch (err) {
    newErr.textContent = err.message;
    newErr.style.display = "block";
  }
});

/* Adds urlPath to a page's redirect_from front matter, returning the new file
 * text (deletions must never 404 — user mandate). */
function withRedirect(raw, urlPath, label) {
  const m = raw.match(/^---\r?\n([\s\S]*?)\r?\n---\r?\n?/);
  if (!m) throw new Error(`${label} has no front matter — redirect not added.`);
  const fmDoc = parseDocument(m[1]);
  const existing = fmDoc.toJS().redirect_from || [];
  if (existing.includes(urlPath)) return raw;
  if (fmDoc.has("redirect_from")) fmDoc.addIn(["redirect_from"], urlPath);
  else fmDoc.set("redirect_from", [urlPath]);
  return `---\n${fmDoc.toString().replace(/\n+$/, "")}\n---\n\n${raw.slice(m[0].length).replace(/^\n+/, "")}`;
}

/* Keep a deleted post's URL working: send it to /blog via jekyll-redirect-from
 * on blog/index.md, committed before the post itself is removed. */
async function addBlogRedirect(urlPath, attempt = 0) {
  const path = "blog/index.md";
  const meta = await getFile(path);
  const out = withRedirect(b64decodeUtf8(meta.content), urlPath, path);
  const res = await putFile(path, `Redirect ${urlPath} to /blog (post deleted via inline editor)`, out, meta.sha);
  if (res.status === 409 && attempt === 0) return addBlogRedirect(urlPath, 1);
  if (!res.ok) throw new Error(`Couldn't add the redirect (${res.status})`);
}

delBtn.addEventListener("click", async () => {
  const doc = frameDoc();
  const art = doc && doc.querySelector("[data-ed-post]");
  if (!art) return;
  const path = art.getAttribute("data-ed-post");
  const title = art.getAttribute("data-ed-title") || path;
  if (!window.confirm(`Delete the post "${title}"?\n\nIt will be removed from the site, and its old address will redirect to the blog. This can't be undone from here.`)) return;
  if (!DRYRUN && !token()) { await ensureAuth(); if (!token()) return; }

  let postUrl = "";
  try { postUrl = frame.contentWindow.location.pathname; } catch {}

  statusEl.className = "ed-status";
  statusEl.textContent = "Deleting…";
  try {
    if (postUrl && postUrl !== "/") await addBlogRedirect(postUrl);
    const meta = await getFile(path);
    if (DRYRUN) {
      console.log(`[dryrun] would delete ${path}`);
    } else {
      const res = await fetch(`${API}${path}`, {
        method: "DELETE",
        headers: ghHeaders(),
        body: JSON.stringify({ message: `Delete blog post ${path.replace(/^_posts\//, "")} via inline editor`, sha: meta.sha, branch: BRANCH }),
      });
      if (!res.ok) throw new Error(`Couldn't delete the post (${res.status}).`);
    }
    postDirty.delete(path);
    postBaseline.delete(path);
    refreshBar();
    statusEl.className = "ed-status ok";
    statusEl.textContent = DRYRUN ? "Dry run done — nothing deleted" : "Post deleted ✓ It disappears from the site in ~2 minutes";
    frame.src = `${CFG.baseurl}/blog`;
  } catch (err) {
    statusEl.className = "ed-status err";
    statusEl.textContent = err.message;
  }
});

/* ---------- photos: shared plumbing ---------- */

const GITAPI = `https://api.github.com/repos/${CFG.owner}/${CFG.repo}/git/`;

/* One commit for any mix of binary uploads, text edits and deletions.
 * files: [{ path, base64 }] | [{ path, text }] | [{ path, del: true }] */
async function commitFiles(files, message, attempt = 0) {
  if (DRYRUN) {
    window.__gfDryrun = window.__gfDryrun || {};
    for (const f of files) {
      window.__gfDryrun[f.path] = f.del ? "(deleted)" : (f.text !== undefined ? f.text : `(binary, ${f.base64.length} b64 chars)`);
      console.log(`[dryrun] would commit ${f.path}${f.del ? " (delete)" : ""}`);
    }
    return;
  }
  const refRes = await fetch(`${GITAPI}refs/heads/${encodeURIComponent(BRANCH)}`, { headers: ghHeaders() });
  if (!refRes.ok) throw new Error(`Couldn't read the site (${refRes.status})`);
  const headSha = (await refRes.json()).object.sha;
  const baseTree = (await (await fetch(`${GITAPI}commits/${headSha}`, { headers: ghHeaders() })).json()).tree.sha;

  const tree = [];
  for (const f of files) {
    if (f.del) {
      tree.push({ path: f.path, mode: "100644", type: "blob", sha: null });
    } else {
      const body = f.text !== undefined
        ? { content: f.text, encoding: "utf-8" }
        : { content: f.base64, encoding: "base64" };
      const blobRes = await fetch(`${GITAPI}blobs`, { method: "POST", headers: ghHeaders(), body: JSON.stringify(body) });
      if (!blobRes.ok) throw new Error(`Upload failed (${blobRes.status})`);
      tree.push({ path: f.path, mode: "100644", type: "blob", sha: (await blobRes.json()).sha });
    }
  }
  const treeRes = await fetch(`${GITAPI}trees`, { method: "POST", headers: ghHeaders(), body: JSON.stringify({ base_tree: baseTree, tree }) });
  if (!treeRes.ok) throw new Error(`Save failed (${treeRes.status})`);
  const commitRes = await fetch(`${GITAPI}commits`, {
    method: "POST", headers: ghHeaders(),
    body: JSON.stringify({ message, tree: (await treeRes.json()).sha, parents: [headSha] }),
  });
  if (!commitRes.ok) throw new Error(`Save failed (${commitRes.status})`);
  const patchRes = await fetch(`${GITAPI}refs/heads/${encodeURIComponent(BRANCH)}`, {
    method: "PATCH", headers: ghHeaders(),
    body: JSON.stringify({ sha: (await commitRes.json()).sha }),
  });
  /* someone else committed while we worked: redo on the new head, once */
  if ((patchRes.status === 409 || patchRes.status === 422) && attempt === 0) return commitFiles(files, message, 1);
  if (!patchRes.ok) throw new Error(`Save failed (${patchRes.status})`);
}

/* photo file -> resized JPEG, longest edge maxEdge (matches the site's derivatives) */
async function processImage(file, maxEdge = 2000, quality = 0.82) {
  let bmp;
  try {
    bmp = await createImageBitmap(file, { imageOrientation: "from-image" });
  } catch {
    throw new Error(`Couldn't read ${file.name} — please use a JPG or PNG photo.`);
  }
  const scale = Math.min(1, maxEdge / Math.max(bmp.width, bmp.height));
  const w = Math.max(1, Math.round(bmp.width * scale));
  const h = Math.max(1, Math.round(bmp.height * scale));
  const c = document.createElement("canvas");
  c.width = w; c.height = h;
  c.getContext("2d").drawImage(bmp, 0, 0, w, h);
  bmp.close();
  const blob = await new Promise((res) => c.toBlob(res, "image/jpeg", quality));
  if (!blob) throw new Error(`Couldn't process ${file.name}.`);
  const buf = new Uint8Array(await blob.arrayBuffer());
  let bin = "";
  for (let i = 0; i < buf.length; i += 0x8000) bin += String.fromCharCode.apply(null, buf.subarray(i, i + 0x8000));
  return { base64: btoa(bin), blobUrl: URL.createObjectURL(blob) };
}

function pickFiles(input) {
  return new Promise((res) => {
    input.value = "";
    input.onchange = () => res([...input.files]);
    input.click();
  });
}

async function rawFile(path) {
  const meta = await getFile(path);
  return { text: b64decodeUtf8(meta.content), sha: meta.sha };
}

/* ---------- photos: gallery manager ---------- */

function phNote(msg, cls) {
  phStatus.className = "ed-ph-status" + (cls ? " " + cls : "");
  phStatus.textContent = msg;
}

async function listGallery() {
  const r = await fetch(`${API}assets/images/portfolio/${curGallery.slug}?ref=${encodeURIComponent(BRANCH)}`, { headers: ghHeaders(), cache: "no-store" });
  if (!r.ok) throw new Error(`Couldn't load the photo list (${r.status})`);
  return (await r.json()).filter((f) => /\.(jpe?g|png)$/i.test(f.name));
}

/* ---------- photos: display order (_data/gallery_order.yml) ---------- */

const ORDER_PATH = "_data/gallery_order.yml";

/* the manifest as a YAML document, so comments survive edits; missing file = empty doc */
async function readOrderDoc() {
  try {
    const meta = await getFile(ORDER_PATH);
    return parseDocument(b64decodeUtf8(meta.content));
  } catch {
    return parseDocument("");
  }
}

/* manifest order first (ignoring stale names), unlisted files after, mirroring
 * the Liquid in _includes/portfolio-gallery.html */
function applyManifestOrder(items, manifest) {
  if (!Array.isArray(manifest)) return items;
  const byName = new Map(items.map((it) => [it.name, it]));
  const out = [];
  for (const nm of manifest) {
    if (byName.has(nm)) { out.push(byName.get(nm)); byName.delete(nm); }
  }
  for (const it of items) if (byName.has(it.name)) out.push(it);
  return out;
}

let phItems = [];        // [{name, download_url}] in display order
let phOrderDirty = false;
const phOrderBtn = document.getElementById("ed-ph-order");

function phOrderChanged() {
  phOrderDirty = true;
  phOrderBtn.hidden = false;
  phNote("New order isn't saved yet — press “Save new order”.");
}

/* reflect a saved order on the wedding page behind the panel: re-append the
 * mosaic tiles in the new sequence, keeping the positional 1/2/3-per-row
 * span pattern so the layout stays flush */
function reorderPageMosaic(order) {
  const doc = frameDoc();
  const gal = doc && doc.querySelector("[data-ed-gallery]");
  const mosaic = gal && gal.querySelector(".wd-mosaic");
  if (!mosaic) return;
  const tiles = [...mosaic.querySelectorAll("a")].filter((a) => a.querySelector("img"));
  const pattern = tiles.map((a) => [...a.classList].find((c) => /^mo-\d+$/.test(c)));
  /* .mo-fin (mobile closing band) is positional and parity doesn't change on
   * reorder, so if this gallery has one it belongs on the new last tile */
  const hadFin = tiles.some((a) => a.classList.contains("mo-fin"));
  const byName = new Map(tiles.map((a) => [imgPath(a.querySelector("img")).split("/").pop(), a]));
  let i = 0;
  let lastPlaced = null;
  for (const nm of order) {
    const a = byName.get(nm);
    if (!a) continue; /* the hero, or a photo not on the page yet */
    [...a.classList].filter((c) => /^mo-\d+$/.test(c)).forEach((c) => a.classList.remove(c));
    a.classList.remove("mo-fin");
    if (pattern[i]) a.classList.add(pattern[i]);
    i += 1;
    mosaic.appendChild(a);
    lastPlaced = a;
  }
  if (hadFin && lastPlaced) lastPlaced.classList.add("mo-fin");
}

function renderPhotoGrid() {
  phGrid.innerHTML = "";
  phItems.forEach((it, idx) => {
    const d = document.createElement("div");
    d.className = "ed-ph";
    d.draggable = true;
    d.dataset.name = it.name;
    const isHero = it.name === curGallery.hero;
    d.innerHTML =
      `<img src="${it.download_url}" loading="lazy" alt="">` +
      (isHero ? `<span class="ed-ph-badge">Opening photo</span>` : "") +
      `<div class="ed-ph-acts">` +
      (isHero ? "" : `<button type="button" class="hero" data-act="hero">Make opening photo</button><button type="button" data-act="del">Delete</button>`) +
      `</div>` +
      `<div class="ed-ph-move">` +
      (idx > 0 ? `<button type="button" data-act="left" title="Move earlier">&#8249;</button>` : "") +
      (idx < phItems.length - 1 ? `<button type="button" data-act="right" title="Move later">&#8250;</button>` : "") +
      `</div><div class="ed-ph-name">${it.name}</div>`;
    d.querySelectorAll("button").forEach((b) => {
      b.addEventListener("click", () => {
        if (b.dataset.act === "del") return deletePhoto(it.name);
        if (b.dataset.act === "hero") return makeHero(it.name);
        const from = phItems.findIndex((x) => x.name === it.name);
        const to = b.dataset.act === "left" ? from - 1 : from + 1;
        if (to < 0 || to >= phItems.length) return;
        phItems.splice(to, 0, phItems.splice(from, 1)[0]);
        renderPhotoGrid();
        phOrderChanged();
      });
    });
    d.addEventListener("dragstart", (e) => {
      e.dataTransfer.effectAllowed = "move";
      d.classList.add("dragging");
    });
    d.addEventListener("dragend", () => {
      d.classList.remove("dragging");
      const domOrder = [...phGrid.querySelectorAll(".ed-ph")].map((n) => n.dataset.name);
      if (domOrder.join() !== phItems.map((x) => x.name).join()) {
        phItems = domOrder.map((nm) => phItems.find((x) => x.name === nm));
        renderPhotoGrid();
        phOrderChanged();
      }
    });
    phGrid.appendChild(d);
  });
  if (!phItems.length) phGrid.innerHTML = "<p style='color:var(--ed-mute);font-size:.85rem;'>No photos yet — add some below.</p>";
}

phGrid.addEventListener("dragover", (e) => {
  e.preventDefault();
  const dragging = phGrid.querySelector(".dragging");
  const target = e.target.closest(".ed-ph");
  if (!dragging || !target || target === dragging) return;
  const r = target.getBoundingClientRect();
  const before = e.clientX < r.left + r.width / 2;
  phGrid.insertBefore(dragging, before ? target : target.nextSibling);
});
phGrid.addEventListener("drop", (e) => e.preventDefault());

async function renderPhotos() {
  phGrid.innerHTML = "<p style='color:var(--ed-mute);font-size:.85rem;'>Loading photos…</p>";
  phOrderDirty = false;
  phOrderBtn.hidden = true;
  try {
    const [items, orderDoc] = await Promise.all([listGallery(), readOrderDoc()]);
    phItems = applyManifestOrder(items, (orderDoc.toJS() || {})[curGallery.slug]);
  } catch (err) { phGrid.innerHTML = ""; phNote(err.message, "err"); return; }
  renderPhotoGrid();
}

phOrderBtn.addEventListener("click", async () => {
  const order = phItems.map((x) => x.name);
  phOrderBtn.disabled = true;
  phGrid.classList.add("busy");
  try {
    phNote("Saving the new order…");
    const doc = await readOrderDoc();
    doc.setIn([curGallery.slug], order);
    await commitFiles(
      [{ path: ORDER_PATH, text: doc.toString() }],
      `Reorder the ${curGallery.name} gallery photos via inline editor`
    );
    phOrderDirty = false;
    phOrderBtn.hidden = true;
    reorderPageMosaic(order);
    phNote("✓ Order saved — the page behind this panel shows it now. Live site follows in ~2 minutes.", "ok");
  } catch (err) {
    phNote(err.message, "err");
  }
  phOrderBtn.disabled = false;
  phGrid.classList.remove("busy");
});

async function openPhotos() {
  if (!curGallery) return;
  if (!DRYRUN && !token()) { await ensureAuth(); if (!token()) return; }
  phTitle.textContent = `${curGallery.name} — photos`;
  phNote("");
  phModal.hidden = false;
  renderPhotos();
}

photosBtn.addEventListener("click", openPhotos);
phClose.addEventListener("click", () => {
  if (phOrderDirty && !window.confirm("You dragged photos into a new order but didn't press “Save new order” — close anyway and lose it?")) return;
  phModal.hidden = true;
});

phAdd.addEventListener("click", async () => {
  const files = await pickFiles(filesInput);
  if (!files.length) return;
  phAdd.disabled = true;
  try {
    const items = await listGallery();
    let next = 0;
    const numRe = new RegExp(`^${curGallery.slug}-(\\d+)`);
    for (const it of items) {
      const m = it.name.match(numRe);
      if (m) next = Math.max(next, parseInt(m[1], 10));
    }
    const entries = [];
    const newNames = [];
    for (let i = 0; i < files.length; i++) {
      phNote(`Preparing photo ${i + 1} of ${files.length}…`);
      const { base64 } = await processImage(files[i]);
      next += 1;
      const fname = `${curGallery.slug}-${String(next).padStart(2, "0")}.jpg`;
      newNames.push(fname);
      entries.push({ path: `assets/images/portfolio/${curGallery.slug}/${fname}`, base64 });
    }
    /* a pinned order exists for this gallery: append the new photos to it so
     * they land at the end instead of wherever their number happens to sort */
    const orderDoc = await readOrderDoc();
    const orderList = (orderDoc.toJS() || {})[curGallery.slug];
    if (Array.isArray(orderList)) {
      orderDoc.setIn([curGallery.slug], orderList.concat(newNames));
      entries.push({ path: ORDER_PATH, text: orderDoc.toString() });
    }
    phNote(`Saving ${newNames.length} photo${newNames.length > 1 ? "s" : ""}…`);
    await commitFiles(entries, `Add ${newNames.length} photo${newNames.length > 1 ? "s" : ""} to the ${curGallery.name} gallery via inline editor`);
    phNote(`✓ ${newNames.length} photo${newNames.length > 1 ? "s" : ""} added — they're in the grid here and reach the live page in ~2 minutes.`, "ok");
    renderPhotos();
  } catch (err) {
    phNote(err.message, "err");
  }
  phAdd.disabled = false;
});

/* Every page whose source can hard-code a gallery photo (including via the
 * swap flow, which can point ANY of these at a portfolio image) — deleting a
 * photo one of them still uses would leave a broken image on the live site. */
const PHOTO_USAGE_PAGES = [
  "index.md", "portfolio/index.md", "blog/index.md", "about/index.md",
  "sustainability/index.md", "weddings/index.md", "consultation-form/index.md",
];
const PAGE_LABELS = {
  "index.md": "the home page", "portfolio/index.md": "the portfolio page",
  "blog/index.md": "the blog page", "about/index.md": "the Our Story page",
  "sustainability/index.md": "the sustainability page",
  "weddings/index.md": "the Process & Pricing page",
  "consultation-form/index.md": "the contact page",
};

async function deletePhoto(name) {
  if (name === curGallery.hero) { phNote("That's the big opening photo — make another photo the opener first.", "err"); return; }
  phNote("Checking where this photo is used…");
  try {
    for (const p of PHOTO_USAGE_PAGES) {
      if ((await rawFile(p)).text.includes(name)) {
        /* remember what's being removed so the swap picker won't offer it */
        sessionStorage.setItem("gfDeleting", name);
        phNote(`Not deleted: this photo also appears on ${PAGE_LABELS[p] || p}. Swap it there first (click the photo on that page).`, "err");
        return;
      }
    }
    if (!window.confirm(`Delete ${name} from the ${curGallery.name} gallery?`)) { phNote(""); return; }
    phNote("Deleting…");
    phGrid.classList.add("busy");
    const files = [{ path: `assets/images/portfolio/${curGallery.slug}/${name}`, del: true }];
    /* drop it from the pinned order too (harmless if left, but keep it tidy) */
    const orderDoc = await readOrderDoc();
    const orderList = (orderDoc.toJS() || {})[curGallery.slug];
    if (Array.isArray(orderList) && orderList.includes(name)) {
      orderDoc.setIn([curGallery.slug], orderList.filter((n) => n !== name));
      files.push({ path: ORDER_PATH, text: orderDoc.toString() });
    }
    await commitFiles(files, `Remove ${name} from the ${curGallery.name} gallery via inline editor`);
    if (sessionStorage.getItem("gfDeleting") === name) sessionStorage.removeItem("gfDeleting");
    /* remove it from the page behind the panel right away */
    const doc = frameDoc();
    doc && doc.querySelectorAll("[data-ed-gallery] img").forEach((im) => {
      if (imgPath(im).endsWith(`/${name}`)) (im.closest("a") || im).remove();
    });
    phNote(`✓ ${name} deleted — it's gone from the page behind this panel. Live site follows in ~2 minutes.`, "ok");
    renderPhotos();
  } catch (err) {
    phNote(err.message, "err");
  }
  phGrid.classList.remove("busy");
}

async function makeHero(name) {
  if (name === curGallery.hero) return;
  phGrid.classList.add("busy");
  try {
    phNote("Updating the opening photo…");
    const { text } = await rawFile(curPage);
    if (!text.includes(curGallery.hero)) throw new Error("Couldn't find the current opening photo in the page — refresh and try again.");
    const updated = text.split(curGallery.hero).join(name);
    await commitFiles([{ path: curPage, text: updated }], `Set ${name} as the ${curGallery.name} opening photo via inline editor`);
    curGallery.hero = name;
    /* show it on the page behind the panel right away */
    const doc = frameDoc();
    const galEl = doc && doc.querySelector("[data-ed-gallery]");
    if (galEl) {
      galEl.setAttribute("data-ed-ghero", name);
      const heroImg = galEl.querySelector(".wd-hero-img");
      if (heroImg) {
        heroImg.removeAttribute("srcset");
        heroImg.src = `${CFG.baseurl}/assets/images/portfolio/${curGallery.slug}/${name}`;
      }
    }
    phNote(`✓ ${name} is the opening photo now — you can see it on the page behind this panel. Live site follows in ~2 minutes.`, "ok");
    renderPhotos();
  } catch (err) {
    phNote(err.message, "err");
  }
  phGrid.classList.remove("busy");
}

/* ---------- photos: swap any page image ---------- */

/* Production HTML gets srcset variants at /assets/images/rsp/<stem>-<w>w.jpg
 * (responsive_images.rb), and img.currentSrc usually picks one of those.
 * Variant paths never appear in any source file, so map them back to the
 * committed original before matching against page source. */
function canonicalImagePath(p) {
  if (CFG.baseurl && p.startsWith(CFG.baseurl)) p = p.slice(CFG.baseurl.length);
  const m = p.match(/^\/assets\/images\/rsp\/(.+)-(?:480|960|1440)w\.jpg$/);
  return m ? `/assets/images/${m[1]}.jpg` : p;
}

function imgPath(img) {
  return canonicalImagePath(new URL(img.currentSrc || img.src).pathname);
}

let repTarget = null;
let repBusy = false;

const REP_UNMATCHED = "This photo is placed by the site's design rather than this page, so it can't be swapped here. Tell Josh which photo you want changed.";

/* the image path inside the card that links to /portfolio/<slug>, with its
 * offset in the source (the src carries a {{ site.baseurl }} prefix we leave
 * alone) */
function cardPhotoInSource(text, slug) {
  const link = text.indexOf(`/portfolio/${slug}"`);
  if (link < 0) return null;
  const stop = text.indexOf("</a>", link);
  const seg = text.slice(link, stop < 0 ? link + 800 : stop);
  const m = seg.match(/<img[^>]*\ssrc="(?:\{\{[^}]*\}\}\s*)?(\/[^"]+)"/);
  return m ? { path: m[1], at: link + seg.indexOf(m[1], m.index) } : null;
}

/* the source text with the clicked photo pointed at newSrcPath, or null if
 * this page doesn't place that photo at all */
function sourceSwappedTo(text, newSrcPath) {
  if (text.includes(repTarget.path)) return text.split(repTarget.path).join(newSrcPath);
  /* the preview iframe can be a build behind main — a deploy takes ~2 minutes,
   * so after a swap the photo on screen may no longer be the one in the
   * source. Rewrite this wedding's card by its own link rather than failing. */
  if (repTarget.cardSlug) {
    const hit = cardPhotoInSource(text, repTarget.cardSlug);
    if (hit) return text.slice(0, hit.at) + newSrcPath + text.slice(hit.at + hit.path.length);
  }
  return null;
}

/* rewrite every reference to the clicked photo in this page's source.
 * Returns false when the source already shows that photo (nothing to commit). */
async function swapSourceTo(newSrcPath) {
  const { text } = await rawFile(curPage);
  const updated = sourceSwappedTo(text, newSrcPath);
  if (updated === null) throw new Error(REP_UNMATCHED);
  if (updated === text) return false;
  await commitFiles([{ path: curPage, text: updated }], `Swap a photo on ${curPage} via inline editor`);
  return true;
}

function openReplace(img) {
  if (!curPage) return;
  repTarget = { el: img, path: imgPath(img) };
  repPreview.src = img.currentSrc || img.src;
  repErr.style.display = "none";
  repGalWrap.hidden = true;
  repGal.innerHTML = "";
  repModal.hidden = false;

  /* if this photo belongs to a wedding gallery (e.g. a cover tile on the
   * portfolio or home page), offer picking a different photo from that
   * same wedding instead of uploading. A cover swapped by upload lives in
   * assets/images/pages/, so fall back to the card's own link for the slug —
   * otherwise that tile loses the picker forever after one upload. */
  const card = img.closest('a[href*="/portfolio/"]');
  const href = card && card.getAttribute("href").match(/\/portfolio\/([^/?#]+)/);
  if (href && href[1] !== "index") repTarget.cardSlug = href[1];
  const slug = (repTarget.path.match(/^\/assets\/images\/portfolio\/([^/]+)\//) || [])[1] || repTarget.cardSlug;
  if (slug) {
    fetch(`${API}assets/images/portfolio/${slug}?ref=${encodeURIComponent(BRANCH)}`, { headers: ghHeaders(), cache: "no-store" })
      .then((r) => (r.ok ? r.json() : []))
      .then((items) => {
        /* leave out the photo a blocked delete is trying to remove — clicking
         * here means "feature this photo", the opposite of deleting it */
        const deleting = sessionStorage.getItem("gfDeleting");
        items = items.filter((f) => /\.(jpe?g|png)$/i.test(f.name) && `/${f.path}` !== repTarget.path && f.name !== deleting);
        if (!items.length || repModal.hidden) return;
        repGalLabel.textContent = deleting
          ? `Pick the photo to show here instead (${deleting} isn't offered — you're deleting it):`
          : `Pick another photo from this wedding's gallery to show here instead:`;
        for (const it of items) {
          const t = document.createElement("img");
          t.src = it.download_url;
          t.loading = "lazy";
          t.title = it.name;
          t.addEventListener("click", async () => {
            /* one swap at a time: a second click landing mid-save used to
             * commit the same change twice (empty commit) or fail against the
             * source the first click had already rewritten */
            if (repBusy) return;
            repBusy = true;
            repGal.classList.add("busy");
            repErr.style.display = "none";
            try {
              const newSrc = `/${it.path}`;
              const changed = await swapSourceTo(newSrc);
              repTarget.el.removeAttribute("srcset");
              repTarget.el.src = newSrc;
              repModal.hidden = true;
              repTarget = null;
              statusEl.className = "ed-status ok";
              statusEl.textContent = DRYRUN
                ? "Dry run done — nothing committed"
                : changed
                  ? "✓ Photo swapped — it's on the page now, live site in ~2 minutes"
                  : "✓ That photo is already the one on the live site";
            } catch (err) {
              repErr.textContent = err.message;
              repErr.style.display = "block";
            }
            repBusy = false;
            repGal.classList.remove("busy");
          });
          repGal.appendChild(t);
        }
        repGalWrap.hidden = false;
      })
      .catch(() => {});
  }
}

repCancel.addEventListener("click", () => { repModal.hidden = true; repTarget = null; });

repForm.addEventListener("submit", async (e) => {
  e.preventDefault();
  if (!repTarget) return;
  repErr.style.display = "none";
  const [file] = await pickFiles(fileInput);
  if (!file) return;
  if (!DRYRUN && !token()) { repModal.hidden = true; await ensureAuth(); return; }
  try {
    const { text } = await rawFile(curPage);
    /* check before resizing so an unswappable photo fails fast */
    if (sourceSwappedTo(text, "") === null) throw new Error(REP_UNMATCHED);
    const { base64, blobUrl } = await processImage(file, 2400);
    /* drop any suffix an earlier upload added so re-uploads don't grow a
     * tail of timestamps (katie-james-01-msch3pw2-mschbtqy…) */
    const stem = repTarget.path.split("/").pop().replace(/\.[a-z]+$/i, "").replace(/(?:-[a-z0-9]{8})+$/i, "");
    const newPath = `assets/images/pages/${stem}-${Date.now().toString(36)}.jpg`;
    const updated = sourceSwappedTo(text, `/${newPath}`);
    await commitFiles(
      [{ path: newPath, base64 }, { path: curPage, text: updated }],
      `Swap a photo on ${curPage} via inline editor`
    );
    repTarget.el.removeAttribute("srcset");
    repTarget.el.src = blobUrl;
    repModal.hidden = true;
    repTarget = null;
    statusEl.className = "ed-status ok";
    statusEl.textContent = DRYRUN ? "Dry run done — nothing committed" : "✓ Photo swapped — it's on the page now, live site in ~2 minutes";
  } catch (err) {
    repErr.textContent = err.message;
    repErr.style.display = "block";
  }
});

/* ---------- photos: insert into a blog post ---------- */

imginsBtn.addEventListener("click", async () => {
  const doc = frameDoc();
  const art = doc && doc.querySelector("[data-ed-post]");
  if (!art) return;
  const [file] = await pickFiles(fileInput);
  if (!file) return;
  if (!DRYRUN && !token()) { await ensureAuth(); if (!token()) return; }
  const alt = (window.prompt("Describe the photo in a few words (helps Google find it):", "") || "").trim();
  statusEl.className = "ed-status";
  statusEl.textContent = "Adding photo…";
  try {
    const { base64, blobUrl } = await processImage(file, 1600);
    const postPath = art.getAttribute("data-ed-post");
    const stem = postPath.split("/").pop().replace(/^\d{4}-\d{2}-\d{2}-/, "").replace(/\.md$/, "");
    const path = `assets/images/blog/${stem}-${Date.now().toString(36)}.jpg`;
    await commitFiles([{ path, base64 }], `Add a photo to ${postPath.replace(/^_posts\//, "")} via inline editor`);

    if (!editing || editing !== art) startEdit(art);
    const sel = doc.getSelection();
    sel.removeAllRanges();
    if (lastRange && art.contains(lastRange.startContainer)) sel.addRange(lastRange);
    else { const r = doc.createRange(); r.selectNodeContents(art); r.collapse(false); sel.addRange(r); }
    const altEsc = escapeHtml(alt).replace(/"/g, "&quot;");
    /* srcset carries a local preview until deploy; it's stripped on save */
    doc.execCommand("insertHTML", false, `<p><img src="/${path}" srcset="${blobUrl}" alt="${altEsc}" loading="lazy"></p>`);
    setPostField(postPath, "body", cleanPostHtml(art), (postBaseline.get(postPath) || {}).body);
    art.classList.add("gf-dirty");
    refreshBar();
    statusEl.className = "ed-status";
    statusEl.textContent = "Photo added — press Save to publish the post.";
  } catch (err) {
    statusEl.className = "ed-status err";
    statusEl.textContent = err.message;
  }
});

/* ---------- hub card surgery (shared by remove & change-style) ---------- */

/* Locates a wedding's pf-card on the portfolio page. Returns the card html,
 * the hub text without it, and which aesthetic section it sat in. */
function cutHubCard(hubText, slug) {
  const ref = hubText.indexOf(`/portfolio/${slug}"`);
  if (ref === -1) throw new Error("Couldn't find this wedding on the portfolio page — tell Josh.");
  const aOpen = hubText.lastIndexOf('<a class="pf-card"', ref);
  const aClose = hubText.indexOf("</a>", ref) + 4;
  const secStart = hubText.lastIndexOf('<section class="pf-group"', ref);
  const groupId = (hubText.slice(secStart, secStart + 120).match(/id="([a-z-]+)"/) || [])[1] || "";
  const secEnd = hubText.indexOf("</section>", ref);
  const groupCards = (hubText.slice(secStart, secEnd).match(/class="pf-card"/g) || []).length;
  const card = hubText.slice(aOpen, aClose);
  const text = hubText.slice(0, aOpen).replace(/[ \t]*$/, "") + hubText.slice(aClose).replace(/^\s*\n/, "\n");
  return { text, card, groupId, groupCards };
}

/* appends a ready-made card inside a group's grid (same anchor logic as New wedding) */
function insertHubCard(hubText, groupId, card) {
  const secStart = hubText.indexOf(`id="${groupId}"`);
  if (secStart === -1) throw new Error("Couldn't find the aesthetic's section on the portfolio page — tell Josh.");
  const secEnd = hubText.indexOf("</section>", secStart);
  const gridEnd = hubText.lastIndexOf("</div>", secEnd);
  if (secEnd === -1 || gridEnd === -1 || gridEnd < secStart) throw new Error("The portfolio page's layout changed — tell Josh.");
  return hubText.slice(0, gridEnd) + "  " + card + "\n  " + hubText.slice(gridEnd);
}

/* ---------- remove wedding ---------- */

const wedRmBtn = document.getElementById("ed-wedrm");

wedRmBtn.addEventListener("click", async () => {
  if (!curGallery || !curPage) return;
  const { slug, name } = curGallery;
  if (!window.confirm(
    `Remove the ${name} wedding from the portfolio?\n\n` +
    `Its page and all ${name} gallery photos are deleted, its card comes off ` +
    `the portfolio page, and its old address redirects to the portfolio. ` +
    `This can't be undone from here.`
  )) return;
  if (!DRYRUN && !token()) { await ensureAuth(); if (!token()) return; }

  statusEl.className = "ed-status";
  statusEl.textContent = "Checking it's safe to remove…";
  try {
    /* photos from this wedding may be featured on other pages via swap */
    const prefix = `/assets/images/portfolio/${slug}/`;
    for (const p of PHOTO_USAGE_PAGES) {
      if (p === "portfolio/index.md") continue; // its card is what we're removing
      const { text } = await rawFile(p);
      if (text.includes(prefix)) {
        throw new Error(`Not removed: a ${name} photo is featured on ${PAGE_LABELS[p] || p}. Swap that photo first (click it on that page), then try again.`);
      }
    }

    /* the collage CSS adapts down to a single card, but an aesthetic with
     * ZERO examples would show an empty section — that needs a human */
    const hub = await rawFile("portfolio/index.md");
    const cut = cutHubCard(hub.text, slug);
    if (cut.groupCards <= 1) {
      throw new Error(`Not removed: ${name} is the only wedding left in this style — the portfolio would show an empty section. Add another wedding to this style first, or tell Josh.`);
    }
    /* same commit: the old URL 301s to the portfolio (nothing may 404) */
    const hubText = withRedirect(cut.text, `/portfolio/${slug}`, "portfolio/index.md");

    statusEl.textContent = "Removing…";
    const files = [
      { path: `portfolio/${slug}/index.md`, del: true },
      { path: "portfolio/index.md", text: hubText },
    ];
    for (const it of await listGallery()) {
      files.push({ path: `assets/images/portfolio/${slug}/${it.name}`, del: true });
    }
    const pfMeta = await getFile("_data/portfolio.yml");
    const pfDoc = parseDocument(b64decodeUtf8(pfMeta.content));
    if (pfDoc.hasIn([slug])) { pfDoc.deleteIn([slug]); files.push({ path: "_data/portfolio.yml", text: pfDoc.toString() }); }
    const orderDoc = await readOrderDoc();
    if (orderDoc.hasIn([slug])) { orderDoc.deleteIn([slug]); files.push({ path: ORDER_PATH, text: orderDoc.toString() }); }

    await commitFiles(files, `Remove the ${name} wedding from the portfolio via inline editor`);
    statusEl.className = "ed-status ok";
    statusEl.textContent = DRYRUN
      ? "Dry run done — nothing committed"
      : `✓ ${name} removed — it disappears from the live site in ~2 minutes.`;
    if (!DRYRUN) frame.src = `${CFG.baseurl}/portfolio`;
  } catch (err) {
    statusEl.className = "ed-status err";
    statusEl.textContent = err.message;
  }
});

/* ---------- change style (redesignate a wedding's aesthetic) ---------- */

const styleBtn = document.getElementById("ed-style");
const styleModal = document.getElementById("ed-style-modal");
const styleForm = document.getElementById("ed-style-form");
const styleSel = document.getElementById("ed-style-sel");
const styleErr = document.getElementById("ed-style-err");
const styleCancel = document.getElementById("ed-style-cancel");

const GROUP_AES = {
  "lush-romantic": "Lush & Romantic",
  "elevated-minimalist": "Elevated Minimalist",
  "wildflower-modern": "Wildflower Modern",
};

styleBtn.addEventListener("click", () => {
  styleErr.style.display = "none";
  styleModal.hidden = false;
});
styleCancel.addEventListener("click", () => { styleModal.hidden = true; });

styleForm.addEventListener("submit", async (e) => {
  e.preventDefault();
  styleErr.style.display = "none";
  if (!curGallery || !curPage) return;
  if (!DRYRUN && !token()) { styleModal.hidden = true; await ensureAuth(); return; }
  const target = styleSel.value;
  const btn = styleForm.querySelector("button[type=submit]");
  btn.disabled = true;
  try {
    const hub = await rawFile("portfolio/index.md");
    const cut = cutHubCard(hub.text, curGallery.slug);
    const fromAes = GROUP_AES[cut.groupId];
    if (!fromAes) throw new Error("Couldn't tell which style this wedding is in — tell Josh.");
    if (fromAes === target) throw new Error(`${curGallery.name} is already ${target}.`);
    if (cut.groupCards <= 1) throw new Error(`${curGallery.name} is the only wedding left in ${fromAes} — moving it would leave that section empty. Tell Josh if that's really wanted.`);
    const hubText = insertHubCard(cut.text, AES_GROUP[target], cut.card);

    /* the wedding page carries the aesthetic in its title, seo_title and the
     * label above the couple's name — swap every occurrence */
    const page = await rawFile(curPage);
    if (!page.text.includes(fromAes)) throw new Error("This wedding's page doesn't mention its style where expected — tell Josh.");
    const pageText = page.text.split(fromAes).join(target);

    await commitFiles(
      [{ path: "portfolio/index.md", text: hubText }, { path: curPage, text: pageText }],
      `Move the ${curGallery.name} wedding from ${fromAes} to ${target} via inline editor`
    );
    styleModal.hidden = true;
    statusEl.className = "ed-status ok";
    statusEl.textContent = DRYRUN
      ? "Dry run done — nothing committed"
      : `✓ ${curGallery.name} is now ${target} — the portfolio page and this page's label update in ~2 minutes.`;
    /* show the new label on the page behind immediately */
    const doc = frameDoc();
    const lab = doc && doc.querySelector(".venue-hero .lab");
    if (lab && lab.textContent.trim() === fromAes) lab.textContent = target;
  } catch (err) {
    styleErr.textContent = err.message;
    styleErr.style.display = "block";
  }
  btn.disabled = false;
});

/* ---------- new wedding ---------- */

const wedBtn = document.getElementById("ed-wed");
const wedModal = document.getElementById("ed-wed-modal");
const wedForm = document.getElementById("ed-wed-form");
const wedNames = document.getElementById("ed-wed-names");
const wedVenue = document.getElementById("ed-wed-venue");
const wedAes = document.getElementById("ed-wed-aes");
const wedDesc = document.getElementById("ed-wed-desc");
const wedErr = document.getElementById("ed-wed-err");
const wedCancel = document.getElementById("ed-wed-cancel");

const AES_GROUP = {
  "Lush & Romantic": "lush-romantic",
  "Elevated Minimalist": "elevated-minimalist",
  "Wildflower Modern": "wildflower-modern",
};

/* "Brittany & Chase" -> "brittany-chase", matching the existing gallery slugs */
function weddingSlug(names) {
  return names.toLowerCase()
    .replace(/['’.]/g, "")
    .replace(/&/g, " ")
    .replace(/\band\b/g, " ")
    .replace(/[^a-z0-9]+/g, "-")
    .replace(/^-+|-+$/g, "")
    .slice(0, 50);
}

function escAttr(s) { return escapeHtml(s).replace(/"/g, "&quot;"); }

function weddingPage(slug, names, aesthetic, desc, heroName) {
  /* JSON strings are valid YAML double-quoted scalars */
  const q = (s) => JSON.stringify(s);
  return `---
layout: redesign
title: ${q(`${names} · ${aesthetic}`)}
seo_title: ${q(`${names} Wedding Flowers · ${aesthetic} | Golden Flowers`)}
permalink: /portfolio/${slug}
portfolio_key: ${slug}
description: ${q(desc)}
hero_photo: ${heroName}
---

{% include portfolio-subnav.html name=${q(names)} %}

<header class="text-hero venue-hero">
  <span class="lab">${escapeHtml(aesthetic)}</span>
  <h1>${escapeHtml(names)}</h1>
  {%- assign subtitle = site.data.portfolio[page.portfolio_key] %}
  {%- assign subtitle_k = page.portfolio_key | prepend: "portfolio:" %}
  <p class="th-sub">{% include em.html t=subtitle k=subtitle_k %}</p>
</header>

{% include portfolio-gallery.html slug="${slug}" hero="${heroName}" name=${q(names)} %}

{% include wedding-cta.html %}
`;
}

/* append the wedding's card to its aesthetic group on the portfolio page */
function addHubCard(hubText, groupId, slug, names, venue, heroName) {
  const secStart = hubText.indexOf(`id="${groupId}"`);
  if (secStart === -1) throw new Error("Couldn't find the aesthetic's section on the portfolio page — tell Josh.");
  const secEnd = hubText.indexOf("</section>", secStart);
  const gridEnd = hubText.lastIndexOf("</div>", secEnd);
  if (secEnd === -1 || gridEnd === -1 || gridEnd < secStart) throw new Error("The portfolio page's layout changed — tell Josh.");
  const card =
    `  <a class="pf-card" href="{{ site.baseurl }}/portfolio/${slug}">\n` +
    `      <img src="{{ site.baseurl }}/assets/images/portfolio/${slug}/${heroName}" alt="${escAttr(`${names} wedding flowers: ${venue}`)}" loading="lazy">\n` +
    `      <span class="pf-cap"><b>${escapeHtml(names)}</b></span>\n` +
    `    </a>\n  `;
  return hubText.slice(0, gridEnd) + card + hubText.slice(gridEnd);
}

wedBtn.addEventListener("click", () => {
  wedErr.style.display = "none";
  wedModal.hidden = false;
  wedNames.focus();
});
wedCancel.addEventListener("click", () => { wedModal.hidden = true; });

wedForm.addEventListener("submit", async (e) => {
  e.preventDefault();
  wedErr.style.display = "none";
  const fail = (msg) => { wedErr.textContent = msg; wedErr.style.display = "block"; };

  const names = wedNames.value.trim();
  const venue = wedVenue.value.trim();
  const aesthetic = wedAes.value;
  const desc = wedDesc.value.trim().replace(/\s+/g, " ");
  if (!names) return fail("Who got married? Add the couple's names.");
  if (!venue) return fail("Add the venue (and town) — it helps Google find the wedding.");
  if (!aesthetic) return fail("Pick the aesthetic — it decides where the wedding appears on the portfolio page.");
  if (!desc) return fail("Add a sentence or two about the wedding.");
  const slug = weddingSlug(names);
  if (!slug) return fail("Those names don't work as a web address — try e.g. “Brittany & Chase”.");
  if (!DRYRUN && !token()) { wedModal.hidden = true; await ensureAuth(); return; }

  /* already exists? (missing = good here) */
  let exists = true;
  try { await getFile(`portfolio/${slug}/index.md`); } catch { exists = false; }
  if (exists) return fail(`There's already a ${names} wedding at /portfolio/${slug}. Open it from the portfolio page to edit it.`);

  const files = await pickFiles(filesInput);
  if (!files.length) return fail("Pick at least one photo — the first becomes the opening photo.");

  const submitBtn = wedForm.querySelector("button[type=submit]");
  submitBtn.disabled = true;
  try {
    const commit = [];
    const heroName = `${slug}-01.jpg`;
    for (let i = 0; i < files.length; i++) {
      fail(`Preparing photo ${i + 1} of ${files.length}…`);
      wedErr.style.color = "var(--ed-mute)";
      const { base64 } = await processImage(files[i]);
      commit.push({ path: `assets/images/portfolio/${slug}/${slug}-${String(i + 1).padStart(2, "0")}.jpg`, base64 });
    }
    wedErr.style.color = "";

    commit.push({ path: `portfolio/${slug}/index.md`, text: weddingPage(slug, names, aesthetic, desc, heroName) });

    /* subtitle under the couple's name, same text Google gets */
    const pfMeta = await getFile("_data/portfolio.yml");
    const pfDoc = parseDocument(b64decodeUtf8(pfMeta.content));
    pfDoc.setIn([slug], desc);
    commit.push({ path: "_data/portfolio.yml", text: pfDoc.toString() });

    const hub = await rawFile("portfolio/index.md");
    commit.push({ path: "portfolio/index.md", text: addHubCard(hub.text, AES_GROUP[aesthetic], slug, names, venue, heroName) });

    await commitFiles(commit, `Add the ${names} wedding to the portfolio via inline editor`);

    wedModal.hidden = true;
    wedForm.reset();
    statusEl.className = "ed-status ok";
    statusEl.textContent = DRYRUN
      ? "Dry run done — nothing committed"
      : `✓ ${names} created — the page appears at /portfolio/${slug} and on the portfolio page in ~2 minutes.`;
  } catch (err) {
    wedErr.style.color = "";
    fail(err.message);
  }
  submitBtn.disabled = false;
});

if (!DRYRUN) ensureAuth();
