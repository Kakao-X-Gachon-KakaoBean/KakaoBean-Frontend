import { Wrapper, Text, SmallText, Div, TextDiv, Image } from "./styles";
import React from "react";
import img1 from "../../../image/LogicSite.png";

const GreyField = () => {
  return (
    <Wrapper>
      <Div>
        <TextDiv>
          <Text>자동 응답 분석 기능</Text>
          <SmallText>
            응답 데이터를 실시간으로 분석해주는 BeanBay를 통해
          </SmallText>
          <SmallText>고객의 요구사항을 빠르게 찾아보세요!</SmallText>
        </TextDiv>
        <Image
          src={img1}
          style={{ boxShadow: "0 0 5px rgba(0,0,0,0.5)" }}
        ></Image>
      </Div>
    </Wrapper>
  );
};

export default GreyField;
