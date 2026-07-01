export interface TestimonialProps {
  /** Star rating string, e.g. "★★★★★" */
  stars?: string;
  /** The quote text (without quotation marks — added by CSS) */
  quote?: string;
  /** Attribution: couple name */
  name?: string;
  /** Attribution: venue */
  venue?: string;
}

declare function Testimonial(props?: TestimonialProps): string;
export default Testimonial;
