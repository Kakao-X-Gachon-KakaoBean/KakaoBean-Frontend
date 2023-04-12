import React from "react";
import HeaderBar from "@components/HeaderBar";
import MainFirst from "@components/MainFirst";
import HorizonScroll from "@components/MainTouchScroll";
import DNDText from "@components/DNDText";
import GreyField from "@components/GreyField";
import BlackField from "@components/BlackField";

const Main = () => {
  return (
    <>
      <div>
        <HeaderBar />
        <MainFirst />
        <HorizonScroll />
        <DNDText />
        <GreyField />
        <BlackField />
      </div>
    </>
  );
};

export default Main;
