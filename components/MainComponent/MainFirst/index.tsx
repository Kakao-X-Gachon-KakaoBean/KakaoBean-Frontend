import { Wrapper, Text, TextDiv, StartButton } from "./styles";
import AOS from "aos";
import "aos/dist/aos.css";
import React, { useEffect } from "react";
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
  useEffect(() => {
    AOS.init();
  }, []);

  return (
    <Wrapper>
      <TextDiv
        data-aos="fade-up"
        data-aos-delay="1000"
        data-aos-duration="1000"
      >
        <Text>
          설문을 빠르고 쉽게
          <br />
        </Text>
        <Text>
          Cocoa
          <br />
        </Text>
        <StartButton>
          <Link
            to="/createsurvey"
            onClick={handleClick}
            style={{ textDecoration: "none", color: "white" }}
          >
            바로 시작하기
          </Link>
        </StartButton>
      </TextDiv>
    </Wrapper>
  );
};

export default MainFirst;
