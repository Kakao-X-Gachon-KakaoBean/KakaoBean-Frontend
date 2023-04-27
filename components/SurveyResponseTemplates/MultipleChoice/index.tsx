import React, { useEffect, useState } from "react";
import { MultipleQuestion } from "@components/SurveyResponseTemplates/MultipleChoice/type";
import {
  MultipleQuestionDiv,
  Title,
  Explanation,
  Choice,
} from "@components/SurveyResponseTemplates/MultipleChoice/styles";

interface subProps {
  id: string;
  onChange: (updatedQuestion: MultipleQuestion) => void;
}
export const MultipleChoiceQuestions = (props: subProps) => {
  const [multipleQuestion] = useState<MultipleQuestion>({
    id: props.id,
    type: "MULTIPLE",
    title: "Test Title",
    explanation: "Test Explanation",
    questionNumber: "n",
    finalQuestion: false,
    nextQuestionNumber: "n",
    numberOfAnswerChoices: 0,
    answers: ["first", "second", "third", "forth", "fifth"],
    logics: [],
  });

  return (
    <div style={{ padding: "40px" }}>
      <Title>{multipleQuestion.title}</Title>
      <Explanation>{multipleQuestion.explanation}</Explanation>
      {multipleQuestion.answers.map((question, index) => (
        <MultipleQuestionDiv key={index}>
          <Choice>{question}</Choice>
        </MultipleQuestionDiv>
      ))}
    </div>
  );
};
