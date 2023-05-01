export interface RangeBarQuestion {
  type: string;
  title: string;
  explanation: string;
  questionNumber: string;
  finalQuestion: boolean;
  nextQuestionNumber: string;
  value: number;
  min: number;
  max: number;
}
