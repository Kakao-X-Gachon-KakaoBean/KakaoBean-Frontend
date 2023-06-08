import React, { useEffect, useRef, useState } from "react";
import { atom, useRecoilState } from "recoil";
import { Carousel } from "antd";
import { CarouselRef } from "antd/es/carousel";
import {
  Button,
  ButtonBox,
  ModifiedButton,
  SpaceBetween,
} from "@pages/Team/styles";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faChevronLeft,
  faChevronRight,
} from "@fortawesome/free-solid-svg-icons";
import { MultipleChoiceQuestions } from "@components/SurveyResponseTemplates/MultipleChoice";
import { RangeBarQuestions } from "@components/SurveyResponseTemplates/RangeBar";
import { SubjectiveQuestions } from "@components/SurveyResponseTemplates/Subjective";
import { MultipleQuestion } from "@components/SurveyResponseTemplates/MultipleChoice/type";
import { RangeBarQuestion } from "@components/SurveyResponseTemplates/RangeBar/type";
import { SubjectiveQuestion } from "@components/SurveyResponseTemplates/Subjective/type";
import { QuestionBox, Title } from "@components/SurveyResponseTemplates/styles";
import {
  incomingDataList,
  QuestionTypes,
  responseDataList,
} from "@pages/Team/type";
import { EndingPage } from "@components/SurveyResponseTemplates/SubmitionCompletePage";
import { useQuery } from "react-query";
import fetcher from "@utils/fetcher";
import { useLocation } from "react-router";

//atom 설정; 이걸로 모든 설문 응답 데이터 받아올 예정
export const report = atom<responseDataList>({
  key: "report",
  default: {
    surveyId: 0, //초기화 값
    questions: [],
  },
});

export const forLogic = atom<string>({
  key: "logic",
  default: "0",
});

export const submitAll = atom<number[]>({
  key: "submitCall",
  default: [],
});

const Team = () => {
  const baseUrl = process.env.REACT_APP_BASE_URL;

  const location = useLocation();

  const surveyId = location.pathname.split("/")[2];
  const {
    isLoading,
    isSuccess,
    status,
    isError,
    data: surveyData,
    error,
  } = useQuery<any>(
    ["survey", surveyId],
    () => fetcher({ queryKey: `${baseUrl}/surveys/${surveyId}` }),
    {
      onSuccess: (data) => {
        setSurvey(data);
        setReportData((prevState) => ({
          ...prevState,
          surveyId: parseInt(location.pathname.split("/")[2]),
        }));
      },
    }
  );

  const carouselRef = useRef<CarouselRef>(null);
  const [currentSlide, setCurrentSlide] = useState(0);

  //TODO: 로직에 따른 이동 Queue 만들기
  const [logicQueue, setLogicQueue] = useState<number[]>([0]);
  const [counter, setCounter] = useState<number>(0);

  //실제 데이터 _ 위에 주석하고 사용
  //이건 아직,, const [survey, setSurvey] = useRecoilState(surveyData);
  const [survey, setSurvey] = useState<incomingDataList>();
  const [questions, setQuestions] = useState<QuestionTypes[]>([]);
  useEffect(() => {
    if (survey?.questions) {
      setQuestions(survey.questions);
    }
  });

  //recoil_ can view received response in here
  const [reportData, setReportData] = useRecoilState(report);
  const [submitQueue, setSubmitQueue] = useRecoilState(submitAll);

  //logic에 의한 이동 슬라이드 번호
  const [slideToGo, setSlideToGo] = useRecoilState(forLogic);

  //carousel(페이지 돌아가는거 구현)
  useEffect(() => {
    carouselRef.current && carouselRef.current.goTo(currentSlide);
  }, [currentSlide]);

  const handlePrevClick = () => {
    setCounter(counter - 1);
    setLogicQueue((prevState) => {
      prevState.pop();
      return prevState;
    });
  };

  const handleNextClick = () => {
    if (Number(slideToGo) != 0) {
      console.log("has logic!");
      setCounter(counter + 1);
      setLogicQueue((prevState) => {
        return [...prevState, Number(slideToGo) - 1];
      });
      setSlideToGo("0");
    } else {
      console.log("in here");
      setLogicQueue((prevState) => {
        return [...prevState, currentSlide + 1];
      });
      setCounter(counter + 1);
    }
  };

  const handleClick = () => {
    setEndSurvey(true);
  };

  useEffect(() => {
    setCurrentSlide(logicQueue[counter]);
    // consoleLogger();
  }, [counter]);

  //Test_output: 결과 받아오기 for MultipleQuestions
  useEffect(() => {
    console.log("changed in team_recoil: ", reportData);
    console.log("changed in team_Slide2go: ", slideToGo);
  }, [reportData, slideToGo]);

  useEffect(() => {
    console.log("check State: ", submitQueue);
    if (submitQueue.length > 0) handleClick();
  }, [submitQueue]);

  const [endSurvey, setEndSurvey] = useState(false);
  return (
    <div style={{ height: "100vh", overflow: "hidden" }}>
      {!endSurvey ? (
        <div>
          <Carousel dotPosition={"right"} ref={carouselRef}>
            {questions &&
              questions.map((question: any, index) => {
                if (question.type === "MULTIPLE") {
                  const mQuestion = question as MultipleQuestion;
                  return (
                    // MULTIPLE 타입에 해당하는 JSX 코드
                    <div>
                      <MultipleChoiceQuestions thisQuestion={mQuestion} />
                    </div>
                  );
                } else if (question.type === "RANGE") {
                  const rQuestion = question as RangeBarQuestion;
                  return (
                    // RANGE 타입에 해당하는 JSX 코드
                    <div>
                      <RangeBarQuestions thisQuestion={rQuestion} />
                    </div>
                  );
                } else if (question.type === "ESSAY") {
                  const sQuestion = question as SubjectiveQuestion;
                  return (
                    // ESSAY 타입에 해당하는 JSX 코드
                    <div>
                      <SubjectiveQuestions thisQuestion={sQuestion} />
                    </div>
                  );
                } else {
                  console.log("Type is null!");
                  return (
                    <div>
                      <h1>No Type Space</h1>
                    </div>
                  ); // 예외 처리
                }
              })}

            <div>
              <QuestionBox>
                <Title style={{ textAlign: "center" }}>
                  응답해주셔서 감사합니다!
                </Title>
                <SpaceBetween />
                <ModifiedButton
                  onClick={() => {
                    console.log("report Data", reportData);
                    setSubmitQueue(logicQueue);
                  }}
                >
                  제출하기
                </ModifiedButton>
              </QuestionBox>
            </div>
          </Carousel>
          <QuestionBox>
            <ButtonBox>
              <Button
                disabled={currentSlide === 0}
                onClick={() => {
                  handlePrevClick();
                }}
              >
                <FontAwesomeIcon icon={faChevronLeft} />
              </Button>
              <Button
                disabled={currentSlide === questions.length}
                onClick={() => {
                  handleNextClick();
                }}
              >
                <FontAwesomeIcon icon={faChevronRight} />
              </Button>
            </ButtonBox>
          </QuestionBox>
        </div>
      ) : (
        <EndingPage />
      )}
    </div>
  );
};

export default Team;
