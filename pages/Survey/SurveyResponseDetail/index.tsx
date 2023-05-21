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
    </Wrapper>
  );
};

export default SurveyResponseDetail;
