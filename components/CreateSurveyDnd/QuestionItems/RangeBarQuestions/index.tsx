import React, { useEffect, useState } from "react";
import { RangeBarQuestion } from "@components/CreateSurveyDnd/QuestionItems/RangeBarQuestions/type";
import { Input, InputNumber, Slider } from "antd";
import {
  ExplainInput,
  MinMaxRange,
  TitleInput,
} from "@components/CreateSurveyDnd/QuestionItems/RangeBarQuestions/styles";

interface subProps {
  id: string;
  onChange: (updatedQuestion: RangeBarQuestion) => void;
  question: {
    id: string;
    type: string;
    title: string;
    explanation: string;
    questionNumber: string;
    finalQuestion: boolean;
    nextQuestionNumber: string;
    min: number;
    max: number;
  };
}
export const RangeBarQuestions = (props: subProps) => {
  const [rangeBarQuestions, setRangeBarQuestions] = useState<RangeBarQuestion>(
    props.question
  );

  useEffect(() => {
    props.onChange(rangeBarQuestions);
  }, [rangeBarQuestions]);

  useEffect(() => {
    setRangeBarQuestions((prevState) => ({
      ...prevState,
      min: props.question.min,
      max: props.question.max,
    }));
  }, [props.question.min, props.question.max]);

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
      props.onChange(rangeBarQuestions);
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
          disabled={true}
          min={0}
          max={1000}
          value={rangeBarQuestions.min}
          onChange={(value) => {
            handleMinChange(value);
          }}
          style={{ width: "50px", borderWidth: 0 }}
        />
        <InputNumber
          disabled={true}
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
        value={0}
      />
    </div>
  );
};
