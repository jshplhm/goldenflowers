export interface CtaSectionProps {
  /** Eyebrow label */
  eyebrow?: string;
  /** Headline. Use `<em>` for terra accent */
  headline?: string;
  /** Supporting copy (max ~42ch) */
  sub?: string;
  /** Primary CTA button */
  cta?: { text: string; href: string };
  /** 'standard' (default) | 'tall' (min-height 86vh, centered — used on thank-you pages) */
  variant?: 'standard' | 'tall';
}

declare function CtaSection(props?: CtaSectionProps): string;
export default CtaSection;
