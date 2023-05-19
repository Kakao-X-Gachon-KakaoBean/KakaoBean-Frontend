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
