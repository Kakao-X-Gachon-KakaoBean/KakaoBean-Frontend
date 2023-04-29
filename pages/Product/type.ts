export interface LogicDetail {
  conditionOfQuestionAnswers: any[];
  nextQuestionNumber: string;
}

export interface Logic {
  id: string;
  logics: LogicDetail[];
}
