import { atom } from "recoil";

// item type interface
export interface QuestionTypeItem {
  id: string;
  type: string;
  content: string;
}
export interface QuestionsItem {
  id: string;
  type: string;
  content: string;
}

// droppable list type
export const getQuestionType = (): QuestionTypeItem[] => [
  {
    id: "0",
    type: "객관식",
    content: "객관식",
  },
  {
    id: "1",
    type: "주관식",
    content: "주관식",
  },
  {
    id: "2",
    type: "선형배율",
    content: "선형배율",
  },
];

export const getQuestions = (): QuestionsItem[] => [];

export interface Survey {
  questions: questions[];
}

export interface questions {}
