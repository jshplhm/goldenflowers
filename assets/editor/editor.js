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

/* Keep a deleted post's URL working: send it to /blog via jekyll-redirect-from
 * on blog/index.md, committed before the post itself is removed. */
async function addBlogRedirect(urlPath, attempt = 0) {
  const path = "blog/index.md";
  const meta = await getFile(path);
  const raw = b64decodeUtf8(meta.content);
  const m = raw.match(/^---\r?\n([\s\S]*?)\r?\n---\r?\n?/);
  if (!m) throw new Error("blog/index.md has no front matter — redirect not added.");
  const fmDoc = parseDocument(m[1]);
  const existing = fmDoc.toJS().redirect_from || [];
  if (existing.includes(urlPath)) return;
  if (fmDoc.has("redirect_from")) fmDoc.addIn(["redirect_from"], urlPath);
  else fmDoc.set("redirect_from", [urlPath]);
  const out = `---\n${fmDoc.toString().replace(/\n+$/, "")}\n---\n\n${raw.slice(m[0].length).replace(/^\n+/, "")}`;
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

async function renderPhotos() {
  phGrid.innerHTML = "<p style='color:var(--ed-mute);font-size:.85rem;'>Loading photos…</p>";
  let items;
  try { items = await listGallery(); } catch (err) { phGrid.innerHTML = ""; phNote(err.message, "err"); return; }
  phGrid.innerHTML = "";
  for (const it of items) {
    const d = document.createElement("div");
    d.className = "ed-ph";
    const isHero = it.name === curGallery.hero;
    d.innerHTML =
      `<img src="${it.download_url}" loading="lazy" alt="">` +
      (isHero ? `<span class="ed-ph-badge">Opening photo</span>` : "") +
      `<div class="ed-ph-acts">` +
      (isHero ? "" : `<button type="button" class="hero" data-act="hero">Make opening photo</button><button type="button" data-act="del">Delete</button>`) +
      `</div><div class="ed-ph-name">${it.name}</div>`;
    d.querySelectorAll("button").forEach((b) => {
      b.addEventListener("click", () => (b.dataset.act === "del" ? deletePhoto(it.name) : makeHero(it.name)));
    });
    phGrid.appendChild(d);
  }
  if (!items.length) phGrid.innerHTML = "<p style='color:var(--ed-mute);font-size:.85rem;'>No photos yet — add some below.</p>";
}

async function openPhotos() {
  if (!curGallery) return;
  if (!DRYRUN && !token()) { await ensureAuth(); if (!token()) return; }
  phTitle.textContent = `${curGallery.name} — photos`;
  phNote("");
  phModal.hidden = false;
  renderPhotos();
}

photosBtn.addEventListener("click", openPhotos);
phClose.addEventListener("click", () => { phModal.hidden = true; });

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
    for (let i = 0; i < files.length; i++) {
      phNote(`Preparing photo ${i + 1} of ${files.length}…`);
      const { base64 } = await processImage(files[i]);
      next += 1;
      entries.push({ path: `assets/images/portfolio/${curGallery.slug}/${curGallery.slug}-${String(next).padStart(2, "0")}.jpg`, base64 });
    }
    phNote(`Saving ${entries.length} photo${entries.length > 1 ? "s" : ""}…`);
    await commitFiles(entries, `Add ${entries.length} photo${entries.length > 1 ? "s" : ""} to the ${curGallery.name} gallery via inline editor`);
    phNote(`✓ ${entries.length} photo${entries.length > 1 ? "s" : ""} added — they're in the grid here and reach the live page in ~2 minutes.`, "ok");
    renderPhotos();
  } catch (err) {
    phNote(err.message, "err");
  }
  phAdd.disabled = false;
});

/* pages that hard-code specific gallery photos; deleting one of those would leave a hole */
const PHOTO_USAGE_PAGES = ["index.md", "portfolio/index.md", "blog/index.md"];

async function deletePhoto(name) {
  if (name === curGallery.hero) { phNote("That's the big opening photo — make another photo the opener first.", "err"); return; }
  phNote("Checking where this photo is used…");
  try {
    for (const p of PHOTO_USAGE_PAGES) {
      if ((await rawFile(p)).text.includes(name)) {
        /* remember what's being removed so the swap picker won't offer it */
        sessionStorage.setItem("gfDeleting", name);
        phNote(`Not deleted: this photo also appears on ${p === "index.md" ? "the home page" : "the " + p.split("/")[0] + " page"}. Swap it there first (click the photo on that page).`, "err");
        return;
      }
    }
    if (!window.confirm(`Delete ${name} from the ${curGallery.name} gallery?`)) { phNote(""); return; }
    phNote("Deleting…");
    phGrid.classList.add("busy");
    await commitFiles([{ path: `assets/images/portfolio/${curGallery.slug}/${name}`, del: true }], `Remove ${name} from the ${curGallery.name} gallery via inline editor`);
    if (sessionStorage.getItem("gfDeleting") === name) sessionStorage.removeItem("gfDeleting");
    /* remove it from the page behind the panel right away */
    const doc = frameDoc();
    doc && doc.querySelectorAll("[data-ed-gallery] img").forEach((im) => {
      if ((im.currentSrc || im.src).endsWith(`/${name}`)) (im.closest("a") || im).remove();
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

let repTarget = null;

/* rewrite every reference to the clicked photo in this page's source */
async function swapSourceTo(newSrcPath) {
  const { text } = await rawFile(curPage);
  if (!text.includes(repTarget.path)) {
    throw new Error("This photo is placed by the site's design rather than this page, so it can't be swapped here. Tell Josh which photo you want changed.");
  }
  const updated = text.split(repTarget.path).join(newSrcPath);
  await commitFiles([{ path: curPage, text: updated }], `Swap a photo on ${curPage} via inline editor`);
}

function openReplace(img) {
  if (!curPage) return;
  repTarget = { el: img, path: new URL(img.currentSrc || img.src).pathname };
  repPreview.src = img.currentSrc || img.src;
  repErr.style.display = "none";
  repGalWrap.hidden = true;
  repGal.innerHTML = "";
  repModal.hidden = false;

  /* if this photo belongs to a wedding gallery (e.g. a cover tile on the
   * portfolio or home page), offer picking a different photo from that
   * same wedding instead of uploading */
  const m = repTarget.path.match(/^\/assets\/images\/portfolio\/([^/]+)\//);
  if (m) {
    const slug = m[1];
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
            repErr.style.display = "none";
            try {
              const newSrc = `/${it.path}`;
              await swapSourceTo(newSrc);
              repTarget.el.removeAttribute("srcset");
              repTarget.el.src = newSrc;
              repModal.hidden = true;
              repTarget = null;
              statusEl.className = "ed-status ok";
              statusEl.textContent = DRYRUN ? "Dry run done — nothing committed" : "✓ Photo swapped — it's on the page now, live site in ~2 minutes";
            } catch (err) {
              repErr.textContent = err.message;
              repErr.style.display = "block";
            }
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
    if (!text.includes(repTarget.path)) {
      throw new Error("This photo is placed by the site's design rather than this page, so it can't be swapped here. Tell Josh which photo you want changed.");
    }
    const { base64, blobUrl } = await processImage(file, 2400);
    const stem = repTarget.path.split("/").pop().replace(/\.[a-z]+$/i, "");
    const newPath = `assets/images/pages/${stem}-${Date.now().toString(36)}.jpg`;
    const updated = text.split(repTarget.path).join(`/${newPath}`);
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

if (!DRYRUN) ensureAuth();
