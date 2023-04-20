import { atom } from "recoil";

export const countState = atom({
  key: "countQuestions",
  default: 0,
});
