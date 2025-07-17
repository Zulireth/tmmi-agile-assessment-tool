
export enum AnswerOptionValue {
  STRONGLY_DISAGREE = 1,
  SLIGHTLY_DISAGREE = 2,
  SLIGHTLY_AGREE = 3,
  STRONGLY_AGREE = 4,
  NO_OPINION = 0, // Will not be counted in average score
}

export interface AnswerOption {
  value: AnswerOptionValue;
  label: string;
  colorClass?: string; // For styling the selected option
}

export interface Question {
  options: any;
  id: string;
  text: string;
  processAreaId: string;
  levelId: string;
}

export interface ProcessArea {
  id: string;
  name: string;
  levelId: string;
  questions: Question[];
  feedbackTemplate: (score: number) => string;
  shortName: string; // e.g., "2.1"
}

export interface TMMiLevel {
  id: string;
  name: string;
  levelNumber: number;
  processAreas: ProcessArea[];
  overallFeedbackTemplate: (averageLevelScore: number, paScores: ProcessAreaResult[]) => string;
}

export interface UserAnswer {
  questionId: string;
  answer: AnswerOptionValue | null;
}

export interface ProcessAreaResult {
  id: string;
  name: string;
  score: number;
  feedback: string;
  shortName: string;
}

export interface LevelResult {
  id: string;
  name: string;
  overallScore: number;
  overallFeedback: string;
  processAreaResults: ProcessAreaResult[];
}
