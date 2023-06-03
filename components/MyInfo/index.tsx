import React from "react";
import { useQuery } from "react-query";
import fetcher from "@utils/fetcher";
import {
  InfoSection,
  Wrapper,
  Header,
  SectionHeader,
  SectionBody,
} from "@components/MyInfo/styles";

const MyInfo = () => {
  const baseUrl = process.env.REACT_APP_BASE_URL;

  interface UserInfo {
    name: string;
    age: number;
    gender: string;
    email: string;
    birth: string;
  }
  const { isLoading, isSuccess, status, isError, data, error } =
    useQuery<UserInfo>(["user"], () =>
      fetcher({ queryKey: `${baseUrl}/members/info` })
    );

  return (
    <>
      <Wrapper>
        <Header>내 정보</Header>
        <InfoSection>
          <SectionHeader>이름</SectionHeader>
          <SectionBody>{data?.name}</SectionBody>
        </InfoSection>
        <InfoSection>
          <SectionHeader>나이</SectionHeader>
          <SectionBody>{data?.age}</SectionBody>
        </InfoSection>
        <InfoSection>
          <SectionHeader>성별</SectionHeader>
          <SectionBody>{data?.gender}</SectionBody>
        </InfoSection>
        <InfoSection>
          <SectionHeader>이메일</SectionHeader>
          <SectionBody>{data?.email}</SectionBody>
        </InfoSection>
        <InfoSection>
          <SectionHeader>생일</SectionHeader>
          <SectionBody>{data?.birth}</SectionBody>
        </InfoSection>
      </Wrapper>
    </>
  );
};

export default MyInfo;
