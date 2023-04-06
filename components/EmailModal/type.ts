import { ChangeEvent } from "react";

export interface EmailModal {
  email: string;
  onChangeEmail: (e: ChangeEvent<HTMLInputElement>) => void;
  onCloseCheckEmailModal: () => void;
  authKey: string;
  onChangeAuthKey: (e: ChangeEvent<HTMLInputElement>) => void;
}
