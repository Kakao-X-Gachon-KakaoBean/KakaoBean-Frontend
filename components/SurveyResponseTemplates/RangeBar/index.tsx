import React, { useEffect, useState } from "react";
import { RangeBarQuestion } from "@components/CreateSurveyDnd/QuestionItems/RangeBarQuestions/type";
import { Slider } from "antd";
import {
  Explanation,
  MinMaxRange,
  rangeBarStyle,
  Title,
} from "@components/SurveyResponseTemplates/RangeBar/styles";

const contentStyle: React.CSSProperties = {
  height: "70vh",
  width: "100%",
  color: "#ffffff",
  textAlign: "center",
  background: "#364d79",
  display: "flex",
  flexDirection: "column",
  justifyContent: "center",
  alignItems: "center",
};

interface subProps {
  id: string;
  onChange: (updatedQuestion: RangeBarQuestion) => void;
}
export const RangeBarQuestions = (props: subProps) => {
  const [rangeBarQuestions, setRangeBarQuestions] = useState<RangeBarQuestion>({
    id: props.id,
    type: "RANGE",
    title: "Test Rangebar Question",
    explanation: "this is a test",
    questionNumber: "",
    finalQuestion: false,
    nextQuestionNumber: "0",
    value: 0,
    min: 0,
    max: 100,
  });

  useEffect(() => {
    props.onChange(rangeBarQuestions);
  }, [rangeBarQuestions]);

  const handleChange = (newValue: number) => {
    setRangeBarQuestions({
      ...rangeBarQuestions,
      value: newValue,
    });
  };

  return (
    <div>
      <div style={contentStyle}>
        <Title>{rangeBarQuestions.title}</Title>
        <Explanation>{rangeBarQuestions.explanation}</Explanation>
        <Slider
          min={rangeBarQuestions.min}
          max={rangeBarQuestions.max}
          onChange={handleChange}
          value={rangeBarQuestions.value}
          style={rangeBarStyle}
        />
      </div>
    </div>
  );
};
