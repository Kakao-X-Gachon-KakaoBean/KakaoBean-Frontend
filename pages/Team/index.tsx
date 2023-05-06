import React, { useEffect, useRef, useState } from "react";
import { atom, useRecoilState, useSetRecoilState } from "recoil";

import HeaderBar from "@components/HeaderBar";
import { Carousel, Input } from "antd";
import { CarouselRef } from "antd/es/carousel";
import { Button, ButtonBox } from "@pages/Team/styles";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faChevronRight,
  faChevronLeft,
} from "@fortawesome/free-solid-svg-icons";

import { MultipleChoiceQuestions } from "@components/SurveyResponseTemplates/MultipleChoice";
import { RangeBarQuestions } from "@components/SurveyResponseTemplates/RangeBar";
import { SubjectiveQuestions } from "@components/SurveyResponseTemplates/Subjective";
import {
  Answer,
  MultipleQuestion,
} from "@components/SurveyResponseTemplates/MultipleChoice/type";
import { RangeBarQuestion } from "@components/SurveyResponseTemplates/RangeBar/type";
import { SubjectiveQuestion } from "@components/SurveyResponseTemplates/Subjective/type";
import { testInput } from "@pages/Team/testIncomingData";
import { QuestionBox } from "@components/SurveyResponseTemplates/MultipleChoice/styles";
import { QuestionTypes, responseDataList } from "@pages/Team/type";

//atom 설정; 이걸로 모든 설문 응답 데이터 받아올 예정
export const report = atom<responseDataList>({
  key: "report",
  default: {
    surveyId: 0, //초기화 값
    questions: [],
  },
});

export const forLogic = atom<number>({
  key: "logic",
  default: 0,
});

const Team = () => {
  const carouselRef = useRef<CarouselRef>(null);
  const [currentSlide, setCurrentSlide] = useState(0);

  //test json data - only 'questions' format:
  const [questions, setQuestions] = useState<QuestionTypes[]>(
    testInput.questions
  );

  //recoil_ can view received response in here
  const [reportData, setReportData] = useRecoilState(report);

  //logic에 의한 이동 슬라이드 번호
  const [slideToGo, setSlideToGo] = useRecoilState(forLogic);

  //surveyID 초기화 함수
  const initializeReport = () => {
    setReportData((prevState) => ({
      ...prevState,
      surveyId: testInput.surveyId,
    }));
  };

  // surveyId는 실행시 한번 만 실행
  useEffect(() => {
    initializeReport();
  }, []);

  //carousel(페이지 돌아가는거 구현)
  useEffect(() => {
    carouselRef.current && carouselRef.current.goTo(currentSlide);
  }, [currentSlide]);

  //뒤로 가기 버튼 ->  TODO: 이후엔 로직에 따른 번호로 이동으로 바뀌야함
  const handlePrevClick = () => {
    carouselRef.current?.prev();
    setCurrentSlide(currentSlide - 1);
  };

  //앞으로 가기 버튼->  TODO: 이후엔 로직에 따른 번호로 이동으로 바뀌야함
  const handleNextClick = () => {
    carouselRef.current?.next();
    setCurrentSlide(currentSlide + 1);
  };

  //Test_output: 결과 받아오기 for MultipleQuestions
  useEffect(() => {
    console.log("changed in team_recoil: ", reportData);
  }, [reportData]);

  return (
    <div>
      <Carousel dotPosition={"right"} ref={carouselRef}>
        {/*TODO:
            1(해결). 버튼으로 바꾸기 - 해결한 듯?
            2(해결). 동적 질문 할당
            2_1(해결). json 입력이 있다고 가정할 때
            2_2(해결). data.type에 따라서 질문 생성;
            2_3.(해결) thisQuestion안에 데이터 들어가면, 각 컴포넌트 안에서 이를 props로 세팅할 수 있게 하기.
            3.(해결) 리스폰스 값 저장
            ---------------------------------------------------------------------------------------
            4. 로직에 대한 페이지 이동
            5. 로직에 따른 응답 값 출력
            */}
        {questions.map((question, index) => {
          if (question.type === "MULTIPLE") {
            const mQuestion = question as MultipleQuestion;
            return (
              // MULTIPLE 타입에 해당하는 JSX 코드
              <div>
                {/*<button onClick={() => console.log(reportData)}>*/}
                {/*  this is the report_recoil_data*/}
                {/*</button>*/}
                {/*page*/}
                <MultipleChoiceQuestions thisQuestion={mQuestion} />
              </div>
            );
          } else if (question.type === "RANGE") {
            const rQuestion = question as RangeBarQuestion;
            return (
              // RANGE 타입에 해당하는 JSX 코드
              <div>
                {/*page*/}
                <RangeBarQuestions thisQuestion={rQuestion} />
              </div>
            );
          } else if (question.type === "ESSAY") {
            const sQuestion = question as SubjectiveQuestion;
            return (
              // ESSAY 타입에 해당하는 JSX 코드
              <div>
                {/*page*/}
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
        <QuestionBox>
          <div>수고하셨습니다 : 제출 페이지</div>
          <button
            onClick={() => {
              console.log(reportData);
            }}
          >
            제출하기
          </button>
        </QuestionBox>
      </Carousel>
      <ButtonBox>
        <Button disabled={currentSlide === 0} onClick={handlePrevClick}>
          <FontAwesomeIcon icon={faChevronLeft} />
        </Button>
        <Button
          disabled={currentSlide === questions.length + 1}
          onClick={handleNextClick}
        >
          <FontAwesomeIcon icon={faChevronRight} />
        </Button>
      </ButtonBox>
    </div>
  );
};

export default Team;
