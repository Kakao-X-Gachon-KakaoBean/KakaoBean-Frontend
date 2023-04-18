import React, { useEffect } from "react";
import HeaderBar from "@components/HeaderBar";
import MainFirst from "@components/MainComponent/MainFirst";
import HorizonScroll from "@components/MainComponent/MainTouchScroll";
import DNDText from "@components/MainComponent/DNDText";
import GreyField from "@components/MainComponent/GreyField";
import BlackField from "@components/MainComponent/BlackField";
import { Mobile, PC } from "@hooks/responsive";

const Main = () => {
  const location = new Location();

  function header(location: any) {
    const params = new URLSearchParams(location.search);

    let token = params.get("token");

    console.log(token);
  }
  if (location.search) {
    useEffect(() => {
      if (location.search) {
        header(location);
      }
    }, [header]);
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
