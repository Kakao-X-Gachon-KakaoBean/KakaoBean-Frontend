import React, { useEffect, useState } from "react";
import {
  RangeBarQuestion,
  subProps,
} from "@components/SurveyResponseTemplates/RangeBar/type";
import { Slider } from "antd";
import {
  Explanation,
  MinMaxRange,
  rangeBarStyle,
  Title,
} from "@components/SurveyResponseTemplates/RangeBar/styles";
import { useRecoilState } from "recoil";
import { report } from "@pages/Team";
import { Answer } from "@components/SurveyResponseTemplates/MultipleChoice/type";
import {
  answerTypes,
  answerValue,
  responseQuestionType,
} from "@pages/Team/type";

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

  const [value, setValue] = useState(0);

  // 각 선택지에 대한 answerValue
  const [makeData, setMakeData] = useState<answerValue>();
  // recoil reportData -> 제출 시 makeData 입력하기 위함
  const [reportData, setReportData] = useRecoilState(report);

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
    setReportData((prevState) => ({
      ...prevState,
      questions: [...prevState.questions, newQuestion],
    }));
  };

  return (
    <div>
      <div style={contentStyle}>
        <Title>{rangeBarQuestions.title}</Title>
        <Explanation>{rangeBarQuestions.explanation}</Explanation>
        <MinMaxRange
          style={{ display: "flex", justifyContent: "space-between" }}
        >
          <div style={{ width: "50px", borderWidth: 0 }}>
            {rangeBarQuestions.min}
          </div>
          <div style={{ width: "50px", borderWidth: 0 }}>
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
        {/*<button onClick={() => onSubmit()}>check Recoiled Data</button>*/}
      </div>
    </div>
  );
};
