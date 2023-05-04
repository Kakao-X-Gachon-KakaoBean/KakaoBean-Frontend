import React, { useEffect, useRef, useState } from "react";
import { atom, useRecoilState } from "recoil";

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

type QuestionTypes = MultipleQuestion | SubjectiveQuestion | RangeBarQuestion;

export const report = atom<Answer[]>({
  key: "report",
  default: [],
});

const Team = () => {
  const carouselRef = useRef<CarouselRef>(null);
  const [currentSlide, setCurrentSlide] = useState(0);

  //json data - only questions:
  const [questions, setQuestions] = useState<QuestionTypes[]>(
    testInput.questions
  );

  //recoil_ received answer in here
  const reportData = useRecoilState(report);

  // const responseData = atom<AnswerList>({
  //   key:"response",
  //   default:{
  //     surveyId: 2
  //     questions:[]
  //   }
  // })

  useEffect(() => {
    carouselRef.current && carouselRef.current.goTo(currentSlide);
  }, [currentSlide]);

  const handlePrevClick = () => {
    carouselRef.current?.prev();
    setCurrentSlide(currentSlide - 1);
  };

  const handleNextClick = () => {
    carouselRef.current?.next();
    setCurrentSlide(currentSlide + 1);
  };

  //Test: 결과 받아오기 for MultipleQuestions
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
            2_2(해결). data.type에 따라서 질문 생성; 이후 데이터 넣기
            -
            3. 리스폰스 값 저장 - 되는데 지금 출력을 동적으로 못함,,,
            4. 로직 대응 (페이지 이동, 응답 값 출력)
            5. thisQuestion안에 데이터 들어가면, 각 컴포넌트 안에서 이를 props로 세팅할 수 있게 하기.
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
      </Carousel>
      <ButtonBox>
        <Button disabled={currentSlide === 0} onClick={handlePrevClick}>
          <FontAwesomeIcon icon={faChevronLeft} />
        </Button>
        <Button
          disabled={currentSlide === questions.length}
          onClick={handleNextClick}
        >
          <FontAwesomeIcon icon={faChevronRight} />
        </Button>
      </ButtonBox>
    </div>
  );
};

export default Team;
