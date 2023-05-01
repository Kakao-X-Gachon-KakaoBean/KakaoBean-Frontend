import React, { useEffect, useState } from "react";
import type { MenuProps } from "antd";
import { Button, Dropdown, InputNumber, Space, Switch } from "antd";
import {
  DropDownDiv,
  OptionDiv,
} from "@components/CreateSurveySideBar/OptionControl/SubjectiveOptionControl/styles";
import { useRecoilState } from "recoil";
import { selectedQuestionState } from "../../../../States/SurveyState";

export const SubjectiveOptionControl = () => {
  const [changeType, setChangeType] = useState<string>("");
  const [selectedQuestion, setSelectedQuestion] = useRecoilState(
    selectedQuestionState
  );
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
      nextQuestionNumber: "0",
      numberOfAnswerChoices: 1,
      answers: [""],
      logics: [],
    }));
  };
  const changeToRange = () => {
    setChangeType("RANGE");
    setSelectedQuestion((prevQuestion) => ({
      ...prevQuestion,
      id: prevQuestion.id,
      type: "RANGE",
      title: "title" in prevQuestion ? prevQuestion.title : "",
      explanation:
        "explanation" in prevQuestion ? prevQuestion.explanation : "",
      questionNumber: prevQuestion.questionNumber,
      finalQuestion: false,
      nextQuestionNumber: "0",
      value: 0,
      min: 0,
      max: 5,
    }));
  };

  const items: MenuProps["items"] = [
    {
      key: "객관식",
      label: "객관식",
      onClick: changeToMultiple,
    },
    {
      key: "선형배율",
      label: "선형배율",
      onClick: changeToRange,
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
    </div>
  );
};
