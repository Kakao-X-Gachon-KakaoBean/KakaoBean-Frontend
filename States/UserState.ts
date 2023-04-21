import { atom } from "recoil";

export interface IUser {
  isLoggingIn: boolean;
  name: string;
  age: number;
  gender: string;
  email: string;
  password: string;
  emailAuthKey: string;
  checkPassword: string;
  birth: string;
  jwt: string;
  error: any;
}

const initialState: IUser = {
  isLoggingIn: false,
  name: "",
  age: 0,
  gender: "",
  email: "",
  password: "",
  emailAuthKey: "",
  checkPassword: "",
  birth: "",
  jwt: "",
  error: "",
};

export const UserState = atom({
  key: "UserState",
  default: initialState,
});

export const countState = atom({
  key: "countQuestions",
  default: 0,
});

export interface MultipleQuestion {
  type: string;
  title: string;
  explanation: string;
  questionNumber: string;
  numberOfAnswerChoices: number;
  answers: string[];
  logics: string[];
}

export interface SubjectiveQuestion {
  type: string;
  title: string;
  explanation: string;
  questionNumber: string;
}

export interface RangeBarQuestion {
  type: string;
  title: string;
  explanation: string;
  questionNumber: string;
  value: number;
  min: number;
  max: number;
}
