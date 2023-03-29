import React, { FormEvent, useCallback } from "react";

import { GoogleLogin } from "@react-oauth/google";
import { GoogleOAuthProvider } from "@react-oauth/google";
import useInput from "@hooks/useInput";
import {
  Form,
  Header,
  Input,
  Label,
  LoginBtn,
  SearchBox,
  Wrapper,
} from "@pages/LogIn/styles";
import { Link } from "react-router-dom";

const LogIn = () => {
  const clientId = "";

  const [email, onChangeEmail, setEmail] = useInput("");
  const [password, onChangePassword, setPassword] = useInput("");

  const onSubmit = useCallback(
    (e: FormEvent<HTMLFormElement>) => {
      e.preventDefault();
    },
    [email, password]
  );

  return (
    <>
      <Wrapper>
        <Header>BeanBay</Header>
        <Form onSubmit={onSubmit}>
          <Label>
            <Input
              type="text"
              id="id"
              name="id"
              value={email}
              onChange={onChangeEmail}
              placeholder="이메일"
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
          <LoginBtn type="submit">로그인</LoginBtn>
          <SearchBox>
            <span>비밀번호 찾기</span>
            <span>
              <span>신규 회원이신가요? </span>
              <Link style={{ fontWeight: "bold" }} to="/signup">
                회원 가입
              </Link>
            </span>
          </SearchBox>
        </Form>
        <div>또는</div>
        <GoogleOAuthProvider clientId={clientId}>
          <GoogleLogin
            onSuccess={(res) => {
              console.log(res);
            }}
          />
        </GoogleOAuthProvider>
      </Wrapper>
    </>
  );
};

export default LogIn;
