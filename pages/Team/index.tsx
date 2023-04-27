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

const contentStyle: React.CSSProperties = {
  height: "480px",
  color: "#fff",
  lineHeight: "480px",
  textAlign: "center",
  background: "#364d79",
};

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
  return (
    <div>
      <Carousel dotPosition={"right"} ref={carouselRef}>
        <div>
          {/*page1*/}
          <div>{MultipleChoiceQuestions}</div>
        </div>
        <div>
          {/*page2*/}
          <div>{MultipleChoiceQuestions}</div>
        </div>
        <div>
          {/*page3*/}
          <div>{MultipleChoiceQuestions}</div>
        </div>
        <div>
          {/*page4*/}
          <div>{SubjectiveQuestions}</div>
        </div>
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
