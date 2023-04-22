import React, { useState, useEffect } from "react";
import { Button } from "antd";
import { OptionDiv } from "@components/CreateSurveySideBar/styles";
import { RecoilRoot, selector, useRecoilState } from "recoil";
import { createSurveyOptionState } from "../../States/SurveyState";

const CreateSurveySideBar = (): JSX.Element => {
  const [optionState, setOptionState] = useRecoilState(createSurveyOptionState);
  const handleOptionView = () => {
    setOptionState("option");
  };
  const handleLogicView = () => {
    setOptionState("logic");
  };
  return (
    <RecoilRoot>
      <OptionDiv>
        <Button onClick={handleOptionView} style={{ marginLeft: "5%" }}>
          Option
        </Button>
        <Button onClick={handleLogicView} style={{ marginLeft: "5%" }}>
          Go to Logic
        </Button>
      </OptionDiv>
    </RecoilRoot>
  );
};

export default CreateSurveySideBar;
