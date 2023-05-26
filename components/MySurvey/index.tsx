import React, { useCallback } from "react";
import { useMutation, useQuery } from "react-query";
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
import axios, { AxiosError } from "axios";

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

  const mutation = useMutation<string, AxiosError, { SurveyId: string }>(
    "DeleteSurvey",
    ({ SurveyId }) =>
      axios
        .delete(`http://localhost:8080/surveys/${SurveyId}`, {
          withCredentials: true,
          headers: {
            "X-Requested-With": "XMLHttpRequest",
            Authorization: `Bearer ${localStorage.getItem("accessToken")}`,
          },
        })
        .then((response) => response.data),
    {
      onMutate() {},
      onSuccess(data) {
        alert("설문이 삭제되었습니다.");
      },
      onError(error) {
        alert("실패");
      },
    }
  );

  const DeleteSurvey = useCallback(
    (SurveyId) => {
      mutation.mutate({ SurveyId });
    },
    [mutation]
  );

  return (
    <>
      <SurveyHeader>내가 만든 설문 조회</SurveyHeader>
      {MySurvey ? (
        <SurveyContainer>
          {MySurvey &&
            [...Array(MySurvey?.myOwnSurveys.length)].map((e, index) => {
              const SurveyId = MySurvey?.myOwnSurveys[index].surveyId;
              return (
                <SurveyBox>
                  <SurveyInfo>
                    <SurveyTitle>
                      {MySurvey?.myOwnSurveys[index]?.surveyTitle}
                    </SurveyTitle>
                    <FontAwesomeIcon
                      icon={faTrashCan}
                      onClick={() => DeleteSurvey(SurveyId)}
                    />
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
