export type PhaseStatus = 'complete' | 'in-progress' | 'upcoming';

export interface Phase {
  number: number;
  title: string;
  status: PhaseStatus;
  items: string[];
  quarter?: string;
}

export interface Stat {
  value: string;
  label: string;
  suffix?: string;
  prefix?: string;
  isNumeric: boolean;
}
