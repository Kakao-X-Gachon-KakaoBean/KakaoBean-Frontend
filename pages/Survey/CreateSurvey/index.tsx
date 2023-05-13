import React, { useCallback, useState } from "react";
import MediaQuery from "react-responsive";
import CreateSurveyDnd from "@components/CreateSurveyDnd";

import { CreateSurveyDiv, Wrapper } from "@pages/Survey/CreateSurvey/styles";
import CreateSurveySideBar from "@components/CreateSurveySideBar";
import CreateSurveyChatBot from "@components/CreateSurveyChatBot";
import HeaderBar from "@components/HeaderBar";
import CreateSurveyUnder768 from "@components/CreateSurveyUnder768";

const CreateSurvey = (): JSX.Element => {
  return (
    <>
      {/*<MediaQuery maxWidth={805}>*/}
      {/*  <CreateSurveyUnder768 />*/}
      {/*</MediaQuery>*/}
      {/*<MediaQuery maxHeight={800}>*/}
      {/*  <CreateSurveyUnder768 />*/}
      {/*</MediaQuery>*/}
      {/*<MediaQuery minWidth={806} minHeight={801}>*/}
      <Wrapper>
        <HeaderBar />
        <CreateSurveyDiv>
          <CreateSurveyDnd />
          <CreateSurveySideBar />
          <CreateSurveyChatBot />
        </CreateSurveyDiv>
      </Wrapper>
      {/*</MediaQuery>*/}
    </>
  );
};

export default CreateSurvey;
