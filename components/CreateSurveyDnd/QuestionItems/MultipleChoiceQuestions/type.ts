export interface MultipleQuestion {
  type: string;
  title: string;
  explanation: string;
  questionNumber: string;
  numberOfAnswerChoices: number;
  answers: string[];
  logics: string[];
}
