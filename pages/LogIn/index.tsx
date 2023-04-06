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
import { useQuery } from "react-query";

import { IUser } from "../../States/UserState";

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

  // async function UserPost() {
  //   const response = await fetch(`https://kakaoBean/members`);
  //   return response.json();
  // }
  //
  // const {
  //   data: UserData,
  //   isError,
  //   error: any,
  //   isLoading,
  // } = useQuery(["postUser"], () => UserPost());
  // if (isLoading) return <h3>Loading....</h3>;
  // if (isError)
  //   return (
  //     <>
  //       <p>{error.toString()}</p>
  //     </>
  //   );

  // const User = async (addUser: IUser): Promise<IUser> => {
  //   const { name, age, gender, email, password, checkPassword, birth } =
  //     await axios.post<IUser>(`/https://kakaoBean/members`, {
  //       name,
  //       age,
  //       gender,
  //       email,
  //       password,
  //       checkPassword,
  //       birth,
  //     });
  //   return data;
  // };

  //구글 로그인
  const { data: GoogleData } = useQuery("getGoogle", () =>
    axios
      .get("http://localhost:8080/oauth2/authorization/google")
      .then(({ data }) => data)
  );

  //카카오 로그인
  const { data: KakaoData } = useQuery("getKakao", () =>
    axios
      .get("http://localhost:8080/oauth2/authorization/google")
      .then(({ data }) => data)
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
