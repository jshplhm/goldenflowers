---
layout: default
title: "Blog"
permalink: /blog
redirect_from:
  - /natures-canvas-lake-tahoe-wedding-flowers
---

<header class="page-header">
  <span class="label">Blog</span>
  <h1>Flowers, farming, and the Sierra Nevada.</h1>
  <p>Seasonal notes, wedding inspiration, and thoughts from the farm at Golden Flowers.</p>
</header>

<section class="section">
  <div class="container">
    <div class="blog-toolbar">
      <input type="search" id="blog-search" class="blog-search" placeholder="Search posts…" aria-label="Search posts">
      <span class="blog-count" id="blog-count"></span>
    </div>
    <div class="blog-grid" id="blog-grid">
      {%- assign card_icons = "leaf,sprout,bouquet" | split: "," -%}
      {% for post in site.posts %}
      {%- assign mi = forloop.index0 | modulo: 3 -%}
      {%- assign card_icon = card_icons[mi] -%}
      <article class="blog-card" data-title="{{ post.title | strip_html | escape | downcase }}" data-text="{{ post.title | append: ' ' | append: post.description | append: ' ' | append: post.content | strip_html | escape | downcase }}">
        <a href="{{ site.baseurl }}{{ post.url }}" class="blog-card-link">
          <div class="blog-card-body">
            <span class="blog-card-icon">{% include icon.html name=card_icon %}</span>
            <time class="blog-card-date">{{ post.date | date: "%b %-d, %Y" }}</time>
            <h2 class="blog-card-title">{{ post.title }}</h2>
            <p class="blog-card-excerpt">{{ post.description | strip_html | truncatewords: 24 }}</p>
            <span class="blog-card-more">Read more →</span>
          </div>
        </a>
      </article>
      {% endfor %}
    </div>
    <p class="blog-empty" id="blog-empty" style="display:none;">No posts match your search.</p>
  </div>
</section>
