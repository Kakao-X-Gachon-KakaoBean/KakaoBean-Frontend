import React, { useEffect, useRef, useState } from "react";
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
import { MultipleQuestion } from "@components/SurveyResponseTemplates/MultipleChoice/type";
import { RangeBarQuestion } from "@components/SurveyResponseTemplates/RangeBar/type";
import { SubjectiveQuestion } from "@components/SurveyResponseTemplates/Subjective/type";

type QuestionTypes = MultipleQuestion | SubjectiveQuestion | RangeBarQuestion;

const Team = () => {
  const carouselRef = useRef<CarouselRef>(null);
  const [currentSlide, setCurrentSlide] = useState(0);

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

  //Test: 결과값 넣기 for MultipleQuestions
  const [options, setOptions] = useState([
    { checked: false },
    { checked: false },
    { checked: false },
    { checked: false },
    { checked: false },
  ]);

  const [questions, setQuestions] = useState<QuestionTypes[]>([
    {
      type: "RANGE",
      questionId: 1,
      title: "Range Bar Question",
      explanation: "ex1",
      questionNumber: "0",
      finalQuestion: false,
      nextQuestionNumber: "2",
      min: 1,
      max: 10,
    },
    {
      type: "MULTIPLE",
      questionId: 2,
      title: "Multiple Question Title",
      explanation: "ex2",
      questionNumber: "1",
      finalQuestion: false,
      nextQuestionNumber: "3",
      numberOfAnswerChoices: 1,
      answers: [
        {
          answerId: 1,
          content: "first choice answer",
        },
        {
          answerId: 2,
          content: "second choice answer",
        },
        {
          answerId: 3,
          content: "third choice answer",
        },
        {
          answerId: 4,
          content: "fourth choice answer",
        },
        {
          answerId: 5,
          content: "fifth choice answer",
        },
      ],
      logics: [],
    },
    {
      type: "ESSAY",
      questionId: 3,
      title: "Essay Question Title",
      explanation: "ex2",
      questionNumber: "1",
      finalQuestion: false,
      nextQuestionNumber: "2",
    },
    {
      type: "MULTIPLE",
      questionId: 4,
      title: "First Multiple Question Title",
      explanation: "ex3",
      questionNumber: "2",
      finalQuestion: false,
      nextQuestionNumber: "6",
      numberOfAnswerChoices: 2,
      answers: [
        {
          answerId: 5,
          content: "4번질문_first choice answer",
        },
        {
          answerId: 6,
          content: "4번질문_second choice answer",
        },
        {
          answerId: 7,
          content: "4번질문_third choice answer",
        },
        {
          answerId: 8,
          content: "4번질문_fourth choice answer",
        },
        {
          answerId: 9,
          content: "4번질문_fifth choice answer",
        },
      ],
      logics: [
        {
          conditionOfQuestionAnswers: [
            {
              answerId: 5,
              content: "first choice answer",
            },
            {
              answerId: 6,
              content: "second choice answer",
            },
          ],
          nextQuestionNumber: "3",
        },
        {
          conditionOfQuestionAnswers: [
            {
              answerId: 7,
              content: "third choice answer",
            },
            {
              answerId: 8,
              content: "fourth choice answer",
            },
          ],
          nextQuestionNumber: "4",
        },
      ],
    },
    {
      type: "RANGE",
      questionId: 16,
      title: "Range Bar Question",
      explanation: "ex1",
      questionNumber: "3",
      finalQuestion: false,
      nextQuestionNumber: "5",
      min: 1,
      max: 10,
    },
    {
      type: "MULTIPLE",
      questionId: 17,
      title: "Multiple Question Title",
      explanation: "without logic",
      questionNumber: "4",
      finalQuestion: false,
      nextQuestionNumber: "6",
      numberOfAnswerChoices: 1,
      answers: [
        {
          answerId: 18,
          content: "5번질문_first choice answer",
        },
        {
          answerId: 19,
          content: "5번질문_second choice answer",
        },
        {
          answerId: 20,
          content: "5번질문_third choice answer",
        },
        {
          answerId: 21,
          content: "5번질문_fourth choice answer",
        },
        {
          answerId: 22,
          content: "5번질문_fifth choice answer",
        },
      ],
      logics: [],
    },
    {
      type: "ESSAY",
      questionId: 23,
      title: "Essay Question Title",
      explanation: "ex2",
      questionNumber: "5",
      finalQuestion: false,
      nextQuestionNumber: "7",
    },
    {
      type: "ESSAY",
      questionId: 24,
      title: "Essay Question Title",
      explanation: "ex2",
      questionNumber: "6",
      finalQuestion: false,
      nextQuestionNumber: "7",
    },
    {
      type: "MULTIPLE",
      questionId: 25,
      title: "Multiple Question Title",
      explanation: "without logic",
      questionNumber: "7",
      finalQuestion: true,
      nextQuestionNumber: "0",
      numberOfAnswerChoices: 1,
      answers: [
        {
          answerId: 26,
          content: "7번질문_first choice answer",
        },
        {
          answerId: 27,
          content: "7번질문_second choice answer",
        },
        {
          answerId: 28,
          content: "7번질문_third choice answer",
        },
        {
          answerId: 29,
          content: "7번질문_fourth choice answer",
        },
        {
          answerId: 30,
          content: "7번질문_fifth choice answer",
        },
      ],
      logics: [],
    },
  ]);

  return (
    <div>
      <Carousel dotPosition={"right"} ref={carouselRef}>
        {/*TODO:
            1(해결). 버튼으로 바꾸기 - 해결한 듯?
            2(해결). 동적 질문 할당
            2_1(해결). json 입력이 있다고 가정할 때; 쭈욱 넣어놔야하나?
            2_2(해결). data.type에 따라서 질문 생성; 이후 데이터 넣기 - 데이터만 잘 설정하면 되는 듯
            3. 리스폰스 값 저장 - 되는데 지금 출력을 동적으로 못함,,,
            _
            4. 로직 대응 (페이지 이동, 응답 값 출력)
            5. thisQuestion안에 데이터 들어가면, 각 컴포넌트 안에서 이를 props로 세팅할 수 있게 하기.
            */}
        {questions.map((question, index) => {
          if (question.type === "MULTIPLE") {
            const mQuestion = question as MultipleQuestion;
            return (
              // MULTIPLE 타입에 해당하는 JSX 코드
              <div>
                {/*page*/}
                <button
                  onClick={() => {
                    console.log("This is Options Array in Team: ", options);
                  }}
                >
                  This is Options Array in Team
                </button>
                <MultipleChoiceQuestions
                  thisQuestion={mQuestion}
                  options={options}
                  setOptions={setOptions}
                />
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
                <h1>hi</h1>
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
