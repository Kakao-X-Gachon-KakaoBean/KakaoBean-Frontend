import React, { useState, useEffect } from "react";
import { Button, Menu } from "antd";
import type { MenuProps } from "antd";
import { MenuDiv, OptionDiv } from "@components/CreateSurveySideBar/styles";
import { RecoilRoot, selector, useRecoilState } from "recoil";
import { createSurveyOptionState } from "../../States/SurveyState";
import { OptionControl } from "@components/CreateSurveySideBar/OptionControl";
import { LogicControl } from "@components/CreateSurveySideBar/LogicControl";

const CreateSurveySideBar = (): JSX.Element => {
  const [optionState, setOptionState] = useRecoilState(createSurveyOptionState);

  const onClick: MenuProps["onClick"] = (e) => {
    console.log("click ", e);
    setOptionState(e.key);
  };

  const items: MenuProps["items"] = [
    {
      label: "설정",
      key: "option",
    },
    {
      label: "로직",
      key: "logic",
    },
  ];
  return (
    <RecoilRoot>
      <OptionDiv>
        <MenuDiv>
          <Menu
            onClick={onClick}
            selectedKeys={[optionState]}
            mode="horizontal"
            items={items}
            style={{ flex: "auto" }}
          />
        </MenuDiv>
      </OptionDiv>
    </RecoilRoot>
  );
};

export default CreateSurveySideBar;
