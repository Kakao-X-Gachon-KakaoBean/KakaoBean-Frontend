//
// import React, { useState, useEffect } from "react";
// import { ChatService } from "@components/CreateSurveyChatBot/chatMessage";
// import { atom } from "recoil";
// import { RecommendedChatTitle } from "@components/CreateSurveyChatBot/type";
//
// export const chatTitle = atom<RecommendedChatTitle[]>({
//   key: "chat",
//   default: [],
// });
//
// const chatService = new ChatService();
//
// export const ChatBox = () => {
//   const [messages, setMessages] = useState<string[]>([]);
//   const [input, setInput] = useState("");
//
//   const handleInputChange = (event: React.ChangeEvent<HTMLInputElement>) => {
//     setInput(event.target.value);
//   };
//
//   const handleSendMessage = () => {
//     chatService.sendMessage(input);
//     setInput("");
//   };
//
//   useEffect(() => {
//     chatService.connect();
//
//     return () => {
//       chatService.disconnect();
//     };
//   }, []);
//
//   useEffect(() => {
//     // 메시지 업데이트 처리
//     const handleMessageUpdate = (newMessage: string) => {
//       setMessages((prevMessages) => [...prevMessages, newMessage]);
//     };
//
//     // 메시지 처리 로직 추가
//
//     return () => {
//       // 메시지 처리 로직 제거
//     };
//   }, []);
//
//   return (
//       <div>
//         <ul>
//           {messages.map((message, index) => (
//               <li key={index}>{message}</li>
//           ))}
//         </ul>
//         <input type="text" value={input} onChange={handleInputChange} />
//         <button onClick={handleSendMessage}>Send</button>
//       </div>
//   );
// };
