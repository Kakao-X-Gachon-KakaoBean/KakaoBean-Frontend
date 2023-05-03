export interface LogicDetail {
  conditionOfQuestionAnswers: any[];
  nextQuestionNumber: string;
}

export interface Logic {
  id: Number;
  logics: LogicDetail[];
}
