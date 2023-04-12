import React from "react";
import Logo from "../../image/beanSolo.png";

import { Link } from "react-router-dom";
import {
  Bar,
  Img,
  LeftMenu,
  MainBar,
  RightMenu,
  TopMenu,
} from "@components/HeaderBar/styles";

const HeaderBar = () => {
  return (
    <Bar>
      <MainBar>
        <TopMenu>
          <Link to="/main" style={{ textDecoration: "none" }}>
            <LeftMenu>
              <Img src={Logo} alt="" />
            </LeftMenu>
          </Link>
          <RightMenu>
            <span>
              <Link to="/product">Product</Link>
            </span>
            <span>
              <Link to="/team">
                <span>Team</span>
              </Link>
            </span>
            <span>
              <Link to="/mypage">
                <span>MY PAGE</span>
              </Link>
            </span>
            <span>
              <Link to="/login">
                <span>Login</span>
              </Link>
            </span>
            <span>
              <Link to="/createsurvey">
                <span>Get Start</span>
              </Link>
            </span>
          </RightMenu>
        </TopMenu>
      </MainBar>
    </Bar>
  );
};

export default HeaderBar;
