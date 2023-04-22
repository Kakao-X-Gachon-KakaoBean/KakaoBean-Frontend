import { atom } from "recoil";
import { MultipleQuestion } from "@components/CreateSurveyDnd/QuestionItems/MultipleChoiceQuestions/type";
import { RangeBarQuestion } from "@components/CreateSurveyDnd/QuestionItems/RangeBarQuestions/type";
import { SubjectiveQuestion } from "@components/CreateSurveyDnd/QuestionItems/SubjectiveQuestions/type";
import { Survey } from "@components/CreateSurveyDnd/type";


export const countState = atom({
  key: "countQuestions",
  default: 0,
});
const MultiInitialState: MultipleQuestion = {
  type: "MULTIPLE",
  title: "",
  explanation: "",
  questionNumber: "",
  finalQuestion: false,
  numberOfAnswerChoices: 0,
  nextQuestionNumber: "",
  answers: [],
  logics: [],
};

const RangeInitialState: RangeBarQuestion = {
  type: "RANGE",
  title: "",
  explanation: "",
  questionNumber: "",
  finalQuestion: false,
  nextQuestionNumber: "",
  value: 0,
  min: 0,
  max: 5,
};

const SubjectInitialState: SubjectiveQuestion = {
  type: "ESSAY",
  title: "",
  explanation: "",
  questionNumber: "",
  finalQuestion: false,
  nextQuestionNumber: "",
};

const SurveyInitialState: Survey = {
  questions: [],
};

export const SurveyState = atom({
  key: "Survey",
  default: SurveyInitialState,
});

export const MultiState = atom({
  key: "Multi",
  default: MultiInitialState,
});

export const RangeState = atom({
  key: "Range",
  default: RangeInitialState,
});

export const SubjectState = atom({
  key: "Subject",
  default: SubjectInitialState,
});
