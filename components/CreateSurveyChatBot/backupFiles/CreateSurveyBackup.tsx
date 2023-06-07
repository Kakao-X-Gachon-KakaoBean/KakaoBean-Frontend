// import React, { useEffect, useState } from "react";
// import {
//     ChatTitleButton,
//     CreateQuestionsBtnDiv,
//     DialogButton,
//     ResponsesDiv,
// } from "@components/CreateSurveyChatBot/styles";
// import { answerSet, RecommendedChatTitle, userChat } from "./type";
// import { Button, Drawer, Input } from "antd";
// import { useRecoilState } from "recoil";
// import {
//     countState,
//     createSurveyOptionState,
//     questionsState,
// } from "../../States/SurveyState";
// import { ChatService } from "@components/CreateSurveyChatBot/chatMessage";
// import { Client, Message, StompSubscription } from "@stomp/stompjs";
//
// const chatService = new ChatService();
//
// const CreateSurveyChatBot = (): JSX.Element => {
//     const [openDrawer, setOpenDrawer] = useState(false);
//     const [viewLogic, setViewLogic] = useRecoilState(createSurveyOptionState);
//     const [countQuestion, setCountQuestion] = useRecoilState(countState);
//     const [surveyQuestions, setSurveyQuestions] = useRecoilState(questionsState);
//     const [isSubmitted, setIsSubmitted] = useState(false);
//     const [findBtnLoadings, setFindBtnLoadings] = useState<boolean[]>([]);
//     const [submitBtnLoadings, setSubmitBtnLoadings] = useState<boolean[]>([]);
//
//     // //전체 매세지들
//     // const [chatMessages, setChatMessages] = useState<allChat[]>([]);
//
//     //질문들
//     const [userQuestion, setUserQuestion] = useState<userChat[]>([]);
//     //대답들
//     const [titleSet, setTitleSet] = useState<answerSet[]>([]);
//
//     //몇번째 질문인가? index
//     const [questionIndex, setQuestionIndex] = useState<number>(0);
//     ////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
//
//     //설정
//     const createStompClient = (): Client => {
//         return new Client({
//             brokerURL: "ws://localhost:8080/ws",
//             reconnectDelay: 2000,
//             heartbeatIncoming: 0,
//             heartbeatOutgoing: 20000,
//         });
//     };
//
//     //연결
//     const connect = (stompClient: Client): void => {
//         stompClient.activate();
//     };
//
//     //구독
//     const subscribeToTopic = (
//         stompClient: Client,
//         topic: string,
//         callback: (message: any) => void
//     ): StompSubscription => {
//         return stompClient.subscribe(topic, callback);
//     };
//
//     //보내자
//     const sendMsg = (stompClient: Client, topic: string, body: string): void => {
//         stompClient.publish({ destination: topic, body });
//     };
//
//     //끄자
//     const deactivate = (stompClient: Client, callback?: () => void): void => {
//         stompClient.deactivate();
//     };
//
//     //메세지 핸들링
//     let counter = 0;
//     const handleMessage = (message: Message) => {
//         const chatMessage = JSON.parse(message.body);
//
//         // 받은 메시지 처리 로직 작성
//         //   TODO: 들어온 데이터를 가공해서 recommendedChatTitle 형식으로 바꾸기
//
//         const extractedMessage: string = chatMessage.content.replace(/\[|\]/g, "");
//         const messageList = extractedMessage.split(".");
//         const wrap: answerSet = {
//             index: questionIndex,
//             answer: [],
//         };
//
//         messageList.map((msg, index) => {
//             const newMessage: RecommendedChatTitle = {
//                 id: index + counter,
//                 title: msg,
//                 checked: false,
//             };
//             wrap.answer.push(newMessage);
//             console.log("데이터 처리 결과", wrap);
//         });
//         setTitleSet((prevState) => {
//             return [...prevState, wrap];
//         });
//
//         counter = counter + 5;
//     };
//
//     ////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
//     //stomp서버 연결
//     useEffect(() => {
//         chatService.connect();
//
//         return () => {
//             chatService.disconnect();
//         };
//     }, []);
//
//     ///////////////////////////////////여기까지가 기본 세팅///////////////////////////////////
//     useEffect(() => {
//         console.log("titleSet is changed:", titleSet);
//     }, [titleSet]);
//     useEffect(() => {
//         console.log("userQuestion is changed:", userQuestion);
//     }, [userQuestion]);
//
//     useEffect(() => {
//         console.log("data received");
//         //대답을 넣자
//         setTitleSet((preState) => {
//             const newTitles = chatService.answerList;
//             const newSet: answerSet = {
//                 index: questionIndex,
//                 answer: newTitles,
//             };
//             return [...preState, newSet];
//         });
//         //index 올려주자
//         setQuestionIndex((prevState) => {
//             return prevState + 1;
//         });
//     }, [chatService.answerList]);
//
//     const FindQuestion = () => {
//         chatService.sendMessage(input);
//         //버튼 빙글빙글 바꿔주기
//         enterFindLoading(0);
//
//         //유저의 질문을 넣고
//         setUserQuestion((prevState) => {
//             const newQuestion: userChat = {
//                 index: questionIndex,
//                 message: input,
//             };
//             return [...prevState, newQuestion];
//         });
//
//         // setTimeout(() => {
//         //   //대답을 넣자
//         //   setTitleSet((preState) => {
//         //     const newTitles = chatService.getMessage;
//         //     const newSet: answerSet = {
//         //       index: questionIndex,
//         //       answer: newTitles,
//         //     };
//         //     return [...preState, newSet];
//         //   });
//         //   //index 올려주자
//         //   setQuestionIndex((prevState) => {
//         //     return prevState + 1;
//         //   });
//         // }, 5000);
//     };
//
//     const handleChatTitleClick = (qindex: number, index: number) => {
//         const updatedSet = titleSet;
//         updatedSet[qindex].answer[index].checked =
//             !updatedSet[qindex].answer[index].checked;
//         //업데이트 TODO:
//         setTitleSet(updatedSet);
//     };
//
//     const enterFindLoading = (index: number) => {
//         setFindBtnLoadings((prevLoadings) => {
//             const newLoadings = [...prevLoadings];
//             newLoadings[index] = true;
//             return newLoadings;
//         });
//         // 타임아웃 1초 뒤 state change
//         setTimeout(() => {
//             setFindBtnLoadings((prevLoadings) => {
//                 const newLoadings = [...prevLoadings];
//                 newLoadings[index] = false;
//                 setIsSubmitted(true);
//                 return newLoadings;
//             });
//         }, 1000);
//     };
//
//     const SubmitQuestion = (index: number) => {
//         enterSubmitLoading(index);
//     };
//
//     // useEffect(() => {
//     //   enterSubmitLoading(0);
//     // }, [titleSet]);
//
//     const enterSubmitLoading = (index: number) => {
//         CreateQuestion(index);
//
//         setSubmitBtnLoadings((prevLoadings) => {
//             const newLoadings = [...prevLoadings];
//             newLoadings[index] = true;
//             return newLoadings;
//         });
//
//         setTimeout(() => {
//             setSubmitBtnLoadings((prevLoadings) => {
//                 const newLoadings = [...prevLoadings];
//                 newLoadings[index] = false;
//                 return newLoadings;
//             });
//             // closeDrawer();
//         }, 1000);
//     };
//
//     const showDrawer = () => {
//         setOpenDrawer(true);
//         chatService.connect();
//     };
//
//     const closeDrawer = () => {
//         // Drawer 닫을 시 초기화
//         chatService.disconnect();
//         setTitleSet([]);
//         setQuestionIndex(1);
//         setUserQuestion([]);
//         setIsSubmitted(false);
//         setOpenDrawer(false);
//     };
//
//     useEffect(() => {
//         console.log("창 열리면", surveyQuestions);
//     }, [openDrawer]);
//
//     const CreateQuestion = (index: number) => {
//         let newCountQuestion = countQuestion - 1;
//         titleSet[index].answer
//             .filter((item) => item.checked)
//             .forEach((item) => {
//                 newCountQuestion += 1;
//                 const addMultiple = {
//                     id: `KEA-KakaoBeans-${newCountQuestion}`,
//                     type: "MULTIPLE",
//                     title: item.title,
//                     explanation: "",
//                     questionNumber: newCountQuestion.toString(),
//                     finalQuestion: false,
//                     nextQuestionNumber: (newCountQuestion + 1).toString(),
//                     numberOfAnswerChoices: 1,
//                     answers: [""],
//                     logics: [],
//                 };
//                 console.log("추가되는 질문들: ", addMultiple);
//                 setCountQuestion(newCountQuestion + 1);
//                 setSurveyQuestions((prevQuestions) => [...prevQuestions, addMultiple]);
//             });
//     };
//
//     const [input, setInput] = useState("");
//     const handleInputChange = (event: React.ChangeEvent<HTMLInputElement>) => {
//         setInput(event.target.value);
//     };
//
//     const logPrint = () => {
//         console.log("userQuestion: ", userQuestion);
//         console.log("titleSet: ", titleSet);
//     };
//
//     return (
//         <div>
//             {viewLogic === "logic" ? (
//                 <></>
//             ) : (
//                 <DialogButton onClick={showDrawer}>AI 추천</DialogButton>
//             )}
//             {/*---------------DRAWER--------------- */}
//             <Drawer
//                 title="AI로 질문 추천 받기"
//                 placement="right"
//                 onClose={closeDrawer}
//                 open={openDrawer}
//                 style={{
//                     borderTopLeftRadius: "2.5rem",
//                     borderBottomLeftRadius: "2.5rem",
//                 }}
//             >
//                 <Button onClick={logPrint}>데이터 확인 </Button>
//                 {/*---------------채팅 입력칸--------------- */}
//                 <p>질문 입력란</p>
//                 <div style={{ display: "flex", flexDirection: "row" }}>
//                     <Input
//                         placeholder={"ex) 컴퓨터 구매에 관련된 설문 문제를 추천해주세요"}
//                         style={{ marginRight: "3%" }}
//                         type="text"
//                         value={input}
//                         onChange={handleInputChange}
//                     />
//                     {/*---------------채팅 전송 버튼--------------- */}
//                     <Button
//                         type={"primary"}
//                         onClick={FindQuestion}
//                         loading={findBtnLoadings[0]}
//                     >
//                         전송
//                     </Button>
//                     {/*---------------채팅 박스 생성 공간--------------- */}
//                 </div>
//
//                 {userQuestion
//                     .map((question, index) => {
//                         setTimeout(() => {
//                             console.log("current index:", index);
//                             console.log("titleSet Status:", titleSet[index]);
//
//                             if (titleSet[index].index == index) {
//                                 console.log("got in making div");
//                                 return (
//                                     <div>
//                                         <ResponsesDiv>
//                                             {titleSet[index].answer.map((item, answerIndex) => {
//                                                 return (
//                                                     <div style={{ marginTop: "1rem" }} key={answerIndex}>
//                                                         {/*---------------설문 제목 별 버튼--------------- */}
//                                                         <ChatTitleButton
//                                                             type={item.checked ? "primary" : "default"}
//                                                             onClick={() =>
//                                                                 handleChatTitleClick(index, answerIndex)
//                                                             }
//                                                         >
//                                                             {item.title}
//                                                         </ChatTitleButton>
//                                                     </div>
//                                                 );
//                                             })}
//                                             {/*---------------설문 생성 버튼--------------- */}
//                                             <CreateQuestionsBtnDiv>
//                                                 <Button
//                                                     type={"primary"}
//                                                     onClick={() => SubmitQuestion(index)}
//                                                     loading={submitBtnLoadings[0]}
//                                                 >
//                                                     질문 생성하기
//                                                 </Button>
//                                             </CreateQuestionsBtnDiv>
//                                         </ResponsesDiv>
//                                         <ResponsesDiv key={index}>
//                                             <h1>User</h1>
//                                             <h3>{question.message}</h3>
//                                         </ResponsesDiv>
//                                     </div>
//                                 );
//                             } else {
//                                 <></>;
//                             }
//                         }, 8000);
//
//                         // if (titleSet[index]?.answer?.length > 0) {
//                         //
//                         // }
//                     })
//                     .reverse()}
//             </Drawer>
//         </div>
//     );
// };
// export default CreateSurveyChatBot;
