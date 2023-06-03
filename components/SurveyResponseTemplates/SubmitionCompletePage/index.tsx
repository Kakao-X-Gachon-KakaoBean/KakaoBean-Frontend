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
import Lottie from "lottie-react";
import successAnimation from "../../../animation/7893-confetti-cannons.json";
import failAnimation from "../../../animation/119777-fail.json";
import axios, { AxiosError } from "axios";
import { responseDataList } from "../../../pages/Team/type";
import { Button } from "antd";
import {
  EndingMessageDiv,
  LottieContainer,
  MessageContainer,
  Wrapper,
} from "./styles";

export const EndingPage = () => {
  const baseUrl = process.env.REACT_APP_BASE_URL;

  const [reportData, setReportData] = useRecoilState(report);
  const [url, setUrl] = useState(`${baseUrl}/responses`);
  const [check, setCheck] = useState<boolean>(false);

  const mutation = useMutation<string, AxiosError, responseDataList>(
    "registerResponse",
    (data) =>
      axios
        .post(url, data, {
          headers: {
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
    <Wrapper>
      {check ? (
        <MessageContainer>
          <LottieContainer>
            <Lottie animationData={successAnimation} />
          </LottieContainer>
          <EndingMessageDiv>응답 제출이 완료되었습니다!</EndingMessageDiv>
        </MessageContainer>
      ) : (
        <MessageContainer>
          <LottieContainer>
            <Lottie animationData={failAnimation} />
          </LottieContainer>
          <EndingMessageDiv>
            응답 제출에 실패하였습니다..{" "}
            <span
              onClick={() => window.location.reload()}
              style={{ color: "blue", cursor: "pointer" }}
            >
              다시 시도
            </span>
            해주세요
          </EndingMessageDiv>
        </MessageContainer>
      )}
    </Wrapper>
  );
};
