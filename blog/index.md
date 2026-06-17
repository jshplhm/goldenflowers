---
layout: default
title: "Blog"
permalink: /blog
redirect_from:
  - /natures-canvas-lake-tahoe-wedding-flowers
---

<section class="hero hero--interior">
  <div class="hero-media">
    <img src="https://images.squarespace-cdn.com/content/v1/67e81d7599b7ef0dec0ec81c/f77301d9-f890-451d-8bf8-c8d3a07d2bc4/Lake+Tahoe+Luxe+Boquet.jpg" alt="Seasonal California-grown bouquet" loading="eager">
  </div>
  <div class="hero-copy">
    <span class="hero-eyebrow">Blog</span>
    <h1 class="hero-display">Flowers, farming, and the Sierra Nevada.</h1>
    <p class="hero-sub">Seasonal notes, wedding inspiration, and thoughts from the farm at Golden Flowers.</p>
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
      {%- comment -%} Icon chosen from the post topic for variety, with a cycling fallback {%- endcomment -%}
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
