import React from "react";
import { Wrapper } from "@components/SurveyResponseDetailTable/styles";
import { selectedNodeState } from "../../States/SurveyState";
import { useRecoilValue } from "recoil";

const SurveyResponseDetailTable = () => {
  const selectedNode = useRecoilValue(selectedNodeState);
  return (
    <Wrapper>
      <ul>
        <li>id: {selectedNode.id}</li>
        <li>title: {selectedNode.data.label}</li>
      </ul>
    </Wrapper>
  );
};

export default SurveyResponseDetailTable;
