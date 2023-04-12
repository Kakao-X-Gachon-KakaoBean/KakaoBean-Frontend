import { atom } from "recoil";

// item type interface
export interface QuestionTypeItem {
  id: string;
  type: string;
  content: string;
}
export  interface QuestionsItem {
  id: string;
  type: string;
  content: string;
}

// recoil atom state
 export const countState = atom({
  key: 'countQuestions',
  default: 0,
})


// droppable list type
export const getQuestionType = (): QuestionTypeItem[] => [
  {
      id: "0",
      type: "객관식",
      content: "객관식"
  },
  {
      id: "1",
      type: "주관식",
      content: "주관식"
  },
  {
      id: "2",
      type: "찬반형",
      content: "찬반형"
  }
];

export const getQuestions = (): QuestionsItem[] => [];