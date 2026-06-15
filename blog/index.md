---
layout: default
title: "Blog"
permalink: /blog
---

<header class="page-header">
  <span class="label">Blog</span>
  <h1>Flowers, farming,<br>and the Sierra Nevada.</h1>
  <p>Seasonal notes, wedding inspiration, and thoughts from the farm at Golden Flowers.</p>
</header>

<section class="section">
  <div class="container" style="max-width:900px;">
    {% for post in site.posts %}
    <article style="padding:36px 0;border-bottom:1px solid var(--bor);">
      <h2 style="font-family:var(--f-d);font-style:italic;font-weight:300;font-size:clamp(1.6rem,3vw,2.4rem);line-height:1.15;color:var(--fg);margin-bottom:12px;">
        <a href="{{ site.baseurl }}{{ post.url }}" style="color:inherit;">{{ post.title }}</a>
      </h2>
      <p style="font-size:.9rem;color:var(--fg2);line-height:1.75;max-width:640px;margin-bottom:16px;">{{ post.excerpt | strip_html | truncatewords: 30 }}</p>
      <a href="{{ site.baseurl }}{{ post.url }}" style="font-size:.7rem;letter-spacing:.12em;text-transform:uppercase;color:var(--acc);border-bottom:1px solid oklch(34% .09 148 / .3);padding-bottom:2px;">Read more →</a>
    </article>
    {% endfor %}
  </div>
</section>
