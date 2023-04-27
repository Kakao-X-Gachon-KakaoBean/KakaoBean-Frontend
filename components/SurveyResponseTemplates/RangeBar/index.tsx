import React, { useEffect, useState } from "react";
import { RangeBarQuestion } from "@components/CreateSurveyDnd/QuestionItems/RangeBarQuestions/type";
import { Input, InputNumber, Slider } from "antd";
import {
  Explanation,
  MinMaxRange,
  Title,
} from "@components/SurveyResponseTemplates/RangeBar/styles";

interface subProps {
  id: string;
  onChange: (updatedQuestion: RangeBarQuestion) => void;
}
export const RangeBarQuestions = (props: subProps) => {
  const [rangeBarQuestions] = useState<RangeBarQuestion>({
    id: props.id,
    type: "RANGE",
    title: "",
    explanation: "",
    questionNumber: "",
    finalQuestion: false,
    nextQuestionNumber: "0",
    value: 0,
    min: 0,
    max: 5,
  });

  return (
    <div style={{ padding: "40px" }}>
      <Title></Title>
      <Explanation></Explanation>
      <Slider
        min={rangeBarQuestions.min}
        max={rangeBarQuestions.max}
        onChange={handleRangeChange}
        value={
          typeof rangeBarQuestions.value === "number"
            ? rangeBarQuestions.value
            : 0
        }
      />
    </div>
  );
};
