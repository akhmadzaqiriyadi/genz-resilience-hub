export type PillarType = 'mindset' | 'skills' | 'social' | 'wellbeing';

export interface Question {
  id: number;
  pillar: PillarType;
  text: string;
  isReversed?: boolean; // untuk pertanyaan negatif yang perlu di-reverse scoring
}

export interface Answer {
  questionId: number;
  value: number; // 1-4 untuk Sangat Setuju sampai Tidak Setuju
}

export interface PillarScore {
  pillar: PillarType;
  name: string;
  score: number;
  percentage: number;
  level: 'excellent' | 'good' | 'needs-improvement' | 'focus-area';
  description: string;
  tips: string[];
}

export interface TestResult {
  overallScore: number;
  pillarScores: PillarScore[];
  profileType: string;
  profileDescription: string;
}
