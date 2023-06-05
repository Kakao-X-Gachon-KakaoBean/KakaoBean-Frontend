import { Client, Message } from "@stomp/stompjs";
import { useRecoilState } from "recoil";
import { chatList } from "@components/CreateSurveyChatBot";
import { RecommendedChatTitle } from "@components/CreateSurveyChatBot/type";
export class ChatService {
  private client: Client;
  public message: string;
  constructor() {
    this.client = new Client();
    this.client.configure({
      brokerURL: "ws://localhost:8080/ws",
      onConnect: () => {
        this.client.subscribe("/topic/public", this.handleMessage);
      },
    });
    this.message = "";
  }

  handleMessage = (message: Message) => {
    const chatMessage = JSON.parse(message.body);
    const extractedMessage = chatMessage.content.replace(/\[|\]/g, "");
    console.log(extractedMessage);
    // 받은 메시지 처리 로직 작성
    //   TODO: 들어온 데이터를 가공해서 recommendedChatTitle 형식으로 바꾸기
    this.message = extractedMessage;
    const [chatMessages, setChatMessages] = useRecoilState(chatList);
    setChatMessages((prevState) => {
      const newMessage: RecommendedChatTitle = {
        id: 1,
        title: this.message,
        checked: false,
      };
      console.log(newMessage);
      return prevState.concat(newMessage);
    });
  };
  // {type: 'CHAT', content: '[\n\nHello! How are you?]', sender: 'ChatGpt'}
  sendMessage = (message: string) => {
    const question = {
      question: message,
    };
    this.client.publish({
      destination: "/app/chat-gpt/question",
      body: JSON.stringify(question),
    });

    // 내꺼보기
    // this.client.publish({
    //   destination: "/app/chat.sendMessage",
    //   body: JSON.stringify(chatMessage),
    // });
  };

  connect = () => {
    this.client.activate();
  };

  disconnect = () => {
    this.client.deactivate();
  };
}
