export interface Exec {
  initials: string;
  name: string;
  role: string;
  uni: string;
  now: string;
  ph1: string;
  ph2: string;
  linkedin?: string;
  website?: string;
  headshot?: string;
}

export interface Stat {
  n: string;
  l: string;
}

export interface Year {
  year: number;
  theme: string;
  accent: string;
  artComponent: string;
  location: string;
  desc: string;
  website?: string;
  stats: Stat[];
  execs: Exec[];
  /** Local path or URL for the year's mark used in the timeline rail. */
  icon?: string;
}
