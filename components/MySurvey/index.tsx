import React, { useCallback, useState } from "react";
import { useMutation, useQuery, useQueryClient } from "react-query";
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
import { Button, Modal } from "antd";

const MySurvey = () => {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [deleteSurveyId, setDeleteSurveyId] = useState(""); // 삭제할 설문의 ID 저장
  const queryClient = useQueryClient();

  const handleDeleteConfirmation = useCallback((SurveyId: any) => {
    setDeleteSurveyId(SurveyId);
    setIsModalOpen(true);
  }, []);

  const handleDelete = useCallback(() => {
    if (deleteSurveyId) {
      DeleteSurvey(deleteSurveyId);
    }
    setIsModalOpen(false);
  }, [deleteSurveyId]);

  const handleCancel = useCallback(() => {
    setDeleteSurveyId("");
    setIsModalOpen(false);
  }, []);

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
        setIsModalOpen(false);
        queryClient.invalidateQueries("MySurvey");
      },
      onError(error) {
        alert("실패");
      },
    }
  );

  const DeleteSurvey = useCallback(
    (SurveyId: any) => {
      mutation.mutate({ SurveyId });
    },
    [mutation]
  );

  return (
    <>
      <SurveyHeader>내가 만든 설문 조회</SurveyHeader>
      {MySurvey?.myOwnSurveys.length >= 1 ? (
        <SurveyContainer>
          {MySurvey &&
            MySurvey.myOwnSurveys.map((survey: any) => {
              const Id = survey.surveyId;
              return (
                <Link to={`/surveydetail/${Id}`}>
                  <SurveyBox key={survey.surveyId}>
                    <SurveyInfo>
                      <SurveyTitle>{survey.surveyTitle}</SurveyTitle>
                      <FontAwesomeIcon
                        icon={faTrashCan}
                        onClick={() =>
                          handleDeleteConfirmation(survey.surveyId)
                        }
                      />
                    </SurveyInfo>
                    <SurveyResult>
                      응답 개수: {survey.numberOfResponse}
                    </SurveyResult>
                  </SurveyBox>
                </Link>
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
      <Modal
        title="Cocoa"
        open={isModalOpen}
        onCancel={handleCancel}
        centered
        footer={[
          <Button key="no" onClick={handleCancel}>
            아니요
          </Button>,
          <Button key="yes" type="primary" danger onClick={handleDelete}>
            예
          </Button>,
        ]}
      >
        <p>정말 설문을 삭제하시겠습니까?</p>
      </Modal>
    </>
  );
};

export default MySurvey;
