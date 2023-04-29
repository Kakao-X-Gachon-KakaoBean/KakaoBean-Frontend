import React, { useEffect, useState } from "react";
import { useRecoilState, useRecoilValue } from "recoil";
import { selectedQuestionState } from "../../../States/SurveyState";
import { Wrapper } from "@components/CreateSurveySideBar/OptionControl/styles";
import { MultipleOptionControl } from "@components/CreateSurveySideBar/OptionControl/MultipleOptionControl";
import { SubjectiveOptionControl } from "@components/CreateSurveySideBar/OptionControl/SubjectiveOptionControl";
import { RangeOptionControl } from "@components/CreateSurveySideBar/OptionControl/RangeOptionControl";

export const OptionControl = () => {
  const selectedValue = useRecoilValue(selectedQuestionState);
  useEffect(() => {
    console.log(selectedValue);
  }, [selectedValue]);
  return (
    <Wrapper>
      {selectedValue.type === "MULTIPLE" && <MultipleOptionControl />}
      {selectedValue.type === "ESSAY" && <SubjectiveOptionControl />}
      {selectedValue.type === "RANGE" && <RangeOptionControl />}
      {selectedValue.type === "NONE" && <div></div>}
    </Wrapper>
  );
};
