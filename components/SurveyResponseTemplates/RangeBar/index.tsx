import React, { useState } from "react";
import {
  RangeBarQuestion,
  subProps,
} from "@components/SurveyResponseTemplates/RangeBar/type";
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

export const RangeBarQuestions = (props: subProps) => {
  const [rangeBarQuestions] = useState<RangeBarQuestion>({
    type: props.thisQuestion.type,
    questionId: props.thisQuestion.questionId,
    title: props.thisQuestion.title,
    explanation: props.thisQuestion.explanation,
    questionNumber: props.thisQuestion.questionNumber,
    finalQuestion: props.thisQuestion.finalQuestion,
    nextQuestionNumber: props.thisQuestion.nextQuestionNumber,
    min: props.thisQuestion.min,
    max: props.thisQuestion.max,
  });

  const [value, setValue] = useState(0);

  const handleChange = (newValue: number) => {
    setValue(newValue);
  };

  return (
    <div>
      <div style={contentStyle}>
        <Title>{rangeBarQuestions.title}</Title>
        <Explanation>{rangeBarQuestions.explanation}</Explanation>
        <MinMaxRange
          style={{ display: "flex", justifyContent: "space-between" }}
        >
          <div style={{ width: "50px", borderWidth: 0 }}>
            {rangeBarQuestions.min}
          </div>
          <div style={{ width: "50px", borderWidth: 0 }}>
            {rangeBarQuestions.max}
          </div>
        </MinMaxRange>
        <Slider
          min={rangeBarQuestions.min}
          max={rangeBarQuestions.max}
          onChange={handleChange}
          value={value}
          style={rangeBarStyle}
        />
      </div>
    </div>
  );
};
