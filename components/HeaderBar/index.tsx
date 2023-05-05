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
import { Redirect } from "react-router";

const HeaderBar = () => {
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
              <Link to="/mypage">
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
              <Link to="/createsurvey">
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
