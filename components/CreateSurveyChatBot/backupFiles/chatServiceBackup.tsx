// import { Client, Message } from "@stomp/stompjs";
// import { useRecoilState } from "recoil";
// import { RecommendedChatTitle } from "@components/CreateSurveyChatBot/type";
//
// export class ChatService {
//   private client: Client;
//   public answerList: RecommendedChatTitle[];
//   public counter: number;
//
//   constructor() {
//     this.client = new Client();
//     this.client.configure({
//       brokerURL: "ws://localhost:8080/ws",
//       onConnect: () => {
//         this.client.subscribe("/topic/public", this.handleMessage);
//       },
//     });
//     this.answerList = [];
//     this.counter = 1;
//   }
//
//   get getMessage() {
//     return this.answerList;
//   }
//
//   // set setMessage(newValue) {
//   //   this.message = newValue;
//   // }
//
//   handleMessage = (message: Message) => {
//     const chatMessage = JSON.parse(message.body);
//     const extractedMessage: string = chatMessage.content.replace(/\[|\]/g, "");
//     const messageList = extractedMessage.split(".");
//     // console.log(extractedMessage);
//     // 받은 메시지 처리 로직 작성
//     //   TODO: 들어온 데이터를 가공해서 recommendedChatTitle 형식으로 바꾸기
//     messageList.map((msg, index) => {
//       const newMessage: RecommendedChatTitle[] = [
//         {
//           id: index + this.counter,
//           title: msg,
//           checked: false,
//         },
//       ];
//       this.answerList = this.answerList.concat(newMessage);
//       console.log(this.answerList);
//     });
//     this.counter = this.counter + 5;
//   };
//
//   // {type: 'CHAT', content: '[\n\nHello! How are you?]', sender: 'ChatGpt'}
//   sendMessage = (message: string) => {
//     const question = {
//       question: message,
//     };
//     this.client.publish({
//       destination: "/app/chat-gpt/question",
//       body: JSON.stringify(question),
//     });
//
//     // 내꺼보기
//     // this.client.publish({
//     //   destination: "/app/chat.sendMessage",
//     //   body: JSON.stringify(chatMessage),
//     // });
//   };
//
//   connect = () => {
//     this.client.activate();
//   };
//
//   disconnect = () => {
//     this.client.deactivate();
//   };
// }
