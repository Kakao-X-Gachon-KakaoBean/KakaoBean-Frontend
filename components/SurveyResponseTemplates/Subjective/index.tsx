import React, { useState } from "react";
import {
  SubjectiveQuestion,
  subProps,
} from "@components/SurveyResponseTemplates/Subjective/type";
import {
  Explanation,
  Subjective,
  Title,
} from "@components/SurveyResponseTemplates/Subjective/styles";

const contentStyle: React.CSSProperties = {
  height: "70vh",
  width: "100%",
  color: "#fff",
  textAlign: "center",
  background: "#364d79",
  display: "flex",
  flexDirection: "column",
  justifyContent: "center",
  alignItems: "center",
};

export const SubjectiveQuestions = (props: subProps) => {
  const [subjectiveQuestions] = useState<SubjectiveQuestion>({
    type: props.thisQuestion.type,
    questionId: props.thisQuestion.questionId,
    title: props.thisQuestion.title,
    explanation: props.thisQuestion.explanation,
    questionNumber: props.thisQuestion.questionNumber,
    finalQuestion: props.thisQuestion.finalQuestion,
    nextQuestionNumber: props.thisQuestion.nextQuestionNumber,
  });

  return (
    <div style={contentStyle}>
      <Title>{subjectiveQuestions.title}</Title>
      <Explanation>{subjectiveQuestions.explanation}</Explanation>
      <Subjective />
    </div>
  );
};
