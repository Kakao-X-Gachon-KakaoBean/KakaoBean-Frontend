export type allChat = RecommendedChatTitle[] | userChat;

export interface RecommendedChatTitle {
  id: number;
  title: string;
  checked: boolean;
}

export interface userChat {
  message: string;
  user: "user";
}
