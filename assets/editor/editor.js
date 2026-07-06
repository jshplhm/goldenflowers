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
`;

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

frame.addEventListener("load", hookFrame);
/* the iframe may already be loaded by the time this module runs */
if (frameDoc() && frameDoc().readyState === "complete" && frameDoc().body) hookFrame();

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
  const r = await fetch(`${API}${path}?ref=${encodeURIComponent(BRANCH)}`, { headers: ghHeaders() });
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

if (!DRYRUN) ensureAuth();
