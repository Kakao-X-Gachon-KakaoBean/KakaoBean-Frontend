import React from "react";
import {
  SurveyBox,
  SurveyContainer,
  SurveyHeader,
  SurveyResult,
  SurveyTitle,
  SurveyInfo,
} from "@components/MySurvey/styles";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faTrashCan } from "@fortawesome/free-regular-svg-icons";
import { useQuery } from "react-query";
import fetcher from "@utils/fetcher";

const SurveyList = () => {
  // const {
  //   isLoading,
  //   isSuccess,
  //   status,
  //   isError,
  //   data: SurveyList,
  //   error,
  // } = useQuery(["SurveyList"], () =>
  //   fetcher({ queryKey: "http://localhost:8080/surveys/" })
  // );

  return (
    <>
      <SurveyHeader>참여 설문 조회</SurveyHeader>

      <SurveyContainer>
        {/*{SurveyList &&*/}
        {/*[...Array(MySurvey?.myOwnSurveys.length)].map((e, index) => {*/}
        {/*const SurveyId = MySurvey?.myOwnSurveys[index].surveyid;*/}
        {/*return (*/}
        <SurveyBox>
          <SurveyInfo>
            <SurveyTitle>제목</SurveyTitle>
            <FontAwesomeIcon icon={faTrashCan} />
          </SurveyInfo>
          <SurveyResult>응답 개수: 2</SurveyResult>
        </SurveyBox>
        <SurveyBox>
          <SurveyInfo>
            <SurveyTitle>제목</SurveyTitle>
            <FontAwesomeIcon icon={faTrashCan} />
          </SurveyInfo>
          <SurveyResult>응답 개수: 2</SurveyResult>
        </SurveyBox>
        <SurveyBox>
          <SurveyInfo>
            <SurveyTitle>제목</SurveyTitle>
            <FontAwesomeIcon icon={faTrashCan} />
          </SurveyInfo>
          <SurveyResult>응답 개수: 2</SurveyResult>
        </SurveyBox>
        <SurveyBox>
          <SurveyInfo>
            <SurveyTitle>제목</SurveyTitle>
            <FontAwesomeIcon icon={faTrashCan} />
          </SurveyInfo>
          <SurveyResult>응답 개수: 2</SurveyResult>
        </SurveyBox>
        <SurveyBox>
          <SurveyInfo>
            <SurveyTitle>제목</SurveyTitle>
            <FontAwesomeIcon icon={faTrashCan} />
          </SurveyInfo>
          <SurveyResult>응답 개수: 2</SurveyResult>
        </SurveyBox>
        <SurveyBox>
          <SurveyInfo>
            <SurveyTitle>제목</SurveyTitle>
            <FontAwesomeIcon icon={faTrashCan} />
          </SurveyInfo>
          <SurveyResult>응답 개수: 2</SurveyResult>
        </SurveyBox>
        <SurveyBox>
          <SurveyInfo>
            <SurveyTitle>제목</SurveyTitle>
            <FontAwesomeIcon icon={faTrashCan} />
          </SurveyInfo>
          <SurveyResult>응답 개수: 2</SurveyResult>
        </SurveyBox>

        {/*  );*/}
        {/*})}*/}
      </SurveyContainer>
    </>
  );
};

export default SurveyList;
