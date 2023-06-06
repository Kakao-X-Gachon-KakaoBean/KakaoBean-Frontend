import { Wrapper, Text, SmallText, Div, TextDiv, Image } from "./styles";
import AOS from "aos";
import "aos/dist/aos.css";
import React, { useEffect } from "react";
import img1 from "../../../image/ChartPage.png";

const GreyField = () => {
  useEffect(() => {
    AOS.init();
  }, []);
  return (
    <Wrapper>
      <Div>
        <TextDiv data-aos="fade-up" data-aos-duration="1000">
          <Text>자동 응답 분석 기능</Text>
          <SmallText>
            응답 데이터를 실시간으로 분석해주는 BeanBay를 통해
          </SmallText>
          <SmallText>고객의 요구사항을 빠르게 찾아보세요!</SmallText>
        </TextDiv>
        <Image
          data-aos="fade-up"
          data-aos-duration="1000"
          data-aos-delay="1000"
          src={img1}
          style={{ width: "50%", height: "30%", objectFit: "cover" }}
        ></Image>
      </Div>
    </Wrapper>
  );
};

export default GreyField;
