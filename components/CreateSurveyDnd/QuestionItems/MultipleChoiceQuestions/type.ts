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
  questionNumber: string; // 문제 번호
  numberOfAnswerChoices: number; // 다중답안 개수
  answers: string[]; // 옵션들
  logics: Logic[];
}
