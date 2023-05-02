import React from "react";
import { useQuery } from "react-query";
import fetcher from "@utils/fetcher";

const MyInfo = () => {
  interface UserInfo {
    name: string;
    age: number;
    gender: string;
    email: string;
    birth: string;
  }
  const { isLoading, isSuccess, status, isError, data, error } = useQuery(
    ["user"],
    () => fetcher({ queryKey: "http://localhost:8080/members/info" })
  );
  return (
    <>
      <div>내 정보</div>
      <div>이름: {data?.name}</div>
      <div>나이: {data?.age}</div>
      <div>성별: {data?.gender}</div>
      <div>이메일: {data?.email}</div>
      <div>생일: {data?.birth}</div>
    </>
  );
};

export default MyInfo;
