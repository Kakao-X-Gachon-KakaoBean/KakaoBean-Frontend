import React from "react";
import HeaderBar from "@components/HeaderBar";
import { Wrapper } from "@pages/LogIn/styles";
import MainFirst from "@components/MainFirst";
import HorizonScroll from "@components/MainTouchScroll";

const Main = () => {
  return (
    <>
    <Wrapper>
      <HeaderBar />
      <MainFirst />
      <HorizonScroll />
      </Wrapper>
    </>
  );
};

export default Main;
