import React from "react";
import CreateSurveyDnd from "@components/CreateSurveyDnd";

import { CreateSurveyDiv } from "@pages/Survey/CreateSurvey/styles";

const CreateSurvey = (): JSX.Element => {
  return (
    <CreateSurveyDiv>
      <CreateSurveyDnd />
    </CreateSurveyDiv>
  );
};

export default CreateSurvey;
