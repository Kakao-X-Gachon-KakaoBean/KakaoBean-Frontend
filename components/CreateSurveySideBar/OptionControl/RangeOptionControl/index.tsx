import React, { useEffect, useState } from "react";
import type { MenuProps } from "antd";
import { Button, Dropdown, InputNumber, Space, Switch } from "antd";
import {
  DropDownDiv,
  OptionDiv,
} from "@components/CreateSurveySideBar/OptionControl/RangeOptionControl/styles";
import { useRecoilState } from "recoil";
import { selectedQuestionState } from "../../../../States/SurveyState";

export const RangeOptionControl = () => {
  const [changeType, setChangeType] = useState<string>("");
  const [selectedQuestion, setSelectedQuestion] = useRecoilState(
    selectedQuestionState
  );
  const [minimumRange, setMinimumRange] = useState<number>(
    "min" in selectedQuestion ? selectedQuestion.min : 0
  );
  const [maximumRange, setMaximumRange] = useState<number>(
    "max" in selectedQuestion ? selectedQuestion.max : 0
  );

  const handleChangeMinRange = (value: number | null) => {
    if (typeof value === "number") {
      setMinimumRange(value);
      if ("min" in selectedQuestion) {
        const updatedQuestion = {
          ...selectedQuestion,
          min: value,
        };
        setSelectedQuestion(() => updatedQuestion);
      }
    }
  };
  const handleChangeMaxRange = (value: number | null) => {
    if (typeof value === "number") {
      setMaximumRange(value);
      if ("max" in selectedQuestion) {
        const updatedQuestion = {
          ...selectedQuestion,
          max: value,
        };
        setSelectedQuestion(() => updatedQuestion);
      }
    }
  };

  const changeToMultiple = () => {
    setChangeType("MULTIPLE");
    setSelectedQuestion((prevQuestion) => ({
      ...prevQuestion,
      id: prevQuestion.id,
      type: "MULTIPLE",
      title: "title" in prevQuestion ? prevQuestion.title : "",
      explanation:
        "explanation" in prevQuestion ? prevQuestion.explanation : "",
      questionNumber: prevQuestion.questionNumber,
      finalQuestion: false,
      nextQuestionNumber: String(Number(prevQuestion.questionNumber) + 1),
      numberOfAnswerChoices: 1,
      answers: [""],
      logics: [],
    }));
  };
  const changeToSubjective = () => {
    setChangeType("ESSAY");
    setSelectedQuestion((prevQuestion) => ({
      ...prevQuestion,
      id: prevQuestion.id,
      type: "ESSAY",
      title: "title" in prevQuestion ? prevQuestion.title : "",
      explanation:
        "explanation" in prevQuestion ? prevQuestion.explanation : "",
      questionNumber: prevQuestion.questionNumber,
      finalQuestion: false,
      nextQuestionNumber: String(Number(prevQuestion.questionNumber) + 1),
    }));
  };

  const items: MenuProps["items"] = [
    {
      key: "객관식",
      label: "객관식",
      onClick: changeToMultiple,
    },
    {
      key: "주관식",
      label: "주관식",
      onClick: changeToSubjective,
    },
  ];
  return (
    <div>
      <DropDownDiv>
        <Space direction="vertical">
          <Space wrap>
            <Dropdown menu={{ items }} placement="bottomLeft">
              <Button>질문 유형 수정</Button>
            </Dropdown>
          </Space>
        </Space>
      </DropDownDiv>
      <OptionDiv>
        <div style={{ display: "flex", alignItems: "center" }}>
          최소&nbsp;&nbsp;{" "}
          <InputNumber
            defaultValue={minimumRange}
            onChange={handleChangeMinRange}
          />
        </div>
        <div
          style={{ display: "flex", alignItems: "center", marginTop: "1rem" }}
        >
          최대&nbsp;&nbsp;{" "}
          <InputNumber
            defaultValue={maximumRange}
            onChange={handleChangeMaxRange}
          />
        </div>
      </OptionDiv>
    </div>
  );
};
