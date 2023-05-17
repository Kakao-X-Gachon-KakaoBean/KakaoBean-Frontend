import React from "react";
import {
  SurveyBox,
  SurveyContainer,
  SurveyHeader,
  SurveyResult,
  SurveyTitle,
  SurveyInfo,
  CreateSurveyContainer,
} from "@components/MySurvey/styles";

const SurveyList = () => {
  return (
    <>
      <SurveyHeader>참여 설문 조회</SurveyHeader>

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
        <SurveyBox>
          <SurveyInfo>
            <SurveyTitle>제목</SurveyTitle>
            <SurveyResult>응답 개수</SurveyResult>
          </SurveyInfo>
        </SurveyBox>
        <SurveyBox>
          <SurveyInfo>
            <SurveyTitle>제목</SurveyTitle>
            <SurveyResult>응답 개수</SurveyResult>
          </SurveyInfo>
        </SurveyBox>
        <SurveyBox>
          <SurveyInfo>
            <SurveyTitle>제목</SurveyTitle>
            <SurveyResult>응답 개수</SurveyResult>
          </SurveyInfo>
        </SurveyBox>
        <SurveyBox>
          <SurveyInfo>
            <SurveyTitle>제목</SurveyTitle>
            <SurveyResult>응답 개수</SurveyResult>
          </SurveyInfo>
        </SurveyBox>
        <SurveyBox>
          <SurveyInfo>
            <SurveyTitle>제목</SurveyTitle>
            <SurveyResult>응답 개수</SurveyResult>
          </SurveyInfo>
        </SurveyBox>
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

export default SurveyList;
