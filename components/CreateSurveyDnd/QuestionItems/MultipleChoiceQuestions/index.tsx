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

  useEffect(() => {
    props.onChange(multipleQuestion);
  }, [multipleQuestion]);

  // 자식 컴포넌트에서 부모 컴포넌트를 수정한다면, 값을 직접 건네주지 않는 이상 초기화될 확률이 높다. 그렇기 때문에 numberOfAnswerChoices를 recoil에서 받아서 다시 정의해줘야 한다.
  useEffect(() => {
    setMultipleQuestion((prevState) => ({
      ...prevState,
      numberOfAnswerChoices: props.question.numberOfAnswerChoices,
    }));
  }, [props.question.numberOfAnswerChoices]);

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
