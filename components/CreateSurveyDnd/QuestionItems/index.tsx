import React, { useState } from "react";
import { Input, Button, Slider } from "antd";
import {
  AddOption,
  DeleteOption,
  MinMaxRange,
  MultipleOptionInput,
  MultipleQuestionDiv,
  SubjectiveInput,
  TitleInput,
} from "@components/CreateSurveyDnd/QuestionItems/styles";
import {
  MultipleQuestion,
  RangeBarQuestion,
  SubjectiveQuestion,
} from "../../../States/UserState";

export const multipleChoiceQuestion = () => {
  const [multipleQuestion, setMultipleQuestion] = useState<MultipleQuestion>({
    title: "",
    options: [""],
  });
  const handleTitleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setMultipleQuestion({ ...multipleQuestion, title: event.target.value });
  };

  const handleOptionChange = (
    event: React.ChangeEvent<HTMLInputElement>,
    optionIndex: number
  ) => {
    const newOptions = [...multipleQuestion.options];
    newOptions[optionIndex] = event.target.value;
    setMultipleQuestion({ ...multipleQuestion, options: newOptions });
  };

  const handleAddOption = () => {
    const newOptions = [...multipleQuestion.options, ""];
    setMultipleQuestion({ ...multipleQuestion, options: newOptions });
  };

  const handleDeleteOption = (optionIndex: number) => {
    const newOptions = [...multipleQuestion.options];
    newOptions.splice(optionIndex, 1);
    setMultipleQuestion({ ...multipleQuestion, options: newOptions });
  };

  return (
    <div style={{ padding: "40px" }}>
      <Input
        value={multipleQuestion.title}
        onChange={handleTitleChange}
        placeholder={"제목을 입력하세요"}
        style={TitleInput()}
      />
      {multipleQuestion.options.map((option, optionIndex) => (
        <MultipleQuestionDiv key={optionIndex}>
          <Input
            value={option}
            onChange={(event) => handleOptionChange(event, optionIndex)}
            style={MultipleOptionInput()}
          />
          <Button
            onClick={() => {
              handleDeleteOption(optionIndex);
            }}
            style={DeleteOption()}
          >
            X
          </Button>
        </MultipleQuestionDiv>
      ))}
      <Button onClick={handleAddOption} style={AddOption()}>
        + 옵션 추가
      </Button>
    </div>
  );
};
export const subjectiveQuestion = () => {
  const [subjectiveQuestions, setSubjectiveQuestions] =
    useState<SubjectiveQuestion>({
      title: "",
    });
  const handleTitleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setSubjectiveQuestions({
      ...subjectiveQuestions,
      title: event.target.value,
    });
  };

  return (
    <div style={{ padding: "40px" }}>
      <Input
        value={subjectiveQuestions.title}
        onChange={handleTitleChange}
        placeholder={"제목을 입력하세요"}
        style={TitleInput()}
      />
      <Input
        placeholder={"이 곳에 응답이 기록됩니다"}
        readOnly
        style={SubjectiveInput()}
      />
    </div>
  );
};

export const rangeBarQuestion = () => {
  const [rangeBarQuestions, setRangeBarQuestions] = useState<RangeBarQuestion>({
    title: "",
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
  const handleRangeChange = (newValue: number) => {
    setRangeBarQuestions({
      ...rangeBarQuestions,
      value: newValue,
    });
  };
  const handleMinChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    if (!isNaN(parseInt(event.target.value))) {
      setRangeBarQuestions({
        ...rangeBarQuestions,
        min: parseInt(event.target.value),
      });
    } else {
      alert("숫자를 입력해주세요");
    }
  };

  const handleMaxChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    if (!isNaN(parseInt(event.target.value))) {
      setRangeBarQuestions({
        ...rangeBarQuestions,
        max: parseInt(event.target.value),
      });
    } else {
      alert("숫자를 입력해주세요");
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
      <MinMaxRange style={{ display: "flex", justifyContent: "space-between" }}>
        <Input
          placeholder={"최소"}
          value={rangeBarQuestions.min}
          onChange={handleMinChange}
          style={{ width: "50px" }}
        />
        <Input
          placeholder={"최대"}
          value={rangeBarQuestions.max}
          onChange={handleMaxChange}
          style={{ width: "50px" }}
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
