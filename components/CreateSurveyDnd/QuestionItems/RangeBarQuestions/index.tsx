import React, { useState } from "react";
import { RangeBarQuestion } from "../../../../States/UserState";
import { Input, InputNumber, Slider } from "antd";
import {
  ExplainInput,
  MinMaxRange,
  TitleInput,
} from "@components/CreateSurveyDnd/QuestionItems/RangeBarQuestions/styles";

export const RangeBarQuestions = () => {
  const [rangeBarQuestions, setRangeBarQuestions] = useState<RangeBarQuestion>({
    type: "RANGE",
    title: "",
    explanation: "",
    questionNumber: "",
    value: 0,
    min: 0,
    max: 5,
  });

  const handleTitleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setRangeBarQuestions({
      ...rangeBarQuestions,
      title: event.target.value,
    });
  };
  const handleExplainChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setRangeBarQuestions({
      ...rangeBarQuestions,
      explanation: event.target.value,
    });
  };
  const handleRangeChange = (newValue: number) => {
    setRangeBarQuestions({
      ...rangeBarQuestions,
      value: newValue,
    });
  };
  const handleMinChange = (value: number | null) => {
    if (value != null) {
      setRangeBarQuestions({
        ...rangeBarQuestions,
        min: value,
      });
    }
  };

  const handleMaxChange = (value: number | null) => {
    if (value != null) {
      setRangeBarQuestions({
        ...rangeBarQuestions,
        max: value,
      });
    }
  };

  return (
    <div style={{ padding: "40px" }}>
      <Input
        value={rangeBarQuestions.title}
        onChange={handleTitleChange}
        placeholder={"제목을 입력하세요"}
        style={TitleInput()}
      />
      <Input
        value={rangeBarQuestions.explanation}
        onChange={handleExplainChange}
        placeholder={"설명을 추가하세요"}
        style={ExplainInput()}
      />
      <MinMaxRange style={{ display: "flex", justifyContent: "space-between" }}>
        <InputNumber
          min={0}
          max={1000}
          value={rangeBarQuestions.min}
          onChange={(value) => {
            handleMinChange(value);
          }}
          style={{ width: "50px", borderWidth: 0 }}
        />
        <InputNumber
          min={0}
          max={1000}
          value={rangeBarQuestions.max}
          onChange={(value) => {
            handleMaxChange(value);
          }}
          style={{ width: "50px", borderWidth: 0 }}
        />
      </MinMaxRange>
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
