import React, { useEffect, useState } from "react";
import type { MenuProps } from "antd";
import { Button, Dropdown, InputNumber, Space, Switch } from "antd";
import {
  DropDownDiv,
  OptionDiv,
} from "@components/CreateSurveySideBar/OptionControl/MultipleOptionControl/styles";
import { useRecoilValue, useSetRecoilState } from "recoil";
import { selectedQuestionState } from "../../../../States/SurveyState";

export const MultipleOptionControl = () => {
  const [changeType, setChangeType] = useState<string>("");
  const [isMultipleAnswer, setIsMultipleAnswer] = useState<boolean>(false);
  const [multipleAnswerNumber, setMultipleAnswerNumber] = useState<number>(1);
  const [minimumAnswerNumber, setMinimumAnswerNumber] = useState<number>(1);
  const [maximumAnswerNumber, setMaximumAnswerNumber] = useState<number>(1);
  const selectedQuestion = useRecoilValue(selectedQuestionState);
  const setSelectedQuestion = useSetRecoilState(selectedQuestionState);

  useEffect(() => {
    if ("answers" in selectedQuestion) {
      if (typeof selectedQuestion.answers === "object") {
        if (selectedQuestion.answers !== null) {
          setMaximumAnswerNumber(Object.keys(selectedQuestion.answers).length);
        }
      }
    }
    if ("numberOfAnswerChoices" in selectedQuestion) {
      if (typeof selectedQuestion.numberOfAnswerChoices === "number") {
        setMultipleAnswerNumber(selectedQuestion.numberOfAnswerChoices);
      }
    }
  }, [selectedQuestion]);

  useEffect(() => {
    if ("numberOfAnswerChoices" in selectedQuestion) {
      const updatedQuestion = {
        ...selectedQuestion,
        numberOfAnswerChoices: multipleAnswerNumber,
      };
      setSelectedQuestion(updatedQuestion);
    }
  }, [multipleAnswerNumber]);

  const changeToSubjective = () => {
    setChangeType("ESSAY");
    console.log(
      "title" in selectedQuestion ? selectedQuestion.title : "no title"
    );
    setSelectedQuestion((prevQuestion) => ({
      ...prevQuestion,
      id: prevQuestion.id,
      type: "ESSAY",
      title: "title" in prevQuestion ? prevQuestion.title : "",
      explanation:
        "explanation" in prevQuestion ? prevQuestion.explanation : "",
      questionNumber: prevQuestion.questionNumber,
      finalQuestion: false,
      nextQuestionNumber: "0",
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

  const multipleAnswerToggle = (checked: boolean) => {
    setIsMultipleAnswer(checked);
    if (checked) {
      setMinimumAnswerNumber(2);
    } else {
      setMinimumAnswerNumber(1);
      setMultipleAnswerNumber(1);
    }
  };

  const multipleAnswerNumberToggle = (value: number | null) => {
    if (typeof value === "number") setMultipleAnswerNumber(value);
  };

  const items: MenuProps["items"] = [
    {
      key: "주관식",
      label: "주관식",
      onClick: changeToSubjective,
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
      <OptionDiv>
        다중 답안 선택&nbsp;&nbsp;
        <Switch onChange={multipleAnswerToggle} />
        <InputNumber
          min={minimumAnswerNumber}
          max={maximumAnswerNumber}
          defaultValue={1}
          value={multipleAnswerNumber}
          onChange={multipleAnswerNumberToggle}
          style={{
            marginLeft: "1rem",
            width: "3.4rem",
          }}
          disabled={!isMultipleAnswer}
        />
      </OptionDiv>
    </div>
  );
};