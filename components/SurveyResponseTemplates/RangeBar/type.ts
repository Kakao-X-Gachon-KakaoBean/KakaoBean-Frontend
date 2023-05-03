export interface subProps {
  thisQuestion: RangeBarQuestion;
}
export interface RangeBarQuestion {
  type: string;
  questionId: number;
  title: string;
  explanation: string;
  questionNumber: string;
  finalQuestion: boolean;
  nextQuestionNumber: string;
  min: number;
  max: number;
}
