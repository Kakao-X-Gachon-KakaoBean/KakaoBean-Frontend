import React, { useEffect, useState } from "react";
import {
  ChatTitleButton,
  CreateQuestionsBtnDiv,
  DialogButton,
  ResponsesDiv,
} from "@components/CreateSurveyChatBot/styles";
import { answerSet, RecommendedChatTitle, userChat } from "./type";
import { Button, Drawer, Input } from "antd";
import { useRecoilState } from "recoil";
import {
  countState,
  createSurveyOptionState,
  questionsState,
} from "../../States/SurveyState";
import { Client, Message, StompSubscription } from "@stomp/stompjs";

const CreateSurveyChatBot = (): JSX.Element => {
  const [openDrawer, setOpenDrawer] = useState(false);
  const [viewLogic, setViewLogic] = useRecoilState(createSurveyOptionState);
  const [countQuestion, setCountQuestion] = useRecoilState(countState);
  const [surveyQuestions, setSurveyQuestions] = useRecoilState(questionsState);
  const [isSubmitted, setIsSubmitted] = useState(false);
  const [findBtnLoadings, setFindBtnLoadings] = useState<boolean[]>([]);
  const [submitBtnLoadings, setSubmitBtnLoadings] = useState<boolean[]>([]);
  const [isLoading, setLoading] = useState<boolean>(false);

  //질문들
  const [userQuestion, setUserQuestion] = useState<userChat[]>([]);
  //대답들
  const [titleSet, setTitleSet] = useState<answerSet[]>([]);

  //몇번째 질문인가? index
  const [questionIndex, setQuestionIndex] = useState<number>(0);

  //설정
  const [client, setClient] = useState<Client>();

  //연결
  const connect = (): void => {
    const stompClient = new Client();
    stompClient.configure({
      brokerURL: "ws://localhost:8080/ws",
      onConnect: () => {
        stompClient.subscribe("/topic/public", handleMessage);
        console.log("연결성공");
      },
      onStompError: () => {
        console.log("Error");
      },
    });
    setClient(stompClient);
    stompClient.activate();
  };

  //보내자
  const sendMsg = (message: string) => {
    if (!client) return; // 클라이언트가 아직 초기화되지 않은 경우 무시
    const question = {
      question: message,
    };
    client.publish({
      destination: "/app/chat-gpt/question",
      body: JSON.stringify(question),
    });
    console.log("메세지 전송");
  };

  //끄자
  const deactivate = (): void => {
    if (!client) return; // 클라이언트가 아직 초기화되지 않은 경우 무시
    client.deactivate();
  };

  //메세지 핸들링
  let counter = 0;
  const handleMessage = (message: Message) => {
    const chatMessage = JSON.parse(message.body);
    console.log("메세지 수신");

    // 받은 메시지 처리 로직 작성
    //   TODO: 들어온 데이터를 가공해서 recommendedChatTitle 형식으로 바꾸기

    const extractedMessage: string = chatMessage.content.replace(/\[|\]/g, "");
    const messageList = extractedMessage.split(".");
    const wrap: answerSet = {
      index: questionIndex,
      answer: [],
    };

    messageList.map((msg, index) => {
      const newMessage: RecommendedChatTitle = {
        id: index + counter,
        title: msg,
        checked: false,
      };
      wrap.answer.push(newMessage);
      console.log("데이터 처리 결과", wrap);
    });
    console.log("data received");
    setTitleSet((prevState) => {
      return [...prevState, wrap];
    });
    setQuestionIndex((prevState) => {
      return prevState + 1;
    });
    counter = counter + 5;
    setLoading(false);
  };

  //stomp서버 연결
  useEffect(() => {
    connect();

    return () => {
      deactivate();
    };
  }, []);

  /////////////////////////////////여기까지가 기본 세팅///////////////////////////////////
  useEffect(() => {
    console.log("titleSet is changed:", titleSet);
  }, [titleSet]);

  useEffect(() => {
    console.log("userQuestion is changed:", userQuestion);
  }, [userQuestion]);

  const FindQuestion = () => {
    setLoading(true);
    console.log("메세지 전송 전");
    sendMsg(input);
    //버튼 빙글빙글 바꿔주기
    enterFindLoading(0);

    //유저의 질문을 넣고
    setUserQuestion((prevState) => {
      const newQuestion: userChat = {
        index: questionIndex,
        message: input,
      };
      return [...prevState, newQuestion];
    });
  };

  const handleChatTitleClick = (questionIndex: number, index: number) => {
    setTitleSet((prevState) => {
      const updatedSet = [...prevState];
      updatedSet[questionIndex].answer[index].checked =
        !updatedSet[questionIndex].answer[index].checked;
      return updatedSet;
    });
  };

  const enterFindLoading = (index: number) => {
    setFindBtnLoadings((prevLoadings) => {
      const newLoadings = [...prevLoadings];
      newLoadings[index] = isLoading;
      return newLoadings;
    });
  };
  useEffect(() => {
    enterFindLoading(0);
  }, [isLoading]);

  const SubmitQuestion = (index: number) => {
    enterSubmitLoading(index);
  };

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
    }, 1000);
  };

  const showDrawer = () => {
    setOpenDrawer(true);
  };

  const closeDrawer = () => {
    // Drawer 닫을 시 초기화
    deactivate();
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
        style={{
          borderTopLeftRadius: "2.5rem",
          borderBottomLeftRadius: "2.5rem",
        }}
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
        {!isLoading ? (
          userQuestion
            .map((question, index) => {
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
            })
            .reverse()
        ) : (
          <div>로딩 중입니다.</div>
        )}
      </Drawer>
    </div>
  );
};
export default CreateSurveyChatBot;
