import React, { FormEvent, useCallback, useState } from "react";
import { LoginBtn, Wrapper, Label } from "@pages/LogIn/styles";
import { Header, SubHeader, Input, CheckBtn, Form } from "@pages/SignUp/styles";
import { Link } from "react-router-dom";
import useInput from "@hooks/useInput";
import Menu from "@components/Menu";
import EmailModal from "@components/EmailModal";
import { Redirect } from "react-router";
import { useMutation, useQuery } from "react-query";
import { IUser } from "../../States/UserState";
import axios, { AxiosError } from "axios";
import fetcher from "@utils/fetcher";
import { EmailInput } from "@components/EmailModal/styles";

const SignUp = () => {
  const [name, onChangeName, setName] = useInput("");
  const [email, onChangeEmail, setEmail] = useInput("");
  const [birth, onchangeBirth, setBirthDay] = useInput("");
  const [age, onChangeAge, setAge] = useInput("");
  const [gender, oncChangeGender, setGender] = useInput("");
  const [password, onChangePassword, setPassword] = useInput("");
  const [checkPassword, onChangeCheckPassword, setCheckPassword] = useInput("");
  const [emailAuthKey, onChangeEmailAuthKey, seyAuthKey] = useInput("");
  const [failUseEmail, setFailUseEmail] = useState(false);
  const [emailModal, setEmailModal] = useState(false);

  const onCloseEmailModal = useCallback(() => {
    setEmailModal((prev) => !prev);
  }, []);

  const mutation = useMutation<
    IUser,
    AxiosError,
    {
      name: string;
      age: string;
      gender: string;
      email: string;
      password: string;
      checkPassword: string;
      birth: string;
      emailAuthKey: string;
    }
  >(
    "user",
    (data) =>
      axios
        .post("http://localhost:8080/members", data)
        .then((response) => response.data),
    {
      onMutate() {
        // setSignUpError("");
        // setSignUpSuccess(false);
      },
      onSuccess() {
        // setSignUpSuccess(true);
        console.log("성공");
      },
      onError(error) {
        // setSignUpError(error.response?.data);
        console.log("에러");
      },
    }
  );

  const onSubmit = useCallback(
    (e: FormEvent<HTMLFormElement>) => {
      e.preventDefault();
      if (name) {
        console.log("회원가입 시도");
        mutation.mutate({
          name,
          age,
          gender,
          email,
          password,
          checkPassword,
          birth,
          emailAuthKey,
        });
      }
      console.log(mutation);
    },
    [email, name, password, checkPassword, birth, emailAuthKey, mutation]
  );

  // if (isLoading) {
  //   return <div>로딩중...</div>;
  // }

  //로그인 정보 있을 시 메인으로 리다이렉트
  // if (data) {
  //   return <Redirect to="/main" />;
  // }

  //입력한 이메일로 인증번호 보내기
  const onSubmitEmail = useCallback(
    (e?: React.MouseEvent<HTMLButtonElement, MouseEvent>) => {
      e?.preventDefault();

      if (!email || !email.trim()) return;

      axios
        .post(
          "http://localhost:8080/emails",
          { email },
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

  return (
    <>
      <Wrapper>
        <Header>회원가입</Header>
        <SubHeader>
          <div>이미 BeanBay 회원이신가요?</div>
          <div>
            <Link to="/login">로그인</Link>
          </div>
        </SubHeader>
        <Form onSubmit={onSubmit}>
          <Label>
            <Input
              type="text"
              id="name"
              name="name"
              value={name}
              onChange={onChangeName}
              placeholder="이름"
            />
          </Label>
          <Label>
            <Input
              type="text"
              id="age"
              name="age"
              value={age}
              onChange={onChangeAge}
              placeholder="나이"
            />
          </Label>
          <Label>
            <Input
              type="text"
              id="gender"
              name="gender"
              value={gender}
              onChange={oncChangeGender}
              placeholder="성별"
            />
          </Label>
          <Label>
            <Input
              type="text"
              id="birth"
              name="birth"
              value={birth}
              onChange={onchangeBirth}
              placeholder="생년월일 6자리"
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
          </Label>
          <Label>
            <Input
              type="text"
              id="email"
              name="email"
              value={email}
              onChange={onChangeEmail}
              placeholder="이메일"
            />
          </Label>
          <CheckBtn
            type="button"
            onClick={(e) => {
              // onCloseEmailModal();
              onSubmitEmail(e);
            }}
          >
            이메일 인증
          </CheckBtn>
          {failUseEmail && (
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
          )}
          <LoginBtn type="submit">가입하기</LoginBtn>
        </Form>
        {/*{emailModal && (*/}
        {/*  <Menu show={emailModal} onCloseModal={onCloseEmailModal}>*/}
        {/*    <EmailModal*/}
        {/*      email={email}*/}
        {/*      onChangeEmail={onChangeEmail}*/}
        {/*      onCloseCheckEmailModal={onCloseEmailModal}*/}
        {/*      emailAuthKey={emailAuthKey}*/}
        {/*      onChangeEmailAuthKey={onChangeEmailAuthKey}*/}
        {/*    />*/}
        {/*  </Menu>*/}
        {/*)}*/}
      </Wrapper>
    </>
  );
};

export default SignUp;
