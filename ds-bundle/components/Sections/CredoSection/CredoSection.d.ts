export interface FactItem {
  /** Numbered label, e.g. "01" */
  n: string;
  /** Fact heading */
  title: string;
  /** Supporting body copy (max ~34ch) */
  body: string;
}

export interface CredoSectionProps {
  /** Eyebrow label */
  eyebrow?: string;
  /** Display headline. Use `<em>` for forest accent */
  headline?: string;
  /** Array of 2–4 fact items */
  facts?: FactItem[];
}

declare function CredoSection(props?: CredoSectionProps): string;
export default CredoSection;
