import React, { useCallback, useState } from "react";
import CreateSurveyDnd from "@components/CreateSurveyDnd";

import { CreateSurveyDiv } from "@pages/Survey/CreateSurvey/styles";
import CreateSurveySideBar from "@components/CreateSurveySideBar";
import CreateSurveyChatBot from "@components/CreateSurveyChatBot";
import HeaderBar from "@components/HeaderBar";

const CreateSurvey = (): JSX.Element => {
  return (
    <>
      <HeaderBar />
      <CreateSurveyDiv>
        <CreateSurveyDnd />
        <CreateSurveySideBar />
        <CreateSurveyChatBot />
      </CreateSurveyDiv>
    </>
  );
};

export default CreateSurvey;
