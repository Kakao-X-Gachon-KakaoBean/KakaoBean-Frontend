import React, { useEffect, useState } from "react";
import {
  RangeBarQuestion,
  subProps,
} from "@components/SurveyResponseTemplates/RangeBar/type";
import { Slider } from "antd";
import {
  MinMaxRange,
  rangeBarStyle,
} from "@components/SurveyResponseTemplates/RangeBar/styles";
import { useRecoilState } from "recoil";
import { report, submitAll } from "@pages/Team";
import { Answer } from "@components/SurveyResponseTemplates/MultipleChoice/type";
import {
  answerTypes,
  answerValue,
  responseQuestionType,
} from "@pages/Team/type";
import { SpaceBetween } from "@pages/Team/styles";
import {
  Explanation,
  QuestionBox,
  Title,
} from "@components/SurveyResponseTemplates/styles";

export const RangeBarQuestions = (props: subProps) => {
  const [rangeBarQuestions] = useState<RangeBarQuestion>({
    type: props.thisQuestion.type,
    questionId: props.thisQuestion.questionId,
    title: props.thisQuestion.title,
    explanation: props.thisQuestion.explanation,
    questionNumber: props.thisQuestion.questionNumber,
    finalQuestion: props.thisQuestion.finalQuestion,
    nextQuestionNumber: props.thisQuestion.nextQuestionNumber,
    min: props.thisQuestion.min,
    max: props.thisQuestion.max,
  });

  const [value, setValue] = useState(rangeBarQuestions.min);

  // 각 선택지에 대한 answerValue
  const [makeData, setMakeData] = useState<answerValue>();
  // recoil reportData -> 제출 시 makeData 입력하기 위함
  const [reportData, setReportData] = useRecoilState(report);
  const [submitRange] = useRecoilState(submitAll);
  const handleChange = (newValue: number) => {
    setValue(newValue);
  };

  useEffect(() => {
    setMakeData(value);
  }, [value]);

  const onSubmit = () => {
    const newQuestion: responseQuestionType = {
      type: rangeBarQuestions.type,
      questionId: rangeBarQuestions.questionId,
      answers: makeData as answerTypes,
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
    if (submitRange.includes(Number(rangeBarQuestions.questionNumber) - 1)) {
      onSubmit();
      console.log("submit#", rangeBarQuestions.questionNumber);
    }
  }, [submitRange]);
  return (
    <QuestionBox>
      <Title>{rangeBarQuestions.title}</Title>
      <Explanation>{rangeBarQuestions.explanation}</Explanation>
      <MinMaxRange
        style={{
          display: "flex",
          justifyContent: "space-between",
          width: "50vw",
        }}
      >
        <div style={{ width: "30px", borderWidth: 0 }}>
          {rangeBarQuestions.min}
        </div>
        <div style={{ width: "30px", borderWidth: 0 }}>
          {rangeBarQuestions.max}
        </div>
      </MinMaxRange>
      <Slider
        min={rangeBarQuestions.min}
        max={rangeBarQuestions.max}
        onChange={handleChange}
        value={value}
        style={rangeBarStyle}
      />
      {/*<SpaceBetween />*/}
      {/*<button onClick={() => onSubmit()}>check Recoiled Data</button>*/}
    </QuestionBox>
  );
};
