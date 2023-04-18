import React, { useEffect } from "react";
import HeaderBar from "@components/HeaderBar";
import MainFirst from "@components/MainComponent/MainFirst";
import HorizonScroll from "@components/MainComponent/MainTouchScroll";
import DNDText from "@components/MainComponent/DNDText";
import GreyField from "@components/MainComponent/GreyField";
import BlackField from "@components/MainComponent/BlackField";
import { Mobile, PC } from "@hooks/responsive";
import { useLocation } from "react-router";

const Main = () => {
  const location = useLocation();
  const params = new URLSearchParams(location.search);
  let token = params.get("token");

  if (token) {
    useEffect(() => {
      console.log(token);
    }, [token]);
  }
  return (
    <>
      <PC>
        <div>
          <HeaderBar />
          <MainFirst />
          <HorizonScroll />
          <DNDText />
          <GreyField />
          <BlackField />
        </div>
      </PC>
      <Mobile>모바일</Mobile>
    </>
  );
};

export default Main;
