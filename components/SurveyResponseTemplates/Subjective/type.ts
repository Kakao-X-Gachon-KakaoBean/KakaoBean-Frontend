export interface subProps {
  thisQuestion: SubjectiveQuestion;
}
export interface SubjectiveQuestion {
  type: string;
  questionId: number;
  title: string;
  explanation: string;
  questionNumber: string;
  finalQuestion: boolean;
  nextQuestionNumber: string;
}
