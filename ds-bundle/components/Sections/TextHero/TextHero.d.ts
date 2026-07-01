export interface TextHeroProps {
  /** Eyebrow label (`.lab`) above the headline */
  eyebrow?: string;
  /** H1 headline. Use `<em>` for forest-color accent */
  headline?: string;
  /** Subhead below headline (max ~42ch) */
  sub?: string;
  /** CTA button below subhead */
  cta?: { text: string; href: string };
}

declare function TextHero(props?: TextHeroProps): string;
export default TextHero;
