# WorkGrid

12-column portfolio photo grid. Two rows: row 1 = 1 large feature (8 cols) + 1 portrait (4 cols); row 2 = 4 equal quarter tiles (3 cols each).

## HTML

```html
<section class="work">
  <div class="work-head">
    <div>
      <span class="lab">Recent weddings</span>
      <h2 class="disp">The work</h2>
    </div>
    <a class="txt-link" href="/portfolio">View full portfolio</a>
  </div>
  <div class="grid">
    <a class="tile feature" href="/portfolio/emma-ross">
      <img src="/assets/images/wedding_photos/emma-feature.jpg" alt="Emma & Ross, Edgewood Tahoe">
      <div class="cap"><b>Emma &amp; Ross</b><span>Edgewood Tahoe</span></div>
    </a>
    <a class="tile portrait" href="/portfolio/niamh-nick">
      <img src="/assets/images/wedding_photos/niamh-portrait.jpg" alt="">
      <div class="cap"><b>Niamh &amp; Nick</b><span>Hellman-Ehrman Mansion</span></div>
    </a>
    <!-- 4× .tile.quarter -->
    <a class="tile quarter" href="#">...</a>
  </div>
</section>
```

## Rules

- `.grid`: `display: grid; grid-template-columns: repeat(12, 1fr); gap: 16px`.
- `.feature`: `grid-column: span 8; height: clamp(360px, 44vw, 580px)`.
- `.portrait`: `grid-column: span 4; height: clamp(360px, 44vw, 580px)`.
- `.quarter`: `grid-column: span 3; height: clamp(240px, 24vw, 340px)`.
- Images: `width:100%; height:100%; object-fit:cover` inside `.tile`.
- Caption `.cap` appears on hover. Never shows by default.
- `.tile::after` gradient overlay appears on hover — don't add separately.
- On mobile: feature/portrait become full-width; quarters become half-width.
- Use real couple names from the portfolio only.

## Work-head layout

- Left: `.lab` eyebrow + `.disp` headline.
- Right: `.txt-link` "View full portfolio" — always present.
