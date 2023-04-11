import { Wrapper, Text, TextDiv, Button } from "./styles";
import React from "react";

const MainFirst = () => {
  return (
    <Wrapper>
      <TextDiv>
        <Text>
          업무를 빠르고 쉽게
          <br />
        </Text>
        <Text>
          BeanBay
          <br />
        </Text>
        <Button>
          Get Start
          <br />
        </Button>
      </TextDiv>
    </Wrapper>
  );
};

export default MainFirst;
