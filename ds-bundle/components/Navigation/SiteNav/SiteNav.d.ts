export interface SiteNavProps {
  /** Brand name displayed top-left. Default: "Golden Flowers" */
  brand?: string;
  /** Array of nav link labels. Default: ['Weddings','Portfolio','Process','About','Blog'] */
  links?: string[];
  /** Primary CTA pill in top-right corner */
  cta?: { text: string; href: string };
  /** When true, nav is transparent (use over hero images). Default: false (solid bg) */
  overHero?: boolean;
}

declare function SiteNav(props?: SiteNavProps): string;
export default SiteNav;
