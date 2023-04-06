import React, { FormEvent, useCallback, useState } from "react";
import { LoginBtn, Wrapper, Label } from "@pages/LogIn/styles";
import { Header, SubHeader, Input, CheckBtn, Form } from "@pages/SignUp/styles";
import { Link } from "react-router-dom";
import useInput from "@hooks/useInput";
import Menu from "@components/Menu";
import EmailModal from "@components/EmailModal";

const SignUp = () => {
  const [name, onChangeName, setName] = useInput("");
  const [email, onChangeEmail, setEmail] = useInput("");
  const [birthDay, onChangeBirthDay, setBirthDay] = useInput("");
  const [password, onChangePassword, setPassword] = useInput("");
  const [passwordCheck, onChangePasswordCheck, setPasswordCheck] = useInput("");
  const [authKey, onChangeAuthKey, seyAuthKey] = useInput("");
  const [emailModal, setEmailModal] = useState(false);

  const onCloseEmailModal = useCallback(() => {
    setEmailModal((prev) => !prev);
  }, []);

  const onSubmit = useCallback(
    (e: FormEvent<HTMLFormElement>) => {
      e.preventDefault();
      console.log(name, email, birthDay, password, passwordCheck);
    },
    [name, birthDay, email, passwordCheck, password]
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
              id="birthDay"
              name="birthDay"
              value={birthDay}
              onChange={onChangeBirthDay}
              placeholder="생년월일 6자리"
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
          <CheckBtn type="button" onClick={onCloseEmailModal}>
            이메일 인증
          </CheckBtn>
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
              value={passwordCheck}
              onChange={onChangePasswordCheck}
              placeholder="비밀번호 확인"
            />
          </Label>
          <LoginBtn type="submit">가입하기</LoginBtn>
        </Form>
        {emailModal && (
          <Menu show={emailModal} onCloseModal={onCloseEmailModal}>
            <EmailModal
              email={email}
              onChangeEmail={onChangeEmail}
              onCloseCheckEmailModal={onCloseEmailModal}
              authKey={authKey}
              onChangeAuthKey={onChangeAuthKey}
            />
          </Menu>
        )}
      </Wrapper>
    </>
  );
};

export default SignUp;
