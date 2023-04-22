export interface MultipleQuestion {
  type: string;
  title: string;
  explanation: string;
  questionNumber: string;
  finalQuestion: boolean;
  numberOfAnswerChoices: number;
  nextQuestionNumber: string;
  answers: answers[];
  logics: logics[];
}

export interface answers {}

export interface logics {
  conditionOfQuestionAnswers: conditionOfQuestionAnswers[];
  nextQuestionNumber: string;
}

export interface conditionOfQuestionAnswers {
  numberOfAnswerChoices: number;
  answers: string[];
  logics: string[];
}
