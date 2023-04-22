export interface RangeBarQuestion {
  type: string;
  title: string;
  explanation: string;
  questionNumber: string;
  finalQuestion: boolean;
  nextQuestionNumber: string;
  min: number;
  max: number;
  value: any;
}
