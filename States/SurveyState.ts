import { atom } from "recoil";

export const countState = atom({
  key: "countQuestions",
  default: 0,
});

export const createSurveyOptionState = atom({
  key: "createSurveyOptionState",
  default: "option",
});
