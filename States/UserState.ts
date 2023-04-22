import { atom } from "recoil";

export interface IUser {
  isLoggingIn: boolean;
  name: string;
  age: any;
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
