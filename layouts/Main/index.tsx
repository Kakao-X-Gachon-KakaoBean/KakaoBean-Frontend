import React, { useEffect } from "react";
import HeaderBar from "@components/HeaderBar";
import MainFirst from "@components/MainComponent/MainFirst";
import HorizonScroll from "@components/MainComponent/MainTouchScroll";
import DNDText from "@components/MainComponent/DNDText";
import GreyField from "@components/MainComponent/GreyField";
import BlackField from "@components/MainComponent/BlackField";
import { Mobile, PC } from "@hooks/responsive";
import { useLocation } from "react-router";
import { useCookies } from "react-cookie";
import moment from "moment";
import { useQuery } from "react-query";
import fetcher from "@utils/fetcher";

const Main = () => {
  const [cookies, setCookie, removeCookie] = useCookies();

  const location = useLocation();
  const params = new URLSearchParams(location.search);
  let token = params.get("token");

  const setCookieFn = () => {
    const expires = moment().add("60", "m").toDate();
    setCookie("accessToken", token, { expires });
  };

  if (token) {
    useEffect(() => {
      setCookieFn();
      // removeCookie("accessToken");
    }, [token]);
  }

  //유저 정보 get
  const { data: MainUser } = useQuery(["MainUser"], () =>
    fetcher({ queryKey: "" })
  );
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
