import React, { useEffect, useState } from "react";
import AOS from "aos";
import "aos/dist/aos.css";
import HeaderBar from "@components/HeaderBar";
import MainFirst from "@components/MainComponent/MainFirst";
import DNDText from "@components/MainComponent/DNDText";
import GreyField from "@components/MainComponent/GreyField";
import BlackField from "@components/MainComponent/BlackField";
import { useLocation } from "react-router";

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

  useEffect(() => {
    AOS.init();
  }, []);

  return (
    <>
      <div>
        <HeaderBar />
        <MainFirst />
        <DNDText />
        <GreyField />
        <BlackField />
      </div>
    </>
  );
};

export default Main;
