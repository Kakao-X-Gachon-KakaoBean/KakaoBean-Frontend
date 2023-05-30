import { Wrapper, Text, TextDiv } from "./styles";
import { Button } from "antd";
import React from "react";
import { Link } from "react-router-dom";
import { useResetRecoilState } from "recoil";
import {
  countState,
  createSurveyOptionState,
  questionsState,
  selectedQuestionState,
} from "../../../States/SurveyState";
import {
  EdgeState,
  LogicCountState,
  NodeState,
  QuestionList,
  SelNodeState,
} from "../../../States/LogicState";

const MainFirst = () => {
  const resetCountState = useResetRecoilState(countState);
  const resetCreateSurveyOptionState = useResetRecoilState(
    createSurveyOptionState
  );
  const resetSelectedQuestionState = useResetRecoilState(selectedQuestionState);
  const resetQuestionsState = useResetRecoilState(questionsState);
  const resetSelNodeState = useResetRecoilState(SelNodeState);
  const resetEdgeState = useResetRecoilState(EdgeState);
  const resetNodeState = useResetRecoilState(NodeState);
  const resetLogicCountState = useResetRecoilState(LogicCountState);
  const resetQuestionList = useResetRecoilState(QuestionList);

  const resetSurveyAndLogic = () => {
    resetCountState();
    resetCreateSurveyOptionState();
    resetSelectedQuestionState();
    resetQuestionsState();
    resetSelNodeState();
    resetEdgeState();
    resetNodeState();
    resetLogicCountState();
    resetQuestionList();
  };

  const handleClick = () => {
    resetSurveyAndLogic();
  };

  return (
    <Wrapper>
      <TextDiv>
        <Text>
          업무를 빠르고 쉽게
          <br />
        </Text>
        <Text>
          Cocoa
          <br />
        </Text>
        <Button>
          <Link
            to="/createsurvey"
            onClick={handleClick}
            style={{ textDecoration: "none" }}
          >
            Get Start
          </Link>
        </Button>
      </TextDiv>
    </Wrapper>
  );
};

export default MainFirst;
