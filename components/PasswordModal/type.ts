import { ChangeEvent } from "react";

export interface PaswwordModal {
  name: string;
  onChangeName: (e: ChangeEvent<HTMLInputElement>) => void;
  onCloseEmailModal: () => void;
  birth: string;
  onChangeBirth: (e: ChangeEvent<HTMLInputElement>) => void;
}
