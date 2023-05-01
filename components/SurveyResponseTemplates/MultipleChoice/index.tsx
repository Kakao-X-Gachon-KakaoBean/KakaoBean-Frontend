import React, { useEffect, useState } from "react";
import { MultipleQuestion } from "@components/SurveyResponseTemplates/MultipleChoice/type";
import {
  MultipleQuestionDiv,
  Title,
  Explanation,
  ChoiceBtn,
  QuestionBox,
} from "@components/SurveyResponseTemplates/MultipleChoice/styles";
import { Button } from "antd";

interface CheckboxProps {
  checked: boolean;
}
interface subProps {
  thisQuestion: (updatedQuestion: MultipleQuestion) => void;
  options: CheckboxProps[];
  setOptions: (newOptions: CheckboxProps[]) => void;
}

export const MultipleChoiceQuestions = (props: subProps) => {
  const [multipleQuestion] = useState<MultipleQuestion>({
    type: "MULTIPLE",
    // props.type ... 이런식으로 다 넣어야함 원랜
    title: "Test MULTIPLE Title",
    explanation: "Test Explanation",
    questionNumber: "n",
    finalQuestion: false,
    nextQuestionNumber: "n",
    numberOfAnswerChoices: 0,
    answers: ["first", "second", "third", "forth", "fifth"],
    logics: [
      {
        conditionOfQuestionAnswers: ["1", "2"],
        nextQuestionNumber: "3",
      },
      {
        conditionOfQuestionAnswers: ["3", "4"],
        nextQuestionNumber: "4",
      },
    ],
  });

  const [checkboxData, setCheckboxData] = useState(
    multipleQuestion.answers.map(() => ({ checked: false }))
  );

  const handleCheckboxChange = (index: number) => {
    setCheckboxData((prevState) => {
      const newState = [...prevState];
      newState[index].checked = !newState[index].checked;
      return newState;
    });
    props.setOptions(checkboxData);
  };

  return (
    <QuestionBox>
      <Title>{multipleQuestion.title}</Title>
      <Explanation>{multipleQuestion.explanation}</Explanation>
      {multipleQuestion.answers.map((question, index) => (
        <MultipleQuestionDiv key={index}>
          <ChoiceBtn
            checked={checkboxData[index].checked}
            onClick={() => handleCheckboxChange(index)}
          >
            {index + 1}. {question}
          </ChoiceBtn>
        </MultipleQuestionDiv>
      ))}
      <button onClick={() => console.log("real data: ", checkboxData)}>
        check real data here
      </button>
    </QuestionBox>
  );
};
