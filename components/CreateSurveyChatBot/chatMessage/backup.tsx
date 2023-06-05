// // Message.tsx
// import React, { useEffect, useState } from "react";
// import {
//   ChatTitleButton,
//   CreateQuestionsBtnDiv,
//   ResponsesDiv,
// } from "@components/CreateSurveyChatBot/styles";
// import { Button } from "antd";
// import { MessageProps } from "@components/CreateSurveyChatBot/chatMessage/type";
// import { RecommendedChatTitle } from "@components/CreateSurveyChatBot/type";
// import { useRecoilState } from "recoil";
// import { chatTitle } from "@components/CreateSurveyChatBot";
//
// const chatMessage: React.FC<MessageProps> = ({ message, sender }) => {
//   //이걸로 들어오고 나가는 챗 내용 관리
//   const [chatMessages, setChatMessages] = useRecoilState(chatTitle);
//   const [submitBtnLoadings, setSubmitBtnLoadings] = useState<boolean[]>([]);
//   const [localTitles, setLocalTitles] =
//     useState<RecommendedChatTitle[]>(message);
//
//   useEffect(() => {
//     setLocalTitles(message);
//   }, []);
//
//   //클릭 시 체크 상태 변경.
//   const handleChatTitleClick = (index: number) => {
//     const updatedChatTitle = [...localTitles];
//     updatedChatTitle[index].checked = !updatedChatTitle[index].checked;
//     setLocalTitles(updatedChatTitle);
//   };
//
//   //make questions
//   const SubmitQuestion = () => {
//     setChatMessages(() => {
//       return [...localTitles];
//     });
//   };
//
//   // TODO: ID에 따른 다른 메세지 형식 출력기
//   if (sender == "ChatBot") {
//     return (
//       <ResponsesDiv>
//         <h2>ChatBot</h2>
//         {localTitles.map((item, index) => (
//           <div style={{ marginTop: "1rem" }} key={index}>
//             <ChatTitleButton
//               type={item.checked ? "primary" : "default"}
//               onClick={() => handleChatTitleClick(index)}
//             >
//               {item.title}
//             </ChatTitleButton>
//             <CreateQuestionsBtnDiv>
//               <Button
//                 type={"primary"}
//                 onClick={SubmitQuestion}
//                 loading={submitBtnLoadings[0]}
//               >
//                 질문 생성하기
//               </Button>
//             </CreateQuestionsBtnDiv>
//           </div>
//         ))}
//         <Button>{/*submitIcon*/}제출</Button>
//       </ResponsesDiv>
//     );
//   } else {
//     return (
//       <ResponsesDiv>
//         <h2>{sender}</h2>
//         <h5>{message[0].title}</h5>
//       </ResponsesDiv>
//     );
//   }
// };
//
// export default chatMessage;
