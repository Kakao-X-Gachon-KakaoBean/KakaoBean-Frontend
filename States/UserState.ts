import { atom } from "recoil";

export interface IUser {
  isLoggingIn: boolean;
  name: string;
  age: number;
  gender: string;
  email: string;
  password: string;
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
  title: string;
  options: string[];
}

export interface SubjectiveQuestion {
  title: string;
}

export interface RangeBarQuestion {
  title: string;
  value: number;
  min: number;
  max: number;
}
