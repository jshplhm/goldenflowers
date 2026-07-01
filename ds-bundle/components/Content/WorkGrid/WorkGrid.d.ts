export interface WorkGridPhoto {
  /** Couple name for caption */
  label: string;
  /** Venue name for caption */
  venue: string;
  /** Grid span class: 'feature' (8/12) | 'portrait' (4/12) | 'quarter' (3/12) */
  span: 'feature' | 'portrait' | 'quarter';
  /** Image src path */
  src?: string;
  /** Link href */
  href?: string;
}

export interface WorkGridProps {
  /** Eyebrow label */
  eyebrow?: string;
  /** Section headline */
  headline?: string;
  /** "View all" link */
  viewAll?: { text: string; href: string };
  /** Array of photos. Standard layout: 1 feature + 1 portrait + 4 quarter */
  photos?: WorkGridPhoto[];
}

declare function WorkGrid(props?: WorkGridProps): string;
export default WorkGrid;
