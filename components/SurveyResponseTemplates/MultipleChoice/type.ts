interface Answer {
  answerId: number;
  content: string;
}

interface Logic {
  conditionOfQuestionAnswers: Answer[];
  nextQuestionNumber: string;
}

interface CheckboxProps {
  checked: boolean;
}

export interface subProps {
  thisQuestion: MultipleQuestion;
  options: CheckboxProps[];
  setOptions: (newOptions: CheckboxProps[]) => void;
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
