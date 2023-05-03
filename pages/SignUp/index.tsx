import React, { FormEvent, useCallback, useState } from "react";
import { Wrapper, Label } from "@pages/LogIn/styles";
import {
  Header,
  SubHeader,
  Input,
  CheckBtn,
  Form,
  InputGender,
  LoginBtn,
  Label2,
  CheckLabel,
  EmailLabel,
  EmailInput,
} from "@pages/SignUp/styles";
import { Link } from "react-router-dom";
import useInput from "@hooks/useInput";
import { useMutation, useQuery } from "react-query";
import { IUser } from "../../States/UserState";
import axios, { AxiosError } from "axios";
import { toast, ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

const SignUp = () => {
  const [name, onChangeName, setName] = useInput("");
  const [email, onChangeEmail, setEmail] = useInput("");
  const [birth, onchangeBirth, setBirthDay] = useInput("");
  const [age, onChangeAge, setAge] = useInput<any>(0);
  const [gender, oncChangeGender, setGender] = useInput("");
  const [password, onChangePassword, setPassword] = useInput("");
  const [checkPassword, onChangeCheckPassword, setCheckPassword] = useInput("");
  const [emailAuthKey, onChangeEmailAuthKey, seyAuthKey] = useInput("");
  const [failUseEmail, setFailUseEmail] = useState(false);
  const [signUpSuccess, setSignUpSuccess] = useState(false);
  const [signUpError, setSignUpError] = useState("");

  const today = new Date();
  const mutation = useMutation<
    IUser,
    AxiosError,
    {
      name: string;
      age: number;
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
        setSignUpError("");
        setSignUpSuccess(false);
      },
      onSuccess() {
        setSignUpSuccess(true);
        console.log("성공");
        alert("회원가입에 성공하셨습니다.");
      },
      onError(error) {
        setSignUpError(error.response?.data);
        console.log("에러");
        alert("양식을 알맞게 작성해주세요");
      },
    }
  );
  const birthYear = Number(birth.slice(0, 4));
  const onSubmit = useCallback(
    (e: FormEvent<HTMLFormElement>) => {
      e.preventDefault();
      if (
        name &&
        email &&
        gender &&
        password &&
        checkPassword &&
        emailAuthKey
      ) {
        console.log("회원가입 시도");
        console.log(age);
        mutation.mutate({
          name,
          age: today.getFullYear() - birthYear + 1,
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

  return (
    <>
      <Wrapper>
        <ToastContainer
          position="top-right"
          autoClose={5000}
          hideProgressBar={false}
          newestOnTop={false}
          closeOnClick
          rtl={false}
          pauseOnFocusLoss
          draggable
          pauseOnHover
          theme="light"
        ></ToastContainer>
        <Header>회원가입</Header>
        <SubHeader>
          <div>이미 BeanBay 회원이신가요?</div>
          <div>
            <Link to="/login">로그인</Link>
          </div>
        </SubHeader>
        <Form onSubmit={onSubmit}>
          <EmailLabel>
            <EmailInput
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
              id="birth"
              name="birth"
              value={birth}
              onChange={onchangeBirth}
              placeholder="생년월일 ex) 1999-10-01"
            />
          </Label>
          <CheckLabel>
            <Label2>
              <InputGender
                type="radio"
                name="성별"
                value="MALE"
                onChange={oncChangeGender}
              />
              <span>남자</span>
            </Label2>
            <Label2>
              <InputGender
                type="radio"
                name="성별"
                value="FEMALE"
                onChange={oncChangeGender}
              />
              <span>여자</span>
            </Label2>
          </CheckLabel>
          <LoginBtn type="submit">가입하기</LoginBtn>
          {signUpSuccess && <div>회원가입에 성공하셨습니다.</div>}
        </Form>
      </Wrapper>
    </>
  );
};

export default SignUp;
