export interface HeroProps {
  /** Eyebrow label above the headline */
  eyebrow?: string;
  /** Large display headline. Can include `<em>` for forest-colored emphasis */
  headline?: string;
  /** Subheading below the headline (max ~32ch) */
  subhead?: string;
  /** Primary CTA button */
  primaryCta?: { text: string; href: string };
  /** Secondary ghost CTA */
  secondaryCta?: { text: string; href: string };
  /** Background image path — if omitted, use a dark gradient */
  bgImage?: string;
}

declare function Hero(props?: HeroProps): string;
export default Hero;
