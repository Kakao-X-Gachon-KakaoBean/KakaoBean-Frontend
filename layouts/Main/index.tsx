import React from "react";
import HeaderBar from "@components/HeaderBar";
import MainFirst from "@components/MainComponent/MainFirst";
import HorizonScroll from "@components/MainComponent/MainTouchScroll";
import DNDText from "@components/MainComponent/DNDText";
import GreyField from "@components/MainComponent/GreyField";
import BlackField from "@components/MainComponent/BlackField";

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
