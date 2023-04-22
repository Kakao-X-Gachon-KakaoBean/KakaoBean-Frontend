import React, { FC, FormEvent, useCallback, useState } from "react";

import {
  Button,
  Div,
  EmailInput,
  Form,
  Header,
  Input,
} from "@components/SearchEmail/styles";

import axios, { AxiosError } from "axios";

import { Wrapper } from "@components/SearchEmail/styles";
import { InputKey } from "@components/SearchEmail/styles";
import { EmailModal, Search } from "@components/SearchEmail/type";
import { useMutation } from "react-query";

const SearchEmail: FC<EmailModal> = ({
  name,
  onChangeName,
  onCloseEmailModal,
  birth,
  onChangeBirth,
}) => {
  const stopPropagation = useCallback(
    (e: React.SyntheticEvent<EventTarget>) => {
      e.stopPropagation();
    },
    []
  );
  const mutation = useMutation<
    Search,
    AxiosError,
    { name: string; birth: string }
  >(
    "searchEmail",
    (data) =>
      axios
        .post("http://localhost:8080/members/find-email", data, {
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
      mutation.mutate({ name, birth });
    },
    [name, birth, mutation]
  );
  return (
    <Wrapper onClick={stopPropagation}>
      <Form>
        <Div>
          <Header>이메일 찾기</Header>
        </Div>
        <button onClick={onCloseEmailModal}>X</button>
      </Form>

      {/*{failUseEmail && !proveEmail && (*/}
      <InputKey>
        <Form onSubmit={onSubmit}>
          <Input
            type="text"
            id="name"
            onChange={onChangeName}
            name="name"
            value={name}
            placeholder="이름"
          ></Input>
          <Input
            type="text"
            id="birth"
            onChange={onChangeBirth}
            name="birth"
            value={birth}
            placeholder="생년월일 ex) 1999-10-01"
          ></Input>
          <Button type="submit">인증 하기</Button>
        </Form>
      </InputKey>
    </Wrapper>
  );
};

export default SearchEmail;
