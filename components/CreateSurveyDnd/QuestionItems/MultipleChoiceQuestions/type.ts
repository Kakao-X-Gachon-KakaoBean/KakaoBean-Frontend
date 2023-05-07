export interface LogicDetail {
  conditionOfQuestionAnswers: any[];
  nextQuestionNumber: string;
}

export interface Logic {
  conditionOfQuestionAnswers: any[];
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
