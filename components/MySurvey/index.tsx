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
  CreateSurveyContainer,
} from "@components/MySurvey/styles";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faCirclePlus, faEllipsis } from "@fortawesome/free-solid-svg-icons";
import { Link } from "react-router-dom";

const MySurvey = () => {
  const testRef = React.createRef();
  const data = false;
  // const { isLoading, isSuccess, status, isError, data, error } = useQuery(
  //   ["MySuervey"],
  //   () => fetcher({ queryKey: "http://localhost:8080/surveys/1" })
  // );

  return (
    <>
      <SurveyHeader>내가 만든 설문 조회</SurveyHeader>
      {data ? (
        <SurveyContainer>
          {/*{data &&*/}
          {/*  [...Array(data?.length)].map((e, index) => {*/}
          {/*    const SurveyId = SurveyList[index].surveyid;*/}
          {/*    return (*/}
          <SurveyBox>
            <SurveyInfo>
              <SurveyTitle>제목</SurveyTitle>
              <FontAwesomeIcon icon={faEllipsis} />
            </SurveyInfo>
            <SurveyResult>응답 개수</SurveyResult>
          </SurveyBox>
          {/*  );*/}
          {/*})}*/}
        </SurveyContainer>
      ) : (
        <CreateSurveyContainer>
          <Link to="/createsurvey">
            <FontAwesomeIcon icon={faCirclePlus} style={{ fontSize: "2rem" }} />
          </Link>
        </CreateSurveyContainer>
      )}
    </>
  );
};

export default MySurvey;
