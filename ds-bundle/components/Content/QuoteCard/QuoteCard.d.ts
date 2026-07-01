export interface QuoteCardItem {
  stars?: string;
  quote: string;
  name: string;
  venue: string;
}

export interface QuoteCardProps {
  /** Array of 2–4 testimonial items */
  quotes?: QuoteCardItem[];
}

declare function QuoteCard(props?: QuoteCardProps): string;
export default QuoteCard;
