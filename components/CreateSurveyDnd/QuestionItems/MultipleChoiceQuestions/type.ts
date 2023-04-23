export interface Logic {
  conditionOfQuestionAnswers: string[];
  nextQuestionNumber: string;
}

export interface MultipleQuestion {
  id: string;
  type: string;
  title: string;
  explanation: string;
  finalQuestion: boolean;
  nextQuestionNumber: string;
  questionNumber: string;
  numberOfAnswerChoices: number;
  answers: string[];
  logics: Logic[];
}
