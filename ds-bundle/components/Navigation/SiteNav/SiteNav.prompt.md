# SiteNav

Fixed top navigation bar for all Golden Flowers pages.

## HTML pattern

```html
<nav class="site-nav nav-anim">
  <a class="brand" href="/">Golden Flowers</a>
  <div class="nav-r">
    <a href="/weddings">Weddings</a>
    <a href="/portfolio">Portfolio</a>
    <a href="/process">Process</a>
    <a href="/about">About</a>
    <a href="/blog">Blog</a>
    <a class="pill" href="/consultation">Check my date</a>
  </div>
</nav>
```

## Variants

- **Solid** (default): `background: var(--bg)`, `color: var(--ink)`. Used on interior pages.
- **Over hero** (add class `over-hero`): transparent background, `color: var(--paper)`. Use on pages with a full-bleed hero image — the nav transitions to solid on scroll via JS.

## Rules

- Always `position: fixed; top: 0` — add `padding-top: ~80px` to the first content element below.
- `nav-anim` class enables scroll transitions. Omit on initial paint to suppress flash.
- The `.pill` CTA is always the rightmost element. It links to `/consultation` or `/p/<slug>`.
- Nav links use the `active` class on the current page.
- On mobile (≤860px): `.nav-r` hides; a hamburger `.nav-toggle` appears instead.

## Typography

- Brand: `var(--d)` (Cormorant Garamond), 1.62rem
- Nav links: `var(--b)` (DM Sans), 0.84rem, letter-spacing 0.02em
- Pill: `var(--b)`, 0.82rem
