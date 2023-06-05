import React, { useEffect, useState } from "react";
import {
  ChatTitleButton,
  CreateQuestionsBtnDiv,
  DialogButton,
  ResponsesDiv,
} from "@components/CreateSurveyChatBot/styles";
import { allChat, RecommendedChatTitle, userChat } from "./type";
import { Button, Drawer, Input } from "antd";
import { atom, useRecoilState } from "recoil";
import {
  countState,
  createSurveyOptionState,
  questionsState,
} from "../../States/SurveyState";
import { ChatService } from "@components/CreateSurveyChatBot/chatMessage";

export const chatList = atom<RecommendedChatTitle[]>({
  key: "chat",
  default: [],
});

const chatService = new ChatService();

const CreateSurveyChatBot = (): JSX.Element => {
  const [openDrawer, setOpenDrawer] = useState(false);
  const [viewLogic, setViewLogic] = useRecoilState(createSurveyOptionState);
  const [countQuestion, setCountQuestion] = useRecoilState(countState);
  const [surveyQuestions, setSurveyQuestions] = useRecoilState(questionsState);
  const [isSubmitted, setIsSubmitted] = useState(false);
  const [findBtnLoadings, setFindBtnLoadings] = useState<boolean[]>([]);
  const [submitBtnLoadings, setSubmitBtnLoadings] = useState<boolean[]>([]);

  //뭐 들어오면 쭈욱 1~5, 6~10 이렇게 넣기
  const [chatMessages, setChatMessages] = useState<allChat[]>([]);
  //recoil recommended list
  const [recommendedChatTitles, setRecommendedChatTitles] =
    useRecoilState(chatList);

  useEffect(() => {
    chatService.connect();

    return () => {
      chatService.disconnect();
    };
  }, []);

  useEffect(() => {
    setChatMessages((prevState) => {
      return prevState.concat(recommendedChatTitles);
    });
    console.log("chat", recommendedChatTitles);
  }, [recommendedChatTitles]);

  const handleChatTitleClick = (index: number) => {
    const updatedChatTitle = [...recommendedChatTitles];
    updatedChatTitle[index].checked = !updatedChatTitle[index].checked;
    //업데이트
    setRecommendedChatTitles(updatedChatTitle);
  };

  const FindQuestion = () => {
    chatService.sendMessage(input);
    enterFindLoading(0);
    setChatMessages((prevState) => {
      const newChat: userChat = {
        message: input,
        user: "user",
      };
      return prevState.concat(newChat);
    });
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

  useEffect(() => {
    enterSubmitLoading(0);
  }, [recommendedChatTitles]);

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
      // closeDrawer();
    }, 1000);
  };

  const showDrawer = () => {
    setOpenDrawer(true);
  };

  const closeDrawer = () => {
    // Drawer 닫을 시 초기화
    setChatMessages([]);
    setIsSubmitted(false);
    setOpenDrawer(false);
  };

  useEffect(() => {
    console.log(surveyQuestions);
  }, [openDrawer]);

  const CreateQuestion = () => {
    let newCountQuestion = countQuestion - 1;
    recommendedChatTitles
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

  const [input, setInput] = useState("");
  const handleInputChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setInput(event.target.value);
  };

  return (
    <div>
      {viewLogic === "logic" ? (
        <></>
      ) : (
        <DialogButton onClick={showDrawer}>AI 추천</DialogButton>
      )}
      {/*---------------DRAWER--------------- */}
      <Drawer
        title="AI로 질문 추천 받기"
        placement="right"
        onClose={closeDrawer}
        open={openDrawer}
      >
        {/*---------------채팅 입력칸--------------- */}
        <p>질문 입력란</p>
        <div style={{ display: "flex", flexDirection: "row" }}>
          <Input
            placeholder={"ex) 컴퓨터 구매에 관련된 설문 문제를 추천해주세요"}
            style={{ marginRight: "3%" }}
            type="text"
            value={input}
            onChange={handleInputChange}
          />
          {/*---------------채팅 전송 버튼--------------- */}
          <Button
            type={"primary"}
            onClick={FindQuestion}
            loading={findBtnLoadings[0]}
          >
            전송
          </Button>
          {/*---------------채팅 박스 생성 공간--------------- */}
        </div>
        {chatMessages
          .map((message, indexOfall) => {
            //--------------------- 챗지피티에서 받아온 정보------------------------------
            if (Array.isArray(message)) {
              console.log("here i am!!!!");
              return (
                <div key={indexOfall}>
                  {/*---------------추천된 설문 박스--------------- */}
                  <ResponsesDiv>
                    {/*---------------설문 버튼 여러개 생성 map--------------- */}
                    {message.map((item, indexOfGptMessage) => (
                      <div
                        style={{ marginTop: "1rem" }}
                        key={indexOfGptMessage}
                      >
                        {/*---------------설문 제목 별 버튼--------------- */}
                        <ChatTitleButton
                          type={item.checked ? "primary" : "default"}
                          onClick={() =>
                            handleChatTitleClick(indexOfGptMessage)
                          }
                        >
                          {item.title}
                        </ChatTitleButton>
                        {/*---------------설문 제목 별 버튼--------------- */}
                      </div>
                    ))}
                    {/*---------------설문 버튼 여러개 생성 map--------------- */}

                    {/*---------------설문 생성 버튼--------------- */}
                    <CreateQuestionsBtnDiv>
                      <Button
                        type={"primary"}
                        onClick={SubmitQuestion}
                        loading={submitBtnLoadings[0]}
                      >
                        질문 생성하기
                      </Button>
                    </CreateQuestionsBtnDiv>
                    {/*---------------설문 생성 버튼--------------- */}
                  </ResponsesDiv>
                  {/*---------------추천된 설문 박스////--------------- */}
                </div>
              );
            }

            //--------------------- user 일 때 일반적인 채팅 출력-------------------------
            else {
              return (
                <ResponsesDiv>
                  <h1>{message.user}</h1>
                  <h3>{message.message}</h3>
                </ResponsesDiv>
              );
            }
          })
          .reverse()}
      </Drawer>
    </div>
  );
};

export default CreateSurveyChatBot;
