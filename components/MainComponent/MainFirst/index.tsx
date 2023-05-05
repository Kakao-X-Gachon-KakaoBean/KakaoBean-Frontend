import { Wrapper, Text, TextDiv } from "./styles";
import { Button } from "antd";
import React from "react";
import { Link } from "react-router-dom";

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
        <Link to="/createsurvey" style={{ textDecoration: "none" }}>
          <Button>
            Get Start
            <br />
          </Button>
        </Link>
      </TextDiv>
    </Wrapper>
  );
};

export default MainFirst;
