import React, { useEffect, useState } from "react";
import {
  ChatTitleButton,
  CreateQuestionsBtnDiv,
  DialogButton,
  ResponsesDiv,
} from "@components/CreateSurveyChatBot/styles";
import { answerSet, RecommendedChatTitle, userChat } from "./type";
import { Button, Drawer, Input } from "antd";
import { atom, useRecoilState } from "recoil";
import {
  countState,
  createSurveyOptionState,
  questionsState,
} from "../../States/SurveyState";
import { ChatService } from "@components/CreateSurveyChatBot/chatMessage";

const chatService = new ChatService();

const CreateSurveyChatBot = (): JSX.Element => {
  const [openDrawer, setOpenDrawer] = useState(false);
  const [viewLogic, setViewLogic] = useRecoilState(createSurveyOptionState);
  const [countQuestion, setCountQuestion] = useRecoilState(countState);
  const [surveyQuestions, setSurveyQuestions] = useRecoilState(questionsState);
  const [isSubmitted, setIsSubmitted] = useState(false);
  const [findBtnLoadings, setFindBtnLoadings] = useState<boolean[]>([]);
  const [submitBtnLoadings, setSubmitBtnLoadings] = useState<boolean[]>([]);

  // //전체 매세지들
  // const [chatMessages, setChatMessages] = useState<allChat[]>([]);

  //질문들
  const [userQuestion, setUserQuestion] = useState<userChat[]>([]);
  //대답들
  const [titleSet, setTitleSet] = useState<answerSet[]>([]);

  //몇번째 질문인가? index
  const [questionIndex, setQuestionIndex] = useState<number>(1);

  //stomp서버 연결
  useEffect(() => {
    chatService.connect();

    return () => {
      chatService.disconnect();
    };
  }, []);

  ///////////////////////////////////여기까지가 기본 세팅///////////////////////////////////

  const FindQuestion = () => {
    chatService.sendMessage(input);
    //버튼 빙글빙글 바꿔주기
    enterFindLoading(0);

    setTimeout(() => {
      //유저의 질문을 넣고
      setUserQuestion((prevState) => {
        const newQuestion: userChat = {
          index: questionIndex,
          message: input,
        };
        return [...prevState, newQuestion];
      });
      //대답을 넣자
      setTitleSet((preState) => {
        const newTitles = chatService.getMessage;
        const newSet: answerSet = {
          index: questionIndex,
          answer: newTitles,
        };
        return [...preState, newSet];
      });
      //index 올려주자
      setQuestionIndex((prevState) => {
        return prevState + 1;
      });
    }, 1000);
  };

  const handleChatTitleClick = (qindex: number, index: number) => {
    const updatedSet = titleSet;
    updatedSet[qindex].answer[index].checked =
      !updatedSet[qindex].answer[index].checked;
    //업데이트 TODO:
    setTitleSet(updatedSet);
  };

  const enterFindLoading = (index: number) => {
    setFindBtnLoadings((prevLoadings) => {
      const newLoadings = [...prevLoadings];
      newLoadings[index] = true;
      return newLoadings;
    });
    // 타임아웃 1초 뒤 state change
    setTimeout(() => {
      setFindBtnLoadings((prevLoadings) => {
        const newLoadings = [...prevLoadings];
        newLoadings[index] = false;
        setIsSubmitted(true);
        return newLoadings;
      });
    }, 1000);
  };

  const SubmitQuestion = (index: number) => {
    enterSubmitLoading(index);
  };

  // useEffect(() => {
  //   enterSubmitLoading(0);
  // }, [titleSet]);

  const enterSubmitLoading = (index: number) => {
    CreateQuestion(index);

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
    chatService.connect();
  };

  const closeDrawer = () => {
    // Drawer 닫을 시 초기화
    chatService.disconnect();
    setTitleSet([]);
    setQuestionIndex(1);
    setUserQuestion([]);
    setIsSubmitted(false);
    setOpenDrawer(false);
  };

  useEffect(() => {
    console.log("창 열리면", surveyQuestions);
  }, [openDrawer]);

  const CreateQuestion = (index: number) => {
    let newCountQuestion = countQuestion - 1;
    titleSet[index].answer
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

  const logPrint = () => {
    console.log("userQuestion: ", userQuestion);
    console.log("titleSet: ", titleSet);
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
        <Button onClick={logPrint}>데이터 확인 </Button>
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

        {userQuestion
          .map((question, index) => {
            if (titleSet[index]?.answer?.length > 0) {
              return (
                <div>
                  <ResponsesDiv>
                    {titleSet[index].answer.map((item, answerIndex) => {
                      return (
                        <div style={{ marginTop: "1rem" }} key={answerIndex}>
                          {/*---------------설문 제목 별 버튼--------------- */}
                          <ChatTitleButton
                            type={item.checked ? "primary" : "default"}
                            onClick={() =>
                              handleChatTitleClick(index, answerIndex)
                            }
                          >
                            {item.title}
                          </ChatTitleButton>
                        </div>
                      );
                    })}
                    {/*---------------설문 생성 버튼--------------- */}
                    <CreateQuestionsBtnDiv>
                      <Button
                        type={"primary"}
                        onClick={() => SubmitQuestion(index)}
                        loading={submitBtnLoadings[0]}
                      >
                        질문 생성하기
                      </Button>
                    </CreateQuestionsBtnDiv>
                  </ResponsesDiv>
                  <ResponsesDiv key={index}>
                    <h1>User</h1>
                    <h3>{question.message}</h3>
                  </ResponsesDiv>
                </div>
              );
            } else {
              <></>;
            }
          })
          .reverse()}
      </Drawer>
    </div>
  );
};
export default CreateSurveyChatBot;
