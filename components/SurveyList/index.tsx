import React from "react";
import {
  SurveyBox,
  SurveyContainer,
  SurveyHeader,
  SurveyResult,
  SurveyTitle,
  SurveyInfo,
} from "@components/MySurvey/styles";
import { useQuery } from "react-query";
import fetcher from "@utils/fetcher";
import { Empty } from "antd";

const SurveyList = () => {
  const baseUrl = process.env.REACT_APP_BASE_URL;

  const {
    isLoading,
    isSuccess,
    status,
    isError,
    data: SurveyList,
    error,
  } = useQuery(["SurveyList"], () =>
    fetcher({ queryKey: `${baseUrl}/surveys/submitted-survey` })
  );

  return (
    <div style={{ paddingTop: "2%", paddingLeft: "10%" }}>
      <SurveyHeader>참여 설문 조회</SurveyHeader>
      {SurveyList?.mySubmittedSurveys.length >= 1 ? (
        <SurveyContainer>
          {SurveyList &&
            [...Array(SurveyList?.mySubmittedSurveys.length)].map(
              (e, index) => {
                const SurveyId = SurveyList?.mySubmittedSurveys[index].surveyId;
                return (
                  <SurveyBox>
                    <SurveyInfo>
                      <SurveyTitle>
                        {SurveyList?.mySubmittedSurveys[index]?.surveyTitle}
                      </SurveyTitle>
                      <SurveyResult>
                        응답 일자:
                        {SurveyList?.mySubmittedSurveys[index]?.submittedDate}
                      </SurveyResult>
                    </SurveyInfo>
                  </SurveyBox>
                );
              }
            )}
        </SurveyContainer>
      ) : (
        <Empty
          image={Empty.PRESENTED_IMAGE_SIMPLE}
          imageStyle={{ height: 100 }}
          description={<span>참여한 설문이 없습니다.</span>}
        />
      )}
    </div>
  );
};

export default SurveyList;
