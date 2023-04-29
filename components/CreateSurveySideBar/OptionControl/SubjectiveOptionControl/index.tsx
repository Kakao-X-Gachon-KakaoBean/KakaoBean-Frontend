import React, { useEffect, useState } from "react";
import type { MenuProps } from "antd";
import { Button, Dropdown, InputNumber, Space, Switch } from "antd";
import {
  DropDownDiv,
  OptionDiv,
} from "@components/CreateSurveySideBar/OptionControl/SubjectiveOptionControl/styles";

export const SubjectiveOptionControl = () => {
  const [changeType, setChangeType] = useState<string>("");
  const changeToMultiple = () => {
    setChangeType("MULTIPLE");
  };
  const changeToRange = () => {
    setChangeType("RANGE");
  };

  const multipleAnswerToggle = (checked: boolean) => {
    console.log("multiple answer toggle selected: ", checked);
  };

  const multipleAnswerNumberToggle = (value: number) => {
    console.log("changed: ", value);
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
