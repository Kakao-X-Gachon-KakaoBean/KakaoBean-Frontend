import React, { useState } from "react";
import { SubjectiveQuestion } from "../../../../States/UserState";
import { Input } from "antd";
import {
  ExplainInput,
  SubjectiveInput,
  TitleInput,
} from "@components/CreateSurveyDnd/QuestionItems/SubjectiveQuestions/styles";
import { useRecoilState, useResetRecoilState } from "recoil";
import { RangeState, SubjectState } from "../../../../States/SurveyState";

export const SubjectiveQuestions = () => {
  // const [subjectiveQuestions, setSubjectiveQuestions] =
  //   useState<SubjectiveQuestion>({
  //     type: "ESSAY",
  //     title: "",
  //     explanation: "",
  //     questionNumber: "",
  //     finalQuestion: false,
  //     nextQuestionNumber: "",
  //   });

  const [subjectiveQuestions, setSubjectiveQuestions] =
    useRecoilState(SubjectState);
  const resetList = useResetRecoilState(SubjectState);
  console.log(subjectiveQuestions);
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
      <button onClick={resetList}>리셋하기</button>
    </div>
  );
};
