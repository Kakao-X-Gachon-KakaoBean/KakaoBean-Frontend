import React, { useEffect, useState } from "react";
import HeaderBar from "@components/HeaderBar";
import MainFirst from "@components/MainComponent/MainFirst";
import HorizonScroll from "@components/MainComponent/MainTouchScroll";
import DNDText from "@components/MainComponent/DNDText";
import GreyField from "@components/MainComponent/GreyField";
import BlackField from "@components/MainComponent/BlackField";
import { Redirect, useLocation } from "react-router";
import { useCookies } from "react-cookie";
import moment from "moment";
import { useQuery } from "react-query";
import fetcher from "@utils/fetcher";

const Main = () => {
  const [isLogin, setIsLogin] = useState(
    localStorage.getItem("accessToken") !== null
  );

  const location = useLocation();
  const params = new URLSearchParams(location.search);
  const token: string | null = params.get("token");

  const SetToken = () => {
    localStorage.setItem("accessToken", token || "");
  };

  if (token) {
    useEffect(() => {
      SetToken();
    }, [token]);
  }

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
