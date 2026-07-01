export interface FooterProps {
  /** Brand name top-left */
  brand?: string;
  /** Tagline below brand */
  tagline?: string;
  /** Footer CTA button (outline style) */
  cta?: { text: string; href: string };
  /** Copyright year */
  year?: number;
}

declare function Footer(props?: FooterProps): string;
export default Footer;
