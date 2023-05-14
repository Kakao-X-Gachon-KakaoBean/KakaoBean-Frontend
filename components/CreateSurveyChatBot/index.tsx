import React, { useCallback, useEffect, useState } from "react";
import {
  ChatTitleButton,
  CreateQuestionsBtnDiv,
  DialogButton,
  ResponsesDiv,
} from "@components/CreateSurveyChatBot/styles";
import { RecommendedChatTitle } from "./type";
import { Button, Drawer, Input } from "antd";
import { useRecoilState } from "recoil";
import {
  countState,
  createSurveyOptionState,
  questionsState,
} from "../../States/SurveyState";

const CreateSurveyChatBot = (): JSX.Element => {
  const [openDrawer, setOpenDrawer] = useState(false);
  const [viewLogic, setViewLogic] = useRecoilState(createSurveyOptionState);
  const [countQuestion, setCountQuestion] = useRecoilState(countState);
  const [surveyQuestions, setSurveyQuestions] = useRecoilState(questionsState);
  const [isSubmitted, setIsSubmitted] = useState(false);
  const [findBtnLoadings, setFindBtnLoadings] = useState<boolean[]>([]);
  const [submitBtnLoadings, setSubmitBtnLoadings] = useState<boolean[]>([]);
  const [recommendedChatTitle, setRecommendedChatTitle] = useState<
    RecommendedChatTitle[]
  >([
    {
      id: 1,
      title: "어떤 용도로 컴퓨터를 사용하시나요?",
      checked: false,
    },
    {
      id: 2,
      title: "얼마 정도의 예산을 가지고 계신가요?",
      checked: false,
    },
    {
      id: 3,
      title: "어떤 종류의 그래픽 카드를 선호하시나요?",
      checked: false,
    },
    {
      id: 4,
      title: "노트북 또는 데스크탑 컴퓨터 중 어떤 것을 선호하시나요?",
      checked: false,
    },
    {
      id: 5,
      title: "어떤 운영체제를 사용하고 싶으신가요?",
      checked: false,
    },
  ]);

  const FindQuestion = () => {
    enterFindLoading(0);
  };

  const enterFindLoading = (index: number) => {
    setFindBtnLoadings((prevLoadings) => {
      const newLoadings = [...prevLoadings];
      newLoadings[index] = true;
      return newLoadings;
    });

    setTimeout(() => {
      setFindBtnLoadings((prevLoadings) => {
        const newLoadings = [...prevLoadings];
        newLoadings[index] = false;
        setIsSubmitted(true);
        return newLoadings;
      });
    }, 1000);
  };

  const SubmitQuestion = () => {
    enterSubmitLoading(0);
  };

  const enterSubmitLoading = (index: number) => {
    CreateQuestion();

    setSubmitBtnLoadings((prevLoadings) => {
      const newLoadings = [...prevLoadings];
      newLoadings[index] = true;
      return newLoadings;
    });

    setTimeout(() => {
      setSubmitBtnLoadings((prevLoadings) => {
        const newLoadings = [...prevLoadings];
        newLoadings[index] = false;
        return newLoadings;
      });
      closeDrawer();
    }, 1000);
  };

  const handleChatTitleClick = (index: number) => {
    const updatedChatTitle = [...recommendedChatTitle];
    updatedChatTitle[index].checked = !updatedChatTitle[index].checked;
    setRecommendedChatTitle(updatedChatTitle);
  };

  const showDrawer = () => {
    setOpenDrawer(true);
  };

  const closeDrawer = () => {
    // Drawer 닫을 시 초기화
    setRecommendedChatTitle([]);
    setIsSubmitted(false);
    setOpenDrawer(false);
  };

  useEffect(() => {
    console.log(surveyQuestions);
  }, [openDrawer]);

  const CreateQuestion = () => {
    let newCountQuestion = countQuestion - 1;
    recommendedChatTitle
      .filter((item) => item.checked)
      .forEach((item) => {
        newCountQuestion += 1;
        const addMultiple = {
          id: `KEA-KakaoBeans-${newCountQuestion}`,
          type: "MULTIPLE",
          title: item.title,
          explanation: "",
          questionNumber: newCountQuestion.toString(),
          finalQuestion: false,
          nextQuestionNumber: (newCountQuestion + 1).toString(),
          numberOfAnswerChoices: 1,
          answers: [""],
          logics: [],
        };
        console.log("추가되는 질문들: ", addMultiple);
        setCountQuestion(newCountQuestion + 1);
        setSurveyQuestions((prevQuestions) => [...prevQuestions, addMultiple]);
      });
  };

  return (
    <div>
      {viewLogic === "logic" ? (
        <></>
      ) : (
        <DialogButton onClick={showDrawer}>AI 추천</DialogButton>
      )}

      <Drawer
        title="AI로 질문 추천 받기"
        placement="right"
        onClose={closeDrawer}
        open={openDrawer}
      >
        <p>질문 입력란</p>
        <div style={{ display: "flex", flexDirection: "row" }}>
          <Input
            placeholder={"ex) 컴퓨터 구매에 관련된 설문 문제를 추천해주세요"}
            style={{ marginRight: "3%" }}
          />
          <Button
            type={"primary"}
            onClick={FindQuestion}
            loading={findBtnLoadings[0]}
          >
            제출
          </Button>
        </div>
        {isSubmitted ? (
          <div>
            <ResponsesDiv>
              {recommendedChatTitle.map((item, index) => (
                <div style={{ marginTop: "1rem" }} key={index}>
                  <ChatTitleButton
                    type={item.checked ? "primary" : "default"}
                    onClick={() => handleChatTitleClick(index)}
                  >
                    {item.title}
                  </ChatTitleButton>
                </div>
              ))}
            </ResponsesDiv>
            <CreateQuestionsBtnDiv>
              <Button
                type={"primary"}
                onClick={SubmitQuestion}
                loading={submitBtnLoadings[0]}
              >
                질문 생성하기
              </Button>
            </CreateQuestionsBtnDiv>
          </div>
        ) : (
          <div></div>
        )}
      </Drawer>
    </div>
  );
};

export default CreateSurveyChatBot;
