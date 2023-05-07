import { Wrapper, Text, SmallText, TextDiv, Image } from "./styles";
import React from "react";
import img1 from "../../../image/DragDrop.png";

const DNDText = () => {
  return (
    <Wrapper>
      <TextDiv>
        <Text>
          드래그 앤 드롭으로 쉽게
          <br />
        </Text>
        <SmallText>
          쉽고 빠르게 설문을 시작하세요!
          <br />
        </SmallText>
        <Image
          style={{ boxShadow: "0 0 5px rgba(0,0,0,0.5)" }}
          src={img1}
        ></Image>
      </TextDiv>
    </Wrapper>
  );
};

export default DNDText;
