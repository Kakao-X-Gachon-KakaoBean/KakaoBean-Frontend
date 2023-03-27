import React from "react";
// import { Logo } from "../../image/beanSolo.png";

import { Link } from "react-router-dom";
import {
  Bar,
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
          <Link to="main" style={{ textDecoration: "none" }}>
            <LeftMenu>
              {/*<img  src={Logo} alt="" />*/}
              사진
            </LeftMenu>
          </Link>
          <RightMenu>
            <span>
              <Link to="product">Product</Link>
            </span>
            <span>
              <Link to="team">
                <span>Team</span>
              </Link>
            </span>
            <span>
              <Link to="mypage">
                <span>MY PAGE</span>
              </Link>
            </span>
            <span>
              <Link to="login">
                <span>Login</span>
              </Link>
            </span>
            <span>Get Start</span>
          </RightMenu>
        </TopMenu>
      </MainBar>
    </Bar>
  );
};

export default HeaderBar;
