import React, { useState } from "react";
import {
  MultipleQuestion,
  subProps,
} from "@components/SurveyResponseTemplates/MultipleChoice/type";
import {
  MultipleQuestionDiv,
  Title,
  Explanation,
  ChoiceBtn,
  QuestionBox,
} from "@components/SurveyResponseTemplates/MultipleChoice/styles";

export const MultipleChoiceQuestions = (props: subProps) => {
  const [question] = useState<MultipleQuestion>({
    questionId: props.thisQuestion.questionId,
    type: props.thisQuestion.type,
    title: props.thisQuestion.title,
    explanation: props.thisQuestion.explanation,
    finalQuestion: props.thisQuestion.finalQuestion,
    nextQuestionNumber: props.thisQuestion.nextQuestionNumber,
    questionNumber: props.thisQuestion.questionNumber,
    numberOfAnswerChoices: props.thisQuestion.numberOfAnswerChoices,
    answers: props.thisQuestion.answers,
    logics: props.thisQuestion.logics,
  });

  const [checkboxData, setCheckboxData] = useState(
    question.answers.map(() => ({ checked: false }))
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
      <Title>{question.title}</Title>
      <Explanation>{question.explanation}</Explanation>
      {question.answers.map((question, index) => (
        <MultipleQuestionDiv key={index}>
          <ChoiceBtn
            checked={checkboxData[index].checked}
            onClick={() => handleCheckboxChange(index)}
          >
            {index + 1}. {question.content}
          </ChoiceBtn>
        </MultipleQuestionDiv>
      ))}
      <button onClick={() => console.log("real data: ", checkboxData)}>
        check real data here
      </button>
    </QuestionBox>
  );
};
