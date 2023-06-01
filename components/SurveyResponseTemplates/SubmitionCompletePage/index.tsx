import React, { useEffect, useState } from "react";
import { useRecoilState } from "recoil";
import {
  Explanation,
  QuestionBox,
  Title,
} from "@components/SurveyResponseTemplates/styles";
import { SpaceBetween } from "@pages/Team/styles";
import { report } from "@pages/Team";
import { useMutation } from "react-query";
import axios, { AxiosError } from "axios";
import { responseDataList } from "../../../pages/Team/type";

export const EndingPage = () => {
  const [reportData, setReportData] = useRecoilState(report);
  const [url, setUrl] = useState("http://localhost:8080/responses");
  const [check, setCheck] = useState<boolean>(false);
  const mutation = useMutation<string, AxiosError, responseDataList>(
    "registerResponse",
    (data) =>
      axios
        .post(url, data, {
          headers: {
            "X-Requested-With": "XMLHttpRequest",
            Authorization: `Bearer ${localStorage.getItem("accessToken")}`,
            "Content-Type": "application/json",
          },
        })
        .then((response) => response.data),
    {
      onMutate() {},
      onSuccess: (data) => {
        console.log("요청 성공,", data);
        setCheck(true);
      },
      onError(error) {
        console.log(error);
      },
    }
  );

  useEffect(() => {
    mutation.mutate(reportData);
  }, []);

  return (
    <QuestionBox>
      {check ? (
        <Title id={"canvas"}>응답 제출이 완료되었습니다!</Title>
      ) : (
        <Title>응답 제출에 실패하였습니다.</Title>
      )}
    </QuestionBox>
  );
};
