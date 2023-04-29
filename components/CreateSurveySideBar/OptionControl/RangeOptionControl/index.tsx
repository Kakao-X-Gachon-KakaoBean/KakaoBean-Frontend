import React, { useEffect, useState } from "react";
import type { MenuProps } from "antd";
import { Button, Dropdown, InputNumber, Space, Switch } from "antd";
import {
  DropDownDiv,
  OptionDiv,
} from "@components/CreateSurveySideBar/OptionControl/RangeOptionControl/styles";

export const RangeOptionControl = () => {
  const [changeType, setChangeType] = useState<string>("");
  const changeToMultiple = () => {
    setChangeType("MULTIPLE");
  };
  const changeToSubjective = () => {
    setChangeType("ESSAY");
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
          최소&nbsp;&nbsp; <InputNumber />
        </div>
        <div
          style={{ display: "flex", alignItems: "center", marginTop: "1rem" }}
        >
          최대&nbsp;&nbsp; <InputNumber />
        </div>
      </OptionDiv>
    </div>
  );
};
