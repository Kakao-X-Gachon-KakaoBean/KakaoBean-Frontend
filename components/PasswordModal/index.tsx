import React, { FC, FormEvent, useCallback, useState } from "react";

import {
  Button,
  Div,
  Form,
  Header,
  Input,
} from "@components/SearchEmail/styles";

import axios, { AxiosError } from "axios";

import { Wrapper } from "@components/SearchEmail/styles";
import { InputKey } from "@components/SearchEmail/styles";
import { PaswwordModal } from "@components/PasswordModal/type";
import { useMutation } from "react-query";
import { Search } from "@components/SearchEmail/type";

const SearchPassword: FC<PaswwordModal> = ({
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
      mutation.mutate({ name, birth });
    },
    [name, birth, mutation]
  );

  return (
    <Wrapper onClick={stopPropagation}>
      <Form>
        <Div>
          <Header>비밀번호 찾기?</Header>
        </Div>
        <button onClick={onCloseEmailModal}>X</button>
      </Form>

      {/*{failUseEmail && !proveEmail && (*/}
      <InputKey>
        <Form onSubmit={onSubmit}>
          <Button type="submit">인증 확인</Button>
        </Form>
      </InputKey>
      {/*)}*/}
    </Wrapper>
  );
};

export default SearchPassword;
