/**
 * Game Type Definitions
 * 漏水探偵ゲームの型定義
 */

export interface Choice {
  id: string;
  text: string;
  isCorrect: boolean;
  scoreChange: number;
  resultNarrative: string;
  resultImage: string;
  explanation: string;
  memoItems?: string[];
}

export interface Step {
  stepNumber: number;
  title: string;
  image: string;
  narrative: string;
  choices: Choice[];
}

export interface CaseEnding {
  title: string;
  image: string;
  narrative: string;
  successImage: string;
  successNarrative: string;
  lessons?: string[];
  jobAttraction: string[];
}

export interface CaseOpening {
  title: string;
  images: string[];
  narrative: string;
}

export interface GameCase {
  id: string;
  title: string;
  description: string;
  opening: CaseOpening;
  steps: Step[];
  ending: CaseEnding;
}

export interface GameState {
  caseId: string;
  currentStep: number;
  totalScore: number;
  memo: string[];
  isGameComplete: boolean;
  selectedChoices: string[];
}

export interface GameRanking {
  rank: "S" | "A" | "B" | "C" | "D" | "F";
  minScore: number;
  maxScore: number;
  message: string;
}

export const RANKING_THRESHOLDS: GameRanking[] = [
  { rank: "S", minScore: 30, maxScore: 100, message: "完璧な調査！プロの調査員です。" },
  { rank: "A", minScore: 20, maxScore: 29, message: "優秀な調査。ほぼ完璧です。" },
  { rank: "B", minScore: 10, maxScore: 19, message: "良好な調査。基本ができています。" },
  { rank: "C", minScore: 0, maxScore: 9, message: "合格。改善の余地があります。" },
  { rank: "D", minScore: -20, maxScore: -1, message: "要改善。もう一度チャレンジ！" },
  { rank: "F", minScore: -100, maxScore: -21, message: "不合格。基本から学び直そう。" },
];

export function getRankingByScore(score: number): GameRanking {
  return RANKING_THRESHOLDS.find((r) => score >= r.minScore && score <= r.maxScore) || RANKING_THRESHOLDS[RANKING_THRESHOLDS.length - 1];
}
