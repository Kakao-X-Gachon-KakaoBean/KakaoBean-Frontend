import React, { useEffect, useRef, useState } from "react";
import HeaderBar from "@components/HeaderBar";
import { Carousel, Button } from "antd";
import { CarouselRef } from "antd/es/carousel";

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
          <h3 style={contentStyle}>1</h3>
        </div>
        <div>
          <h3 style={contentStyle}>2</h3>
        </div>
        <div>
          <h3 style={contentStyle}>3</h3>
        </div>
        <div>
          <h3 style={contentStyle}>4</h3>
        </div>
      </Carousel>
      <Button disabled={currentSlide === 0} onClick={handlePrevClick}>
        이전
      </Button>
      <Button disabled={currentSlide === 3} onClick={handleNextClick}>
        다음
      </Button>
    </div>
  );
};

export default Team;
