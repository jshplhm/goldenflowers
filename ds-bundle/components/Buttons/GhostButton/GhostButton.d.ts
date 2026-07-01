export interface GhostButtonProps {
  /** Button label text */
  text: string;
  /** Link destination */
  href?: string;
  /** 'ghost' = white outline on dark bg | 'ghost-ink' = ink outline on light bg */
  variant?: 'ghost' | 'ghost-ink';
}

declare function GhostButton(props: GhostButtonProps): string;
export default GhostButton;
