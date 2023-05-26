import React, {
  ChangeEvent,
  FC,
  FormEvent,
  useCallback,
  useState,
} from "react";

import { toast, ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import axios, { AxiosError } from "axios";

import {
  Wrapper,
  CheckBtn,
  Correct,
  Form,
  EmailLabel,
  Error,
  Input,
  Div,
  Header,
  Button,
  InputKey,
  Label,
  InputKeyWithText,
} from "@components/PasswordModal/styles";
import { PaswwordModal } from "@components/PasswordModal/type";
import { useMutation } from "react-query";
import { Search } from "@components/SearchEmail/type";
import useInput from "../../hooks/useInput";

const SearchPassword: FC<PaswwordModal> = ({
  name,
  onChangeName,
  onClosePasswordModal,
  birth,
  onChangeBirth,
}) => {
  const [email, onChangeEmail, setEmail] = useInput("");
  const [password, , setPassword] = useInput("");
  const [checkPassword, , setCheckPassword] = useInput("");
  const [emailAuthKey, onChangeEmailAuthKey, seyAuthKey] = useInput("");
  const [failUseEmail, setFailUseEmail] = useState(false);
  const [mismatchError, setMismatchError] = useState(false);

  //입력한 이메일로 인증번호 보내기
  const onSubmitEmail = useCallback(
    (e?: React.MouseEvent<HTMLButtonElement, MouseEvent>) => {
      e?.preventDefault();
      const message = (message: string) => (
        <div style={{ fontSize: "1rem" }}>{message}</div>
      );

      if (!email || !email.trim()) return;

      axios
        .post(
          "http://localhost:8080/emails",
          { email },
          { withCredentials: true }
        )
        .then((response) => {
          setFailUseEmail(true);
          toast(message("메일로 인증번호가 발송되었습니다."), {
            type: "success",
          });
        })
        .catch((error) => {
          toast(message("메일 주소를 확인해주세요."), { type: "error" });
          setFailUseEmail(false);
          console.log(error.response);
        });
    },
    [email]
  );

  const onChangePassword = useCallback(
    (e: ChangeEvent<HTMLInputElement>) => {
      setPassword(e.target.value);
      setMismatchError(e.target.value === checkPassword);
    },
    [password, setPassword]
  );

  const onChangeCheckPassword = useCallback(
    (e: ChangeEvent<HTMLInputElement>) => {
      setCheckPassword(e.target.value);
      setMismatchError(e.target.value === password);
    },
    [password, setCheckPassword]
  );

  const stopPropagation = useCallback(
    (e: React.SyntheticEvent<EventTarget>) => {
      e.stopPropagation();
    },
    []
  );

  //url 수정 필요할수도
  const mutation = useMutation<
    Search,
    AxiosError,
    {
      email: string;
      emailAuthKey: string;
      password: string;
      checkPassword: string;
    }
  >(
    "searchEmail",
    (data) =>
      axios
        .post("http://localhost:8080/members/find-password", data, {
          withCredentials: true,
        })
        .then((response) => response.data),
    {
      onMutate() {
        // setLogInError(false);
      },
      onSuccess() {
        console.log("요청 성공");
      },
      onError(error) {
        // setLogInError(error.response?.data?.code === 401);
        alert("정보를 잘못 입력하셨습니다.");
      },
    }
  );

  const onSubmit = useCallback(
    (e) => {
      e.preventDefault();
      mutation.mutate({ email, emailAuthKey, password, checkPassword });
    },
    [email, emailAuthKey, password, checkPassword, mutation]
  );

  return (
    <Wrapper onClick={stopPropagation}>
      <Form>
        <Div>
          <Header>비밀번호 변경</Header>
        </Div>
        <button onClick={onClosePasswordModal}>X</button>
      </Form>

      <EmailLabel>
        <Input
          type="email"
          id="email"
          name="email"
          value={email}
          onChange={onChangeEmail}
          placeholder="이메일"
        />
        <CheckBtn
          type="button"
          onClick={(e) => {
            onSubmitEmail(e);
          }}
        >
          이메일 인증
        </CheckBtn>
      </EmailLabel>

      <Label>
        <Input
          type="text"
          id="authKey"
          name="authKey"
          value={emailAuthKey}
          onChange={onChangeEmailAuthKey}
          placeholder="인증번호 입력"
        />
      </Label>
      <Label>
        <Input
          type="password"
          id="password"
          name="password"
          value={password}
          onChange={onChangePassword}
          placeholder="비밀번호"
        />
      </Label>
      <Label>
        <Input
          type="password"
          id="passwordCheck"
          name="passwordCheck"
          value={checkPassword}
          onChange={onChangeCheckPassword}
          placeholder="비밀번호 확인"
        />
        {!mismatchError && checkPassword.length >= 1 && (
          <Error>비밀번호가 일치하지 않습니다!</Error>
        )}
        {mismatchError && checkPassword.length >= 1 && (
          <Correct>비밀번호가 일치합니다!</Correct>
        )}
      </Label>

      {/*{failUseEmail && !proveEmail && (*/}
      {(!mismatchError && checkPassword.length >= 1) ||
      (mismatchError && checkPassword.length >= 1) ? (
        <InputKeyWithText>
          <Form onSubmit={onSubmit}>
            <Button type="submit">비밀번호 변경</Button>
          </Form>
        </InputKeyWithText>
      ) : (
        <InputKey>
          <Form onSubmit={onSubmit}>
            <Button type="submit">비밀번호 변경</Button>
          </Form>
        </InputKey>
      )}

      {/*)}*/}
    </Wrapper>
  );
};

export default SearchPassword;
