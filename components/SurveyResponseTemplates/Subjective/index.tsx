import React, { useEffect, useState } from "react";
import { SubjectiveQuestion } from "@components/CreateSurveyDnd/QuestionItems/SubjectiveQuestions/type";
import {
  Explanation,
  Subjective,
  Title,
} from "@components/SurveyResponseTemplates/Subjective/styles";

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
    <div style={{ padding: "40px" }}>
      <Title>{subjectiveQuestions.title}</Title>
      <Explanation>{subjectiveQuestions.explanation}</Explanation>
      <Subjective>hi</Subjective>
    </div>
  );
};
