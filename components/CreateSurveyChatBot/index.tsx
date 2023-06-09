import React, { useEffect, useState } from "react";
import {
  Card,
  ChatTitleButton,
  Circle,
  CreateQuestionBtn,
  CreateQuestionsBtnDiv,
  DialogButton,
  GreenBox,
  GuideDiv,
  QuestionDiv,
  RedBox,
  ResponsesDiv,
  Tools,
  YellowBox,
} from "@components/CreateSurveyChatBot/styles";
import { answerSet, RecommendedChatTitle, userChat } from "./type";
import { Button, Drawer, Input, Typography } from "antd";
const { Title, Paragraph, Text } = Typography;
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
    const words = message.split(" ");
    const lastThreeWords = words.slice(-3); // 마지막에서 3개의 단어 추출
    if (!lastThreeWords.some((word) => /^\d+(개|가지)$/.test(word))) {
      console.log("숫자 인식되지 않음.");
      message += " 3개.";
    }
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
    const messageList = extractedMessage.split("\n");
    // 숫자와 마침표가 맨 앞에 있는 부분 삭제
    const processedMessageList = messageList.map((message) =>
      message.replace(/^\d+\./, "")
    );
    const wrap: answerSet = {
      index: questionIndex,
      answer: [],
    };

    processedMessageList.map((msg, index) => {
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
        width="35%"
        title="AI로 질문 추천 받기"
        placement="right"
        onClose={closeDrawer}
        open={openDrawer}
        style={{
          borderTopLeftRadius: "2.5rem",
        }}
      >
        {/*<Button onClick={logPrint}>데이터 확인 </Button>*/}
        <Card>
          <Tools>
            <Circle>
              <RedBox />
            </Circle>
            <Circle>
              <YellowBox />
            </Circle>
            <Circle>
              <GreenBox />
            </Circle>
          </Tools>
          <GuideDiv>
            <Title level={4}>AI에게 설문 질문을 추천받으세요!</Title>
            <Text type={"success"} strong>
              [질문 주제]에 관련된 질문 [n]개 추천해줘
            </Text>
            <br />
            <br />
            <Text disabled>
              양식에 맞게 작성하실수록,
              <br />더 정확한 답을 얻을 수 있습니다.
            </Text>
          </GuideDiv>
        </Card>
        {/*---------------채팅 입력칸--------------- */}
        <Title level={4}>질문 입력란</Title>
        <div style={{ display: "flex", flexDirection: "row" }}>
          <Input
            placeholder={"ex) 컴퓨터에 관련된 질문 3개 추천해줘"}
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
        {!isLoading ||
        (isLoading && userQuestion && userQuestion.length !== 0) ? (
          userQuestion
            ?.map((question, index) => {
              const titleSetItem = titleSet[index];
              if (!titleSetItem) return null; // titleSetItem이 undefined인 경우 건너뜁니다.
              return (
                <div
                  key={index}
                  style={{ display: "flex", flexDirection: "column" }}
                >
                  <ResponsesDiv>
                    {titleSet[index].answer.map((item, answerIndex) => {
                      if (answerIndex == 0 || answerIndex == 1) return null;
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
                      <CreateQuestionBtn
                        onClick={() => SubmitQuestion(index)}
                        loading={submitBtnLoadings[0]}
                      >
                        질문 생성하기
                      </CreateQuestionBtn>
                    </CreateQuestionsBtnDiv>
                  </ResponsesDiv>
                  <QuestionDiv key={index}>
                    <h3>{question.message}</h3>
                  </QuestionDiv>
                </div>
              );
            })
            .reverse()
        ) : (
          <></>
        )}
      </Drawer>
    </div>
  );
};
export default CreateSurveyChatBot;
