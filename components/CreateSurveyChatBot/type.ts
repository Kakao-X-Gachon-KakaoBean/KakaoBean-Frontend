// export type allChat = RecommendedChatTitle[] | userChat;

export interface RecommendedChatTitle {
  id: number;
  title: string;
  checked: boolean;
}

export interface answerSet {
  index: number;
  answer: RecommendedChatTitle[];
}

export interface userChat {
  index: number;
  message: string;
}
