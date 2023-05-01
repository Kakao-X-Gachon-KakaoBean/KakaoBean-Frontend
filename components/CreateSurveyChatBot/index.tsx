import React, { useCallback, useState } from "react";
import { DialogButton } from "@components/CreateSurveyChatBot/styles";
import { Button, Drawer, Input } from "antd";

const CreateSurveyChatBot = (): JSX.Element => {
  const [openDrawer, setOpenDrawer] = useState(false);
  const testButtons = [
    {
      id: 1,
      title: "어떤 용도로 컴퓨터를 사용하시나요?",
    },
    {
      id: 2,
      title: "얼마 정도의 예산을 가지고 계신가요?",
    },
    {
      id: 3,
      title: "어떤 종류의 그래픽 카드를 선호하시나요?",
    },
  ];

  const showDrawer = () => {
    console.log("Open Drawer");
    setOpenDrawer(true);
  };

  const closeDrawer = () => {
    console.log("Close Drawer");
    setOpenDrawer(false);
  };

  const CreateQuestion = () => {
    console.log("Create Survey");
    closeDrawer();
  };

  return (
    <div>
      <DialogButton onClick={showDrawer}>AI 추천</DialogButton>
      <Drawer
        title="AI로 질문 추천 받기"
        placement="right"
        onClose={closeDrawer}
        open={openDrawer}
      >
        <p>질문 입력란</p>
        <Input
          placeholder={"ex) 컴퓨터 구매에 관련된 설문 문제를 추천해주세요"}
        />
        {testButtons.map((item, index) => (
          <div style={{ marginTop: "1rem" }}>
            <Button>{item.title}</Button>
          </div>
        ))}
        <div style={{ marginTop: "1rem" }}>
          <Button type={"primary"} onClick={CreateQuestion}>
            질문 생성하기
          </Button>
        </div>
      </Drawer>
    </div>
  );
};

export default CreateSurveyChatBot;
