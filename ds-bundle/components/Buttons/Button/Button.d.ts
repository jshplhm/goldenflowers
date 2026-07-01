export interface ButtonProps {
  /** Button label text */
  text: string;
  /** Link destination */
  href?: string;
  /** 'terra' (default, terracotta fill) | 'ink' (dark fill) */
  variant?: 'terra' | 'ink';
}

declare function Button(props: ButtonProps): string;
export default Button;
