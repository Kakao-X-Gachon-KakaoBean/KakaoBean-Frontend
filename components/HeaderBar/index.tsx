import React, { useCallback, useEffect, useState } from "react";
import Logo from "../../image/beanSolo.png";

import { Link } from "react-router-dom";
import {
  Bar,
  Header,
  Img,
  LeftMenu,
  Links,
  MainBar,
  RightMenu,
  TopMenu,
} from "@components/HeaderBar/styles";
import {
  countState,
  createSurveyOptionState,
  selectedQuestionState,
  questionsState,
} from "../../States/SurveyState";
import {
  SelNodeState,
  IdNumState,
  NodeState,
  EdgeState,
  LogicCountState,
  MultiConditionState,
  QuestionList,
} from "../../States/LogicState";
import { useResetRecoilState } from "recoil";

const HeaderBar = () => {
  const resetCountState = useResetRecoilState(countState);
  const resetCreateSurveyOptionState = useResetRecoilState(
    createSurveyOptionState
  );
  const resetSelectedQuestionState = useResetRecoilState(selectedQuestionState);
  const resetQuestionsState = useResetRecoilState(questionsState);
  const resetSelNodeState = useResetRecoilState(SelNodeState);
  const resetIdNumState = useResetRecoilState(IdNumState);
  const resetEdgeState = useResetRecoilState(EdgeState);
  const resetNodeState = useResetRecoilState(NodeState);
  const resetLogicCountState = useResetRecoilState(LogicCountState);
  const resetMultiConditionState = useResetRecoilState(MultiConditionState);
  const resetQuestionList = useResetRecoilState(QuestionList);

  const [isLogin, setIsLogin] = useState(
    localStorage.getItem("accessToken") !== null
  );

  const onLogout = useCallback(
    (e: React.MouseEvent<HTMLDivElement>) => {
      localStorage.removeItem("accessToken");
      setIsLogin(false);
      document.location.href = "/";
    },
    [isLogin]
  );

  const resetSurveyAndLogic = () => {
    resetCountState();
    resetCreateSurveyOptionState();
    resetSelectedQuestionState();
    resetQuestionsState();
    resetSelNodeState();
    resetIdNumState();
    resetEdgeState();
    resetNodeState();
    resetLogicCountState();
    resetMultiConditionState();
    resetQuestionList();
  };

  const handleClick = () => {
    resetSurveyAndLogic();
  };

  return (
    <Bar>
      <MainBar>
        <TopMenu>
          <Link to="/main" style={{ textDecoration: "none" }}>
            <LeftMenu>
              {/*<Img src={Logo} alt="" />*/}
              <Header>BeanBay</Header>
            </LeftMenu>
          </Link>
          <RightMenu>
            <Links>
              <Link to="/product">Product</Link>
            </Links>
            <Links>
              <Link to="/team">
                <span>Team</span>
              </Link>
            </Links>
            <Links>
              <Link to="/mypage/myinfo">
                <span>MY PAGE</span>
              </Link>
            </Links>
            <Links>
              {!isLogin ? (
                <Link to="/login">Login</Link>
              ) : (
                <div onClick={onLogout}>Logout</div>
              )}
            </Links>
            <Links>
              <Link to="/createsurvey" onClick={handleClick}>
                <span>Get Start</span>
              </Link>
            </Links>
          </RightMenu>
        </TopMenu>
      </MainBar>
    </Bar>
  );
};

export default HeaderBar;
