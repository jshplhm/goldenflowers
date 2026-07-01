export interface ImmersiveQuoteProps {
  /** Eyebrow label in terra-soft color */
  eyebrow?: string;
  /** Large display quote or statement */
  quote?: string;
  /** Background image path — if omitted use dark forest gradient */
  bgImage?: string;
}

declare function ImmersiveQuote(props?: ImmersiveQuoteProps): string;
export default ImmersiveQuote;
