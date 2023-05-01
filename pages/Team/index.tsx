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

  //Test Data for MultipleQuestions
  const [options, setOptions] = useState([
    { checked: false },
    { checked: false },
    { checked: false },
    { checked: false },
    { checked: false },
  ]);

  const types = [
    { type: "RANGE" },
    { type: "ESSAY" },
    { type: "MULTIPLE" },
    { type: "MULTIPLE" },
  ];

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
        {types.map((type, index) => {
          if (type.type === "MULTIPLE") {
            return (
              // MULTIPLE 타입에 해당하는 JSX 코드
              <div>
                {/*page1*/}
                <button
                  onClick={() => {
                    console.log("This is Options Array in Team: ", options);
                  }}
                >
                  This is Options Array in Team
                </button>
                <MultipleChoiceQuestions
                  thisQuestion={() => {}}
                  options={options}
                  setOptions={setOptions}
                />
              </div>
            );
          } else if (type.type === "RANGE") {
            return (
              // RANGE 타입에 해당하는 JSX 코드
              <div>
                {/*page3*/}
                <RangeBarQuestions onChange={() => {}} />
              </div>
            );
          } else if (type.type === "ESSAY") {
            return (
              // ESSAY 타입에 해당하는 JSX 코드
              <div>
                {/*page2*/}
                <SubjectiveQuestions onChange={() => {}} />
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
        <Button disabled={currentSlide === 3} onClick={handleNextClick}>
          <FontAwesomeIcon icon={faChevronRight} />
        </Button>
      </ButtonBox>
    </div>
  );
};

export default Team;
