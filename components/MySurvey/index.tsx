import React from "react";
import { useQuery } from "react-query";
import fetcher from "@utils/fetcher";

const MySurvey = () => {
  const { isLoading, isSuccess, status, isError, data, error } = useQuery(
    ["MySuervey"],
    () => fetcher({ queryKey: "http://localhost:8080/surveys/1" })
  );
  return (
    <>
      <div>내가 만든 설문 조회</div>
    </>
  );
};

export default MySurvey;
