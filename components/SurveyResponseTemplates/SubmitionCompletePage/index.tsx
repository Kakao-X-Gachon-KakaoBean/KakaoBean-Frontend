import React, { useEffect, useState } from "react";
import { useRecoilState } from "recoil";
import {
  Explanation,
  QuestionBox,
  Title,
} from "@components/SurveyResponseTemplates/styles";
import { SpaceBetween } from "@pages/Team/styles";
import { report } from "@pages/Team";
import { postData } from "@components/SurveyResponseTemplates/SurveyData/surveyOut";

export const EndingPage = () => {
  const [reportData, setReportData] = useRecoilState(report);
  const [url, setUrl] = useState("http://localhost:8080/responses");
  useEffect(() => {
    console.log("here!!!");
  }, []);
  let check: boolean = false;

  useEffect(() => {
    postData(url, reportData)
      .then((r) => {
        console.log("통과!:", r);
        check = true;
      })
      .catch((error) => {
        console.log(error);
      });
  }, []);

  if (check) {
    return (
      <QuestionBox>
        <Title id={"canvas"}>응답 제출이 완료되었습니다!</Title>
      </QuestionBox>
    );
  } else {
    return (
      <QuestionBox>
        <Title>응답 제출에 실패하였습니다.</Title>
      </QuestionBox>
    );
  }
};
