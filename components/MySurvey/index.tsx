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
import { faCirclePlus } from "@fortawesome/free-solid-svg-icons";
import { Link } from "react-router-dom";
import { faTrashCan } from "@fortawesome/free-regular-svg-icons";

const MySurvey = () => {
  const {
    isLoading,
    isSuccess,
    status,
    isError,
    data: MySurvey,
    error,
  } = useQuery(["MySurvey"], () =>
    fetcher({ queryKey: "http://localhost:8080/surveys/own-survey" })
  );

  return (
    <>
      <SurveyHeader>내가 만든 설문 조회</SurveyHeader>
      {MySurvey ? (
        <SurveyContainer>
          {MySurvey &&
            [...Array(MySurvey?.myOwnSurveys.length)].map((e, index) => {
              const SurveyId = MySurvey?.myOwnSurveys[index].surveyid;
              return (
                <SurveyBox>
                  <SurveyInfo>
                    <SurveyTitle>
                      {MySurvey?.myOwnSurveys[index]?.surveyTitle}
                    </SurveyTitle>
                    <FontAwesomeIcon icon={faTrashCan} />
                  </SurveyInfo>
                  <SurveyResult>
                    응답 개수:{MySurvey?.myOwnSurveys[index]?.numberOfResponse}
                  </SurveyResult>
                </SurveyBox>
              );
            })}
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
