import React, { useCallback, useState } from "react";
import { Mobile, PC } from "@hooks/responsive";
import CreateSurveyDnd from "@components/CreateSurveyDnd";

import { CreateSurveyDiv, Wrapper } from "@pages/Survey/CreateSurvey/styles";
import CreateSurveySideBar from "@components/CreateSurveySideBar";
import CreateSurveyChatBot from "@components/CreateSurveyChatBot";
import HeaderBar from "@components/HeaderBar";
import CreateSurveyUnder768 from "@components/CreateSurveyUnder768";

const CreateSurvey = (): JSX.Element => {
  return (
    <>
      <Mobile>
        <CreateSurveyUnder768 />
      </Mobile>
      <PC>
        <Wrapper>
          <HeaderBar />
          <CreateSurveyDiv>
            <CreateSurveyDnd />
            <CreateSurveySideBar />
            <CreateSurveyChatBot />
          </CreateSurveyDiv>
        </Wrapper>
      </PC>
    </>
  );
};

export default CreateSurvey;
