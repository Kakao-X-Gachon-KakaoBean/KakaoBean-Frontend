import React from "react";
import { Wrapper } from "@pages/Survey/SurveyResponseDetail/styles";
import SurveyResponseLogicFlow from "@components/SurveyResponseLogicFlow";

const SurveyResponseDetail = () => {
  return (
    <Wrapper>
      <SurveyResponseLogicFlow />
      <div style={{ display: "flex", backgroundColor: "#729599" }}>B</div>
      <div style={{ display: "flex", backgroundColor: "#BCC5CE" }}>C</div>
    </Wrapper>
  );
};

export default SurveyResponseDetail;
