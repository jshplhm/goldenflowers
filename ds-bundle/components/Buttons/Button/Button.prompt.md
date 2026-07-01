# Button

Pill-shaped filled CTA button. Two filled variants; use ghost variants for secondary actions on dark backgrounds.

## HTML

```html
<!-- Terra (primary, default) -->
<a class="btn" href="/consultation">Book a consultation</a>

<!-- Ink (dark fill, secondary on light bg) -->
<a class="btn btn-ink" href="/portfolio">See our portfolio</a>

<!-- Primary alias (same as terra) -->
<a class="btn btn-primary" href="#">Check my date</a>
```

## Rules

- `.btn` alone = terra fill (`var(--terra)`), white text. The default CTA.
- Add `.btn-ink` for dark (`var(--ink)`) fill. Use as secondary alongside `.btn`.
- Add `.btn-primary` as an alias to `.btn` — same visual, used in some page templates.
- Never use inline `background-color` — always the class.
- Hover lifts 2px and brightens. No JS needed.
- Use `<a>` for links, `<button>` for form submissions.

## Context

- First CTA on any page: `.btn` (terra). Second/alternate: `.btn-ink` or `.btn.ghost-ink`.
- Nav pill CTA uses `.pill` (a separate component, not `.btn`).
