export interface EvaluationCriterion {
  name: string;
  weight: string;
}

export interface ProblemStatement {
  id: string;
  code: string;
  title: string;
  category:
    | 'Mobility & EV'
    | 'Industry 4.0'
    | 'AI & Healthcare'
    | 'Robotics & Hardware'
    | 'CleanTech & Sustainability'
    | 'Architecture & Design';
  tagline: string;
  problem: string;
  challenge: string;
  challenge36h: string[];
  evaluationCriteria: EvaluationCriterion[];
  horizonPhilosophy: string;
  keyTesting: string[];
}

export const fontCategories = [
  'All Tracks',
  'Mobility & EV',
  'Industry 4.0',
  'AI & Healthcare',
  'Robotics & Hardware',
  'CleanTech & Sustainability',
  'Architecture & Design',
] as const;

export const problemStatements: ProblemStatement[] = [];
