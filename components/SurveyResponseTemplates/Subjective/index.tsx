import React, { useEffect, useState } from "react";
import {
  SubjectiveQuestion,
  subProps,
} from "@components/SurveyResponseTemplates/Subjective/type";
import { Subjective } from "@components/SurveyResponseTemplates/Subjective/styles";
import {
  answer,
  answerTypes,
  answerValue,
  responseQuestionType,
} from "@pages/Team/type";
import { useRecoilState } from "recoil";
import { report, submitAll } from "@pages/Team";
import {
  Explanation,
  QuestionBox,
  Title,
} from "@components/SurveyResponseTemplates/styles";
import { SpaceBetween } from "@pages/Team/styles";

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
    setReportData((prevState) => {
      if (
        prevState.questions.some(
          (item) => item.questionId === newQuestion.questionId
        )
      ) {
        return prevState;
      } else {
        return {
          ...prevState,
          questions: [...prevState.questions, newQuestion],
        };
      }
    });
  };

  useEffect(() => {
    if (submitEssay.includes(Number(subjectiveQuestions.questionNumber) - 1)) {
      onSubmit();
      console.log("submit#", subjectiveQuestions.questionNumber);
    }
  }, [submitEssay]);

  // TODO: textArea로 바꿔서 많은 내용이 들어가도 자동으로 늘어나게 할 것.

  return (
    <QuestionBox>
      <Title>{subjectiveQuestions.title}</Title>
      <Explanation>{subjectiveQuestions.explanation}</Explanation>
      <Subjective type="text" value={inputValue} onChange={handleInputChange} />
      {/*<button onClick={() => onSubmit()}>check Recoiled Data</button>*/}
      {/*<SpaceBetween />*/}
    </QuestionBox>
  );
};
