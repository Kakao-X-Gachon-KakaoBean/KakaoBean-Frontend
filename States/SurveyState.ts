import { atom } from "recoil";
import { MultipleQuestion } from "@components/CreateSurveyDnd/QuestionItems/MultipleChoiceQuestions/type";
import { SubjectiveQuestion } from "@components/CreateSurveyDnd/QuestionItems/SubjectiveQuestions/type";
import { RangeBarQuestion } from "@components/CreateSurveyDnd/QuestionItems/RangeBarQuestions/type";
import ReactFlow, { Node } from "react-flow-renderer";

export const countState = atom({
  key: "countQuestions",
  default: 1,
});

export const createSurveyOptionState = atom({
  key: "createSurveyOptionState",
  default: "option",
});

export const selectedQuestionState = atom<
  MultipleQuestion | SubjectiveQuestion | RangeBarQuestion
>({
  key: "selectedQuestionState",
  default: {
    id: "",
    type: "NONE",
    title: "",
    explanation: "",
    questionNumber: "",
    finalQuestion: false,
    nextQuestionNumber: "0",
  },
});

export const selectedNodeState = atom<Node>({
  key: "selectedNodeState",
  default: {
    id: "-",
    data: "",
    position: { x: 0, y: 0 },
  },
});

type QuestionTypes = MultipleQuestion | SubjectiveQuestion | RangeBarQuestion;
export const questionsState = atom<QuestionTypes[]>({
  key: "questionsState",
  default: [],
});

export const currentTabState = atom({
  key: "currentTab",
  default: "CreateSurvey",
});
