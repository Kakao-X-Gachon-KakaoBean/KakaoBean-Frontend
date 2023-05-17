import React, { useState, useEffect } from "react";
import { Button, Menu } from "antd";
import type { MenuProps } from "antd";
import {
  ContentDiv,
  MenuDiv,
  OptionDiv,
} from "@components/CreateSurveySideBar/styles";
import { useRecoilState, useResetRecoilState } from "recoil";
import {
  createSurveyOptionState,
  selectedQuestionState,
} from "../../States/SurveyState";
import { OptionControl } from "@components/CreateSurveySideBar/OptionControl";
import { LogicControl } from "@components/CreateSurveySideBar/LogicControl";

const CreateSurveySideBar = (): JSX.Element => {
  const [optionState, setOptionState] = useRecoilState(createSurveyOptionState);
  const resetSelectedQuestionState = useResetRecoilState(selectedQuestionState);

  const onClick: MenuProps["onClick"] = (e) => {
    console.log("click ", e);
    setOptionState(e.key);
    resetSelectedQuestionState();
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
    <OptionDiv>
      <MenuDiv>
        <Menu
          onClick={onClick}
          selectedKeys={[optionState]}
          mode="horizontal"
          items={items}
          style={{ flex: "auto", marginTop: "-10%" }}
        />
      </MenuDiv>
      <ContentDiv>
        {optionState == "option" ? <OptionControl /> : <LogicControl />}
      </ContentDiv>
    </OptionDiv>
  );
};

export default CreateSurveySideBar;
