import React, { FC, FormEvent, useCallback, useState } from "react";

import {
  Button,
  Div,
  EmailInput,
  Form,
  Header,
  Input,
} from "@components/EmailModal/styles";

import axios from "axios";

import { Wrapper } from "@components/EmailModal/styles";
import { InputKey } from "@components/EmailModal/styles";
import { EmailModal } from "@components/EmailModal/type";

const SendProveEmail: FC<EmailModal> = ({
  email,
  onChangeEmail,
  onCloseCheckEmailModal,
  authKey,
  onChangeAuthKey,
}) => {
  const [proveEmail, setProveEmail] = useState(false);

  //이메일 인증 보내기
  const onSubmitProveEmail = useCallback(
    (e: FormEvent<HTMLFormElement>) => {
      e.preventDefault();

      if (!authKey && !authKey.trim()) return;

      axios
        .post(
          "",
          {
            email: email,
            authKey: authKey,
          },
          { withCredentials: true }
        )
        .then((response) => {
          setProveEmail(true);
          console.log(response);
        })
        .catch((error) => {
          setProveEmail(false);
          alert("인증 번호를 다시 입력해주세요.");
          console.log(error.response);
        });
    },
    [authKey]
  );

  const stopPropagation = useCallback(
    (e: React.SyntheticEvent<EventTarget>) => {
      e.stopPropagation();
    },
    []
  );

  return (
    <Wrapper onClick={stopPropagation}>
      <Form>
        <Div>
          <Header>이메일 인증</Header>
        </Div>
        <button onClick={onCloseCheckEmailModal}>X</button>
      </Form>

      {/*{failUseEmail && !proveEmail && (*/}
      <InputKey>
        <Form onSubmit={onSubmitProveEmail}>
          <EmailInput
            type="text"
            value={authKey}
            onChange={onChangeAuthKey}
            placeholder="인증번호 입력"
          />
          {proveEmail && <div>이메일 인증이 완료되었습니다.</div>}
          <Button type="submit">인증 확인</Button>
        </Form>
      </InputKey>
      {/*)}*/}
    </Wrapper>
  );
};

export default SendProveEmail;
