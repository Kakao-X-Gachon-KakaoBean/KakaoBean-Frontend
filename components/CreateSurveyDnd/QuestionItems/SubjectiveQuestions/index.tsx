import React, { useEffect, useState } from "react";
import { SubjectiveQuestion } from "@components/CreateSurveyDnd/QuestionItems/SubjectiveQuestions/type";
import { Button, Input } from "antd";
import {
  ExplainInput,
  SubjectiveInput,
  TitleInput,
} from "@components/CreateSurveyDnd/QuestionItems/SubjectiveQuestions/styles";

interface subProps {
  id: string;
  onChange: (updatedQuestion: SubjectiveQuestion) => void;
}
export const SubjectiveQuestions = (props: subProps) => {
  const [subjectiveQuestions, setSubjectiveQuestions] =
    useState<SubjectiveQuestion>({
      id: props.id,
      type: "ESSAY",
      title: "",
      explanation: "",
      questionNumber: "",
      finalQuestion: false,
      nextQuestionNumber: "0",
    });

  useEffect(() => {
    props.onChange(subjectiveQuestions);
  }, [subjectiveQuestions]);
  const handleTitleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setSubjectiveQuestions({
      ...subjectiveQuestions,
      title: event.target.value,
    });
  };
  const handleExplainChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setSubjectiveQuestions({
      ...subjectiveQuestions,
      explanation: event.target.value,
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
        value={subjectiveQuestions.explanation}
        onChange={handleExplainChange}
        placeholder={"설명을 추가하세요"}
        style={ExplainInput()}
      />
      <Input
        placeholder={"이 곳에 응답이 기록됩니다"}
        readOnly
        style={SubjectiveInput()}
      />
    </div>
  );
};
