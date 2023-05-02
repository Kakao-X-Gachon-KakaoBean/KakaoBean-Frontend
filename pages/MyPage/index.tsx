import React, { useState } from "react";
import HeaderBar from "@components/HeaderBar";
import MyPageSideBar from "@components/MyPageSideBar";
import { RightSide, SideBar, Wrapper } from "@pages/MyPage/styles";
import { Redirect, Route, Switch } from "react-router";
import loadable from "@loadable/component";

const MyInfo = loadable(() => import("@components/MyInfo"));
const SurveyInfo = loadable(() => import("@components/SurveyInfo"));
const MySurvey = loadable(() => import("@components/MySurvey"));

const MyPage = () => {
  const [sideBar, setSideBar] = useState(true);

  return (
    <div>
      <HeaderBar />
      <Wrapper>
        <SideBar>
          <MyPageSideBar sideBar={sideBar} />
        </SideBar>
        <RightSide>
          <Switch>
            <Route path="/mypage/myinfo" component={MyInfo} />
            <Route path="/mypage/surveyinfo" component={SurveyInfo} />
            <Route path="/mypage/mysurvey" component={MySurvey} />
          </Switch>
        </RightSide>
      </Wrapper>
    </div>
  );
};

export default MyPage;
