import React, { FormEvent, useCallback } from "react";
import GoogleImg from "../../image/google-logo.png";
import KakaoImg from "../../image/kakao-logo.png";

import { GoogleLogin, useGoogleLogin } from "@react-oauth/google";
import { GoogleOAuthProvider } from "@react-oauth/google";
import useInput from "@hooks/useInput";
import {
  Form,
  GoogleBtn,
  Header,
  Img,
  Input,
  KakaoBtn,
  Label,
  LoginBtn,
  SearchBox,
  SocialLogin,
  Wrapper,
} from "@pages/LogIn/styles";
import { Link } from "react-router-dom";
import axios from "axios";

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
        {/*<GoogleOAuthProvider clientId={clientId}>*/}
        {/*  <GoogleLogin*/}
        {/*    onSuccess={(res) => {*/}
        {/*      console.log(res);*/}
        {/*    }}*/}
        {/*  />*/}
        {/*</GoogleOAuthProvider>*/}
        <SocialLogin>
          <GoogleBtn>
            <Img src={GoogleImg} alt="Google" />
            <div>Google로 계속</div>
          </GoogleBtn>
          <KakaoBtn>
            <Img src={KakaoImg} alt="Google" />
            <div>KaKao로 계속</div>
          </KakaoBtn>
        </SocialLogin>
      </Wrapper>
    </>
  );
};

export default LogIn;
