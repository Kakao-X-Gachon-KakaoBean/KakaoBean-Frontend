import React from "react";
import { useQuery } from "react-query";
import fetcher from "@utils/fetcher";
import {
  SurveyBox,
  SurveyContainer,
  SurveyHeader,
  SurveyResult,
  SurveyTitle,
  SurveyInfo,
} from "@components/MySurvey/styles";

const MySurvey = () => {
  // const { isLoading, isSuccess, status, isError, data, error } = useQuery(
  //   ["MySuervey"],
  //   () => fetcher({ queryKey: "http://localhost:8080/surveys/1" })
  // );
  return (
    <>
      <SurveyHeader>내가 만든 설문 조회</SurveyHeader>
      <SurveyContainer>
        {/*{data &&*/}
        {/*  [...Array(data?.length)].map((e, index) => {*/}
        {/*    const SurveyId = SurveyList[index].surveyid;*/}
        {/*    return (*/}
        <SurveyBox>
          <SurveyInfo>
            <SurveyTitle>제목</SurveyTitle>
            <SurveyResult>응답 개수</SurveyResult>
          </SurveyInfo>
        </SurveyBox>
        {/*  );*/}
        {/*})}*/}
      </SurveyContainer>
    </>
  );
};

export default MySurvey;
