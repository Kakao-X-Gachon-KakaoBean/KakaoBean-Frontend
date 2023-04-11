import React from "react";
import HeaderBar from "@components/HeaderBar";
import MainFirst from "@components/MainFirst";
import HorizonScroll from "@components/MainTouchScroll";
import DNDText from "@components/DNDText";
import GreyField from "@components/GreyField";

const Main = () => {
  return (
    <>
      <div>
        <HeaderBar />
        <MainFirst />
        <HorizonScroll />
        <DNDText />
        <GreyField />
      </div>
    </>
  );
};

export default Main;
