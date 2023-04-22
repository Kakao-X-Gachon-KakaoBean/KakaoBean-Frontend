export interface MultipleQuestion {
  id: string;
  type: string;
  title: string;
  explanation: string;
  questionNumber: string;
  numberOfAnswerChoices: number;
  answers: string[];
  logics: string[];
}
