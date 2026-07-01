export interface ProcessStep {
  /** Step number, e.g. "1" */
  n: string;
  /** Timing label, e.g. "Week 1" or "6 months out" */
  when: string;
  /** Step heading */
  title: string;
  /** Step description */
  body: string;
}

export interface ProcessStepsProps {
  /** Eyebrow label */
  eyebrow?: string;
  /** Section headline */
  headline?: string;
  /** Intro paragraph below the headline */
  intro?: string;
  /** Array of process steps */
  steps?: ProcessStep[];
}

declare function ProcessSteps(props?: ProcessStepsProps): string;
export default ProcessSteps;
