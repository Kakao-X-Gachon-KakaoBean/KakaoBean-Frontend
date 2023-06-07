import { Wrapper, Text, SmallText, TextDiv } from "./styles";
import React, { useEffect } from "react";
import AOS from "aos";
import "aos/dist/aos.css";

const DNDText = () => {
  useEffect(() => {
    AOS.init();
  }, []);
  return (
    <Wrapper>
      <TextDiv>
        <div
          data-aos="fade-up"
          data-aos-duration="1000"
          style={{ marginBottom: "5%", marginTop: "10%" }}
        >
          <Text>
            드래그 앤 드롭으로 쉽게
            <br />
          </Text>
          <SmallText>
            쉽고 빠르게 설문을 시작하세요!
            <br />
          </SmallText>
        </div>
        <video
          data-aos="fade-up"
          data-aos-delay="1000"
          autoPlay={true}
          muted
          src="../../../image/Dnd2.mov"
          style={{ width: "80%", height: "70%" }}
        />
      </TextDiv>
    </Wrapper>
  );
};

export default DNDText;
