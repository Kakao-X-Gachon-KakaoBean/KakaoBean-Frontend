import React, { FC } from "react";
import { NavLink } from "react-router-dom";
import { SideBar } from "@components/MyPageSideBar/type";
import { Info, Wrapper } from "@components/MyPageSideBar/styles";

const MyPageSideBar: FC<SideBar> = ({ sideBar }) => {
  return (
    <Wrapper sideBar={sideBar}>
      <Info>
        <span>
          <NavLink activeClassName="selected" to={"/mypage/myinfo"}>
            내 정보
          </NavLink>
        </span>
        <span>
          <NavLink activeClassName="selected" to={"/mypage/surveyinfo"}>
            참여 설문 조회
          </NavLink>
        </span>
        <span>
          <NavLink activeClassName="selected" to={"/mypage/mysurvey"}>
            내가 만든 설문 조회
          </NavLink>
        </span>
      </Info>
    </Wrapper>
  );
};
export default MyPageSideBar;
