---
layout: default
v3: true
title: "Journal"
permalink: /blog
redirect_from:
  - /natures-canvas-lake-tahoe-wedding-flowers
---

<section class="vhero" style="min-height:52vh;">
  <img src="https://images.squarespace-cdn.com/content/v1/67e81d7599b7ef0dec0ec81c/f77301d9-f890-451d-8bf8-c8d3a07d2bc4/Lake+Tahoe+Luxe+Boquet.jpg?format=2500w" alt="Seasonal California-grown bouquet" loading="eager">
  <div class="container vhero-copy">
    <span class="eyebrow">Journal</span>
    <h1 class="vhero-name">Flowers, farming,<br>and the Sierra Nevada.</h1>
    <p class="vhero-loc">Seasonal notes, wedding inspiration, and thoughts from the farm</p>
  </div>
</section>

<section class="section">
  <div class="container">
    <div class="blog-toolbar">
      <input type="search" id="blog-search" class="blog-search" placeholder="Search posts…" aria-label="Search posts">
      <span class="blog-count" id="blog-count"></span>
    </div>
    <div class="blog-grid" id="blog-grid">
      {%- assign card_icons = "leaf,sprout,bouquet" | split: "," -%}
      {% for post in site.posts %}
      {%- assign t = post.title | append: ' ' | append: post.description | downcase -%}
      {%- assign mi = forloop.index0 | modulo: 3 -%}
      {%- assign card_icon = card_icons[mi] -%}
      {%- if t contains 'season' or t contains 'winter' or t contains 'spring' or t contains 'summer' or t contains 'autumn' or t contains 'fall ' -%}{%- assign card_icon = 'leaf' -%}
      {%- elsif t contains 'bouquet' or t contains 'bridal' or t contains 'bride' or t contains 'palette' or t contains 'color' -%}{%- assign card_icon = 'bouquet' -%}
      {%- elsif t contains 'sustainab' or t contains 'foam' or t contains 'eco' or t contains 'compost' or t contains 'vase' or t contains 'local' -%}{%- assign card_icon = 'recycle' -%}
      {%- elsif t contains 'install' or t contains 'arch' or t contains 'ceremony' or t contains 'arbor' -%}{%- assign card_icon = 'arch' -%}
      {%- elsif t contains 'farm' or t contains 'grow' or t contains 'soil' or t contains 'garden' or t contains 'field' -%}{%- assign card_icon = 'sprout' -%}
      {%- elsif t contains 'venue' or t contains 'edgewood' or t contains 'mountain' or t contains 'estate' or t contains 'resort' -%}{%- assign card_icon = 'pin' -%}
      {%- endif -%}
      <article class="blog-card" data-title="{{ post.title | strip_html | escape | downcase }}" data-text="{{ post.title | append: ' ' | append: post.description | append: ' ' | append: post.content | strip_html | escape | downcase }}">
        <a href="{{ site.baseurl }}{{ post.url }}" class="blog-card-link">
          <div class="blog-card-body">
            <span class="blog-card-icon">{% include icon.html name=card_icon %}</span>
            <h2 class="blog-card-title">{{ post.title }}</h2>
            <p class="blog-card-excerpt">{{ post.description | strip_html | truncatewords: 24 }}</p>
            <span class="blog-card-more">Read more →</span>
          </div>
        </a>
      </article>
      {% endfor %}
    </div>
    <button type="button" id="blog-more" class="blog-more">Load more posts</button>
    <p class="blog-empty" id="blog-empty" style="display:none;">No posts match your search.</p>
  </div>
</section>

<script>
// Blog search + load-more (copied from the site's blog behavior, unchanged)
(function() {
  const grid = document.getElementById('blog-grid');
  if (!grid) return;
  const input = document.getElementById('blog-search');
  const cards = Array.prototype.slice.call(grid.querySelectorAll('.blog-card'));
  const empty = document.getElementById('blog-empty');
  const count = document.getElementById('blog-count');
  const moreBtn = document.getElementById('blog-more');
  const BATCH = 12;
  let shown = BATCH;
  function apply() {
    const q = input ? input.value.trim().toLowerCase() : '';
    const searching = q.length > 0;
    let matched = 0, visible = 0;
    cards.forEach(function(c) {
      const hay = (c.dataset.title || '') + ' ' + (c.dataset.text || '');
      const isMatch = !q || hay.indexOf(q) !== -1;
      const show = searching ? isMatch : (matched < shown);
      if (isMatch) matched++;
      c.style.display = show ? '' : 'none';
      if (show) visible++;
    });
    if (empty) empty.style.display = visible ? 'none' : 'block';
    if (count) count.textContent = (searching ? visible : cards.length) + (((searching ? visible : cards.length) === 1) ? ' post' : ' posts');
    if (moreBtn) moreBtn.style.display = (!searching && shown < cards.length) ? '' : 'none';
  }
  if (input) input.addEventListener('input', function() { shown = BATCH; apply(); });
  if (moreBtn) moreBtn.addEventListener('click', function() { shown += BATCH; apply(); });
  apply();
})();
</script>
