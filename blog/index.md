---
layout: redesign
hero_nav: true
title: "Blog"
seo_title: "Lake Tahoe Wedding Flower Journal | Golden Flowers"
permalink: /blog
description: "Notes on flowers, farming, and Sierra Nevada weddings from Golden Flowers, a Lake Tahoe wedding florist. Seasonal guides, venue ideas, and the story behind our foam-free, California-grown design."
canonical_url: https://goldenflorals.com/blog
redirect_from:
  - /natures-canvas-lake-tahoe-wedding-flowers
---

<!-- HERO -->
<header class="hero hero-sm">
  <img class="bg" src="{{ site.baseurl }}/assets/images/portfolio/kelly-dylan/kelly-dylan-05.jpg" alt="Seasonal California-grown wedding florals by Golden Flowers" style="object-position:center 45%;">
  <div class="hero-in">
    <p class="ey lab">Blog</p>
    <h1 class="disp">Flowers, farming &amp; the <em>Sierra Nevada.</em></h1>
    <div class="hero-foot">
      <p class="hero-sub">Seasonal notes, wedding inspiration, and thoughts from the farm.</p>
    </div>
  </div>
</header>

<section class="block">
  <div class="blog-toolbar">
    <input type="search" id="blog-search" class="blog-search" placeholder="Search posts…" aria-label="Search posts">
    <span class="blog-count" id="blog-count"></span>
  </div>
  <div class="blog-grid" id="blog-grid">
    {% for post in site.posts %}
    <article class="blog-card" data-text="{{ post.title | append: ' ' | append: post.description | append: ' ' | append: post.content | strip_html | escape | downcase }}">
      <a href="{{ site.baseurl }}{{ post.url }}" class="blog-card-link">
        <h2 class="blog-card-title">{{ post.title }}</h2>
        <p class="blog-card-excerpt">{{ post.description | strip_html | truncatewords: 24 }}</p>
        <span class="blog-card-more">Read more &rarr;</span>
      </a>
    </article>
    {% endfor %}
  </div>
  <button type="button" id="blog-more" class="blog-more">Load more posts</button>
  <p class="blog-empty" id="blog-empty" style="display:none;">No posts match your search.</p>
</section>

<section class="cta">
  <span class="lab">One wedding per date</span>
  <h2 class="disp">Planning your <em>Sierra wedding?</em></h2>
  <p>Tell us your date and venue — we'll let you know if we're available while it's still yours.</p>
  <a class="btn btn-ink" href="{{ site.baseurl }}/consultation-form">Check your date <span>&rarr;</span></a>
</section>

<script>
(function(){
  var PAGE=12;
  var grid=document.getElementById('blog-grid');
  var cards=Array.prototype.slice.call(grid.querySelectorAll('.blog-card'));
  var search=document.getElementById('blog-search');
  var count=document.getElementById('blog-count');
  var more=document.getElementById('blog-more');
  var empty=document.getElementById('blog-empty');
  var shown=PAGE, q='';

  function matches(card){ return !q || card.dataset.text.indexOf(q)>-1; }
  function render(){
    var visible=cards.filter(matches);
    cards.forEach(function(c){ c.style.display='none'; });
    var limit = q ? visible.length : shown;
    visible.slice(0, limit).forEach(function(c){ c.style.display=''; });
    empty.style.display = visible.length ? 'none' : '';
    more.style.display = (!q && visible.length>shown) ? '' : 'none';
    count.textContent = visible.length + (visible.length===1?' post':' posts');
  }
  search.addEventListener('input', function(){ q=this.value.trim().toLowerCase(); shown=PAGE; render(); });
  more.addEventListener('click', function(){ shown+=PAGE; render(); });
  render();
})();
</script>
