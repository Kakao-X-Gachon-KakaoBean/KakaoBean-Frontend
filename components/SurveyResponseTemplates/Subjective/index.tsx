import React, { useEffect, useState } from "react";
import {
  SubjectiveQuestion,
  subProps,
} from "@components/SurveyResponseTemplates/Subjective/type";
import {
  Explanation,
  Subjective,
  Title,
} from "@components/SurveyResponseTemplates/Subjective/styles";
import {
  answer,
  answerTypes,
  answerValue,
  responseQuestionType,
} from "@pages/Team/type";
import { useRecoilState } from "recoil";
import { report, submitAll } from "@pages/Team";

const contentStyle: React.CSSProperties = {
  height: "100vh",
  width: "100%",
  color: "black",
  textAlign: "center",
  background: "#ffffff",
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

  const [inputValue, setInputValue] = useState("");
  // 각 선택지에 대한 answerValue
  const [makeData, setMakeData] = useState<answer>();
  // recoil reportData -> 제출 시 makeData 입력하기 위함
  const [reportData, setReportData] = useRecoilState(report);
  const [submitEssay] = useRecoilState(submitAll);
  const handleInputChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setInputValue(event.target.value);
  };

  useEffect(() => {
    setMakeData(inputValue);
  }, [inputValue]);

  const onSubmit = () => {
    const newQuestion: responseQuestionType = {
      type: subjectiveQuestions.type,
      questionId: subjectiveQuestions.questionId,
      answers: makeData as answer,
    };
    setReportData((prevState) => ({
      ...prevState,
      questions: [...prevState.questions, newQuestion],
    }));
  };

  useEffect(() => {
    if (submitEssay) {
      onSubmit();
      console.log("reportData: ", reportData);
    }
  }, [submitEssay]);
  return (
    <div style={contentStyle}>
      <Title>{subjectiveQuestions.title}</Title>
      <Explanation>{subjectiveQuestions.explanation}</Explanation>
      <Subjective type="text" value={inputValue} onChange={handleInputChange} />
      {/*<button onClick={() => onSubmit()}>check Recoiled Data</button>*/}
    </div>
  );
};
