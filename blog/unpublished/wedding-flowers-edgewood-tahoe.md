---
# REDIRECT STUB for a post that was unpublished on 2026-09-22 (Josh: "turned
# off" but kept in the background). The post itself is _posts/2026-02-22-wedding-flowers-edgewood-tahoe.md
# with `published: false`; this file only keeps its old url alive and sends it
# to the blog index, so nothing that linked to it 404s.
#
# IT REDIRECTS TO THE HOME PAGE, NOT /blog (Josh, 2026-09-22). These two posts
# were outranking goldenflorals.com itself for "lake tahoe wedding florist". A
# redirect hands a page's accumulated relevance to its target, so the target has
# to be the page that should hold that query: the home page is a close topical
# match for it, and /blog is a listing that will never rank for it and does not
# want to. Google discounts a redirect into an irrelevant page as a soft 404.
#
# jekyll-redirect-from renders this page as a redirect to `redirect_to`, and
# emits the noindex itself. sitemap: false keeps the redirect out of the
# sitemap. NOTE: on GitHub Pages this is a meta-refresh plus canonical, not a
# server 301, which is the strongest redirect available without a proxy.
title: "Wedding Flowers at Edgewood Tahoe: A Florist's Guide"
permalink: /natures-canvas-lake-tahoe-wedding-flowers/wedding-flowers-edgewood-tahoe/
redirect_to: /
sitemap: false
---
