import React, { useEffect, useState } from "react";
import {
  MultipleQuestion,
  Logic,
} from "@components/CreateSurveyDnd/QuestionItems/MultipleChoiceQuestions/type";
import { Button, Input } from "antd";
import {
  AddOption,
  DeleteOption,
  ExplainInput,
  MultipleOptionInput,
  MultipleQuestionDiv,
  TitleInput,
} from "@components/CreateSurveyDnd/QuestionItems/MultipleChoiceQuestions/styles";
import { useRecoilValue } from "recoil";
import { selectedQuestionState } from "../../../../States/SurveyState";

interface subProps {
  id: string;
  onChange: (updatedQuestion: MultipleQuestion) => void;
  question: {
    id: string;
    type: string;
    title: string;
    explanation: string;
    finalQuestion: boolean;
    nextQuestionNumber: string;
    questionNumber: string; // 문제 번호
    numberOfAnswerChoices: number; // 다중답안 개수
    answers: string[]; // 옵션들
    logics: Logic[];
  };
}
export const MultipleChoiceQuestions = (props: subProps) => {
  const selectedQuestion = useRecoilValue(selectedQuestionState);
  const [multipleQuestion, setMultipleQuestion] = useState<MultipleQuestion>(
    props.question
  );

  // 새로운 로직 추가 예시 코드
  // const newLogic = {
  //   conditionOfQuestionAnswers: ["yes"],
  //   nextQuestionNumber: "2",
  // };
  // const addLogic = (newLogic: LogicControl) => {
  //   setMultipleQuestion((prevMultipleQuestion) => {
  //     const updatedLogics = [...prevMultipleQuestion.logics, newLogic];
  //     return {
  //       ...prevMultipleQuestion,
  //       logics: updatedLogics,
  //     };
  //   });
  // };

  useEffect(() => {
    props.onChange(multipleQuestion);
  }, [multipleQuestion]);

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
      {multipleQuestion.answers.map((option, optionIndex) => (
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
