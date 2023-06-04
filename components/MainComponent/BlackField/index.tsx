import {
  Wrapper,
  TextDiv,
  BeanText,
  CorTextDiv,
  IndexDiv,
  Indexes,
  Detail,
  LongText,
} from "./styles";
import React from "react";

const BlackField = () => {
  return (
    <Wrapper>
      <CorTextDiv>
        <BeanText>Cocoa</BeanText>
      </CorTextDiv>
      <TextDiv>
        <IndexDiv>
          <Indexes>팀 카카오빈</Indexes>
          <Detail>가천대학교 카카오 엔터프라이즈 SW 아카데미</Detail>
        </IndexDiv>
        <IndexDiv>
          <Indexes>Visit Our Github</Indexes>
          <LongText>https://github.com/Kakao-X-Gachon-KakaoBean</LongText>
        </IndexDiv>
      </TextDiv>
    </Wrapper>
  );
};

export default BlackField;
