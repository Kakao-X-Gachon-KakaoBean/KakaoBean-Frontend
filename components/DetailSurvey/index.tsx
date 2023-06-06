import React, {
  PropsWithChildren,
  useCallback,
  useEffect,
  useState,
} from "react";
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
  CopySection,
  ViewSection,
  Wrapper,
  DetailButton,
  CloseSurveyButton,
  ButtonDiv,
  StyledFontAwesomeIcon,
} from "@components/DetailSurvey/styles";

import Accordion from "@mui/material/Accordion";
import AccordionSummary from "@mui/material/AccordionSummary";
import AccordionDetails from "@mui/material/AccordionDetails";
import Typography from "@mui/material/Typography";
import ExpandMoreIcon from "@mui/icons-material/ExpandMore";
import HeaderBar from "@components/HeaderBar";
import { SurveyDataType } from "./type";
import { useMutation, useQuery, useQueryClient } from "react-query";
import { format, parse } from "date-fns";
import axios, { AxiosError } from "axios";
import fetcher from "../../utils/fetcher";
import { Redirect, useLocation } from "react-router";
import { CopyToClipboard } from "react-copy-to-clipboard";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faCopy } from "@fortawesome/free-solid-svg-icons/faCopy";
import { Button, Modal } from "antd";
import { Link } from "react-router-dom";

const DetailSurvey = () => {
  const queryClient = useQueryClient();
  const baseUrl = process.env.REACT_APP_BASE_URL;
  const frontbaseUrl = process.env.REACT_APP_FRONT_BASE_URL;
  const [patch, setPatch] = useState(false);
  const [isModalOpen, setIsModalOpen] = useState(false);

  const handleOk = () => {
    setIsModalOpen(false);
  };

  const COLORS = [
    "#0058ffff",
    "#ea4335ff",
    "#fbbc04ff",
    "#157145",
    "#156345",
    "#66c1d4ff",
    "#dfecffff",
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

  const {
    isLoading,
    isSuccess,
    status,
    isError,
    data: SurveyData,
    error,
  } = useQuery<SurveyDataType>(["SurveyResult"], () =>
    fetcher({
      queryKey: `${baseUrl}/responses/survey-statistics/${
        location.pathname.split("/")[2]
      }`,
    })
  );

  const mutation = useMutation<string, AxiosError, { SurveyId: string }>(
    "EndSurvey",
    ({ SurveyId }) =>
      axios
        .patch(
          `${baseUrl}/surveys/${SurveyId}`,
          {},
          {
            headers: {
              Authorization: `Bearer ${localStorage.getItem("accessToken")}`,
            },
            withCredentials: true,
          }
        )
        .then((response) => response.data),
    {
      onMutate() {},
      onSuccess(data) {
        queryClient.invalidateQueries("EndSurvey");
        setPatch(true);
        alert("설문이 마감되었습니다.");
      },
      onError(error) {
        alert("실패");
      },
    }
  );

  const EndSurvey = useCallback(
    (SurveyId: string) => {
      if (SurveyData?.closeStatus) {
        setIsModalOpen(true);
      } else {
        mutation.mutate({ SurveyId });
      }
    },
    [mutation]
  );

  if (patch) {
    return <Redirect to={"/mypage/mysurvey"} />;
  }

  // useEffect(() => {
  //   window.addEventListener("error", (e) => {
  //     if (e.message === "ResizeObserver loop limit exceeded") {
  //       const resizeObserverErrDiv = document.getElementById(
  //         "webpack-dev-server-client-overlay-div"
  //       );
  //       const resizeObserverErr = document.getElementById(
  //         "webpack-dev-server-client-overlay"
  //       );
  //       if (resizeObserverErr) {
  //         resizeObserverErr.setAttribute("style", "display: none");
  //       }
  //       if (resizeObserverErrDiv) {
  //         resizeObserverErrDiv.setAttribute("style", "display: none");
  //       }
  //     }
  //   });
  // }, []);

  return (
    <Wrapper>
      <HeaderBar />
      <SectionWrapper>
        <CopySection>
          <div>
            {frontbaseUrl}/survey/{SurveyData?.surveyId}
          </div>
          <CopyToClipboard
            text={`${frontbaseUrl}/survey/${SurveyData?.surveyId}`}
          >
            <StyledFontAwesomeIcon icon={faCopy} />
          </CopyToClipboard>
        </CopySection>

        <ViewSection>
          <TitleResult>
            <div>설문 제목</div>
            <div>{SurveyData?.surveyTitle}</div>
          </TitleResult>
          <ResponseResult>
            <div>생성일</div>
            <div>
              <div>{SurveyData?.surveyDate} </div>
              {SurveyData?.closeStatus ? (
                <div>설문이 마감되었습니다.</div>
              ) : null}
            </div>
          </ResponseResult>
          <GoingResult>
            <div>응답 수</div>
            <div>{SurveyData?.numberOfResponse}</div>
          </GoingResult>
          <ButtonDiv>
            <DetailButton
              to={{
                pathname: "/surveyresponsedetail",
                state: {
                  surveyId: location.pathname.split("/")[2].toString(),
                },
              }}
            >
              데이터 조회
            </DetailButton>
            <CloseSurveyButton
              onClick={() =>
                EndSurvey(
                  {
                    SurveyId: location.pathname.split("/")[2],
                  }.SurveyId.toString()
                )
              }
            >
              설문 마감
            </CloseSurveyButton>
          </ButtonDiv>
        </ViewSection>
        <StatisticSection>
          <LeftResult>
            <ResponsiveContainer width="95%" height="90%">
              <BarChart
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
                <Bar dataKey="value" fill="#35a753ff" />
              </BarChart>
            </ResponsiveContainer>
          </LeftResult>
          <RightResult>
            <PieContainer>
              <PieLeft>
                <PieHeading>
                  <PieTitle>성별 비율</PieTitle>
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
                <PieChart width={400} height={400}>
                  <Pie
                    data={SurveyData?.surveyGenderPercent}
                    cx="50%"
                    cy="50%"
                    labelLine={false}
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

        {SurveyData?.questionsResult.map((question, index) => {
          if (question.type === "ESSAY") {
            return (
              <SurveyShortSection key={index}>
                <SurveyHeader>
                  <div>{question.title}</div>
                  <div>{question.explanation}</div>
                </SurveyHeader>
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
                              {answerIndex + 1} {". "}
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
                <SurveyHeader>
                  <div>{question.title}</div>
                  <div>{question.explanation}</div>
                </SurveyHeader>
                <SurveyBody>
                  <SurveyBodyChart>
                    <PieChart width={300} height={200}>
                      <Pie
                        data={question?.answers}
                        cx="50%"
                        cy="50%"
                        labelLine={false}
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
                  <SurveyBodySummary>
                    <PieRatioWrapper>
                      {question?.answers &&
                        question?.answers.map((answer, answerIndex) => {
                          if (typeof answer === "string") {
                            return <div key={answerIndex}>{answer}</div>;
                          } else {
                            return (
                              <PieLangColorBoxWrapper
                                key={`${answer.name}-${answer.value}`}
                              >
                                <PieLangColorBox props={COLORS[answerIndex]} />
                                <div>
                                  <PieLangText>{answer.name}</PieLangText>
                                  <PieLangText>{answer.value}%</PieLangText>
                                </div>
                              </PieLangColorBoxWrapper>
                            );
                          }
                        })}
                    </PieRatioWrapper>
                  </SurveyBodySummary>
                  <SurveyVertical></SurveyVertical>
                  <SurveyBodyResult>
                    <div>선택된 번호</div>
                    {question.answers.map((answer, answerIndex) => {
                      if (typeof answer === "string") {
                        return <div key={answerIndex}>{answer}</div>;
                      } else {
                        return <div key={answerIndex}>{answer.name}</div>;
                      }
                    })}
                  </SurveyBodyResult>
                </SurveyBody>
              </SurveySection>
            );
          } else if (question.type === "RANGE") {
            return (
              <SurveySection key={index}>
                <SurveyHeader>
                  <div>{question.title}</div>
                  <div>{question.explanation}</div>
                </SurveyHeader>
                <SurveyBody>
                  <SurveyBodyChart>
                    <PieChart width={300} height={200}>
                      <Pie
                        data={question?.answers}
                        cx="50%"
                        cy="50%"
                        labelLine={false}
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
                  <SurveyBodySummary>
                    <PieRatioWrapper>
                      {question?.answers &&
                        question?.answers.map((answer, answerIndex) => {
                          if (typeof answer === "string") {
                            return <div key={answerIndex}>{answer}</div>;
                          } else {
                            return (
                              <PieLangColorBoxWrapper
                                key={`${answer.name}-${answer.value}`}
                              >
                                <PieLangColorBox props={COLORS[answerIndex]} />
                                <div>
                                  <PieLangText>{answer.name}</PieLangText>
                                  <PieLangText>{answer.value}%</PieLangText>
                                </div>
                              </PieLangColorBoxWrapper>
                            );
                          }
                        })}
                    </PieRatioWrapper>
                  </SurveyBodySummary>
                  <SurveyVertical></SurveyVertical>
                  <SurveyBodyResult>
                    <span>최대 범위:{question?.max}</span>
                    <span>최소 범위:{question?.min}</span>
                  </SurveyBodyResult>
                </SurveyBody>
              </SurveySection>
            );
          } else {
            return null;
          }
        })}
      </SectionWrapper>
      <Modal
        title="Cocoa"
        onCancel={handleOk}
        open={isModalOpen}
        onOk={handleOk}
        centered
      >
        <p>마감된 설문입니다.</p>
      </Modal>
    </Wrapper>
  );
};

export default DetailSurvey;
