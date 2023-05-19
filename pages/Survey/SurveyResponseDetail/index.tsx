import React from "react";
import { Wrapper } from "@pages/Survey/SurveyResponseDetail/styles";
import SurveyResponseLogicFlow from "@components/SurveyResponseLogicFlow";
import HeaderBar from "@components/HeaderBar";
import SurveyResponseDetailTable from "@components/SurveyResponseDetailTable";

const SurveyResponseDetail = () => {
  return (
    <Wrapper>
      <HeaderBar />
      <SurveyResponseLogicFlow />
      <SurveyResponseDetailTable />
      <div style={{ display: "flex", backgroundColor: "#BCC5CE" }}>C</div>
    </Wrapper>
  );
};

export default SurveyResponseDetail;
