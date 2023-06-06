import React, { useState } from "react";
import { Wrapper } from "@pages/Survey/SurveyResponseDetail/styles";
import SurveyResponseLogicFlow from "@components/SurveyResponseLogicFlow";
import HeaderBar from "@components/HeaderBar";
import SurveyResponseDetailTable from "@components/SurveyResponseDetailTable";
import { useQuery } from "react-query";
import { useLocation } from "react-router-dom";
import fetcher from "../../../utils/fetcher";
import { incomingSurvey, incomingResponses } from "./type";
import { dummySurvey } from "./dummy";

const SurveyResponseDetail = () => {
  const location = useLocation<{ surveyId: string }>();
  const { surveyId } = location.state;
  const [survey, setSurvey] = useState<incomingSurvey>();
  const [responses, setResponses] = useState<incomingResponses[]>();
  interface responseDetail {
    survey: incomingSurvey;
    responses: incomingResponses[];
  }

  const { isLoading, isSuccess, status, isError, data, error } =
    useQuery<responseDetail>(
      ["resdetail"],
      // 추후에 responses/{surveyId}의 surveyId를 동적으로 설정할 수 있어야 한다.
      () =>
        fetcher({ queryKey: "http://localhost:8080/responses/" + surveyId }),
      {
        onSuccess: (data) => {
          setSurvey(data.survey);
          setResponses(data.responses);
        },
      }
    );
  // useEffect(() => {
  //   const dummyData: responseDetail = dummySurvey;
  //   setSurvey(dummyData.survey);
  //   setResponses(dummyData.responses);
  // }, []);

  return (
    <Wrapper>
      <HeaderBar />
      {survey ? (
        <SurveyResponseLogicFlow survey={survey} />
      ) : (
        <div>설문 정보가 존재하지 않습니다.</div>
      )}
      {responses ? (
        <SurveyResponseDetailTable responses={responses} />
      ) : (
        <div></div>
      )}
    </Wrapper>
  );
};

export default SurveyResponseDetail;
