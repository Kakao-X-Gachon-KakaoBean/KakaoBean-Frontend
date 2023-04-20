import React, { useState } from "react";
import { MultipleQuestion } from "../../../../States/UserState";
import { Button, Input } from "antd";
import {
  AddOption,
  DeleteOption,
  ExplainInput,
  MultipleOptionInput,
  MultipleQuestionDiv,
  TitleInput,
} from "@components/CreateSurveyDnd/QuestionItems/MultipleChoiceQuestions/styles";
import { useRecoilState, useResetRecoilState } from "recoil";
import { MultiState } from "../../../../States/SurveyState";

export const MultipleChoiceQuestions = () => {
  // const [multipleQuestion, setMultipleQuestion] = useState<MultipleQuestion>({
  //   type: "MULTIPLE",
  //   title: "",
  //   explanation: "",
  //   questionNumber: "",
  //   finalQuestion: false,
  //   numberOfAnswerChoices: 0,
  //   nextQuestionNumber: "",
  //   answers: [],
  //   logics: [],
  // });

  const [multipleQuestion, setMultipleQuestion] = useRecoilState(MultiState);
  const resetList = useResetRecoilState(MultiState);
  console.log(multipleQuestion);
  const handleTitleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setMultipleQuestion({ ...multipleQuestion, title: event.target.value });
  };

  const handleExplainChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setMultipleQuestion({
      ...multipleQuestion,
      explanation: event.target.value,
    });
  };

  const handleOptionChange = (
    event: React.ChangeEvent<HTMLInputElement>,
    optionIndex: number
  ) => {
    const newOptions = [...multipleQuestion.answers];
    newOptions[optionIndex] = event.target.value;
    setMultipleQuestion({ ...multipleQuestion, answers: newOptions });
  };

  const handleAddOption = () => {
    const newOptions = [...multipleQuestion.answers, ""];
    setMultipleQuestion({ ...multipleQuestion, answers: newOptions });
  };

  const handleDeleteOption = (optionIndex: number) => {
    const newOptions = [...multipleQuestion.answers];
    newOptions.splice(optionIndex, 1);
    setMultipleQuestion({ ...multipleQuestion, answers: newOptions });
  };

  return (
    <div style={{ padding: "40px" }}>
      <Input
        value={multipleQuestion.title}
        onChange={handleTitleChange}
        placeholder={"제목을 입력하세요"}
        style={TitleInput()}
      />
      <Input
        value={multipleQuestion.explanation}
        onChange={handleExplainChange}
        placeholder={"설명을 추가하세요"}
        style={ExplainInput()}
      />
      {multipleQuestion.answers.map((option: any, optionIndex) => (
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
      <Button onClick={resetList} style={AddOption()}>
        리셋 하기
      </Button>
    </div>
  );
};
