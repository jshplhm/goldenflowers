export interface PricingBlockProps {
  /** Eyebrow label */
  eyebrow?: string;
  /** Heading */
  headline?: string;
  /** Main price display, e.g. "Starting at $4,500" */
  price?: string;
  /** Sub-label below price */
  sub?: string;
  /** List of included items */
  includes?: string[];
  /** Closing tagline in display type */
  tagline?: string;
}

declare function PricingBlock(props?: PricingBlockProps): string;
export default PricingBlock;
