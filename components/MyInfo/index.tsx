import React from "react";
import { useQuery } from "react-query";
import fetcher from "@utils/fetcher";

const MyInfo = () => {
  const { isLoading, isSuccess, status, isError, data, error } = useQuery(
    ["user"],
    () => fetcher({ queryKey: "http://localhost:8080/member/member-info" })
  );
  console.log(data);
  return (
    <>
      <div>내 정보</div>
      <div>이름: {data}</div>
      <div>나이: {data}</div>
      <div>성별: {data}</div>
      <div>이메일: {data}</div>
      <div>생일: {data}</div>
    </>
  );
};

export default MyInfo;
