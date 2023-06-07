import React from "react";
import KakaobeanDraw from "../../image/KakaobeanDraw.png";
import { Image, ImageDiv, WarningTextDiv, Wrapper } from "./styles";

const CreateSurveyUnder768 = () => {
  return (
    <Wrapper>
      <WarningTextDiv>KakaoBeans</WarningTextDiv>
      <div>화면의 크기가 너무 작습니다.</div>
      <div>설문을 이어 생성하시려면 화면의 크기를 키워주시기를 바랍니다.</div>
      <ImageDiv>
        <Image src={KakaobeanDraw} />
      </ImageDiv>
    </Wrapper>
  );
};

export default CreateSurveyUnder768;
