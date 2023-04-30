import React, { useEffect, useState } from "react";
import { SubjectiveQuestion } from "@components/CreateSurveyDnd/QuestionItems/SubjectiveQuestions/type";
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

interface subProps {
  id: string;
  onChange: (updatedQuestion: SubjectiveQuestion) => void;
}
export const SubjectiveQuestions = (props: subProps) => {
  const [subjectiveQuestions, setSubjectiveQuestions] =
    useState<SubjectiveQuestion>({
      id: props.id,
      type: "ESSAY",
      title: "Test Subjective Title",
      explanation: "this is subjective",
      questionNumber: "",
      finalQuestion: false,
      nextQuestionNumber: "0",
    });

  return (
    <div style={contentStyle}>
      <Title>{subjectiveQuestions.title}</Title>
      <Explanation>{subjectiveQuestions.explanation}</Explanation>
      <Subjective />
    </div>
  );
};
