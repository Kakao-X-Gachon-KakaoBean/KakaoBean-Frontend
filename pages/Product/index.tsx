import React, { PropsWithChildren, useCallback } from "react";
import {
  CartesianGrid,
  XAxis,
  YAxis,
  Tooltip,
  Legend,
  PieChart,
  Pie,
  Cell,
  ResponsiveContainer,
  BarChart,
  Bar,
} from "recharts";

import {
  GoingResult,
  LeftResult,
  PieContainer,
  PieDescription,
  PieHeading,
  PieLangColorBox,
  PieLangColorBoxWrapper,
  PieLangText,
  PieLeft,
  PieRatioWrapper,
  PieRight,
  PieTitle,
  ResponseResult,
  TitleResult,
  RightResult,
  SectionWrapper,
  StatisticSection,
  SurveyBody,
  SurveyBodyChart,
  SurveyBodyResult,
  SurveyBodySummary,
  SurveyHeader,
  SurveySection,
  SurveyShortSection,
  SurveyShortBody,
  SurveyVertical,
  ViewSection,
  Wrapper,
} from "@pages/Product/styles";

import Accordion from "@mui/material/Accordion";
import AccordionSummary from "@mui/material/AccordionSummary";
import AccordionDetails from "@mui/material/AccordionDetails";
import Typography from "@mui/material/Typography";
import ExpandMoreIcon from "@mui/icons-material/ExpandMore";
import HeaderBar from "@components/HeaderBar";
import { Link } from "react-router-dom";
import { Button } from "antd";
import { SurveyDataType } from "./type";
import { useMutation, useQuery, useQueryClient } from "react-query";
import axios, { AxiosError } from "axios";
import fetcher from "../../utils/fetcher";
import { useLocation } from "react-router";

const Product = () => {
  const queryClient = useQueryClient();
  const SurveyData: SurveyDataType = {
    surveyId: 1,
    surveyTitle: "title",
    surveyDate: "2022-05-05",
    numberOfResponse: 5,
    surveyGenderPercent: [
      { name: "남자", value: 40 },
      { name: "여자", value: 55 },
      { name: "알수없음", value: 5 },
    ],
    surveyAgePercent: [
      { name: "10대", 인원수: 10 },
      { name: "20대", 인원수: 20 },
      { name: "30대", 인원수: 30 },
      { name: "40대", 인원수: 3 },
      { name: "50대", 인원수: 3 },
      { name: "60대", 인원수: 5 },
      { name: "알수 없음", 인원수: 8 },
    ],
    questionsResult: [
      {
        type: "RANGE",
        title: "Range Bar Question",
        explanation: "ex1",
        min: 1,
        max: 10,
        answers: [
          { name: "1", value: 40 },
          { name: "5", value: 55 },
          { name: "10", value: 5 },
        ],
      },
      {
        type: "MULTIPLE",
        title: "First Multiple Question Title",
        explanation: "ex3",
        answers: [
          { name: "1", value: 40 },
          { name: "5", value: 55 },
          { name: "10", value: 5 },
        ],
      },
      {
        type: "ESSAY",
        title: "Essay Question Title",
        explanation: "ex2",
        answers: [
          "1번답변",
          "2번답변",
          "3번답변",
          "4번답변",
          "5번답변",
          "6번답변",
          "7번답변",
        ],
      },
      {
        type: "MULTIPLE",
        title: "123123Multiple Question Title",
        explanation: "ex3",
        answers: [
          { name: "6", value: 20 },
          { name: "2", value: 65 },
          { name: "16", value: 15 },
        ],
      },
    ],
  };

  const COLORS = [
    "#0088FE",
    "#FF8042",
    "#FFBB28",
    "#00C49F",
    "#ba4c4c",
    "#98cdd6",
  ];

  interface CustomizedLabelProps {
    cx: number;
    cy: number;
    midAngle: number;
    innerRadius: number;
    outerRadius: number;
    percent: number;
    index: number;
  }
  const RADIAN = Math.PI / 180;
  const renderCustomizedLabel = ({
    cx,
    cy,
    midAngle,
    innerRadius,
    outerRadius,
    percent,
    index,
  }: PropsWithChildren<CustomizedLabelProps>) => {
    const radius = innerRadius + (outerRadius - innerRadius) * 0.5;
    const x = cx + radius * Math.cos(-midAngle * RADIAN);
    const y = cy + radius * Math.sin(-midAngle * RADIAN);

    return (
      <text
        x={x}
        y={y}
        fill="white"
        textAnchor={x > cx ? "start" : "end"}
        dominantBaseline="central"
      >
        {`${(percent * 100).toFixed(0)}%`}
      </text>
    );
  };

  const location = useLocation();
  // const {
  //   isLoading,
  //   isSuccess,
  //   status,
  //   isError,
  //   data: MySurvey,
  //   error,
  // } = useQuery(["MySurvey"], () =>
  //   fetcher({
  //     queryKey: `http://localhost:8080/surveys/${
  //       location.pathname.split("/")[3]
  //     }`,
  //   })
  // );

  // SurveyData 이것으로 변경 예정

  const mutation = useMutation<string, AxiosError, { SurveyId: string }>(
    "EndSurvey",
    ({ SurveyId }) =>
      axios
        .patch(`http://localhost:8080/surveys/${SurveyId}`, {
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
        queryClient.invalidateQueries("MySurvey");
      },
      onError(error) {
        alert("실패");
      },
    }
  );

  const EndSurvey = useCallback(
    (SurveyId: any) => {
      mutation.mutate({ SurveyId });
    },
    [mutation]
  );

  return (
    <Wrapper>
      <HeaderBar />
      <SectionWrapper>
        <ViewSection>
          <TitleResult>
            <div>설문 제목</div>
            <div>{SurveyData?.surveyTitle}</div>
          </TitleResult>
          <ResponseResult>
            <div>생성일</div>
            <div>{SurveyData?.surveyDate}</div>
          </ResponseResult>
          <GoingResult>
            <div>응답 수</div>
            <div>{SurveyData?.numberOfResponse}</div>
          </GoingResult>
          <div
            style={{
              display: "flex",
              justifyContent: "center",
              alignItems: "center",
            }}
          >
            <Link to="/surveyresponsedetail" style={{ textDecoration: "none" }}>
              <Button type="primary">
                조회하기
                <br />
              </Button>
            </Link>
          </div>
        </ViewSection>
        <StatisticSection>
          <LeftResult>
            <ResponsiveContainer width="100%" height="100%">
              <BarChart
                width={500}
                height={300}
                data={SurveyData?.surveyAgePercent}
                margin={{
                  top: 5,
                  right: 30,
                  left: 20,
                  bottom: 5,
                }}
              >
                <CartesianGrid strokeDasharray="3 3" />
                <XAxis dataKey="name" />
                <YAxis />
                <Tooltip />
                <Legend />
                <Bar dataKey="인원수" fill="#82ca9d" />
              </BarChart>
            </ResponsiveContainer>
          </LeftResult>
          <RightResult>
            <PieContainer>
              <PieLeft>
                <PieHeading>
                  <PieTitle>설문 연령 비율</PieTitle>
                  <PieDescription>해당 설문 기준</PieDescription>
                </PieHeading>
                <PieRatioWrapper>
                  {SurveyData?.surveyGenderPercent &&
                    SurveyData?.surveyGenderPercent.map((it, idx) => (
                      <PieLangColorBoxWrapper key={`${it.name}-${it.value}`}>
                        <PieLangColorBox props={COLORS[idx]} />
                        <div>
                          <PieLangText>{it.name}</PieLangText>
                          <PieLangText>{it.value}%</PieLangText>
                        </div>
                      </PieLangColorBoxWrapper>
                    ))}
                </PieRatioWrapper>
              </PieLeft>
              <PieRight>
                <PieChart width={300} height={300}>
                  <Pie
                    data={SurveyData?.surveyGenderPercent}
                    cx="50%"
                    cy="50%"
                    labelLine={false}
                    label={renderCustomizedLabel}
                    innerRadius={30}
                    outerRadius={80}
                    fill="#8884d8"
                    dataKey="value"
                  >
                    {SurveyData?.surveyGenderPercent.map((entry, index) => (
                      <Cell
                        key={`cell-${index}`}
                        fill={COLORS[index % COLORS.length]}
                      />
                    ))}
                  </Pie>
                </PieChart>
              </PieRight>
            </PieContainer>
          </RightResult>
        </StatisticSection>

        {SurveyData.questionsResult.map((question, index) => {
          if (question.type === "ESSAY") {
            return (
              <SurveyShortSection key={index}>
                <SurveyHeader>{question.title}</SurveyHeader>
                <SurveyShortBody>
                  <SurveyBodyResult>
                    <Accordion sx={{ width: "100%" }}>
                      <AccordionSummary
                        expandIcon={<ExpandMoreIcon />}
                        aria-controls="panel1a-content"
                        id="panel1a-header"
                      >
                        <Typography>설문 답변</Typography>
                      </AccordionSummary>
                      <AccordionDetails>
                        {question.answers.map(
                          (
                            answer: string | { name: string; value: number },
                            answerIndex
                          ) => (
                            <div key={answerIndex}>
                              {typeof answer === "string"
                                ? answer
                                : `${answer.name}번 ${answer.value}%`}
                            </div>
                          )
                        )}
                      </AccordionDetails>
                    </Accordion>
                  </SurveyBodyResult>
                </SurveyShortBody>
              </SurveyShortSection>
            );
          } else if (question.type === "MULTIPLE") {
            return (
              <SurveySection key={index}>
                <SurveyHeader>{question?.title}</SurveyHeader>
                <SurveyBody>
                  <SurveyBodyChart>
                    <PieChart width={300} height={200}>
                      <Pie
                        data={question?.answers}
                        cx="50%"
                        cy="50%"
                        labelLine={false}
                        label={renderCustomizedLabel}
                        innerRadius={30}
                        outerRadius={80}
                        fill="#8884d8"
                        dataKey="value"
                      >
                        {question?.answers.map(
                          (
                            entry: string | { name: string; value: number },
                            index
                          ) => {
                            if (typeof entry === "string") {
                              return <div></div>;
                            } else {
                              return (
                                <Cell
                                  key={`cell-${index}`}
                                  fill={COLORS[index % COLORS.length]}
                                />
                              );
                            }
                          }
                        )}
                      </Pie>
                    </PieChart>
                  </SurveyBodyChart>
                  <SurveyBodySummary>몇번</SurveyBodySummary>
                  <SurveyVertical></SurveyVertical>
                  <SurveyBodyResult>
                    {question.answers.map((answer, answerIndex) => {
                      if (typeof answer === "string") {
                        return <div key={answerIndex}>{answer}</div>;
                      } else {
                        return (
                          <div key={answerIndex}>
                            {answer.name}번 {answer.value}%
                          </div>
                        );
                      }
                    })}
                  </SurveyBodyResult>
                </SurveyBody>
              </SurveySection>
            );
          } else if (question.type === "RANGE") {
            return (
              <SurveySection key={index}>
                <SurveyHeader>{question.title}</SurveyHeader>
                <SurveyBody>
                  <SurveyBodyChart>
                    <PieChart width={300} height={200}>
                      <Pie
                        data={question?.answers}
                        cx="50%"
                        cy="50%"
                        labelLine={false}
                        label={renderCustomizedLabel}
                        innerRadius={30}
                        outerRadius={80}
                        fill="#8884d8"
                        dataKey="value"
                      >
                        {question?.answers.map(
                          (
                            entry: string | { name: string; value: number },
                            index
                          ) => {
                            if (typeof entry === "string") {
                              return <div></div>;
                            } else {
                              return (
                                <Cell
                                  key={`cell-${index}`}
                                  fill={COLORS[index % COLORS.length]}
                                />
                              );
                            }
                          }
                        )}
                      </Pie>
                    </PieChart>
                  </SurveyBodyChart>
                  <SurveyBodySummary>몇번</SurveyBodySummary>
                  <SurveyVertical></SurveyVertical>
                  <SurveyBodyResult>
                    {question.answers.map((answer, answerIndex) => {
                      if (typeof answer === "string") {
                        return <div key={answerIndex}>{answer}</div>;
                      } else {
                        return (
                          <div key={answerIndex}>
                            {answer.name}번 {answer.value}%
                          </div>
                        );
                      }
                    })}
                  </SurveyBodyResult>
                </SurveyBody>
              </SurveySection>
            );
          } else {
            return null;
          }
        })}
      </SectionWrapper>
    </Wrapper>
  );
};

export default Product;
