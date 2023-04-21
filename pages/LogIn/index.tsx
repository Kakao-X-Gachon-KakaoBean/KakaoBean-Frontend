import React, { FormEvent, useCallback, useState } from "react";
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

import axios, { AxiosError } from "axios";
import { useMutation, useQuery, useQueryClient } from "react-query";

import { IUser, UserState } from "../../States/UserState";
import { useRecoilState } from "recoil";
import fetcher from "@utils/fetcher";
import { Redirect } from "react-router";

const LogIn = () => {
  const [email, onChangeEmail, setEmail] = useInput("");
  const [password, onChangePassword, setPassword] = useInput("");
  const [user, setUser] = useRecoilState<IUser>(UserState);
  const [googleEnabled, setGoogleEnabled] = useState(false);
  const [kakaoEnabled, setKakaoEnabled] = useState(false);

  //구글 로그인 get
  const { data: googleData, refetch: googleRefetch } = useQuery(
    ["googleUser"],
    () =>
      fetcher({
        queryKey: "http://localhost:8080/oauth2/authorization/google",
      }),
    {
      enabled: googleEnabled,
    }
  );

  //카카오 로그인 get
  const { data: kakaoData, refetch: kakaoRefetch } = useQuery(
    ["kakaoUser"],
    () =>
      fetcher({ queryKey: "http://localhost:8080/oauth2/authorization/kakao" }),
    {
      enabled: kakaoEnabled,
    }
  );

  const mutation = useMutation<
    IUser,
    AxiosError,
    { email: string; password: string }
  >(
    "user",
    (data) =>
      axios
        .post("http://localhost:8080/local/login", data, {
          withCredentials: true,
        })
        .then((response) => response.data),
    {
      onMutate() {
        // setLogInError(false);
      },
      onSuccess() {
        // queryClient.refetchQueries('user');
        console.log(user);
        console.log("성공");
        setUser(user);
      },
      onError(error) {
        // setLogInError(error.response?.data?.code === 401);
        console.log("응 실패야 ㅋㅋ");
      },
    }
  );

  //로컬 로그인
  const onSubmit = useCallback(
    (e) => {
      e.preventDefault();
      mutation.mutate({ email, password });
      console.log(mutation);
    },
    [email, password, mutation]
  );

  //
  // if (isLoading) {
  //   return <div>로딩중...</div>;
  // }

  //로그인 정보 있을 시 메인으로 리다이렉트
  // if (user) {
  //   return <Redirect to="/main" />;
  // }

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
        <SocialLogin>
          <GoogleBtn
            href={
              "http://localhost:8080/oauth2/authorization/google?redirect_uri=http://localhost:3000/main"
            }
          >
            <Img src={GoogleImg} alt="Google" />
            <div>Google로 계속</div>
          </GoogleBtn>
          <KakaoBtn
            href={
              "http://localhost:8080/oauth2/authorization/kakao?redirect_uri=http://localhost:3000/main"
            }
          >
            <Img src={KakaoImg} alt="Google" />
            <div>KaKao로 계속</div>
          </KakaoBtn>
        </SocialLogin>
      </Wrapper>
    </>
  );
};

export default LogIn;
