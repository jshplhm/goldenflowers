# Golden Flowers — Design Audit & v2 Direction

A "best of both worlds" synthesis of the **live site** and the **v3 redesign**.

## What each does well

**Live site**
- Warm, romantic, editorial feel — terracotta + sage + warm imagery read as a real florist, not a SaaS template.
- Soft, tactile **rounded tiles** with gentle shadows; cards feel inviting.
- Elegant italic Cormorant heroes, low and centered.
- A strong, classic dark prefooter conversion moment.

**Live weaknesses:** inconsistent type sizes/spacing, dead CSS, mixed button radii; sectional rhythm is repetitive (label → centered headline → grid, over and over).

**v3 redesign**
- Clean, consistent **infrastructure**: one type system (Cormorant display / DM Sans body / DM Mono eyebrows), a real spacing scale, semantic OKLCH tokens.
- More **variety of blocks**: dark feature panels, editorial moments, tinted bands, full-bleed, a real carousel, the pledge.
- Better hierarchy and a cleaner nav/footer.

**v3 weaknesses:** it reads a little **cold and "templatey."** Lots of flat 1px-hairline cards, green-heavy and cool, and the warmth/romance that sells a wedding florist got sanded off.

## The core insight

The v3 *structure and system* are the right foundation. What it lost is **texture, warmth, and temperature** — the things that made the live site feel handmade and romantic. So v2 keeps the clean bones and re-introduces warmth at the level of **material** (surfaces, shadows, color temperature), not layout.

## v2 moves (implemented on this branch)

1. **Soft, tactile card system.** Replace flat hairline cards with the live site's rounded, softly-shadowed tiles (8px radius, layered low-opacity shadow, hover lift). This single change does most of the warming.
2. **Terracotta as the romantic signature.** Green stays the action color (buttons/links), but the italic display accents in headings now use terracotta — the warm, romantic note returns to the typography, not just eyebrows/stars.
3. **Richer forest dark panels.** Dark sections move from flat near-black to a deeper, warmer forest green (a `--panel` tone distinct from body ink) — more "Golden Flowers," less corporate.
4. **Warmer depth on actions.** Primary buttons get a subtle green shadow so they feel raised and intentional.
5. Keep everything the redesign got right: the type system, spacing scale, block variety, carousel, dark CTA band, full-width FAQ, centered-low italic heroes, honesty-rule copy, the pledge.

## Still open / candidates for a v3 of this
- Image art-direction (consistent warm grade) would amplify the warmth further.
- Consider one signature motion detail (e.g., a slow image reveal on scroll) used once, not everywhere.
