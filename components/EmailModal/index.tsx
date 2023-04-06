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
  const [failUseEmail, setFailUseEmail] = useState(false);
  const [proveEmail, setProveEmail] = useState(false);

  //입력한 이메일로 인증번호 보내기
  const onSubmitEmail = useCallback(
    (e: FormEvent<HTMLFormElement>) => {
      e.preventDefault();

      if (!email && !email.trim()) return;

      axios
        .post(
          "",
          {
            email,
          },
          { withCredentials: true }
        )
        .then((response) => {
          setFailUseEmail(true);
          alert("이메일을 발송하였습니다.");
          console.log(response);
        })
        .catch((error) => {
          alert("이메일 발송에 실패했습니다.");
          setFailUseEmail(false);
          console.log(error.response);
        });
    },
    [email]
  );

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
      <Form onSubmit={onSubmitEmail}>
        <Div>
          <Header>이메일 인증</Header>
          <Button type="submit">보내기</Button>
        </Div>
        <Input
          type="email"
          id="email"
          onChange={onChangeEmail}
          name="email"
          value={email}
        ></Input>
        <button onClick={onCloseCheckEmailModal}>X</button>
      </Form>

      {/*{failUseEmail && !proveEmail && (*/}
      <InputKey>
        <form onSubmit={onSubmitProveEmail}>
          <EmailInput
            type="text"
            value={authKey}
            onChange={onChangeAuthKey}
            placeholder="인증번호 입력"
          />
          {proveEmail && <div>이메일 인증이 완료되었습니다.</div>}
          <Button type="submit">인증 확인</Button>
        </form>
      </InputKey>
      {/*)}*/}
    </Wrapper>
  );
};

export default SendProveEmail;
