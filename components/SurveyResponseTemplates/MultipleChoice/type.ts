export interface Answer {
  answerId: number;
  content: string;
}

interface Logic {
  conditionOfQuestionAnswers: Answer[];
  nextQuestionNumber: string;
}

export interface subProps {
  thisQuestion: MultipleQuestion;
}

export interface MultipleQuestion {
  questionId: number;
  type: string;
  title: string;
  explanation: string;
  finalQuestion: boolean;
  nextQuestionNumber: string;
  questionNumber: string;
  numberOfAnswerChoices: number;
  answers: Answer[];
  logics: Logic[];
}
