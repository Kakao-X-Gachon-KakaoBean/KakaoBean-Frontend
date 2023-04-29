import React, { useEffect, useState } from "react";
import type { MenuProps } from "antd";
import { Button, Dropdown, InputNumber, Space, Switch } from "antd";
import {
  DropDownDiv,
  OptionDiv,
} from "@components/CreateSurveySideBar/OptionControl/MultipleOptionControl/styles";

export const MultipleOptionControl = () => {
  const [changeType, setChangeType] = useState<string>("");
  const [isMultipleAnswer, setIsMultipleAnswer] = useState<boolean>(false);
  const [multipleAnswerNumber, setMultipleAnswerNumber] = useState<number>(1);
  const changeToSubjective = () => {
    setChangeType("ESSAY");
  };
  const changeToRange = () => {
    setChangeType("RANGE");
  };

  const multipleAnswerToggle = (checked: boolean) => {
    setIsMultipleAnswer(checked);
  };

  const multipleAnswerNumberToggle = (value: number) => {
    setMultipleAnswerNumber(value);
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
          min={1}
          max={5}
          defaultValue={1}
          onChange={() => multipleAnswerNumberToggle}
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
