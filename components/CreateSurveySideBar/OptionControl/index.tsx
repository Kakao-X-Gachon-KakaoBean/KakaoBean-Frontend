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
      {selectedValue.type !== "NONE" && (
        <div>{"문제 " + selectedValue.questionNumber + "번"}</div>
      )}
      {selectedValue.type === "MULTIPLE" && (
        <MultipleOptionControl key={selectedValue.id} />
      )}
      {selectedValue.type === "ESSAY" && (
        <SubjectiveOptionControl key={selectedValue.id} />
      )}
      {selectedValue.type === "RANGE" && (
        <RangeOptionControl key={selectedValue.id} />
      )}
      {selectedValue.type === "NONE" && <div></div>}
    </Wrapper>
  );
};
