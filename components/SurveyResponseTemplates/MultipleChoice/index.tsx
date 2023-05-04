import React, { useEffect, useState } from "react";
import { useRecoilState } from "recoil";
import { report } from "@pages/Team/index";

import {
  Answer,
  MultipleQuestion,
  subProps,
} from "@components/SurveyResponseTemplates/MultipleChoice/type";
import {
  ChoiceBtn,
  Explanation,
  MultipleQuestionDiv,
  QuestionBox,
  Title,
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
  const [makeData, setMakeData] = useState<Answer[]>([]);
  const [reportData, setReportData] = useRecoilState(report);

  //버튼 클릭에 따른 바뀐 스테이트 적용
  const handleCheckboxChange = (index: number) => {
    setCheckboxData((prevState) => {
      const newState = [...prevState];
      newState[index].checked = !newState[index].checked;
      return newState;
    });
  };

  //바뀐 스테이트에 따라 해당 항목 값 저장
  useEffect(() => {
    checkboxData.map((boolean, index) => {
      if (boolean.checked) {
        setMakeData((prevState) => {
          if (!prevState.includes(question.answers[index])) {
            return [...prevState, question.answers[index]];
          } else return prevState;
        });
      } else {
        setMakeData((prevState) => {
          return prevState.filter((value) => value !== question.answers[index]);
        });
      }
    });
  }, [checkboxData]);

  //저장 값을 recoil로 넘겨주는 useEffect
  useEffect(() => {
    setReportData(makeData);
  }, [makeData]);

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
      {/*<button onClick={() => console.log("real data: ", checkboxData)}>*/}
      {/*  check real data here*/}
      {/*</button>*/}
    </QuestionBox>
  );
};
